# Review log: short lessons, extra practice, Paper 2 original mocks and Practice Lab

Reviewer role: senior Cambridge IGCSE Accounting 0452 teacher and examiner. Authority: `docs/syllabus/0452-2027-2029-syllabus.txt` and `data/accounting/deep/REVIEW-BRIEF.md`.

Files reviewed: `data/accounting/course.mjs` (43 lessons + 28 extra practice), `data/accounting/extensions.mjs` (22 lessons), `data/accounting/structured.mjs` (3 mocks × 5 questions), `app/_lib/lab-content.mjs`.

Every figure in every lesson, worked example, MCQ and mark scheme was recomputed. No arithmetic error was found in the original figures. The test-dependent answers ($882, $3,000, $180, $7,000) are unchanged. The structured mocks were checked for k = 1, 2 and 3: every money value scales with k, all ratios and percentages stay the same (ROCE 15%, profit margin 9%, receivables 30 days, acid test 1.8 : 1), and every question totals 20 marks with one mark point per mark.

Kinds: T = terminology, F = ratio formula or presentation, A = technical accuracy, M = MCQ quality (one correct answer, plausible distractors), C = syllabus coverage, S = mark scheme / AO3.

| # | Kind | File | Item | What was wrong | What changed |
|---|---|---|---|---|---|
| 1 | T | course.mjs | 1.2 The accounting equation | "owner equity", "receivables", "payables" | "owner's equity (capital)", "trade receivables", "trade payables" |
| 2 | A | course.mjs | 2.2 Business source documents | Debit note described vaguely ("request a correction or notify a charge") | Says who sends it and why: buyer to supplier for returns or an overcharge (asking for a credit note), or supplier to correct an undercharge |
| 3 | C | course.mjs | 2.3 Cash book and discounts | Card and online receipts only mentioned in passing | States that cheques, debit and credit cards, online and bank transfers go in the bank column and notes and coins in the cash column (2.3 bullet) |
| 4 | C | course.mjs | 3.1 Trial balance and its limitations | No purpose beyond the arithmetic check; did not cover amending a trial balance that contains errors | Adds "summary for preparing financial statements" and how to amend a trial balance (move wrong-side balances, correct amounts, re-total); "equity and revenue" changed to "capital and income" |
| 5 | T/A | course.mjs | 4.2 Depreciation methods | Credit entry was "accumulated depreciation"; rule said depreciation is "not an asset valuation exercise" (conflicts with the revaluation method); meaning of and need for depreciation missing | Credit goes to the provision for depreciation account (asset account credited directly under revaluation); rule reworded; meaning (use, wear and tear, time, obsolescence) and the need (matching) added; loose tools named as a revaluation example |
| 6 | T | course.mjs | 4.2 Asset purchases and disposal accounts | Disposal entries used "accumulated depreciation" as the account | Names the provision for depreciation account; notes credit purchases of non-current assets go through the general journal |
| 7 | T/C | course.mjs | 4.3 Accrued and prepaid expenses | "accrual account", "prepayment"; no ledger-account treatment | Uses other payables / other receivables; adds where the c/d and b/d balances sit in the expense account plus the journal entries |
| 8 | T/C | course.mjs | 4.3 Accrued and prepaid income | "income receivable", "matching principle"; no ledger treatment | Other receivables / other payables, ledger c/d and b/d treatment, journal entries, "matching concept" |
| 9 | A | course.mjs | 4.4 Irrecoverable debts and recovery | Recovery entry was vague ("recognise as income and the receipt as bank") | Two-step entry: debit customer / credit irrecoverable debts recovered, then debit bank / credit customer |
| 10 | T | course.mjs | 4.4 Allowance for irrecoverable debts | Used the out-of-date name "provision for doubtful debts"; the entry for a decrease was unclear ("credits the expense adjustment") | Old name removed; tells students always to write "allowance for irrecoverable debts"; increase is a debit to the statement of profit or loss and a credit to the allowance, decrease the reverse; prudence linked |
| 11 | C | course.mjs | 5.3 Company finance and limited liability | Features of ordinary shares and debentures thin; "loan capital" missing | Ordinary shares: voting rights, variable dividend, repaid last. Preference shares: fixed-rate dividend paid first. Debentures (loan capital): fixed interest payable whether or not there is a profit, repayable on a stated date |
| 12 | T | course.mjs | 5.4 Manufacturing costs and WIP | "Production cost" in the rule, question, example and explanation | "Factory cost of production" (syllabus term) throughout; question says "factory overheads" |
| 13 | F/M | course.mjs | 6.1 Profitability ratios | ROCE said "profit before interest", not "profit for the year before interest"; no sole-trader capital employed; mentioned a "Cambridge formula sheet"; the MCQ gave profit before interest directly, so it did not test the adjustment | Syllabus formula and both capital employed definitions (company; sole trader/partnership); syllabus formulas called "the only ones accepted"; example and MCQ now add debenture interest back to profit for the year (10,000 + 2,000 = 12,000 ÷ 80,000 = 15%), distractors 12.5% (after interest), 10%, 2.5% |
| 14 | F/T | course.mjs | 6.1 Liquidity ratios | Ratio names shortened ("current ratio", "acid test") | "Current (working capital) ratio", "acid test (liquid) ratio", both formulas given in full, answers shown as x : 1 |
| 15 | F/T | course.mjs | 6.1 Efficiency ratios | Rule called it "inventory turnover times" | "Rate of inventory turnover (times)"; average inventory formula and all three days formulas written in syllabus form |
| 16 | T | course.mjs | 6.3 Comparing different businesses | Rule did not use the syllabus heading | Rule begins "Inter-business comparison" |
| 17 | T | course.mjs | 6.5 Limits of financial statements | "Historical costs" | "Historic cost" and "application of accounting policies" named as the syllabus limitations |
| 18 | T/A/M | course.mjs | 7.1 Accounting concepts in practice | "historical cost"; going concern and realisation definitions too loose; distractor "Money measurement only" | Historic cost; going concern (no break-up values); realisation (when goods or services pass to the customer); matching covers income and expenses; distractor replaced with "Prudence" |
| 19 | M | course.mjs | 7.2 Ethics MCQ | Distractors "Inventory turnover", "Trade discount", "Imprest" were not plausible | Confidentiality, Consistency, Money measurement |
| 20 | C | course.mjs | 7.3 Digital accounting and storage | Did not cover all four storage systems ("other digital services" missing) or the risks of unsafe storage | Manual, data storage devices, cloud services and other digital services each with an advantage and a disadvantage; risks of unsafe storage added |
| 21 | M | course.mjs | extraPractice 3.1 (error of principle) | Distractors "One-sided posting", "Trial-balance addition only", "Cash shortage" were weak | Commission, Original entry, Complete reversal; explanation contrasts principle with commission |
| 22 | T | course.mjs | extraPractice 4.3 (unpaid insurance) | Choices said "current liability" and "prepayment asset" without the syllabus heading; "Capital income" made no sense | Choices name other payables / other receivables; "Capital expenditure" added as a distractor; explanation refers to matching |
| 23 | M | course.mjs | extraPractice 5.4 (factory overheads) | "Office stationery only", "Owner drawings" were weak distractors | Office stationery, Carriage outwards |
| 24 | F/M | course.mjs | extraPractice 6.1 (inventory turnover) | Question said "Inventory turnover?" with no unit; distractors "20%" and "50 days" | "Rate of inventory turnover?"; distractors 0.2 times (inverted), 73 days (the days measure, correctly calculated), 8 times; explanation tells times and days apart |
| 25 | M | course.mjs | extraPractice 7.1 (accruals) | Distractors "Cash basis only", "Drawings", "Trade discount" were not concepts | Realisation, Business entity, Historic cost |
| 26 | M | course.mjs | extraPractice 7.2 (confidentiality) | Distractors "Profit margin", "Prime cost", "Realisation only" were not ethical principles | Objectivity, Professional behaviour, Integrity |
| 27 | A/M | extensions.mjs | 3.4 Unusual control-account entries | Overdue interest credited "interest income"; distractor "Debit decreases bank only" made no sense | Debit customer (sales ledger control) / credit interest received; four plausible debit/credit choices |
| 28 | T | extensions.mjs | 4.2 Recording disposal in three ledger accounts | "historical cost"; "debit accumulated depreciation"; the three accounts were not named | Historic cost; names the non-current asset, provision for depreciation and disposal accounts; debit the provision for depreciation account |
| 29 | A/C | extensions.mjs | 4.5 Inventory item-by-item comparison | Effect of a closing inventory error left out equity and the next year (4.5 bullet) | Gross profit, profit for the year, current assets and equity, then next year's opening inventory |
| 30 | T | extensions.mjs | 5.1 Preparing a financial-position statement | "net receivables", "prepayments", "payables", "accruals" | Trade receivables less allowance for irrecoverable debts, other receivables, trade payables, other payables; intangible assets heading noted |
| 31 | F/T | extensions.mjs | 6.1 Turnover periods and capital employed | "Receivable days", "Payable days", "closing trade receivables", ROCE "profit before interest", no sole-trader capital employed | Syllabus names and formulas; profit for the year before interest; both capital employed definitions; example uses "debentures" and "trade payables" |
| 32 | T | extensions.mjs | 6.2 Working-capital decisions | "stock" | "inventory" |
| 33 | M | extensions.mjs | 7.1 Applying all ten concepts MCQ | Distractors "Cash accounting", "Drawings", "Imprest" were not concepts | Prudence, Consistency, Going concern (Matching left out on purpose so only one answer is correct) |
| 34 | M | extensions.mjs | 7.2 Ethical conflicts MCQ | Distractors "A higher gross profit margin", "Capital expenditure", "Credit control" were not principles | Confidentiality, Objectivity, Integrity |
| 35 | T | structured.mjs | All mocks Q1 stimulus | Did not say which side the bank statement balance was on; did not mention digital payments | "positive (credit) balance"; adds that most payments are digital (sets up the AO3 part) |
| 36 | S | structured.mjs | Q1(a) 6 marks | The opening balance earned no mark; vague points ("Appropriate account details", "Debit closing balance presentation") | Six figure-specific points: opening $2,400 Dr, transfer $700 Dr, charges $60 Cr, direct debit $250 Cr, balance c/d $2,790, balance b/d $2,790 Dr (all ×k); model shows totals $3,100×k |
| 37 | S | structured.mjs | Q1(b) 5 marks | Generic points | Figure-specific points plus a title/labels mark |
| 38 | S/T | structured.mjs | Q1(c) 4 marks | Asked for a "journal entry" for a transaction that is first recorded in the purchases journal; mark "Equal correct amounts" | "State the double entry ... and identify the book of prime entry"; marks: debit purchases, credit Lina (purchases ledger), amount ×k, purchases journal |
| 39 | S | structured.mjs | Q1(d) 5 marks | No evaluation (explain + recommend a control) | "Explain ... Evaluate this view" (digital payments mean no reconciliation is needed); marks for already recorded, timing, digital benefit, remaining risks, justified conclusion (AO3) |
| 40 | T | structured.mjs | Q2 stimulus | "damaged stock", "Receivables", "4% allowance on the remainder", depreciation method not named | Damaged goods, trade receivables, allowance for irrecoverable debts, straight-line at 10% per annum on cost |
| 41 | S | structured.mjs | Q2(a) 4 marks | Generic points | Write-down $400, inventory $9,600, cost of sales $52,400, gross profit $37,600 (own figure), all ×k |
| 42 | S | structured.mjs | Q2(b) 8 → 7 marks | A non-specific "headings and presentation" mark; "Debt write-off" | Seven figure-specific marks (rent, electricity, depreciation, irrecoverable debts, allowance 4% of $7,500, total, profit for the year own figure); prompt says "from gross profit to profit for the year" |
| 43 | S/T | structured.mjs | Q2(c) 4 → 3 marks | Repeated the inventory figure already marked in (a); "rent prepayment" / "electricity accrual" | Net trade receivables, other receivables, other payables |
| 44 | S | structured.mjs | Q2(d) 4 → 3 marks | "Correct equal amount" mark; unclear whether depreciation counted | Debit repairs, credit equipment, profit $400 lower; prompt says to ignore depreciation |
| 45 | S | structured.mjs | Q2(e) new, 3 marks | The question had no AO3 part | "Evaluate" the owner's wish to value damaged goods at cost: $400 overstatement of profit and assets, lower of cost and NRV / prudence, justified conclusion |
| 46 | S | structured.mjs | Q3(a)(b)(c) | Generic mark points | Figure-specific points (×k); current account model shows c/d and b/d; own-figure follow-through on profit share |
| 47 | S | structured.mjs | Q3(d) 4 marks | "Compare" (AO2) with no judgement | Stimulus adds a $50,000×k funding need; "Evaluate whether ... ordinary shares or debentures", ending in a justified recommendation (AO3) |
| 48 | S/T | structured.mjs | Q4 stimulus and (a)(b)(c) | "WIP", "arrears/advances" not explained, generic points | Work in progress spelled out, subscriptions in arrears/advance explained; figure-specific points; (b) contrasts the receipts and payments account with the income and expenditure account |
| 49 | S | structured.mjs | Q4(d) 3 marks | An "explain" part with no evaluation | "Evaluate and advise" on continuing without full double-entry records (5.6 advantages and disadvantages); stimulus says the trader keeps only a bank record and invoices |
| 50 | F | structured.mjs | Q5 stimulus | Capital employed was given as one total (the formula was not tested); "profit" left unclear whether before or after interest | Issued shares $30,000 + reserves $20,000 + 10% debentures $30,000 = $80,000 (×k); profit for the year $9,000 after debenture interest $3,000 (×k) |
| 51 | F/S | structured.mjs | Q5(a) 6 marks | Model gave results with no workings; "current ratio"; "receivables" | Full workings with syllabus names and formulas; ROCE mark requires profit before interest and the capital employed definition; ratios as x : 1 |
| 52 | S | structured.mjs | Q5(b)–(e) | Command words loose ("Recommend", "Explain an appropriate response") | Analyse / Explain and Give / Advise / Advise and Justify; models end with a judgement |
| 53 | C | lab-content.mjs | COMMAND_WORDS | Analyse, Demonstrate, Give and Justify were missing; meanings drifted from the syllabus table | All 16 syllabus command words, meanings aligned to the syllabus table, Arabic helper line for each new word |
| 54 | C | lab-content.mjs | COMMAND_DRILLS cw13–cw16, T templates | No drills for the four new words | Four new 4-option drills (Give, Demonstrate, Analyse, Justify) with answer templates |
| 55 | T | lab-content.mjs | cw4, cw7, cw9, cw10 | "income statement", "accounting principle", "acid test ratio", "current ratio" | Statement of profit or loss, accounting concept, acid test (liquid) ratio, current (working capital) ratio |
| 56 | A | lab-content.mjs | cw9 explanation | Said collecting debts faster improves the acid test ratio (it does not: trade receivables and cash are both in the numerator) | Valid actions (sell surplus inventory for cash, introduce capital, replace an overdraft with a long-term loan) plus a note on why collecting debts alone does not change it |
| 57 | T | lab-content.mjs | DOUBLE_ENTRY de17 | Credit account "Accumulated depreciation" | "Provision for depreciation (van)" |
| 58 | T | lab-content.mjs | DOUBLE_ENTRY de8 | Distractor "Sundry expenses" | "General expenses" |
| 59 | T | lab-content.mjs | FIND_ERROR fe3 | "Income statement extract" | "Statement of profit or loss extract" |
| 60 | T | lab-content.mjs | SORTERS tb / is / sfp | "Accumulated depreciation" account; "income statement" title; prepaid and accrued items unlabelled | Provision for depreciation; statement of profit or loss; "(other receivables)" / "(other payables)" labels |
| 61 | F/T | lab-content.mjs | computeRatios names and formulas | "Current ratio", "Rate of inventory turnover", "Inventory turnover in days", receivables/payables turnover without "(days)"; ROCE "Profit before interest"; capital employed wording | Syllabus names and formulas; ROCE "Profit for the year before interest"; capital employed for companies and sole traders (values unchanged; calculator tests still pass) |
| 62 | A | lab-content.mjs | Mark-up "read" text | "Always higher than the gross profit margin" (false for a gross loss) | "whenever there is a gross profit" |
| 63 | T | lab-content.mjs | Inventory days "read" text | "run out of stock" | "run out of inventory" |

## Totals by kind (a row tagged with two kinds counts under each)

- Terminology (T): 29
- Ratio formula / presentation (F): 8
- Technical accuracy (A): 8
- MCQ quality (M): 11
- Syllabus coverage (C): 9
- Mark scheme and AO3 (S): 15

63 change rows in all: course.mjs 26, extensions.mjs 8, structured.mjs 18, lab-content.mjs 11.

## Paper 2 AO3 check (after review)

Each original-mock question now ends with an analysis or evaluation part: Q1(d) Evaluate (5), Q2(e) Evaluate (3), Q3(d) Evaluate (4), Q4(d) Evaluate and advise (3), Q5(b) Analyse (5) and (d)/(e) Advise (6). That is about 18–26% of each paper, more than the ~15% AO3 weighting, because some of these parts also carry AO2 marks.

## Tests

No figure that a test depends on was changed: $882 (cash book and discounts), $3,000 (depreciation methods), $180 (inventory item-by-item), $7,000 (working-capital decisions), the fe6/fe7 puzzles and the ratio calculator values. `node scripts/build-accounting-content.mjs` and `npm test` (28/28) both pass.
