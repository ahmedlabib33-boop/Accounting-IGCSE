# Deep content: textbook-depth material per syllabus section

One file per topic: `topic1.mjs` … `topic7.mjs`. Each exports `topic`. Validate with
`node scripts/validate-deep.mjs --topic N` (all topics: no flag). The build script merges this
material into `app/_data/accounting-content.json`.

Everything here is **original teaching material** written for Cambridge IGCSE Accounting 0452
(2027–2029). It must not reproduce sentences, examples, figures or question wording from any
published textbook, workbook, revision guide or past paper. Write new scenarios with new numbers.

## Shape

```js
export const topic = {
  id: "2",                       // topic number as a string
  name: "Recording transactions",
  sections: [
    {
      section: "2.1",
      title: "Double entry book-keeping",
      summary: "Two or three sentences: the section in a nutshell, for the revision page.",
      objectives: ["Explain …", "Prepare …"],            // 4–8, paraphrasing the syllabus aims
      keyTerms: [{ term: "Debit", definition: "…" }],    // 6–12 precise, one-sentence definitions
      notes: [                                            // 5–8 blocks, in teaching order
        { heading: "Why every transaction has two sides", body: "80–220 words. Plain text. Use \n\n between paragraphs." },
        { heading: "The rules at a glance", body: "…", table: { head: ["Account", "Increase", "Decrease"], rows: [["Asset", "Debit", "Credit"]] } },
      ],
      workedExamples: [                                   // 3–4, fully worked
        { title: "Buying a van partly on credit", scenario: "…the facts, with figures…", steps: ["Step 1 …", "Step 2 …"], answer: "The final figures or entries." },
      ],
      commonErrors: [{ error: "…", fix: "…" }],           // 4–6, the mistakes students really make
      examTips: ["…"],                                    // 4–6, how marks are won and lost
      exercises: [                                        // 8–10 workbook-style tasks with model answers
        { id: "ex-2.1-1", type: "calculation", marks: 4, prompt: "…", model: "…full model answer…", points: ["Point worth 1 mark", "…"] },
      ],
      mcq: [                                              // 10 Paper-1-style questions
        { id: "mcq-2.1-1", question: "…", choices: ["correct answer", "distractor", "distractor", "distractor"], explanation: "Why the answer is right and the others wrong." },
      ],
      structured: [                                       // 2 Paper-2-style questions, 20 marks each
        { id: "sq-2.1-1", title: "…", stimulus: "…all the data…", parts: [
          { label: "a", marks: 6, prompt: "…", model: "…", points: ["…", "…", "…", "…", "…", "…"] },
        ] },
      ],
    },
  ],
};
```

## Rules the validator enforces

- Every section of the topic is present once, with the exact `section` codes listed below.
- Counts: objectives 4–8, keyTerms 6–12, notes 5–8, workedExamples 3–4, commonErrors 4–6, examTips 4–6, exercises 8–10, mcq exactly 10, structured exactly 2.
- `exercises[].points.length === marks`, and `marks` is 2–10.
- Each structured question's parts total exactly 20 marks, 3–5 parts, `points.length === marks` for each part.
- MCQ: exactly 4 choices, all different, correct answer first; question, explanation non-empty.
- IDs unique across the whole project and following `ex-<section>-<n>`, `mcq-<section>-<n>`, `sq-<section>-<n>`.
- Note bodies at least 60 words; no markdown syntax (no `**`, `#`, backticks, bullet characters); plain text only. Tables go in the `table` field.
- Types for exercises: `calculation`, `entries`, `statement`, `explain`.

## Quality bar

The syllabus check in `REVIEW-BRIEF.md` (official terminology, the only accepted ratio formulas, scope notes) overrides anything below.


- Cambridge terminology throughout: statement of profit or loss, statement of financial position, trade receivables, trade payables, inventory, irrecoverable debts, allowance for irrecoverable debts (the 2027–2029 syllabus term), carriage inwards/outwards, drawings, capital, non-current assets, current liabilities, cost of sales, gross profit, profit for the year.
- Money as `$1,250` with thousands separators; dates as `1 January 2026`; years 2025–2027.
- Arithmetic must be right. Work every figure through before writing it. Re-add every total.
- Debit/credit sides, account names and balance b/d and c/d must be correct and consistent.
- Worked examples show every step, in the order a student would write it in the exam.
- Exercises escalate: the first two are short, the last two are full exam-style tasks.
- Mark points are specific and checkable ("Closing inventory deducted in cost of sales (1)"), one mark each.
- MCQ distractors are plausible errors (reversed entries, wrong side, missed adjustment), not silly.
- Structured questions use realistic small-business scenarios (Egyptian or international names are fine), with all the data a student needs in the stimulus, and parts moving from preparation (accounts, statements) to explanation and evaluation, like the real Paper 2.
- Explanations teach: say why, give the rule, show the consequence of getting it wrong.
- Tone: clear, direct, encouraging, written for a 15-year-old reading in their second language. Short sentences.

## Sections and titles

Topic 1 The fundamentals of accounting: 1.1 Purpose of accounting · 1.2 The accounting equation
Topic 2 Sources and recording of data: 2.1 Double entry · 2.2 Business documents · 2.3 Books of prime entry
Topic 3 Verification of accounting records: 3.1 Trial balance · 3.2 Correction of errors · 3.3 Bank reconciliation · 3.4 Control accounts
Topic 4 Accounting procedures: 4.1 Capital and revenue · 4.2 Depreciation and disposal · 4.3 Accruals and prepayments · 4.4 Irrecoverable debts · 4.5 Inventory valuation
Topic 5 Preparation of financial statements: 5.1 Sole traders · 5.2 Partnerships · 5.3 Limited companies · 5.4 Manufacturing · 5.5 Clubs and societies · 5.6 Incomplete records
Topic 6 Analysis and interpretation: 6.1 Calculating ratios · 6.2 Interpreting ratios · 6.3 Inter-business comparison · 6.4 Interested parties · 6.5 Limitations
Topic 7 Accounting concepts and modern practice: 7.1 Accounting concepts · 7.2 Ethical considerations · 7.3 Technology and sustainability

## Syllabus scope reminders per section

- 1.1: book-keeping vs accounting, purpose of measuring profit/loss, role of accounting in decisions.
- 1.2: assets, liabilities, capital; the equation; effect of transactions; statement of financial position link.
- 2.1: debit/credit rules for assets, liabilities, capital, income, expenses, drawings; ledger accounts; balancing; dividing the ledger (sales, purchases, nominal/general); interpreting ledger accounts.
- 2.2: invoice, debit note, credit note, statement of account, cheque, receipt; purposes and flows between buyer and seller.
- 2.3: cash book (two and three column, discounts, contra), petty cash book with imprest system and analysis columns, sales/purchases/returns journals, general journal (opening entries, non-current asset purchase on credit, corrections, transfers); trade and cash discounts.
- 3.1: purpose, preparation from balances, errors not revealed (commission, compensating, complete reversal, omission, original entry, principle).
- 3.2: journal corrections, suspense account, effect of errors on profit and on the statement of financial position.
- 3.3: updated cash book, reconciliation statement, items in bank statement vs cash book, dishonoured cheques, standing orders, direct debits, bank charges, interest, credit transfers.
- 3.4: sales ledger and purchases ledger control accounts, sources of entries, contra, credit balances in sales ledger, uses.
- 4.1: capital vs revenue expenditure and receipts; effect of misclassification on profit and assets.
- 4.2: causes of depreciation, straight-line, reducing balance, revaluation methods; ledger entries including provision for depreciation and disposal account; part-exchange.
- 4.3: other payables and receivables, adjustments in ledger accounts and statements, prepaid and accrued income.
- 4.4: irrecoverable debts written off, irrecoverable debts recovered, allowance for irrecoverable debts (creation, increase, decrease), effect on statements.
- 4.5: lower of cost and net realisable value, effect of errors in inventory valuation on profit.
- 5.1: income statement and statement of financial position for a sole trader (trading and service businesses), classification of items, working capital.
- 5.2: partnership agreements, appropriation account, capital and current accounts, interest on capital/drawings, salaries, loans from partners, statement of financial position.
- 5.3: share capital types, debentures, reserves, retained earnings, dividends, statement of changes in equity, financial statements of a limited company.
- 5.4: direct and indirect costs, prime cost, factory overheads, work in progress, cost of production, transfer to income statement.
- 5.5: receipts and payments account vs income and expenditure account, subscriptions account, accumulated fund, trading activities within a club.
- 5.6: statement of affairs, capital comparison for profit, margin and mark-up, using control accounts and ratios to find missing figures.
- 6.1: gross margin, profit margin, return on capital employed, current ratio, liquid (acid test) ratio, rate of inventory turnover, trade receivables turnover (days), trade payables turnover (days); formulas and calculation.
- 6.2: what each ratio means, causes of change, actions to improve profitability and liquidity.
- 6.3: comparing businesses, problems of comparison, uses of inter-firm comparison.
- 6.4: internal and external users and what each needs.
- 6.5: limitations of accounting statements (historic cost, non-financial factors, differing policies, timing).
- 7.1: business entity, going concern, historic cost, matching/accruals, prudence, consistency, materiality, money measurement, realisation, duality; applying them.
- 7.2: ethical principles (integrity, objectivity, professional competence and due care, confidentiality, professional behaviour), consequences of unethical behaviour.
- 7.3: digital applications for all or part of the records; storing data safely and sustainably and the risks of not doing so; storage systems (manual, data storage devices, cloud services, other digital services) with advantages and disadvantages. No specific software packages.
