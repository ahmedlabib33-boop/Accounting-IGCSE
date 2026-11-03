# Teacher review brief: Cambridge IGCSE Accounting 0452, 2027–2029

You are reviewing as a senior Cambridge 0452 teacher and examiner. The official syllabus text is in
`docs/syllabus/0452-2027-2029-syllabus.txt` (extracted from the Cambridge PDF). It is the only authority.
Where this brief and the syllabus differ, the syllabus wins. Where the README's quality bar and this brief
differ, this brief wins (the README was written before the syllabus was checked).

## Terminology the 2027–2029 syllabus uses (fix every deviation)

| Use | Not |
|---|---|
| allowance for irrecoverable debts (the account, the adjustment, "increase/decrease in allowance") | provision for doubtful debts, provision for bad debts, doubtful debts provision |
| irrecoverable debts; irrecoverable debts recovered | bad debts |
| provision for depreciation account (this one stays "provision") ; accumulated depreciation; carrying amount | net book value (may appear once as "also called"), written down value |
| statement of profit or loss; statement of financial position; statement of changes in equity | income statement (may appear once as "older books call it") |
| accounting concepts (topic 7.1 title is "Accounting concepts") | accounting principles |
| ethical considerations; the five fundamental principles | — |
| inter-business comparison (6.3) | inter-firm comparison |
| interested parties (6.4) | users of accounts (fine as an explanation, not as the heading) |
| gross profit margin; mark-up; profit margin | gross margin (as the ratio's name) |
| current (working capital) ratio; acid test (liquid) ratio | — |
| rate of inventory turnover (times); inventory turnover (days); trade receivables turnover (days); trade payables turnover (days) | inventory days, debtor days, creditor days |
| other receivables / other payables (accrued and prepaid items) | sundry debtors/creditors |
| trade receivables / trade payables; inventory; non-current assets; non-current liabilities; capital; drawings; equity | debtors, creditors, stock, fixed assets |
| general reserve; retained earnings; preference share capital; ordinary share capital; debentures (loan capital); issued, called-up, paid-up share capital | — |
| accumulated fund; receipts and payments account; income and expenditure account; surplus / deficit | — |

## Ratio formulas: the ONLY formulas accepted (syllabus says so)

- Gross profit margin (%) = gross profit ÷ revenue × 100
- Mark-up (%) = gross profit ÷ cost of sales × 100
- Profit margin (%) = profit for the year ÷ revenue × 100
- ROCE (%) = profit for the year **before interest** ÷ capital employed × 100; capital employed = issued shares + reserves + non-current liabilities (for a sole trader or partnership: capital + non-current liabilities)
- Current (working capital) ratio = current assets ÷ current liabilities, answer presented as a ratio (x : 1)
- Acid test (liquid) ratio = (current assets − inventory) ÷ current liabilities, as a ratio
- Rate of inventory turnover (times) = cost of sales ÷ average inventory
- Inventory turnover (days) = average inventory ÷ cost of sales × 365
- Trade receivables turnover (days) = trade receivables ÷ credit sales × 365
- Trade payables turnover (days) = trade payables ÷ credit purchases × 365

Every calculation, worked example, mark point and MCQ must use exactly these. Average inventory = (opening + closing) ÷ 2.

## Scope notes from the syllabus (check content against them)

- 2.1 includes three-column running balance ledger accounts and digital ledgers; folio columns are NOT required.
- 2.2 documents: invoice, debit note, credit note, cheque counterfoil, paying-in slip, receipt, bank statement, statement of account; manual or digital.
- 2.3 includes cards, online and bank transfers; benefits and limitations of keeping cash on the premises; benefits and limitations of manual and of digital original entry.
- 3.1 purposes AND limitations of a trial balance; amending a trial balance that contains errors.
- 3.3 includes bank errors and the impact of digital transactions on reconciliation.
- 3.4 includes interest on overdue accounts, refunds, dishonoured cheques, contra, debit and credit balances in each account, and the impact of digital recording. Reconciling control accounts with ledger lists is NOT required.
- 4.2 straight-line, reducing balance AND revaluation; choosing an appropriate method for an asset type; journal entries for depreciation, purchase and sale.
- 4.5 effect of incorrect inventory on gross profit, profit for the year, equity and asset valuation.
- 5.1 includes advantages/disadvantages of being a sole trader; intangible assets as a SOFP heading; drawings of goods and of other assets and private expenses paid by the business; manufacturing sole traders.
- 5.2 excludes dissolution, changes in profit-sharing ratio, LLPs, admission/departure of a partner (so goodwill is out of scope for 0452).
- 5.3 capital structure: preference share capital, ordinary share capital, general reserve, retained earnings; features of ordinary shares and debentures; limited liability; equity.
- 5.6 incomplete records only for sole-trader trading businesses (no service or manufacturing); uses mark-up, margin and inventory turnover.
- 6.2 includes cash vs profit differences and how inventory valuation, quantity and prices affect gross profit.
- 6.4 interested parties: owners, managers, employees, banks, investors and lenders, suppliers, customers, governments/tax authorities, club members, other parties such as public and environmental bodies.
- 6.5 limitations: historic cost, application of accounting policies, non-financial aspects (skill of workforce, location, economic climate).
- 7.1 the ten concepts: business entity, consistency, duality, going concern, historic cost, matching/accruals, materiality, money measurement, prudence, realisation.
- 7.2 the five fundamental principles: integrity, objectivity, professional competence and due care, confidentiality, professional behaviour; significance to stakeholders and society.
- 7.3 is "Technology and sustainability": digital applications for all or part of the records; storing data safely AND sustainably; the risks of not doing so; storage systems — manual, data storage devices, cloud services, other digital services — with advantages and disadvantages of each. Candidates do NOT need knowledge of specific software packages. Cost comparisons of software products are not on the syllabus.

## Paper format

Paper 1: 1 hour 30 minutes, 40 multiple-choice, 30%. Paper 2: 1 hour 45 minutes, five compulsory 20-mark questions, 70%, stimulus-based. AO weightings: Paper 2 includes about 15% evaluation (AO3), so structured questions must end with an evaluation/advice part.

## Command words (use them in prompts as Cambridge does)

Advise, Analyse, Calculate, Compare, Define, Demonstrate, Describe, Discuss, Evaluate, Explain, Give, Identify, Justify, Prepare, State, Suggest.

## What a review must do

1. Read your topic's sections in the syllabus text.
2. Fix terminology and formulas everywhere in the topic file (notes, tables, examples, exercises, mark points, MCQs, explanations, key terms).
3. Check every bullet of the syllabus for your sections is actually taught somewhere (notes or a worked example) and practised (an exercise, MCQ or structured part). Add what is missing, inside the existing counts (replace weaker items if a count is at its maximum).
4. Remove or clearly relabel anything outside the 0452 syllabus.
5. Check technical accuracy of every double entry, layout and figure. Re-add every total. Check every MCQ has exactly one correct answer.
6. Check mark points are what a Cambridge examiner would credit, one mark each, including own-figure follow-through where natural.
7. Keep the shape valid: `node scripts/validate-deep.mjs --topic N` must print OK.
8. Write a review log to `data/accounting/deep/reviews/topicN.md`: one table row per change (section, item id or note heading, what was wrong, what you changed), then a short "coverage against syllabus" checklist with each syllabus bullet ticked and where it is taught.
