# Review log: Topic 3 Verification of accounting records (3.1 to 3.4)

Reviewed against `docs/syllabus/0452-2027-2029-syllabus.txt` (Topic 3) and `REVIEW-BRIEF.md`.
Validator: `node scripts/validate-deep.mjs --topic 3` prints OK.

Arithmetic check: every trial balance, suspense account, corrected-profit statement, updated cash book,
reconciliation statement and control account in the file was re-added, including the new items. No
arithmetic or double-entry errors were found in the original figures (Hana Mostafa $107,280; Karim
$76,090/$76,690; Lina $57,750; Rashid $106,400; Omar Saleh $125,320/$125,660; Dalia Fares $161,540;
Youssef $104,430/$104,670; Nadia Hassan suspense $540; Tarek $26,160 and net assets +$1,920; Basma
$31,230; Salwa suspense $505 and profit $44,005; Mariam suspense $500 and profit $28,900; Bassem $95 and
$18,855; Rami $3,437; Fatma ($1,425); Yara $2,197; Nabil $3,985; Hamed ($522); Hoda $6,717; Adham
($2,249); Salma $3,699; Tamer ($1,326); Noha SLCA $32,755 / PLCA $21,905; Sherif $52,000; Laila $4,510 /
$3,305; Farid $33,940; Walid $46,343 / $30,367; Ehab $56,732; Ghada $37,654 and credit sales $35,720).
Every MCQ was checked for exactly one correct answer.

## Changes

| # | Kind | Section | Item | What was wrong | What I changed |
|---|---|---|---|---|---|
| 1 | Terminology | 3.4 | Note "The purchases ledger control account" | "provision for doubtful debts" | "allowance for irrecoverable debts" |
| 2 | Terminology | 3.4 | commonErrors[4] | "provision for doubtful debts" | "allowance for irrecoverable debts, or a change in it" |
| 3 | Terminology | 3.4 | examTips[0] | "provision for doubtful debts" | "the allowance for irrecoverable debts" |
| 4 | Terminology | 3.4 | mcq-3.4-8 | Distractor and explanation used "provision for doubtful debts" | Changed to "allowance for irrecoverable debts" |
| 5 | Terminology | 3.1 | WE "Naming the type of error", ex-3.1-3, ex-3.1-7, sq-3.1-1 b, sq-3.1-2 c | "Name" is not a Cambridge command word | "Identify" |
| 6 | Terminology | 3.1 | ex-3.1-8 | "Redraft the trial balance correctly" (not a command word) | "Prepare a corrected trial balance" |
| 7 | Terminology | 3.2 | ex-3.2-2, sq-3.2-2 a | "name the type of error" | "identify the type of error" |
| 8 | Terminology | 3.3 | ex-3.3-8, ex-3.3-9, sq-3.3-1 a, sq-3.3-2 a | "Update the cash book" (not a command word) | "Prepare the updated cash book" |
| 9 | Terminology | 3.4 | ex-3.4-2 | "Name the book of prime entry" | "Identify the book of prime entry" |
| 10 | Accuracy | 3.2 | Note "Effect of errors on profit" | "Errors involving carriage change gross profit without changing profit for the year" is too general (carriage omitted does change profit) | Restricted to an amount moved between carriage inwards and carriage outwards; added the parallel case of other income posted to revenue |
| 11 | Accuracy | 3.2 | WE "Statement of corrected profit..." step 2 and answer | Rent received credited to sales: said "no effect" without noting that gross profit is overstated by $300 | Stated that revenue and gross profit are overstated by $300, profit for the year unaffected; answer notes errors 2 and 6 change gross profit only |
| 12 | Coverage | 3.1 | objectives | "purposes and limitations" and "amend a trial balance which contains errors" not stated | Objective 1 now "purposes and the limitations"; new objective on amending a trial balance |
| 13 | Coverage | 3.1 | Note "What agreement does and does not prove" | Limitations only implied through an analogy | Renamed "Purposes and limitations of a trial balance"; four explicit limitations (hidden errors; does not locate errors; not a financial statement and excludes closing inventory and year-end adjustments; only as good as the balances extracted) |
| 14 | Coverage | 3.1 | New note "Amending a trial balance which contains errors" | Syllabus bullet not taught | Three-question method (right column, should it be there, right figure) with an example |
| 15 | Coverage | 3.1 | New worked example "Amending a trial balance which contains errors" | No worked example of amending a trial balance | Sara Nabil: closing inventory removed, discount received and carriage inwards moved, wages figure corrected; totals $115,720/$111,800 to $111,610 each |
| 16 | Coverage | 3.1 | mcq-3.1-10 | Overdraft column question duplicated ex-3.1-2, a common error and an exam tip | Replaced with an amending-a-trial-balance MCQ (answer $58,700 in each column) |
| 17 | Coverage | 3.3 | objectives | No objective for the digital-transactions bullet | Added objective on the impact of digital business transactions |
| 18 | Coverage | 3.3 | keyTerms | "Bank error" (syllabus wording) not defined | Added key term "Bank error" |
| 19 | Coverage | 3.3 | New note "Digital transactions and the bank reconciliation" | Syllabus bullet "impact of digital business transactions on the bank reconciliation process" not taught | Note on fewer timing differences, card settlement delays and fees, more bank-initiated items, imported bank data and more frequent reconciliation, new risks |
| 20 | Coverage | 3.3 | ex-3.3-6 (b) | Standing order vs direct debit duplicated key terms and mcq-3.3-6; digital bullet not practised | Part (b) now asks for two effects of digital payments on reconciliation; points rewritten |
| 21 | Coverage | 3.3 | mcq-3.3-9 | Definition of unpresented cheque duplicated the key term and mcq-3.3-1 | Replaced with a digital-payments MCQ (unpresented cheques become less common) |
| 22 | Coverage | 3.4 | objectives | No objective for the digital-recording bullet | Added objective on digital recording and control accounts |
| 23 | Coverage | 3.4 | Note "What control accounts can and cannot do" | Digital recording bullet not taught; limitations framed only as comparing with ledger totals | Rewritten as "Limitations, and the impact of digital recording": automatic posting, instant totals, input errors still hidden, access control, back-up, training; states that reconciling with ledger lists is not required |
| 24 | Coverage | 3.4 | mcq-3.4-2 | Simple "which side is discount allowed" question; refunds not tested by any MCQ | Replaced with a refund-from-supplier MCQ (Credit $80 in the purchases ledger control account) |
| 25 | Scope | 3.4 | sq-3.4-1 d | Asked for causes of disagreement between the control account and the total of individual customer balances, which the syllabus note says is not required | Replaced with an evaluation of digital recording for the sales ledger control account |
| 26 | Scope | 3.4 | mcq-3.4-10 | Tested comparing the control account with the list of customer balances (not required) | Replaced with a digital-recording MCQ |
| 27 | Mark scheme | 3.1 | sq-3.1-2 | Ended with a calculation, not evaluation; part d was a recall definition | Suspense calculation moved to d (2 marks); new e (4 marks) evaluates "agreed trial balance means correct statements" using items (iii) and (iv), with credit for the $140 effect and a justified conclusion |
| 28 | Mark scheme | 3.2 | sq-3.2-1 | No evaluation part; journal marks split debit and credit of single-line corrections | a 10 to 8 (one mark per one-line correction), c 6 to 5 (errors 1 and 2 combined), new d (3 marks) advise on writing off the suspense balance ($27,730 vs $28,900) |
| 29 | Mark scheme | 3.2 | sq-3.2-2 | No evaluation part; effect of corrections on the statement of financial position not tested in a structured question | b 8 to 6, c 3 to 2, d 6 to 5; new e (4 marks) effect of errors 1 and 4 on the statement of financial position and advice about giving the bank corrected figures |
| 30 | Mark scheme | 3.3 | sq-3.3-1 d | "State one benefit" gave no evaluation | Now "advise Salma whether she should reconcile every month"; third mark needs advice supported by a benefit |
| 31 | Mark scheme | 3.3 | sq-3.3-2 e | List of three uses, no evaluation; digital bullet not in a structured question | Replaced with an evaluation of Tamer's plan to rely on card and online payments and imported bank data; justified-conclusion mark |
| 32 | Mark scheme | 3.4 | sq-3.4-2 d | "Explain two advantages and two limitations" with no judgement | Now "Advise Ghada whether to keep control accounts"; points: two advantages, one limitation, justified advice |

Count by kind: terminology 9, accuracy 2, coverage 13, scope 2, mark scheme 6 (32 in total).

## Coverage against syllabus

3.1 The trial balance
- [x] Purposes of a trial balance: note "What a trial balance is and why we prepare it"; note "Purposes and limitations"; ex-3.1-1; mcq-3.1-1.
- [x] Limitations of a trial balance: note "Purposes and limitations of a trial balance"; ex-3.1-5; sq-3.1-1 d; sq-3.1-2 e.
- [x] Prepare a trial balance from a list of balances: notes "Which column?" and "Preparing the trial balance"; WE 1 and 2; ex-3.1-2, 3.1-6, 3.1-9; sq-3.1-1 a, sq-3.1-2 a.
- [x] Amend a trial balance which contains errors: note "Amending a trial balance which contains errors"; WE "Amending a trial balance..."; ex-3.1-8; mcq-3.1-10.
- [x] Errors not affecting the trial balance (commission, compensating, complete reversal, omission, original entry, principle): note "The six errors" with table; WE 3; ex-3.1-3, 3.1-7; mcq-3.1-4 to 3.1-9; sq-3.1-1 b, sq-3.1-2 c.

3.2 Correction of errors
- [x] Correct errors using journal entries: notes "Why corrections go through the journal", "Three-question method", "Correcting the six errors"; WE 1; ex-3.2-2, 3.2-5; sq-3.2-1 a, sq-3.2-2 b.
- [x] Suspense account as a temporary measure: note "When the suspense account is needed"; 3.1 note on suspense; ex-3.2-1; mcq-3.2-1, 3.2-10.
- [x] Correct errors using a suspense account: notes "When the suspense account is needed", "Entries on the wrong side"; WE 2; ex-3.2-3, 3.2-4, 3.2-8; sq-3.2-1 b, sq-3.2-2 c.
- [x] Adjust profit after correction of errors: note "Effect of errors on profit"; WE 3; ex-3.2-6, 3.2-9; mcq-3.2-4 to 3.2-6; sq-3.2-1 c, sq-3.2-2 d.
- [x] Effect of correction of errors on the statement of financial position: note "Statement of corrected profit and the statement of financial position"; WE 3 steps 9 and 10; ex-3.2-7, ex-3.2-9 b; mcq-3.2-8, 3.2-9; sq-3.2-2 e.

3.3 Bank reconciliation
- [x] Use and purpose of a bank statement: key term "Bank statement"; note "Two records of the same money"; mcq-3.3-2.
- [x] Update the cash book for bank charges, interest paid and received, correction of errors, credit transfers, direct debits, standing orders: notes "Items on the bank statement" and "Step one"; WE 1 and 3; ex-3.3-3, 3.3-7, 3.3-8, 3.3-9; sq-3.3-1 a, sq-3.3-2 a.
- [x] Purpose and preparation of a reconciliation statement with bank errors, uncredited deposits, unpresented cheques: notes "Items in the cash book", "Step two", "Overdrafts", "Why businesses prepare"; WE 2 and 3; ex-3.3-4, 3.3-5, 3.3-7 to 3.3-9; sq-3.3-1 b and d, sq-3.3-2 b.
- [x] Impact of digital business transactions on the reconciliation process: note "Digital transactions and the bank reconciliation"; ex-3.3-6 b; mcq-3.3-9; sq-3.3-2 e.

3.4 Control accounts
- [x] Purposes of purchases ledger and sales ledger control accounts: note "Why a business keeps control accounts"; ex-3.4-1; sq-3.4-2 d.
- [x] Books of prime entry as sources: note "Where the figures come from" with table; ex-3.4-2; mcq-3.4-1; sq-3.4-1 b.
- [x] Prepare both control accounts with credit purchases and sales, receipts and payments, cash discounts, returns, irrecoverable debts, dishonoured cheques, interest on overdue accounts, contra entries, refunds, opening and closing debit and credit balances: notes on each account, contras and unusual balances; WE 1 and 2; ex-3.4-3 to 3.4-9; mcq-3.4-2 (refund), 3.4-3 to 3.4-9; sq-3.4-1 a and c, sq-3.4-2 a.
- [x] Impact of digital recording on the preparation and use of control accounts: note "Limitations, and the impact of digital recording"; mcq-3.4-10; sq-3.4-1 d.
- [x] Not required: reconciling control account balances with ledger lists. Removed from sq-3.4-1 d and mcq-3.4-10; the note says so explicitly.

Every structured question now ends with an evaluation or advice part.
