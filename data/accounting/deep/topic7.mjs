// Deep content for Topic 7: Accounting concepts and modern practice (Cambridge IGCSE Accounting 0452, 2027–2029).
// Original teaching material. Validate with: node scripts/validate-deep.mjs --topic 7

export const topic = {
  id: "7",
  name: "Accounting concepts and modern practice",
  sections: [
    {
      section: "7.1",
      title: "Accounting concepts",
      summary:
        "Accounting concepts are the agreed rules that every accountant follows when deciding what to record, how much to record and in which period. The ten concepts in the syllabus are business entity, going concern, historic cost, matching, prudence, consistency, materiality, money measurement, realisation and duality. In the exam you must name the correct concept and show how it changes a figure.",
      objectives: [
        "Explain each of the ten accounting concepts in simple words.",
        "Identify which concept applies to a transaction or an accounting decision.",
        "Apply a concept to adjust a figure, for example inventory, a prepayment or a small asset.",
        "Explain why the financial statements would mislead users if a concept were ignored.",
        "Distinguish between concepts that sound similar, such as prudence and materiality, or matching and realisation.",
        "Link the concepts to adjustments met earlier in the course, such as depreciation, accruals and the allowance for irrecoverable debts.",
      ],
      keyTerms: [
        { term: "Accounting concept", definition: "An agreed rule that accountants follow so that financial statements are prepared in the same way and can be trusted and compared." },
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
            "Imagine three shops each choosing their own way to value inventory, record sales and charge depreciation. Their profits could not be compared, and a bank could not trust any of them. Accounting concepts solve this. They are a set of agreed rules that every accountant follows, so that financial statements from different businesses and different years are prepared on the same basis.\n\nThe concepts also protect users. An owner who wants a bank loan would like profit to look high. A rule that says revenue is only recorded when it is earned stops that owner from counting next year's orders this year. In this way the concepts make the statements reliable, comparable and fair.\n\nThe syllabus names ten concepts. You need to know what each one means, recognise it in a scenario and show its effect on a figure. Examiners rarely ask you only to define a concept. They describe a situation and expect you to name the concept, apply it and say what would go wrong if it were ignored.",
        },
        {
          heading: "The ten concepts at a glance",
          body:
            "Keep this table in your head. The meaning column tells you the rule. The application column shows the rule changing a real figure. In the exam a good answer always contains both parts: the rule and its effect on the accounts.\n\nNotice that several concepts work together. Going concern justifies historic cost, because a business that will keep trading does not need to show forced-sale values. Matching and realisation are both about timing: matching decides the period for expenses and realisation decides the period for revenue. Prudence limits optimism, while materiality stops accountants wasting time on tiny amounts. Learn the names exactly as written, because the examiner marks the name of the concept, not a description of it.",
          table: {
            head: ["Concept", "Meaning in one line", "Application in one line"],
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
            "Three concepts decide what is recorded at all. Business entity says that the owner and the business are different. When Nadia pays her own dentist from the business bank account, the business has not had an expense. It has given money to the owner, so the entry is debit drawings and credit bank. If it were recorded as an expense, profit would be too low and capital would still be too high.\n\nDuality says every transaction has two effects, which is why double entry exists. A loan of $8,000 received increases the asset bank and increases the liability loan. The accounting equation stays balanced. When a student forgets duality and records only one side, the trial balance will not agree.\n\nMoney measurement says only items with a reliable money value are recorded. A skilled manager, a good location or a happy customer base all help the business, but nobody can measure them objectively. They are left out. This is one reason why financial statements never show the full value of a business, a limitation you studied in Topic 6.",
        },
        {
          heading: "Going concern and historic cost: how assets are valued",
          body:
            "Going concern is an assumption. Accountants assume the business will keep trading for at least the next twelve months. Because of this, a delivery van bought for $18,000 is not shown at the $11,000 a dealer would pay for it today. The business is not selling the van. It will use it for years, so the cost is spread over those years as depreciation. If the business were about to close, going concern would no longer apply and assets would be shown at the amounts they could be sold for.\n\nHistoric cost says assets are recorded at the price actually paid. The price is on an invoice, so it is objective and can be checked. A guess about current market value is not. If premises bought for $60,000 are now worth $75,000, the $15,000 increase is not recorded by a sole trader, because the gain has not been realised and the valuation is only an opinion.\n\nThese two concepts explain the carrying amount you have calculated many times: cost less accumulated depreciation. Neither market value nor replacement cost appears in that calculation.",
        },
        {
          heading: "Matching and realisation: deciding the period",
          body:
            "Profit for the year must compare the revenue earned in the year with the expenses used to earn it. Matching, also called the accruals concept, puts each expense in the period it relates to. If insurance of $1,200 is paid on 1 October for twelve months and the year ends on 31 December, only three months, $300, belongs to this year. The other $900 is a prepayment, shown as a current asset. Wages owed but not yet paid are added to the expense and shown as a current liability. Depreciation and the allowance for irrecoverable debts are also matching adjustments, because they put the cost of using assets and the expected cost of irrecoverable debts into the period that benefited.\n\nRealisation decides when revenue is recognised. The rule is: when the goods or services are delivered and ownership passes, so the amount is reasonably certain. Not when the order arrives, and not when the cash arrives. A credit sale delivered on 29 December is revenue for this year, with a trade receivable at the year end, even though cash comes in January. A deposit received for goods to be delivered next year is not revenue yet. It is a liability, because the business still owes the customer the goods.",
        },
        {
          heading: "Prudence, consistency and materiality: using judgement sensibly",
          body:
            "Prudence stops optimism. Where there is doubt, choose the figure that gives the lower profit or the lower asset value, and recognise a likely loss as soon as it is known. This is why inventory is valued at the lower of cost and net realisable value, why an allowance for irrecoverable debts is made before any customer actually fails to pay, and why a possible gain on a property is not recorded until it is sold. Prudence does not mean deliberately understating profit. That would also mislead users.\n\nConsistency says keep the same method year after year. A business that used reducing balance depreciation last year must use it this year. If it switched methods to make profit look better, the two years could not be compared. A change is allowed only when there is a good reason, such as a new method giving a truer picture, and the change and its effect should be explained.\n\nMateriality keeps things sensible. A $12 stapler will last several years, so in theory it is a non-current asset to be depreciated. In practice the amount is so small that nobody's decision would change, so it is charged as an expense at once. What is material depends on the size of the business: $500 matters to a market stall but not to a national chain.",
        },
        {
          heading: "How to answer a concept question in the exam",
          body:
            "Most questions follow one pattern: a short scenario, then an instruction such as name the concept, explain how it applies, or calculate the corrected figure. Build your answer in four moves. First, name the concept exactly. Second, give its rule in one sentence. Third, apply the rule to the figures in the question, showing the amount that changes. Fourth, state the consequence of ignoring it: profit overstated or understated, an asset or liability wrong, or users misled.\n\nWatch for concepts that sound alike. Prudence lowers a figure because of doubt; materiality simplifies a figure because it is small. Matching concerns expenses and the period they belong to; realisation concerns revenue and the moment it is earned. Historic cost is about the amount recorded; going concern is the assumption that allows that amount to be kept.\n\nSometimes two concepts can apply. Treating an owner's private purchase as drawings is business entity. Recording it at the invoice price is historic cost. When the question asks for one concept, choose the one that explains the decision described, not every concept that touches the transaction.",
        },
      ],
      workedExamples: [
        {
          title: "Five situations at Nadia's Bakery: name the concept and apply it",
          scenario:
            "Nadia owns a bakery with a financial year ending 31 December 2026. During the year: (1) she paid her son's school fees of $1,800 from the business bank account; (2) a customer ordered a wedding cake for $350 on 28 December 2026, which was delivered on 3 January 2027; (3) a new oven cost $6,400 on 1 January 2026, is expected to last eight years with no scrap value, and a similar oven now sells for $7,000; (4) insurance of $1,200 was paid on 1 October 2026 for twelve months; (5) she bought a $15 calculator that should last five years. For each situation, name the concept and state the correct treatment.",
          steps: [
            "Situation 1: Business entity. School fees are the owner's private cost, so they are drawings of $1,800, not an expense. Debit drawings $1,800, credit bank $1,800. If treated as an expense, profit for 2026 would be understated by $1,800.",
            "Situation 2: Realisation. The cake was delivered on 3 January 2027, so the $350 is revenue for 2027. No sale and no trade receivable is recorded at 31 December 2026. Including it would overstate 2026 revenue and profit by $350.",
            "Situation 3: Historic cost and going concern. The oven stays at its cost of $6,400. Depreciation is $6,400 divided by 8 = $800 a year, so the carrying amount at 31 December 2026 is $6,400 less $800 = $5,600. The $7,000 replacement price is ignored because the business will keep using the oven, not sell or replace it.",
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
            "Straight-line charge: 20 per cent of $9,000 = $1,800 a year. After two years accumulated depreciation is $3,600 and the carrying amount is $9,000 less $3,600 = $5,400.",
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
        { error: "Naming the concept but not applying it to the figures in the question.", fix: "Always finish with the amount that changes and the direction: for example, prepayment $900 so expense falls to $300 and profit rises by $900." },
        { error: "Confusing prudence with materiality.", fix: "Prudence lowers a figure because of doubt or expected loss. Materiality simplifies the treatment of an item because it is too small to matter." },
        { error: "Saying revenue is realised when cash is received.", fix: "Revenue is realised when the goods or services pass to the customer. A credit sale delivered this year is this year's revenue even if cash comes next year." },
        { error: "Treating the owner's private spending from the business bank account as a business expense.", fix: "Apply business entity: debit drawings. The business and the owner are separate, so profit is not reduced." },
        { error: "Believing consistency means a method can never change.", fix: "A change is allowed for a good reason, for example to give a truer picture, and its effect should be explained. A change made only to improve profit breaks the concept." },
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
          prompt: "Define the business entity concept and give one example of how it affects the records of a sole trader.",
          model:
            "Business entity means the business is treated as separate from its owner, so only transactions of the business are recorded in the business books. Example: if the owner pays her home rent of $700 from the business bank account, it is recorded as drawings, not as a rent expense of the business.",
          points: ["Business is separate from the owner; only business transactions are recorded (1)", "Valid example such as owner's private payment recorded as drawings (1)"],
        },
        {
          id: "ex-7.1-2",
          type: "explain",
          marks: 2,
          prompt: "Name the accounting concept shown in each case. (i) A credit purchase of goods for $900 is recorded as debit purchases $900 and credit the supplier $900. (ii) A business does not record the value of its experienced sales team in the statement of financial position.",
          model: "(i) Duality: every transaction has two equal effects, a debit and a credit. (ii) Money measurement: only items that can be measured reliably in money are recorded, and staff experience cannot be.",
          points: ["(i) Duality (1)", "(ii) Money measurement (1)"],
        },
        {
          id: "ex-7.1-3",
          type: "calculation",
          marks: 3,
          prompt: "Rami holds 60 units of a product that cost $7 each. The product can now be sold for $6.50 each, and each unit will cost $0.50 to deliver to the customer. Calculate the value of this inventory in the financial statements and name the concept applied.",
          model:
            "Net realisable value per unit = $6.50 less $0.50 = $6.00. Cost per unit is $7, so NRV is lower. Inventory value = 60 multiplied by $6.00 = $360, not 60 multiplied by $7 = $420. The concept is prudence: inventory is valued at the lower of cost and net realisable value so that profit and assets are not overstated.",
          points: ["Net realisable value per unit $6.00 (1)", "Inventory valued at $360 (1)", "Prudence, lower of cost and NRV (1)"],
        },
        {
          id: "ex-7.1-4",
          type: "calculation",
          marks: 3,
          prompt: "Dina paid rent of $5,400 on 1 March 2026 for the year ending 28 February 2027. Her financial year ends on 31 December 2026. Calculate the rent expense for the year and the amount shown in the statement of financial position, and name the concept applied.",
          model:
            "Months from 1 March to 31 December 2026 = 10. Rent expense = $5,400 multiplied by 10 over 12 = $4,500. Prepaid rent = $5,400 less $4,500 = $900, shown as other receivables under current assets. The concept is matching: the expense is recorded in the period it relates to, not when it was paid.",
          points: ["Rent expense $4,500 (1)", "Prepayment $900 shown as a current asset (1)", "Matching or accruals concept with reason (1)"],
        },
        {
          id: "ex-7.1-5",
          type: "explain",
          marks: 4,
          prompt: "A trader buys a waste bin for the office for $18. It is expected to last six years. Explain, naming the concept, how the bin should be treated in the financial statements and why.",
          model:
            "The bin is strictly a non-current asset because it will be used for more than one year. However, under the materiality concept an item is only treated with full accuracy if leaving it out or recording it differently could change a user's decision. $18 is far too small to affect anyone's decision. Therefore the bin is charged as an expense of $18 in the year of purchase. Recording it as an asset and charging depreciation of $3 a year for six years would cost more effort than the information is worth and would not change the picture of the business.",
          points: ["Materiality concept named (1)", "An item is material only if it could affect a user's decision, and $18 cannot (1)", "Treated as an expense in the year of purchase, not as a non-current asset (1)", "Depreciating $3 a year for six years would be pointless effort with no effect on decisions (1)"],
        },
        {
          id: "ex-7.1-6",
          type: "explain",
          marks: 4,
          prompt: "Salem sells furniture on credit. For one sale: the order was received on 20 December 2026, the goods were delivered on 29 December 2026, the invoice was sent on 2 January 2027 and the customer paid on 20 January 2027. Salem's year ends on 31 December 2026. Explain, naming the concept, in which year the sale is recorded and what would happen to profit if Salem waited for the cash.",
          model:
            "The sale is recognised on 29 December 2026, when the goods were delivered and ownership passed to the customer. This follows the realisation concept: revenue is recognised when it is earned, not when the order arrives and not when cash is received. The sale is therefore included in revenue for the year ended 31 December 2026 and the customer is shown as a trade receivable at the year end. If Salem waited until the cash arrived in January, revenue and profit for 2026 would be understated and 2027 would be overstated, so neither year's results would be correct.",
          points: ["Recognised on 29 December 2026 when goods were delivered and ownership passed (1)", "Realisation concept: revenue recognised when earned, not when ordered or paid for (1)", "Included in 2026 revenue with a trade receivable at 31 December 2026 (1)", "Waiting for cash would understate 2026 profit and overstate 2027 profit (1)"],
        },
        {
          id: "ex-7.1-7",
          type: "calculation",
          marks: 5,
          prompt: "Farida bought a machine for $24,000 on 1 January 2025. It has a six-year life, no residual value, and is depreciated by the straight-line method. On 31 December 2026 a dealer offered $19,500 for it and a new machine of the same type costs $27,000. Calculate the carrying amount of the machine at 31 December 2026 and explain, naming two concepts, why the other two figures are not used.",
          model:
            "Annual depreciation = $24,000 divided by 6 = $4,000. Accumulated depreciation at 31 December 2026 = 2 multiplied by $4,000 = $8,000. Carrying amount = $24,000 less $8,000 = $16,000. Historic cost: the machine is recorded at the amount actually paid, which is objective and supported by the purchase invoice, so neither the $19,500 offer nor the $27,000 replacement cost is used. Going concern: Farida will continue to use the machine, so its sale value is not relevant; the cost is spread over the years that benefit from it through depreciation.",
          points: ["Annual depreciation $4,000 (1)", "Accumulated depreciation $8,000 (1)", "Carrying amount $16,000 (1)", "Historic cost: recorded at the price paid, which is objective, so $19,500 and $27,000 ignored (1)", "Going concern: business continues to use the machine so sale value is irrelevant and cost is spread by depreciation (1)"],
        },
        {
          id: "ex-7.1-8",
          type: "calculation",
          marks: 6,
          prompt: "Bilal bought a delivery van for $30,000 on 1 January 2025 and depreciated it at 20 per cent straight line in 2025. For 2026 he wants to change to 20 per cent reducing balance because profit is lower than he hoped. Calculate the 2026 depreciation under each method, state the effect of the change on 2026 profit, and explain whether the change is acceptable.",
          model:
            "Straight line: 20 per cent of $30,000 = $6,000 for 2026, the same as 2025. Carrying amount at 1 January 2026 = $30,000 less $6,000 = $24,000. Reducing balance: 20 per cent of $24,000 = $4,800. If Bilal changed method, the 2026 charge would fall by $6,000 less $4,800 = $1,200 and profit would be $1,200 higher. The consistency concept requires the same method to be used each year so that the profits of 2025 and 2026 can be compared and users are not misled. A change is only acceptable for a good reason, such as giving a truer picture of how the van loses value, and the change should be explained. Changing simply to increase profit is not acceptable, so Bilal should charge $6,000.",
          points: ["Straight-line charge 2026 $6,000 (1)", "Carrying amount $24,000 and reducing balance charge $4,800 (1)", "Profit would be $1,200 higher under the proposed change (1)", "Consistency: same method each year (1)", "So that results of different years are comparable and users are not misled (1)", "Change acceptable only for a good reason with disclosure, not to raise profit; keep $6,000 (1)"],
        },
        {
          id: "ex-7.1-9",
          type: "explain",
          marks: 8,
          prompt: "Lina runs a furniture shop with a year end of 31 December 2026. Her draft accounts contain these items. (1) She took a table costing $400 home for her own use and made no entry. (2) Damaged chairs that cost $900 and can be sold for $650 are included in closing inventory at $900. (3) An order worth $2,000 received on 30 December 2026, to be delivered in January 2027, is included in revenue. (4) Wages of $700 for the last week of December were unpaid and have not been recorded. For each item, name the concept that applies and state the correct treatment with the effect on profit for the year.",
          model:
            "(1) Business entity. The table is drawings: debit drawings $400, credit purchases $400. Purchases fall by $400, so cost of sales falls and profit rises by $400. (2) Prudence. The chairs must be valued at the lower of cost and net realisable value, $650. Closing inventory falls by $250, cost of sales rises by $250 and profit falls by $250. (3) Realisation. The goods have not been delivered, so no revenue has been earned in 2026. Remove $2,000 from revenue; profit falls by $2,000. (4) Matching. The wages were earned by staff in December so they belong to 2026. Add $700 to wages and show an accrued expense of $700 as a current liability; profit falls by $700. Overall the draft profit is overstated by $250 plus $2,000 plus $700 less $400 = $2,550.",
          points: ["(1) Business entity named (1)", "(1) Drawings $400 recorded, purchases reduced, profit rises by $400 (1)", "(2) Prudence named (1)", "(2) Inventory reduced to $650, profit falls by $250 (1)", "(3) Realisation named (1)", "(3) $2,000 removed from revenue, profit falls by $2,000 (1)", "(4) Matching or accruals named (1)", "(4) Wages $700 accrued as a current liability, profit falls by $700 (1)"],
        },
        {
          id: "ex-7.1-10",
          type: "calculation",
          marks: 10,
          prompt:
            "Mazen's draft profit for the year ended 31 December 2026 is $41,600. You discover the following. (a) Closing inventory of $12,300 at cost includes goods that cost $1,400 whose net realisable value is $950. (b) Insurance of $2,400 paid on 1 September 2026 for twelve months has all been charged as an expense. (c) Goods sold on credit for $3,100 and delivered on 30 December 2026 have not been recorded. (d) Mazen's private mobile phone bill of $260 was charged to telephone expenses. (e) Electricity of $380 for December 2026 is owed and has not been recorded. (f) A desk lamp costing $35 has been recorded as a non-current asset and no depreciation has been charged. Prepare a statement showing the corrected profit for the year, and name the concept behind each adjustment.",
          model:
            "Statement of corrected profit for the year ended 31 December 2026. Draft profit $41,600. (a) Less reduction of inventory to net realisable value, $1,400 less $950 = $450 (prudence): $41,150. (b) Add insurance prepaid, $2,400 multiplied by 8 over 12 = $1,600 (matching): $42,750. (c) Add unrecorded credit sale $3,100 (realisation): $45,850. (d) Add private phone bill removed from expenses and charged to drawings $260 (business entity): $46,110. (e) Less accrued electricity $380 (matching): $45,730. (f) Less desk lamp treated as an expense $35 (materiality): $45,695. Corrected profit for the year $45,695. Check: increases $1,600 plus $3,100 plus $260 = $4,960; decreases $450 plus $380 plus $35 = $865; net increase $4,095; $41,600 plus $4,095 = $45,695.",
          points: ["(a) Inventory written down by $450, profit reduced (1)", "(b) Prepaid insurance $1,600 added back to profit (1)", "(c) Credit sale $3,100 added to profit (1)", "(d) Private phone bill $260 added back and treated as drawings (1)", "(e) Accrued electricity $380 deducted (1)", "(f) Desk lamp $35 charged as expense and deducted (1)", "Corrected profit $45,695 (1)", "Prudence for (a) and matching for (b) and (e) named (1)", "Realisation for (c) and business entity for (d) named (1)", "Materiality for (f) named (1)"],
        },
      ],
      mcq: [
        {
          id: "mcq-7.1-1",
          question: "A sole trader pays the insurance on her private house from the business bank account and records it as drawings. Which concept is she applying?",
          choices: ["Business entity", "Prudence", "Money measurement", "Duality"],
          explanation: "Business entity treats the owner and the business as separate, so a private payment is drawings, not a business expense. Duality applies to every transaction and does not explain the choice of account.",
        },
        {
          id: "mcq-7.1-2",
          question: "Closing inventory is valued at the lower of cost and net realisable value. Which concept is being followed?",
          choices: ["Prudence", "Materiality", "Historic cost", "Consistency"],
          explanation: "Prudence prevents profit and assets being overstated, so an expected loss on inventory is recognised at once. Historic cost would keep inventory at cost even when it is worth less.",
        },
        {
          id: "mcq-7.1-3",
          question: "A business records a credit purchase as debit purchases and credit trade payables. Which concept explains the two entries?",
          choices: ["Duality", "Business entity", "Consistency", "Realisation"],
          explanation: "Duality states that every transaction has two equal effects, which is the basis of double entry. The other concepts do not concern the number of entries.",
        },
        {
          id: "mcq-7.1-4",
          question: "Goods are ordered on 27 December, delivered on 30 December, invoiced on 3 January and paid for on 25 January. The year end is 31 December. Under the realisation concept, on which date is the sale recognised?",
          choices: ["30 December", "27 December", "3 January", "25 January"],
          explanation: "Revenue is realised when the goods pass to the customer, which is the delivery date. The order date is too early and the invoice and cash dates are too late.",
        },
        {
          id: "mcq-7.1-5",
          question: "A restaurant is famous for its chef, but no value for the chef appears in its statement of financial position. Which concept explains this?",
          choices: ["Money measurement", "Business entity", "Materiality", "Going concern"],
          explanation: "Money measurement means only items with a reliable money value are recorded. A chef's skill cannot be measured objectively in money.",
        },
        {
          id: "mcq-7.1-6",
          question: "A business has depreciated its vehicles by the reducing balance method for five years. The owner wants to use straight line this year only, to show a higher profit, but the accountant keeps the reducing balance method. Which concept is the accountant applying?",
          choices: ["Consistency", "Prudence", "Matching", "Materiality"],
          explanation: "Consistency requires the same method year after year so that results can be compared. Prudence is about not overstating profit, which is a different reason.",
        },
        {
          id: "mcq-7.1-7",
          question: "A $20 stapler expected to last four years is charged as an expense in the year of purchase. Which concept justifies this?",
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
          question: "Which concept assumes that a business will continue trading for the foreseeable future, so that non-current assets need not be shown at their quick-sale value?",
          choices: ["Going concern", "Realisation", "Historic cost", "Duality"],
          explanation: "Going concern is the assumption of continuity. Historic cost tells you which amount to record, but it is going concern that justifies keeping that amount rather than a sale value.",
        },
        {
          id: "mcq-7.1-10",
          question: "Rent of $6,000 was paid on 1 April 2026 for the year to 31 March 2027. The financial year ends on 31 December 2026. Applying the matching concept, what rent expense is shown for 2026?",
          choices: ["$4,500", "$6,000", "$1,500", "$5,000"],
          explanation: "Nine months from April to December belong to 2026: $6,000 multiplied by 9 over 12 = $4,500. The remaining $1,500 is a prepayment. $6,000 is the cash paid, not the expense.",
        },
      ],
      structured: [
        {
          id: "sq-7.1-1",
          title: "Hana's Garden Centre: correcting a draft profit using the concepts",
          stimulus:
            "Hana owns a garden centre. Her financial year ends on 31 December 2026 and her draft profit for the year is $28,400. Before the accounts are finalised the following matters come to light. (1) Closing inventory of $9,600 at cost includes plants that cost $1,200 but can now be sold for only $800. (2) Rent of $3,600 was paid on 1 November 2026 for the six months to 30 April 2027 and has been charged in full as an expense. (3) A repair to Hana's private car, $540, was charged to motor expenses. (4) Wages of $820 for the last week of December 2026 were unpaid at the year end and have not been recorded. (5) On 29 December 2026 a customer paid a deposit of $1,000 for a greenhouse that will be delivered in February 2027; the deposit was recorded as sales revenue. Hana has applied to her bank for a loan and the bank will study her financial statements.",
          parts: [
            {
              label: "a",
              marks: 5,
              prompt: "For each of the five matters, name the accounting concept that applies.",
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
              prompt: "Hana says the bank should use her draft profit of $28,400 because the differences are small. Evaluate whether the bank should base its lending decision on the draft figures or on the corrected figures. Refer to the prudence and realisation concepts in your answer.",
              model:
                "The bank will lend only if it believes Hana can repay, so it needs figures that do not exaggerate. Prudence means assets and profit are not overstated: the plants the bank may see as part of current assets are worth only the $800 they can fetch, not $1,200. Realisation means revenue is counted only when it is earned: the $1,000 deposit is for a greenhouse not yet delivered, so it is a liability, not profit. Hana is partly right that the net difference is small, because the corrected profit of $29,120 is only $720 higher than the draft. However, the draft hides a $1,000 liability and overstates inventory, so the bank would misjudge her liquidity and could not compare her fairly with other borrowers. Conclusion: the bank should use the corrected figures, because only statements prepared on the agreed concepts give a reliable basis for a lending decision.",
              points: ["Bank needs reliable figures to judge ability to repay (1)", "Prudence: inventory at $800 not $1,200, so assets are not overstated (1)", "Realisation: the $1,000 deposit is a liability, not earned revenue (1)", "Justified conclusion: use the corrected figures, recognising the net profit difference is only $720 but liquidity and comparability are affected (1)"],
            },
          ],
        },
        {
          id: "sq-7.1-2",
          title: "Youssef's Cycle Workshop: choosing accounting policies in the first year",
          stimulus:
            "Youssef opened a bicycle repair workshop on 1 January 2026. His first financial year ends on 31 December 2026. He bought workshop equipment for $16,000 on 1 January 2026 and cannot decide between straight-line depreciation over five years with no residual value and reducing balance depreciation at 30 per cent a year. He expects to use the equipment for about the same number of hours in each of the five years. He also bought 30 spanners at $6 each, which should last four years. On 30 December 2026 he finished repairing a customer's bicycle for an agreed price of $240; the customer collected the bicycle and paid on 4 January 2027. Youssef bought his workshop premises for $90,000 in January 2026 and in December 2026 a property agent told him they were worth $110,000.",
          parts: [
            {
              label: "a",
              marks: 4,
              prompt: "Explain the meaning of the consistency concept and the going concern concept.",
              model:
                "Consistency means that once a business has chosen an accounting method, such as a depreciation method, it uses the same method in every following year. This allows the profits of different years to be compared and stops a business changing method just to improve its results. Going concern means the business is assumed to continue trading for the foreseeable future. Because of this, assets are recorded at cost less depreciation rather than at the amount they would fetch if the business closed and sold everything quickly.",
              points: ["Consistency: same method used every year (1)", "So that results of different years are comparable and not manipulated (1)", "Going concern: business assumed to continue for the foreseeable future (1)", "So assets are shown at cost less depreciation, not at closure or forced-sale values (1)"],
            },
            {
              label: "b",
              marks: 4,
              prompt: "Explain how the spanners should be treated in the financial statements, naming the concept involved.",
              model:
                "The spanners cost 30 multiplied by $6 = $180 in total. Although they will last four years, which would normally make them non-current assets, the amount is very small compared with the equipment of $16,000 and premises of $90,000. Under the materiality concept an item that is too small to influence any user's decision can be treated in the simplest way. The $180 should therefore be charged as an expense in 2026. Capitalising them and charging $45 of depreciation a year would involve extra record keeping for no benefit.",
              points: ["Total cost $180 calculated (1)", "Materiality concept named (1)", "Amount too small to affect any user's decision (1)", "Charged as an expense in 2026 rather than depreciated over four years (1)"],
            },
            {
              label: "c",
              marks: 6,
              prompt: "Explain how the repair completed on 30 December 2026 and the agent's valuation of the premises should each be treated in the financial statements for the year ended 31 December 2026, naming the concept in each case.",
              model:
                "Repair: the work was finished and the customer collected the bicycle on 30 December 2026, so the service was delivered in 2026. Under the realisation concept revenue is recognised when it is earned, not when cash is received. The $240 is included in revenue for 2026 and, because the customer had not yet paid at the year end, a trade receivable of $240 is shown under current assets at 31 December 2026. Premises: under the historic cost concept the premises remain at the $90,000 actually paid, which is objective and supported by documents. The agent's figure of $110,000 is only an opinion; the gain of $20,000 has not been realised and would be recorded only if the premises were sold. Going concern supports this, because Youssef intends to keep using the premises rather than sell them.",
              points: ["Repair revenue $240 recognised in 2026 (1)", "Realisation: revenue recognised when the service is delivered, not when paid (1)", "Trade receivable $240 at 31 December 2026 (1)", "Premises kept at $90,000 (1)", "Historic cost: objective, documented amount; valuation is only an opinion (1)", "Gain of $20,000 not realised until sold; going concern means the premises are kept for use (1)"],
            },
            {
              label: "d",
              marks: 6,
              prompt: "Calculate the depreciation charge on the equipment for 2026 and 2027 under each method. Advise Youssef which method he should choose. Justify your answer.",
              model:
                "Straight line: $16,000 divided by 5 = $3,200 in 2026 and $3,200 in 2027. Reducing balance: 30 per cent of $16,000 = $4,800 in 2026; carrying amount $16,000 less $4,800 = $11,200; 30 per cent of $11,200 = $3,360 in 2027. In 2026 reducing balance gives a charge $1,600 higher than straight line, so profit for 2026 would be $1,600 lower. Advice: Youssef expects to use the equipment for about the same number of hours each year, so the benefit he receives is spread evenly. Straight line charges the same amount each year and so matches the cost to the years that benefit. Reducing balance would suit an asset that loses most of its value or usefulness in its early years. Youssef should choose straight line. Whichever method he chooses, the consistency concept means he must keep using it in later years so that his profits can be compared.",
              points: ["Straight-line charge $3,200 in each year (1)", "Reducing balance 2026 $4,800 (1)", "Reducing balance 2027 $3,360 (1)", "2026 profit $1,600 lower under reducing balance (1)", "Advises straight line because the equipment is used evenly, matching cost to the years that benefit (1)", "Chosen method must then be applied consistently in future years (1)"],
            },
          ],
        },
      ],
    },
    {
      section: "7.2",
      title: "Ethical considerations",
      summary:
        "Accounting needs an ethical framework because many people rely on figures prepared by someone else. The five fundamental principles are integrity, objectivity, professional competence and due care, confidentiality and professional behaviour. The exam gives you a situation, often an owner or manager putting pressure on a book-keeper, and asks you to name the principle at risk, explain the correct response and evaluate why applying the framework matters to stakeholders and to society.",
      objectives: [
        "Explain the need for an ethical framework in accounting.",
        "State and explain the five fundamental ethical principles for accountants.",
        "Recognise which principle is at risk in a described situation.",
        "Explain the correct response to pressure to produce misleading figures.",
        "Calculate the effect on profit, assets and liabilities of an unethical request.",
        "Describe the consequences of unethical behaviour for the accountant, the business and the users of financial statements.",
        "Explain the link between ethics and the accounting concepts, especially prudence, matching and realisation.",
        "Evaluate the significance to stakeholders and to society of applying an ethical framework.",
      ],
      keyTerms: [
        { term: "Ethics", definition: "The moral rules that guide how a person should behave, deciding what is honest, fair and responsible." },
        { term: "Ethical framework", definition: "An agreed set of principles and rules, such as a professional code of ethics, that tells accountants how to behave and how to deal with pressure to act wrongly." },
        { term: "Code of ethics", definition: "A written set of principles issued by a professional accounting body that its members must follow in their work." },
        { term: "Integrity", definition: "Being straightforward and honest in all professional work, and never knowingly recording or reporting false or misleading information." },
        { term: "Objectivity", definition: "Making professional judgements without bias, conflict of interest or pressure from other people." },
        { term: "Professional competence and due care", definition: "Keeping knowledge and skill up to date and doing every piece of work carefully, thoroughly and on time." },
        { term: "Confidentiality", definition: "Not disclosing information gained at work to outsiders, and not using it for personal advantage, unless there is a legal or professional duty to disclose." },
        { term: "Professional behaviour", definition: "Complying with laws and regulations and avoiding any action that would bring the accounting profession into disrepute." },
        { term: "Conflict of interest", definition: "A situation where an accountant's personal interest, or a duty to one person, could influence a judgement made for another person." },
        { term: "Window dressing", definition: "Arranging or misstating figures so that the financial statements look better than the true position." },
        { term: "Stakeholder", definition: "Any person or group that relies on a business's financial information, such as owners, lenders, suppliers, employees and the tax authority." },
        { term: "Public interest", definition: "The well-being of society as a whole, which accountants serve when they produce honest information that people, lenders and governments can safely rely on." },
      ],
      notes: [
        {
          heading: "The need for an ethical framework in accounting",
          body:
            "Financial statements are used by people who were not there when the transactions happened. A bank deciding on a loan, a supplier deciding on credit terms, a partner receiving a profit share and the tax authority all rely on figures prepared by someone else. They can only rely on those figures if the person who prepared them was honest, careful and independent. Ethics is the set of moral rules that makes this trust possible.\n\nProfessional accounting bodies publish a code of ethics that every member must follow. The code sets out five fundamental principles: integrity, objectivity, professional competence and due care, confidentiality and professional behaviour. A member who breaks the code can be fined, suspended or removed from the profession. The framework is needed because accountants often face pressure, have access to private information and make judgements, for example about inventory values or the allowance for irrecoverable debts, that outsiders cannot easily check.\n\nIn the syllabus you need to explain why the framework is needed, know the five principles, recognise them in a scenario and explain why applying them matters to stakeholders and society. Most exam situations involve pressure: an owner wants a higher profit for a loan, a lower profit for tax, or a secret kept from a partner. Your job is to show how the accountant should respond.",
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
          heading: "Why an ethical framework matters to stakeholders and society",
          body:
            "Applying an ethical framework is not only about one accountant keeping a job. It matters to every stakeholder who uses the figures, and to society as a whole.\n\nFor stakeholders, honest statements mean better decisions. Owners can judge how well the business is really doing. Banks and other lenders can lend with confidence, often at lower interest. Suppliers can set sensible credit limits. Employees can trust that their wages, and the future of their jobs, are based on true results. Customers know their personal details are kept confidential. Investors can compare businesses fairly.\n\nFor society, the effects are wider. The tax authority collects the correct tax, which pays for schools, hospitals and roads. Money flows to businesses that really perform well, not to those that only look good, so jobs are more secure. Fewer frauds and sudden collapses means fewer people lose savings or jobs. Honest reporting of environmental information, such as energy use or waste, lets environmental bodies and the public hold businesses to account. When accountants act ethically, people trust financial information, which helps the whole economy work. This is what serving the public interest means.\n\nIn an evaluation answer, name the stakeholder, give the specific benefit or harm, and reach a conclusion about how significant it is.",
        },
        {
          heading: "A method for answering an ethical dilemma",
          body:
            "Exam questions describe a dilemma and ask what the accountant should do. Work through five moves. One: state the facts and the figure involved. Two: name the principle or principles at risk and say why. Three: show the effect on the financial statements if the request were followed, with amounts, for example profit overstated by $4,200 and trade payables understated by $4,200. Four: give the correct action. Usually this is to refuse the false entry, explain the effect to the person making the request, suggest the honest alternative and keep a written note of the conversation. Five: say what to do if the pressure continues, which is to raise the matter with a more senior person, the owners, or the professional body, and to seek advice before resigning or reporting externally.\n\nA good answer is practical. Resigning on the spot or reporting the owner to the police as a first step is not what the examiner expects. Equally, agreeing to the request and promising to fix it next year is never acceptable, because the statements for this year would be false.",
        },
        {
          heading: "How ethics and the accounting concepts work together",
          body:
            "Many unethical requests are really requests to break an accounting concept. Recording next year's sales this year breaks realisation. Hiding a supplier invoice breaks matching. Valuing inventory at selling price breaks prudence. Treating the owner's private spending as a business expense to reduce tax breaks business entity. Changing the depreciation method every year to smooth profit breaks consistency. So when you analyse a dilemma, name both the ethical principle that the accountant would breach, usually integrity or objectivity, and the accounting concept that the figures would breach.\n\nThis also tells you how to calculate the damage. Apply the accounting concept correctly, compare the correct figure with the requested figure, and the difference is the misstatement. Adding the differences gives the total effect on profit, which is a common final step in a structured question.\n\nRemember that the aim of ethics is not to make profit lower. It is to make the statements true. An accountant who deliberately understates profit to help an owner pay less tax is just as unethical as one who overstates it for a loan.",
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
            "Effect on the bank's view: the current (working capital) ratio would appear as $18,000 divided by $12,000 = 1.50 : 1 instead of the true $18,000 divided by $16,200 = 1.11 : 1. The bank would think Farid is more liquid and more profitable than he is.",
            "Correct action: record the invoice in December. Explain to Farid that the statements must show the true position, that the bank could discover the omission and refuse future credit, and that hiding a liability may be fraud. Keep a written note of the request and the conversation. If Farid insists, Mona should refuse to prepare the false accounts and seek advice from a professional body.",
          ],
          answer:
            "Mona must record the $4,200 invoice in 2026. Agreeing would overstate profit by $4,200, understate trade payables by $4,200 and mislead the bank, breaching integrity and objectivity. She should refuse, explain the consequences, document the request and escalate if the pressure continues.",
        },
        {
          title: "Which principle has been broken? Five short cases",
          scenario:
            "For each case name the ethical principle that has been breached and explain in one sentence. (1) Ahmed, an accountant, buys shares in a client company the day before the excellent results he has just prepared are announced. (2) Noor files a client's annual return three months late because she forgot the deadline. (3) Sami, who prepares the accounts of a shop, also owns the shop next door and advises the owner to set prices that help his own shop. (4) Leila backdates a sales invoice from 2 January 2027 to 30 December 2026 at the owner's request. (5) Tarek writes online that all accountants at a rival firm are cheats, without any evidence.",
          steps: [
            "Case 1: Confidentiality. Ahmed used information gained at work for his personal gain before it was public. It is also a breach of objectivity because he now has a personal interest in the client.",
            "Case 2: Professional competence and due care. Noor failed to work carefully and meet a legal deadline, which may cost the client a penalty. Missing a legal requirement also touches professional behaviour.",
            "Case 3: Objectivity. Sami has a conflict of interest between his duty to his client and his own business, and he allowed his own interest to influence his advice.",
            "Case 4: Integrity. Leila knowingly created a false document so that 2027 revenue appears in 2026, which also breaks the realisation concept.",
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
          title: "Due care: Hadi checks his own allowance calculation",
          scenario:
            "Hadi, a trainee, prepared the year-end allowance for irrecoverable debts for Giza Supplies. Trade receivables were $31,500 and the policy is an allowance of 4 per cent. In his spreadsheet Hadi typed $13,500 instead of $31,500. The accounts were sent to the owner showing an allowance of $540. Hadi noticed the error a week later. Nobody else has seen it. Explain what he should do and the effect of the error.",
          steps: [
            "Correct allowance: 4 per cent of $31,500 = $1,260. Hadi's figure: 4 per cent of $13,500 = $540. The allowance is understated by $1,260 less $540 = $720.",
            "Effect: the expense for the increase in the allowance is understated by $720, so profit for the year is overstated by $720, and trade receivables net of the allowance are overstated by $720 in the statement of financial position.",
            "Principle: professional competence and due care required Hadi to check his inputs before sending the accounts. Now that he knows, integrity requires him to report the error rather than hope nobody notices.",
            "Action: tell his supervisor immediately, prepare a corrected allowance of $1,260, issue corrected statements to the owner and explain the change. Keeping quiet would turn a careless mistake into a dishonest one.",
            "Lesson: build checks into the work, for example comparing the allowance with last year's figure or re-reading inputs against the ledger, so that a typing slip is caught before the accounts leave the office.",
          ],
          answer: "The allowance should be $1,260, not $540; profit overstated by $720. Hadi must report and correct the error at once. Due care means checking inputs; integrity means owning up to the mistake.",
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
        "Name the ethical principle and the accounting concept when a request would misstate a figure, for example integrity and realisation for backdated sales.",
        "For a what should the accountant do question, give a sequence of actions: refuse, explain the effect, suggest the correct treatment, document, escalate.",
        "For consequences, cover more than one group: the accountant, the business and the users. One specific harm for each is worth more than a general comment.",
        "When figures are given, calculate the misstatement for each item and total it. The total is often the last mark in the part.",
        "Read who is making the request. Pressure from an owner, a relative or a client points to objectivity as well as integrity.",
        "When asked about the significance of an ethical framework, go beyond the accountant: name stakeholders such as the bank, suppliers, employees and the tax authority, add a point about society, and finish with a judgement.",
      ],
      exercises: [
        {
          id: "ex-7.2-1",
          type: "explain",
          marks: 2,
          prompt: "Explain two reasons why accounting needs an ethical framework.",
          model: "First, many people such as banks, suppliers and the tax authority make decisions using financial statements they did not prepare and cannot easily check, so they need to know the preparer was bound to be honest and careful. Second, accountants are often put under pressure by owners or managers to change figures, and a framework gives them clear principles to follow and a reason to refuse.",
          points: ["Users rely on statements prepared by others and cannot check them, so they need assurance of honesty (1)", "Accountants face pressure, conflicts or access to private information, and a framework guides them on how to respond (1)"],
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
          prompt: "Walid, a sole trader with a year end of 31 December 2026, asks his book-keeper to record credit sales of $9,000 made on 4 January 2027 as if they were made on 31 December 2026. State the effect on profit for 2026 and on the statement of financial position at 31 December 2026 if the book-keeper agrees, and name one ethical principle and one accounting concept that would be broken.",
          model: "Revenue and therefore profit for 2026 would be overstated by $9,000. Trade receivables, and so current assets, at 31 December 2026 would be overstated by $9,000, making the current ratio and the owner's capital look better than they are. The book-keeper would breach integrity by recording a transaction on a false date. The accounting concept broken is realisation, because revenue is recognised only when the goods are delivered, which was in 2027.",
          points: ["Profit for 2026 overstated by $9,000 (1)", "Trade receivables and current assets at 31 December 2026 overstated by $9,000 (1)", "Integrity (or objectivity) breached (1)", "Realisation concept broken (1)"],
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
            "Hassan, a sole trader, is applying for a bank loan. His draft profit for the year ended 31 December 2026 is $22,300. He asks his book-keeper to make three changes: (1) leave out an accrued electricity bill of $640; (2) value closing inventory at its expected selling price of $11,500 instead of its cost of $8,000; (3) record $5,000 of capital Hassan paid into the business in November as cash sales. Calculate the effect of each change on profit and the profit Hassan wants to show. Name the ethical principles and the accounting concepts involved, and explain how the book-keeper should respond.",
          model:
            "Effects: (1) omitting the accrual increases profit by $640; (2) inventory at selling price increases closing inventory and profit by $11,500 less $8,000 = $3,500; (3) treating capital as sales increases revenue and profit by $5,000. Total overstatement $640 plus $3,500 plus $5,000 = $9,140, so the profit Hassan wants to show is $22,300 plus $9,140 = $31,440 against a true profit of $22,300. Ethical principles: the book-keeper would breach integrity by recording false figures and objectivity by giving in to the owner's pressure. Accounting concepts: (1) breaks matching, (2) breaks prudence, because inventory must be at the lower of cost and net realisable value, and (3) breaks business entity, because capital introduced by the owner is not income of the business. Response: refuse all three changes, explain to Hassan that the bank would be misled into lending on a profit that is 41 per cent too high, that the bank may discover the misstatement and withdraw support, and that false statements to obtain a loan may be fraud. Keep a written note of the request and, if Hassan insists, decline to prepare the accounts and seek advice from a professional body.",
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
          question: "Which of the following is an accounting concept rather than one of the five fundamental ethical principles?",
          choices: ["Prudence", "Integrity", "Objectivity", "Confidentiality"],
          explanation: "Prudence is an accounting concept for valuing assets and measuring profit. The other three are ethical principles from the professional code.",
        },
        {
          id: "mcq-7.2-7",
          question: "Which of the following best describes the significance to society of accountants applying an ethical framework?",
          choices: ["The tax authority collects the correct tax and people can trust published financial information", "Every business will report a higher profit", "Accountants no longer need to follow the accounting concepts", "Businesses no longer need to keep source documents"],
          explanation: "Ethical accounting means true figures, so the correct tax is paid for public services and lenders, investors and the public can rely on the information. It does not raise profit, replace the accounting concepts or remove the need for evidence.",
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
              prompt: "For each of Farouk's three requests, calculate the effect on the profit for the year ended 31 December 2026 and name the accounting concept that would be broken. Calculate the profit Farouk wants to show.",
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
              prompt: "Farouk says the changes are harmless. Evaluate this claim by considering the significance to stakeholders and to society of Dalia applying an ethical framework.",
              model:
                "Farouk is wrong. The bank would lend $40,000 on a profit of $33,450 that is really $18,900; if Nile Paints cannot repay, the bank loses money and may demand immediate repayment, leaving the business short of cash. Suppliers reading the statements would give credit on false information, and once the truth came out they might refuse credit, which could force the business to close so that employees lose their jobs. Society is affected too: obtaining a loan with false statements is fraud, overstated profit can distort the tax paid, and every fraud reduces public trust in financial information, making lending more cautious and more expensive for honest businesses. Farouk is right only that the timing differences will reverse within weeks, but the bank's decision is made now, on the figures in front of it. Conclusion: the changes are not harmless; by applying the ethical framework Dalia protects the bank, suppliers, employees and Farouk himself, and supports trust in accounting across society.",
              points: ["Bank would lend on a profit of $33,450 instead of $18,900 and could lose money or demand repayment (1)", "Suppliers and employees affected: credit given on false information, possible closure and job losses (1)", "Society: fraud, wrong tax and loss of public trust in financial information (1)", "Justified conclusion that the claim is wrong, recognising that the timing differences reverse but the decision is made now (1)"],
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
                "Correct depreciation: 15 per cent of $12,000 = $1,800. Ziad charged $1,200, so the expense is understated by $1,800 less $1,200 = $600. Profit for the year is therefore overstated by $600, and the carrying amount of the equipment in the statement of financial position is overstated by $600 because the provision for depreciation is too small. Ziad should report the error to his supervisor immediately, even though nobody has noticed, because integrity requires him to be honest about his own mistakes. The firm should prepare corrected statements for the client and explain the change. Hiding the error would turn a careless mistake into dishonesty and could damage the firm if the client or the tax authority found it later. In future Ziad should check his calculations against the client's depreciation policy before the accounts are released.",
              points: ["Correct charge $1,800 (1)", "Expense understated by $600 (1)", "Profit overstated by $600 and carrying amount of equipment overstated by $600 (1)", "Report the error to the supervisor at once, showing integrity (1)", "Issue corrected statements to the client with an explanation (1)", "Hiding it would become dishonesty; introduce checks against policy to show due care (1)"],
            },
            {
              label: "d",
              marks: 4,
              prompt: "Mr Adel pays Horizon Accountants a large fee each year. Advise the partners whether the firm should continue to act for him if he keeps asking for the cash sales to be left out. Justify your answer.",
              model:
                "Continuing would keep a valuable fee, which is the only argument for staying. Against this, if the firm prepared accounts that left out $7,400 of sales and the tax authority found out, the firm's reputation for honesty would be damaged and other clients might leave. The professional body could investigate and discipline the partners, with fines or loss of membership, and the firm could face legal penalties for assisting tax evasion. Banks and the tax authority would trust all of the firm's work less. Society also loses, because unpaid tax reduces money for public services. Advice: the firm should explain to Mr Adel in writing that all sales must be recorded; if he still refuses, it should stop acting for him, because the risk to the firm's reputation and membership is far greater than one client's fee.",
              points: ["Recognises the fee as the argument for continuing (1)", "Risk of loss of reputation and other clients (1)", "Risk of discipline by the professional body or legal penalties for assisting tax evasion (1)", "Justified advice: refuse the omission in writing and stop acting if he insists, because the risks outweigh the fee (1)"],
            },
          ],
        },
      ],
    },
    {
      section: "7.3",
      title: "Technology and sustainability",
      summary:
        "Many businesses now keep all or part of their accounting records using digital applications. Whatever method is used, accounting data must be stored safely, so that it stays available, accurate and private, and sustainably, so that storage does not waste paper, energy or equipment and records are kept only for as long as they are needed. You must explain the risks of poor storage and compare the advantages and disadvantages of manual storage, data storage devices, cloud services and other digital services.",
      objectives: [
        "Explain how digital applications can be used for all or part of a business's accounting records.",
        "Explain why accounting data must be stored safely and sustainably.",
        "Explain the risks of not storing accounting data safely and sustainably.",
        "Describe the different types of storage system: manual, data storage devices, cloud services and other digital services.",
        "Explain the advantages and disadvantages of each type of storage system.",
        "Describe measures that keep accounting data safe and make its storage more sustainable.",
        "Advise a business on a suitable way to store its accounting data, and justify the advice.",
      ],
      keyTerms: [
        { term: "Digital application", definition: "A computer or phone program, such as a spreadsheet, an invoicing app or an online banking service, used to record, process or store accounting information." },
        { term: "Manual records", definition: "Accounting records written by hand and kept on paper, together with the paper source documents filed to support them." },
        { term: "Data storage device", definition: "A physical item that holds digital data, such as a computer's internal hard drive, an external hard drive, a USB flash drive or a memory card." },
        { term: "Cloud service", definition: "A service that stores a business's data on a provider's computers (servers), reached through the internet, instead of on the business's own equipment." },
        { term: "Other digital services", definition: "Digital services outside the business's own record-keeping system that also hold its accounting data, such as online banking, email, card payment providers and electronic invoicing services." },
        { term: "Backup", definition: "A separate copy of data, kept in a different place from the original, from which records can be restored if the original is lost or damaged." },
        { term: "Data security", definition: "Protecting accounting data from loss, damage, theft and unauthorised access or change." },
        { term: "Sustainable storage", definition: "Storing data in a way that uses no more paper, energy and equipment than is needed, keeps records only as long as required and disposes of them responsibly." },
        { term: "Retention period", definition: "The length of time a business must keep its accounting records, often set by law or the tax authority, after which they may be securely destroyed." },
        { term: "Secure disposal", definition: "Destroying old records or devices so that the data cannot be recovered, for example by shredding paper or wiping a hard drive before it is recycled." },
        { term: "Encryption", definition: "Scrambling data so that it can only be read by someone who has the correct key or password." },
        { term: "Access control", definition: "Measures such as individual passwords, two-step login and permission levels that limit who can see or change data." },
      ],
      notes: [
        {
          heading: "Using digital applications for all or part of the records",
          body:
            "A business does not have to choose between keeping everything by hand and keeping everything on a computer. Many small businesses use digital applications for part of their records only. A trader may keep a handwritten cash book but issue sales invoices from an app on a phone. Another may keep paper ledgers but use online banking for bank statements and a spreadsheet for the petty cash book. A larger business may keep all its books of prime entry, ledgers and financial statements digitally.\n\nThe accounting does not change. Every transaction still has a debit and a credit, and the same concepts apply. What changes is speed and effort: totals are calculated automatically, documents are produced quickly, records take no shelf space and can be shared. The limitations are the cost of equipment, the need for training, dependence on power and internet, and the fact that a wrong amount typed in is processed without question. When records are split between manual and digital parts, items can also be missed when copied from one to the other.\n\nYou do not need to know any particular software package. Examiners reward general points applied to the business in the question.",
        },
        {
          heading: "Why accounting data must be stored safely",
          body:
            "Storing data safely means three things: the data is available when it is needed, it is accurate and has not been changed without permission, and it is private, so only authorised people can see it.\n\nThere are several reasons. The business needs its records to prepare the statement of profit or loss and the statement of financial position, to know who owes it money and whom it must pay, and to make decisions. The tax authority and the law usually require records to be kept for a number of years, and penalties can follow if they cannot be produced. Records are evidence if a customer or supplier disputes an amount. Finally, accounting data contains personal and confidential details of customers, suppliers and employees. Losing or exposing that data breaks the ethical principle of confidentiality you met in 7.2 and may break data protection law.",
        },
        {
          heading: "Why accounting data must be stored sustainably",
          body:
            "Sustainability means meeting today's needs without harming the ability of future generations to meet theirs. Storing records has an environmental cost. Paper uses trees, water and energy, and printing every invoice, statement and payment confirmation creates waste. Digital storage is not free of impact either: computers and the large data centres that run cloud services use electricity day and night, and old devices become electronic waste that can release harmful materials if dumped.\n\nA business stores data sustainably when it prints only what is really needed, sends invoices and statements electronically, avoids keeping many unnecessary copies, switches equipment off when not in use, chooses energy-efficient equipment and providers, keeps records for the required retention period and then destroys them securely, and reuses or recycles old devices through approved services.\n\nSafety and sustainability must be balanced. Deleting records too early to save space breaks the law, and having no backup to save energy is unsafe. The aim is enough copies, kept for long enough, and no more. Sustainable storage often saves money too, and it improves the business's reputation with customers and environmental bodies.",
        },
        {
          heading: "The risks of not storing data safely and sustainably",
          body:
            "The table sets out the main risks, what causes them and what can happen to the business. In an exam answer, name the risk, link it to a cause in the scenario and state the consequence for the business or its stakeholders. A consequence with a figure, such as the cost of rebuilding records or an amount paid to a fraudster, is stronger than a general comment.\n\nNotice that many risks come from people rather than technology: a shared password, a login not cancelled when an employee leaves, a laptop left on a counter or an old drive thrown away without being wiped.",
          table: {
            head: ["Risk", "Typical cause", "Possible consequence"],
            rows: [
              ["Loss of data", "Fire, flood, device failure, theft or accidental deletion with no backup.", "Statements cannot be prepared, amounts owed by customers are not collected and records must be rebuilt at a cost."],
              ["Unauthorised access or theft of data", "Weak or shared passwords, logins of former staff not cancelled, hacking or false emails.", "Fraud, breach of confidentiality, fines under data protection law and loss of customer trust."],
              ["Data changed or corrupted", "A virus or unauthorised editing of records.", "Misleading figures and wrong decisions; payments sent to the wrong bank account."],
              ["Data unavailable", "Power cut, internet failure or a provider's system being down.", "Work stops; invoices cannot be issued or checked."],
              ["Breaking retention rules", "Records destroyed too early or lost before the retention period ends.", "Penalties from the tax authority and no evidence in a dispute."],
              ["Waste of resources", "Printing everything, many unnecessary copies, equipment left on, old records kept for ever.", "Higher costs, environmental harm and damage to the business's reputation."],
              ["Insecure disposal", "Paper thrown out unshredded or old devices sold or dumped without wiping.", "Confidential data found by others and harmful electronic waste."],
            ],
          },
        },
        {
          heading: "Manual storage and data storage devices",
          body:
            "Manual storage means paper records: handwritten books of prime entry and ledgers, and paper source documents kept in files, boxes or cabinets. Its advantages are that it needs no power, equipment or internet, it cannot be hacked over the internet, it is simple for a very small business, and the original documents are available as evidence. Its disadvantages are that it takes up space, is slow to search, is easily destroyed by fire, flood or theft, usually exists as a single copy, is hard to share with an accountant in another place, and uses large amounts of paper.\n\nData storage devices hold digital records on equipment the business owns: the hard drive inside a computer, an external hard drive, a USB flash drive or a memory card. Their advantages are that the business controls its own data, the records can be reached without internet, devices are cheap to buy once and hold large amounts of data, and a portable device can be used to keep a backup copy away from the premises. Their disadvantages are that devices can fail without warning, small devices are easily lost or stolen, a virus can spread to them, the business must remember to make its own backups, and old devices must be wiped and disposed of responsibly.",
        },
        {
          heading: "Cloud services and other digital services",
          body:
            "A cloud service stores the business's data on a provider's servers, reached through the internet. Its advantages are that records can be reached from any place and by several users at once, including the owner at home and an accountant in another town; the provider usually makes regular backups; the data is safe from a fire or theft at the business's premises; and the business does not need to buy and maintain its own storage equipment. Its disadvantages are that nothing can be reached without an internet connection, there is usually a continuing subscription, the business relies on the provider's security and on the provider staying in business, the data may be held in another country, and anyone who learns the login details can reach the data from anywhere. Data centres also use a great deal of energy, although sharing large efficient centres can use less energy than many small office servers.\n\nOther digital services also hold accounting data: online banking, email, card payment providers and electronic invoicing services. They create records automatically, such as bank statements and payment confirmations, and reduce paper. However, the business does not control them, its data becomes spread across many places, a provider may keep only a limited history, and false emails can be used to steal login details. Important records from these services should be downloaded and kept for the retention period.",
        },
        {
          heading: "Comparing the four types of storage",
          body:
            "No single type of storage is best for every business. A small market trader with a few paper invoices may manage well with manual records in a locked, fireproof cabinet. A business with several users or locations gains most from a cloud service. Many businesses use a combination: a cloud service or office computer for the main records, a backup kept in a different place, online banking for bank statements, and paper originals of key documents for as long as the law requires. When you advise a business, match the storage to its size, number of users and locations, the reliability of its internet, the sensitivity of its data and how long it must keep records.",
          table: {
            head: ["Type of storage", "Main advantages", "Main disadvantages"],
            rows: [
              ["Manual (paper)", "No power or internet needed; cannot be hacked online; original evidence; simple.", "Bulky; slow to search; destroyed by fire or flood; single copy; hard to share; uses paper."],
              ["Data storage devices", "Business controls the data; works offline; large capacity; one-off cost; portable backups.", "Can fail, be lost or stolen; virus risk; business must make its own backups; electronic waste."],
              ["Cloud services", "Access from anywhere by several users; provider backups; safe from local fire or theft; no storage equipment to buy.", "Needs internet; continuing subscription; relies on provider's security and survival; login can be stolen."],
              ["Other digital services", "Records such as bank statements created automatically; less paper; easy to download.", "Not controlled by the business; data spread across many places; limited history; false-email risk."],
            ],
          },
        },
        {
          heading: "Keeping data safe and storage sustainable in practice",
          body:
            "Most good practice can be learned as a measure and the risk it reduces. Regular backups, kept on a separate device or in the cloud and away from the premises, and tested so that they can be restored, protect against loss. Strong individual passwords, two-step login and cancelling the logins of staff who leave protect against unauthorised access. Access levels, so that the person who enters invoices cannot also change a supplier's bank details, protect against fraud. Anti-virus software and regular updates protect against viruses. Encryption protects data on a laptop or drive that is stolen. Physical security, such as locked rooms and fireproof cabinets raised off the floor, protects paper records and equipment. Staff training reduces the chance of someone opening a false email or sharing a password.\n\nFor sustainability: print only when needed, send documents electronically, keep a sensible number of copies, switch equipment off, follow a written retention schedule, shred paper and recycle it after the retention period, and wipe old devices before reusing or recycling them. In an exam answer always say what each measure achieves for the business in the question.",
        },
      ],
      workedExamples: [
        {
          title: "Salma's florist: a record system that is part manual and part digital",
          scenario:
            "Salma runs a florist. She keeps a handwritten cash book and a handwritten sales ledger for her ten credit customers, which are hotels and offices. She issues sales invoices from an invoicing app on her phone; copies are held on the app provider's servers. Her bank statements come through online banking, and her card payment provider sends a monthly statement by email. At 31 March 2026 the app shows sales invoices for March totalling $4,860, but her sales ledger shows March credit sales of $4,410. Identify which parts of Salma's records are manual and which are digital, and the type of storage used for each. Then explain the difference between the two totals and what Salma should do.",
          steps: [
            "Manual records: the cash book and the sales ledger are handwritten and kept on paper. This is manual storage.",
            "Digital records: the sales invoices are created in an app and held on the provider's servers, which is a cloud service. The bank statements from online banking and the card provider's emailed statements are held by other digital services.",
            "Difference: $4,860 less $4,410 = $450. Invoices worth $450 raised in the app have not been copied into the handwritten sales ledger, so credit sales and trade receivables in her books are both understated by $450.",
            "Action: each month Salma should compare the app's list of invoices with the sales ledger and post any missing invoices. She should also download and keep copies of the invoices and of the bank and card statements, because the providers may keep only a limited history and she must keep her records for the legal retention period.",
            "Evaluation of the mixed system: the app saves time and paper and produces clear invoices, but whenever records are split between manual and digital parts, items can be missed when they are copied from one to the other. A regular check is the control that makes the system reliable.",
          ],
          answer:
            "Manual storage: cash book and sales ledger. Cloud service: sales invoices. Other digital services: online banking and the card provider's statements. Invoices of $450 are missing from the sales ledger; Salma should reconcile the app with the ledger every month and keep downloaded copies of her digital records.",
        },
        {
          title: "Karim's garage: comparing the four types of storage",
          scenario:
            "Karim runs a car repair garage. His accounting records are kept on the hard drive of one office computer, with no other copy. Paper invoices and bank statements for the last six years are kept in cardboard boxes in a back room that has flooded twice. His accountant works in another town and asks Karim to email the records every three months. The tax authority requires records to be kept for six years. The garage has a reliable internet connection. Advise Karim how he should store his records.",
          steps: [
            "Manual storage (the boxes): no power or internet is needed and the original documents are evidence, but the back room has flooded twice. Another flood could destroy six years of records that the law requires him to keep, leading to penalties.",
            "Data storage device (the office hard drive): fast, under Karim's control and usable without internet, but it is the only copy. If the drive fails, the computer is stolen or a virus locks the files, all the records are lost.",
            "Cloud service: the records would be held on the provider's servers away from the garage and backed up by the provider, and the accountant could log in directly, so the quarterly emails stop. The disadvantages are a continuing subscription, reliance on the provider's security and dependence on the internet, which is reliable here. A strong password and two-step login are essential.",
            "Other digital services: online banking can supply bank statements as downloadable files, so printed statements are no longer needed, saving paper and space.",
            "Sustainability: once documents are held digitally, Karim can stop printing, and any paper that must be kept can go in one cabinet instead of many boxes. Records older than six years can be securely shredded and the paper recycled.",
            "Advice: use a cloud service as the main store and keep an encrypted backup on an external hard drive at a different place. Keep any paper originals in a fireproof cabinet raised off the floor. Destroy records securely once the six-year retention period has passed.",
          ],
          answer:
            "Karim should move to a cloud service with a separate encrypted backup kept away from the garage, store any paper originals safely off the floor, and securely destroy records older than six years. This removes the single-copy and flood risks, gives his accountant direct access and reduces paper.",
        },
        {
          title: "Fatma's wholesaler: the cost of not storing data safely",
          scenario:
            "Fatma runs a stationery wholesaler. Her only copy of the accounting records was on her laptop's hard drive, which failed in May 2026. There was no backup. A data recovery company charged $350 and recovered most files, but the sales ledger could not be recovered. A temporary clerk spent 45 hours at $16 an hour rebuilding the other records from paper documents. Three supplier invoices were paid late, with late payment charges of $180. Credit customers owed $5,400 in total, but Fatma could find evidence for only $4,500 and expects the remaining $900 will never be collected. Calculate the cost of the data loss, state its effect on the financial statements and explain the other consequences.",
          steps: [
            "Clerk's cost: 45 hours multiplied by $16 = $720.",
            "Total measurable cost: recovery $350 plus clerk $720 plus late payment charges $180 plus amounts not collected $900 = $2,150.",
            "Effect on the statements: the $350, $720 and $180 are expenses. The $900 is written off as irrecoverable debts: debit irrecoverable debts, credit the customers' accounts in the sales ledger. Profit for the year falls by $2,150 and trade receivables fall by $900.",
            "Other consequences: for several weeks Fatma did not know who owed her money or what she owed, so credit control and decisions suffered; suppliers' trust fell after the late payments; if records could not be produced, the tax authority could impose penalties. The failed laptop still holds customer details, so it must be wiped or destroyed before disposal to protect confidentiality.",
            "Prevention: a regular backup kept on a separate device or in a cloud service, and tested, would have allowed the records to be restored in hours and avoided almost all of the $2,150.",
          ],
          answer:
            "Measurable cost $2,150: $350 recovery, $720 re-entry, $180 late charges and $900 irrecoverable debts. Profit falls by $2,150 and trade receivables by $900. A tested backup kept separately would have prevented most of the loss.",
        },
        {
          title: "Nile Office Supplies: making storage more sustainable without making it less safe",
          scenario:
            "Nile Office Supplies issues about 1,000 sales invoices a month. Each invoice is printed twice: one copy is posted to the customer and one is filed. Paper and ink cost $0.03 per sheet. Eighty per cent of customers have now agreed to receive invoices by email. The office also keeps four copies of its accounting files on four external drives in the same drawer, keeps 14 years of paper records although the law requires six, leaves its computers switched on every night and has three old computers in a cupboard. Suggest how the business can store its data more sustainably without making it less safe.",
          steps: [
            "Paper now: 1,000 invoices multiplied by 2 copies = 2,000 sheets a month. If 80 per cent are emailed and the file copy is kept digitally, only the 20 per cent posted need printing: 1,000 multiplied by 20 per cent = 200 sheets a month.",
            "Saving: 2,000 less 200 = 1,800 sheets a month; 1,800 multiplied by 12 = 21,600 sheets a year; 21,600 multiplied by $0.03 = $648 a year.",
            "Copies: four drives in one drawer use four devices yet give little protection, because one fire or theft would destroy them all. One main copy plus one backup kept in a different place, or in a cloud service, is both more sustainable and safer.",
            "Retention: 14 less 6 = 8 years of paper records are no longer required. They should be shredded securely and the paper recycled. The six years still required must be kept, because destroying them would break the law.",
            "Energy and equipment: switch computers off or to sleep mode at night. Wipe the drives of the three old computers or have them destroyed by a specialist, then reuse the computers or recycle them through an approved electronic-waste service.",
          ],
          answer:
            "Emailing invoices saves 21,600 sheets and $648 a year. Replace four copies in one drawer with one main copy and one off-site backup, securely shred the 8 years of records beyond the retention period, switch equipment off at night, and wipe then reuse or recycle the old computers.",
        },
      ],
      commonErrors: [
        { error: "Writing about named software packages or comparing the prices of software products.", fix: "The syllabus does not require knowledge of any specific package. Write about types of storage and digital applications in general, applied to the business in the question." },
        { error: "Thinking that storing data sustainably means storing it for a long time.", fix: "Sustainably is about environmental impact: paper, energy, equipment, keeping records only as long as required and responsible disposal. Safely is about loss, theft, damage and unauthorised access." },
        { error: "Saying that a cloud service has no risks.", fix: "It needs the internet, usually has a continuing subscription, relies on the provider's security and survival, and can be reached by anyone who steals the login details." },
        { error: "Describing a copy on the same computer, or in the same drawer, as a backup.", fix: "A backup must be kept in a different place, on a separate device or in a cloud service, so that one fire, theft or failure cannot destroy both copies. It should be tested." },
        { error: "Saying all old records should be deleted to save space and energy.", fix: "Records must be kept for the legal retention period. Only after that should they be destroyed, and then securely, by shredding or wiping." },
        { error: "Listing security or sustainability measures as single words.", fix: "Name the measure and explain the risk it reduces or the saving it makes for the business in the scenario." },
      ],
      examTips: [
        "Keep safely and sustainably separate in your answer. A question that asks for both expects at least one point on each.",
        "Learn the four types of storage by their syllabus names: manual, data storage devices, cloud services and other digital services.",
        "For an advantage or disadvantage, link it to the scenario: an accountant in another town makes remote access important; poor internet makes a cloud service risky.",
        "In advise or evaluate questions give both sides, then a clear recommendation. A combination, such as a cloud service plus a separate backup, is often the best answer.",
        "When a scenario describes a loss with figures, calculate the cost and state the effect on profit and on the statement of financial position.",
        "Link to 7.2: losing or exposing customer, supplier or employee data is a failure of confidentiality.",
      ],
      exercises: [
        {
          id: "ex-7.3-1",
          type: "explain",
          marks: 2,
          prompt: "State two ways in which a business could use digital applications for part of its accounting records while keeping the rest manually.",
          model: "It could issue sales invoices from an invoicing app on a phone while keeping a handwritten cash book. It could use online banking to receive bank statements while keeping its ledgers on paper. Other valid answers include a spreadsheet for the petty cash book or for the depreciation schedule.",
          points: ["One valid digital application used for part of the records, for example invoices issued from an app (1)", "A second valid use, for example online banking statements or a spreadsheet petty cash book (1)"],
        },
        {
          id: "ex-7.3-2",
          type: "explain",
          marks: 2,
          prompt: "Identify the type of storage system used in each case. (i) Copies of the accounts are kept on a USB flash drive at the owner's home. (ii) Bank statements are viewed and downloaded through the bank's website.",
          model: "(i) A data storage device: the data is held on equipment the business owns. (ii) Other digital services: the bank, not the business, holds the records and provides them through online banking.",
          points: ["(i) Data storage device (1)", "(ii) Other digital services (online banking) (1)"],
        },
        {
          id: "ex-7.3-3",
          type: "explain",
          marks: 3,
          prompt: "Explain what is meant by storing accounting data sustainably and give two ways in which a business can do this.",
          model: "Storing data sustainably means keeping records in a way that does as little harm to the environment as possible: using no more paper, energy and equipment than necessary, keeping records only as long as required and disposing of them responsibly. Ways include sending invoices and statements by email instead of printing them, and securely shredding and recycling paper records once the legal retention period has ended. Other valid ways include switching equipment off when not in use and recycling old devices after wiping them.",
          points: ["Meaning: limiting paper, energy and equipment use and disposing of records responsibly (1)", "First valid way, for example electronic invoices instead of printing (1)", "Second valid way, for example shredding and recycling after the retention period or recycling wiped devices (1)"],
        },
        {
          id: "ex-7.3-4",
          type: "explain",
          marks: 4,
          prompt: "Explain two advantages and two disadvantages of storing accounting records manually.",
          model: "Advantages: manual records need no power, equipment or internet, so they can always be used, even during a power cut; and paper records cannot be hacked over the internet, so there is no risk of online theft of data. Disadvantages: paper is easily destroyed by fire, flood or theft and there is usually only one copy, so records can be lost for good; and paper records take up space and are slow to search, and printing and storing them uses a lot of paper, which is not sustainable.",
          points: ["Advantage: no power, equipment or internet needed (1)", "Advantage: cannot be hacked online, or original evidence available (1)", "Disadvantage: destroyed by fire, flood or theft, often a single copy (1)", "Disadvantage: bulky, slow to search or uses large amounts of paper (1)"],
        },
        {
          id: "ex-7.3-5",
          type: "explain",
          marks: 4,
          prompt: "Describe four measures a business can take to keep its accounting data safe, stating the risk each measure reduces.",
          model: "Regular backups kept on a separate device or in a cloud service reduce the risk of losing data if equipment fails, is stolen or is attacked by a virus. Strong individual passwords with two-step login, cancelled when staff leave, reduce the risk of unauthorised access. Access levels that limit each user to the tasks they need reduce the risk of fraud and accidental changes. Up-to-date anti-virus software reduces the risk of a virus damaging or locking the files. Other valid measures include encryption against theft of a device, physical security and staff training.",
          points: ["Backups kept separately, against loss of data (1)", "Strong individual passwords or two-step login, against unauthorised access (1)", "Access levels per user, against fraud or accidental change (1)", "Anti-virus and updates against viruses, or encryption against theft, or staff training against false emails (1)"],
        },
        {
          id: "ex-7.3-6",
          type: "calculation",
          marks: 4,
          prompt: "Ola's only copy of her accounting records was on an external hard drive that stopped working. A temporary clerk spent 38 hours at $14 an hour re-entering data from paper documents. A data recovery company charged $410. The balance of one credit customer, $760, could not be traced and will be written off. Calculate the total cost of the data loss, state the effect of writing off the $760, and explain one consequence that cannot be measured in money.",
          model: "Clerk: 38 multiplied by $14 = $532. Total cost: $532 plus $410 plus $760 = $1,702. The $760 is written off as an irrecoverable debt: profit for the year falls by $760 and trade receivables fall by $760. A non-money consequence: until the records were rebuilt Ola did not know who owed her money or her bank position, so her decisions were based on guesswork; customers and suppliers may also lose trust in her.",
          points: ["Clerk's cost $532 (1)", "Total cost $1,702 (1)", "$760 written off as an irrecoverable debt reduces profit and trade receivables by $760 (1)", "Valid non-money consequence explained, for example decisions made without reliable information or loss of trust (1)"],
        },
        {
          id: "ex-7.3-7",
          type: "explain",
          marks: 5,
          prompt: "Sunrise Travel has offices in two cities and its accountant works from home. Explain three advantages and two disadvantages for Sunrise Travel of storing its accounting records using a cloud service.",
          model: "Advantages: staff in both offices and the accountant at home can all reach the same up-to-date records at the same time, so there are no separate copies to combine. The provider usually makes regular backups, so records are not lost if a computer fails. The data is held away from the offices, so a fire or theft at either office does not destroy it. Disadvantages: without a working internet connection at an office, staff there cannot reach the records. The business relies on the provider's security and survival, and anyone who obtains a login can reach the data from anywhere, so strong passwords and two-step login are needed; there is also a continuing subscription.",
          points: ["Advantage: shared, simultaneous access from both offices and by the accountant (1)", "Advantage: provider makes regular backups (1)", "Advantage: data safe from fire or theft at the offices (1)", "Disadvantage: depends on an internet connection (1)", "Disadvantage: reliance on the provider, risk from stolen logins, or continuing subscription (1)"],
        },
        {
          id: "ex-7.3-8",
          type: "explain",
          marks: 6,
          prompt: "Hany runs a hardware shop. His paper records are kept in cardboard boxes in a damp storeroom. His digital records are on one laptop with the password hany, which all four staff use. He prints every email from suppliers, keeps 15 years of records although the law requires six, and has thrown two old laptops into the rubbish without removing the data. Explain three risks of Hany not storing his data safely and three ways in which his storage is not sustainable.",
          model: "Not safe: the damp storeroom could ruin the paper records, and there is only one copy, so records required by the tax authority could be lost. The weak, shared password means anyone can open the laptop and no one can tell who changed what, so fraud or mistakes cannot be traced. The old laptops thrown in the rubbish still contain the business's data, so anyone who finds them could read confidential customer or supplier details. Not sustainable: printing every supplier email wastes paper and ink. Keeping 15 years of records when six are required uses space and resources for nine years of records that are not needed; they should be shredded securely and recycled. Dumping laptops creates electronic waste that should have been wiped and recycled through an approved service.",
          points: ["Unsafe: damp storeroom and single copy, risk of losing records required by law (1)", "Unsafe: weak shared password allows unauthorised access and no trace of who made changes (1)", "Unsafe: data on dumped laptops can be read, breaching confidentiality (1)", "Not sustainable: printing every email wastes paper (1)", "Not sustainable: nine years of unneeded records kept instead of being securely shredded and recycled (1)", "Not sustainable: laptops dumped as electronic waste instead of being wiped and recycled (1)"],
        },
        {
          id: "ex-7.3-9",
          type: "explain",
          marks: 8,
          prompt:
            "Amal owns a pharmacy with two branches in different towns. Each branch keeps its accounting records on the hard drive of its own computer, and once a week a copy is made on a USB flash drive that is kept in the branch's desk drawer. The records include patients' names and the medicines they buy. Amal travels between the branches and wants to see the combined figures each day. Her accountant visits once a year. The internet connection is reliable in one town but often fails in the other. Discuss whether Amal should continue to use data storage devices or move her records to a cloud service. Recommend one option and justify your choice.",
          model:
            "Data storage devices: each branch can work without the internet, which matters in the town where the connection often fails, and Amal keeps full control of the patient data on her own equipment with no subscription. However, the weekly copy is kept in the same drawer as the computer, so a fire or theft would destroy both, and up to a week of records could be lost. The two branches have separate sets of records, so Amal cannot see combined daily figures and the accountant must collect data in person. A small flash drive holding patient details is easily lost. Cloud service: both branches post to one set of records, so Amal can see combined figures each day from anywhere and the accountant can work remotely. The provider makes backups away from the branches, which removes the drawer problem. However, the branch with poor internet may be unable to record transactions, there is a continuing subscription, and the confidential patient data is held by an outside provider and can be reached by anyone who steals a login. Recommendation: move to a cloud service, because it solves the backup and combined-figures problems, but protect it with individual logins and two-step login, provide a backup mobile internet connection for the second branch, and keep an encrypted backup away from the premises.",
          points: ["Devices: work offline, important for the branch with poor internet (1)", "Devices: business controls the patient data and pays no subscription (1)", "Devices: backup kept in the same drawer, so fire or theft loses both; a flash drive is easily lost (1)", "Devices: separate records at each branch, so no combined daily figures and no remote access for the accountant (1)", "Cloud: one set of records reachable by both branches, Amal and the accountant (1)", "Cloud: provider backups held away from the branches (1)", "Cloud: internet failures at one branch, subscription, and confidential patient data held by an outside provider (1)", "Justified recommendation with risk managed, for example cloud with two-step login and a backup connection (1)"],
        },
        {
          id: "ex-7.3-10",
          type: "explain",
          marks: 10,
          prompt:
            "Fadi's furniture business kept all its records on the hard drive of one office computer, with no backup. A former employee, whose login was never cancelled, logged in from home, copied the customer list with addresses and credit limits, and changed a supplier's bank details so that a payment of $6,300 went to his own account. Separately, Fadi sold an old office laptop online without deleting its files, and the buyer found the payroll records on it. Explain the consequences of these events for the business and its stakeholders, describe the measures that would have prevented them, and evaluate whether moving the records to a cloud service would solve Fadi's problems.",
          model:
            "Consequences: the business has lost $6,300 and still owes the genuine supplier, so it may have to pay twice and its cash position suffers. The supplier may lose trust and reduce credit. Customers' details have been exposed, which could lead to fraud against them, complaints, lost customers and penalties under data protection law. Employees' pay details have been exposed, a serious breach of confidentiality that damages staff trust. Measures: cancel logins as soon as an employee leaves and use individual strong passwords with two-step login; set access levels so that only the owner can change supplier bank details, with a second person checking any change, and review the record of who logged in and when; keep regular backups in a separate place; and wipe or destroy the drive of any device before selling or recycling it. Evaluation: a cloud service would help, because the provider makes backups, logins can be stopped centrally the moment someone leaves, and access levels and two-step login are normally available. However, the problems were caused by people and procedures: a cloud service does not cancel logins by itself, approve bank detail changes or wipe old laptops. Conclusion: moving to a cloud service is sensible, but it will only solve Fadi's problems if he also introduces the controls and procedures above.",
          points: ["Loss of $6,300 and possible need to pay the genuine supplier again, harming cash (1)", "Damage to the supplier relationship and credit terms (1)", "Customers' data exposed: fraud risk, complaints, lost customers or legal penalties (1)", "Employees' payroll data exposed: breach of confidentiality and loss of staff trust (1)", "Cancel leavers' logins and use individual passwords with two-step login (1)", "Access levels and second-person approval for changes to supplier bank details (1)", "Regular backups kept in a separate place (1)", "Wipe or destroy the drive before selling or recycling a device (1)", "Cloud helps: provider backups, central control of logins, access controls available (1)", "Conclusion: cloud alone does not fix people and procedure failures, so controls are still needed (1)"],
        },
      ],
      mcq: [
        {
          id: "mcq-7.3-1",
          question: "Which of the following is a data storage device?",
          choices: ["An external hard drive", "An online banking service", "A lever-arch file of paper invoices", "A cloud service"],
          explanation: "A data storage device is equipment the business owns that holds digital data. Online banking is another digital service, a lever-arch file is manual storage, and a cloud service holds data on a provider's servers.",
        },
        {
          id: "mcq-7.3-2",
          question: "Which is an advantage of manual storage of accounting records compared with digital storage?",
          choices: ["The records cannot be hacked over the internet", "The records can be searched in seconds", "The records take up less space", "The records are backed up automatically"],
          explanation: "Paper records cannot be reached online. They are slower to search, take more space and are not backed up unless someone copies them.",
        },
        {
          id: "mcq-7.3-3",
          question: "Which is a disadvantage of storing accounting records using a cloud service?",
          choices: ["The records cannot be reached without an internet connection", "The records are lost if the office computer is stolen", "Only one person can see the records at a time", "The business must buy its own servers"],
          explanation: "A cloud service depends on the internet. The data is held on the provider's servers, so theft of an office computer does not lose it, several users can work at once, and the business does not need its own servers.",
        },
        {
          id: "mcq-7.3-4",
          question: "Which practice makes the storage of accounting data more sustainable?",
          choices: ["Sending invoices and statements by email instead of printing them", "Printing a paper copy of every digital record", "Keeping five copies of every file on separate drives in the office", "Leaving office computers switched on overnight"],
          explanation: "Electronic documents reduce paper use and waste. The other options waste paper, equipment or energy, and five copies in one office are no safer than one.",
        },
        {
          id: "mcq-7.3-5",
          question: "A business must keep its records for six years. What should it do with paper records that are ten years old?",
          choices: ["Shred them securely and recycle the paper", "Put them in the ordinary rubbish bin", "Keep them for ever in case they are needed", "Shred them together with the records of the last three years to save space"],
          explanation: "Records beyond the retention period should be destroyed securely, which is both safe and sustainable. Ordinary rubbish exposes the data, keeping them for ever wastes resources, and destroying recent records breaks the law.",
        },
        {
          id: "mcq-7.3-6",
          question: "Which measure best protects a business against losing all its accounting data when its computer fails?",
          choices: ["Regular backups kept on a separate device or in a cloud service", "A strong password on the computer", "Up-to-date anti-virus software", "Locking the office door at night"],
          explanation: "Only a separate copy of the data allows records to be restored after a failure. Passwords, anti-virus software and locks protect against other risks.",
        },
        {
          id: "mcq-7.3-7",
          question: "What is the purpose of encrypting accounting data stored on a laptop?",
          choices: ["To make the data unreadable to anyone who steals the laptop but does not have the key", "To make the laptop use less electricity", "To create a backup copy of the data automatically", "To remove the need for a password"],
          explanation: "Encryption scrambles the data so that a thief cannot read it. It does not save energy, does not create a backup and works alongside, not instead of, passwords.",
        },
        {
          id: "mcq-7.3-8",
          question: "A business's only copy of its accounting records is on a USB flash drive kept in the owner's bag. What is the greatest risk?",
          choices: ["The drive could be lost or stolen and all the records lost with it", "The records cannot be read without an internet connection", "The cloud provider could stop trading", "The records will fill too much shelf space"],
          explanation: "A small portable device is easily lost or stolen, and with no other copy everything would be lost. A flash drive needs no internet or cloud provider and takes no shelf space.",
        },
        {
          id: "mcq-7.3-9",
          question: "Which of these is an example of other digital services holding a business's accounting data?",
          choices: ["Online banking that provides downloadable bank statements", "A handwritten cash book", "The hard drive inside the office computer", "A locked fireproof filing cabinet"],
          explanation: "Online banking is a service outside the business's own records that holds its data. The cash book and filing cabinet are manual storage, and the hard drive is a data storage device.",
        },
        {
          id: "mcq-7.3-10",
          question: "Which statement about using digital applications for accounting records is correct?",
          choices: ["A wrong amount that is typed in will be processed without warning, so human checks are still needed", "Digital applications make double entry unnecessary", "A business must use one particular software package to keep digital records", "Records must be either all manual or all digital"],
          explanation: "A computer processes whatever it is given, so input errors still need checking. Double entry still applies, no particular package is required, and many businesses keep part of their records digitally and part manually.",
        },
      ],
      structured: [
        {
          id: "sq-7.3-1",
          title: "Mariam's Boutique: moving from paper to digital storage",
          stimulus:
            "Mariam owns a clothing boutique with one shop and an online store. She keeps handwritten ledgers. Her paper invoices, bank statements and card payment slips for the last eight years are kept in cardboard boxes on the floor of the shop's storeroom. Last month a water pipe leaked and two boxes were ruined. The tax authority requires business records to be kept for six years. Every online order and every card payment confirmation, about 600 sheets a month, is printed and filed in the boxes; the printouts show customers' names and addresses. Mariam's accountant works in another city, and Mariam often checks the business from home in the evenings. The shop's internet connection is reliable. Mariam is considering three options. Option A: keep manual records but buy a fireproof filing cabinet. Option B: keep the records on the shop computer and copy them each week to an external hard drive kept in the shop. Option C: keep the records using a cloud service.",
          parts: [
            {
              label: "a",
              marks: 4,
              prompt: "Explain why Mariam needs to store her accounting data (i) safely and (ii) sustainably.",
              model: "(i) Safely: Mariam needs complete, accurate records to prepare her financial statements and to check that the card provider has paid her for every online sale. The law requires her records to be kept for six years, so if they are lost she could face penalties from the tax authority. (ii) Sustainably: printing about 600 sheets a month is 7,200 sheets a year, which wastes paper and money. Keeping records beyond the six years required uses space and resources for documents she no longer needs.",
              points: ["Safely: records needed to prepare statements and check card receipts (1)", "Safely: legal six-year requirement, with penalties if records are lost (1)", "Sustainably: 7,200 printed sheets a year waste paper and money (1)", "Sustainably: records beyond six years kept unnecessarily (1)"],
            },
            {
              label: "b",
              marks: 4,
              prompt: "Explain two risks of the way Mariam stores her records at present.",
              model: "First, the boxes are on the floor of a storeroom where a pipe has already leaked, and there is no other copy. Another leak or a fire could destroy records she must keep, so she could not prepare her statements or prove her figures to the tax authority. Second, the printouts show customers' names and addresses in open boxes. Anyone entering the storeroom could read or take them, which would be a breach of confidentiality and could lead to complaints, loss of customers or penalties under data protection law.",
              points: ["Water or fire damage to the only copy of the records (1)", "Consequence: statements cannot be prepared or figures proved to the tax authority (1)", "Customers' personal details in open boxes can be read or taken (1)", "Consequence: breach of confidentiality, complaints, lost customers or penalties (1)"],
            },
            {
              label: "c",
              marks: 6,
              prompt: "Explain one advantage and one disadvantage for Mariam of each of options A, B and C.",
              model: "Option A: a fireproof cabinet protects the paper from fire and water and needs no power or internet. However, it is still a single copy, it does nothing to reduce the 7,200 sheets printed each year, and the accountant in another city still cannot see the records. Option B: digital records on the shop computer are quick to search and the weekly copy means there is a second copy. However, the external drive is kept in the same shop, so a fire or theft could destroy both, up to a week of records could be lost, and Mariam cannot check the records from home. Option C: Mariam and her accountant can both reach the same records from home and from another city, and the provider keeps backups away from the shop. However, there is a continuing subscription, she depends on the internet and on the provider's security, and anyone who learns her login could reach the data.",
              points: ["A advantage: protects paper from fire and water with no power or internet needed (1)", "A disadvantage: still one copy, no paper saving, no access for the accountant (1)", "B advantage: quick to search, with a second copy (1)", "B disadvantage: backup kept in the same shop, so both can be lost; no access from home (1)", "C advantage: access from home and by the accountant; provider backups away from the shop (1)", "C disadvantage: subscription, internet dependence or reliance on the provider's security (1)"],
            },
            {
              label: "d",
              marks: 6,
              prompt: "Advise Mariam which option she should choose. Justify your answer, referring to both safety and sustainability.",
              model: "Mariam should choose Option C. She checks the business from home and her accountant is in another city, so a cloud service gives both of them access to the same records, which neither A nor B does. The provider keeps backups away from the shop, so a leak or fire can no longer destroy her only copy. Her internet is reliable, so the main weakness of a cloud service is a small risk for her. On sustainability, she can stop printing order and payment confirmations and keep them digitally, saving about 7,200 sheets a year, and she can securely shred and recycle the two years of paper records that are older than six years, keeping the rest safe until their retention period ends. To manage the remaining risks she should use a strong password with two-step login and keep an occasional backup copy away from the shop. Option A is weaker because it keeps a single paper copy and saves no paper, and Option B keeps both copies in the same building.",
              points: ["Recommends Option C (1)", "Remote access suits evening checks from home and the accountant in another city (1)", "Provider backups away from the shop remove the risk of losing the only copy (1)", "Stop printing confirmations, saving about 7,200 sheets a year (1)", "Shred and recycle records older than six years securely, keeping those still required (1)", "Manages remaining risks with two-step login or a separate backup, or explains why A and B are weaker (1)"],
            },
          ],
        },
        {
          id: "sq-7.3-2",
          title: "Data loss at Sherif's Pharmacy",
          stimulus:
            "Sherif runs a pharmacy. In 2026 all his accounting records were kept in a spreadsheet on one laptop, which was stolen from the shop counter. There was no backup. The laptop password was 1234 and the same login was shared by Sherif and his three staff. The spreadsheet contained five months of sales and purchase records, a list of 1,100 customers with their names, addresses and the medicines they buy, and the bank details of Sherif's suppliers. To rebuild the records, Sherif and a temporary clerk spent 60 hours at $15 an hour re-entering data from paper invoices and till rolls. Two supplier invoices could not be found and were paid late, with late payment charges of $240. Sherif also has an old desktop computer that no longer works but still holds accounting files, and boxes of paper records from 2017, 2018 and 2019. The tax authority requires records to be kept for six years. Sherif's accountant has suggested moving the accounting records to a cloud service.",
          parts: [
            {
              label: "a",
              marks: 4,
              prompt: "Explain four consequences of the theft for Sherif's business and its customers.",
              model: "Sherif paid 60 hours multiplied by $15 = $900 to rebuild the records, plus $240 in late payment charges, a direct cost of $1,140, and the late payments may damage his relationships with suppliers. Until the records were rebuilt he could not be sure of his profit, his bank balance or what he owed, so decisions were based on guesswork. The list of 1,100 customers, including the medicines they buy, is sensitive personal information; its exposure is a breach of confidentiality that could lead to complaints, loss of customers and penalties under data protection law. The thief also has the suppliers' bank details, which could be used to attempt fraud, so suppliers' trust in the pharmacy could fall.",
              points: ["Direct cost $900 plus $240 charges, $1,140 in total, and strained supplier relationships (1)", "Loss of reliable information for decisions until the records were rebuilt (1)", "Customers' confidential medical and personal data exposed, with complaints, lost customers or penalties (1)", "Supplier bank details exposed, with a risk of fraud and loss of supplier trust (1)"],
            },
            {
              label: "b",
              marks: 6,
              prompt: "Describe three data security measures Sherif should have had in place, and explain how each would have prevented or reduced the loss.",
              model: "Backups: a regular copy of the spreadsheet on a separate drive kept away from the shop, or in a cloud service, would have let Sherif restore the five months of records quickly, saving the $900 of re-entry and avoiding the $240 of late charges. Strong individual passwords and encryption: a long, unique password for each user instead of 1234, with the laptop's data encrypted, would have stopped the thief reading the customer list and supplier bank details, protecting confidentiality, and would have shown who used the system. Physical security: keeping the laptop locked away or secured with a cable lock instead of leaving it on the counter would have made the theft itself much less likely. Access levels, so that staff could not see the full customer list, and staff training are also valid measures.",
              points: ["First measure described, for example regular backups kept away from the shop (1)", "Explains its effect, for example records restored, saving $900 and $240 (1)", "Second measure described, for example strong individual passwords or encryption (1)", "Explains its effect, for example thief cannot read customer and supplier data (1)", "Third measure described, for example physical security, access levels or staff training (1)", "Explains its effect, for example theft less likely or less data exposed (1)"],
            },
            {
              label: "c",
              marks: 4,
              prompt: "Explain how Sherif should dispose of the old desktop computer and the paper records from 2017 to 2019 safely and sustainably.",
              model: "Computer: the files still on its hard drive contain confidential data, so the drive must be wiped with suitable software or physically destroyed by a specialist before the computer leaves the shop. The computer should then be recycled through an approved electronic-waste service, so that useful materials are recovered and harmful ones do not go to landfill. Paper records: in 2026 records from 2017 to 2019 are more than six years old, so the law no longer requires them, provided no dispute or enquiry involves them. They should be shredded securely, or collected by a confidential shredding service, and the shredded paper recycled.",
              points: ["Wipe or destroy the hard drive before disposal to protect confidential data (1)", "Recycle the computer through an approved electronic-waste service (1)", "Records from 2017 to 2019 are beyond the six-year retention period and may be destroyed (1)", "Shred securely and recycle the shredded paper (1)"],
            },
            {
              label: "d",
              marks: 6,
              prompt: "Evaluate whether Sherif should move his accounting records to a cloud service.",
              model: "For: the records would be held on the provider's servers, not on a laptop at the counter, so the theft of a device would no longer mean the loss of the records, and Sherif could continue working on another device the same day. The provider makes regular backups automatically, so Sherif does not have to remember to do it. Cloud services offer individual logins, access levels and two-step login, so each member of staff could have limited access and a stolen password alone would not open the system, protecting the confidential customer data. Against: Sherif would depend on the internet to record sales and check balances; there is a continuing subscription; and the pharmacy would rely on an outside provider to keep sensitive patient data secure. Data centres also use energy, although the business would no longer need its own storage equipment. Conclusion: Sherif should move to a cloud service, because the cost and risk of another loss like this one are greater than the subscription, but only if he also stops sharing logins, uses two-step login and trains his staff.",
              points: ["Device theft no longer means loss of records; work can continue on another device (1)", "Provider makes regular backups automatically (1)", "Individual logins, access levels and two-step login protect confidential data (1)", "Depends on the internet; continuing subscription (1)", "Reliance on an outside provider for sensitive data, or energy use of data centres (1)", "Justified conclusion, with the condition that logins are not shared and staff are trained (1)"],
            },
          ],
        },
      ],
    },
  ],
};
