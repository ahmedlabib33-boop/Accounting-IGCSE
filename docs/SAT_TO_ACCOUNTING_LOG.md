# SAT → Accounting IGCSE conversion log

Date: 2 November 2026. Assigned folder: `D:\Beso\IGCSE Finance Overview`.
Only target repository: https://github.com/ahmedlabib33-boop/Accounting-IGCSE

## Original snapshot

Before conversion, `backups/sat-before-accounting-20261102/` captured the existing app, scripts, data, package manifests, README and launcher. Backups and private configuration are excluded from Git. No other repository was read or changed during conversion.

The previous runtime used Next.js/React, Math and English workbook compilation, 316 lessons, 622 practice questions, 20 exam IDs and 1,350 exam questions. Its curriculum, coach prompts, downloadable decks and local-storage names were SAT-specific. A separately named Module 1 workbook also held English questions.

## New Accounting version

The selected qualification is Cambridge IGCSE Accounting (0452), exams 2027–2029. The official syllabus defines the scope and assessment structure. Teaching prose, worked examples, practice questions and indicative mock mark schemes in this project are independently authored. They are not official Cambridge content or an endorsed textbook.

| Existing feature | Accounting version |
|---|---|
| Home and navigation | Same screen hierarchy and dark visual design; accounting labels and current local branding retained |
| Subject → topic → lesson | Accounting → seven topic groups → section-linked lessons |
| Rule, explanation, example | Accounting rules, debit/credit reasoning and numerical examples |
| Practice and instant feedback | Accounting A–D questions; server reveals explanations after grading |
| Completion | Manual completion retained; correct practice automatically completes a lesson |
| Exam Arena | Paper 1 and Paper 2 selector in the same navigation section |
| Paper 1 | Three original 40-question, 90-minute mocks; each samples all 28 sections from the practice bank |
| Paper 2 | Three 105-minute structured mocks, each five 20-mark questions; variants scale the same case designs |
| Paper 2 marking | Student/teacher marks each part against an indicative scheme after submission; explicitly self-assessed in Progress |
| Review Vault | Incorrect multiple-choice answers and partly credited structured answers with explanations |
| Progress | Browser-local history; automatic and self-assessed results labelled separately |
| Browser storage | Separate accounting namespace; existing SAT study history is not imported |
| AI Coach | Accounting 0452 tutor prompt using the existing Groq connection |
| Live Studio | Existing direct Jitsi flow and browser-local notes retained |
| Visual Pad, Focus Music | Existing tools retained |
| Revision downloads | Original printable accounting handbook plus official syllabus/paper links |

## Content and coverage

The generated coverage register lists every numbered section and the lesson/practice counts: 7 topics, 28 sections, 65 lessons and 93 practice questions. CURRICULUM_SCOPE.md records the instructional scope by section. Automated checks verify all 28 sections are present, every lesson has a worked example and practice, every Paper 1 has 40 distinct questions including all sections, and each structured question totals 20 marks. This verifies structural coverage, not independent examiner approval of depth or equivalence to a complete endorsed course.

Official reference: https://www.cambridgeinternational.org/Images/718141-2027-2029-syllabus.pdf
Official resources: https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-accounting-0452/past-papers/

## Validation and limits

See `VALIDATION.md` for completed checks. The course does not assign official grades or claim that the original mocks are past papers. Paper 1 mocks intentionally reuse the learning bank; Paper 2 variants share structures with changed amounts. In-progress exams are component-local and reset when leaving the exam screen. Persistent completed history remains in this browser, not a cloud student account. Live camera/microphone and Groq provider responses require separate real service/device checks.
