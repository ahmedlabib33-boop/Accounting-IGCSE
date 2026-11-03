# Teacher review: Topic 5, Preparation of financial statements (5.1 to 5.6)

Reviewed against `docs/syllabus/0452-2027-2029-syllabus.txt` (Topic 5) and `REVIEW-BRIEF.md`. Every statement of financial position, appropriation account, current account, statement of changes in equity, manufacturing account, subscriptions account, receipts and payments account, accumulated fund and statement of affairs in the file was re-added. Every MCQ was re-worked to check that exactly one option is correct and that each distractor matches a named error. Items not listed below were checked and found correct.

Validator: `node scripts/validate-deep.mjs --topic 5` prints OK. Counts keep the required shape: each section still has 10 exercises, 10 MCQ and 2 structured questions; 5.6 now has 8 notes and 11 key terms.

## Changes

| Section | Item | What was wrong | What was changed | Kind |
|---|---|---|---|---|
| 5.1 | whole section | "provision for doubtful debts" and bare "provision" used for the receivables allowance throughout | Changed to "allowance for irrecoverable debts" / "allowance" (notes, tables, worked examples, exercises, MCQ, structured) | Terminology |
| 5.1 | notes, sq-5.1-1(c), sq-5.1-2(d) | "matching principle", "principle of prudence" | Changed to "accruals (matching) concept", "prudence concept" | Terminology |
| 5.1 | note "From gross profit to profit for the year" | Said examiners "cannot give the mark" if the line is called net profit (overstated) | Reworded to "risks losing the label mark" | Accuracy |
| 5.1 | objectives | No objective for advantages/disadvantages, drawings of goods/assets/private expenses, intangible assets, revaluation, effect of one balance on others | Rewrote to 8 objectives that follow the syllabus bullets | Coverage |
| 5.1 | keyTerms | No definitions for intangible assets or capital, both named in the syllabus SOFP content bullet; drawings defined as cash or goods only | Added "Intangible asset" and "Capital" (working capital folded into "Current liability", carrying amount into "Non-current asset"); drawings definition now covers goods, other assets and private expenses | Coverage |
| 5.1 | new note "Being a sole trader: advantages and disadvantages" | Syllabus bullet on advantages/disadvantages of sole traders, and sole traders as trading, service, manufacturing or combined businesses, not taught | Added note with table | Coverage |
| 5.1 | note "Two statements, two different questions" | Importance of the statements not explained | Added a paragraph on why the owner, bank and tax authorities need them | Coverage |
| 5.1 | note "Trading businesses and service businesses" | Manufacturing and combined sole traders not covered | Added how a combined business and a manufacturing sole trader present the statement | Coverage |
| 5.1 | note "From gross profit to profit for the year" | Revaluation method not mentioned | Added revaluation method (opening valuation + purchases − closing valuation) | Coverage |
| 5.1 | note "Statement of financial position: layout" | No "Intangible assets" heading | Added intangible assets as a separate heading in non-current assets, plus the working-capital explanation from the removed note | Coverage |
| 5.1 | note "Where each adjustment appears" | Missing drawings of goods, private expenses and revaluation; nothing on the effect of one balance on others | Added three rows and a paragraph | Coverage |
| 5.1 | notes "Working capital and why it matters", "A checklist before you hand in" | Repeated material; notes count at maximum | Replaced with new note "Drawings of goods, other assets and private expenses" (double entries table); checklist moved to an exam tip | Coverage |
| 5.1 | workedExamples[3] | Classifying balances example duplicated ex-5.1-6 and MCQ 7 | Replaced with "Drawings of goods, an asset and a private expense" (Karim Aziz) | Coverage |
| 5.1 | examTips | Brackets tip low value | Replaced with the hand-in checklist | Coverage |
| 5.1 | ex-5.1-3 | Carriage explanation duplicated note, MCQ 1 and common error | Replaced with "Explain two advantages and two disadvantages" of being a sole trader | Coverage |
| 5.1 | ex-5.1-7 | Drawings only cash | Drawings now cash $8,800 + goods $600 + private phone bill $400 = $9,800 (totals unchanged); mark point updated | Coverage |
| 5.1 | mcq-5.1-4 | Drawings MCQ too easy and did not cover goods | Replaced with entry for goods taken by owner | Coverage |
| 5.1 | mcq-5.1-8 | Heading MCQ trivial | Replaced with revaluation-method depreciation calculation | Coverage |
| 5.1 | mcq-5.1-10 | Order of current assets low value | Replaced with intangible asset classification | Coverage |
| 5.1 | sq-5.1-1 | No intangible asset, no goods drawings, no evaluation part | Added patent $4,000 (capital $45,240, trial balance re-agreed at $212,430) and goods taken $500; all figures reworked (cost of sales $81,000, gross profit $56,900, profit $15,415, drawings $14,500, net assets $46,155); own-figure marking added | Coverage / Mark scheme |
| 5.1 | sq-5.1-1(c) | Final part was a 3-mark explanation with no evaluation | Replaced with "Advise Yusuf whether he should continue as a sole trader" with a justified recommendation mark | Mark scheme |
| 5.1 | sq-5.1-2 | Rent of $10,800 "covering the twelve months to 30 November 2026" left October and November 2025 unpaid with no opening prepayment given, so the $9,000 rent expense was only 10 months | Rent payment changed to $12,600 for 14 months 1 October 2025 to 30 November 2026; expense $10,800, total expenses $45,860, profit $12,740 | Accuracy |
| 5.1 | sq-5.1-2(d) | "Explain two reasons" with no evaluation | Changed to "Evaluate her view" with a conclusion mark | Mark scheme |
| 5.2 | objectives | Importance of the partnership agreement, partnership types and 5.1 adjustments in the partnership statement of profit or loss not listed | Revised objective 1 and 2 and added a seventh objective | Coverage |
| 5.2 | note "Why form a partnership?" | "Ends in law when a partner leaves" stated with no context; partnership as trading/service/manufacturing business not covered | Reworded as no separate legal identity; added paragraph on partnership types and the same 5.1 adjustments | Coverage / Accuracy |
| 5.2 | note "The partnership agreement" | Importance of the agreement not explained; default rules stated as universal law | Added why the agreement matters (avoids disputes); default rules now attributed to countries that follow the Partnership Act 1890 | Coverage / Accuracy |
| 5.2 | workedExamples[2] step 6 | "Net assets before the loan" ambiguous | Reworded to "before deducting the loan … $97,800, and $77,800 after it" | Accuracy |
| 5.2 | ex-5.2-7 | No item in 5.2 practised a partnership statement of profit or loss with the 5.1 adjustments | Rewritten as a 6-mark calculation: accrual, prepayment, depreciation, decrease in allowance and partner's loan interest (profit $22,300) | Coverage |
| 5.2 | sq-5.2-1(d) | Pure explanation; no evaluation in the question | Now explains loan interest v interest on capital and asks for advice on keeping the loan (comparison $1,500 v $1,200, justified recommendation) | Mark scheme |
| 5.2 | sq-5.2-2(b),(c) | No evaluation part; two capital/current points could be one | Part b 10 → 9 marks (capital and current account points merged); part c 2 → 3 marks with an advise-on-one-action mark | Mark scheme |
| 5.3 | objectives, note "What makes a company different" | Syllabus bullet that a company can be a trading, service, manufacturing or combined business, and that 5.1 adjustments apply, not stated; "equity" not in the objectives | Added to objective 1 and to the note | Coverage |
| 5.3 | note "The statement of financial position of a company" | Claimed that including a proposed dividend as a liability makes the statement "not balance" (it balances if also deducted from retained earnings; the real point is that no obligation exists) | Reworded to the correct reason | Accuracy |
| 5.3 | mcq-5.3-3 | Distractors $7,500 and $60,000 explained only as "other confusions" | New distractors $75,000 (share capital) and $24,000 (8% applied as if $1 shares), each explained | Accuracy |
| 5.3 | mcq-5.3-5 | "All calls were paid except on 2,000 shares" was ambiguous about how much those holders had paid | Stated that the holders of 2,000 shares have paid nothing | Accuracy |
| 5.3 | mcq-5.3-7 | Distractor "Director" was arguably also correct (directors' remuneration is an expense payable even in a loss) | Replaced with "Holder of fully paid-up ordinary shares" | Accuracy |
| 5.3 | sq-5.3-1(d) | Explain-only final part, no evaluation | Now "Evaluate this argument" (shareholder wants the proposed dividend shown as a liability) with a conclusion mark | Mark scheme |
| 5.4 | note "Work in progress and the cost of production" | Syllabus term "factory cost of production" not used | Added as the alternative name for cost of production | Terminology |
| 5.4 | mcq-5.4-3 | Distractor $118,500 matched no plausible error | Replaced with $124,500 (both work in progress figures added) and explained | Accuracy |
| 5.4 | sq-5.4-1(c) | Explain-only final part; no evaluation | Now evaluates the claim that classifying the manager's salary does not matter (profit unchanged at $55,900 but cost of production $226,000 and gross profit $149,500 misstated) | Mark scheme |
| 5.4 | sq-5.4-2(d),(e) | The advice part was not the last part | Swapped: (d) work in progress explanation, (e) make-or-buy advice | Mark scheme |
| 5.5 | summary, notes, ex-5.5-2, mcq-5.5-10 | "matching principle" | Changed to "accruals (matching) concept" | Terminology |
| 5.5 | mcq-5.5-5 explanation | "Only the net profit moves" (older term) | "Only the profit (net result) moves" | Terminology |
| 5.5 | objectives | Syllabus bullet "how to prepare receipts and payments accounts" not an objective | Objective 1 extended | Coverage |
| 5.5 | ex-5.5-7 | No item anywhere in 5.5 asked students to prepare a receipts and payments account | Replaced the bank-v-deficit explanation (now practised in sq-5.5-1(d)) with a 4-mark receipts and payments account (Hilltop Walking Club, closing balance $3,290) | Coverage |
| 5.5 | workedExamples[3] | A gift of chairs was stated to be "not income" and credited straight to the accumulated fund, a debatable treatment beyond the syllabus | Replaced with the sale of an old mower at carrying amount (capital receipt, receipts and payments only) | Accuracy / Scope |
| 5.5 | mcq-5.5-6 | Distractor $9,700 not explained | Explanation added | Accuracy |
| 5.5 | sq-5.5-1(d) | Explain-only final part, no evaluation | Now "Evaluate the treasurer's view" that the $7,000 bank increase is the surplus (actual surplus $8,420), with a conclusion mark | Mark scheme |
| 5.6 | keyTerms "Margin" | Not linked to the syllabus ratio name | Definition now says "also called gross profit margin" | Terminology |
| 5.6 | objectives | No objective for the advantages/disadvantages of not keeping full records or for inventory turnover | Objectives 1 and 6 rewritten | Coverage |
| 5.6 | keyTerms | Rate of inventory turnover not defined | Added, with the syllabus formula and average inventory = (opening + closing) ÷ 2 | Coverage |
| 5.6 | note "Why records are incomplete and why it matters" | Gave only problems; the syllabus bullet on the advantages of not keeping full records was missing; no scope note | Rewritten with advantages and disadvantages (and a table) and the note that 0452 sets incomplete records only for sole-trader trading businesses | Coverage / Scope |
| 5.6 | new note "Using inventory turnover to find missing figures" | Syllabus bullet "inventory turnover to arrive at missing figures" not taught anywhere (the word "turnover" did not appear in the file) | Added note with worked chain: cost of sales $50,400, average inventory $8,400, closing inventory $9,200, purchases $52,000 | Coverage |
| 5.6 | ex-5.6-1 | Same data as the opening position in ex-5.6-8 (duplicate) | Replaced with an inventory turnover calculation (average $9,000, closing $9,600, revenue $90,000) | Coverage |
| 5.6 | ex-5.6-6 | Asked for benefits of double entry rather than the syllabus wording | Now "two advantages and two disadvantages of not maintaining a full set of records" | Coverage |
| 5.6 | mcq-5.6-5 | Distractor $90,000 not explained | Explanation added | Accuracy |
| 5.6 | mcq-5.6-7 | Distractor $7,000 was explained as "applies 20% to cost", which does not give $7,000 | Distractor replaced with $1,333 (20% treated as a mark-up, cost of sales $41,667), explained | Accuracy |
| 5.6 | mcq-5.6-9 | Trivial cash-sales item | Replaced with finding opening inventory from the rate of inventory turnover ($10,000) | Coverage |
| 5.6 | sq-5.6-1 | No statement of financial position from incomplete records anywhere in 5.6; final part explain-only | Re-marked a 3, b 4, c 6, added d (4) statement of financial position (fittings $17,100, bank $3,300 derived from the bank summary, net assets = closing capital $31,000), e (3) advise on keeping full double entry | Coverage / Mark scheme |
| 5.6 | sq-5.6-2(e) | Explain-only final part | Now "Evaluate how reliable this estimate is" with a conclusion mark | Mark scheme |

Totals by kind (a row tagged with two kinds is counted under each): terminology 6 rows (the first covers about 35 occurrences of "provision for doubtful debts" and bare "provision" across 5.1 to 5.3), accuracy 14, coverage 32, scope 2, mark scheme 11.

## Coverage against the syllabus

### 5.1 Sole traders
- [x] Advantages and disadvantages of operating as a sole trader: note "Being a sole trader", ex-5.1-3, sq-5.1-1(c)
- [x] Trading, service, manufacturing or combined sole traders: notes "Being a sole trader" and "Trading businesses and service businesses"; worked example 3 (service); 5.4 for manufacturing
- [x] Importance of the statement of profit or loss and statement of financial position: note "Two statements, two different questions"
- [x] Preparing statements of profit or loss (trading, service): worked examples 1 and 3, ex-5.1-5, ex-5.1-8, sq-5.1-1(a), sq-5.1-2(b)
- [x] Importance of the statement of financial position on a specified date: note "Two statements"
- [x] Content: non-current assets, intangible assets (own heading), current assets, current liabilities, non-current liabilities, capital: key terms, note "The statement of financial position: layout and classification", mcq-5.1-10, sq-5.1-1(b)
- [x] Effect of a change in one balance on others: note "Where each adjustment appears in both statements", ex-5.1-10, mcq-5.1-9
- [x] Preparing statements of financial position: worked example 2, ex-5.1-9, sq-5.1-1(b)
- [x] Depreciation by straight-line, reducing balance and revaluation: note "From gross profit to profit for the year", sq-5.1-1(a), worked example 3, mcq-5.1-8 (revaluation)
- [x] Accrued and prepaid expenses and income: worked examples 1 and 3, ex-5.1-4, sq-5.1-2
- [x] Irrecoverable debts and allowance for irrecoverable debts: worked example 1, ex-5.1-8, mcq-5.1-6, sq-5.1-1
- [x] Drawings of goods and other assets, private expenses paid by the business: note "Drawings of goods, other assets and private expenses", worked example 4, ex-5.1-7, mcq-5.1-4, sq-5.1-1

### 5.2 Partnerships
- [x] Partnership as a trading, service, manufacturing or combined business: note "Why form a partnership?"
- [x] Advantages and disadvantages of forming a partnership: note "Why form a partnership?", ex-5.2-10, mcq-5.2-9
- [x] Importance and contents of a partnership agreement: note "The partnership agreement", ex-5.2-3, mcq-5.2-6
- [x] Purpose of an appropriation account: note "Expense or appropriation? The key distinction", key terms
- [x] Statements of profit or loss, appropriation accounts and statements of financial position: worked examples 1 and 3, ex-5.2-5, ex-5.2-7, ex-5.2-9, sq-5.2-1, sq-5.2-2
- [x] Interest on partners' loans, interest on capital, interest on drawings, salaries, division of residual profit or loss: note "Loans from partners", worked examples 1, 3 and 4, ex-5.2-7, ex-5.2-8, sq-5.2-1
- [x] Adjustments as in 5.1: ex-5.2-7 (accrual, prepayment, depreciation, allowance)
- [x] Uses of and differences between capital and current accounts: note "Capital accounts and current accounts", sq-5.2-2
- [x] Capital and current accounts in ledger form and in the statement of financial position: worked example 2, ex-5.2-6, sq-5.2-1(c), sq-5.2-2(b)
- [x] Out of scope checked: no dissolution, change in profit-sharing ratio, LLP, admission or departure of a partner, or goodwill anywhere in the file

### 5.3 Limited companies
- [x] Company as a trading, service, manufacturing or combined business: note "What makes a company different"
- [x] Advantages and disadvantages of a limited company: note "What makes a company different"
- [x] Limited liability: key term, note, mcq-5.3-1
- [x] Equity: key term, notes, sq-5.3-1(c)
- [x] Capital structure (preference shares, ordinary shares, general reserve, retained earnings): notes, worked examples, ex-5.3-9, sq-5.3-2
- [x] Features of ordinary shares and debentures: note table, ex-5.3-3, sq-5.3-2(c)
- [x] Issued, called-up and paid-up share capital: note, worked example 4, ex-5.3-5, mcq-5.3-5
- [x] Statements of profit or loss, changes in equity and financial position: worked examples 2 and 3, ex-5.3-6, ex-5.3-8, ex-5.3-9, sq-5.3-1, sq-5.3-2
- [x] Adjustments as in 5.1: sq-5.3-1(a) (prepayment, depreciation), sq-5.3-2 (allowance, accruals)

### 5.4 Manufacturing accounts
- [x] Direct and indirect costs: note "Direct costs and prime cost", ex-5.4-3, mcq-5.4-1, sq-5.4-1(c)
- [x] Direct material, direct labour, prime cost, factory overheads: notes, ex-5.4-2, ex-5.4-4, mcq-5.4-6
- [x] Work in progress: note, ex-5.4-5, ex-5.4-10, mcq-5.4-9, sq-5.4-2(d)
- [x] Factory cost of production: note, worked example 1, ex-5.4-8
- [x] Manufacturing accounts, statements of profit or loss and statements of financial position: worked examples 1 and 2, ex-5.4-9, sq-5.4-1, sq-5.4-2(c)
- [x] Adjustments as in 5.1: accrued wages, prepaid rent, depreciation, apportionment, irrecoverable debts (worked example 1, sq-5.4-1)

### 5.5 Clubs and societies
- [x] Receipts and payments accounts and income and expenditure accounts: notes, ex-5.5-2, mcq-5.5-1, mcq-5.5-10
- [x] Preparing receipts and payments accounts: ex-5.5-7 (new)
- [x] Revenue-generating activities (refreshments, subscriptions, events): notes "The subscriptions account" and "Trading activities inside a club", worked example 1, ex-5.5-4, ex-5.5-5, sq-5.5-1(a)(b)
- [x] Income and expenditure accounts and statements of financial position: worked examples 2 and 3, ex-5.5-8, ex-5.5-9, sq-5.5-1(c), sq-5.5-2(b)
- [x] Adjustments as in 5.1: accruals, prepayments, depreciation, irrecoverable subscriptions (sq-5.5-1)
- [x] Define and calculate the accumulated fund: key term, note "The accumulated fund", ex-5.5-3, sq-5.5-2(a)

### 5.6 Incomplete records
- [x] Why businesses keep records other than full double entry: note "Why records are incomplete and why it matters"
- [x] Advantages and disadvantages of not maintaining full records: same note (table), ex-5.6-6, sq-5.6-1(e)
- [x] Opening and closing statements of affairs: note, worked example 1, ex-5.6-8, sq-5.6-1(a)
- [x] Profit or loss from changes in capital: note, worked example 1, ex-5.6-2, mcq-5.6-1, sq-5.6-2(d)
- [x] Sales, purchases, gross profit, receivables, payables and other figures: worked examples 2 and 4, ex-5.6-4, ex-5.6-5, ex-5.6-9, sq-5.6-1(b)
- [x] Statements of profit or loss and statements of financial position from incomplete records: worked example 2, ex-5.6-9, sq-5.6-1(c)(d)
- [x] Adjustments as in 5.1: accruals, prepayments, depreciation, discounts, irrecoverable debts (ex-5.6-9, sq-5.6-1)
- [x] Mark-up, margin and inventory turnover to find missing figures: notes "Margin and mark-up" and "Using inventory turnover to find missing figures", worked example 3, ex-5.6-1, ex-5.6-3, ex-5.6-7, ex-5.6-10, mcq-5.6-9, sq-5.6-2(c)
- [x] Scope: every incomplete records item is a sole-trader trading business; there are no service or manufacturing incomplete records items

## Notes for the editor
- Every structured question now ends with an evaluate or advise part (AO3).
- "Provision for depreciation" is kept, as the brief requires. Every receivables "provision" is now "allowance for irrecoverable debts".
- "Sundry expenses" is kept as an expense name. It is not the banned "sundry debtors/creditors".
