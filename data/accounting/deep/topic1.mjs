// Original teaching material for Cambridge IGCSE Accounting 0452 (2027–2029). Topic 1: Accounting foundations.
// Not Cambridge-authored. All scenarios, names and figures are invented for this app.

export const topic = {
  id: "1",
  name: "Accounting foundations",
  sections: [
    {
      section: "1.1",
      title: "Purpose of accounting",
      summary:
        "Book-keeping records every transaction accurately; accounting classifies, summarises and interprets those records so that the owner and other people can make decisions. The main reason for keeping accounts is to measure profit or loss for a period and to show the financial position at a date. Profit and cash are not the same thing, which is why both statements are needed.",
      objectives: [
        "Explain the difference between book-keeping and accounting.",
        "State the purpose of measuring profit or loss and calculate a simple profit for the year.",
        "Explain why a business can make a profit and still have less money in the bank.",
        "Describe what the statement of profit or loss and the statement of financial position each show.",
        "Explain the role of accounting in providing information for decision-making.",
        "Identify which stages of the accounting process are book-keeping and which are accounting.",
      ],
      keyTerms: [
        { term: "Book-keeping", definition: "The systematic recording of a business's financial transactions in books of prime entry and ledger accounts." },
        { term: "Accounting", definition: "Using the book-keeping records to classify, summarise, interpret and communicate financial information for decision-making." },
        { term: "Transaction", definition: "Any business event that can be measured in money, such as a sale, a purchase, a payment or a receipt." },
        { term: "Source document", definition: "The paper or electronic evidence of a transaction, such as an invoice or a receipt, from which the first record is made." },
        { term: "Revenue", definition: "The income earned by a business from selling its goods or services during a period, whether or not the cash has been received." },
        { term: "Expenses", definition: "The day-to-day costs of running a business for a period, such as wages, rent and electricity, which are deducted in calculating profit." },
        { term: "Profit for the year", definition: "The amount by which the total income of a period is greater than the total expenses of the same period." },
        { term: "Loss for the year", definition: "The amount by which the total expenses of a period are greater than the total income of the same period." },
        { term: "Statement of profit or loss", definition: "The financial statement that measures the profit or loss of a business over a period of time, usually one year." },
        { term: "Statement of financial position", definition: "The financial statement that lists the assets, liabilities and capital of a business at one particular date." },
        { term: "Drawings", definition: "Cash or goods taken out of the business by the owner for personal use; they reduce capital and are not an expense." },
      ],
      notes: [
        {
          heading: "What book-keeping is",
          body:
            "Book-keeping is the recording part of accounting. Every time a business buys, sells, pays or receives something, a transaction happens. The book-keeper writes each transaction down in an organised way, using the figures shown on source documents such as invoices and receipts. The entries go first into books of prime entry and then into ledger accounts. The aim is simple: to keep a complete, accurate and permanent record of everything that has happened in money terms.\n\nBook-keeping does not try to explain the figures. It does not decide whether a selling price is too low or whether a customer is slow to pay. It only makes sure that the facts are recorded correctly, in the right account, on the right side and with the right amount. If the recording is wrong, everything built on it later will also be wrong. That is why neat, systematic book-keeping is the foundation of the whole subject.",
        },
        {
          heading: "What accounting adds",
          body:
            "Accounting starts where book-keeping stops. The accountant takes the recorded figures and classifies them into groups such as income, expenses, assets and liabilities. The figures are then summarised into financial statements, mainly the statement of profit or loss and the statement of financial position. Finally the accountant interprets the results. Is profit rising or falling? Can the business pay its debts on time? Which products earn the most?\n\nA short way to remember the difference is that book-keeping records and accounting reports. The book-keeper asks what happened. The accountant asks what it means and what should be done next. In a very small business one person may do both jobs, but the two skills are still different. In the exam, if you are asked to distinguish between them, give the purpose of each one, not just a list of tasks.",
          table: {
            head: ["Feature", "Book-keeping", "Accounting"],
            rows: [
              ["Main purpose", "Record transactions", "Classify, summarise and interpret"],
              ["Typical output", "Books of prime entry and ledger accounts", "Financial statements and reports"],
              ["Skill needed", "Accuracy and routine", "Judgement and analysis"],
              ["Question answered", "What happened?", "What does it mean and what next?"],
            ],
          },
        },
        {
          heading: "Why a business measures profit or loss",
          body:
            "Profit is what is left when the expenses of a period are taken away from the income earned in the same period. A loss arises when expenses are greater than income. Measuring profit is the main reason most owners keep accounts. First, profit shows whether the business is worth running. An owner who could earn more in a paid job than the business earns may decide to close it. Second, the profit figure tells the owner how much can safely be taken as drawings. Taking out more than the profit reduces the capital invested. Third, other people need the figure: the tax authority uses it to calculate tax, and a bank uses it to judge whether a loan can be repaid.\n\nMeasuring profit also allows comparison. An owner can compare this year with last year, or one branch with another, and ask why the figures changed. Without a measured profit, every decision is a guess.",
        },
        {
          heading: "The two main financial statements",
          body:
            "The statement of profit or loss covers a period of time, usually one year. It lists revenue, deducts cost of sales to find gross profit, and then deducts the other expenses to find profit for the year. Its heading always says for the year ended followed by a date.\n\nThe statement of financial position is a snapshot at one moment, usually the last day of the same year. It lists the assets the business owns, the liabilities it owes and the capital of the owner. Its heading says at followed by the date. Because it is a snapshot, the figures change the very next day when more transactions happen.\n\nA common exam error is to mix up the headings. Remember that profit is earned over time, so the statement of profit or loss needs a period. Position is where the business stands now, so the statement of financial position needs a single date.",
          table: {
            head: ["Statement", "Covers", "Contains", "Key figure"],
            rows: [
              ["Statement of profit or loss", "A period (for the year ended ...)", "Revenue, cost of sales, expenses", "Profit for the year"],
              ["Statement of financial position", "One date (at ...)", "Assets, liabilities, capital", "Total assets equal capital plus liabilities"],
            ],
          },
        },
        {
          heading: "Profit is not the same as cash",
          body:
            "Many students assume that a profitable business must have money in the bank. It often does not. Profit is measured when a sale is made, even if the customer has not yet paid. Cash is only received when the customer actually pays. A business that sells a lot on credit can show a healthy profit while its bank account is overdrawn.\n\nOther transactions change the bank balance without touching profit at all. Buying a motor van reduces the bank, but the van is an asset, not an expense. Drawings reduce the bank, but they are the owner taking out capital, not a business expense. Receiving a loan increases the bank, but a loan is a liability, not income. Capital introduced by the owner increases the bank, but it is not profit.\n\nThis is why both statements are needed. The statement of profit or loss measures performance over the period. The bank balance in the statement of financial position shows how much money is available right now. A careful owner watches both figures.",
        },
        {
          heading: "How accounting helps decisions",
          body:
            "Accounting information turns a feeling about the business into facts. For pricing, knowing the cost of each item and the gross profit margin tells the owner whether a selling price covers costs. For expansion, a record of past profits and the present bank balance shows whether a second shop can be afforded or whether a loan is needed. For credit control, a list of trade receivables shows which customers owe money and for how long, so slow payers can be chased before cash runs out. For cost control, comparing this year's wages or electricity with last year's reveals costs that are growing faster than revenue.\n\nPeople outside the business use the same information. A bank reads the statements before lending. A supplier checks them before giving credit. The tax authority uses them to calculate the tax due. Because so many decisions depend on them, the figures must be complete, accurate and prepared on consistent rules. The role of accounting is to provide reliable information for decision-making, not just to keep records.",
        },
        {
          heading: "From source document to decision",
          body:
            "The accounting process is a chain, and each link depends on the one before it. A transaction happens and produces a source document, for example a sales invoice. The document is entered in a book of prime entry such as the sales journal. The totals are posted to ledger accounts. At the end of the period the ledger balances are listed in a trial balance to check the arithmetic. The financial statements are prepared from the trial balance after year-end adjustments. Finally the owner and other users read the statements and make decisions.\n\nThe first three links are book-keeping. The last two are accounting, and the trial balance sits between them. If a link breaks, for example an invoice is never recorded, revenue is understated, profit is understated, and a decision based on that profit could be wrong. Keeping the chain complete is the daily job of every business, however small.",
          table: {
            head: ["Stage", "Example", "Book-keeping or accounting"],
            rows: [
              ["Source document", "Sales invoice number 214", "Book-keeping"],
              ["Book of prime entry", "Sales journal", "Book-keeping"],
              ["Ledger account", "Account of the customer who owes the money", "Book-keeping"],
              ["Trial balance", "List of all ledger balances at 31 December 2026", "Checking stage between the two"],
              ["Financial statements", "Statement of profit or loss and statement of financial position", "Accounting"],
              ["Interpretation", "Comparing profit for the year with last year", "Accounting"],
            ],
          },
        },
      ],
      workedExamples: [
        {
          title: "Calculating profit for the year for a small bakery",
          scenario:
            "Nadia runs a bakery. For the year ended 31 December 2026 her records show: revenue $64,000; cost of sales $38,500; wages $9,200; rent $4,800; electricity $1,350; other expenses $1,150. Calculate her gross profit and her profit for the year.",
          steps: [
            "Step 1: Write the heading. Nadia, Statement of profit or loss for the year ended 31 December 2026. The heading must show a period because profit is earned over time.",
            "Step 2: Find gross profit. Revenue $64,000 less cost of sales $38,500 equals gross profit $25,500.",
            "Step 3: Add up the other expenses. Wages $9,200 plus rent $4,800 equals $14,000. Add electricity $1,350 to get $15,350. Add other expenses $1,150 to get total expenses $16,500.",
            "Step 4: Deduct total expenses from gross profit. $25,500 less $16,500 equals profit for the year $9,000.",
            "Step 5: Check by a different route. Total income $64,000 less all costs ($38,500 plus $16,500 equals $55,000) gives $9,000. The two routes agree.",
          ],
          answer: "Gross profit $25,500. Profit for the year $9,000.",
        },
        {
          title: "Why profit and the bank balance move differently",
          scenario:
            "Karim started a month with $3,000 in the business bank account and no other assets or liabilities. During the month he bought goods for $5,400, paying by bank transfer. He sold all of the goods on credit for $8,100. He paid rent of $700 by bank transfer. No customer had paid by the end of the month. Calculate his profit for the month and his bank balance at the end of the month, and explain the difference.",
          steps: [
            "Step 1: Calculate profit. Revenue is $8,100 because the sales have been made, even though the customers have not yet paid. Cost of sales is $5,400 because all the goods were sold. Gross profit is $8,100 less $5,400 equals $2,700. Deduct rent $700 to give profit for the month of $2,000.",
            "Step 2: Calculate the bank balance. Opening balance $3,000. Deduct the $5,400 paid for goods to give a negative balance of $2,400. Deduct rent $700 to give a negative balance of $3,100. The bank account is overdrawn by $3,100.",
            "Step 3: Explain the difference. Profit is $2,000 but the bank has fallen by $6,100 (from $3,000 to an overdraft of $3,100). The gap of $8,100 is exactly the amount owed by credit customers, which is an asset called trade receivables.",
            "Step 4: Check with the accounting equation. Assets are trade receivables $8,100. Liabilities are the bank overdraft $3,100. Capital is the opening $3,000 plus profit $2,000 equals $5,000. Assets $8,100 equal liabilities $3,100 plus capital $5,000.",
          ],
          answer: "Profit for the month $2,000. Bank overdrawn by $3,100. The difference is the $8,100 still owed by customers.",
        },
        {
          title: "Sorting tasks into book-keeping and accounting",
          scenario:
            "Salma employs an assistant and also visits an accountant twice a year. The following tasks were done last month: (1) entering a purchase invoice in the purchases journal; (2) deciding whether the shop should stop selling a product with a low gross profit; (3) posting the total of the sales journal to the sales account; (4) explaining to the bank manager why profit fell; (5) balancing the cash book at the end of the week; (6) preparing the statement of financial position. State whether each task is book-keeping or accounting and give the reason.",
          steps: [
            "Step 1: Ask of each task: is it recording what happened, or is it summarising and interpreting? Recording is book-keeping; summarising, interpreting and advising is accounting.",
            "Step 2: Task 1 is book-keeping. Entering an invoice in a book of prime entry is pure recording.",
            "Step 3: Task 2 is accounting. Using gross profit figures to make a decision about a product is interpretation.",
            "Step 4: Task 3 is book-keeping. Posting a total from a journal to a ledger account is a routine recording step.",
            "Step 5: Task 4 is accounting. Explaining a change in profit requires the figures to be analysed and communicated.",
            "Step 6: Task 5 is book-keeping. Balancing an account is part of keeping the records in order.",
            "Step 7: Task 6 is accounting. The statement of financial position is a summary prepared from the records for users to read.",
          ],
          answer: "Book-keeping: tasks 1, 3 and 5. Accounting: tasks 2, 4 and 6.",
        },
        {
          title: "Using two years of figures to make a decision",
          scenario:
            "Yusuf owns a phone repair shop. In 2025 revenue was $52,000 and profit for the year was $7,800. In 2026 revenue rose to $60,000 but profit for the year was $7,200. Yusuf says the business is doing better because revenue is higher. Use the figures to advise him.",
          steps: [
            "Step 1: Calculate profit as a percentage of revenue for each year. 2025: $7,800 divided by $52,000 equals 15%. 2026: $7,200 divided by $60,000 equals 12%.",
            "Step 2: Compare. Revenue rose by $8,000, but profit fell by $600 and every dollar of revenue now earns 12 cents of profit instead of 15 cents.",
            "Step 3: Interpret. The costs of the business grew faster than its revenue. In 2025 costs were $52,000 less $7,800 equals $44,200. In 2026 costs were $60,000 less $7,200 equals $52,800, an increase of $8,600 against a revenue increase of $8,000.",
            "Step 4: Advise. Yusuf should not judge the business on revenue alone. He should look at which costs rose, for example parts, wages or rent, and decide whether prices need to rise or costs need to be cut.",
          ],
          answer: "Profit margin fell from 15% to 12%. The business is less profitable per dollar of sales, so Yusuf should investigate the increase in costs of $8,600.",
        },
      ],
      commonErrors: [
        { error: "Saying that profit is the money in the bank at the end of the year.", fix: "Profit is income less expenses for a period. The bank balance is affected by credit sales, asset purchases, loans and drawings, none of which change profit in the same way." },
        { error: "Describing book-keeping and accounting as the same thing, or listing tasks without a purpose.", fix: "Book-keeping records transactions; accounting classifies, summarises and interprets them for decisions. Give the purpose of each in your answer." },
        { error: "Heading the statement of profit or loss at a date and the statement of financial position for a year.", fix: "Profit is earned over a period, so write for the year ended 31 December 2026. Position is at a moment, so write at 31 December 2026." },
        { error: "Treating capital introduced by the owner, or a loan received, as income that increases profit.", fix: "Money put in by the owner increases capital; a loan increases liabilities. Neither is revenue, so neither appears in the statement of profit or loss." },
        { error: "Treating drawings as an expense of the business.", fix: "Drawings are the owner taking resources out. They reduce capital in the statement of financial position and are never deducted in calculating profit." },
        { error: "Answering why accounts are kept with a vague phrase such as to see how the business is doing.", fix: "Be specific: to measure profit or loss for the period, to show assets, liabilities and capital at a date, and to provide information for decisions such as pricing, borrowing and expansion." },
      ],
      examTips: [
        "When asked to explain the purpose of accounting, give two separate ideas: measuring profit or loss, and providing information for decisions. One sentence with both ideas usually earns only one mark.",
        "For any difference question (book-keeping versus accounting) write one sentence about each side. Examiners cannot award a comparison mark if only one side is described.",
        "If a question gives revenue, cost of sales and expenses, show gross profit as a separate line before profit for the year. The intermediate figure often carries its own mark.",
        "Learn the exact headings: statement of profit or loss for the year ended, statement of financial position at. Marks for the heading are easy to win and easy to lose.",
        "When explaining why profit and bank differ, name a specific item from the data (credit sales, purchase of a non-current asset, drawings, loan) and say in which direction it moves the bank. General statements earn little.",
        "Use the words a user, a decision and the figure that helps. For example: the bank (user) decides whether to lend (decision) by looking at profit for the year and the bank balance (figures).",
      ],
      exercises: [
        {
          id: "ex-1.1-1",
          type: "explain",
          marks: 2,
          prompt: "Explain what is meant by book-keeping.",
          model: "Book-keeping is the recording of the financial transactions of a business in a systematic way. The entries are made from source documents into books of prime entry and then into ledger accounts, so that there is a complete and accurate record of what has happened.",
          points: ["Recording of financial transactions (1)", "In a systematic way, from documents into books and ledger accounts (1)"],
        },
        {
          id: "ex-1.1-2",
          type: "explain",
          marks: 2,
          prompt: "Explain what is meant by accounting and how it differs from book-keeping.",
          model: "Accounting uses the records produced by book-keeping. It classifies and summarises them into financial statements and interprets the results so that the owner and other users can make decisions. Book-keeping only records; accounting explains what the records mean.",
          points: ["Accounting classifies, summarises and interprets the recorded information for decisions (1)", "Difference: book-keeping is recording only, accounting reports and interprets (1)"],
        },
        {
          id: "ex-1.1-3",
          type: "calculation",
          marks: 3,
          prompt: "Dina's shop had revenue of $27,400 and cost of sales of $16,900 for the year ended 31 March 2026. Her other expenses totalled $6,250. Calculate her gross profit and her profit for the year.",
          model: "Gross profit equals revenue less cost of sales: $27,400 less $16,900 equals $10,500. Profit for the year equals gross profit less expenses: $10,500 less $6,250 equals $4,250.",
          points: ["Gross profit $10,500 (1)", "Expenses $6,250 deducted from gross profit (1)", "Profit for the year $4,250 (1)"],
        },
        {
          id: "ex-1.1-4",
          type: "explain",
          marks: 4,
          prompt: "Explain two reasons why the owner of a business wants to know the profit for the year.",
          model: "First, the profit shows whether the business is successful. If profit is low compared with the owner's time and money invested, the owner may change how the business is run or decide to close it. Second, the profit shows how much the owner can take out as drawings. If drawings are greater than profit, capital falls and the business becomes weaker. Other acceptable reasons: to calculate tax, to show a bank when asking for a loan, to compare with earlier years.",
          points: ["Reason 1 stated, for example to judge whether the business is successful (1)", "Reason 1 developed, for example to decide whether to continue, change or close (1)", "Reason 2 stated, for example to decide how much can be taken as drawings (1)", "Reason 2 developed, for example drawings above profit reduce capital (1)"],
        },
        {
          id: "ex-1.1-5",
          type: "calculation",
          marks: 4,
          prompt: "Fady started June 2026 with $2,500 in the bank. During the month he made cash sales of $4,300 and credit sales of $3,900. He paid $5,100 to suppliers for goods, all of which were sold, and paid wages of $800. No credit customer had paid by 30 June. Calculate his profit for the month and his bank balance at 30 June 2026, and explain why the two figures are different.",
          model: "Revenue is $4,300 plus $3,900 equals $8,200. Profit equals $8,200 less cost of sales $5,100 less wages $800 equals $2,300. Bank: $2,500 plus $4,300 received less $5,100 less $800 equals $900. The bank balance fell by $1,600 while profit was $2,300. The difference of $3,900 is the credit sales which are included in profit but have not yet been received in cash; they are shown as trade receivables.",
          points: ["Total revenue $8,200 (1)", "Profit for the month $2,300 (1)", "Closing bank balance $900 (1)", "Difference explained by credit sales of $3,900 not yet received (1)"],
        },
        {
          id: "ex-1.1-6",
          type: "explain",
          marks: 4,
          prompt: "State whether each of the following is book-keeping or accounting: (a) writing up the petty cash book; (b) advising the owner that trade receivables are too high; (c) recording a cheque received from a customer; (d) preparing the statement of profit or loss.",
          model: "(a) Book-keeping, because it records small cash payments. (b) Accounting, because it interprets the figures and gives advice. (c) Book-keeping, because it records a receipt. (d) Accounting, because it summarises the records into a statement for users.",
          points: ["(a) book-keeping (1)", "(b) accounting (1)", "(c) book-keeping (1)", "(d) accounting (1)"],
        },
        {
          id: "ex-1.1-7",
          type: "explain",
          marks: 5,
          prompt: "For each of the following items, state whether it appears in the statement of profit or loss or in the statement of financial position: (a) profit for the year; (b) trade payables; (c) rent paid for the year; (d) bank balance; (e) wages.",
          model: "(a) Profit for the year is the final figure of the statement of profit or loss (and is then added to capital in the statement of financial position). (b) Trade payables are a current liability in the statement of financial position. (c) Rent is an expense in the statement of profit or loss. (d) The bank balance is a current asset in the statement of financial position. (e) Wages are an expense in the statement of profit or loss.",
          points: ["(a) statement of profit or loss (1)", "(b) statement of financial position (1)", "(c) statement of profit or loss (1)", "(d) statement of financial position (1)", "(e) statement of profit or loss (1)"],
        },
        {
          id: "ex-1.1-8",
          type: "explain",
          marks: 6,
          prompt: "Heba owns one clothes shop and is thinking of opening a second shop in another town. Explain three ways in which her accounting records will help her to make this decision.",
          model: "First, the statement of profit or loss shows the profit for the year of the existing shop. If profit is steady or rising, a second shop is more likely to succeed and Heba can estimate what a second shop might earn. Second, the statement of financial position shows her bank balance and other assets, so she can see whether she can pay for the new shop herself or will need a loan. Third, her records of expenses such as rent, wages and electricity give her realistic figures to forecast the costs of the second shop. If she needs a loan, the bank will also want to see these statements before lending.",
          points: ["Profit for the year shows whether the existing shop is successful (1)", "Developed: used to estimate what a second shop could earn (1)", "Statement of financial position shows bank and other resources available (1)", "Developed: tells her whether she needs to borrow (1)", "Records of past expenses help forecast the costs of the new shop (1)", "Developed: bank or lender will require the statements before lending (1)"],
        },
        {
          id: "ex-1.1-9",
          type: "calculation",
          marks: 8,
          prompt: "Samir's furniture shop had the following results. Year ended 31 December 2025: revenue $90,000, cost of sales $54,000, expenses $21,600. Year ended 31 December 2026: revenue $108,000, cost of sales $70,200, expenses $24,300. Calculate for each year the gross profit, the profit for the year and the profit for the year as a percentage of revenue. Comment on what the figures show.",
          model: "2025: gross profit $90,000 less $54,000 equals $36,000; profit for the year $36,000 less $21,600 equals $14,400; profit as a percentage of revenue $14,400 divided by $90,000 equals 16%. 2026: gross profit $108,000 less $70,200 equals $37,800; profit for the year $37,800 less $24,300 equals $13,500; percentage $13,500 divided by $108,000 equals 12.5%. Comment: revenue rose by $18,000 (20%) but profit for the year fell by $900 and the profit percentage fell from 16% to 12.5%. The main cause is cost of sales, which rose from 60% of revenue to 65% of revenue, so gross profit as a percentage of revenue fell from 40% to 35%. Samir may be paying more for his goods or charging lower prices.",
          points: ["Gross profit 2025 $36,000 (1)", "Profit for the year 2025 $14,400 (1)", "Gross profit 2026 $37,800 (1)", "Profit for the year 2026 $13,500 (1)", "Percentage 2025 16% (1)", "Percentage 2026 12.5% (1)", "Comment: revenue up but profit and percentage down (1)", "Reason: cost of sales rose faster than revenue, gross profit margin fell from 40% to 35% (1)"],
        },
        {
          id: "ex-1.1-10",
          type: "explain",
          marks: 6,
          prompt: "Rami's business made a profit for the year of $11,000 but his bank balance fell during the year. He says his accountant must have made a mistake. Explain three reasons why a business can make a profit while its bank balance falls.",
          model: "There need not be a mistake. First, sales made on credit are included in revenue and profit when the goods are sold, but the money only enters the bank when the customer pays, so trade receivables may have grown. Second, buying a non-current asset such as a van or equipment takes money out of the bank, but the asset is not an expense, so profit is not reduced by the payment. Third, drawings taken by Rami reduce the bank but are not an expense in the statement of profit or loss. Other valid reasons include repaying a loan, paying suppliers faster than before, or building up inventory.",
          points: ["Credit sales included in profit before cash is received (1)", "Developed: trade receivables increase instead of bank (1)", "Purchase of non-current asset reduces bank (1)", "Developed: not an expense so profit unchanged (1)", "Drawings reduce bank (1)", "Developed: drawings are not deducted in calculating profit (1)"],
        },
      ],
      mcq: [
        {
          id: "mcq-1.1-1",
          question: "Which of the following tasks is book-keeping rather than accounting?",
          choices: ["Entering a purchase invoice in the purchases journal", "Deciding whether to buy a new van using the profit figures", "Comparing this year's profit with last year's", "Calculating the return on capital employed"],
          explanation: "Entering an invoice in a book of prime entry is recording a transaction, which is book-keeping. The other three tasks use the records to interpret results or make decisions, which is accounting.",
        },
        {
          id: "mcq-1.1-2",
          question: "What is the main purpose of a statement of profit or loss?",
          choices: ["To measure the profit or loss of a business for a period", "To show the assets and liabilities of a business at a date", "To list all money received and paid during the year", "To record each transaction on the day it happens"],
          explanation: "The statement of profit or loss compares income with expenses for a period to find profit or loss. Assets and liabilities at a date belong in the statement of financial position; money received and paid is the cash book; daily recording is book-keeping.",
        },
        {
          id: "mcq-1.1-3",
          question: "A business made a profit of $6,000 for the year but its bank balance fell. Which is a possible reason?",
          choices: ["Customers bought goods on credit and have not yet paid", "Expenses were greater than revenue", "The owner introduced additional capital", "Goods were sold for less than they cost"],
          explanation: "Credit sales increase profit immediately but bring no cash until the customer pays, so profit and bank move apart. Expenses above revenue would mean a loss, not a profit. Capital introduced increases the bank. Selling below cost reduces profit, not the bank balance.",
        },
        {
          id: "mcq-1.1-4",
          question: "Revenue was $45,000, cost of sales $27,000 and other expenses $11,500. What was the profit for the year?",
          choices: ["$6,500", "$18,000", "$33,500", "$38,500"],
          explanation: "Gross profit is $45,000 less $27,000 equals $18,000. Profit for the year is $18,000 less $11,500 equals $6,500. $18,000 is only the gross profit; $33,500 forgets cost of sales; $38,500 is the total of the costs.",
        },
        {
          id: "mcq-1.1-5",
          question: "Which statement shows the financial position of a business at one date?",
          choices: ["Statement of financial position", "Statement of profit or loss", "Cash book", "Sales journal"],
          explanation: "The statement of financial position is a snapshot of assets, liabilities and capital at a date. The statement of profit or loss covers a period. The cash book and sales journal are book-keeping records, not financial statements.",
        },
        {
          id: "mcq-1.1-6",
          question: "Which of the following is part of accounting rather than book-keeping?",
          choices: ["Interpreting the results to help the owner decide whether to expand", "Posting a credit sale to the customer's ledger account", "Writing a cheque to a supplier", "Totalling the purchases journal"],
          explanation: "Interpreting results for a decision is the purpose of accounting. Posting to a ledger account and totalling a journal are book-keeping. Writing a cheque is a business transaction, not a recording task at all.",
        },
        {
          id: "mcq-1.1-7",
          question: "What is the effect of the owner taking $500 from the business bank account for personal use?",
          choices: ["Bank decreases and capital decreases; profit is unchanged", "Profit for the year decreases by $500", "Expenses increase by $500", "Liabilities increase by $500"],
          explanation: "Drawings are the owner withdrawing part of the capital. They reduce the asset bank and reduce capital. They are never an expense, so profit is not affected, and they create no liability.",
        },
        {
          id: "mcq-1.1-8",
          question: "Which stage comes first in the accounting process?",
          choices: ["Recording transactions from source documents", "Preparing the statement of financial position", "Calculating profit for the year", "Interpreting the results for the owner"],
          explanation: "Every later stage depends on the transactions having been recorded first. The statements, the profit figure and the interpretation are all built on those records.",
        },
        {
          id: "mcq-1.1-9",
          question: "Revenue for the year was $31,200 and cost of sales was $19,500. What was the gross profit?",
          choices: ["$11,700", "$50,700", "$19,500", "$12,700"],
          explanation: "Gross profit is revenue less cost of sales: $31,200 less $19,500 equals $11,700. $50,700 adds instead of subtracting, $19,500 is the cost of sales itself and $12,700 is an arithmetic slip.",
        },
        {
          id: "mcq-1.1-10",
          question: "The owner pays $10,000 of her own savings into the business bank account. What is the effect on the profit for the year?",
          choices: ["No effect", "Profit increases by $10,000", "Revenue increases by $10,000", "Expenses decrease by $10,000"],
          explanation: "Capital introduced increases the asset bank and increases capital. It is not income earned by the business, so it does not appear in the statement of profit or loss and profit is unchanged.",
        },
      ],
      structured: [
        {
          id: "sq-1.1-1",
          title: "Layla Mobile: profit, cash and the loan decision",
          stimulus:
            "Layla owns a shop selling mobile phone accessories, trading as Layla Mobile. She keeps simple records and holds no inventory at the year end. For the year ended 30 June 2026 her records show: revenue $86,400; cost of sales $51,840; wages $12,600; rent $7,200; advertising $1,950; insurance $1,110; general expenses $2,300. Her bank balance was $4,100 on 1 July 2025 and $1,200 on 30 June 2026. During the year she paid $6,000 by bank transfer for new shop fittings, took drawings of $4,800, and the amount owed to her by credit customers rose from $3,200 to $4,700. All suppliers and expenses were paid in full during the year. Layla now wants to borrow $15,000 from a bank to open a second shop.",
          parts: [
            {
              label: "a",
              marks: 6,
              prompt: "Prepare the statement of profit or loss of Layla Mobile for the year ended 30 June 2026.",
              model:
                "Layla Mobile, Statement of profit or loss for the year ended 30 June 2026. Revenue $86,400. Less cost of sales $51,840. Gross profit $34,560. Less expenses: wages $12,600; rent $7,200; advertising $1,950; insurance $1,110; general expenses $2,300; total expenses $25,160. Profit for the year $9,400.",
              points: ["Correct heading with name, statement and period (1)", "Revenue $86,400 shown (1)", "Cost of sales deducted to give gross profit $34,560 (1)", "All five expenses listed under gross profit (1)", "Total expenses $25,160 (1)", "Profit for the year $9,400 (1)"],
            },
            {
              label: "b",
              marks: 4,
              prompt: "Layla says: I made a profit of $9,400, so my bank balance should have gone up by $9,400, but it has gone down by $2,900. Explain two reasons for the difference.",
              model:
                "The purchase of shop fittings for $6,000 was paid from the bank but is not an expense. Fittings are a non-current asset shown in the statement of financial position, so profit is unchanged while the bank falls. The drawings of $4,800 also came out of the bank, but drawings are the owner taking out capital and are never deducted in calculating profit. A third reason is that trade receivables rose by $1,500: those sales are in revenue but the cash has not yet arrived. Check: $9,400 less $6,000 less $4,800 less $1,500 equals a fall of $2,900.",
              points: ["Shop fittings $6,000 paid from bank but not an expense (1)", "Developed: fittings are a non-current asset in the statement of financial position (1)", "Drawings $4,800 reduce bank but are not deducted in calculating profit (1)", "Developed, or alternative: increase in trade receivables of $1,500 means revenue not yet received in cash (1)"],
            },
            {
              label: "c",
              marks: 4,
              prompt: "Distinguish between book-keeping and accounting, giving one example of each from Layla's business.",
              model:
                "Book-keeping is the systematic recording of transactions, for example recording each day's sales and the payment of rent in Layla's books. Accounting is the classifying, summarising and interpreting of those records to provide information for decisions, for example preparing the statement of profit or loss above and using it to decide whether the second shop is affordable.",
              points: ["Book-keeping defined as recording transactions systematically (1)", "Example from Layla, for example recording daily sales or the rent payment (1)", "Accounting defined as classifying, summarising and interpreting for decisions (1)", "Example from Layla, for example preparing the statement or using it to decide on the second shop (1)"],
            },
            {
              label: "d",
              marks: 6,
              prompt: "Explain three ways in which Layla's accounting records will help her and the bank to decide whether she should borrow $15,000 to open a second shop.",
              model:
                "First, the statement of profit or loss shows a profit for the year of $9,400. This tells Layla and the bank that the existing shop earns enough to make loan repayments possible, and it gives an idea of what a second shop might earn. Second, her records of expenses such as rent $7,200 and wages $12,600 give realistic figures for forecasting the costs of a second shop, so the loan request is based on evidence rather than hope. Third, the bank balance of only $1,200 and the trade receivables of $4,700 show the bank how much cash Layla has now and how much is still owed to her, so the bank can judge the risk of lending and Layla can see that she cannot fund the shop herself.",
              points: ["Profit for the year shows the business is successful (1)", "Developed: shows ability to repay the loan or estimate second shop earnings (1)", "Records of expenses allow realistic forecast of second shop costs (1)", "Developed: makes the loan application credible to the bank (1)", "Bank balance and receivables show cash available now (1)", "Developed: lets the bank judge risk and shows Layla she needs to borrow (1)"],
            },
          ],
        },
        {
          id: "sq-1.1-2",
          title: "Omar's Repair Workshop: two years compared",
          stimulus:
            "Omar runs a motorcycle repair workshop. His assistant, Nour, keeps the books and an accountant visits once a year. Results for the two years ended 31 December: 2025: revenue from repairs $48,000; parts used $14,400; wages of assistant $12,000; rent $6,000; other expenses $3,600. 2026: revenue from repairs $57,600; parts used $20,160; wages of assistant $13,200; rent $6,600; other expenses $4,680. Omar prepares only a statement of profit or loss each year. The following tasks were carried out during 2026: (1) Nour recorded each customer's payment in the cash book; (2) the accountant explained to Omar why his profit percentage had changed; (3) Nour entered the supplier's invoices for parts in the purchases journal; (4) the accountant prepared the statement of profit or loss; (5) Nour balanced the ledger accounts at the end of each month.",
          parts: [
            {
              label: "a",
              marks: 5,
              prompt: "State whether each of tasks (1) to (5) is book-keeping or accounting.",
              model:
                "(1) Book-keeping: recording receipts. (2) Accounting: interpreting results for the owner. (3) Book-keeping: recording invoices in a book of prime entry. (4) Accounting: summarising the records into a financial statement. (5) Book-keeping: keeping the ledger in order.",
              points: ["(1) book-keeping (1)", "(2) accounting (1)", "(3) book-keeping (1)", "(4) accounting (1)", "(5) book-keeping (1)"],
            },
            {
              label: "b",
              marks: 6,
              prompt: "Calculate for each year the total expenses, the profit for the year, and the profit for the year as a percentage of revenue.",
              model:
                "2025: total expenses $14,400 plus $12,000 plus $6,000 plus $3,600 equals $36,000; profit for the year $48,000 less $36,000 equals $12,000; percentage $12,000 divided by $48,000 equals 25%. 2026: total expenses $20,160 plus $13,200 plus $6,600 plus $4,680 equals $44,640; profit for the year $57,600 less $44,640 equals $12,960; percentage $12,960 divided by $57,600 equals 22.5%.",
              points: ["Total expenses 2025 $36,000 (1)", "Profit for the year 2025 $12,000 (1)", "Percentage 2025 25% (1)", "Total expenses 2026 $44,640 (1)", "Profit for the year 2026 $12,960 (1)", "Percentage 2026 22.5% (1)"],
            },
            {
              label: "c",
              marks: 5,
              prompt: "Using your answer to (b) and the figures in the question, comment on the performance of the workshop in 2026 compared with 2025. Suggest one action Omar could take.",
              model:
                "Revenue rose by $9,600, which is 20%, and profit for the year rose by $960. However, the profit percentage fell from 25% to 22.5%, so each dollar of revenue earned less profit. The main reason is the cost of parts, which rose from 30% of revenue in 2025 ($14,400 of $48,000) to 35% in 2026 ($20,160 of $57,600). Wages and rent rose roughly in line with revenue. Omar could look for a cheaper supplier of parts, or charge customers more for the parts he fits, so that the parts cost returns to about 30% of revenue.",
              points: ["Revenue increased by $9,600 or 20% (1)", "Profit increased in money terms by $960 (1)", "Profit percentage fell from 25% to 22.5% (1)", "Reason: parts cost rose from 30% to 35% of revenue (1)", "Sensible action, for example cheaper supplier or charge more for parts (1)"],
            },
            {
              label: "d",
              marks: 4,
              prompt: "Omar prepares only a statement of profit or loss. Explain two reasons why he should also prepare a statement of financial position.",
              model:
                "A statement of financial position would show Omar the assets he owns, such as tools, parts in stock and his bank balance, and the liabilities he owes, such as amounts due to suppliers. This tells him whether he can pay his debts when they fall due, which profit alone does not show. It would also show his capital and how it has changed through profit and drawings, so he can see whether he is taking out more than the business earns. A bank or supplier would also expect to see it before lending or giving credit.",
              points: ["Shows assets and liabilities at a date (1)", "Developed: shows whether debts can be paid, which profit alone does not show (1)", "Shows capital and the effect of profit and drawings on it (1)", "Developed: warns if drawings exceed profit, or needed by lenders and suppliers (1)"],
            },
          ],
        },
      ],
    },
    {
      section: "1.2",
      title: "The accounting equation",
      summary:
        "Everything a business owns (assets) was paid for either by the owner (capital) or by outsiders (liabilities), so assets always equal capital plus liabilities. Every transaction changes at least two items and leaves the equation balanced. The statement of financial position is this equation written out at one date, and capital changes only through capital introduced, profit or loss, and drawings.",
      objectives: [
        "Define assets, liabilities and capital and give examples of each.",
        "Distinguish non-current assets from current assets, and non-current liabilities from current liabilities.",
        "State the accounting equation and rearrange it to find a missing figure.",
        "Show the effect of a series of transactions on assets, liabilities and capital.",
        "Calculate closing capital from opening capital, capital introduced, profit or loss and drawings, and work backwards to find profit.",
        "Prepare a simple statement of financial position and explain why it balances.",
        "Apply the business entity principle to decide what belongs to the business.",
      ],
      keyTerms: [
        { term: "Asset", definition: "Something of value owned or controlled by the business from which future benefit is expected, such as premises, inventory or money in the bank." },
        { term: "Non-current asset", definition: "An asset bought to be kept and used in the business for more than one year, not for resale, such as machinery or a motor vehicle." },
        { term: "Current asset", definition: "Cash, or an asset expected to be turned into cash within one year, such as inventory, trade receivables and bank." },
        { term: "Liability", definition: "An amount owed by the business to a person or organisation outside the business." },
        { term: "Current liability", definition: "A liability due to be paid within one year, such as trade payables or a bank overdraft." },
        { term: "Non-current liability", definition: "A liability not due to be paid within one year, such as a bank loan repayable in three years." },
        { term: "Capital", definition: "The amount the business owes to its owner, equal to assets less liabilities; also called owner's equity or net assets." },
        { term: "Drawings", definition: "Resources, usually cash or goods, taken out of the business by the owner for personal use, which reduce capital." },
        { term: "Trade receivables", definition: "Amounts owed to the business by customers who have bought goods or services on credit." },
        { term: "Trade payables", definition: "Amounts owed by the business to suppliers from whom it has bought goods or services on credit." },
        { term: "Accounting equation", definition: "The rule that assets equal capital plus liabilities at every moment in the life of a business." },
        { term: "Business entity", definition: "The principle that the business is treated as separate from its owner, so only business assets, liabilities and transactions are recorded." },
      ],
      notes: [
        {
          heading: "Assets: what the business owns or controls",
          body:
            "An asset is something of value that the business owns or controls and expects to benefit from in the future. Assets fall into two groups. Non-current assets are bought to be kept and used for more than one year, for example premises, machinery, fixtures and motor vehicles. They are not bought to be resold. Current assets are cash or items expected to turn into cash within one year, for example inventory, trade receivables, bank and cash in hand.\n\nTrade receivables are the amounts owed to the business by customers who bought on credit. They are assets because the business has the right to receive that money. Inventory is goods bought for resale that are still unsold at the date in question.\n\nIn a statement of financial position, non-current assets are listed first, usually the most permanent first. Current assets follow, in order from the least liquid to the most liquid: inventory, trade receivables, bank, cash.",
          table: {
            head: ["Item", "Type of asset", "Why"],
            rows: [
              ["Shop premises", "Non-current", "Kept and used for many years"],
              ["Delivery van", "Non-current", "Used in the business, not bought for resale"],
              ["Inventory", "Current", "Expected to be sold within the year"],
              ["Trade receivables", "Current", "Customers are expected to pay within weeks"],
              ["Bank balance", "Current", "Already in money form"],
            ],
          },
        },
        {
          heading: "Liabilities: what the business owes",
          body:
            "A liability is an amount the business owes to someone outside the business. It is a claim against the assets. Current liabilities must be paid within one year, for example trade payables (suppliers who sold goods to the business on credit), a bank overdraft and other short-term amounts owing. Non-current liabilities are not due within one year, for example a bank loan repayable in three years or a mortgage on the premises.\n\nA bank overdraft needs care. When the business has money in the bank, the bank balance is an asset. When the business has spent more than it had and the bank has allowed the account to fall below zero, the overdraft is a liability. The same account can be either, depending on which way the balance points. In the exam, read the words before the figure: bank $1,200 is a current asset; bank overdraft $1,200 is a current liability.",
        },
        {
          heading: "Capital: the owner's claim",
          body:
            "Capital is the amount the business owes to its owner. This sounds strange at first. The key idea is the business entity principle: for accounting purposes the business is treated as separate from the person who owns it. When Hana pays $10,000 of her savings into her shop's bank account, the shop has an asset of $10,000 in the bank and it owes Hana $10,000. That amount owed to the owner is called capital.\n\nCapital changes in only four ways. It increases when the owner puts in more resources (capital introduced) and when the business makes a profit, because profit belongs to the owner. It decreases when the owner takes resources out for personal use (drawings) and when the business makes a loss. Day-to-day transactions such as paying a supplier or buying a van do not change capital at all; they only move value between assets and liabilities.\n\nBecause capital equals assets less liabilities, it is sometimes called net assets or owner's equity. All three names mean the same figure.",
        },
        {
          heading: "The equation and its three forms",
          body:
            "The accounting equation states that assets equal capital plus liabilities. Everything the business owns was paid for either by the owner (capital) or by outsiders (liabilities). There is no third source of finance, which is why the two sides must always be equal.\n\nThe equation can be rearranged to find whichever figure is missing. If you know assets and liabilities, capital is assets less liabilities. If you know capital and liabilities, assets are the two added together. If you know assets and capital, liabilities are assets less capital. Learn the first form and the other two follow by simple algebra.\n\nFor example, a business with assets of $41,000 and liabilities of $9,500 has capital of $31,500. If a year later its assets are $44,000 and its capital is $33,200, its liabilities must be $10,800. Always write down the form of the equation you are using before you put the numbers in; the method mark depends on it.",
          table: {
            head: ["Known figures", "Missing figure", "Formula"],
            rows: [
              ["Assets and liabilities", "Capital", "Capital = Assets less Liabilities"],
              ["Capital and liabilities", "Assets", "Assets = Capital plus Liabilities"],
              ["Assets and capital", "Liabilities", "Liabilities = Assets less Capital"],
            ],
          },
        },
        {
          heading: "Every transaction keeps the equation balanced",
          body:
            "A transaction always changes at least two things, and after the change the equation still balances. This is the principle of duality, and it is the reason double entry works. There are only a few patterns to learn.\n\nSometimes one asset goes up and another goes down by the same amount, so total assets do not change: buying a computer for cash, or a customer paying what they owe. Sometimes an asset and a liability rise together: buying goods on credit, or receiving a loan. Sometimes an asset and a liability fall together: paying a supplier, or repaying a loan. Sometimes an asset and capital move together: the owner introducing cash, the owner taking drawings, or the business earning income or paying an expense.\n\nIncome increases capital because it increases profit, which belongs to the owner. Expenses decrease capital for the same reason. When you analyse a transaction, name the two items, say whether each goes up or down, and check that the equation still holds.",
          table: {
            head: ["Transaction", "Assets", "Liabilities", "Capital"],
            rows: [
              ["Owner pays $5,000 into the business bank account", "Bank up $5,000", "No change", "Up $5,000"],
              ["Buy a van for $3,000 by cheque", "Van up $3,000, bank down $3,000", "No change", "No change"],
              ["Buy goods for $800 on credit", "Inventory up $800", "Trade payables up $800", "No change"],
              ["Pay a supplier $500", "Bank down $500", "Trade payables down $500", "No change"],
              ["Pay rent $200", "Bank down $200", "No change", "Down $200 (expense)"],
              ["Owner takes $150 cash for own use", "Cash down $150", "No change", "Down $150 (drawings)"],
            ],
          },
        },
        {
          heading: "The statement of financial position",
          body:
            "The statement of financial position is the accounting equation written out in full at one date. It lists the assets, non-current first and then current. It then lists capital, followed by non-current liabilities and then current liabilities. The total of assets must equal the total of capital and liabilities because they are the two sides of the same equation.\n\nThe capital section usually shows how capital has moved during the year: opening capital, plus capital introduced, plus profit for the year (or less a loss), less drawings, giving closing capital. This small calculation links the statement of financial position to the statement of profit or loss, because the profit figure comes from there.\n\nIf the two totals do not agree, something has been left out or put in the wrong place. Do not force a balance by inventing a figure. Go back, re-add each section, and check that every item is an asset, a liability or part of capital.",
        },
        {
          heading: "Finding profit from the change in capital",
          body:
            "Because capital only changes through capital introduced, profit or loss, and drawings, you can work backwards. If you know the capital at the start and at the end of a year, together with the drawings and any capital introduced, the profit is the only unknown. Profit equals closing capital less opening capital, plus drawings, less capital introduced.\n\nSuppose capital was $15,000 at the start of the year and $17,400 at the end, drawings were $6,200 and no capital was introduced. The capital rose by $2,400 even though the owner took out $6,200, so the business must have earned $2,400 plus $6,200, which is $8,600. If the answer comes out negative, the business made a loss.\n\nThis method is used again in Topic 5 for incomplete records, so learn it well now. Set out the working line by line and label each line. A bare figure earns little if it is wrong, but labelled working can earn method marks even when one number slips.",
        },
      ],
      workedExamples: [
        {
          title: "Finding the capital of a tailoring business",
          scenario:
            "On 31 March 2026 Hana's tailoring business had the following: sewing machines $7,400; inventory of cloth $2,150; trade receivables $980; bank $1,620; trade payables $1,340; loan from her brother, repayable in 2028, $3,000. Calculate Hana's capital at 31 March 2026.",
          steps: [
            "Step 1: Sort the items. Assets: sewing machines, inventory, trade receivables, bank. Liabilities: trade payables, loan from brother. The loan is a liability even though it comes from a family member, because the business owes it to someone who is not the owner.",
            "Step 2: Add the assets. $7,400 plus $2,150 equals $9,550. Add $980 to get $10,530. Add $1,620 to get total assets $12,150.",
            "Step 3: Add the liabilities. $1,340 plus $3,000 equals total liabilities $4,340.",
            "Step 4: Apply the equation. Capital equals assets less liabilities: $12,150 less $4,340 equals $7,810.",
            "Step 5: Check. Capital $7,810 plus liabilities $4,340 equals $12,150, which matches total assets.",
          ],
          answer: "Total assets $12,150; total liabilities $4,340; capital $7,810.",
        },
        {
          title: "Tracking the equation through five transactions",
          scenario:
            "Tariq started a business on 1 May 2026 by paying $20,000 into a business bank account. During May: (1) he bought a delivery van for $8,500 by cheque; (2) he bought goods on credit from Zaki for $2,700; (3) he received a bank loan of $5,000, paid into the bank; (4) he paid Zaki $1,000 by cheque; (5) he took $400 from the bank for personal use. Show the totals of assets, liabilities and capital after each transaction.",
          steps: [
            "Start: assets are bank $20,000; liabilities nil; capital $20,000. The equation is $20,000 equals $0 plus $20,000.",
            "After (1): bank falls to $11,500 and a van of $8,500 appears. Total assets still $20,000 because one asset was exchanged for another. Liabilities nil, capital $20,000.",
            "After (2): inventory $2,700 appears and trade payables $2,700 appear. Total assets $22,700; liabilities $2,700; capital $20,000. Check: $2,700 plus $20,000 equals $22,700.",
            "After (3): bank rises to $16,500 and a loan of $5,000 appears. Total assets $27,700; liabilities $7,700; capital $20,000. Check: $7,700 plus $20,000 equals $27,700.",
            "After (4): bank falls to $15,500 and trade payables fall to $1,700. Total assets $26,700; liabilities $6,700 ($1,700 plus $5,000); capital $20,000. Check: $6,700 plus $20,000 equals $26,700.",
            "After (5): bank falls to $15,100 and capital falls to $19,600 because of drawings. Total assets $26,300; liabilities $6,700; capital $19,600. Check: $6,700 plus $19,600 equals $26,300.",
          ],
          answer: "At 31 May 2026: assets $26,300 (bank $15,100, van $8,500, inventory $2,700); liabilities $6,700 (trade payables $1,700, loan $5,000); capital $19,600.",
        },
        {
          title: "Closing capital and a missing liabilities figure",
          scenario:
            "Mona's capital on 1 January 2026 was $31,500. During the year the business made a profit of $12,800, Mona took drawings of $9,300 and she brought her own car, valued at $6,000, into the business for deliveries. At 31 December 2026 the total assets of the business were $56,400. Calculate Mona's capital at 31 December 2026 and her total liabilities at that date.",
          steps: [
            "Step 1: Start with opening capital $31,500.",
            "Step 2: Add capital introduced. The car brought into the business is capital introduced even though no cash changed hands. $31,500 plus $6,000 equals $37,500.",
            "Step 3: Add profit for the year. $37,500 plus $12,800 equals $50,300.",
            "Step 4: Deduct drawings. $50,300 less $9,300 equals closing capital $41,000.",
            "Step 5: Find liabilities with the equation. Liabilities equal assets less capital: $56,400 less $41,000 equals $15,400.",
            "Step 6: Check. Capital $41,000 plus liabilities $15,400 equals $56,400, which matches total assets.",
          ],
          answer: "Closing capital $41,000; total liabilities $15,400.",
        },
        {
          title: "Preparing a simple statement of financial position",
          scenario:
            "Youssef's business had the following at 30 September 2026: premises $45,000; fixtures $6,800; inventory $5,300; trade receivables $2,450; bank $1,900; cash $150; trade payables $3,600; bank loan repayable in 2029 $12,000. Prepare his statement of financial position at 30 September 2026, showing capital as the balancing figure.",
          steps: [
            "Step 1: Heading. Youssef, Statement of financial position at 30 September 2026.",
            "Step 2: Non-current assets, most permanent first: premises $45,000, fixtures $6,800, total $51,800.",
            "Step 3: Current assets, least liquid first: inventory $5,300, trade receivables $2,450, bank $1,900, cash $150, total $9,800.",
            "Step 4: Total assets: $51,800 plus $9,800 equals $61,600.",
            "Step 5: Liabilities. Non-current liability: bank loan $12,000. Current liability: trade payables $3,600. Total liabilities $15,600.",
            "Step 6: Capital is the balancing figure: $61,600 less $15,600 equals $46,000.",
            "Step 7: Present the second half: capital $46,000, non-current liabilities $12,000, current liabilities $3,600, total $61,600. The two totals agree.",
          ],
          answer: "Total assets $61,600; capital $46,000; non-current liabilities $12,000; current liabilities $3,600; total capital and liabilities $61,600.",
        },
      ],
      commonErrors: [
        { error: "Including the owner's private house, car or savings among the business assets.", fix: "Apply the business entity principle. Only items owned by the business are recorded. Private items appear only if the owner formally brings them into the business as capital introduced." },
        { error: "Treating drawings as an expense, or as a liability, instead of a reduction of capital.", fix: "Drawings are the owner taking back part of the capital. Deduct them from capital in the statement of financial position, never in the statement of profit or loss." },
        { error: "Thinking capital is the same as the money in the bank.", fix: "Capital is assets less liabilities. A business can have capital of $40,000 and only $500 in the bank if most of its value is in premises and inventory." },
        { error: "Recording a purchase on credit as an increase in assets only.", fix: "Buying on credit increases an asset (inventory or equipment) and increases a liability (trade payables) by the same amount. Two items always change." },
        { error: "Adding a loan to capital because both are money put into the business.", fix: "A loan is owed to an outsider and must be repaid, so it is a liability. Capital is owed to the owner. Keep them in separate sections." },
        { error: "Forcing the statement of financial position to balance by changing a figure.", fix: "If the totals differ, re-add each section and check that every item is on the correct side. The most common causes are a missed item, a bank overdraft shown as an asset, or drawings added instead of deducted." },
      ],
      examTips: [
        "Write the form of the equation you are using before the numbers, for example Capital equals Assets less Liabilities. If your arithmetic slips, the method mark can still be earned.",
        "For effect-of-transaction questions, give three things for each transaction: the item, the direction (increase or decrease) and the amount. Increase in assets alone is not enough.",
        "In a statement of financial position, keep the order: non-current assets, current assets, then capital, non-current liabilities, current liabilities. Marks are often given for correct classification as well as correct figures.",
        "Always label a bank overdraft as a current liability and never net it off against cash in hand.",
        "When you calculate closing capital, show the four lines: opening capital, add capital introduced, add profit (or less loss), less drawings. Each line can carry a mark.",
        "Read whether a question asks for capital at a date or profit for the year. Students often give the closing capital when the question asked for the profit that produced it.",
      ],
      exercises: [
        {
          id: "ex-1.2-1",
          type: "calculation",
          marks: 2,
          prompt: "A business has total assets of $37,600 and total liabilities of $9,250. Calculate the capital.",
          model: "Capital equals assets less liabilities: $37,600 less $9,250 equals $28,350.",
          points: ["Correct formula, capital equals assets less liabilities (1)", "Capital $28,350 (1)"],
        },
        {
          id: "ex-1.2-2",
          type: "calculation",
          marks: 2,
          prompt: "A business has capital of $22,400 and liabilities of $6,900. Calculate the total assets.",
          model: "Assets equal capital plus liabilities: $22,400 plus $6,900 equals $29,300.",
          points: ["Correct formula, assets equal capital plus liabilities (1)", "Total assets $29,300 (1)"],
        },
        {
          id: "ex-1.2-3",
          type: "calculation",
          marks: 3,
          prompt: "Dalia's business has the following items: equipment $4,200; inventory $1,850; bank $730; trade receivables $640; trade payables $1,120; loan from a friend $2,000. Calculate total assets, total liabilities and capital.",
          model: "Assets: $4,200 plus $1,850 plus $730 plus $640 equals $7,420. Liabilities: $1,120 plus $2,000 equals $3,120. Capital equals $7,420 less $3,120 equals $4,300.",
          points: ["Total assets $7,420 (1)", "Total liabilities $3,120 (1)", "Capital $4,300 (1)"],
        },
        {
          id: "ex-1.2-4",
          type: "entries",
          marks: 4,
          prompt: "State the effect of each of the following transactions on assets, liabilities and capital, giving the item, the direction and the amount: (a) bought machinery for $3,000 by cheque; (b) received a loan of $2,500 which was paid into the bank; (c) paid a trade payable $900 by cheque; (d) the owner took goods costing $150 for personal use.",
          model: "(a) Machinery (asset) increases by $3,000 and bank (asset) decreases by $3,000; liabilities and capital unchanged. (b) Bank (asset) increases by $2,500 and loan (liability) increases by $2,500; capital unchanged. (c) Bank (asset) decreases by $900 and trade payables (liability) decrease by $900; capital unchanged. (d) Inventory (asset) decreases by $150 and capital decreases by $150 because of drawings; liabilities unchanged.",
          points: ["(a) machinery up $3,000, bank down $3,000 (1)", "(b) bank up $2,500, loan up $2,500 (1)", "(c) bank down $900, trade payables down $900 (1)", "(d) inventory down $150, capital down $150 (1)"],
        },
        {
          id: "ex-1.2-5",
          type: "calculation",
          marks: 4,
          prompt: "Ola's capital on 1 January 2026 was $18,200. During the year the business made a profit of $6,450, Ola took drawings of $5,100 and she paid an extra $2,000 of her own money into the business bank account. Calculate her capital at 31 December 2026.",
          model: "Opening capital $18,200. Add capital introduced $2,000 gives $20,200. Add profit for the year $6,450 gives $26,650. Less drawings $5,100 gives closing capital $21,550.",
          points: ["Capital introduced $2,000 added (1)", "Profit $6,450 added (1)", "Drawings $5,100 deducted (1)", "Closing capital $21,550 (1)"],
        },
        {
          id: "ex-1.2-6",
          type: "calculation",
          marks: 5,
          prompt: "Walid's capital was $26,700 on 1 January 2026 and $30,100 on 31 December 2026. His drawings during the year were $8,400. (a) Calculate his profit for the year assuming no capital was introduced. (b) Calculate the profit if, in addition, Walid had introduced $3,000 of capital during the year.",
          model: "(a) Increase in capital: $30,100 less $26,700 equals $3,400. Add back drawings $8,400: profit for the year equals $11,800. Check: $26,700 plus $11,800 less $8,400 equals $30,100. (b) The $3,000 introduced explains part of the increase, so it must be deducted: $11,800 less $3,000 equals profit of $8,800. Check: $26,700 plus $3,000 plus $8,800 less $8,400 equals $30,100.",
          points: ["Increase in capital $3,400 (1)", "Drawings $8,400 added back (1)", "Profit (a) $11,800 (1)", "Capital introduced $3,000 deducted (1)", "Profit (b) $8,800 (1)"],
        },
        {
          id: "ex-1.2-7",
          type: "explain",
          marks: 5,
          prompt: "Explain what is meant by capital. State two things that increase capital and two things that decrease it.",
          model: "Capital is the amount the business owes to its owner. It equals the assets of the business less its liabilities, and it represents the owner's investment in the business. Capital is increased by capital introduced (more resources put in by the owner) and by profit for the year. It is decreased by drawings (resources taken out by the owner) and by a loss for the year.",
          points: ["Capital is the owner's investment, or the amount owed by the business to the owner, equal to assets less liabilities (1)", "Increased by capital introduced (1)", "Increased by profit (1)", "Decreased by drawings (1)", "Decreased by a loss (1)"],
        },
        {
          id: "ex-1.2-8",
          type: "entries",
          marks: 6,
          prompt: "Rania started a business with $12,000 in the bank and a motor vehicle worth $9,000. She then carried out these transactions: (1) bought goods on credit for $3,400; (2) paid rent $600 by cheque; (3) sold goods that had cost $1,200 for $1,900 cash, banked; (4) paid a supplier $2,000 by cheque; (5) received a bank loan of $4,000 into the bank; (6) took $500 from the bank for personal use. Show total assets, total liabilities and capital after each transaction.",
          model: "Start: assets $21,000 (bank $12,000, vehicle $9,000); liabilities $0; capital $21,000. After (1): inventory $3,400 added; assets $24,400; liabilities $3,400; capital $21,000. After (2): bank $11,400; assets $23,800; liabilities $3,400; capital $20,400 (rent is an expense, which reduces capital). After (3): inventory $2,200, bank $13,300; assets $24,500; liabilities $3,400; capital $21,100 (profit of $700 increases capital). After (4): bank $11,300; assets $22,500; liabilities $1,400; capital $21,100. After (5): bank $15,300; assets $26,500; liabilities $5,400; capital $21,100. After (6): bank $14,800; assets $26,000; liabilities $5,400; capital $20,600. Each line balances: for example $5,400 plus $20,600 equals $26,000.",
          points: ["After (1): assets $24,400, liabilities $3,400, capital $21,000 (1)", "After (2): assets $23,800, liabilities $3,400, capital $20,400 (1)", "After (3): assets $24,500, liabilities $3,400, capital $21,100 (1)", "After (4): assets $22,500, liabilities $1,400, capital $21,100 (1)", "After (5): assets $26,500, liabilities $5,400, capital $21,100 (1)", "After (6): assets $26,000, liabilities $5,400, capital $20,600 (1)"],
        },
        {
          id: "ex-1.2-9",
          type: "statement",
          marks: 8,
          prompt: "Hassan provided the following information at 31 December 2026: fixtures $8,200; motor van $11,500; inventory $6,350; trade receivables $3,480; bank overdraft $1,270; cash $220; trade payables $4,910; bank loan repayable in 2030 $7,500; capital at 1 January 2026 $13,000; profit for the year $9,870; drawings $6,800. Prepare Hassan's statement of financial position at 31 December 2026.",
          model: "Hassan, Statement of financial position at 31 December 2026. Non-current assets: fixtures $8,200; motor van $11,500; total $19,700. Current assets: inventory $6,350; trade receivables $3,480; cash $220; total $10,050. Total assets $29,750. Capital: opening capital $13,000; add profit for the year $9,870 gives $22,870; less drawings $6,800 gives closing capital $16,070. Non-current liabilities: bank loan $7,500. Current liabilities: trade payables $4,910; bank overdraft $1,270; total $6,180. Total capital and liabilities: $16,070 plus $7,500 plus $6,180 equals $29,750.",
          points: ["Heading with name and at 31 December 2026 (1)", "Non-current assets listed and totalled $19,700 (1)", "Current assets in order, total $10,050 (1)", "Total assets $29,750 (1)", "Opening capital plus profit $22,870 (1)", "Less drawings giving closing capital $16,070 (1)", "Bank loan $7,500 shown as non-current liability (1)", "Current liabilities including overdraft $6,180, totals agree at $29,750 (1)"],
        },
        {
          id: "ex-1.2-10",
          type: "calculation",
          marks: 10,
          prompt: "Farida does not keep full accounting records. On 1 January 2026 her business had: equipment $9,600; inventory $4,100; trade receivables $2,300; bank $1,750; trade payables $2,850; loan $4,000. On 31 December 2026 it had: equipment $8,900; inventory $4,900; trade receivables $3,150; bank $2,600; trade payables $3,200; loan $2,000. During the year Farida took drawings of $7,200 and introduced $1,500 of additional capital. Calculate (a) her capital at 1 January 2026, (b) her capital at 31 December 2026 and (c) her profit for the year.",
          model: "(a) Opening assets: $9,600 plus $4,100 plus $2,300 plus $1,750 equals $17,750. Opening liabilities: $2,850 plus $4,000 equals $6,850. Opening capital: $17,750 less $6,850 equals $10,900. (b) Closing assets: $8,900 plus $4,900 plus $3,150 plus $2,600 equals $19,550. Closing liabilities: $3,200 plus $2,000 equals $5,200. Closing capital: $19,550 less $5,200 equals $14,350. (c) Increase in capital: $14,350 less $10,900 equals $3,450. Add drawings $7,200 gives $10,650. Less capital introduced $1,500 gives profit for the year $9,150. Check: $10,900 plus $1,500 plus $9,150 less $7,200 equals $14,350.",
          points: ["Opening assets $17,750 (1)", "Opening liabilities $6,850 (1)", "Opening capital $10,900 (1)", "Closing assets $19,550 (1)", "Closing liabilities $5,200 (1)", "Closing capital $14,350 (1)", "Increase in capital $3,450 (1)", "Drawings $7,200 added (1)", "Capital introduced $1,500 deducted (1)", "Profit for the year $9,150 (1)"],
        },
      ],
      mcq: [
        {
          id: "mcq-1.2-1",
          question: "A business has assets of $52,300 and liabilities of $17,800. What is its capital?",
          choices: ["$34,500", "$70,100", "$17,800", "$35,500"],
          explanation: "Capital equals assets less liabilities: $52,300 less $17,800 equals $34,500. $70,100 adds the two figures, $17,800 is the liabilities, and $35,500 is an arithmetic slip.",
        },
        {
          id: "mcq-1.2-2",
          question: "Which of the following is a liability of a business?",
          choices: ["Bank overdraft", "Trade receivables", "Inventory", "Cash in hand"],
          explanation: "A bank overdraft is money the business owes to the bank, so it is a current liability. Trade receivables, inventory and cash are all current assets.",
        },
        {
          id: "mcq-1.2-3",
          question: "A business pays a trade payable $800 by cheque. What is the effect on the accounting equation?",
          choices: ["Assets decrease $800 and liabilities decrease $800", "Assets decrease $800 and capital decreases $800", "Liabilities decrease $800 and capital increases $800", "Assets are unchanged and liabilities decrease $800"],
          explanation: "Bank (an asset) falls by $800 and trade payables (a liability) fall by $800. Capital is not involved because paying a debt is not an expense and does not involve the owner.",
        },
        {
          id: "mcq-1.2-4",
          question: "A business buys a machine on credit for $4,000. What is the effect?",
          choices: ["Assets increase $4,000 and liabilities increase $4,000", "Assets increase $4,000 and capital increases $4,000", "One asset increases and another asset decreases by $4,000", "Assets are unchanged and liabilities increase $4,000"],
          explanation: "The machine is a new asset and the amount owed to the supplier is a new liability. Nothing has yet been paid, so bank does not change, and the owner has not put anything in, so capital does not change.",
        },
        {
          id: "mcq-1.2-5",
          question: "Which transaction changes the capital of a business?",
          choices: ["The owner takes goods from inventory for personal use", "Goods are bought for cash", "A credit customer pays the amount owed", "A bank loan is repaid"],
          explanation: "Taking goods for personal use is drawings, which reduces capital. The other three transactions only move value between assets, or between an asset and a liability, leaving capital unchanged.",
        },
        {
          id: "mcq-1.2-6",
          question: "Opening capital was $14,000, profit for the year was $5,200 and drawings were $3,900. What was the closing capital?",
          choices: ["$15,300", "$23,100", "$12,700", "$1,300"],
          explanation: "Closing capital equals $14,000 plus $5,200 less $3,900 equals $15,300. $23,100 adds the drawings instead of deducting them; $12,700 deducts the profit and adds the drawings; $1,300 is only profit less drawings.",
        },
        {
          id: "mcq-1.2-7",
          question: "Which of the following is a current asset?",
          choices: ["Trade receivables", "Trade payables", "Motor vehicle", "Bank loan repayable in 2029"],
          explanation: "Trade receivables are amounts customers will pay within a short time, so they are a current asset. Trade payables and the loan are liabilities, and a motor vehicle is a non-current asset.",
        },
        {
          id: "mcq-1.2-8",
          question: "A business owns a van that cost $9,000. The owner also has a private car worth $15,000. What total for vehicles should appear in the business statement of financial position?",
          choices: ["$9,000", "$24,000", "$15,000", "$6,000"],
          explanation: "The business entity principle says that only the assets of the business are recorded. The private car belongs to the owner, not the business, so only the $9,000 van is shown.",
        },
        {
          id: "mcq-1.2-9",
          question: "A business receives a bank loan of $5,000 which is paid into its bank account. What is the effect on capital?",
          choices: ["No change", "Increases by $5,000", "Decreases by $5,000", "Increases by $10,000"],
          explanation: "A loan increases the asset bank and increases the liability loan. It is money owed to an outsider, not owed to the owner, so capital is unchanged.",
        },
        {
          id: "mcq-1.2-10",
          question: "Capital was $20,000 on 1 January and $24,500 on 31 December. Drawings for the year were $6,000 and no capital was introduced. What was the profit for the year?",
          choices: ["$10,500", "$4,500", "$1,500", "$30,500"],
          explanation: "Profit equals the increase in capital plus drawings: $4,500 plus $6,000 equals $10,500. $4,500 ignores the drawings; $1,500 deducts the drawings instead of adding them; $30,500 adds drawings to closing capital.",
        },
      ],
      structured: [
        {
          id: "sq-1.2-1",
          title: "Bassem's Bicycle Shop: the first month",
          stimulus:
            "Bassem opened a bicycle shop on 1 April 2026. On that day he paid $25,000 into a business bank account and brought in tools worth $3,000. The following transactions took place in April 2026. 2 April: bought shop premises for $18,000, paid by cheque. 5 April: bought bicycles for resale on credit from Wheels Ltd for $6,400. 9 April: received a loan of $8,000 from Nile Bank, repayable in 2029, paid into the business bank account. 14 April: sold bicycles that had cost $2,500 for $3,800; the money was paid into the bank. 20 April: paid Wheels Ltd $4,000 by cheque. 27 April: took $600 from the business bank account for personal use.",
          parts: [
            {
              label: "a",
              marks: 3,
              prompt: "Calculate Bassem's capital on 1 April 2026, showing the equation you have used.",
              model: "Assets on 1 April: bank $25,000 plus tools $3,000 equals $28,000. Liabilities: nil. Capital equals assets less liabilities: $28,000 less $0 equals $28,000.",
              points: ["Assets bank $25,000 plus tools $3,000 equals $28,000 (1)", "Liabilities nil, equation stated (1)", "Capital $28,000 (1)"],
            },
            {
              label: "b",
              marks: 8,
              prompt: "Show the effect of each transaction in April on total assets, total liabilities and capital, giving the totals after each transaction.",
              model:
                "1 April: assets $28,000; liabilities $0; capital $28,000. 2 April: bank falls to $7,000, premises $18,000 added; assets $28,000; liabilities $0; capital $28,000. 5 April: inventory $6,400 added, trade payables $6,400; assets $34,400; liabilities $6,400; capital $28,000. 9 April: bank $15,000, loan $8,000; assets $42,400; liabilities $14,400; capital $28,000. 14 April: inventory falls to $3,900, bank rises to $18,800; assets $43,700; liabilities $14,400; capital $29,300 (profit of $1,300 added). 20 April: bank $14,800, trade payables $2,400; assets $39,700; liabilities $10,400; capital $29,300. 27 April: bank $14,200; assets $39,100; liabilities $10,400; capital $28,700 (drawings $600 deducted). Every line balances, for example $10,400 plus $28,700 equals $39,100.",
              points: ["2 April: assets unchanged at $28,000, one asset exchanged for another (1)", "5 April: assets $34,400, liabilities $6,400 (1)", "9 April: assets $42,400, liabilities $14,400 (1)", "14 April: profit $1,300 increases capital to $29,300 (1)", "14 April: assets $43,700 with inventory $3,900 and bank $18,800 (1)", "20 April: assets $39,700, liabilities $10,400 (1)", "27 April: drawings reduce capital to $28,700 and assets to $39,100 (1)", "Equation shown to balance after each transaction (1)"],
            },
            {
              label: "c",
              marks: 5,
              prompt: "Prepare the statement of financial position of Bassem's Bicycle Shop at 30 April 2026.",
              model:
                "Bassem's Bicycle Shop, Statement of financial position at 30 April 2026. Non-current assets: premises $18,000; tools $3,000; total $21,000. Current assets: inventory $3,900; bank $14,200; total $18,100. Total assets $39,100. Capital: opening capital $28,000; add profit $1,300; less drawings $600; closing capital $28,700. Non-current liabilities: loan from Nile Bank $8,000. Current liabilities: trade payables (Wheels Ltd) $2,400. Total capital and liabilities $39,100.",
              points: ["Non-current assets premises and tools $21,000 (1)", "Current assets inventory $3,900 and bank $14,200, total assets $39,100 (1)", "Capital section: $28,000 plus $1,300 less $600 equals $28,700 (1)", "Loan $8,000 as non-current liability and trade payables $2,400 as current liability (1)", "Totals agree at $39,100 with correct heading (1)"],
            },
            {
              label: "d",
              marks: 4,
              prompt: "Explain why the loan from Nile Bank is not part of Bassem's capital, and why his drawings reduce his capital.",
              model:
                "The loan is money owed to an outsider, the bank, and it must be repaid in 2029. Capital is the amount owed to the owner, so under the business entity principle the loan is a liability and is shown separately from capital. Drawings are resources that Bassem has taken out of the business for his own use. Because capital measures what the business owes its owner, taking money out reduces that amount. Drawings are not an expense, so they reduce capital directly rather than reducing profit.",
              points: ["Loan is owed to an outsider and must be repaid, so it is a liability (1)", "Capital is owed to the owner only; business entity principle (1)", "Drawings are resources taken out by the owner for personal use (1)", "They reduce the amount owed to the owner, not profit (1)"],
            },
          ],
        },
        {
          id: "sq-1.2-2",
          title: "Sara's Stationery: capital, profit and the overdraft",
          stimulus:
            "Sara runs a stationery shop and does not keep full accounting records. She has given you the following information. At 1 January 2026: shop fittings $7,500; inventory $5,200; trade receivables $1,900; bank $2,350; trade payables $3,100; loan from her father $5,000. At 31 December 2026: shop fittings $6,900; inventory $6,100; trade receivables $2,450; bank overdraft $820; cash $140; trade payables $2,760; loan from her father $3,000. During the year Sara took drawings of $9,600 and on 1 July 2026 she paid $4,000 of her own savings into the business bank account. Sara is worried because the bank account is overdrawn, and her father says that his loan should be counted as part of Sara's capital.",
          parts: [
            {
              label: "a",
              marks: 4,
              prompt: "Calculate Sara's capital at 1 January 2026.",
              model: "Assets: $7,500 plus $5,200 plus $1,900 plus $2,350 equals $16,950. Liabilities: $3,100 plus $5,000 equals $8,100. Capital equals assets less liabilities: $16,950 less $8,100 equals $8,850.",
              points: ["Total assets $16,950 (1)", "Total liabilities $8,100 including the loan (1)", "Equation capital equals assets less liabilities stated or used (1)", "Capital $8,850 (1)"],
            },
            {
              label: "b",
              marks: 5,
              prompt: "Calculate Sara's capital at 31 December 2026, showing non-current assets, current assets and liabilities separately.",
              model: "Non-current assets: shop fittings $6,900. Current assets: inventory $6,100 plus trade receivables $2,450 plus cash $140 equals $8,690. Total assets $15,590. Liabilities: bank overdraft $820 plus trade payables $2,760 plus loan $3,000 equals $6,580. Capital equals $15,590 less $6,580 equals $9,010.",
              points: ["Non-current assets $6,900 (1)", "Current assets $8,690 (1)", "Total assets $15,590 (1)", "Liabilities $6,580 with the overdraft treated as a liability (1)", "Capital $9,010 (1)"],
            },
            {
              label: "c",
              marks: 4,
              prompt: "Calculate Sara's profit for the year ended 31 December 2026.",
              model: "Increase in capital: $9,010 less $8,850 equals $160. Add drawings $9,600 gives $9,760. Less capital introduced $4,000 gives profit for the year $5,760. Check: $8,850 plus $4,000 plus $5,760 less $9,600 equals $9,010.",
              points: ["Change in capital $160 increase (1)", "Drawings $9,600 added (1)", "Capital introduced $4,000 deducted (1)", "Profit for the year $5,760 (1)"],
            },
            {
              label: "d",
              marks: 4,
              prompt: "Sara says the business must be failing because the bank is overdrawn even though it made a profit. Explain two reasons why the bank balance fell from $2,350 to an overdraft of $820.",
              model: "First, Sara's drawings of $9,600 were much greater than the profit of $5,760. She took out $3,840 more than the business earned, and that money came from the bank. Second, she repaid $2,000 of her father's loan during the year (it fell from $5,000 to $3,000). Repaying a loan reduces the bank but is not an expense, so it does not reduce profit. Smaller reasons: inventory rose by $900 and trade receivables rose by $550, which tie up cash. The business is profitable; the problem is how the cash has been used.",
              points: ["Drawings $9,600 exceeded profit $5,760 (1)", "Developed: the excess of $3,840 came out of the bank (1)", "Loan repayment of $2,000 reduced the bank (1)", "Developed: repaying a loan is not an expense so profit is unaffected; or increase in inventory and receivables tied up cash (1)"],
            },
            {
              label: "e",
              marks: 3,
              prompt: "Explain, with reference to the accounting equation, why Sara's father is wrong to say that his loan is part of Sara's capital.",
              model: "The loan is owed to Sara's father, who is not the owner of the business, so it is a liability of the business. Capital is the amount the business owes to its owner, Sara, and under the business entity principle only her own investment and the profits left in the business count as capital. In the equation assets equal capital plus liabilities, moving the $3,000 loan into capital would still make the totals agree, but it would overstate Sara's capital at $12,010 and hide the fact that $3,000 must be repaid.",
              points: ["Loan is owed to an outsider, so it is a liability not capital (1)", "Capital is the owner's claim only, business entity principle (1)", "Treating it as capital would overstate capital and understate liabilities even though the totals still balance (1)"],
            },
          ],
        },
      ],
    },
  ],
};
