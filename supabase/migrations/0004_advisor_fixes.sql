-- Fixes for the Supabase security and performance advisors (2026-11-02).

-- 1. Functions: pin the search path, and stop anonymous callers (and the API) reaching
--    SECURITY DEFINER helpers that only make sense for signed-in users or triggers.
alter function public.touch_updated_at() set search_path = public;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.admin_delete_user(uuid) from public, anon;
revoke execute on function public.ensure_profile() from public, anon;
revoke execute on function public.ping_presence() from public, anon;
revoke execute on function public.is_admin() from public, anon;
revoke execute on function public.is_staff() from public, anon;

-- 2. Row-level security: evaluate auth.uid() once per query, and keep one permissive
--    policy per role and action.
drop policy if exists profiles_read_own on public.profiles;
drop policy if exists profiles_update_own on public.profiles;
drop policy if exists profiles_admin_update on public.profiles;
create policy profiles_read on public.profiles for select to authenticated
  using (id = (select auth.uid()) or public.is_staff());
-- Role, status and email changes are guarded by a trigger instead of a self-referencing policy
-- (a subquery on profiles inside a profiles policy recurses).
create or replace function public.protect_profile_fields()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if (select auth.uid()) is null or public.is_admin() then return new; end if;
  if new.role is distinct from old.role or new.status is distinct from old.status or new.email is distinct from old.email then
    raise exception 'Only administrators can change roles, status or email.';
  end if;
  return new;
end $$;
revoke execute on function public.protect_profile_fields() from public, anon, authenticated;
drop trigger if exists profiles_protect_fields on public.profiles;
create trigger profiles_protect_fields before update on public.profiles for each row execute function public.protect_profile_fields();
create policy profiles_update on public.profiles for update to authenticated
  using (id = (select auth.uid()) or public.is_admin())
  with check (id = (select auth.uid()) or public.is_admin());

drop policy if exists settings_public_read on public.app_settings;
drop policy if exists settings_admin_write on public.app_settings;
-- Anonymous visitors (the login page) read the public keys; signed-in admins read everything.
create policy settings_read_anon on public.app_settings for select to anon
  using (key = any (array['registration_open', 'maintenance', 'announcement', 'teacher_name', 'jitsi_domain']));
create policy settings_read on public.app_settings for select to authenticated
  using (key = any (array['registration_open', 'maintenance', 'announcement', 'teacher_name', 'jitsi_domain']) or public.is_admin());
create policy settings_admin_insert on public.app_settings for insert to authenticated with check (public.is_admin());
create policy settings_admin_update on public.app_settings for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy settings_admin_delete on public.app_settings for delete to authenticated using (public.is_admin());

drop policy if exists live_staff_write on public.live_sessions;
create policy live_staff_insert on public.live_sessions for insert to authenticated with check (public.is_staff());
create policy live_staff_update on public.live_sessions for update to authenticated using (public.is_staff()) with check (public.is_staff());
create policy live_staff_delete on public.live_sessions for delete to authenticated using (public.is_staff());

drop policy if exists study_own on public.study_records;
drop policy if exists study_staff_read on public.study_records;
create policy study_read on public.study_records for select to authenticated
  using (user_id = (select auth.uid()) or public.is_staff());
create policy study_insert on public.study_records for insert to authenticated with check (user_id = (select auth.uid()));
create policy study_update on public.study_records for update to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy study_delete on public.study_records for delete to authenticated using (user_id = (select auth.uid()));

drop policy if exists audit_staff_insert on public.audit_log;
create policy audit_staff_insert on public.audit_log for insert to authenticated
  with check (public.is_staff() and actor_id = (select auth.uid()));

-- 3. Indexes covering the foreign keys the advisor flagged.
create index if not exists app_settings_updated_by_idx on public.app_settings (updated_by);
create index if not exists audit_log_actor_id_idx on public.audit_log (actor_id);
create index if not exists live_sessions_host_id_idx on public.live_sessions (host_id);
