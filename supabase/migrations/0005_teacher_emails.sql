-- teacher_emails: addresses that become teachers on sign-up (admin_emails still win).
-- The list itself is data, edited from Admin -> Settings; it is seeded empty here.
insert into public.app_settings (key, value) values ('teacher_emails', '[]'::jsonb)
on conflict (key) do nothing;

create or replace function public.role_for_new_account(address text, meta jsonb)
returns text language plpgsql stable security definer set search_path = public as $$
declare
  admins jsonb := coalesce((select value from public.app_settings where key = 'admin_emails'), '[]'::jsonb);
  teachers jsonb := coalesce((select value from public.app_settings where key = 'teacher_emails'), '[]'::jsonb);
  wanted text := coalesce(meta ->> 'role', 'student');
begin
  if admins ? lower(address) or not exists (select 1 from public.profiles) then return 'admin'; end if;
  if teachers ? lower(address) then return 'teacher'; end if;
  if wanted in ('teacher', 'admin') and coalesce((meta ->> 'created_by_admin')::boolean, false) then return wanted; end if;
  return 'student';
end $$;
revoke execute on function public.role_for_new_account(text, jsonb) from public, anon, authenticated;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'full_name', ''), public.role_for_new_account(new.email, coalesce(new.raw_user_meta_data, '{}'::jsonb)))
  on conflict (id) do nothing;
  return new;
end $$;

create or replace function public.ensure_profile()
returns public.profiles language plpgsql security definer set search_path = public as $$
declare
  me auth.users%rowtype;
  result public.profiles;
begin
  if auth.uid() is null then raise exception 'Not signed in.'; end if;
  select * into result from public.profiles where id = auth.uid();
  if found then return result; end if;
  select * into me from auth.users where id = auth.uid();
  insert into public.profiles (id, email, full_name, role)
  values (me.id, me.email, coalesce(me.raw_user_meta_data ->> 'full_name', ''), public.role_for_new_account(me.email, coalesce(me.raw_user_meta_data, '{}'::jsonb)))
  on conflict (id) do nothing;
  select * into result from public.profiles where id = auth.uid();
  return result;
end $$;

-- Saving the teacher list from the admin console promotes matching student accounts.
create or replace function public.apply_teacher_emails()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.key = 'teacher_emails' then
    update public.profiles set role = 'teacher', updated_at = now()
    where role = 'student' and new.value ? lower(email);
  end if;
  return new;
end $$;
revoke execute on function public.apply_teacher_emails() from public, anon, authenticated;
drop trigger if exists app_settings_apply_teacher_emails on public.app_settings;
create trigger app_settings_apply_teacher_emails after insert or update on public.app_settings for each row execute function public.apply_teacher_emails();
update public.profiles set role = 'teacher', updated_at = now()
where role = 'student' and coalesce((select value from public.app_settings where key = 'teacher_emails'), '[]'::jsonb) ? lower(email);
