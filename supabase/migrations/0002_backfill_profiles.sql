-- Accounts that existed in auth.users before the profiles table was added (or whose insert
-- trigger did not run) get a profile, and a signed-in user with no profile can create their own.

-- Called by the app when a signed-in user has no profile row yet. Returns the (new or existing) profile.
create or replace function public.ensure_profile()
returns public.profiles language plpgsql security definer set search_path = public as $$
declare
  me auth.users%rowtype;
  result public.profiles;
  admins jsonb := coalesce((select value from public.app_settings where key = 'admin_emails'), '[]'::jsonb);
begin
  if auth.uid() is null then raise exception 'Not signed in.'; end if;
  select * into result from public.profiles where id = auth.uid();
  if found then return result; end if;
  select * into me from auth.users where id = auth.uid();
  insert into public.profiles (id, email, full_name, role)
  values (me.id, me.email, coalesce(me.raw_user_meta_data ->> 'full_name', ''),
    case when admins ? lower(me.email) or not exists (select 1 from public.profiles) then 'admin' else 'student' end)
  on conflict (id) do nothing;
  select * into result from public.profiles where id = auth.uid();
  return result;
end $$;
grant execute on function public.ensure_profile() to authenticated;

-- Backfill every existing auth user that has no profile (admin_emails become admins, everyone else a student).
insert into public.profiles (id, email, full_name, role, created_at)
select u.id, u.email, coalesce(u.raw_user_meta_data ->> 'full_name', ''),
  case when coalesce((select value from public.app_settings where key = 'admin_emails'), '[]'::jsonb) ? lower(u.email) then 'admin' else 'student' end,
  u.created_at
from auth.users u
where u.email is not null and not exists (select 1 from public.profiles p where p.id = u.id)
on conflict (id) do nothing;
