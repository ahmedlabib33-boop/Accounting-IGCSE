-- The platform's teacher is Mr. Bassem Ashraf.
update public.app_settings set value = '"Mr. Bassem Ashraf"'::jsonb, updated_at = now() where key = 'teacher_name';
