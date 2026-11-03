// Original Practice Lab content for Cambridge IGCSE Accounting (0452). Not taken from Cambridge papers.

export const COMMAND_WORDS = [
  { word: "State", meaning: "Express in clear terms. A short, clear answer; no explanation needed.", arabic: "قولها وامشي" },
  { word: "Give", meaning: "Produce an answer from the information given or from memory.", arabic: "هات الإجابة من المعطيات أو من دماغك" },
  { word: "Identify", meaning: "Name, select or recognise the item.", arabic: "سمّيها بس" },
  { word: "Define", meaning: "Give the precise meaning of a term.", arabic: "التعريف بالظبط" },
  { word: "Describe", meaning: "State the points of a topic, or give its characteristics and main features.", arabic: "احكي الخطوات أو الصفات" },
  { word: "Demonstrate", meaning: "Show how, or give an example.", arabic: "وريني إزاي أو هات مثال" },
  { word: "Explain", meaning: "Set out purposes or reasons, make the relationships clear, say why and/or how, and support it with evidence (use 'because').", arabic: "النقطة + ليه" },
  { word: "Calculate", meaning: "Work out from the given facts, figures or information. Show the workings.", arabic: "الخطوات قبل الرقم" },
  { word: "Prepare", meaning: "Present information in a suitable format: the account or statement, with a heading.", arabic: "العنوان، التاريخ، الهيكل" },
  { word: "Compare", meaning: "Identify or comment on similarities and/or differences, using the figures.", arabic: "الرقمين جنب بعض + الفرق" },
  { word: "Analyse", meaning: "Examine in detail to show meaning, identify the elements and the relationships between them.", arabic: "فكّك الأرقام ووضّح العلاقة بينها" },
  { word: "Suggest", meaning: "Apply your knowledge to a situation with a range of valid answers; make proposals or put forward considerations.", arabic: "اقتراح يناسب الحالة" },
  { word: "Advise", meaning: "Write down a suggested course of action in a given situation, with reasons.", arabic: "اختار وبرّر" },
  { word: "Justify", meaning: "Support a case with evidence or argument.", arabic: "ادعم رأيك بدليل" },
  { word: "Discuss", meaning: "Write about the issue(s) in depth in a structured way, usually with points for and against.", arabic: "مع وضد بالتفصيل" },
  { word: "Evaluate", meaning: "Judge or calculate the quality, importance, amount or value of something: weigh up both sides, then reach a judgement.", arabic: "مع وضد، وبعدين حكم" },
];

const T = {
  short: "A short answer: name the points, no explanation",
  name: "Name the item only, in a few words",
  define: "A precise one-sentence meaning",
  describe: "The main steps or features in order",
  explain: "A point, then the reason it matters (because…)",
  calculate: "Formula, workings and the final figure with units",
  prepare: "The full statement in the correct format with a dated heading",
  compare: "Both figures side by side and what the difference shows",
  suggest: "Realistic ideas that fit this business",
  advise: "A clear recommendation, reasons for it, and the main risk",
  discuss: "Arguments for and against, developed in depth",
  evaluate: "Strengths and weaknesses, then a justified judgement",
  give: "The answer taken from the information given, or recalled, with no development",
  demonstrate: "Show how it works, or give a worked example",
  analyse: "Break the figures down and show how the parts relate to each other",
  justify: "Evidence or argument that supports the case you are making",
};

export const COMMAND_DRILLS = [
  { id: "cw1", word: "State", question: "State two items that appear on a sales invoice.", options: [T.short, T.explain, T.describe, T.evaluate], answer: 0, why: "State only needs the points. Writing reasons wastes time and earns nothing extra." },
  { id: "cw2", word: "Explain", question: "Explain why a business charges depreciation on its delivery van.", options: [T.name, T.explain, T.calculate, T.short], answer: 1, why: "Explain needs the point and the reason: depreciation matches the van's cost to the years it helps earn revenue." },
  { id: "cw3", word: "Calculate", question: "Calculate the gross profit margin for the year ended 31 December 2027.", options: [T.describe, T.compare, T.calculate, T.define], answer: 2, why: "Show the formula and workings. If the final figure is wrong, correct workings can still earn marks." },
  { id: "cw4", word: "Prepare", question: "Prepare the statement of profit or loss for the year ended 31 December 2027.", options: [T.short, T.prepare, T.explain, T.suggest], answer: 1, why: "Prepare means the full format: business name, title, period, correct order and labels." },
  { id: "cw5", word: "Advise", question: "Advise Sara whether she should take out a bank loan to buy new equipment. Justify your answer.", options: [T.discuss, T.short, T.advise, T.calculate], answer: 2, why: "Advise needs a clear decision. Weigh the evidence, choose, justify it and mention the main risk." },
  { id: "cw6", word: "Evaluate", question: "Evaluate the owner's decision to offer customers 60 days' credit instead of 30.", options: [T.evaluate, T.name, T.describe, T.define], answer: 0, why: "Evaluate needs both sides (more sales vs slower cash, more irrecoverable debts) and then a judgement." },
  { id: "cw7", word: "Identify", question: "Identify the accounting concept applied when the owner's private car is not recorded as a business asset.", options: [T.explain, T.name, T.discuss, T.prepare], answer: 1, why: "Identify only needs the name: business entity." },
  { id: "cw8", word: "Define", question: "Define the term 'working capital'.", options: [T.define, T.compare, T.calculate, T.advise], answer: 0, why: "A precise meaning: current assets minus current liabilities." },
  { id: "cw9", word: "Suggest", question: "Suggest two ways the business could improve its acid test (liquid) ratio.", options: [T.define, T.short, T.suggest, T.prepare], answer: 2, why: "Suggest needs realistic actions for this case, such as selling surplus inventory for cash, introducing more capital or replacing an overdraft with a long-term loan. (Collecting debts faster alone does not change it: trade receivables and cash are both counted.)" },
  { id: "cw10", word: "Compare", question: "Compare the current (working capital) ratio for 2026 with that for 2027.", options: [T.compare, T.describe, T.name, T.prepare], answer: 0, why: "Quote both figures, say which is higher and what that means for liquidity." },
  { id: "cw11", word: "Describe", question: "Describe how the imprest system of petty cash works.", options: [T.evaluate, T.describe, T.calculate, T.name], answer: 1, why: "Describe sets out the steps: a fixed float, spending recorded with vouchers, then the amount spent is reimbursed." },
  { id: "cw12", word: "Discuss", question: "Discuss whether two partners need a written partnership agreement.", options: [T.short, T.calculate, T.discuss, T.name], answer: 2, why: "Discuss needs developed arguments on both sides, usually ending with a conclusion." },
  { id: "cw13", word: "Give", question: "Give two expenses from the information that are shown in the statement of profit or loss.", options: [T.give, T.evaluate, T.analyse, T.prepare], answer: 0, why: "Give means take the answer from the source (or recall it). Two correct items earn the marks; no development is needed." },
  { id: "cw14", word: "Demonstrate", question: "Demonstrate how the accounting equation stays in balance when the business buys inventory on credit for $500.", options: [T.short, T.demonstrate, T.discuss, T.define], answer: 1, why: "Demonstrate means show how, or give an example: inventory (asset) rises by $500 and trade payables (liability) rise by $500, so assets still equal liabilities plus capital." },
  { id: "cw15", word: "Analyse", question: "Analyse the change in the trade receivables turnover (days) from 30 days to 45 days.", options: [T.name, T.calculate, T.analyse, T.short], answer: 2, why: "Analyse means examine the figures in detail: customers are taking 15 days longer to pay, which ties up cash and raises the risk of irrecoverable debts; link this to credit terms or credit control." },
  { id: "cw16", word: "Justify", question: "Justify the use of the reducing balance method of depreciation for a delivery van.", options: [T.define, T.describe, T.compare, T.justify], answer: 3, why: "Justify means support the choice with evidence or argument: a van loses more value and gives more benefit in its early years, while repair costs rise later, so a higher early charge matches cost to benefit." },
];

export const DOUBLE_ENTRY = [
  { id: "de1", text: "Bought goods for resale on credit from Lina, $800.", debit: "Purchases", credit: "Lina (trade payable)", options: ["Purchases", "Lina (trade payable)", "Inventory", "Bank", "Sales", "Cash"], why: "Goods for resale go to Purchases (an expense account under the periodic system). Lina is owed money, so her account is credited." },
  { id: "de2", text: "Sold goods on credit to Karim, $1,200.", debit: "Karim (trade receivable)", credit: "Sales", options: ["Sales", "Karim (trade receivable)", "Bank", "Purchases", "Capital", "Cash"], why: "Karim received the goods and now owes us, so debit Karim. Income increases with a credit." },
  { id: "de3", text: "Paid rent by cheque, $500.", debit: "Rent", credit: "Bank", options: ["Rent", "Bank", "Cash", "Rent received", "Capital", "Premises"], why: "Expenses increase with a debit. Money left the bank, so credit Bank." },
  { id: "de4", text: "The owner paid $10,000 of her own money into the business bank account.", debit: "Bank", credit: "Capital", options: ["Bank", "Capital", "Drawings", "Loan", "Cash", "Sales"], why: "The bank received the money. The owner gave it, so Capital (what the business owes the owner) is credited." },
  { id: "de5", text: "Bought a delivery van and paid by cheque, $15,000.", debit: "Motor vehicles", credit: "Bank", options: ["Motor vehicles", "Bank", "Purchases", "Motor expenses", "Capital", "Cash"], why: "A van is a non-current asset, not Purchases. Assets increase with a debit." },
  { id: "de6", text: "Karim returned goods worth $200.", debit: "Sales returns", credit: "Karim (trade receivable)", options: ["Sales returns", "Karim (trade receivable)", "Purchases returns", "Sales", "Inventory", "Bank"], why: "Returns inwards reduce sales and are debited to Sales returns. Karim now owes less, so credit his account." },
  { id: "de7", text: "Returned goods to Lina worth $100.", debit: "Lina (trade payable)", credit: "Purchases returns", options: ["Lina (trade payable)", "Purchases returns", "Sales returns", "Purchases", "Bank", "Inventory"], why: "We owe Lina less, so debit her account. Returns outwards are credited to Purchases returns." },
  { id: "de8", text: "The owner took $300 cash for personal use.", debit: "Drawings", credit: "Cash", options: ["Drawings", "Cash", "Capital", "Wages", "Bank", "General expenses"], why: "Drawings increase with a debit (DEAD). Cash left the business, so credit Cash." },
  { id: "de9", text: "Received a cheque from Karim for $1,000 and banked it.", debit: "Bank", credit: "Karim (trade receivable)", options: ["Bank", "Karim (trade receivable)", "Sales", "Cash", "Capital", "Discount received"], why: "The bank received the money. Karim gave it, so his debt falls with a credit." },
  { id: "de10", text: "Paid wages in cash, $400.", debit: "Wages", credit: "Cash", options: ["Wages", "Cash", "Bank", "Drawings", "Capital", "Accrued wages"], why: "Wages are an expense (debit). Cash fell (credit)." },
  { id: "de11", text: "Bought office equipment on credit from TechCo, $2,000.", debit: "Office equipment", credit: "TechCo (other payable)", options: ["Office equipment", "TechCo (other payable)", "Purchases", "Bank", "Office expenses", "Lina (trade payable)"], why: "Equipment is a non-current asset. It is recorded through the general journal, not the purchases journal, because it is not for resale." },
  { id: "de12", text: "Took a bank loan of $5,000, paid into the business bank account.", debit: "Bank", credit: "Bank loan", options: ["Bank", "Bank loan", "Capital", "Sales", "Interest", "Cash"], why: "The bank balance rises (debit). A liability increases with a credit." },
  { id: "de13", text: "Received rent in cash from a sub-tenant, $250.", debit: "Cash", credit: "Rent received", options: ["Cash", "Rent received", "Rent", "Bank", "Sales", "Capital"], why: "Cash came in (debit). Rent received is income, which increases with a credit." },
  { id: "de14", text: "The owner took goods costing $150 for his own use.", debit: "Drawings", credit: "Purchases", options: ["Drawings", "Purchases", "Sales", "Inventory", "Cash", "Capital"], why: "Goods taken by the owner are drawings. Purchases is credited to remove goods that were not sold." },
  { id: "de15", text: "Paid $600 of office cash into the bank.", debit: "Bank", credit: "Cash", options: ["Bank", "Cash", "Capital", "Sales", "Drawings", "Discount allowed"], why: "This is a contra entry: both sides are in the cash book. Bank rises, cash falls." },
  { id: "de16", text: "Wrote off Ahmed's debt of $90 as irrecoverable.", debit: "Irrecoverable debts", credit: "Ahmed (trade receivable)", options: ["Irrecoverable debts", "Ahmed (trade receivable)", "Allowance for irrecoverable debts", "Sales", "Bank", "Sales returns"], why: "The loss is an expense (debit). Ahmed's account is cleared with a credit." },
  { id: "de17", text: "Charged depreciation of $3,000 on the delivery van for the year.", debit: "Depreciation (expense)", credit: "Provision for depreciation (van)", options: ["Depreciation (expense)", "Provision for depreciation (van)", "Motor vehicles", "Bank", "Motor expenses", "Capital"], why: "Depreciation is an expense. The van's cost stays in Motor vehicles; the depreciation builds up as accumulated depreciation in the provision for depreciation account (credit)." },
  { id: "de18", text: "Allowed Karim a cash discount of $20 when he paid his account.", debit: "Discount allowed", credit: "Karim (trade receivable)", options: ["Discount allowed", "Karim (trade receivable)", "Discount received", "Sales", "Bank", "Sales returns"], why: "Discount allowed is an expense for us. Karim owes $20 less, so credit his account." },
];

export const FIND_ERROR = [
  {
    id: "fe1", title: "Trial balance extract", context: "One balance is on the wrong side.", columns: ["Account", "Debit $", "Credit $"],
    rows: [["Purchases", "18,000", ""], ["Sales", "", "30,000"], ["Discount received", "300", ""], ["Drawings", "4,000", ""], ["Bank overdraft", "", "1,200"], ["Trade receivables", "3,500", ""]],
    wrong: 2, why: "Discount received is income, and income balances are credits (CLIC). It should be in the credit column.",
  },
  {
    id: "fe2", title: "Trial balance extract", context: "One balance is on the wrong side.", columns: ["Account", "Debit $", "Credit $"],
    rows: [["Capital", "", "20,000"], ["Carriage inwards", "400", ""], ["Sales returns", "600", ""], ["Purchases returns", "500", ""], ["Rent received", "", "1,000"], ["Inventory at 1 January", "2,500", ""]],
    wrong: 3, why: "Purchases returns (returns outwards) reduce purchases and have a credit balance. Sales returns, on the other hand, are a debit.",
  },
  {
    id: "fe3", title: "Statement of profit or loss extract", context: "One item is in the wrong part of the statement.", columns: ["Line", "$"],
    rows: [["Revenue", "50,000"], ["Cost of sales: opening inventory", "4,000"], ["Cost of sales: purchases", "28,000"], ["Cost of sales: carriage outwards", "700"], ["Cost of sales: less closing inventory", "(5,000)"], ["Expenses: wages", "9,000"]],
    wrong: 3, why: "Carriage outwards is the cost of delivering goods to customers, a selling expense below gross profit. Only carriage inwards belongs in cost of sales.",
  },
  {
    id: "fe4", title: "Statement of financial position extract", context: "One item is classified wrongly.", columns: ["Heading", "Item", "$"],
    rows: [["Non-current assets", "Premises at carrying amount", "60,000"], ["Current assets", "Inventory", "7,000"], ["Current assets", "Trade receivables less allowance", "4,750"], ["Current assets", "Bank overdraft", "900"], ["Current liabilities", "Trade payables", "3,200"], ["Current liabilities", "Accrued wages", "350"]],
    wrong: 3, why: "A bank overdraft is money owed to the bank, repayable on demand. It is a current liability, not a current asset.",
  },
  {
    id: "fe5", title: "Depreciation schedule", context: "A van cost $20,000 and is depreciated at 20% a year on the reducing balance method. One figure is wrong.", columns: ["Line", "$"],
    rows: [["Year 1 depreciation (20% × 20,000)", "4,000"], ["Carrying amount at end of year 1", "16,000"], ["Accumulated depreciation at end of year 1", "4,000"], ["Year 2 depreciation", "4,000"]],
    wrong: 3, why: "Reducing balance applies the rate to the carrying amount, not to cost: 20% × 16,000 = 3,200.",
  },
  {
    id: "fe6", title: "Bank reconciliation statement", context: "The cash book has already been updated. One line should not be here.", columns: ["Line", "$"],
    rows: [["Balance as per bank statement", "2,600"], ["Add: deposits not yet credited", "500"], ["Less: unpresented cheques", "(310)"], ["Less: bank charges", "(60)"], ["Balance as per updated cash book", "2,790"]],
    wrong: 3, why: "Bank charges are already on the bank statement. They are entered in the cash book update, not in the reconciliation. Without that line the statement agrees: 2,600 + 500 − 310 = 2,790.",
  },
  {
    id: "fe7", title: "Partnership appropriation account", context: "One item does not belong in the appropriation account.", columns: ["Line", "$"],
    rows: [["Profit for the year", "40,000"], ["Add: interest on drawings", "600"], ["Less: salary to Mona", "(8,000)"], ["Less: interest on capital", "(3,000)"], ["Less: interest on Mona's loan to the business", "(500)"], ["Residual profit shared 2:1", "29,600"]],
    wrong: 4, why: "Interest on a partner's loan is an expense in the statement of profit or loss, charged before profit for the year. It is not a share of profit.",
  },
  {
    id: "fe8", title: "Rent accrual", context: "Rent paid during the year was $9,000. A further $1,000 was owing at the year end. One figure is wrong.", columns: ["Line", "$"],
    rows: [["Rent paid during the year", "9,000"], ["Rent accrued at the year end (current liability)", "1,000"], ["Rent expense in the statement of profit or loss", "8,000"]],
    wrong: 2, why: "Accrued expenses are added (AA): 9,000 + 1,000 = 10,000 is the cost of the year.",
  },
];

// Drag-and-drop builders. Every item has exactly one correct place.
export const SORTERS = [
  {
    id: "tb", title: "Build a trial balance", section: "3.1", hint: "DEAD CLIC: Debits are Expenses, Assets, Drawings. Credits are Liabilities, Income, Capital.",
    zones: ["Debit", "Credit"],
    items: [
      ["Purchases", "Debit"], ["Sales", "Credit"], ["Capital", "Credit"], ["Drawings", "Debit"], ["Premises", "Debit"], ["Trade payables", "Credit"],
      ["Trade receivables", "Debit"], ["Rent received", "Credit"], ["Wages", "Debit"], ["Bank loan", "Credit"], ["Sales returns", "Debit"], ["Purchases returns", "Credit"],
      ["Discount allowed", "Debit"], ["Discount received", "Credit"], ["Carriage inwards", "Debit"], ["Provision for depreciation", "Credit"],
    ],
  },
  {
    id: "is", title: "Lay out the statement of profit or loss", section: "5.1", hint: "Cost of sales is about the goods. Everything that runs the business goes under expenses.",
    zones: ["Revenue", "Cost of sales", "Other income", "Expenses"],
    items: [
      ["Sales less sales returns", "Revenue"], ["Opening inventory", "Cost of sales"], ["Purchases less purchases returns", "Cost of sales"], ["Carriage inwards", "Cost of sales"],
      ["Closing inventory (deducted)", "Cost of sales"], ["Rent received", "Other income"], ["Discount received", "Other income"], ["Carriage outwards", "Expenses"],
      ["Wages and salaries", "Expenses"], ["Depreciation of equipment", "Expenses"], ["Irrecoverable debts", "Expenses"], ["Discount allowed", "Expenses"],
    ],
  },
  {
    id: "sfp", title: "Classify the statement of financial position", section: "5.1", hint: "Current means it will turn into cash, or must be paid, within 12 months.",
    zones: ["Non-current assets", "Current assets", "Current liabilities", "Non-current liabilities", "Capital"],
    items: [
      ["Premises", "Non-current assets"], ["Motor vehicles at carrying amount", "Non-current assets"], ["Inventory", "Current assets"], ["Trade receivables less allowance", "Current assets"],
      ["Prepaid insurance (other receivables)", "Current assets"], ["Cash in hand", "Current assets"], ["Trade payables", "Current liabilities"], ["Bank overdraft", "Current liabilities"],
      ["Accrued wages (other payables)", "Current liabilities"], ["Bank loan repayable in 2032", "Non-current liabilities"], ["Opening capital plus profit", "Capital"], ["Drawings (deducted)", "Capital"],
    ],
  },
  {
    id: "bank", title: "Bank reconciliation: where does each item go?", section: "3.3", hint: "Items the bank knows about but the trader does not go in the cash book. Timing differences go in the reconciliation.",
    zones: ["Cash book: debit", "Cash book: credit", "Reconciliation: add", "Reconciliation: less"],
    items: [
      ["Credit transfer from a customer", "Cash book: debit"], ["Interest paid by the bank to the business", "Cash book: debit"], ["Bank charges", "Cash book: credit"],
      ["Direct debit for insurance", "Cash book: credit"], ["Standing order for rent", "Cash book: credit"], ["Customer's cheque dishonoured", "Cash book: credit"],
      ["Deposit not yet credited by the bank", "Reconciliation: add"], ["Unpresented cheque to a supplier", "Reconciliation: less"],
    ],
    note: "This version starts the reconciliation from the bank statement balance and works towards the updated cash book balance.",
  },
];

export const RATIO_FIELDS = [
  ["revenue", "Revenue"], ["costOfSales", "Cost of sales"], ["profit", "Profit for the year"], ["interest", "Loan or debenture interest"], ["capitalEmployed", "Capital employed"],
  ["currentAssets", "Current assets"], ["inventory", "Closing inventory"], ["openingInventory", "Opening inventory"], ["currentLiabilities", "Current liabilities"],
  ["tradeReceivables", "Trade receivables"], ["creditSales", "Credit sales"], ["tradePayables", "Trade payables"], ["creditPurchases", "Credit purchases"],
];

export const RATIO_EXAMPLE = {
  revenue: 120000, costOfSales: 78000, profit: 18000, interest: 1500, capitalEmployed: 90000, currentAssets: 26000, inventory: 11000, openingInventory: 9000,
  currentLiabilities: 15000, tradeReceivables: 9600, creditSales: 96000, tradePayables: 8400, creditPurchases: 80000,
};

const div = (a, b) => (Number.isFinite(a) && Number.isFinite(b) && b !== 0 ? a / b : null);

export function computeRatios(input) {
  const n = Object.fromEntries(Object.entries(input).map(([key, value]) => [key, value === "" || value === null ? NaN : Number(value)]));
  const grossProfit = n.revenue - n.costOfSales;
  const averageInventory = (n.openingInventory + n.inventory) / 2;
  const turnover = div(n.costOfSales, averageInventory);
  return [
    { id: "gm", name: "Gross profit margin", group: "Profitability", formula: "Gross profit ÷ Revenue × 100", value: div(grossProfit, n.revenue) === null ? null : div(grossProfit, n.revenue) * 100, unit: "%", meaning: "How much of every $100 of sales is left after the cost of the goods sold.", read: "Higher is better. Falls when selling prices are cut or purchase costs rise." },
    { id: "mu", name: "Mark-up", group: "Profitability", formula: "Gross profit ÷ Cost of sales × 100", value: div(grossProfit, n.costOfSales) === null ? null : div(grossProfit, n.costOfSales) * 100, unit: "%", meaning: "How much is added on top of cost to set the selling price.", read: "Higher than the gross profit margin for the same business whenever there is a gross profit." },
    { id: "pm", name: "Profit margin", group: "Profitability", formula: "Profit for the year ÷ Revenue × 100", value: div(n.profit, n.revenue) === null ? null : div(n.profit, n.revenue) * 100, unit: "%", meaning: "How much of every $100 of sales is left after all expenses.", read: "If gross profit margin holds but profit margin falls, expenses are growing too fast." },
    { id: "roce", name: "Return on capital employed", group: "Profitability", formula: "Profit for the year before interest ÷ Capital employed × 100", value: div(n.profit + (Number.isFinite(n.interest) ? n.interest : 0), n.capitalEmployed) === null ? null : div(n.profit + (Number.isFinite(n.interest) ? n.interest : 0), n.capitalEmployed) * 100, unit: "%", meaning: "How well all the long-term money in the business (owners' and lenders') is earning profit.", read: "Compare it with what the money could earn elsewhere, such as bank interest. Capital employed = issued shares + reserves + non-current liabilities (sole trader: capital + non-current liabilities)." },
    { id: "cr", name: "Current (working capital) ratio", group: "Liquidity", formula: "Current assets ÷ Current liabilities, as x : 1", value: div(n.currentAssets, n.currentLiabilities), unit: ":1", meaning: "Whether short-term assets cover short-term debts.", read: "Many textbooks treat about 1.5–2 : 1 as comfortable, but it depends on the type of business." },
    { id: "at", name: "Acid test (liquid) ratio", group: "Liquidity", formula: "(Current assets − Inventory) ÷ Current liabilities, as x : 1", value: div(n.currentAssets - n.inventory, n.currentLiabilities), unit: ":1", meaning: "Whether debts can be paid without selling inventory.", read: "Around 1 : 1 is often treated as safe. Below that, the business relies on selling inventory to pay its debts." },
    { id: "it", name: "Rate of inventory turnover (times)", group: "Efficiency", formula: "Cost of sales ÷ Average inventory", value: turnover, unit: " times", meaning: "How many times a year the average inventory is sold and replaced.", read: "Faster usually means less money tied up and less risk of goods going out of date." },
    { id: "id", name: "Inventory turnover (days)", group: "Efficiency", formula: "Average inventory ÷ Cost of sales × 365", value: turnover ? 365 / turnover : null, unit: " days", meaning: "How long goods sit before they are sold.", read: "Fewer days is usually better, as long as the business does not run out of inventory." },
    { id: "rd", name: "Trade receivables turnover (days)", group: "Efficiency", formula: "Trade receivables ÷ Credit sales × 365", value: div(n.tradeReceivables, n.creditSales) === null ? null : div(n.tradeReceivables, n.creditSales) * 365, unit: " days", meaning: "How long credit customers take to pay.", read: "Compare with the credit terms given. Longer than the terms means slow collection." },
    { id: "pd", name: "Trade payables turnover (days)", group: "Efficiency", formula: "Trade payables ÷ Credit purchases × 365", value: div(n.tradePayables, n.creditPurchases) === null ? null : div(n.tradePayables, n.creditPurchases) * 365, unit: " days", meaning: "How long the business takes to pay its suppliers.", read: "Paying later helps cash flow, but too slow risks losing discounts and supplier goodwill." },
  ].map((ratio) => ({ ...ratio, value: ratio.value === null || !Number.isFinite(ratio.value) ? null : Math.round(ratio.value * 100) / 100 }));
}
