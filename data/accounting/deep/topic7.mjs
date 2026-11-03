// Deep content for Topic 7: Concepts, ethics and technology (Cambridge IGCSE Accounting 0452, 2027–2029).
// Original teaching material. Validate with: node scripts/validate-deep.mjs --topic 7

export const topic = {
  id: "7",
  name: "Concepts, ethics and technology",
  sections: [
    {
      section: "7.1",
      title: "Accounting principles",
      summary:
        "Accounting principles are the agreed rules that every accountant follows when deciding what to record, how much to record and in which period. The ten principles in the syllabus are business entity, going concern, historic cost, matching, prudence, consistency, materiality, money measurement, realisation and duality. In the exam you must name the correct principle and show how it changes a figure.",
      objectives: [
        "Explain each of the ten accounting principles in simple words.",
        "Identify which principle applies to a transaction or an accounting decision.",
        "Apply a principle to adjust a figure, for example inventory, a prepayment or a small asset.",
        "Explain why the financial statements would mislead users if a principle were ignored.",
        "Distinguish between principles that sound similar, such as prudence and materiality, or matching and realisation.",
        "Link the principles to adjustments met earlier in the course, such as depreciation, accruals and provisions for doubtful debts.",
      ],
      keyTerms: [
        { term: "Accounting principle", definition: "An agreed rule that accountants follow so that financial statements are prepared in the same way and can be trusted and compared." },
        { term: "Business entity", definition: "The business is treated as separate from its owner, so only business transactions are recorded in the business books." },
        { term: "Going concern", definition: "The business is assumed to continue operating for the foreseeable future, so assets are not valued at what they would fetch if sold off quickly." },
        { term: "Historic cost", definition: "Transactions and assets are recorded at the original amount paid, which is objective and can be checked against a document." },
        { term: "Matching (accruals)", definition: "Income and the expenses used to earn it are recorded in the period they relate to, not in the period when cash moves." },
        { term: "Prudence", definition: "Profits and assets are never overstated and losses and liabilities are never understated, so a loss is recognised as soon as it is expected." },
        { term: "Consistency", definition: "Once a business chooses an accounting method it uses the same method every year, so results of different years can be compared." },
        { term: "Materiality", definition: "An item is material if leaving it out or recording it wrongly could change a user's decision; small items may be treated in the simplest way." },
        { term: "Money measurement", definition: "Only items that can be measured reliably in money are recorded, so staff skill or customer loyalty is left out of the books." },
        { term: "Realisation", definition: "Revenue is recognised when the goods or services pass to the customer and the sale is certain, not when the order arrives or when cash is received." },
        { term: "Duality", definition: "Every transaction has two equal effects on the accounting equation, which is why each entry has a debit and a credit." },
        { term: "Net realisable value", definition: "The expected selling price of inventory less any further cost needed to finish or sell it." },
      ],
      notes: [
        {
          heading: "Why accountants need shared rules",
          body:
            "Imagine three shops each choosing their own way to value inventory, record sales and charge depreciation. Their profits could not be compared, and a bank could not trust any of them. Accounting principles solve this. They are a set of agreed rules that every accountant follows, so that financial statements from different businesses and different years are prepared on the same basis.\n\nThe principles also protect users. An owner who wants a bank loan would like profit to look high. A rule that says revenue is only recorded when it is earned stops that owner from counting next year's orders this year. In this way the principles make the statements reliable, comparable and fair.\n\nThe syllabus names ten principles. You need to know what each one means, recognise it in a scenario and show its effect on a figure. Examiners rarely ask you only to define a principle. They describe a situation and expect you to name the principle, apply it and say what would go wrong if it were ignored.",
        },
        {
          heading: "The ten principles at a glance",
          body:
            "Keep this table in your head. The meaning column tells you the rule. The application column shows the rule changing a real figure. In the exam a good answer always contains both parts: the rule and its effect on the accounts.\n\nNotice that several principles work together. Going concern justifies historic cost, because a business that will keep trading does not need to show forced-sale values. Matching and realisation are both about timing: matching decides the period for expenses and realisation decides the period for revenue. Prudence limits optimism, while materiality stops accountants wasting time on tiny amounts. Learn the names exactly as written, because the examiner marks the name of the principle, not a description of it.",
          table: {
            head: ["Principle", "Meaning in one line", "Application in one line"],
            rows: [
              ["Business entity", "The business and its owner are separate persons in the books.", "The owner's private electricity bill paid from the business bank account is drawings, not an expense."],
              ["Going concern", "The business is expected to continue trading for the foreseeable future.", "A machine is shown at cost less depreciation, not at its quick-sale scrap value."],
              ["Historic cost", "Record assets and transactions at the original amount paid.", "Premises bought for $90,000 stay at $90,000 even if an agent now values them at $110,000."],
              ["Matching (accruals)", "Record income and expenses in the period they belong to, whatever the cash date.", "Rent paid in advance for January is a prepayment, not a December expense."],
              ["Prudence", "Do not overstate profit or assets; recognise expected losses at once.", "Inventory is valued at the lower of cost and net realisable value."],
              ["Consistency", "Use the same method year after year.", "A business using straight-line depreciation keeps using it, so profits can be compared."],
              ["Materiality", "Only items large enough to affect decisions need exact treatment.", "A $15 calculator that will last five years is charged as an expense, not depreciated."],
              ["Money measurement", "Record only what can be measured reliably in money.", "A loyal team of staff is not shown as an asset in the statement of financial position."],
              ["Realisation", "Recognise revenue when goods or services pass to the customer.", "An order received on 30 December but delivered on 5 January is next year's revenue."],
              ["Duality", "Every transaction has two equal effects.", "Buying a van for $12,000 by cheque increases non-current assets and decreases bank by the same amount."],
            ],
          },
        },
        {
          heading: "Entity, duality and money measurement: what goes into the books",
          body:
            "Three principles decide what is recorded at all. Business entity says that the owner and the business are different. When Nadia pays her own dentist from the business bank account, the business has not had an expense. It has given money to the owner, so the entry is debit drawings and credit bank. If it were recorded as an expense, profit would be too low and capital would still be too high.\n\nDuality says every transaction has two effects, which is why double entry exists. A loan of $8,000 received increases the asset bank and increases the liability loan. The accounting equation stays balanced. When a student forgets duality and records only one side, the trial balance will not agree.\n\nMoney measurement says only items with a reliable money value are recorded. A skilled manager, a good location or a happy customer base all help the business, but nobody can measure them objectively. They are left out. This is one reason why financial statements never show the full value of a business, a limitation you studied in Topic 6.",
        },
        {
          heading: "Going concern and historic cost: how assets are valued",
          body:
            "Going concern is an assumption. Accountants assume the business will keep trading for at least the next twelve months. Because of this, a delivery van bought for $18,000 is not shown at the $11,000 a dealer would pay for it today. The business is not selling the van. It will use it for years, so the cost is spread over those years as depreciation. If the business were about to close, going concern would no longer apply and assets would be shown at the amounts they could be sold for.\n\nHistoric cost says assets are recorded at the price actually paid. The price is on an invoice, so it is objective and can be checked. A guess about current market value is not. If premises bought for $60,000 are now worth $75,000, the $15,000 increase is not recorded by a sole trader, because the gain has not been realised and the valuation is only an opinion.\n\nThese two principles explain the carrying value you have calculated many times: cost less accumulated depreciation. Neither market value nor replacement cost appears in that calculation.",
        },
        {
          heading: "Matching and realisation: deciding the period",
          body:
            "Profit for the year must compare the revenue earned in the year with the expenses used to earn it. Matching, also called the accruals principle, puts each expense in the period it relates to. If insurance of $1,200 is paid on 1 October for twelve months and the year ends on 31 December, only three months, $300, belongs to this year. The other $900 is a prepayment, shown as a current asset. Wages owed but not yet paid are added to the expense and shown as a current liability. Depreciation and the provision for doubtful debts are also matching adjustments, because they put the cost of using assets and the expected cost of bad debts into the period that benefited.\n\nRealisation decides when revenue is recognised. The rule is: when the goods or services are delivered and ownership passes, so the amount is reasonably certain. Not when the order arrives, and not when the cash arrives. A credit sale delivered on 29 December is revenue for this year, with a trade receivable at the year end, even though cash comes in January. A deposit received for goods to be delivered next year is not revenue yet. It is a liability, because the business still owes the customer the goods.",
        },
        {
          heading: "Prudence, consistency and materiality: using judgement sensibly",
          body:
            "Prudence stops optimism. Where there is doubt, choose the figure that gives the lower profit or the lower asset value, and recognise a likely loss as soon as it is known. This is why inventory is valued at the lower of cost and net realisable value, why a provision for doubtful debts is made before any customer actually fails to pay, and why a possible gain on a property is not recorded until it is sold. Prudence does not mean deliberately understating profit. That would also mislead users.\n\nConsistency says keep the same method year after year. A business that used reducing balance depreciation last year must use it this year. If it switched methods to make profit look better, the two years could not be compared. A change is allowed only when there is a good reason, such as a new method giving a truer picture, and the change and its effect should be explained.\n\nMateriality keeps things sensible. A $12 stapler will last several years, so in theory it is a non-current asset to be depreciated. In practice the amount is so small that nobody's decision would change, so it is charged as an expense at once. What is material depends on the size of the business: $500 matters to a market stall but not to a national chain.",
        },
        {
          heading: "How to answer a principle question in the exam",
          body:
            "Most questions follow one pattern: a short scenario, then an instruction such as name the principle, explain how it applies, or calculate the corrected figure. Build your answer in four moves. First, name the principle exactly. Second, give its rule in one sentence. Third, apply the rule to the figures in the question, showing the amount that changes. Fourth, state the consequence of ignoring it: profit overstated or understated, an asset or liability wrong, or users misled.\n\nWatch for principles that sound alike. Prudence lowers a figure because of doubt; materiality simplifies a figure because it is small. Matching concerns expenses and the period they belong to; realisation concerns revenue and the moment it is earned. Historic cost is about the amount recorded; going concern is the assumption that allows that amount to be kept.\n\nSometimes two principles can apply. Treating an owner's private purchase as drawings is business entity. Recording it at the invoice price is historic cost. When the question asks for one principle, choose the one that explains the decision described, not every principle that touches the transaction.",
        },
      ],
      workedExamples: [
        {
          title: "Five situations at Nadia's Bakery: name the principle and apply it",
          scenario:
            "Nadia owns a bakery with a financial year ending 31 December 2026. During the year: (1) she paid her son's school fees of $1,800 from the business bank account; (2) a customer ordered a wedding cake for $350 on 28 December 2026, which was delivered on 3 January 2027; (3) a new oven cost $6,400 on 1 January 2026, is expected to last eight years with no scrap value, and a similar oven now sells for $7,000; (4) insurance of $1,200 was paid on 1 October 2026 for twelve months; (5) she bought a $15 calculator that should last five years. For each situation, name the principle and state the correct treatment.",
          steps: [
            "Situation 1: Business entity. School fees are the owner's private cost, so they are drawings of $1,800, not an expense. Debit drawings $1,800, credit bank $1,800. If treated as an expense, profit for 2026 would be understated by $1,800.",
            "Situation 2: Realisation. The cake was delivered on 3 January 2027, so the $350 is revenue for 2027. No sale and no trade receivable is recorded at 31 December 2026. Including it would overstate 2026 revenue and profit by $350.",
            "Situation 3: Historic cost and going concern. The oven stays at its cost of $6,400. Depreciation is $6,400 divided by 8 = $800 a year, so the carrying value at 31 December 2026 is $6,400 less $800 = $5,600. The $7,000 replacement price is ignored because the business will keep using the oven, not sell or replace it.",
            "Situation 4: Matching. Three months of the insurance belong to 2026: $1,200 multiplied by 3 over 12 = $300. The remaining $900 is a prepayment, a current asset at 31 December 2026. Charging the whole $1,200 would understate profit by $900.",
            "Situation 5: Materiality. The calculator is technically a non-current asset, but $15 is far too small to affect any decision. Charge $15 as an expense in 2026 instead of depreciating $3 a year for five years.",
          ],
          answer:
            "Business entity: drawings $1,800. Realisation: no 2026 revenue; $350 recorded in 2027. Historic cost and going concern: oven carried at $5,600. Matching: insurance expense $300, prepayment $900. Materiality: calculator expensed at $15.",
        },
        {
          title: "Prudence and the closing inventory of Karim Electronics",
          scenario:
            "At 31 December 2026 Karim Electronics holds two lines of inventory. Line A: 40 phone cases that cost $12 each; a new model has come out, so they can now be sold for only $9 each and each needs $1 of repackaging before sale. Line B: 25 chargers that cost $18 each and sell for $30 each with selling costs of $2 each. Karim has valued all inventory at cost. Calculate the correct inventory figure and the effect on gross profit.",
          steps: [
            "Rule: inventory is valued at the lower of cost and net realisable value for each line separately, because of prudence.",
            "Line A cost: 40 multiplied by $12 = $480. Net realisable value per case: $9 less $1 = $8. Total NRV: 40 multiplied by $8 = $320. The lower figure is $320.",
            "Line B cost: 25 multiplied by $18 = $450. Net realisable value per charger: $30 less $2 = $28. Total NRV: 25 multiplied by $28 = $700. The lower figure is cost, $450. The expected profit on chargers is not recognised until they are sold.",
            "Correct closing inventory: $320 plus $450 = $770. Karim's figure at cost was $480 plus $450 = $930.",
            "Closing inventory is deducted in cost of sales. Reducing it by $930 less $770 = $160 increases cost of sales by $160, so gross profit and profit for the year fall by $160. Current assets also fall by $160.",
          ],
          answer:
            "Closing inventory $770 (not $930). Gross profit is $160 lower than Karim's draft. Prudence recognises the expected loss on the phone cases now, but the expected gain on the chargers is left until they are sold.",
        },
        {
          title: "Matching at Tala's Gym: expenses and income in the right period",
          scenario:
            "Tala's Gym has a financial year ending 30 June 2026. Electricity: at 1 July 2025 the gym owed $520 for June 2025 electricity. During the year it paid $4,350. At 30 June 2026 the bill for June 2026, $640, was unpaid. Membership fees: cash received during the year was $38,400, which included $1,500 paid by members for July and August 2026. Calculate the electricity expense and the membership income for the year and show the year-end balances.",
          steps: [
            "Electricity: cash paid $4,350 includes $520 that belonged to last year, so remove it: $4,350 less $520 = $3,830. Add the $640 for June 2026 that has been used but not paid: $3,830 plus $640 = $4,470 expense for the year.",
            "At 30 June 2026 the $640 owed is an accrued expense, shown as other payables under current liabilities.",
            "If Tala had simply used cash paid, the expense would be $4,350 and profit would be overstated by $4,470 less $4,350 = $120.",
            "Membership fees: the $1,500 for July and August 2026 has not been earned yet. Income for the year is $38,400 less $1,500 = $36,900.",
            "At 30 June 2026 the $1,500 is income received in advance, a current liability, because the gym still owes those members two months of service. If the whole $38,400 were counted, profit would be overstated by $1,500.",
          ],
          answer:
            "Electricity expense $4,470 with accrued expense $640; membership income $36,900 with income received in advance $1,500. Both follow matching: expenses and income are recorded in the period they belong to, not when cash moved.",
        },
        {
          title: "Consistency and materiality at Omar's Print Shop",
          scenario:
            "Omar bought a printing press for $9,000 on 1 January 2024 and has depreciated it at 20 per cent straight line for 2024 and 2025. Profit for 2026 looks low, so he wants to switch to reducing balance at 10 per cent for 2026 only. He also bought ten staplers at $4 each and wants to record them as a non-current asset depreciated over five years. Advise Omar, showing figures.",
          steps: [
            "Straight-line charge: 20 per cent of $9,000 = $1,800 a year. After two years accumulated depreciation is $3,600 and the carrying value is $9,000 less $3,600 = $5,400.",
            "If Omar switched to 10 per cent reducing balance for 2026, the charge would be 10 per cent of $5,400 = $540 instead of $1,800. Profit for 2026 would rise by $1,800 less $540 = $1,260.",
            "Consistency: the same method must be used each year so that 2026 can be compared with 2025. Changing a method only to lift profit is not allowed. Omar keeps straight line and charges $1,800.",
            "Staplers: total cost is 10 multiplied by $4 = $40. Depreciating this over five years would add $8 a year to the accounts for five years, for an amount nobody would notice.",
            "Materiality: $40 is immaterial, so the staplers are charged as an expense of $40 in 2026. The simpler treatment is correct because it cannot affect any user's decision.",
          ],
          answer:
            "Keep straight-line depreciation of $1,800 for 2026 (consistency); the proposed change would destroy comparability between years and raise profit by $1,260 for no good reason. Expense the staplers at $40 (materiality).",
        },
      ],
      commonErrors: [
        { error: "Naming the principle but not applying it to the figures in the question.", fix: "Always finish with the amount that changes and the direction: for example, prepayment $900 so expense falls to $300 and profit rises by $900." },
        { error: "Confusing prudence with materiality.", fix: "Prudence lowers a figure because of doubt or expected loss. Materiality simplifies the treatment of an item because it is too small to matter." },
        { error: "Saying revenue is realised when cash is received.", fix: "Revenue is realised when the goods or services pass to the customer. A credit sale delivered this year is this year's revenue even if cash comes next year." },
        { error: "Treating the owner's private spending from the business bank account as a business expense.", fix: "Apply business entity: debit drawings. The business and the owner are separate, so profit is not reduced." },
        { error: "Believing consistency means a method can never change.", fix: "A change is allowed for a good reason, for example to give a truer picture, and its effect should be explained. A change made only to improve profit breaks the principle." },
        { error: "Writing historic cost when inventory has been reduced to net realisable value.", fix: "Inventory below cost is prudence. Historic cost explains why non-current assets stay at the price paid." },
      ],
      examTips: [
        "Learn the ten names exactly. The mark is for the correct name, so write prudence, not being careful, and matching or accruals, not timing.",
        "In an explain question use the four moves: name, rule, application with a figure, consequence of ignoring it. Each move is usually worth a mark.",
        "When a question gives a market value, a replacement cost or an insurance value for an asset, the answer almost always uses historic cost and ignores the other figures.",
        "For inventory questions compare cost with net realisable value for each line separately, and remember that NRV is selling price less any further costs to sell.",
        "Where a scenario mentions the owner paying for something personal, or taking goods home, think business entity first and record drawings.",
        "If you are asked for the effect on profit, say the direction and the amount, for example profit overstated by $450. Direction alone rarely earns full marks.",
      ],
      exercises: [
        {
          id: "ex-7.1-1",
          type: "explain",
          marks: 2,
          prompt: "Define the business entity principle and give one example of how it affects the records of a sole trader.",
          model:
            "Business entity means the business is treated as separate from its owner, so only transactions of the business are recorded in the business books. Example: if the owner pays her home rent of $700 from the business bank account, it is recorded as drawings, not as a rent expense of the business.",
          points: ["Business is separate from the owner; only business transactions are recorded (1)", "Valid example such as owner's private payment recorded as drawings (1)"],
        },
        {
          id: "ex-7.1-2",
          type: "explain",
          marks: 2,
          prompt: "Name the accounting principle shown in each case. (i) A credit purchase of goods for $900 is recorded as debit purchases $900 and credit the supplier $900. (ii) A business does not record the value of its experienced sales team in the statement of financial position.",
          model: "(i) Duality: every transaction has two equal effects, a debit and a credit. (ii) Money measurement: only items that can be measured reliably in money are recorded, and staff experience cannot be.",
          points: ["(i) Duality (1)", "(ii) Money measurement (1)"],
        },
        {
          id: "ex-7.1-3",
          type: "calculation",
          marks: 3,
          prompt: "Rami holds 60 units of a product that cost $7 each. The product can now be sold for $6.50 each, and each unit will cost $0.50 to deliver to the customer. Calculate the value of this inventory in the financial statements and name the principle applied.",
          model:
            "Net realisable value per unit = $6.50 less $0.50 = $6.00. Cost per unit is $7, so NRV is lower. Inventory value = 60 multiplied by $6.00 = $360, not 60 multiplied by $7 = $420. The principle is prudence: inventory is valued at the lower of cost and net realisable value so that profit and assets are not overstated.",
          points: ["Net realisable value per unit $6.00 (1)", "Inventory valued at $360 (1)", "Prudence, lower of cost and NRV (1)"],
        },
        {
          id: "ex-7.1-4",
          type: "calculation",
          marks: 3,
          prompt: "Dina paid rent of $5,400 on 1 March 2026 for the year ending 28 February 2027. Her financial year ends on 31 December 2026. Calculate the rent expense for the year and the amount shown in the statement of financial position, and name the principle applied.",
          model:
            "Months from 1 March to 31 December 2026 = 10. Rent expense = $5,400 multiplied by 10 over 12 = $4,500. Prepaid rent = $5,400 less $4,500 = $900, shown as other receivables under current assets. The principle is matching: the expense is recorded in the period it relates to, not when it was paid.",
          points: ["Rent expense $4,500 (1)", "Prepayment $900 shown as a current asset (1)", "Matching or accruals principle with reason (1)"],
        },
        {
          id: "ex-7.1-5",
          type: "explain",
          marks: 4,
          prompt: "A trader buys a waste bin for the office for $18. It is expected to last six years. Explain, naming the principle, how the bin should be treated in the financial statements and why.",
          model:
            "The bin is strictly a non-current asset because it will be used for more than one year. However, under the materiality principle an item is only treated with full accuracy if leaving it out or recording it differently could change a user's decision. $18 is far too small to affect anyone's decision. Therefore the bin is charged as an expense of $18 in the year of purchase. Recording it as an asset and charging depreciation of $3 a year for six years would cost more effort than the information is worth and would not change the picture of the business.",
          points: ["Materiality principle named (1)", "An item is material only if it could affect a user's decision, and $18 cannot (1)", "Treated as an expense in the year of purchase, not as a non-current asset (1)", "Depreciating $3 a year for six years would be pointless effort with no effect on decisions (1)"],
        },
        {
          id: "ex-7.1-6",
          type: "explain",
          marks: 4,
          prompt: "Salem sells furniture on credit. For one sale: the order was received on 20 December 2026, the goods were delivered on 29 December 2026, the invoice was sent on 2 January 2027 and the customer paid on 20 January 2027. Salem's year ends on 31 December 2026. Explain, naming the principle, in which year the sale is recorded and what would happen to profit if Salem waited for the cash.",
          model:
            "The sale is recognised on 29 December 2026, when the goods were delivered and ownership passed to the customer. This follows the realisation principle: revenue is recognised when it is earned, not when the order arrives and not when cash is received. The sale is therefore included in revenue for the year ended 31 December 2026 and the customer is shown as a trade receivable at the year end. If Salem waited until the cash arrived in January, revenue and profit for 2026 would be understated and 2027 would be overstated, so neither year's results would be correct.",
          points: ["Recognised on 29 December 2026 when goods were delivered and ownership passed (1)", "Realisation principle: revenue recognised when earned, not when ordered or paid for (1)", "Included in 2026 revenue with a trade receivable at 31 December 2026 (1)", "Waiting for cash would understate 2026 profit and overstate 2027 profit (1)"],
        },
        {
          id: "ex-7.1-7",
          type: "calculation",
          marks: 5,
          prompt: "Farida bought a machine for $24,000 on 1 January 2025. It has a six-year life, no residual value, and is depreciated by the straight-line method. On 31 December 2026 a dealer offered $19,500 for it and a new machine of the same type costs $27,000. Calculate the carrying value of the machine at 31 December 2026 and explain, naming two principles, why the other two figures are not used.",
          model:
            "Annual depreciation = $24,000 divided by 6 = $4,000. Accumulated depreciation at 31 December 2026 = 2 multiplied by $4,000 = $8,000. Carrying value = $24,000 less $8,000 = $16,000. Historic cost: the machine is recorded at the amount actually paid, which is objective and supported by the purchase invoice, so neither the $19,500 offer nor the $27,000 replacement cost is used. Going concern: Farida will continue to use the machine, so its sale value is not relevant; the cost is spread over the years that benefit from it through depreciation.",
          points: ["Annual depreciation $4,000 (1)", "Accumulated depreciation $8,000 (1)", "Carrying value $16,000 (1)", "Historic cost: recorded at the price paid, which is objective, so $19,500 and $27,000 ignored (1)", "Going concern: business continues to use the machine so sale value is irrelevant and cost is spread by depreciation (1)"],
        },
        {
          id: "ex-7.1-8",
          type: "calculation",
          marks: 6,
          prompt: "Bilal bought a delivery van for $30,000 on 1 January 2025 and depreciated it at 20 per cent straight line in 2025. For 2026 he wants to change to 20 per cent reducing balance because profit is lower than he hoped. Calculate the 2026 depreciation under each method, state the effect of the change on 2026 profit, and explain whether the change is acceptable.",
          model:
            "Straight line: 20 per cent of $30,000 = $6,000 for 2026, the same as 2025. Carrying value at 1 January 2026 = $30,000 less $6,000 = $24,000. Reducing balance: 20 per cent of $24,000 = $4,800. If Bilal changed method, the 2026 charge would fall by $6,000 less $4,800 = $1,200 and profit would be $1,200 higher. The consistency principle requires the same method to be used each year so that the profits of 2025 and 2026 can be compared and users are not misled. A change is only acceptable for a good reason, such as giving a truer picture of how the van loses value, and the change should be explained. Changing simply to increase profit is not acceptable, so Bilal should charge $6,000.",
          points: ["Straight-line charge 2026 $6,000 (1)", "Carrying value $24,000 and reducing balance charge $4,800 (1)", "Profit would be $1,200 higher under the proposed change (1)", "Consistency: same method each year (1)", "So that results of different years are comparable and users are not misled (1)", "Change acceptable only for a good reason with disclosure, not to raise profit; keep $6,000 (1)"],
        },
        {
          id: "ex-7.1-9",
          type: "explain",
          marks: 8,
          prompt: "Lina runs a furniture shop with a year end of 31 December 2026. Her draft accounts contain these items. (1) She took a table costing $400 home for her own use and made no entry. (2) Damaged chairs that cost $900 and can be sold for $650 are included in closing inventory at $900. (3) An order worth $2,000 received on 30 December 2026, to be delivered in January 2027, is included in revenue. (4) Wages of $700 for the last week of December were unpaid and have not been recorded. For each item, name the principle that applies and state the correct treatment with the effect on profit for the year.",
          model:
            "(1) Business entity. The table is drawings: debit drawings $400, credit purchases $400. Purchases fall by $400, so cost of sales falls and profit rises by $400. (2) Prudence. The chairs must be valued at the lower of cost and net realisable value, $650. Closing inventory falls by $250, cost of sales rises by $250 and profit falls by $250. (3) Realisation. The goods have not been delivered, so no revenue has been earned in 2026. Remove $2,000 from revenue; profit falls by $2,000. (4) Matching. The wages were earned by staff in December so they belong to 2026. Add $700 to wages and show an accrued expense of $700 as a current liability; profit falls by $700. Overall the draft profit is overstated by $250 plus $2,000 plus $700 less $400 = $2,550.",
          points: ["(1) Business entity named (1)", "(1) Drawings $400 recorded, purchases reduced, profit rises by $400 (1)", "(2) Prudence named (1)", "(2) Inventory reduced to $650, profit falls by $250 (1)", "(3) Realisation named (1)", "(3) $2,000 removed from revenue, profit falls by $2,000 (1)", "(4) Matching or accruals named (1)", "(4) Wages $700 accrued as a current liability, profit falls by $700 (1)"],
        },
        {
          id: "ex-7.1-10",
          type: "calculation",
          marks: 10,
          prompt:
            "Mazen's draft profit for the year ended 31 December 2026 is $41,600. You discover the following. (a) Closing inventory of $12,300 at cost includes goods that cost $1,400 whose net realisable value is $950. (b) Insurance of $2,400 paid on 1 September 2026 for twelve months has all been charged as an expense. (c) Goods sold on credit for $3,100 and delivered on 30 December 2026 have not been recorded. (d) Mazen's private mobile phone bill of $260 was charged to telephone expenses. (e) Electricity of $380 for December 2026 is owed and has not been recorded. (f) A desk lamp costing $35 has been recorded as a non-current asset and no depreciation has been charged. Prepare a statement showing the corrected profit for the year, and name the principle behind each adjustment.",
          model:
            "Statement of corrected profit for the year ended 31 December 2026. Draft profit $41,600. (a) Less reduction of inventory to net realisable value, $1,400 less $950 = $450 (prudence): $41,150. (b) Add insurance prepaid, $2,400 multiplied by 8 over 12 = $1,600 (matching): $42,750. (c) Add unrecorded credit sale $3,100 (realisation): $45,850. (d) Add private phone bill removed from expenses and charged to drawings $260 (business entity): $46,110. (e) Less accrued electricity $380 (matching): $45,730. (f) Less desk lamp treated as an expense $35 (materiality): $45,695. Corrected profit for the year $45,695. Check: increases $1,600 plus $3,100 plus $260 = $4,960; decreases $450 plus $380 plus $35 = $865; net increase $4,095; $41,600 plus $4,095 = $45,695.",
          points: ["(a) Inventory written down by $450, profit reduced (1)", "(b) Prepaid insurance $1,600 added back to profit (1)", "(c) Credit sale $3,100 added to profit (1)", "(d) Private phone bill $260 added back and treated as drawings (1)", "(e) Accrued electricity $380 deducted (1)", "(f) Desk lamp $35 charged as expense and deducted (1)", "Corrected profit $45,695 (1)", "Prudence for (a) and matching for (b) and (e) named (1)", "Realisation for (c) and business entity for (d) named (1)", "Materiality for (f) named (1)"],
        },
      ],
      mcq: [
        {
          id: "mcq-7.1-1",
          question: "A sole trader pays the insurance on her private house from the business bank account and records it as drawings. Which principle is she applying?",
          choices: ["Business entity", "Prudence", "Money measurement", "Duality"],
          explanation: "Business entity treats the owner and the business as separate, so a private payment is drawings, not a business expense. Duality applies to every transaction and does not explain the choice of account.",
        },
        {
          id: "mcq-7.1-2",
          question: "Closing inventory is valued at the lower of cost and net realisable value. Which principle is being followed?",
          choices: ["Prudence", "Materiality", "Historic cost", "Consistency"],
          explanation: "Prudence prevents profit and assets being overstated, so an expected loss on inventory is recognised at once. Historic cost would keep inventory at cost even when it is worth less.",
        },
        {
          id: "mcq-7.1-3",
          question: "A business records a credit purchase as debit purchases and credit trade payables. Which principle explains the two entries?",
          choices: ["Duality", "Business entity", "Consistency", "Realisation"],
          explanation: "Duality states that every transaction has two equal effects, which is the basis of double entry. The other principles do not concern the number of entries.",
        },
        {
          id: "mcq-7.1-4",
          question: "Goods are ordered on 27 December, delivered on 30 December, invoiced on 3 January and paid for on 25 January. The year end is 31 December. Under the realisation principle, on which date is the sale recognised?",
          choices: ["30 December", "27 December", "3 January", "25 January"],
          explanation: "Revenue is realised when the goods pass to the customer, which is the delivery date. The order date is too early and the invoice and cash dates are too late.",
        },
        {
          id: "mcq-7.1-5",
          question: "A restaurant is famous for its chef, but no value for the chef appears in its statement of financial position. Which principle explains this?",
          choices: ["Money measurement", "Business entity", "Materiality", "Going concern"],
          explanation: "Money measurement means only items with a reliable money value are recorded. A chef's skill cannot be measured objectively in money.",
        },
        {
          id: "mcq-7.1-6",
          question: "A business has used the reducing balance method for its vehicles for five years and continues to do so even though straight line would give a higher profit this year. Which principle is applied?",
          choices: ["Consistency", "Prudence", "Matching", "Materiality"],
          explanation: "Consistency requires the same method year after year so that results can be compared. Prudence is about not overstating profit, which is a different reason.",
        },
        {
          id: "mcq-7.1-7",
          question: "A $20 stapler expected to last four years is charged as an expense in the year of purchase. Which principle justifies this?",
          choices: ["Materiality", "Prudence", "Historic cost", "Consistency"],
          explanation: "Materiality allows small items to be treated in the simplest way because they cannot affect a user's decision. Prudence is about expected losses, not about size.",
        },
        {
          id: "mcq-7.1-8",
          question: "A van was bought for $18,000. A dealer has since offered $21,000 for it. At what amount is the van recorded in the books before depreciation?",
          choices: ["$18,000", "$21,000", "$19,500", "$3,000"],
          explanation: "Historic cost records the asset at the price actually paid, $18,000. The offer is only an opinion of value and the gain is not realised until a sale takes place.",
        },
        {
          id: "mcq-7.1-9",
          question: "Which principle assumes that a business will continue trading for the foreseeable future, so that non-current assets need not be shown at their quick-sale value?",
          choices: ["Going concern", "Realisation", "Historic cost", "Duality"],
          explanation: "Going concern is the assumption of continuity. Historic cost tells you which amount to record, but it is going concern that justifies keeping that amount rather than a sale value.",
        },
        {
          id: "mcq-7.1-10",
          question: "Rent of $6,000 was paid on 1 April 2026 for the year to 31 March 2027. The financial year ends on 31 December 2026. Applying the matching principle, what rent expense is shown for 2026?",
          choices: ["$4,500", "$6,000", "$1,500", "$5,000"],
          explanation: "Nine months from April to December belong to 2026: $6,000 multiplied by 9 over 12 = $4,500. The remaining $1,500 is a prepayment. $6,000 is the cash paid, not the expense.",
        },
      ],
      structured: [
        {
          id: "sq-7.1-1",
          title: "Hana's Garden Centre: correcting a draft profit using the principles",
          stimulus:
            "Hana owns a garden centre. Her financial year ends on 31 December 2026 and her draft profit for the year is $28,400. Before the accounts are finalised the following matters come to light. (1) Closing inventory of $9,600 at cost includes plants that cost $1,200 but can now be sold for only $800. (2) Rent of $3,600 was paid on 1 November 2026 for the six months to 30 April 2027 and has been charged in full as an expense. (3) A repair to Hana's private car, $540, was charged to motor expenses. (4) Wages of $820 for the last week of December 2026 were unpaid at the year end and have not been recorded. (5) On 29 December 2026 a customer paid a deposit of $1,000 for a greenhouse that will be delivered in February 2027; the deposit was recorded as sales revenue. Hana has applied to her bank for a loan and the bank will study her financial statements.",
          parts: [
            {
              label: "a",
              marks: 5,
              prompt: "For each of the five matters, name the accounting principle that applies.",
              model: "(1) Prudence. (2) Matching (accruals). (3) Business entity. (4) Matching (accruals). (5) Realisation.",
              points: ["(1) Prudence (1)", "(2) Matching or accruals (1)", "(3) Business entity (1)", "(4) Matching or accruals (1)", "(5) Realisation (1)"],
            },
            {
              label: "b",
              marks: 6,
              prompt: "Prepare a statement showing the corrected profit for the year ended 31 December 2026.",
              model:
                "Draft profit $28,400. (1) Less inventory written down to net realisable value: $1,200 less $800 = $400, giving $28,000. (2) Add rent prepaid: four months of six, $3,600 multiplied by 4 over 6 = $2,400, giving $30,400. (3) Add private car repair removed from motor expenses and charged to drawings $540, giving $30,940. (4) Less accrued wages $820, giving $30,120. (5) Less deposit removed from revenue $1,000, giving $29,120. Corrected profit for the year $29,120. Check: additions $2,400 plus $540 = $2,940; deductions $400 plus $820 plus $1,000 = $2,220; net addition $720; $28,400 plus $720 = $29,120.",
              points: ["Inventory write-down $400 deducted (1)", "Rent prepaid $2,400 added (1)", "Private car repair $540 added back (1)", "Accrued wages $820 deducted (1)", "Deposit $1,000 deducted from revenue (1)", "Corrected profit $29,120 (1)"],
            },
            {
              label: "c",
              marks: 5,
              prompt: "Explain how the corrections in (b) change Hana's statement of financial position at 31 December 2026.",
              model:
                "Inventory falls from $9,600 to $9,200 under current assets. Prepaid rent of $2,400 appears as other receivables under current assets. Accrued wages of $820 appear as other payables under current liabilities. The $1,000 deposit is no longer revenue; it is shown as income received in advance, a current liability, because Hana still owes the customer the greenhouse. Drawings increase by $540, which reduces closing capital, while the corrected profit of $29,120 replaces $28,400 in the capital section.",
              points: ["Inventory reduced to $9,200 (1)", "Prepaid rent $2,400 as a current asset (other receivables) (1)", "Accrued wages $820 as a current liability (other payables) (1)", "Deposit $1,000 shown as a current liability, income received in advance (1)", "Drawings up by $540 reducing capital, and corrected profit $29,120 added to capital (1)"],
            },
            {
              label: "d",
              marks: 4,
              prompt: "Explain why the bank would want Hana to apply the prudence and realisation principles before it reads her financial statements.",
              model:
                "The bank will lend only if it believes Hana can repay. It needs statements that do not exaggerate. Prudence makes sure that assets and profit are not overstated, so the inventory the bank may rely on as security is shown at the $800 it can really fetch, not $1,200. Realisation makes sure that revenue is only counted when it is earned, so the $1,000 deposit for a greenhouse not yet delivered is not treated as profit already made. Without these principles the draft profit would be higher than the true figure and the bank might lend money that Hana cannot repay. Following the principles also means Hana's statements can be compared fairly with other businesses the bank deals with.",
              points: ["Bank needs reliable figures to judge ability to repay (1)", "Prudence stops assets and profit being overstated, for example inventory at $800 not $1,200 (1)", "Realisation stops unearned income such as the $1,000 deposit being shown as profit (1)", "Without them profit is overstated and the bank could make a wrong lending decision, or comparison with other businesses would be unfair (1)"],
            },
          ],
        },
        {
          id: "sq-7.1-2",
          title: "Youssef's Cycle Workshop: choosing accounting policies in the first year",
          stimulus:
            "Youssef opened a bicycle repair workshop on 1 January 2026. His first financial year ends on 31 December 2026. He bought workshop equipment for $16,000 on 1 January 2026 and cannot decide between straight-line depreciation over five years with no residual value and reducing balance depreciation at 30 per cent a year. He also bought 30 spanners at $6 each, which should last four years. On 30 December 2026 he finished repairing a customer's bicycle for an agreed price of $240; the customer collected the bicycle and paid on 4 January 2027. Youssef bought his workshop premises for $90,000 in January 2026 and in December 2026 a property agent told him they were worth $110,000.",
          parts: [
            {
              label: "a",
              marks: 4,
              prompt: "Explain the meaning of the consistency principle and the going concern principle.",
              model:
                "Consistency means that once a business has chosen an accounting method, such as a depreciation method, it uses the same method in every following year. This allows the profits of different years to be compared and stops a business changing method just to improve its results. Going concern means the business is assumed to continue trading for the foreseeable future. Because of this, assets are recorded at cost less depreciation rather than at the amount they would fetch if the business closed and sold everything quickly.",
              points: ["Consistency: same method used every year (1)", "So that results of different years are comparable and not manipulated (1)", "Going concern: business assumed to continue for the foreseeable future (1)", "So assets are shown at cost less depreciation, not at closure or forced-sale values (1)"],
            },
            {
              label: "b",
              marks: 6,
              prompt: "Calculate the depreciation charge on the equipment for 2026 and 2027 under each method, and explain the effect of Youssef's choice on reported profit.",
              model:
                "Straight line: $16,000 divided by 5 = $3,200 in 2026 and $3,200 in 2027, total $6,400. Reducing balance: 30 per cent of $16,000 = $4,800 in 2026; carrying value $16,000 less $4,800 = $11,200; 30 per cent of $11,200 = $3,360 in 2027; total $8,160. In 2026 reducing balance gives a charge $1,600 higher than straight line, so profit is $1,600 lower. Over the two years the difference is $8,160 less $6,400 = $1,760. Whichever method Youssef chooses, consistency requires him to keep it in later years, so that profits can be compared.",
              points: ["Straight-line charge $3,200 each year (1)", "Reducing balance 2026 $4,800 (1)", "Reducing balance 2027 $3,360 (1)", "Two-year totals $6,400 and $8,160 (1)", "2026 profit $1,600 lower under reducing balance (1)", "Chosen method must then be applied consistently in future years (1)"],
            },
            {
              label: "c",
              marks: 4,
              prompt: "Explain how the spanners should be treated in the financial statements, naming the principle involved.",
              model:
                "The spanners cost 30 multiplied by $6 = $180 in total. Although they will last four years, which would normally make them non-current assets, the amount is very small compared with the equipment of $16,000 and premises of $90,000. Under the materiality principle an item that is too small to influence any user's decision can be treated in the simplest way. The $180 should therefore be charged as an expense in 2026. Capitalising them and charging $45 of depreciation a year would involve extra record keeping for no benefit.",
              points: ["Total cost $180 calculated (1)", "Materiality principle named (1)", "Amount too small to affect any user's decision (1)", "Charged as an expense in 2026 rather than depreciated over four years (1)"],
            },
            {
              label: "d",
              marks: 6,
              prompt: "Explain how the repair completed on 30 December 2026 and the agent's valuation of the premises should each be treated in the financial statements for the year ended 31 December 2026, naming the principle in each case.",
              model:
                "Repair: the work was finished and the customer collected the bicycle on 30 December 2026, so the service was delivered in 2026. Under the realisation principle revenue is recognised when it is earned, not when cash is received. The $240 is included in revenue for 2026 and, because the customer had not yet paid at the year end, a trade receivable of $240 is shown under current assets at 31 December 2026. Premises: under the historic cost principle the premises remain at the $90,000 actually paid, which is objective and supported by documents. The agent's figure of $110,000 is only an opinion; the gain of $20,000 has not been realised and would be recorded only if the premises were sold. Going concern supports this, because Youssef intends to keep using the premises rather than sell them.",
              points: ["Repair revenue $240 recognised in 2026 (1)", "Realisation: revenue recognised when the service is delivered, not when paid (1)", "Trade receivable $240 at 31 December 2026 (1)", "Premises kept at $90,000 (1)", "Historic cost: objective, documented amount; valuation is only an opinion (1)", "Gain of $20,000 not realised until sold; going concern means the premises are kept for use (1)"],
            },
          ],
        },
      ],
    },
    {
      section: "7.2",
      title: "Professional ethics",
      summary:
        "Accountants are trusted because they follow a code of ethics. The five fundamental principles are integrity, objectivity, professional competence and due care, confidentiality and professional behaviour. The exam gives you a situation, often an owner or manager putting pressure on a book-keeper, and asks you to name the principle at risk, explain the correct response and describe the consequences of behaving unethically.",
      objectives: [
        "State and explain the five fundamental ethical principles for accountants.",
        "Recognise which principle is at risk in a described situation.",
        "Explain the correct response to pressure to produce misleading figures.",
        "Calculate the effect on profit, assets and liabilities of an unethical request.",
        "Describe the consequences of unethical behaviour for the accountant, the business and the users of financial statements.",
        "Explain the link between ethics and the accounting principles, especially prudence, matching and realisation.",
      ],
      keyTerms: [
        { term: "Ethics", definition: "The moral rules that guide how a person should behave, deciding what is honest, fair and responsible." },
        { term: "Code of ethics", definition: "A written set of principles issued by a professional accounting body that its members must follow in their work." },
        { term: "Integrity", definition: "Being straightforward and honest in all professional work, and never knowingly recording or reporting false or misleading information." },
        { term: "Objectivity", definition: "Making professional judgements without bias, conflict of interest or pressure from other people." },
        { term: "Professional competence and due care", definition: "Keeping knowledge and skill up to date and doing every piece of work carefully, thoroughly and on time." },
        { term: "Confidentiality", definition: "Not disclosing information gained at work to outsiders, and not using it for personal advantage, unless there is a legal or professional duty to disclose." },
        { term: "Professional behaviour", definition: "Complying with laws and regulations and avoiding any action that would bring the accounting profession into disrepute." },
        { term: "Conflict of interest", definition: "A situation where an accountant's personal interest, or a duty to one person, could influence a judgement made for another person." },
        { term: "Window dressing", definition: "Arranging or misstating figures so that the financial statements look better than the true position." },
        { term: "Stakeholder", definition: "Any person or group that relies on a business's financial information, such as owners, lenders, suppliers, employees and the tax authority." },
      ],
      notes: [
        {
          heading: "Why ethics matter in accounting",
          body:
            "Financial statements are used by people who were not there when the transactions happened. A bank deciding on a loan, a supplier deciding on credit terms, a partner receiving a profit share and the tax authority all rely on figures prepared by someone else. They can only rely on those figures if the person who prepared them was honest, careful and independent. Ethics is the set of moral rules that makes this trust possible.\n\nProfessional accounting bodies publish a code of ethics that every member must follow. The code sets out five fundamental principles: integrity, objectivity, professional competence and due care, confidentiality and professional behaviour. A member who breaks the code can be fined, suspended or removed from the profession.\n\nIn the syllabus you need to know the five principles, recognise them in a scenario and explain the consequences of unethical behaviour. Most exam situations involve pressure: an owner wants a higher profit for a loan, a lower profit for tax, or a secret kept from a partner. Your job is to show how the accountant should respond.",
        },
        {
          heading: "The five fundamental principles",
          body:
            "Each principle has a short meaning and a typical way it is broken. Learn the exact names, including the full phrase professional competence and due care, because an examiner cannot give the mark for a half name. The example breaches in the table show the type of situation that appears in questions: pressure from an owner, a conflict of interest, a task beyond the accountant's skill, loose talk about a client, or conduct that damages the reputation of the profession.\n\nSometimes more than one principle is at risk. Recording false sales to please an owner breaks integrity because the record is dishonest, and also objectivity because the accountant has let pressure replace judgement. When a question asks for the principle, give the one that best fits the behaviour described, and if two clearly apply, name both and explain each in one sentence.",
          table: {
            head: ["Principle", "What it requires", "Example of a breach"],
            rows: [
              ["Integrity", "Be honest and straightforward; never record or report information you know to be false or misleading.", "A book-keeper records invented December sales of $5,000 because the owner wants a higher profit for a loan application."],
              ["Objectivity", "Judge without bias, conflict of interest or undue influence from others.", "An accountant approves a supply contract for her brother's firm without declaring the relationship."],
              ["Professional competence and due care", "Have the knowledge and skill the work needs, keep it up to date, and work carefully and thoroughly.", "A trainee prepares partnership accounts he has never studied, guesses the appropriation entries and does not ask for help."],
              ["Confidentiality", "Do not disclose or use information gained at work unless there is a legal or professional duty to do so.", "An accountant tells a friend that a client's profit has doubled, and the friend buys the client's shares."],
              ["Professional behaviour", "Obey laws and regulations and avoid any conduct that discredits the profession.", "An accountant advertises that competitors are dishonest, or ignores a legal deadline for filing a client's return."],
            ],
          },
        },
        {
          heading: "Integrity and objectivity in practice",
          body:
            "Integrity is the base of everything else. An accountant with integrity does not record a transaction that did not happen, does not leave out one that did, and does not describe a figure in a way that hides its real nature. If a manager asks for a supplier's invoice to be held back until next month so that this month's profit looks better, integrity says no. The invoice belongs to this month.\n\nObjectivity is about independence of mind. A conflict of interest exists when the accountant, or someone close to the accountant, could gain from a decision. The classic example is choosing a supplier owned by a relative, or valuing inventory for a business in which the accountant holds shares. The correct response is to declare the conflict and let someone independent make the decision. Accepting gifts or hospitality from a client or supplier also threatens objectivity, because the accountant may feel obliged to return the favour.\n\nPressure from an owner is the most common threat to both principles. The accountant should explain the effect of the request, refuse to make a false entry, keep a written record and, if the pressure continues, take the matter to a more senior person or a professional body.",
        },
        {
          heading: "Competence, due care and confidentiality",
          body:
            "Professional competence means having the knowledge the job needs. Due care means using that knowledge properly: checking calculations, meeting deadlines and following the correct standards. A book-keeper who has never prepared a manufacturing account should say so, learn how, or pass the work to someone who can. Guessing is a breach even when the guess turns out to be close. Due care also means checking your own work. A depreciation charge entered as $250 instead of $2,500 understates expenses by $2,250, and the person who made the slip is responsible for finding and correcting it.\n\nConfidentiality covers everything learned at work: profits, customer lists, salaries, plans for expansion. The information belongs to the client or employer. It must not be passed to friends, family or competitors, and it must not be used for the accountant's own benefit, for example by buying shares before good results are announced. Confidentiality continues after the accountant leaves the job.\n\nThere are limits. Information may be disclosed when the law requires it, for example to a court or the tax authority, when the client gives permission, or when a professional body investigates. Disclosure in these cases is not a breach.",
        },
        {
          heading: "Professional behaviour and the consequences of unethical conduct",
          body:
            "Professional behaviour means obeying laws and regulations and acting in a way that keeps the public's respect for the profession. Missing legal filing deadlines, making false claims in advertising, or behaving rudely and dishonestly with clients all damage that respect, even when no figure is changed.\n\nThe consequences of unethical behaviour fall on three groups. The accountant may lose his or her job, be fined or removed from the professional body, lose the right to practise and in serious cases face criminal charges for fraud. The business may lose the trust of its bank and suppliers, pay penalties or extra tax, have to restate its accounts, lose customers and in the worst case close. Users of the statements suffer because they make decisions on false information: a bank lends to a business that cannot repay, a partner receives too small a share of profit, an investor pays too much for shares, and employees may lose their jobs when the truth comes out.\n\nWhen a question asks for consequences, name the group affected and give the specific harm. Two consequences for the accountant and two for the business is a safe pattern for a four-mark answer.",
        },
        {
          heading: "A method for answering an ethical dilemma",
          body:
            "Exam questions describe a dilemma and ask what the accountant should do. Work through five moves. One: state the facts and the figure involved. Two: name the principle or principles at risk and say why. Three: show the effect on the financial statements if the request were followed, with amounts, for example profit overstated by $4,200 and trade payables understated by $4,200. Four: give the correct action. Usually this is to refuse the false entry, explain the effect to the person making the request, suggest the honest alternative and keep a written note of the conversation. Five: say what to do if the pressure continues, which is to raise the matter with a more senior person, the owners, or the professional body, and to seek advice before resigning or reporting externally.\n\nA good answer is practical. Resigning on the spot or reporting the owner to the police as a first step is not what the examiner expects. Equally, agreeing to the request and promising to fix it next year is never acceptable, because the statements for this year would be false.",
        },
        {
          heading: "How ethics and the accounting principles work together",
          body:
            "Many unethical requests are really requests to break an accounting principle. Recording next year's sales this year breaks realisation. Hiding a supplier invoice breaks matching. Valuing inventory at selling price breaks prudence. Treating the owner's private spending as a business expense to reduce tax breaks business entity. Changing the depreciation method every year to smooth profit breaks consistency. So when you analyse a dilemma, name both the ethical principle that the accountant would breach, usually integrity or objectivity, and the accounting principle that the figures would breach.\n\nThis also tells you how to calculate the damage. Apply the accounting principle correctly, compare the correct figure with the requested figure, and the difference is the misstatement. Adding the differences gives the total effect on profit, which is a common final step in a structured question.\n\nRemember that the aim of ethics is not to make profit lower. It is to make the statements true. An accountant who deliberately understates profit to help an owner pay less tax is just as unethical as one who overstates it for a loan.",
        },
      ],
      workedExamples: [
        {
          title: "Mona and the missing invoice: working through a dilemma",
          scenario:
            "Mona is the book-keeper for Farid, a sole trader who sells air conditioners. The year ends on 31 December 2026. On 28 December a supplier delivered goods and an invoice for $4,200; the goods were counted in closing inventory. Farid has applied for a bank loan and asks Mona to keep the invoice in a drawer until January so that it does not appear in the 2026 accounts. Before the request, current assets were $18,000 and current liabilities were $12,000. Work through what Mona should do.",
          steps: [
            "Facts: goods received and included in closing inventory, invoice of $4,200 dated 28 December 2026. The purchase belongs to 2026 under matching and the liability exists at the year end.",
            "Principles at risk: integrity, because Mona would knowingly leave out a real transaction; objectivity, because she would be allowing the owner's pressure to override her judgement.",
            "Effect if she agreed: purchases understated by $4,200 while closing inventory still includes the goods, so cost of sales is understated and profit overstated by $4,200. Trade payables understated by $4,200.",
            "Effect on the bank's view: the current ratio would appear as $18,000 divided by $12,000 = 1.5 to 1 instead of the true $18,000 divided by $16,200 = 1.11 to 1. The bank would think Farid is more liquid and more profitable than he is.",
            "Correct action: record the invoice in December. Explain to Farid that the statements must show the true position, that the bank could discover the omission and refuse future credit, and that hiding a liability may be fraud. Keep a written note of the request and the conversation. If Farid insists, Mona should refuse to prepare the false accounts and seek advice from a professional body.",
          ],
          answer:
            "Mona must record the $4,200 invoice in 2026. Agreeing would overstate profit by $4,200, understate trade payables by $4,200 and mislead the bank, breaching integrity and objectivity. She should refuse, explain the consequences, document the request and escalate if the pressure continues.",
        },
        {
          title: "Which principle has been broken? Five short cases",
          scenario:
            "For each case name the ethical principle that has been breached and explain in one sentence. (1) Ahmed, an accountant, buys shares in a client company the day before he finishes auditing its excellent results. (2) Noor files a client's annual return three months late because she forgot the deadline. (3) Sami, who prepares the accounts of a shop, also owns the shop next door and advises the owner to set prices that help his own shop. (4) Leila backdates a sales invoice from 2 January 2027 to 30 December 2026 at the owner's request. (5) Tarek writes online that all accountants at a rival firm are cheats, without any evidence.",
          steps: [
            "Case 1: Confidentiality. Ahmed used information gained at work for his personal gain before it was public. It is also a breach of objectivity because he now has a personal interest in the client.",
            "Case 2: Professional competence and due care. Noor failed to work carefully and meet a legal deadline, which may cost the client a penalty. Missing a legal requirement also touches professional behaviour.",
            "Case 3: Objectivity. Sami has a conflict of interest between his duty to his client and his own business, and he allowed his own interest to influence his advice.",
            "Case 4: Integrity. Leila knowingly created a false document so that 2027 revenue appears in 2026, which also breaks the realisation principle.",
            "Case 5: Professional behaviour. Making unproven public accusations brings the profession into disrepute and may break the law on defamation.",
          ],
          answer: "1 confidentiality (and objectivity); 2 professional competence and due care; 3 objectivity; 4 integrity; 5 professional behaviour.",
        },
        {
          title: "Rania and confidentiality: when may information be shared?",
          scenario:
            "Rania is the accountant of Palm Textiles, a partnership. In one week: (1) her cousin, who is thinking of buying into the partnership, asks what profit it made last year; (2) the tax authority sends a formal written request for the partnership's sales records; (3) a new accountant is taking over from Rania and the partners have asked her in writing to hand over all records; (4) at a family dinner her uncle asks whether Palm Textiles is about to open a branch abroad, which Rania knows is being planned secretly. Decide what Rania may say in each case.",
          steps: [
            "Rule: information gained at work must not be disclosed or used unless there is a legal or professional duty to disclose, or the client has given permission.",
            "Case 1: Refuse. The cousin has no right to the information and could use it to negotiate a better price. Rania should tell the cousin to ask the partners directly.",
            "Case 2: Comply. A lawful request from the tax authority is a legal duty to disclose, so providing the records is not a breach. Rania should keep a copy of the request.",
            "Case 3: Comply. The partners, who own the information, have given written permission for the handover to their new accountant.",
            "Case 4: Refuse. The branch plan is confidential business information. Even a hint could reach competitors or landlords. Rania should say she cannot discuss the business.",
          ],
          answer: "Share nothing in cases 1 and 4; disclose in cases 2 and 3 because there is a legal duty and the owners' written permission respectively.",
        },
        {
          title: "Due care: Hadi checks his own provision calculation",
          scenario:
            "Hadi, a trainee, prepared the year-end provision for doubtful debts for Giza Supplies. Trade receivables were $31,500 and the policy is a provision of 4 per cent. In his spreadsheet Hadi typed $13,500 instead of $31,500. The accounts were sent to the owner showing a provision of $540. Hadi noticed the error a week later. Nobody else has seen it. Explain what he should do and the effect of the error.",
          steps: [
            "Correct provision: 4 per cent of $31,500 = $1,260. Hadi's figure: 4 per cent of $13,500 = $540. The provision is understated by $1,260 less $540 = $720.",
            "Effect: the expense for the increase in provision is understated by $720, so profit for the year is overstated by $720, and trade receivables net of provision are overstated by $720 in the statement of financial position.",
            "Principle: professional competence and due care required Hadi to check his inputs before sending the accounts. Now that he knows, integrity requires him to report the error rather than hope nobody notices.",
            "Action: tell his supervisor immediately, prepare a corrected provision of $1,260, issue corrected statements to the owner and explain the change. Keeping quiet would turn a careless mistake into a dishonest one.",
            "Lesson: build checks into the work, for example comparing the provision with last year's figure or re-reading inputs against the ledger, so that a typing slip is caught before the accounts leave the office.",
          ],
          answer: "Provision should be $1,260, not $540; profit overstated by $720. Hadi must report and correct the error at once. Due care means checking inputs; integrity means owning up to the mistake.",
        },
      ],
      commonErrors: [
        { error: "Writing honesty or fairness as the name of a principle.", fix: "Use the exact names: integrity, objectivity, professional competence and due care, confidentiality, professional behaviour." },
        { error: "Advising the accountant to resign or go to the police as the first step.", fix: "The first steps are to refuse the false entry, explain the effect, record the conversation and escalate internally. External reporting and resignation come only if the pressure continues." },
        { error: "Saying confidentiality means never telling anyone anything.", fix: "Disclosure is allowed when the law requires it, when the client permits it or when a professional body investigates. Say so when the question involves a tax authority or a court." },
        { error: "Describing the consequence of an unethical request without figures.", fix: "Calculate it: profit overstated by $4,200, trade payables understated by $4,200. The amount is usually a mark on its own." },
        { error: "Thinking that making profit lower is always the ethical choice.", fix: "Ethics requires the true figure. Deliberately understating profit to reduce tax is as unethical as overstating it for a loan." },
      ],
      examTips: [
        "Name the ethical principle and the accounting principle when a request would misstate a figure, for example integrity and realisation for backdated sales.",
        "For a what should the accountant do question, give a sequence of actions: refuse, explain the effect, suggest the correct treatment, document, escalate.",
        "For consequences, cover more than one group: the accountant, the business and the users. One specific harm for each is worth more than a general comment.",
        "When figures are given, calculate the misstatement for each item and total it. The total is often the last mark in the part.",
        "Read who is making the request. Pressure from an owner, a relative or a client points to objectivity as well as integrity.",
      ],
      exercises: [
        {
          id: "ex-7.2-1",
          type: "explain",
          marks: 2,
          prompt: "Define integrity as an ethical principle for accountants and give one example of behaviour that shows it.",
          model: "Integrity means being honest and straightforward in all professional work and never knowingly recording or reporting false or misleading information. Example: an accountant refuses to leave an unpaid supplier invoice out of the year-end accounts even though the owner asks her to.",
          points: ["Honest and straightforward; does not knowingly record or report false or misleading information (1)", "Valid example such as refusing to omit a real liability or invent a sale (1)"],
        },
        {
          id: "ex-7.2-2",
          type: "explain",
          marks: 2,
          prompt: "Name the ethical principle breached in each case. (i) A payroll clerk posts a photograph of the staff salary list on social media. (ii) An accountant signs a set of accounts without checking the figures because he is in a hurry.",
          model: "(i) Confidentiality: salary details gained at work were disclosed to outsiders. (ii) Professional competence and due care: the work was not done carefully and thoroughly.",
          points: ["(i) Confidentiality (1)", "(ii) Professional competence and due care (1)"],
        },
        {
          id: "ex-7.2-3",
          type: "explain",
          marks: 3,
          prompt: "Nour is the accountant of a hotel and is asked to choose between three firms bidding to supply the hotel's food. One firm is owned by her brother. Explain the ethical problem and what Nour should do.",
          model: "Nour has a conflict of interest, which threatens her objectivity: her family link could influence her judgement, or others could believe it did, even if her brother's firm is genuinely the best. She should declare the relationship to the hotel owner or manager in writing and withdraw from the decision, letting an independent person compare the bids. If she stays involved, her decision could be challenged and the hotel might not get the best value.",
          points: ["Conflict of interest threatening objectivity (1)", "Declare the relationship to the owner or manager (1)", "Withdraw from the decision so an independent person chooses (1)"],
        },
        {
          id: "ex-7.2-4",
          type: "explain",
          marks: 4,
          prompt: "Explain two consequences for an accountant and two consequences for a business when the accountant prepares deliberately misleading financial statements.",
          model: "Accountant: she may be dismissed by her employer and may be fined, suspended or removed from membership of her professional body, which ends her right to practise; in serious cases she may face prosecution for fraud. Business: the bank and suppliers may withdraw credit once the truth is found, the business may have to pay penalties or back taxes and restate its accounts, its reputation with customers suffers and it may be unable to continue trading.",
          points: ["Accountant: dismissal or loss of job (1)", "Accountant: disciplinary action by professional body, loss of membership, or prosecution (1)", "Business: loss of trust and credit from bank, suppliers or investors (1)", "Business: penalties, back taxes, restated accounts, damaged reputation or closure (1)"],
        },
        {
          id: "ex-7.2-5",
          type: "calculation",
          marks: 4,
          prompt: "Walid, a sole trader with a year end of 31 December 2026, asks his book-keeper to record credit sales of $9,000 made on 4 January 2027 as if they were made on 31 December 2026. State the effect on profit for 2026 and on the statement of financial position at 31 December 2026 if the book-keeper agrees, and name one ethical principle and one accounting principle that would be broken.",
          model: "Revenue and therefore profit for 2026 would be overstated by $9,000. Trade receivables, and so current assets, at 31 December 2026 would be overstated by $9,000, making the current ratio and the owner's capital look better than they are. The book-keeper would breach integrity by recording a transaction on a false date. The accounting principle broken is realisation, because revenue is recognised only when the goods are delivered, which was in 2027.",
          points: ["Profit for 2026 overstated by $9,000 (1)", "Trade receivables and current assets at 31 December 2026 overstated by $9,000 (1)", "Integrity (or objectivity) breached (1)", "Realisation principle broken (1)"],
        },
        {
          id: "ex-7.2-6",
          type: "explain",
          marks: 5,
          prompt: "A manager tells the assistant accountant to leave an accrued expense of $1,750 out of the year-end accounts so that the department meets its profit target. Describe five actions the assistant should take, in order.",
          model: "First, refuse to leave the accrual out and record the $1,750 correctly, because matching requires the expense in this year. Second, explain to the manager that omitting it would overstate profit by $1,750 and understate current liabilities by the same amount, misleading the owners. Third, suggest the honest alternative: report the true profit and explain why the target was missed. Fourth, make a written note of the request, the date and the reply, in case the matter is questioned later. Fifth, if the manager continues to insist, report the pressure to a more senior person or the owners and, if necessary, seek guidance from the professional body.",
          points: ["Refuse and record the accrual of $1,750 correctly (1)", "Explain the effect: profit overstated and liabilities understated by $1,750 (1)", "Suggest the honest alternative of reporting the true result (1)", "Keep a written record of the request and response (1)", "Escalate to senior management or owners, and seek professional body advice if pressure continues (1)"],
        },
        {
          id: "ex-7.2-7",
          type: "explain",
          marks: 5,
          prompt: "Explain why confidentiality is important for accountants. Then state, with a reason, whether an accountant may disclose a client's information in each of these cases: (i) a court orders the accountant to produce the client's records; (ii) a friend wants to know the client's profit before buying its shares; (iii) the client asks the accountant in writing to send the accounts to a new bank.",
          model: "Confidentiality matters because clients and employers give accountants access to private information such as profits, prices and plans. They would not do so if it could be passed on, and leaked information could be used by competitors or to make unfair gains. (i) Yes: a court order is a legal duty to disclose, so complying is not a breach. (ii) No: the friend has no right to the information and would gain an unfair advantage over other investors. (iii) Yes: the client owns the information and has given written permission.",
          points: ["Clients share private information only because they trust it will not be passed on (1)", "Leaked information could help competitors or give unfair gains (1)", "(i) Yes, legal duty under a court order (1)", "(ii) No, no right to the information and unfair advantage (1)", "(iii) Yes, client has given permission (1)"],
        },
        {
          id: "ex-7.2-8",
          type: "explain",
          marks: 6,
          prompt: "Yara is the accountant of a sports shop. While checking the cash book against bank statements she finds that cash sales of $1,350 recorded in the cash book never reached the bank. The evidence points to the cashier, who is her close friend. Explain what Yara should do and which ethical principles guide her.",
          model: "Yara must not ignore the discrepancy or cover it up for her friend. Objectivity requires her to set aside the friendship and deal with the evidence as she would for any employee, and integrity requires her to report the truth. She should first confirm the facts: re-check the cash book, the bank statements and the paying-in records to be sure that $1,350 is missing and that there is no innocent explanation such as a delayed lodgement. She should then report her findings and evidence to the owner, who decides what action to take, rather than confronting or warning the cashier herself. Due care means documenting every step. Confidentiality means she discusses the matter only with the owner and anyone the owner authorises, not with other staff. Hiding the loss would make her part of the dishonesty and the statements would overstate bank by $1,350.",
          points: ["Must not ignore or hide the discrepancy because of friendship (1)", "Objectivity: treat the evidence without bias from the personal relationship (1)", "Integrity: report the truth honestly (1)", "Confirm the facts carefully before concluding, due care (1)", "Report findings and evidence to the owner rather than acting alone or warning the friend (1)", "Keep the matter confidential within those who need to know; otherwise bank would be overstated by $1,350 and she would share the dishonesty (1)"],
        },
        {
          id: "ex-7.2-9",
          type: "explain",
          marks: 8,
          prompt:
            "Hassan, a sole trader, is applying for a bank loan. His draft profit for the year ended 31 December 2026 is $22,300. He asks his book-keeper to make three changes: (1) leave out an accrued electricity bill of $640; (2) value closing inventory at its expected selling price of $11,500 instead of its cost of $8,000; (3) record $5,000 of capital Hassan paid into the business in November as cash sales. Calculate the effect of each change on profit and the profit Hassan wants to show. Name the ethical principles and the accounting principles involved, and explain how the book-keeper should respond.",
          model:
            "Effects: (1) omitting the accrual increases profit by $640; (2) inventory at selling price increases closing inventory and profit by $11,500 less $8,000 = $3,500; (3) treating capital as sales increases revenue and profit by $5,000. Total overstatement $640 plus $3,500 plus $5,000 = $9,140, so the profit Hassan wants to show is $22,300 plus $9,140 = $31,440 against a true profit of $22,300. Ethical principles: the book-keeper would breach integrity by recording false figures and objectivity by giving in to the owner's pressure. Accounting principles: (1) breaks matching, (2) breaks prudence, because inventory must be at the lower of cost and net realisable value, and (3) breaks business entity, because capital introduced by the owner is not income of the business. Response: refuse all three changes, explain to Hassan that the bank would be misled into lending on a profit that is 41 per cent too high, that the bank may discover the misstatement and withdraw support, and that false statements to obtain a loan may be fraud. Keep a written note of the request and, if Hassan insists, decline to prepare the accounts and seek advice from a professional body.",
          points: ["(1) Profit overstated by $640 (1)", "(2) Profit overstated by $3,500 (1)", "(3) Profit overstated by $5,000 (1)", "Total overstatement $9,140 and requested profit $31,440 (1)", "Integrity and objectivity identified (1)", "Matching, prudence and business entity identified (1)", "Refuse and explain the effect on the bank and the risk of fraud (1)", "Document the request and escalate or decline to act if pressure continues (1)"],
        },
        {
          id: "ex-7.2-10",
          type: "explain",
          marks: 10,
          prompt:
            "Samira is the assistant accountant at Delta Tiles. In one month the following happens. (1) Her manager asks her to change the inventory count sheets so that 400 cracked tiles costing $3 each are counted as perfect. (2) She overhears that Delta Tiles is about to buy a competitor and her cousin asks her whether it is true. (3) A supplier sends Samira a gift voucher worth $300 shortly before she reviews its prices for next year. (4) Her manager asks her to prepare a cash budget, which she has never done. For each event name the ethical principle most at risk and explain the action Samira should take. Then explain two consequences for users of the financial statements if Samira does what the manager asks in event (1).",
          model:
            "(1) Integrity. Changing count sheets records a false fact. The cracked tiles cost 400 multiplied by $3 = $1,200 and must be valued at their lower net realisable value, perhaps nil, under prudence. Samira should refuse, record the tiles correctly, explain that inventory and profit would otherwise be overstated by up to $1,200, and note the request. (2) Confidentiality. The takeover is private information learned at work. Samira should tell her cousin that she cannot discuss company matters and must not confirm or deny the rumour. (3) Objectivity. The gift creates a conflict of interest because Samira may feel she owes the supplier a favour when reviewing prices. She should decline or return the voucher, or declare it to her manager and ask for someone else to carry out the review. (4) Professional competence and due care. Samira should tell her manager that she has not prepared a cash budget before, ask for guidance or training, work from a reliable example and have her work checked, rather than guessing. Consequences of event (1) for users: the owners would see a profit overstated by up to $1,200 and might take drawings the business cannot afford; a bank or supplier reading the statements would overstate current assets and the current ratio and might grant credit on false information.",
          points: ["(1) Integrity named (1)", "(1) Refuse, value the 400 tiles at lower NRV, explain overstatement of up to $1,200 (1)", "(2) Confidentiality named (1)", "(2) Decline to confirm or deny the takeover to the cousin (1)", "(3) Objectivity named (1)", "(3) Decline or declare the $300 voucher and step aside from the review (1)", "(4) Professional competence and due care named (1)", "(4) Admit lack of experience, seek guidance or training and have the work checked (1)", "Consequence: owners misled by overstated profit, for example excessive drawings (1)", "Consequence: bank or suppliers misled by overstated current assets and current ratio when granting credit (1)"],
        },
      ],
      mcq: [
        {
          id: "mcq-7.2-1",
          question: "A book-keeper refuses to record sales that never took place even though the owner insists. Which ethical principle is she demonstrating most directly?",
          choices: ["Integrity", "Confidentiality", "Professional behaviour", "Professional competence and due care"],
          explanation: "Integrity is honesty in recording and reporting. The other principles do not directly concern refusing to record false transactions.",
        },
        {
          id: "mcq-7.2-2",
          question: "An accountant recommends that his employer buys all its vehicles from a garage owned by his cousin, without telling anyone about the relationship. Which principle has he breached?",
          choices: ["Objectivity", "Confidentiality", "Integrity", "Professional behaviour"],
          explanation: "A hidden conflict of interest threatens objectivity because his judgement may be influenced by family interest. No confidential information was disclosed.",
        },
        {
          id: "mcq-7.2-3",
          question: "A newly qualified book-keeper accepts a job preparing complex limited company accounts she has never studied and does not ask for help. Which principle is most at risk?",
          choices: ["Professional competence and due care", "Objectivity", "Confidentiality", "Integrity"],
          explanation: "Taking on work without the necessary knowledge and skill breaches professional competence and due care. She is not being dishonest or biased.",
        },
        {
          id: "mcq-7.2-4",
          question: "An accountant tells a friend over dinner that a client's profit has doubled this year. Which principle has been breached?",
          choices: ["Confidentiality", "Objectivity", "Professional behaviour", "Integrity"],
          explanation: "Information gained at work was disclosed to an outsider without permission or legal duty. That is a breach of confidentiality.",
        },
        {
          id: "mcq-7.2-5",
          question: "An accountant publishes an advertisement claiming that a rival firm cheats its clients, with no evidence. Which principle has been breached?",
          choices: ["Professional behaviour", "Confidentiality", "Objectivity", "Professional competence and due care"],
          explanation: "Making unproven public accusations brings the profession into disrepute and may break the law, which is a breach of professional behaviour.",
        },
        {
          id: "mcq-7.2-6",
          question: "Which of the following is an accounting principle rather than one of the five fundamental ethical principles?",
          choices: ["Prudence", "Integrity", "Objectivity", "Confidentiality"],
          explanation: "Prudence is an accounting principle for valuing assets and measuring profit. The other three are ethical principles from the professional code.",
        },
        {
          id: "mcq-7.2-7",
          question: "Which is a likely consequence for an accountant who deliberately prepares misleading financial statements?",
          choices: ["Removal from membership of the professional body", "Automatic promotion by the employer", "Increased trust from banks", "Lower depreciation charges"],
          explanation: "Professional bodies discipline members who breach the code, including fines, suspension or removal. The other options are not consequences of unethical behaviour.",
        },
        {
          id: "mcq-7.2-8",
          question: "An owner asks the book-keeper to leave a $3,000 supplier invoice for goods already received and counted in inventory out of the year-end accounts. If the book-keeper agrees, what is the effect?",
          choices: ["Profit overstated by $3,000 and trade payables understated by $3,000", "Profit understated by $3,000 and trade payables overstated by $3,000", "Profit overstated by $3,000 and trade payables overstated by $3,000", "No effect on profit; only the bank balance is wrong"],
          explanation: "Purchases are understated while the goods remain in closing inventory, so cost of sales is too low and profit too high by $3,000. The unpaid invoice is a missing liability of $3,000.",
        },
        {
          id: "mcq-7.2-9",
          question: "A manager pressures an assistant accountant to overstate closing inventory. What should the assistant do first?",
          choices: ["Refuse, record the correct figure and explain the effect to the manager", "Make the entry but keep a private note to correct it next year", "Resign immediately without discussing the matter", "Report the manager to the business's competitors"],
          explanation: "The first steps are to refuse the false entry, explain the consequences and document the request. Resignation or external action comes only if pressure continues, and agreeing is never acceptable.",
        },
        {
          id: "mcq-7.2-10",
          question: "In which situation may an accountant disclose a client's financial information without breaching confidentiality?",
          choices: ["When a court or the tax authority legally requires it", "When a close friend wants to invest in the client", "When the accountant disagrees with the client's decisions", "When a competitor offers to pay for the information"],
          explanation: "Disclosure is permitted when there is a legal duty, when the client gives permission or when a professional body investigates. The other situations are clear breaches.",
        },
      ],
      structured: [
        {
          id: "sq-7.2-1",
          title: "Dalia and the year-end at Nile Paints",
          stimulus:
            "Dalia is the book-keeper of Nile Paints, a sole trader business owned by Farouk. The financial year ends on 31 December 2026 and the draft profit for the year is $18,900. Farouk is applying to his bank for a loan of $40,000 and has told Dalia that the bank wants to see a profit of at least $30,000. He asks her to make three changes before the statements go to the bank. (1) Record credit sales of $6,800 made and delivered on 3 and 4 January 2027 as December 2026 sales. (2) Leave out a supplier's invoice of $2,150 for goods received on 22 December 2026, which have been counted in closing inventory. (3) Increase closing inventory from its cost of $14,000 to its expected selling price of $19,600. Farouk says the changes are harmless because the sales and payment will all happen within a few weeks anyway.",
          parts: [
            {
              label: "a",
              marks: 6,
              prompt: "Explain the meaning of each of the following ethical principles: integrity, objectivity, and professional competence and due care.",
              model:
                "Integrity means being honest and straightforward in all professional work and never knowingly producing records or statements that are false or misleading. Objectivity means making judgements without bias, conflict of interest or pressure from others such as an employer or client. Professional competence and due care means having and maintaining the knowledge and skill needed for the work, and carrying out every task carefully, thoroughly and in line with the proper standards.",
              points: ["Integrity: honest and straightforward (1)", "Integrity: never knowingly false or misleading information (1)", "Objectivity: no bias or conflict of interest (1)", "Objectivity: not influenced by pressure from others (1)", "Competence: possess and maintain the knowledge and skill required (1)", "Due care: work carefully, thoroughly and to proper standards (1)"],
            },
            {
              label: "b",
              marks: 6,
              prompt: "For each of Farouk's three requests, calculate the effect on the profit for the year ended 31 December 2026 and name the accounting principle that would be broken. Calculate the profit Farouk wants to show.",
              model:
                "(1) Profit overstated by $6,800; realisation is broken because the goods were delivered in 2027, so the revenue belongs to 2027. (2) Profit overstated by $2,150; matching is broken because the purchase relates to goods received in 2026 and included in closing inventory, and the liability to the supplier is left out. (3) Profit overstated by $19,600 less $14,000 = $5,600; prudence is broken because inventory must be valued at the lower of cost and net realisable value, so expected profit must not be recognised before the goods are sold. Total overstatement $6,800 plus $2,150 plus $5,600 = $14,550. Profit Farouk wants to show: $18,900 plus $14,550 = $33,450, compared with a true profit of $18,900.",
              points: ["(1) Profit overstated by $6,800 (1)", "(1) Realisation (1)", "(2) Profit overstated by $2,150 and matching (1)", "(3) Profit overstated by $5,600 (1)", "(3) Prudence, lower of cost and NRV (1)", "Total overstatement $14,550 and requested profit $33,450 (1)"],
            },
            {
              label: "c",
              marks: 4,
              prompt: "Explain what Dalia should do in response to Farouk's requests.",
              model:
                "Dalia should refuse to make any of the three changes and prepare the statements showing the true profit of $18,900. She should explain to Farouk that the changes would overstate profit by $14,550, understate trade payables by $2,150 and overstate trade receivables and inventory, so the bank would be lending on false information; that obtaining a loan with false statements may be fraud; and that the bank may discover the misstatements and withdraw its support. She should keep a dated written note of the request and her reply. If Farouk insists, she should decline to prepare the false statements and seek advice from her professional body.",
              points: ["Refuse the changes and prepare the true figures (1)", "Explain the effect on the bank and the risk of fraud or loss of the bank's support (1)", "Keep a written record of the request and response (1)", "If pressure continues, decline to act and seek advice from the professional body (1)"],
            },
            {
              label: "d",
              marks: 4,
              prompt: "Explain the possible consequences for Nile Paints and for Farouk if the altered statements were sent to the bank and the bank later discovered the truth.",
              model:
                "The bank could demand immediate repayment of the loan and refuse any future lending or overdraft, leaving Nile Paints short of cash. Farouk's reputation would be damaged, so suppliers might refuse credit and insist on cash payment, which would worsen liquidity further. Farouk could face legal action for obtaining money by false statements, with fines or prosecution. The business might be unable to continue trading, and employees could lose their jobs.",
              points: ["Bank demands repayment or refuses future credit, causing cash shortage (1)", "Loss of reputation leading suppliers to withdraw credit (1)", "Legal action, fines or prosecution for fraud against Farouk (1)", "Business may fail to continue and employees lose jobs (1)"],
            },
          ],
        },
        {
          id: "sq-7.2-2",
          title: "Ziad, trainee at Horizon Accountants",
          stimulus:
            "Ziad is a trainee at Horizon Accountants, a firm that prepares accounts for small businesses. During March 2027 the following events occur. (1) A partner of the firm asks Ziad to prepare the statement of changes in equity for a limited company client; Ziad has never studied limited company accounts. (2) Ziad's neighbour, who wants to invest in Suez Bakeries, a client of the firm, asks Ziad how much profit the bakery made last year. (3) Mr Adel, a sole trader client, offers Ziad a free week's holiday if he leaves cash sales of $7,400 out of the accounts so that Mr Adel pays less tax. (4) Ziad discovers that in February he calculated depreciation on a client's equipment as $1,200 instead of 15 per cent of $12,000, and the accounts have already been sent to the client; nobody else has noticed.",
          parts: [
            {
              label: "a",
              marks: 4,
              prompt: "For each of the four events, name the ethical principle most at risk.",
              model: "(1) Professional competence and due care. (2) Confidentiality. (3) Integrity (objectivity is also threatened by the gift). (4) Professional competence and due care, with integrity now that he knows about the error.",
              points: ["(1) Professional competence and due care (1)", "(2) Confidentiality (1)", "(3) Integrity, or objectivity (1)", "(4) Professional competence and due care, or integrity (1)"],
            },
            {
              label: "b",
              marks: 6,
              prompt: "Explain what Ziad should do in event (1) and in event (3).",
              model:
                "Event (1): Ziad should tell the partner honestly that he has not studied limited company accounts, so he cannot yet do the work to the required standard. He should ask for training or supervision, or for the task to be given to a qualified colleague, and if he does prepare a draft it must be checked by someone competent before it goes to the client. Guessing and hoping the result is right would breach due care. Event (3): Ziad should refuse the holiday and refuse to omit the $7,400 of sales. Leaving out real sales would make the accounts false and would help the client evade tax, breaking integrity and the law. The gift is an attempt to influence his judgement, so he should report the offer to a partner of the firm and record it in writing. If Mr Adel continues to insist, the firm should consider whether it can continue to act for him.",
              points: ["(1) Admit lack of knowledge to the partner (1)", "(1) Request training, supervision or reassignment to a competent colleague (1)", "(1) Any work done must be reviewed by a competent person before release (1)", "(3) Refuse the gift and refuse to omit the $7,400 sales (1)", "(3) Omission would make accounts false and assist tax evasion, breaching integrity and the law (1)", "(3) Report the offer to a partner and document it; firm may cease to act (1)"],
            },
            {
              label: "c",
              marks: 6,
              prompt: "Calculate the size of the error in event (4) and its effect on the client's profit and statement of financial position. Explain what Ziad should do about it.",
              model:
                "Correct depreciation: 15 per cent of $12,000 = $1,800. Ziad charged $1,200, so the expense is understated by $1,800 less $1,200 = $600. Profit for the year is therefore overstated by $600, and the carrying value of the equipment in the statement of financial position is overstated by $600 because the provision for depreciation is too small. Ziad should report the error to his supervisor immediately, even though nobody has noticed, because integrity requires him to be honest about his own mistakes. The firm should prepare corrected statements for the client and explain the change. Hiding the error would turn a careless mistake into dishonesty and could damage the firm if the client or the tax authority found it later. In future Ziad should check his calculations against the client's depreciation policy before the accounts are released.",
              points: ["Correct charge $1,800 (1)", "Expense understated by $600 (1)", "Profit overstated by $600 and carrying value of equipment overstated by $600 (1)", "Report the error to the supervisor at once, showing integrity (1)", "Issue corrected statements to the client with an explanation (1)", "Hiding it would become dishonesty; introduce checks against policy to show due care (1)"],
            },
            {
              label: "d",
              marks: 4,
              prompt: "Explain the possible consequences for Horizon Accountants if Ziad accepted Mr Adel's offer and the omission was later discovered by the tax authority.",
              model:
                "The firm's reputation for honesty would be damaged, and other clients might move to a competitor. The professional body could investigate and discipline the firm and its partners, with fines or loss of membership. The firm could face legal action for assisting tax evasion and might have to pay penalties or compensation. Banks and the tax authority would trust the firm's other work less, so every set of accounts it prepares could face extra checking.",
              points: ["Loss of reputation and loss of other clients (1)", "Investigation and discipline by the professional body, fines or loss of membership (1)", "Legal action or penalties for assisting tax evasion (1)", "Reduced trust in all the firm's work from banks and authorities (1)"],
            },
          ],
        },
      ],
    },
    {
      section: "7.3",
      title: "Technology in accounting",
      summary:
        "Information and communication technology (ICT) has changed how accounting records are kept. Spreadsheets, accounting software and cloud systems can record transactions, post the double entry automatically and produce statements in seconds. They also bring new costs and risks: set-up and training costs, dependence on power and internet, and the danger of data being lost, stolen or corrupted. You need to compare the tools, weigh advantages against disadvantages and explain how data is kept secure.",
      objectives: [
        "Describe how spreadsheets, accounting software and cloud accounting systems are used in accounting.",
        "Explain the advantages of using ICT to keep accounting records and produce financial statements.",
        "Explain the disadvantages and risks of relying on ICT.",
        "Recommend a suitable system for a given business and justify the choice.",
        "Explain the importance of data security and describe measures that protect accounting data.",
        "Calculate and compare the costs of alternative systems over a period of time.",
      ],
      keyTerms: [
        { term: "ICT", definition: "Information and communication technology: the computers, software and networks used to record, process, store and share information." },
        { term: "Spreadsheet", definition: "A computer program that stores data in a grid of cells and performs calculations with formulas that update automatically when inputs change." },
        { term: "Accounting software", definition: "A program designed for book-keeping that records each transaction once and automatically posts the double entry, updates the ledgers and produces reports." },
        { term: "Cloud accounting", definition: "Accounting software that runs on the provider's servers and is used through the internet, usually for a monthly subscription, so data can be reached from any connected device." },
        { term: "Data security", definition: "Protecting accounting data from loss, theft, damage and unauthorised access or change." },
        { term: "Backup", definition: "A separate copy of data, kept in a different place, from which records can be restored if the original is lost or damaged." },
        { term: "Encryption", definition: "Scrambling data so that it can only be read by someone with the correct key or password." },
        { term: "Access level", definition: "A setting that limits what each user of a system is allowed to see or do, for example entering invoices but not approving payments." },
        { term: "Audit trail", definition: "A record kept by the software of who entered or changed each transaction and when, so that errors and fraud can be traced." },
        { term: "Garbage in, garbage out", definition: "The idea that a computer processes whatever it is given, so wrong input produces wrong output however powerful the system." },
      ],
      notes: [
        {
          heading: "From handwritten ledgers to digital records",
          body:
            "Everything you have learned in this course, from the journal to the statement of financial position, was designed for paper. Today most businesses keep the same records with technology. The principles do not change: there is still a debit and a credit for every transaction, still a trial balance, still a closing inventory adjustment. What changes is who does the arithmetic and how quickly the information appears.\n\nThe syllabus asks you to understand three tools. A spreadsheet is a flexible grid for calculations and simple records. Accounting software is a dedicated program that keeps the ledgers and produces statements. A cloud system is accounting software delivered over the internet. Each suits a different size of business and each has strengths and weaknesses.\n\nYou are not expected to know any particular product. You are expected to explain what the tools do, compare them, recommend one for a described business and discuss the risks, especially the security of data. Questions often give figures, such as subscription costs or hours saved, and ask you to support your recommendation with a calculation.",
        },
        {
          heading: "Spreadsheets: flexible but unprotected",
          body:
            "A spreadsheet holds data in cells arranged in rows and columns. A formula in one cell can add, multiply or compare other cells, and when an input changes the result updates at once. Accountants use spreadsheets for depreciation schedules, budgets, ratio analysis, petty cash records and for small businesses a complete cash book with analysis columns. Templates can be built once and reused every month, and charts can show trends to an owner who does not read ledgers easily.\n\nThe weakness of a spreadsheet is that it does not understand accounting. It will not stop a one-sided entry, it does not keep a sales ledger linked to a control account, and it does not warn you when a formula points at the wrong cell. A single typing error in a formula can make every total wrong while the sheet still looks tidy. Spreadsheets are also easy to change without any record of who changed what, which makes fraud and accidental damage hard to trace. They suit very small businesses with few transactions and owners who check their work carefully.",
        },
        {
          heading: "Accounting software: one entry, many postings",
          body:
            "Accounting software is built around the ledger. When a user enters a sales invoice once, the program records the sale in the sales journal, debits the customer's account in the sales ledger, credits the sales account and updates the sales ledger control account and the trial balance. Inventory can be reduced at the same time. The double entry is automatic, so the trial balance always agrees and arithmetic errors disappear.\n\nThe software also produces documents and reports on demand: invoices, statements of account, aged lists of trade receivables showing who is late in paying, a bank reconciliation screen, the statement of profit or loss and the statement of financial position. Many programs keep an audit trail, recording who entered or changed each item and when, which helps the owner detect mistakes and fraud. Access levels let a junior clerk enter purchases but not approve payments.\n\nThe program cannot judge. If a clerk codes the purchase of a van to motor expenses, the software posts an error of principle perfectly. If an amount is typed as $5,400 instead of $4,500, both sides of the entry are equally wrong and the trial balance still agrees. Human checks remain essential.",
        },
        {
          heading: "Cloud accounting: the same software, delivered over the internet",
          body:
            "Cloud accounting means the software and the data are kept on the provider's servers, not on the business's own computer. The user logs in through a web browser or an app and pays a monthly or annual subscription. Because the data is online, the owner, the book-keeper and the external accountant can all see the same figures at the same time from different places. Bank transactions can feed straight into the system, so reconciliation is quicker. The provider installs updates, so the business always has the latest version, and the provider usually makes regular backups.\n\nThe disadvantages are the mirror image of the advantages. Without an internet connection the records cannot be reached. The subscription continues for as long as the business uses the system, so over many years it can cost more than a one-off licence. The business depends on the provider staying in business and keeping the servers secure, and some owners worry about their data being stored by an outside company, possibly in another country. Strong passwords and two-step login are essential, because anyone who learns the login details can reach the data from anywhere.",
        },
        {
          heading: "Advantages and disadvantages of ICT in accounting",
          body:
            "When a question asks you to discuss ICT, give balanced points and link each to its effect on the business. An advantage such as speed matters because an owner can see this month's profit on the first of next month and act on it. A disadvantage such as set-up cost matters because a very small business may not recover it. The table lists the points most often rewarded. Choose the ones that fit the scenario, explain each in a sentence, and finish with a conclusion if the question asks for a recommendation.\n\nRemember that many disadvantages can be reduced with good management: training reduces input errors, backups reduce the risk of loss, and access controls reduce fraud. Saying how a risk can be managed often earns an extra mark in an evaluation question.",
          table: {
            head: ["Advantages of ICT", "Disadvantages and risks of ICT"],
            rows: [
              ["Speed: transactions are posted and statements produced in seconds, so information is available sooner for decisions.", "Cost: hardware, software licences or subscriptions, and installation can be expensive for a small business."],
              ["Accuracy: arithmetic is done by the computer and the double entry is automatic, so the trial balance always agrees.", "Training: staff need time and money to learn the system, and productivity falls while they learn."],
              ["Reduced labour: fewer hours of clerical work are needed, lowering wage costs or freeing staff for other work.", "Input errors: wrong amounts or wrong account codes are processed without question; garbage in, garbage out."],
              ["Reports on demand: aged receivables, budget comparisons and ratios can be produced instantly in a clear format.", "Breakdown and dependence: a power cut, hardware failure or internet loss can stop all work."],
              ["Storage: years of records take no shelf space and can be searched in moments.", "Data loss and security: viruses, hacking, theft of equipment and accidental deletion can destroy or expose records."],
              ["Access and sharing: cloud systems let the owner, staff and the accountant work on the same data from different places.", "Fraud risk: a dishonest user with wide access can alter records; systems must have access levels and an audit trail."],
              ["Integration: invoices, inventory, payroll and bank feeds can link together, removing repeated entry.", "Obsolescence: software must be updated or replaced over time, adding further cost."],
            ],
          },
        },
        {
          heading: "Keeping accounting data secure",
          body:
            "Accounting data is valuable and private. It includes customer details, supplier prices, salaries and bank information. Losing it stops the business operating; exposing it breaks confidentiality and may break data protection laws. Data security therefore covers three aims: keep data available, keep it accurate and keep it private.\n\nThe main measures are these. Backups: copy the data regularly to a separate device or to the cloud, keep at least one copy away from the premises, and test that it can be restored. Passwords and two-step login: use strong, unique passwords, change them when staff leave and require a second code on a phone for cloud systems. Access levels: give each user only the functions they need, so that the person who enters invoices cannot also approve payments. Anti-virus software and updates: keep systems patched against known attacks. Encryption: scramble data on laptops and in transmission so that stolen equipment does not expose records. Physical security: lock server rooms and laptops away, and keep paper source documents safely too. Staff training: most breaches start with a person clicking a false link or sharing a password.\n\nIn an exam answer, name the measure and say what risk it reduces. A list of words without explanation earns little.",
        },
        {
          heading: "Choosing the right system for a business",
          body:
            "There is no single best system. A recommendation should match the tool to the business. Consider the volume of transactions: a market trader with twenty sales a week does not need software that handles thousands. Consider the number of users and locations: two branches and an external accountant point towards a cloud system that everyone can reach. Consider cost over several years, not just the first month, including subscriptions, licences, training and the time of the person who keeps the records. Consider the skills of the staff and whether the owner will check the work. Consider the reliability of power and internet where the business operates. Finally consider the information the owner needs: a credit business that must chase slow payers benefits from software that produces an aged list of trade receivables; a cash business may not.\n\nA good exam answer compares at least two options against the facts in the scenario, supports the comparison with the numbers given, and ends with a clear recommendation and a reason. Mention one risk of the chosen option and how it will be managed. That shows judgement, which is what evaluation marks reward.",
        },
      ],
      workedExamples: [
        {
          title: "Three businesses, three systems: matching the tool to the need",
          scenario:
            "Recommend a system for each business and give reasons. (1) Rawan sells scarves at a weekend market, about twenty cash sales a week, no credit customers, and she keeps all records herself. (2) Nabil runs a building supplies shop with two branches in different towns, three staff who enter transactions, around 900 credit and cash transactions a month, and an external accountant who prepares the year-end statements. (3) Samir is a freelance architect working alone from home, sending about ten invoices a month and claiming expenses, with a slow and unreliable internet connection.",
          steps: [
            "Rawan: a spreadsheet is enough. Twenty cash sales a week can be listed in an analysed cash book on one sheet, with formulas for weekly totals. There are no trade receivables to track and no other users. The cost is almost nothing and she avoids training time. The risk is formula errors and loss of the file, so she should keep a backup copy on a separate device or online.",
            "Nabil: a cloud accounting system. Two branches and three staff must all post to the same ledgers at the same time, which a spreadsheet or a single desktop installation cannot do safely. Nine hundred transactions a month need automatic double entry, control accounts and an aged list of receivables to chase slow payers. The external accountant can log in directly, saving time at the year end. The risks are internet dependence and unauthorised access, managed with a backup internet connection, access levels for each staff member and two-step login.",
            "Samir: desktop accounting software, or a very simple spreadsheet. He is the only user, so sharing is not needed, and his internet is unreliable, so a cloud system could leave him unable to raise invoices. Desktop software will produce professional invoices and track who has paid. He must make regular backups himself, because there is no provider doing it for him.",
            "General point: in each case the recommendation follows from the facts: volume of transactions, number of users and locations, reliability of internet and the information needed.",
          ],
          answer: "Rawan: spreadsheet with a backup. Nabil: cloud accounting with access levels and two-step login. Samir: desktop software with his own backups, because his internet is unreliable and he works alone.",
        },
        {
          title: "A spreadsheet formula error in a depreciation schedule",
          scenario:
            "Laila keeps her non-current asset register on a spreadsheet. Five assets are depreciated by the straight-line method with no residual value: asset A cost $12,000 over 4 years; B $9,000 over 5 years; C $4,000 over 4 years; D $6,000 over 5 years; E $7,200 over 8 years. Asset E was added last month in a new row, but the total formula still adds only rows A to D. The total depreciation shown was used in the statement of profit or loss. Find the error and its effect.",
          steps: [
            "Calculate each annual charge: A $12,000 divided by 4 = $3,000; B $9,000 divided by 5 = $1,800; C $4,000 divided by 4 = $1,000; D $6,000 divided by 5 = $1,200; E $7,200 divided by 8 = $900.",
            "Correct total: $3,000 plus $1,800 plus $1,000 plus $1,200 plus $900 = $7,900.",
            "Spreadsheet total, which misses row E: $3,000 plus $1,800 plus $1,000 plus $1,200 = $7,000.",
            "Effect: depreciation expense understated by $7,900 less $7,000 = $900, so profit for the year is overstated by $900, and the carrying value of non-current assets is overstated by $900 because the provision for depreciation is too small.",
            "Lesson: a spreadsheet does not know a row was added. Laila should check that total formulas cover every row, add a cross-check such as a separate count of assets, and have someone else review the schedule before the figures go into the statements. Accounting software with an asset register would have included the new asset automatically.",
          ],
          answer: "Depreciation should be $7,900, not $7,000. Profit overstated by $900 and non-current assets overstated by $900. The cause is a total formula that did not include the new row, a typical spreadsheet risk.",
        },
        {
          title: "Comparing the cost of three systems over three years",
          scenario:
            "Hossam's hardware shop can keep its records in one of three ways. Option 1: a free spreadsheet, but Hossam estimates he will spend six hours a month on it, and his time is worth $15 an hour. Option 2: desktop accounting software costing $600 once, plus an annual support fee of $120. Option 3: a cloud system at $28 a month. Compare the costs over three years and comment on what the figures do not show.",
          steps: [
            "Option 1: 6 hours multiplied by $15 = $90 a month; $90 multiplied by 12 = $1,080 a year; $1,080 multiplied by 3 = $3,240 over three years.",
            "Option 2: $600 plus 3 multiplied by $120 = $600 plus $360 = $960 over three years.",
            "Option 3: $28 multiplied by 12 = $336 a year; $336 multiplied by 3 = $1,008 over three years.",
            "Ranking by cost: desktop software $960 is cheapest, cloud $1,008 is $48 more, and the spreadsheet $3,240 is the most expensive once the owner's time is counted, even though the program is free.",
            "What the figures miss: the time Hossam would still spend with software, the training time, the value of reaching cloud data from home or from his accountant's office, the cost of a computer failure with no backup for the desktop option, and the fact that the cloud subscription continues after year three while the desktop licence is already paid. The small cost difference between options 2 and 3 means the decision should rest on these other factors.",
          ],
          answer: "Three-year costs: spreadsheet $3,240, desktop software $960, cloud $1,008. Desktop is marginally cheapest, but the $48 gap is small, so access, backup and support should decide between desktop and cloud. The spreadsheet is the most expensive because of the owner's time.",
        },
        {
          title: "A data security plan after a virus attack",
          scenario:
            "Nour's clothing wholesaler lost three months of accounting records when a virus arrived in an email attachment opened by a clerk, locked every file on the office computer and demanded payment. The business had no backup, all staff shared one login with the password nour2020, and the anti-virus software had not been updated for a year. Nour asks for a security plan.",
          steps: [
            "Identify what went wrong: no backup meant the data could not be restored; a shared, weak password meant no one could tell who did what and the password was easy to guess; old anti-virus software did not recognise the attack; and the clerk had not been trained to be suspicious of unexpected attachments.",
            "Backups: copy the accounting data every day to a separate device that is disconnected after the copy, and also to a cloud backup service. Keep one copy away from the premises. Test a restore every month so that the backup is known to work.",
            "Access: give every member of staff an individual login with a strong password that is changed when they leave. Set access levels so that only Nour can approve payments and change supplier bank details. Turn on the audit trail so changes can be traced.",
            "Software: update the operating system and anti-virus software automatically, and set the email system to block executable attachments. Encrypt the laptop used for banking.",
            "People: train staff to check the sender of any email with an attachment or link, to report anything suspicious at once and never to share passwords. Write the plan down and review it each year.",
          ],
          answer: "The plan combines tested daily backups kept off-site, individual logins with access levels and an audit trail, updated anti-virus and encryption, and staff training. Each measure targets one of the weaknesses that caused the loss.",
        },
      ],
      commonErrors: [
        { error: "Claiming that computers remove all errors from accounting.", fix: "Computers remove arithmetic errors. Input errors, wrong account codes and errors of principle are processed exactly as typed. Say that human checks remain necessary." },
        { error: "Listing advantages or disadvantages as single words with no explanation.", fix: "Each point needs a sentence linking it to the business: speed means the owner sees monthly profit on time and can act on it." },
        { error: "Treating cloud accounting as a completely different kind of record keeping.", fix: "It is accounting software run on the provider's servers and reached through the internet. The difference is where the data lives and how it is paid for." },
        { error: "Recommending a system without using the facts or figures in the question.", fix: "Refer to the number of users, branches, transactions and the costs given. A recommendation that ignores the scenario earns little." },
        { error: "Describing a backup as a second copy on the same computer.", fix: "A backup must be on a separate device or in the cloud, preferably off-site, and it must be tested. A copy in the same place is lost with the original." },
      ],
      examTips: [
        "Balance your answer: when asked to discuss or evaluate, give advantages and disadvantages and finish with a justified conclusion.",
        "Use the numbers. Multiply monthly subscriptions by 12 and by the number of years, add one-off costs, and show every step so method marks are safe even if a slip occurs.",
        "For data security, pair each measure with the risk it reduces: backups against loss, passwords and access levels against unauthorised use, anti-virus against malware, encryption against theft.",
        "Link technology to the earlier syllabus. Accounting software still uses double entry, control accounts and the trial balance; it just does them automatically.",
        "When a scenario mentions several locations or an external accountant, cloud access is usually the key advantage; when it mentions poor internet, that is the key disadvantage.",
      ],
      exercises: [
        {
          id: "ex-7.3-1",
          type: "explain",
          marks: 2,
          prompt: "State two ways in which a small business can use a spreadsheet in its accounting.",
          model: "A spreadsheet can be used to keep a depreciation schedule that calculates the annual charge and carrying value of each non-current asset automatically. It can also be used as an analysed cash book, with formulas totalling each column so that the month's receipts and payments are summarised instantly. Other valid uses include budgets and ratio calculations.",
          points: ["One valid use, for example depreciation schedule or budget (1)", "A second valid use, for example analysed cash book or ratio analysis (1)"],
        },
        {
          id: "ex-7.3-2",
          type: "explain",
          marks: 2,
          prompt: "State two advantages of using accounting software rather than handwritten ledgers.",
          model: "When a transaction is entered once, the software posts both sides of the double entry automatically, so arithmetic errors are removed and the trial balance always agrees. Financial statements and reports such as an aged list of trade receivables can be produced in seconds rather than hours.",
          points: ["Automatic double entry removes arithmetic errors and the trial balance agrees (1)", "Statements and reports produced quickly on demand, or any other valid advantage such as less storage space (1)"],
        },
        {
          id: "ex-7.3-3",
          type: "explain",
          marks: 3,
          prompt: "Explain what is meant by cloud accounting and give one advantage and one disadvantage for a business that uses it.",
          model: "Cloud accounting is accounting software that runs on the provider's servers and is used through the internet, usually for a monthly subscription, so the data is stored online rather than on the business's own computer. Advantage: the owner, staff and the external accountant can all reach the same up-to-date records from different places. Disadvantage: without a working internet connection the business cannot access its records at all.",
          points: ["Software and data held on provider's servers, accessed over the internet (1)", "Valid advantage such as access from anywhere or automatic updates and backups (1)", "Valid disadvantage such as dependence on internet, continuing subscription or reliance on the provider (1)"],
        },
        {
          id: "ex-7.3-4",
          type: "calculation",
          marks: 4,
          prompt: "Rasha's assistant spends 14 hours a month preparing customer statements and the trial balance by hand. Accounting software costing $900 a year would reduce this to 3 hours a month. The assistant is paid $12 an hour. Calculate the annual net saving from the software and state one factor the calculation ignores.",
          model: "Hours saved each month: 14 less 3 = 11 hours. Monthly saving: 11 multiplied by $12 = $132. Annual saving: $132 multiplied by 12 = $1,584. Net saving after the software cost: $1,584 less $900 = $684 a year. The calculation ignores the time and cost of training the assistant, any set-up cost, and benefits that are not measured in money such as faster information and fewer errors.",
          points: ["Monthly saving 11 hours multiplied by $12 = $132 (1)", "Annual saving $1,584 (1)", "Net saving $684 after software cost (1)", "One factor ignored, such as training cost, set-up cost or better information (1)"],
        },
        {
          id: "ex-7.3-5",
          type: "explain",
          marks: 4,
          prompt: "Describe four measures a business can take to keep its accounting data secure, stating the risk each measure reduces.",
          model: "Regular backups stored on a separate device or in the cloud reduce the risk of losing data if equipment fails, is stolen or is attacked by a virus. Strong individual passwords, changed when staff leave, reduce the risk of unauthorised people reaching the system. Access levels that limit each user to the tasks they need reduce the risk of fraud and accidental changes by staff. Up-to-date anti-virus software and system updates reduce the risk of malware damaging or locking the files. Other valid measures include encryption of laptops and training staff to recognise suspicious emails.",
          points: ["Backups kept separately, against loss of data (1)", "Strong individual passwords or two-step login, against unauthorised access (1)", "Access levels per user, against fraud or accidental change (1)", "Anti-virus and updates, against malware; or encryption, against theft; or staff training, against phishing (1)"],
        },
        {
          id: "ex-7.3-6",
          type: "explain",
          marks: 4,
          prompt: "An owner says that because he uses accounting software his accounts cannot contain errors. Explain four reasons why he is wrong.",
          model: "First, input errors: if a clerk types $5,400 instead of $4,500, the software posts the wrong amount on both sides and the trial balance still agrees. Second, errors of principle: if a van purchase is coded to motor expenses, the software records revenue expenditure instead of a non-current asset without any warning. Third, omission: a transaction that is never entered, such as a supplier invoice left in a drawer, cannot be processed by any system. Fourth, judgement: software cannot decide the net realisable value of damaged inventory, the rate of the provision for doubtful debts or which expenses need an accrual; these adjustments still depend on a person, and if they are wrong the statements are wrong.",
          points: ["Input errors of amount are processed and the trial balance still agrees (1)", "Wrong account codes create errors of principle or commission without warning (1)", "Omitted transactions cannot be detected by the software (1)", "Year-end judgements such as inventory valuation or provisions still rely on people (1)"],
        },
        {
          id: "ex-7.3-7",
          type: "calculation",
          marks: 5,
          prompt: "Tamer is choosing between a cloud accounting subscription of $35 a month and desktop software with a one-off licence of $1,200 plus a support fee of $150 payable each year. Compare the total cost of each over four years and state two factors other than cost that Tamer should consider.",
          model: "Cloud: $35 multiplied by 12 = $420 a year; $420 multiplied by 4 = $1,680 over four years. Desktop: $1,200 plus 4 multiplied by $150 = $1,200 plus $600 = $1,800 over four years. The cloud system is cheaper by $1,800 less $1,680 = $120 over four years. Other factors: whether Tamer needs access from more than one place or by his accountant, which favours cloud; the reliability of his internet connection, which favours desktop if it is poor; who makes the backups, since the cloud provider does this but Tamer must do it himself for desktop; and the fact that the cloud subscription continues after four years while the licence is already paid.",
          points: ["Cloud cost $1,680 over four years (1)", "Desktop cost $1,800 over four years (1)", "Cloud cheaper by $120 (1)", "One non-cost factor, such as access from several places or by the accountant (1)", "A second non-cost factor, such as internet reliability, backups or continuing subscription after year four (1)"],
        },
        {
          id: "ex-7.3-8",
          type: "explain",
          marks: 6,
          prompt: "Heba keeps the records of her café on a spreadsheet that she built herself. Last month she found that the formula for total expenses had missed the final row for three months, so her profit figures were too high. Explain three weaknesses of using a spreadsheet for accounting records and three controls that would reduce the risks.",
          model: "Weaknesses: a spreadsheet has no built-in double entry, so one-sided or unbalanced entries are not detected; formulas can be wrong or can miss rows and columns, as happened here, and the sheet still looks correct; and anyone with the file can change figures without any record of who changed what, so errors and fraud are hard to trace. Controls: build cross-checks into the sheet, for example a separate total that must equal the column total, and a test that total debits equal total credits; protect formula cells so that they cannot be overwritten by accident and review the formulas whenever rows are added; and keep dated backup copies of the file and have a second person review the figures each month before they are used. Heba could also consider accounting software, which handles the double entry and totals automatically.",
          points: ["Weakness: no automatic double entry, unbalanced entries not detected (1)", "Weakness: formula errors or missed rows go unnoticed (1)", "Weakness: figures can be changed with no audit trail (1)", "Control: cross-check totals or a debit equals credit test (1)", "Control: protect formula cells and review formulas when rows are added (1)", "Control: regular backups and independent review each month, or move to accounting software (1)"],
        },
        {
          id: "ex-7.3-9",
          type: "explain",
          marks: 8,
          prompt:
            "Amal owns a pharmacy with two branches in different towns. Four staff record sales and purchases, there are about 1,200 transactions a month, most purchases are on credit from twelve suppliers, and Amal travels between branches and wants to see daily sales figures on her phone. Her accountant visits once a year. Compare the use of a spreadsheet, desktop accounting software and a cloud accounting system for Amal's business and recommend one, giving reasons.",
          model:
            "Spreadsheet: it is cheap and flexible, but 1,200 transactions a month entered by four people in two towns would mean several versions of the file, with no automatic double entry, no purchases ledger control account to check the twelve supplier balances and a high risk of formula errors. It is not suitable. Desktop software: it would give automatic double entry, supplier accounts and an aged list of payables, and it works without internet, but the data lives on one computer in one branch. The other branch could not post transactions at the same time, Amal could not see daily sales on her phone, and the accountant would need to visit to obtain the data. Cloud system: all four staff can post to the same ledgers from both branches at once, Amal can log in from her phone wherever she is, the accountant can access the records remotely instead of once a year, the provider makes the backups, and supplier balances and payment dates are tracked automatically. The disadvantages are the continuing subscription, dependence on internet at both branches and the need for strong access controls because the data can be reached from anywhere. Recommendation: a cloud accounting system, because the two locations, four users and Amal's need for remote daily figures are exactly what cloud access provides, and the risks can be managed with individual logins, access levels, two-step login and a backup internet connection.",
          points: ["Spreadsheet unsuitable: multiple users and locations, no automatic double entry or control accounts (1)", "Spreadsheet: high risk of formula and input errors at 1,200 transactions a month (1)", "Desktop: automatic double entry and supplier records, works offline (1)", "Desktop: data on one computer, so second branch, phone access and accountant access are not possible (1)", "Cloud: simultaneous access from both branches and from Amal's phone (1)", "Cloud: accountant can access remotely; provider handles backups and updates (1)", "Cloud disadvantages: subscription, internet dependence, security of remote access (1)", "Recommendation of cloud with justification linked to locations, users and remote reporting, and risk management (1)"],
        },
        {
          id: "ex-7.3-10",
          type: "explain",
          marks: 10,
          prompt:
            "Fadi's furniture business kept all its records on one office computer. A former employee, whose login was never cancelled, accessed the system from home, copied the customer list with addresses and credit limits, and changed the bank details of a supplier so that a payment of $6,300 went to his own account. There was no backup and the last audit trail report was never checked. Explain the consequences of these events for the business and its customers, describe the security measures that should have prevented them, and explain how the events relate to the ethical principle of confidentiality.",
          model:
            "Consequences: the business has lost $6,300 that it still owes to the genuine supplier, so it may have to pay twice and its liquidity suffers. The supplier's trust is damaged and it may demand cash in advance. Customers' private details have been exposed, which could lead to fraud against them, complaints, loss of customers and possible legal penalties under data protection law. With no backup, if the former employee had deleted the records the business could not have prepared its accounts or chased its trade receivables. Measures: cancel every login immediately when an employee leaves and change shared passwords; use individual logins with access levels so that only the owner or a senior person can change supplier bank details, with a second person approving any change; review the audit trail regularly so that unusual access from outside office hours or from home is noticed; keep encrypted, tested backups in a separate place; use two-step login for any remote access; and train staff to confirm bank detail changes by telephoning the supplier on a known number. Confidentiality: the customer list is private information that customers trusted the business to protect. Fadi has a duty to keep it secure, and an accountant or book-keeper who allowed it to leak through poor controls has failed in that duty, even without intending harm. Good data security is therefore part of behaving ethically, not only a technical matter.",
          points: ["Loss of $6,300 and possible need to pay the genuine supplier again, harming liquidity (1)", "Damage to supplier relationship and credit terms (1)", "Customers exposed to fraud; complaints, lost customers and legal penalties (1)", "No backup meant records could have been lost entirely (1)", "Cancel logins of leavers and change passwords (1)", "Access levels and second-person approval for changes to supplier bank details (1)", "Regular review of the audit trail to spot unusual access (1)", "Tested encrypted backups kept separately, and two-step login for remote access (1)", "Confidentiality: customer data is private information the business must protect (1)", "Poor security is a breach of the duty of confidentiality even without intent; security is part of ethics (1)"],
        },
      ],
      mcq: [
        {
          id: "mcq-7.3-1",
          question: "What is the main advantage of accounting software over a spreadsheet for keeping ledgers?",
          choices: ["One entry automatically posts both sides of the double entry and updates the ledgers", "It never needs a password", "It cannot process an incorrect amount", "It is always free to use"],
          explanation: "Accounting software is built around double entry, so each transaction is posted to all the relevant accounts automatically. It still processes wrong inputs, needs security and usually has a cost.",
        },
        {
          id: "mcq-7.3-2",
          question: "Which is a disadvantage of a cloud accounting system?",
          choices: ["The records cannot be reached without an internet connection", "Only one person can ever use the system", "Updates must be installed manually by the business", "Backups can never be made"],
          explanation: "Cloud systems depend on internet access. They usually allow many users, the provider installs updates, and the provider normally makes backups.",
        },
        {
          id: "mcq-7.3-3",
          question: "Which of the following is a feature of a spreadsheet rather than of accounting software?",
          choices: ["Formulas built by the user that recalculate when a cell changes", "Automatic posting of the credit entry when the debit is entered", "An aged list of trade receivables produced on demand", "An audit trail showing who changed each transaction"],
          explanation: "Spreadsheets are general-purpose grids where the user writes the formulas. Automatic double entry, aged receivables reports and audit trails are features of dedicated accounting software.",
        },
        {
          id: "mcq-7.3-4",
          question: "A clerk enters a purchase invoice of $4,500 into accounting software as $5,400. What happens?",
          choices: ["The wrong amount is posted to both accounts and the trial balance still agrees", "The software detects the error and rejects the entry", "The trial balance will not agree by $900", "The software automatically corrects the amount"],
          explanation: "The software posts whatever is entered to both sides of the double entry, so the trial balance balances with the wrong amount. This is an error of original entry: garbage in, garbage out.",
        },
        {
          id: "mcq-7.3-5",
          question: "Which measure best protects a business against losing all its accounting data when its computer fails?",
          choices: ["Regular backups stored on a separate device or in the cloud", "A strong password on the computer", "Up-to-date anti-virus software", "Locking the office door at night"],
          explanation: "Only a separate, recoverable copy of the data allows records to be restored after a hardware failure. Passwords, anti-virus and locks protect against other risks.",
        },
        {
          id: "mcq-7.3-6",
          question: "Why does a business set different access levels for users of its accounting system?",
          choices: ["To limit each user to the tasks they need, reducing the risk of fraud and accidental changes", "To make the software run faster", "To avoid paying for an internet connection", "To remove the need for backups"],
          explanation: "Access levels mean, for example, that the person entering invoices cannot also approve payments. They do not affect speed, internet use or the need for backups.",
        },
        {
          id: "mcq-7.3-7",
          question: "A cloud accounting subscription costs $45 a month. What is the total subscription cost over two years?",
          choices: ["$1,080", "$540", "$900", "$1,350"],
          explanation: "$45 multiplied by 12 months = $540 a year; $540 multiplied by 2 years = $1,080. $540 is only one year.",
        },
        {
          id: "mcq-7.3-8",
          question: "Which is a disadvantage of introducing accounting software into a small business?",
          choices: ["Staff need training and the system costs money to set up", "Reports take longer to produce than by hand", "Arithmetic errors become more common", "Records can be accessed from only one place"],
          explanation: "Set-up costs and training time are real disadvantages. Software produces reports faster, removes arithmetic errors, and with cloud options can be accessed from many places.",
        },
        {
          id: "mcq-7.3-9",
          question: "What is the purpose of encrypting accounting data stored on a laptop?",
          choices: ["To make the data unreadable to anyone who steals the laptop but lacks the key", "To stop the laptop battery running out", "To make the double entry post automatically", "To remove the need for a password"],
          explanation: "Encryption scrambles the data so that a thief cannot read it without the key. It does not affect power, posting or the need for login security.",
        },
        {
          id: "mcq-7.3-10",
          question: "A business has two branches, five staff who record transactions and an accountant in another city. Which system best fits these facts?",
          choices: ["A cloud accounting system that all users can reach at the same time", "A single spreadsheet emailed between the branches each week", "Desktop software installed on one computer at the main branch", "Handwritten ledgers kept at each branch separately"],
          explanation: "Several users in different places need shared, simultaneous access to one set of ledgers, which only a cloud system provides. The other options create separate or out-of-date records.",
        },
      ],
      structured: [
        {
          id: "sq-7.3-1",
          title: "Mariam's Boutique: choosing a record-keeping system",
          stimulus:
            "Mariam owns a clothing boutique with one shop and an online store. She currently keeps handwritten ledgers and is considering three options for the next three years. Option A: a spreadsheet, with free software, but a part-time book-keeper would be needed for 5 hours a week at $14 an hour. Option B: desktop accounting software with a one-off licence of $850 and an annual update fee of $160; the book-keeper would then need 2 hours a week at $14 an hour. Option C: a cloud accounting system at $40 a month; the book-keeper would need 1.5 hours a week at $14 an hour. Assume 52 weeks a year. Mariam's accountant works in another city, Mariam often checks the business from home in the evenings, and the shop's internet connection is reliable. Mariam has about 350 transactions a month, including online sales that must be matched to payments received through a card provider.",
          parts: [
            {
              label: "a",
              marks: 4,
              prompt: "Explain four advantages to Mariam of replacing her handwritten ledgers with any computerised system.",
              model: "Speed: transactions are posted and totals updated instantly, so Mariam can see her profit and bank position without waiting for a manual balancing. Accuracy: the computer does the arithmetic, removing addition and balancing errors that occur in handwritten ledgers. Reports: she can produce an aged list of receivables, a bank reconciliation or a statement of profit or loss at any time, helping her manage the online store's card receipts. Storage and search: years of records are kept without shelf space and any transaction can be found in seconds.",
              points: ["Speed of posting and up-to-date information for decisions (1)", "Arithmetic accuracy, fewer errors in totals and balances (1)", "Reports available on demand, for example matching card receipts or aged receivables (1)", "Less storage space and easy searching of records, or any other valid advantage (1)"],
            },
            {
              label: "b",
              marks: 4,
              prompt: "Explain four disadvantages or risks Mariam should consider before changing to a computerised system.",
              model: "Cost: licences, subscriptions and possibly a new computer must be paid for before any saving appears. Training: Mariam and the book-keeper must learn the system, and mistakes are more likely while they learn. Input errors: a wrong amount or wrong account code is processed without question, so the records can be wrong while looking neat. Security and dependence: a hardware failure, virus or stolen login could lose or expose the data, and work stops if the power or internet fails, so backups and passwords become essential.",
              points: ["Set-up and continuing costs (1)", "Training time and errors during the learning period (1)", "Input errors processed without warning, garbage in, garbage out (1)", "Data security, breakdown or dependence on power and internet (1)"],
            },
            {
              label: "c",
              marks: 6,
              prompt: "Calculate the total cost of each option over three years.",
              model:
                "Option A: 5 hours multiplied by $14 = $70 a week; $70 multiplied by 52 = $3,640 a year; $3,640 multiplied by 3 = $10,920 over three years. Option B: book-keeper 2 hours multiplied by $14 = $28 a week; $28 multiplied by 52 = $1,456 a year; over three years $1,456 multiplied by 3 = $4,368; plus licence $850 plus update fees 3 multiplied by $160 = $480; total $850 plus $480 plus $4,368 = $5,698. Option C: subscription $40 multiplied by 12 = $480 a year, $1,440 over three years; book-keeper 1.5 hours multiplied by $14 = $21 a week; $21 multiplied by 52 = $1,092 a year; $1,092 multiplied by 3 = $3,276; total $1,440 plus $3,276 = $4,716. Summary: A $10,920, B $5,698, C $4,716.",
              points: ["Option A annual cost $3,640 (1)", "Option A three-year total $10,920 (1)", "Option B annual book-keeper cost $1,456 (1)", "Option B three-year total $5,698 including $850 licence and $480 update fees (1)", "Option C annual cost $480 plus $1,092 = $1,572 (1)", "Option C three-year total $4,716 (1)"],
            },
            {
              label: "d",
              marks: 6,
              prompt: "Recommend the option Mariam should choose. Justify your recommendation using your calculations and the other information given.",
              model:
                "Mariam should choose Option C, the cloud accounting system. It has the lowest three-year cost at $4,716, which is $982 less than Option B and $6,204 less than Option A, because the book-keeper's time is the biggest cost and the cloud system reduces it most. It also fits her situation: she checks the business from home in the evenings and her accountant is in another city, so both can log in to the same live records, which desktop software on the shop computer would not allow. Her 350 transactions a month, including online sales that must be matched to card receipts, are handled by automatic bank and payment feeds, cutting the book-keeper's hours further. The shop's internet is reliable, so the main weakness of cloud systems is a small risk for her. The provider makes backups and updates. The subscription continues beyond three years, and Mariam should protect the system with strong individual passwords and two-step login because it can be reached from anywhere, but these risks are manageable. Option A is unsuitable because of its high labour cost and weak controls at 350 transactions a month.",
              points: ["Recommends Option C (1)", "Lowest three-year cost, $4,716, with comparison to B and A (1)", "Remote access suits evening checks from home and the accountant in another city (1)", "Handles 350 transactions a month and matching of online card receipts efficiently (1)", "Reliable internet reduces the main cloud risk; provider handles backups and updates (1)", "Recognises remaining risks, continuing subscription and need for login security, or explains why A or B is weaker (1)"],
            },
          ],
        },
        {
          id: "sq-7.3-2",
          title: "Data loss at Sherif's Pharmacy",
          stimulus:
            "Sherif runs a pharmacy. All his accounting records were kept in a spreadsheet on one laptop, which was stolen from the shop counter. There was no backup. The laptop password was 1234 and the same login was shared by Sherif and his three staff. The spreadsheet contained five months of sales and purchase records, a list of 1,100 customers with names, addresses and the medicines they buy, and the bank details of Sherif's suppliers. To rebuild the records, Sherif and a temporary clerk spent 60 hours at $15 an hour re-entering data from paper invoices and till rolls. Two supplier invoices could not be found and were paid late, with late payment charges of $240. Sherif's accountant has suggested moving to a cloud accounting system.",
          parts: [
            {
              label: "a",
              marks: 4,
              prompt: "Explain four consequences of the theft for Sherif's business and its customers.",
              model: "Sherif has paid 60 hours multiplied by $15 = $900 to rebuild the records, plus $240 in late payment charges, a direct cost of $1,140, and the two late payments may damage his relationships with suppliers. For five months he could not be certain of his profit, his bank balance or which customers owed him money, so decisions and credit control were based on guesswork. The 1,100 customer records, including the medicines they buy, were sensitive personal information; their exposure is a breach of confidentiality that could lead to complaints, loss of customers and penalties under data protection law. The thief also has the suppliers' bank details, which could be used to attempt fraud, so suppliers' trust in the pharmacy could fall.",
              points: ["Direct cost $900 of re-entry plus $240 charges, $1,140 in total, and strained supplier relationships (1)", "Loss of reliable information for decisions, credit control and bank monitoring for five months (1)", "Breach of customers' confidential medical and personal data, with complaints, lost customers or legal penalties (1)", "Supplier bank details exposed, risk of fraud and loss of supplier trust (1)"],
            },
            {
              label: "b",
              marks: 10,
              prompt: "Describe five data security measures Sherif should have had in place, and for each explain how it would have prevented or reduced the loss.",
              model:
                "Backups: a daily copy of the spreadsheet on a separate drive kept away from the counter, or in an online backup service, would have let Sherif restore all five months of records in minutes, saving the $900 of re-entry and avoiding the $240 of late charges. Strong individual passwords: a long, unique password for each user, instead of 1234 shared by four people, would have made it hard for the thief to open the laptop, and would have shown who had used the system. Encryption of the laptop: with the disk encrypted, the thief could not read the customer list or supplier bank details even after removing the drive, protecting confidentiality. Access levels: if staff could enter sales but only Sherif could see the full customer list and supplier bank details, less sensitive data would have been on the shared login and the damage would be smaller. Physical security: keeping the laptop locked away or secured to the counter with a cable lock, rather than left on the counter, would have made the theft itself less likely. A further measure is staff training, so that everyone understands why passwords are not shared and devices are not left unattended.",
              points: ["Backups described (1)", "Backups would have allowed restoration, avoiding re-entry cost and late charges (1)", "Strong, individual passwords described (1)", "Would have prevented the thief opening the laptop and shown who used the system (1)", "Encryption described (1)", "Would have kept customer and supplier data unreadable, protecting confidentiality (1)", "Access levels described (1)", "Would have limited the sensitive data exposed through a shared login (1)", "Physical security or staff training described (1)", "Would have made the theft itself less likely or prevented shared passwords (1)"],
            },
            {
              label: "c",
              marks: 4,
              prompt: "Explain two advantages of a cloud accounting system for Sherif in view of what happened.",
              model: "First, the data would be stored on the provider's servers, not on the laptop, and the provider makes regular backups, so the theft of a device would not mean loss of the records; Sherif could log in from another computer and continue working the same day. Second, cloud systems offer individual logins, access levels and two-step login, so each staff member would have their own limited access, a stolen password alone would not open the system, and the audit trail would show who did what, protecting the confidential customer and supplier data far better than a shared spreadsheet.",
              points: ["Data held and backed up by the provider, so device theft does not lose records (1)", "Sherif could continue working immediately from another device (1)", "Individual logins, access levels and two-step login limit and track access (1)", "Better protection of confidential customer and supplier data than a shared spreadsheet (1)"],
            },
            {
              label: "d",
              marks: 2,
              prompt: "Explain one disadvantage of a cloud accounting system that Sherif should consider.",
              model: "The system depends on an internet connection; if the pharmacy's connection fails, Sherif cannot record sales or check supplier balances until it is restored, so he should consider a backup connection such as a mobile data link. Alternatively, the monthly subscription is a continuing cost for as long as the business uses the system, and the data is held by an outside provider whose security and survival Sherif must rely on.",
              points: ["Valid disadvantage identified, such as internet dependence, continuing subscription or reliance on the provider (1)", "Explanation of its effect on Sherif and how it might be managed (1)"],
            },
          ],
        },
      ],
    },
  ],
};
