# Topic 7 review: Accounting concepts and modern practice (7.1 to 7.3)

Reviewer role: senior Cambridge IGCSE Accounting 0452 teacher and examiner. Authority: `docs/syllabus/0452-2027-2029-syllabus.txt`, Topic 7, and `REVIEW-BRIEF.md`.

Validator: `node scripts/validate-deep.mjs --topic 7` prints OK (7.1, 7.2 and 7.3 each have notes 7/8/8, examples 4, terms 12, exercises 10, mcq 10, structured 2).

## Change log

| # | Kind | Section | Item | What was wrong | What I changed |
|---|---|---|---|---|---|
| 1 | Terminology | Topic | `name`, file header | Topic called "Concepts, ethics and technology" | Renamed "Accounting concepts and modern practice" (syllabus title) |
| 2 | Terminology | 7.1 | `title` | "Accounting principles" | "Accounting concepts" |
| 3 | Terminology | 7.2 | `title` | "Professional ethics" | "Ethical considerations" |
| 4 | Terminology | 7.3 | `title` | "Technology in accounting" | "Technology and sustainability" |
| 5 | Terminology | 7.1 | Whole section (summary, objectives, key term, all notes and table head, worked examples, errors, tips, ex-7.1-1 to 10, mcq-7.1-1 to 10, sq-7.1-1, sq-7.1-2) | The ten items were called "principles" (59 uses) | Changed to "concept(s)" throughout; key term now "Accounting concept"; note heading "The ten concepts at a glance" |
| 6 | Terminology | 7.1 | Objective 6 | "provisions for doubtful debts" | "the allowance for irrecoverable debts" |
| 7 | Terminology | 7.1 | Note "Matching and realisation: deciding the period" | "the provision for doubtful debts", "expected cost of bad debts" | "the allowance for irrecoverable debts", "expected cost of irrecoverable debts" |
| 8 | Terminology | 7.1 | Note "Prudence, consistency and materiality" | "a provision for doubtful debts is made" | "an allowance for irrecoverable debts is made" |
| 9 | Terminology | 7.1 | Note "Going concern and historic cost", worked example 1 step 3, ex-7.1-7, ex-7.1-8, sq-7.1-2 | "carrying value" | "carrying amount" |
| 10 | Terminology | 7.2 | Objective, note "How ethics and the accounting concepts work together", exam tip 1, ex-7.2-5, ex-7.2-9, mcq-7.2-6, sq-7.2-1(b) | "accounting principle(s)" and "realisation principle" used for the 7.1 items | "accounting concept(s)", "realisation concept"; "principle" kept only for the five fundamental ethical principles |
| 11 | Terminology | 7.2 | Worked example "Due care: Hadi checks his own allowance calculation" | "provision for doubtful debts", "provision of 4 per cent", "net of provision" | "allowance for irrecoverable debts", "allowance of 4 per cent", "net of the allowance" (figures $1,260 / $540 / $720 rechecked, correct) |
| 12 | Terminology | 7.2 | sq-7.2-2(c) model and points | "carrying value" | "carrying amount" ("provision for depreciation" kept, as the syllabus uses it) |
| 13 | Terminology | 7.2 | Worked example "Mona and the missing invoice" step 4 | "current ratio ... 1.5 to 1" | "current (working capital) ratio ... 1.50 : 1 ... 1.11 : 1" |
| 14 | Accuracy | 7.1 | mcq-7.1-6 | Stem ("continues ... even though straight line would give a higher profit") let prudence be argued as a second answer | Reworded so the owner wants a one-year switch to raise profit and the accountant keeps the method: only consistency fits |
| 15 | Mark scheme | 7.1 | sq-7.1-1(d) | Final part was a 4-mark "explain" with no evaluation (Paper 2 needs AO3) | Now "Evaluate whether the bank should base its decision on the draft or corrected figures"; model weighs the $720 net difference against the hidden $1,000 liability and concludes; last point is a justified conclusion |
| 16 | Mark scheme | 7.1 | sq-7.1-2 | Ended on an explain part; depreciation part had no decision and a point for two-year totals | Parts reordered (a concepts, b spanners, c repair and premises, d depreciation). Stimulus now says the equipment is used evenly. Part d: calculate both methods and "Advise Youssef which method"; points for $3,200, $4,800, $3,360, $1,600, justified advice, consistency |
| 17 | Coverage | 7.2 | `summary` | Did not mention the need for a framework or its significance to stakeholders and society | Rewritten to include both |
| 18 | Coverage | 7.2 | `objectives` | No objective for "need for an ethical framework" or "significance to stakeholders and society" | Added both (now 8) |
| 19 | Coverage | 7.2 | `keyTerms` | No definition of ethical framework or public interest | Added "Ethical framework" and "Public interest" (now 12) |
| 20 | Coverage | 7.2 | Note 1 | Heading "Why ethics matter in accounting"; need for a framework only implied | Retitled "The need for an ethical framework in accounting"; added why it is needed (pressure, private information, judgements outsiders cannot check) |
| 21 | Coverage | 7.2 | New note "Why an ethical framework matters to stakeholders and society" | Syllabus bullet not taught | New note: benefits to owners, lenders, suppliers, employees, customers, investors; to society through correct tax, efficient use of money, fewer frauds and collapses, honest environmental reporting, public trust |
| 22 | Coverage | 7.2 | Exam tips | No tip on the significance bullet | Added tip: name stakeholders, add a society point, finish with a judgement |
| 23 | Coverage | 7.2 | ex-7.2-1 | Duplicated the integrity definition already practised in sq-7.2-1(a) and mcq-7.2-1 | Replaced with "Explain two reasons why accounting needs an ethical framework" (2 marks) |
| 24 | Coverage | 7.2 | mcq-7.2-7 | Weak distractors ("automatic promotion", "lower depreciation charges"); duplicated consequences already practised | Replaced with a question on the significance to society of applying an ethical framework, with plausible distractors |
| 25 | Coverage | 7.2 | sq-7.2-1(d) | Consequences only for Farouk and the business; no evaluation; significance bullet not examined | Now "Evaluate Farouk's claim that the changes are harmless, considering the significance to stakeholders and society"; uses $33,450 vs $18,900; justified conclusion point |
| 26 | Mark scheme | 7.2 | sq-7.2-2(d) | Ended on an explain part with no evaluation | Now "Advise the partners whether the firm should continue to act for Mr Adel"; weighs the fee against reputation, discipline and legal risk; justified advice point |
| 27 | Scope | 7.2 | Worked example "Which principle has been broken?" case 1 | Scenario used auditing, which is outside 0452 | Case now refers to results the accountant has prepared |
| 28 | Scope | 7.3 | `summary`, `objectives` | Built around comparing spreadsheets, accounting software and cloud packages, with an objective to "calculate and compare the costs of alternative systems" | Rewritten around the syllabus: digital applications for all or part of the records; storing data safely and sustainably; risks; four storage types and their advantages and disadvantages; advise a business (7 objectives) |
| 29 | Scope | 7.3 | `keyTerms` | Software-centred terms (spreadsheet, accounting software, cloud accounting, audit trail, garbage in garbage out) | 12 new terms: digital application, manual records, data storage device, cloud service, other digital services, backup, data security, sustainable storage, retention period, secure disposal, encryption, access control |
| 30 | Scope | 7.3 | `notes` (all 8) | Notes on spreadsheets, accounting software, cloud accounting, ICT pros and cons, choosing a system on multi-year cost | Replaced with: Using digital applications for all or part of the records; Why accounting data must be stored safely; Why accounting data must be stored sustainably (paper, energy, data centres, e-waste, retention and deletion, balancing safety and sustainability); The risks of not storing data safely and sustainably (table); Manual storage and data storage devices; Cloud services and other digital services; Comparing the four types of storage (table); Keeping data safe and storage sustainable in practice |
| 31 | Scope | 7.3 | `workedExamples` (all 4) | Included a three-year software cost comparison and a spreadsheet-formula depreciation example | Replaced with: Salma's florist (part-manual, part-digital records; $4,860 less $4,410 = $450 missing from the sales ledger); Karim's garage (comparing the four storage types and advising); Fatma's wholesaler (cost of a data loss: $350 + $720 + $180 + $900 = $2,150, irrecoverable debt written off); Nile Office Supplies (sustainability: 21,600 sheets and $648 a year saved, retention, copies, disposal of old computers) |
| 32 | Scope | 7.3 | `commonErrors`, `examTips` | Focused on software features and subscription arithmetic ("multiply monthly subscriptions by 12 and by the number of years") | Replaced: errors on naming software packages, confusing "sustainably" with "for a long time", cloud having no risks, same-place backups, deleting records too early, unexplained lists; tips on the four syllabus names, separating safe and sustainable, applying to the scenario, balanced advice, link to confidentiality |
| 33 | Scope | 7.3 | ex-7.3-1 to ex-7.3-10 | ex-7.3-4 and ex-7.3-7 were software cost calculations; others compared software tools; ex-7.3-6 used "provision for doubtful debts" | All ten rewritten: digital applications for part of the records (2); identify storage types (2); meaning of sustainable storage (3); manual storage pros and cons (4); safety measures (4); cost of a data loss with irrecoverable debt write-off, $532 + $410 + $760 = $1,702 (4); cloud for a two-office business (5); risks of unsafe and unsustainable storage (6); devices versus cloud for a pharmacy, with recommendation (8); security breach, insecure disposal and evaluation of cloud (10) |
| 34 | Scope | 7.3 | mcq-7.3-1 to mcq-7.3-10 | Included a subscription cost calculation (mcq-7.3-7) and software-versus-spreadsheet questions | All ten rewritten on storage types, advantages and disadvantages, sustainability, retention and secure disposal, backups, encryption, other digital services and digital applications; one correct answer each |
| 35 | Scope | 7.3 | sq-7.3-1 | Part (c) was a 6-mark three-year cost comparison of software options; recommendation rested on cost | Rewritten "Mariam's Boutique: moving from paper to digital storage": (a) why store safely and sustainably 4; (b) risks of present storage 4; (c) advantage and disadvantage of manual, external drive and cloud options 6; (d) advise, covering safety and sustainability 6 |
| 36 | Scope | 7.3 | sq-7.3-2 | Part (b) was 10 marks of security measures; no sustainability; ended on a 2-mark explain | Kept the theft scenario ($900 + $240 = $1,140 rechecked); added an old computer and 2017 to 2019 paper records to the stimulus. Parts: (a) consequences 4; (b) three security measures 6; (c) safe and sustainable disposal 4; (d) evaluate moving to a cloud service 6 |

Counts by kind: terminology 13, accuracy 1, coverage 9, scope 10, mark scheme 3 (36 changes).

Figures I re-worked and found correct, so left alone: every 7.1 worked example, ex-7.1-3 to ex-7.1-10 (including the corrected profit of $45,695), sq-7.1-1 ($29,120 and inventory $9,200), sq-7.1-2 depreciation; 7.2 Mona ($4,200), Hadi ($720), ex-7.2-5, ex-7.2-9 ($31,440, about 41 per cent), ex-7.2-10 ($1,200), sq-7.2-1 ($14,550, $33,450), sq-7.2-2 ($600). New 7.3 figures were all worked twice. Every MCQ in the topic has its correct answer first and only one defensible answer.

## Coverage against syllabus

7.1 Accounting concepts

- [x] Business entity: notes "The ten concepts at a glance" and "Entity, duality and money measurement"; worked example 1; ex-7.1-1, ex-7.1-9, ex-7.1-10; mcq-7.1-1; sq-7.1-1
- [x] Consistency: note "Prudence, consistency and materiality"; worked example 4; ex-7.1-8; mcq-7.1-6; sq-7.1-2(a), (d)
- [x] Duality: note "Entity, duality and money measurement"; ex-7.1-2; mcq-7.1-3
- [x] Going concern: note "Going concern and historic cost"; worked example 1; ex-7.1-7; mcq-7.1-9; sq-7.1-2(a), (c)
- [x] Historic cost: note "Going concern and historic cost"; worked example 1; ex-7.1-7; mcq-7.1-8; sq-7.1-2(c)
- [x] Matching / accruals: note "Matching and realisation"; worked examples 1 and 3; ex-7.1-4, ex-7.1-9, ex-7.1-10; mcq-7.1-10; sq-7.1-1
- [x] Materiality: note "Prudence, consistency and materiality"; worked examples 1 and 4; ex-7.1-5, ex-7.1-10; mcq-7.1-7; sq-7.1-2(b)
- [x] Money measurement: note "Entity, duality and money measurement"; ex-7.1-2; mcq-7.1-5
- [x] Prudence: note "Prudence, consistency and materiality"; worked example 2; ex-7.1-3, ex-7.1-9, ex-7.1-10; mcq-7.1-2; sq-7.1-1(d)
- [x] Realisation: note "Matching and realisation"; worked example 1; ex-7.1-6, ex-7.1-9, ex-7.1-10; mcq-7.1-4; sq-7.1-1, sq-7.1-2(c)

7.2 Ethical considerations

- [x] The need for an ethical framework in accounting: note "The need for an ethical framework in accounting"; key term "Ethical framework"; ex-7.2-1
- [x] Integrity: note "The five fundamental principles", "Integrity and objectivity in practice"; worked examples 1, 2; mcq-7.2-1; sq-7.2-1(a)
- [x] Objectivity: same notes; ex-7.2-3; mcq-7.2-2; sq-7.2-1(a)
- [x] Professional competence and due care: note "Competence, due care and confidentiality"; worked example 4; ex-7.2-2; mcq-7.2-3; sq-7.2-1(a), sq-7.2-2
- [x] Confidentiality: note "Competence, due care and confidentiality"; worked example 3; ex-7.2-7; mcq-7.2-4, mcq-7.2-10; sq-7.2-2(a)
- [x] Professional behaviour: note "Professional behaviour and the consequences of unethical conduct"; worked example 2; mcq-7.2-5
- [x] The significance to stakeholders and society of applying an ethical framework: note "Why an ethical framework matters to stakeholders and society"; key terms "Stakeholder", "Public interest"; exam tip 6; mcq-7.2-7; sq-7.2-1(d); sq-7.2-2(d)

7.3 Technology and sustainability

- [x] Use of digital applications for all or part of the accounting records: note "Using digital applications for all or part of the records"; worked example Salma's florist; ex-7.3-1; mcq-7.3-10
- [x] The need to store accounting data safely and sustainably: notes "Why accounting data must be stored safely", "Why accounting data must be stored sustainably"; worked example Nile Office Supplies; ex-7.3-3; mcq-7.3-4; sq-7.3-1(a)
- [x] Risks of not storing data safely and sustainably: note "The risks of not storing data safely and sustainably" (table); worked example Fatma's wholesaler; ex-7.3-6, ex-7.3-8, ex-7.3-10; mcq-7.3-8; sq-7.3-1(b); sq-7.3-2(a)
- [x] Types of storage system (manual, data storage devices, cloud services, other digital services): notes "Manual storage and data storage devices", "Cloud services and other digital services"; worked examples Salma and Karim; ex-7.3-2; mcq-7.3-1, mcq-7.3-9
- [x] Advantages and disadvantages of each type: note "Comparing the four types of storage" (table); worked example Karim's garage; ex-7.3-4, ex-7.3-7, ex-7.3-9; mcq-7.3-2, mcq-7.3-3; sq-7.3-1(c), (d); sq-7.3-2(d)
- [x] Sustainability (energy use, paper reduction, retention and deletion, device disposal): notes on sustainable storage and practice; worked example Nile Office Supplies; ex-7.3-3, ex-7.3-8; mcq-7.3-4, mcq-7.3-5; sq-7.3-1(d); sq-7.3-2(c)
- [x] Syllabus note (no knowledge of specific software packages): note 1 says so; common error 1; mcq-7.3-10; no product comparisons or software cost calculations remain
