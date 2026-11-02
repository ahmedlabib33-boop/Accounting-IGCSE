# Accounting 0452 validation

Verified locally on 2 November 2026.

| Check | Result |
|---|---|
| Content compilation and freshness | Passed |
| Seven topic groups and all 28 numbered sections | Present in learning and practice; every Paper 1 samples every section |
| Lesson/example/practice association | Passed for all 65 lessons |
| Question IDs and choice validity | Passed; four distinct choices and valid answer per question |
| Three Paper 1 mocks | 40 questions each, 90-minute configured duration |
| Three Paper 2 mocks | Five questions each, 20 marks per question, 100 total, 105-minute duration |
| Focused automated tests | Five passed |
| ESLint | Passed |
| Next.js production build | Passed |
| HTTP API checks | Passed for lesson/exam payloads, grading, invalid requests, structured-scheme reveal and revision handbook |
| Browser learning navigation | All seven topics and 65 lessons visible |
| Browser incorrect practice | Correct explanation shown; lesson remained in progress; mistake saved |
| Browser Paper 1 submission | One correct answer plus 39 blanks yielded 1/40; blanks added to review |
| Browser Paper 2 submission | Written response retained; models and point-level criteria revealed after submission |
| Browser Paper 2 assessment | Each part required a mark; 6/100 self-assessed attempt saved; uncredited parts added to review |
| Browser persistence | Automatic and self-assessed attempts remained after reload |

Exam QA history was created on a separate localhost port (5418), isolating it from the user preview (5417). The single practice mistake used on port 5417 was removed afterwards. Production preview remains available at http://127.0.0.1:5417.

The timer countdown was observed. A complete real-time 90/105-minute expiry run was not performed. Timer-expiry submission logic is implemented but should not be described as a timed examination certification.

Curriculum verification checks section presence and selected arithmetic. It does not independently establish that each official learning objective has sufficient instructional depth or certify examiner-approved marking. Mocks and lessons are original practice; Paper 1 samples repeat the learning bank and Paper 2 variants scale shared case designs. These are material limits to claims of “100% Cambridge content”.

Groq provider replies, Jitsi camera/microphone and real mobile-device use were not exercised in this conversion. No deployment or push to GitHub was performed.
