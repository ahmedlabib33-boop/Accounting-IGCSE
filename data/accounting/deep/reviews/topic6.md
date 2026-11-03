# Topic 6 review log: Analysis and interpretation (6.1 to 6.5)

Reviewer role: senior Cambridge IGCSE Accounting 0452 teacher and examiner. Authority: `docs/syllabus/0452-2027-2029-syllabus.txt` (Topic 6 and the "Accounting ratios" page) and `REVIEW-BRIEF.md`.
Validator: `node scripts/validate-deep.mjs --topic 6` prints OK.

Every calculation in the file was re-worked by script after editing: 211 divisions (ratios, percentages, days) and 107 additions or subtractions all agree with the stated answers.

## Changes

Kinds: T = terminology, A = accuracy, C = coverage, S = scope, M = mark scheme.

| # | Kind | Section | Item | What was wrong | What I changed |
|---|---|---|---|---|---|
| 1 | T | all | `topic.name`, header comment | "Financial analysis" is not the syllabus title | "Analysis and interpretation" (matches syllabus and `app/_lib/study-engine.mjs`) |
| 2 | T | 6.1 | title | "Calculating ratios" | "Calculation and understanding of accounting ratios" |
| 3 | T | 6.2 | title | "Interpreting ratios" | "Interpretation of accounting ratios" |
| 4 | T | 6.3 | title, summary, notes, prompts, MCQs | "Inter-firm comparison" (13 places) | "Inter-business comparison" throughout |
| 5 | T | 6.4 | title, objectives, note headings, table, prompts | "Users of accounts" used as the heading | "Interested parties"; "user" kept only as plain explanation |
| 6 | T | 6.5 | title | "Limitations" | "Limitations of accounting statements" |
| 7 | T | all | notes, tables, examples, exercises, MCQs, points | "gross margin" (143 places) | "gross profit margin" |
| 8 | T | all | everywhere | "liquid (acid test) ratio", "current ratio", "liquid ratio" | Syllabus names "current (working capital) ratio" and "acid test (liquid) ratio" (about 150 places) |
| 9 | T | all | everywhere | "receivables days", "payables days" (44 places) | "trade receivables turnover (days)", "trade payables turnover (days)" |
| 10 | T | 6.1 | key terms, formula table | Efficiency ratios named without the syllabus unit labels | "Rate of inventory turnover (times)", "Trade receivables turnover (days)", "Trade payables turnover (days)" |
| 11 | T | 6.3, 6.5 | notes, tables, ex-6.3-7, ex-6.5-5, ex-6.5-10, mcq-6.3-9, mcq-6.5-9 | "provision for doubtful debts" and "provisions" (22 places) | "allowance for irrecoverable debts" / "allowances" |
| 12 | T | 6.2, 6.3, 6.5 | ex-6.2-4 points, mcq-6.3-9, mcq-6.5-4 | "bad debts" | "irrecoverable debts" |
| 13 | T | 6.3, 6.5 | notes, tables, ex-6.5-5 | "net book value" | "carrying amount" |
| 14 | T | 6.2, 6.5 | key terms, notes, mcq-6.2-10, mcq-6.5-1, mcq-6.5-10, sq-6.5-1 | Historic cost, money measurement, consistency, going concern and prudence called "principles" | "concepts" (topic 7.1 wording) |
| 15 | T | all | 27 places | "stock" | "inventory" |
| 16 | T | 6.4 | key term "Tax authority", tables | Syllabus says "governments / tax authorities" | "Governments and tax authorities"; table rows "Bank" and "Investor or lender" split as in the syllabus |
| 17 | A | 6.1 | summary, objectives, first two notes, WE1, ex-6.1-9, ex-6.1-10 | Taught "eight ratios"; the syllabus has ten | All text now says ten and lists them in the syllabus groups (4 profitability, 2 liquidity, 4 efficiency) |
| 18 | A | 6.1 | note "Profitability: where each figure comes from" | Told students to follow a question's own capital employed, e.g. opening capital; the syllabus says only its formulas are accepted | Capital employed given exactly as the syllabus (issued shares + reserves + non-current liabilities; capital + non-current liabilities for a sole trader) |
| 19 | A | 6.1 | note "Efficiency", exam tips | Advised using closing inventory alone; rounding advice was one-sided | Both inventory ratios use average inventory; days answers accepted as decimal or rounded up whole days |
| 20 | A | 6.1 | mcq-6.1-7 | Explanation of the 73-day distractor was false (halving sales gives 90 days) | Distractor replaced by 180 days (cash sales used instead of credit sales) with a correct explanation |
| 21 | A | 6.1 | mcq-6.1-8 | Distractors 37 and 44 days were not real student errors ("does not follow from these figures") | Replaced by an inventory turnover (days) question with three genuine errors (closing only, total not average, times not days) |
| 22 | A | 6.2 | WE "Falling margins", step 3 | Said the fall in profit margin was "entirely" caused by gross profit margin | Precise split: gross profit margin fell 5 points, expense control saved 2, profit margin fell 3 |
| 23 | A | 6.2 | note "Actions to improve liquidity" | Reason given for a sub-1:1 current ratio falling after paying suppliers ("smaller top and a bigger bottom") was wrong | Correct explanation: taking the same amount off both when current assets are smaller makes the ratio fall |
| 24 | A | 6.2 | ex-6.2-10 model | "Inventory turnover halved from 8 to 5 times" | "fell from 8 to 5 times" |
| 25 | A | 6.2 | WE "Liquidity getting worse" | Days held stated loosely | Expressed as inventory turnover of about 61 days against 41 days |
| 26 | A | 6.3 | note "Problems of comparison: accounting choices and timing" | Said reducing balance makes ROCE "may be higher"; it is lower (and the same section's WE shows 11.11% against 16.67%) | Corrected: profit falls by a larger proportion than capital employed, so ROCE is usually lower |
| 27 | A | 6.3 | mcq-6.3-6 explanation | ROCE shown without × 100 | × 100 added |
| 28 | A | 6.3 | mcq-6.3-9 | Stem did not say the allowance was created this year, so "lower profit" was not certain | Stem rewritten: both create the allowance this year (2% against 5% of trade receivables) |
| 29 | A | 6.3 | mcq-6.3-10 | Silly distractors (logo colour, page count) | Replaced with plausible ones (one year's dollar profit, revenue, number of employees) |
| 30 | A | 6.5 | old note "Estimates and the limits of ratios" | Said there is "no single agreed formula" and some use opening capital for ROCE, which contradicts the syllabus | Rewritten: estimates sit within accounting policies; always use the syllabus formulas |
| 31 | C | 6.1 | key terms, formula table, profitability note, WE1, ex-6.1-7, ex-6.1-8, ex-6.1-9, ex-6.1-10, mcq-6.1-3, sq-6.1-1(a) | Mark-up was not taught or practised (named only as an error) | Mark-up formula, unit, link to margin ($100 cost, $125 price = 25% mark-up, 20% margin) taught and practised in 9 items |
| 32 | C | 6.1, 6.2, 6.4 | key terms, table, efficiency note, WE1, WE3, ex-6.1-4, ex-6.1-9, ex-6.1-10, mcq-6.1-8, sq-6.1-1(c), sq-6.2-2(a), sq-6.4-2(a), 6.2 efficiency table | Inventory turnover (days) was missing from the topic | Taught with the syllabus formula and practised in 9 items |
| 33 | C | 6.1 | mcq-6.1-1 | Duplicated the gross profit margin formula question | Now tests the trade payables turnover (days) formula, so payables stay in the MCQ set |
| 34 | C | 6.1 | key terms | "Ratio" and "Liquid assets" took two places needed for the new ratios | Replaced with "Mark-up" and "Inventory turnover (days)" |
| 35 | C | 6.2 | first note, key term, WE1 step 1, ex-6.2-5 | "Prepare and comment on statements showing comparison of results for different years" not taught | New note with a worked comparison statement (columns for each year, change $ and change %); ex-6.2-5 is now a "Prepare a statement comparing" task (5 marks) |
| 36 | C | 6.2 | new note "What changes gross profit and profit for the year", ex-6.2-1, mcq-6.2-9 | Effect of inventory valuation, sales quantity and selling and purchasing prices on gross profit not taught explicitly | New note and table (quantity changes gross profit but not margin, etc.); new exercise and MCQ on inventory overvaluation and supplier price rises |
| 37 | C | 6.2 | same note, key term "Other income", ex-6.2-6, WE "Trade payables doubled", mcq-6.2-2 | Effect of other income and expenses on profit for the year not practised | New calculation exercise (Amal) where profit falls although gross profit rises; discount received identified as other income |
| 38 | C | 6.2 | "Profit is not cash" note, ex-6.2-2, mcq-6.2-10 | Cash vs profit taught but never practised | Note extended (loans and capital bring cash but are not income); new exercise and MCQ |
| 39 | C | 6.2 | objectives, profitability note | Gross profit margin and profit margin as indicators of profitability not stated; objectives missed several bullets | Objectives now cover all seven 6.2 bullets; note opens with the two margins as the main indicators; mark-up row added to the causes table |
| 40 | C | 6.3 | objective 3 | Did not name "the factors that may affect the ratios of two businesses" | Objective rewritten to the syllabus bullet |
| 41 | C | 6.4 | summary, objectives, key terms, first note table, rewritten note "Customers, governments, investors and lenders" | Governments beyond tax, public bodies and environmental bodies hardly covered; "competitors" listed in place of syllabus parties | Full syllabus list everywhere; governments' uses (statistics, grants, regulation); key terms Club member, Public body, Environmental body |
| 42 | C | 6.4 | new note "Club members, the public and environmental bodies", decision table | No teaching for public and environmental bodies; club members only one sentence | New note; table rows for club member and public or environmental body |
| 43 | C | 6.4 | ex-6.4-2, ex-6.4-9, mcq-6.4-9, mcq-6.4-10 | Club members and environmental bodies never practised; two items duplicated bank and supplier questions | Club members exercise and MCQ (income and expenditure vs receipts and payments); environmental body in ex-6.4-9 (dye works by a river) and an MCQ |
| 44 | C | 6.5 | summary, objectives, notes | Limitations not organised around the three syllabus factors; economic climate only a table row | Notes now follow historic cost, application of accounting policies, non-financial aspects (skill of workforce, location, economic climate) with a new economic climate note |
| 45 | C | 6.5 | WE2 (new) | No numerical example of accounting policies | Two identical shoe shops: inventory written down to NRV and 2% vs 5% allowance change GPM, profit margin and current ratio |
| 46 | C | 6.5 | WE3 (new) | No example of the economic climate | Importer hit by 10% inflation, a weaker currency and a local factory closure |
| 47 | C | 6.5 | ex-6.5-3, ex-6.5-6, ex-6.5-7, mcq-6.5-4, -5, -6, -8 | Policies, workforce, location and economy under-practised | New economic climate exercise, policies calculation, five-limitation answer built on the three factors, four new MCQs |
| 48 | C | 6.5 | key terms | No terms for economic climate, carrying amount or consistency | Added; out-of-scope terms removed (row 52) |
| 49 | S | 6.5 | note "Timing: a snapshot, a season, a single year" | Window dressing and seasonality are not limitations listed in 6.5 | Replaced by "Non-financial aspects: the economic climate" (year-end differences stay in 6.3 as a factor affecting two businesses' ratios) |
| 50 | S | 6.5 | WE "Window dressing the current ratio" | Out of scope | Replaced by row 45 |
| 51 | S | 6.5 | WE "Seasonality and the choice of year end" | Out of scope for 6.5 and repeated 6.3 | Replaced by row 46 |
| 52 | S | 6.5 | key terms Window dressing, Snapshot, Seasonal business | Out of scope | Removed |
| 53 | S | 6.5 | ex-6.5-3, ex-6.5-6, mcq-6.5-4, mcq-6.5-5, mcq-6.5-8 | Tested window dressing and year-end timing | Replaced (row 47) |
| 54 | S | 6.5 | objective 4, common errors 3 and 5, exam tip 4 | Taught window dressing and timing | Replaced with economic climate and estimates within policies |
| 55 | S | 6.5 | ex-6.5-10, sq-6.5-1 (stimulus, c, d), sq-6.5-2 (stimulus, c, d) | Marks given for year-end timing and window dressing | Stimuli now give workforce and economic-climate facts; marks go to the three syllabus factors |
| 56 | S | 6.4 | key term "Interest cover", ex-6.4-10 and sq-6.4-1 points | Interest cover is not one of the ten syllabus ratios | Removed as a ratio; points say "profit before interest is many times the interest" in plain words |
| 57 | S | 6.2, 6.4 | mcq-6.2-10 distractor; WE "potential buyer" | "Window dressing" used as a distractor; "return on the asking price" looked like a ratio | Distractor gone (question replaced); the buyer comparison is labelled as not a syllabus ratio |
| 58 | M | 6.1 | ex-6.1-4 | 3 marks, no days | 4 marks: average inventory, times, days (52.14 or 53), reason for cost of sales |
| 59 | M | 6.1 | ex-6.1-8 | No mark-up | Gross profit and margin merged into one mark; mark-up 56.25% earns one mark |
| 60 | M | 6.1 | ex-6.1-9, ex-6.1-10 | 8 ratios only | ex-6.1-9 is 10 marks, one per syllabus ratio; ex-6.1-10 keeps 10 marks with merged marks so all ten ratios plus credit purchases are credited |
| 61 | M | 6.1 | sq-6.1-1 (a, c, d) | Part d was explanation only, so the question did not end with AO3 | a and c gain mark-up and days marks; d is now "advise" with a drawback mark |
| 62 | M | 6.1 | sq-6.1-2 (d) | Ended with a calculation and explanation | d is now "Evaluate whether the position was better or worse", with judgement marks |
| 63 | M | 6.2 | sq-6.2-2 | Ended with an explanation part; advice came before it | Parts swapped so (c) explains (4) and (d) advises (6); part (a) credits inventory days |
| 64 | M | 6.3, 6.4 | sq-6.3-1 (d), sq-6.4-2 (a) | (d) began "State"; (a) did not credit inventory days | (d) now "Advise the bank"; (a) restructured to six one-mark points including inventory turnover 60.83 or 61 days |

Totals: terminology 16, accuracy 14, coverage 18, scope 9, mark scheme 7 (64 rows).

## Coverage against syllabus

6.1 Calculation and understanding of accounting ratios (syllabus formulas only)
- [x] Gross profit margin: formula table, WE1, ex-6.1-1, -8, -9, -10, mcq-6.1-2, sq-6.1-1, sq-6.1-2
- [x] Mark-up: profitability note, WE1, ex-6.1-7, -8, -9, -10, mcq-6.1-3, sq-6.1-1(a)
- [x] Profit margin: WE1, ex-6.1-2, -8, -9, -10, sq-6.1-1, sq-6.1-2
- [x] ROCE with profit for the year before interest and syllabus capital employed: profitability note, WE1, WE2, ex-6.1-6, -8, mcq-6.1-9, -10, sq-6.1-1, sq-6.1-2
- [x] Current (working capital) ratio as x:1: liquidity note, WE1, WE4, ex-6.1-3, mcq-6.1-4
- [x] Acid test (liquid) ratio as x:1: liquidity note, WE1, WE4, ex-6.1-3, mcq-6.1-5
- [x] Rate of inventory turnover (times): efficiency note, WE1, WE3, ex-6.1-4, mcq-6.1-6
- [x] Inventory turnover (days): efficiency note, WE1, WE3, ex-6.1-4, mcq-6.1-8, sq-6.1-1(c)
- [x] Trade receivables turnover (days): WE1, WE3, ex-6.1-5, mcq-6.1-7, sq-6.1-2(d)
- [x] Trade payables turnover (days): WE1, WE3, ex-6.1-5, mcq-6.1-1, sq-6.1-1(c)

6.2 Interpretation of accounting ratios
- [x] Prepare and comment on comparison statements for different years: note "Comparison statements and a good interpretation", WE1, ex-6.2-5, sq-6.1-2(d), sq-6.2-1
- [x] Interpret the ratios in 6.1: notes on profitability, liquidity and efficiency, WE2, WE3, WE4, ex-6.2-3, -4, -7, -8, mcq-6.2-4 to -8
- [x] Suggestions for improving profitability, liquidity and working capital: two action notes with tables, ex-6.2-9, -10, sq-6.2-1(d), sq-6.2-2(d)
- [x] Gross profit margin and profit margin as indicators of profitability: profitability note, WE1, ex-6.2-5, ex-6.2-9, mcq-6.2-2
- [x] Gross profit affected by inventory valuation, sales quantity, selling and purchasing prices: note "What changes gross profit and profit for the year", ex-6.2-1, mcq-6.2-1, mcq-6.2-9, sq-6.2-1(b)
- [x] Profit for the year affected by gross profit, other income and expenses: same note, ex-6.2-6, WE4 (discount received), mcq-6.2-2
- [x] Reasons for the difference between cash and profit: note "Profit is not cash", ex-6.2-2, mcq-6.2-10

6.3 Inter-business comparison
- [x] Factors that may affect the ratios of two businesses: notes "Comparing like with like" and "Problems of comparison" (size, trade, ownership, premises, financing, age of assets, policies, year ends), WE1 to WE3, ex-6.3-3, -5, -6, -8
- [x] Problems of inter-business comparison: notes, WE4 (industry average), ex-6.3-7, -9, -10, mcq-6.3-2 to -10, sq-6.3-1(c), sq-6.3-2(c)

6.4 Interested parties
- [x] Owners: note "Owners, managers and employees", table, ex-6.4-4, -6, mcq-6.4-8
- [x] Managers: same note, table, ex-6.4-6, mcq-6.4-1
- [x] Employees: same note, WE4, ex-6.4-4, -10, mcq-6.4-4, sq-6.4-1(c), sq-6.4-2(c)
- [x] Banks: note "Banks, other lenders and suppliers", WE1, ex-6.4-5, mcq-6.4-3, sq-6.4-1
- [x] Investors and lenders: notes, WE3, ex-6.4-7, -9 (shareholders, debenture holders), mcq-6.4-6
- [x] Suppliers: note, WE2, ex-6.4-3, -8, mcq-6.4-2, sq-6.4-2
- [x] Customers: note "Customers, governments, investors and lenders", ex-6.4-4, mcq-6.4-7
- [x] Governments / tax authorities: same note (tax, statistics, grants, regulation), ex-6.4-4, -9, mcq-6.4-5
- [x] Club members: note "Club members, the public and environmental bodies", ex-6.4-2, mcq-6.4-10
- [x] Other parties, e.g. public and environmental bodies: same note, table, ex-6.4-9, mcq-6.4-9

6.5 Limitations of accounting statements
- [x] Historic cost: note "Historic cost", WE1, ex-6.5-1, -4, -9, mcq-6.5-1, -7, sq-6.5-1(b, c)
- [x] Application of accounting policies: notes "Application of accounting policies" and "Estimates", WE2, ex-6.5-5, -6, mcq-6.5-3, -5, -8, -9, sq-6.5-2(c)
- [x] Non-financial aspects (skill of the workforce, location, economic climate): two non-financial notes, WE3, WE4, ex-6.5-2, -3, -7, -8, -10, mcq-6.5-2, -4, -6, -10, sq-6.5-1(c), sq-6.5-2(c)

Out of scope removed: window dressing, year-end snapshot and seasonality as 6.5 limitations, and interest cover as a ratio. Different year ends remain only in 6.3, as a factor that affects the ratios of two businesses.
