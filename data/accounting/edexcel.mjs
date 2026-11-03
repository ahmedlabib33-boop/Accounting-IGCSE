// Map from the Pearson Edexcel International GCSE Accounting (4AC1) specification areas to the
// Cambridge 0452 sections taught in this app, with the differences a student switching boards must know.
// Original summary; not Pearson or Cambridge text.

export const edexcelMap = {
  qualification: "Pearson Edexcel International GCSE Accounting (4AC1)",
  exam: "One written paper of 100 marks, 2 hours 30 minutes, mixing multiple-choice, short calculations and longer preparation questions. There is no separate multiple-choice paper.",
  coverage: "About 90% of the two syllabuses overlap. Every 4AC1 area below is taught in the sections listed; the notes say where Edexcel goes further or uses different words.",
  areas: [
    { area: "1 Introduction to bookkeeping and accounting", sections: ["1.1", "1.2", "2.1", "2.2", "2.3"], notes: "Same double-entry rules, documents and day books. Edexcel calls the books of prime entry \"books of original entry\" and uses \"carriage inwards\" and \"carriage outwards\" exactly as Cambridge does." },
    { area: "2 Recording transactions and the trial balance", sections: ["2.3", "3.1"], notes: "Edexcel expects the three-column cash book and the petty cash book with the imprest system, as in 2.3. Treat the trial balance exactly as in 3.1." },
    { area: "3 Accounting concepts", sections: ["7.1"], notes: "Edexcel lists the same ideas (business entity, going concern, accruals, prudence, consistency, materiality, money measurement, realisation) and adds \"objectivity\" as a concept. Learn it as: use verifiable evidence, not opinion, when valuing items." },
    { area: "4 Adjustments to financial statements", sections: ["4.1", "4.2", "4.3", "4.4", "4.5"], notes: "Identical ground: capital and revenue expenditure, depreciation by straight-line and reducing balance, disposals, accruals and prepayments, irrecoverable debts and the allowance for doubtful debts (Cambridge 0452 now says \"allowance for irrecoverable debts\"; older books on both boards say \"provision for doubtful debts\"), and inventory at lower of cost and net realisable value." },
    { area: "5 Financial statements of sole traders", sections: ["5.1"], notes: "Same statements, the statement of profit or loss and the statement of financial position. Some Edexcel material still says \"income statement\" for the first one." },
    { area: "6 Correction of errors and suspense accounts", sections: ["3.2"], notes: "Same six error types and the same suspense account method. Edexcel also asks for the effect of errors on the statement of financial position, covered in 3.2." },
    { area: "7 Control accounts and bank reconciliation", sections: ["3.3", "3.4"], notes: "Same layouts. Edexcel questions often give the bank statement first and ask for the updated cash book second; the method in 3.3 handles either order." },
    { area: "8 Partnerships", sections: ["5.2"], notes: "Appropriation account, current and capital accounts, interest on capital and drawings, partners' salaries: all in 5.2. Edexcel can include the admission of a new partner and goodwill, which Cambridge 0452 does not examine; a short note on goodwill appears in the 5.2 study guide." },
    { area: "9 Limited companies", sections: ["5.3"], notes: "Share capital, debentures, reserves, dividends and the statement of changes in equity match 5.3. Edexcel may use the words \"ordinary share capital\" and \"revaluation reserve\"; the meanings are the same." },
    { area: "10 Manufacturing accounts", sections: ["5.4"], notes: "Prime cost, factory overheads, work in progress and cost of production as in 5.4." },
    { area: "11 Non-profit organisations", sections: ["5.5"], notes: "Receipts and payments account, income and expenditure account, subscriptions and the accumulated fund as in 5.5." },
    { area: "12 Incomplete records", sections: ["5.6"], notes: "Statement of affairs, mark-up and margin, and control accounts to find missing figures, as in 5.6." },
    { area: "13 Analysis and interpretation", sections: ["6.1", "6.2", "6.3", "6.4", "6.5"], notes: "Same ratios. Edexcel also lists \"expenses to revenue\" (total expenses ÷ revenue × 100) and \"rate of return on capital employed\" with the same formula as ROCE. Practise both names." },
    { area: "14 Ethics and the role of technology", sections: ["7.2", "7.3"], notes: "Edexcel places less weight here than Cambridge does; the 7.2 and 7.3 guides cover more than the Edexcel paper needs." },
  ],
  extras: [
    { title: "Objectivity concept", body: "Record items at values supported by evidence such as an invoice or a receipt, not at values someone believes to be true. This is why non-current assets are shown at historic cost less depreciation rather than at what the owner thinks they are worth." },
    { title: "Expenses to revenue ratio", body: "Total expenses ÷ revenue × 100. If gross profit margin is steady but this ratio rises, the business is losing control of its running costs. Pair it with the profit margin: gross margin − expenses to revenue = profit margin." },
    { title: "Goodwill on the admission of a partner (Edexcel only)", body: "When a new partner joins, the old partners are credited with goodwill in the old profit-sharing ratio (debit goodwill account). If goodwill is not to stay in the books, it is then written off to all partners in the new ratio (credit goodwill, debit capital accounts). The net effect moves capital from the new partner to the old ones in return for the share of the reputation they built." },
  ],
};
