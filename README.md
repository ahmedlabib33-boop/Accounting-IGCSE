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

Completed history is stored locally under `accounting-0452:study:v1`. Jitsi handles live calls; notes and pad are browser-local. Secrets, personal provider credentials, backups, generated JSON and build output are ignored. No student cloud database is introduced.
