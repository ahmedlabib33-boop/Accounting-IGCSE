// Revision material that is not tied to one section: the formula sheet students must know by heart.
// Original wording; formulas follow the Cambridge IGCSE Accounting 0452 syllabus (2027–2029).

export const formulaSheet = [
  { group: "Profit", items: [
    { name: "Cost of sales", formula: "Opening inventory + purchases + carriage inwards − purchases returns − closing inventory", note: "Goods taken by the owner reduce purchases." },
    { name: "Gross profit", formula: "Revenue − sales returns − cost of sales", note: "Revenue means net sales after returns." },
    { name: "Profit for the year", formula: "Gross profit + other income − expenses", note: "Expenses include depreciation, irrecoverable debts and the increase in the provision for doubtful debts." },
    { name: "Mark-up", formula: "Gross profit ÷ cost of sales × 100", note: "Profit as a percentage of cost." },
    { name: "Margin", formula: "Gross profit ÷ revenue × 100", note: "Profit as a percentage of selling price. Mark-up 25% is the same as margin 20%." },
  ] },
  { group: "Profitability ratios", items: [
    { name: "Gross margin", formula: "Gross profit ÷ revenue × 100", note: "Falls when selling prices drop or cost prices rise." },
    { name: "Profit margin", formula: "Profit for the year ÷ revenue × 100", note: "Compare with gross margin to see whether expenses are the problem." },
    { name: "Return on capital employed (ROCE)", formula: "Profit for the year ÷ capital employed × 100", note: "Capital employed = owner's capital + non-current liabilities, or total assets − current liabilities. For a company add loan interest back to profit when the question asks for profit before interest." },
  ] },
  { group: "Liquidity ratios", items: [
    { name: "Current ratio", formula: "Current assets ÷ current liabilities", note: "Written as x : 1. Around 1.5 to 2 : 1 is usually comfortable." },
    { name: "Liquid (acid test) ratio", formula: "(Current assets − inventory) ÷ current liabilities", note: "Written as x : 1. Around 1 : 1 is usually safe." },
    { name: "Working capital", formula: "Current assets − current liabilities", note: "The money available for day-to-day running." },
  ] },
  { group: "Efficiency ratios", items: [
    { name: "Rate of inventory turnover", formula: "Cost of sales ÷ average inventory", note: "Answer in times per year. Average inventory = (opening + closing) ÷ 2." },
    { name: "Trade receivables turnover", formula: "Trade receivables ÷ credit sales × 365", note: "Answer in days. Compare with the credit period offered." },
    { name: "Trade payables turnover", formula: "Trade payables ÷ credit purchases × 365", note: "Answer in days. Compare with the credit period received." },
  ] },
  { group: "Adjustments", items: [
    { name: "Straight-line depreciation", formula: "(Cost − residual value) ÷ useful life", note: "The same charge every year." },
    { name: "Reducing balance depreciation", formula: "Carrying amount at start of year × rate", note: "A falling charge every year. Carrying amount = cost − accumulated depreciation." },
    { name: "Profit or loss on disposal", formula: "Proceeds − carrying amount at the date of sale", note: "Positive is a profit (income); negative is a loss (expense)." },
    { name: "Expense for the year", formula: "Amount paid − opening accrual + closing accrual + opening prepayment − closing prepayment", note: "Draw the ledger account if the formula feels abstract." },
    { name: "Provision for doubtful debts charge", formula: "Required closing provision − existing provision", note: "Only the change goes to the statement of profit or loss." },
    { name: "Inventory value", formula: "Lower of cost and net realisable value, item by item", note: "Net realisable value = expected selling price − costs to complete and sell." },
  ] },
  { group: "Incomplete records", items: [
    { name: "Profit from capital movement", formula: "Closing capital − opening capital + drawings − capital introduced", note: "Capital at each date comes from a statement of affairs." },
    { name: "Credit sales", formula: "Receipts from credit customers + closing receivables − opening receivables (adjust for discounts and irrecoverable debts)", note: "Rebuild the sales ledger control account." },
    { name: "Credit purchases", formula: "Payments to credit suppliers + closing payables − opening payables (adjust for discounts received)", note: "Rebuild the purchases ledger control account." },
    { name: "Subscriptions income", formula: "Receipts + closing arrears − opening arrears + opening advances − closing advances", note: "Income earned, not cash received." },
  ] },
  { group: "Partnerships and companies", items: [
    { name: "Residual profit", formula: "Profit for the year + interest on drawings − partners' salaries − interest on capital", note: "Shared in the profit-sharing ratio." },
    { name: "Interest on capital", formula: "Capital balance × agreed rate × months ÷ 12", note: "Time-apportion when capital changes during the year." },
    { name: "Retained earnings carried forward", formula: "Opening retained earnings + profit for the year − dividends − transfers to reserves", note: "Transfers to reserves move equity between headings; total equity is unchanged." },
    { name: "Dividend", formula: "Number of shares × dividend per share, or share capital × dividend %", note: "Preference dividend is a fixed percentage of the preference share capital." },
  ] },
];
