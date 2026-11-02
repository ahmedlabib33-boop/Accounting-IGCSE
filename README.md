# IGCSE Accounting | Cambridge (0452)

Independent learning and exam-practice app for the **2027–2029** syllabus, retaining the assigned app's learning sequence and screen design.

Run `RUN_APP.bat`, or `npm run dev -- --hostname 127.0.0.1 --port 5417`, then open http://127.0.0.1:5417.
The AI Coach uses `GROQ_API_KEY`; ordinary study and exams work without an AI key.

## Learning and exams

Accounting → topic → lesson → rule/explanation/example → practice → feedback → Review Vault → Progress.

All seven syllabus groups and 28 numbered sections are represented. Original source material lives in `data/accounting/`; the content compiler creates server-side JSON. The printable handbook is at `/accounting-revision.html`.

Paper 1 practice: 40 questions, 90 minutes, 40 marks; automatically marked. Paper 2 practice: five 20-mark structured questions, 105 minutes; self/teacher assessed using indicative schemes. Mocks are original, not official papers. Versions reuse practice-bank questions or scaled case designs; they are not six independent past papers.

## Checks

```powershell
npm run content:build
npm run content:check
npm test
npm run lint
npm run build
```

See `docs/SYLLABUS_COVERAGE.md`, `docs/SAT_TO_ACCOUNTING_LOG.md` and `docs/VALIDATION.md`. Original SAT files are retained in a git-ignored backup; they are not part of the new curriculum pipeline. The only target repository is https://github.com/ahmedlabib33-boop/Accounting-IGCSE.

## Sources and storage

[Official syllabus](https://www.cambridgeinternational.org/Images/718141-2027-2029-syllabus.pdf) and [official papers/mark schemes](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-accounting-0452/past-papers/) define the qualification reference. This app and its authored material are not endorsed by Cambridge.

Each account's study record is kept in the browser (`accounting-0452:study:v1:<user id>`) and mirrored to Supabase (`study_records`), so progress follows the student between devices and teachers can see it. Notes and the Visual Pad stay browser-local. Secrets, personal provider credentials, backups, generated JSON and build output are ignored.

## Accounts, live classroom and admin console

Sign-in is required for every screen. Supabase provides the accounts (email + password), the database and the realtime channel; the schema lives in `supabase/migrations/`.

- **Roles**: `student`, `teacher`, `admin`. The first account, and any address listed in the `admin_emails` setting, becomes an administrator. Admins promote teachers from `/admin`.
- **Live class**: a teacher or admin starts a class from Live Studio. Every signed-in student sees a Join button; the call (Jitsi) stays mounted in a corner while people move between screens, and the teacher's current screen (lesson, mock paper, Visual Pad) is pushed to every student who has "Follow teacher" on, through a private realtime channel plus the `live_sessions` row for late joiners.
- **Admin console** (`/admin`): users (roles, suspend, reset, delete, progress detail), the live class, platform settings (registration, maintenance, announcement, teacher name, call server, admin emails) and an audit log.

Environment variables (see `.env.example`): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, and optionally `SUPABASE_SERVICE_ROLE_KEY`, which lets the console create accounts, set passwords and skip email confirmation. Without it, Supabase's default mailer applies (a few confirmation emails per hour), so for a class either add the key or turn off "Confirm email" in Supabase Auth settings. In Supabase Auth → URL configuration, set the site URL to the deployed origin and allow `<origin>/auth/callback` so password-reset links work.

The public `meet.jit.si` service asks the first person in a room to log in (Google, GitHub or Facebook) to become moderator; the teacher does this once per browser. A self-hosted or paid Jitsi server set in Settings → Call server removes that step.
