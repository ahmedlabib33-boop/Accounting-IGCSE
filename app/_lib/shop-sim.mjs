// A one-year shop simulation. Every decision becomes a double-entry transaction,
// and the year-end accounts are produced from those transactions only.

export const SHOP = {
  name: "Omar's Sneaker Corner",
  capital: 6000,
  unitCost: 30,
  rent: 400,
  wages: 900,
  basePrice: 55,
  baseDemand: 70,
  creditShare: 0.3,
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  season: [0.8, 0.85, 1, 1, 1.05, 1.1, 1.2, 1.15, 1, 1, 1.1, 1.4],
};

const round = (value) => Math.round(value * 100) / 100;

export function startShop() {
  return {
    month: 0, bank: SHOP.capital, inventory: 0, receivables: 0, payables: 0, done: false,
    journal: [{ month: 0, text: "Owner paid in capital", debit: "Bank", credit: "Capital", amount: SHOP.capital }],
    history: [],
    totals: { revenue: 0, creditSales: 0, purchases: 0, creditPurchases: 0, rent: 0, wages: 0, drawings: 0 },
  };
}

// Customers buy fewer pairs as the price rises above the usual market price.
export function demandFor(price, month) {
  const factor = Math.max(0, 1 - ((price - SHOP.basePrice) / SHOP.basePrice) * 1.6);
  return Math.max(0, Math.round(SHOP.baseDemand * SHOP.season[month] * factor));
}

export function playMonth(state, decision) {
  if (state.done) return state;
  const buy = Math.max(0, Math.floor(Number(decision.buy) || 0));
  const price = Math.max(1, Number(decision.price) || SHOP.basePrice);
  const drawings = Math.max(0, Math.floor(Number(decision.drawings) || 0));
  const onCredit = Boolean(decision.onCredit);
  const m = state.month;
  const label = SHOP.months[m];
  const journal = [...state.journal];
  const totals = { ...state.totals };
  let { bank, inventory, receivables, payables } = state;

  // Last month's credit customers pay, and last month's supplier is paid.
  if (receivables > 0) { journal.push({ month: m, text: `${label}: credit customers paid`, debit: "Bank", credit: "Trade receivables", amount: receivables }); bank += receivables; receivables = 0; }
  if (payables > 0) { journal.push({ month: m, text: `${label}: paid the supplier`, debit: "Trade payables", credit: "Bank", amount: payables }); bank -= payables; payables = 0; }

  const cost = buy * SHOP.unitCost;
  if (buy > 0) {
    journal.push({ month: m, text: `${label}: bought ${buy} pairs at $${SHOP.unitCost}${onCredit ? " on credit" : ""}`, debit: "Purchases", credit: onCredit ? "Trade payables" : "Bank", amount: cost });
    totals.purchases += cost;
    if (onCredit) { payables += cost; totals.creditPurchases += cost; } else bank -= cost;
    inventory += buy;
  }

  const demand = demandFor(price, m);
  const sold = Math.min(inventory, demand);
  const revenue = round(sold * price);
  const creditPart = round(revenue * SHOP.creditShare);
  if (sold > 0) {
    journal.push({ month: m, text: `${label}: cash sales, ${sold} pairs at $${price}`, debit: "Bank", credit: "Sales", amount: round(revenue - creditPart) });
    journal.push({ month: m, text: `${label}: credit sales`, debit: "Trade receivables", credit: "Sales", amount: creditPart });
    bank += revenue - creditPart; receivables += creditPart; inventory -= sold;
    totals.revenue += revenue; totals.creditSales += creditPart;
  }

  journal.push({ month: m, text: `${label}: paid rent`, debit: "Rent", credit: "Bank", amount: SHOP.rent });
  bank -= SHOP.rent; totals.rent += SHOP.rent;
  journal.push({ month: m, text: `${label}: paid the shop assistant`, debit: "Wages", credit: "Bank", amount: SHOP.wages });
  bank -= SHOP.wages; totals.wages += SHOP.wages;
  if (drawings > 0) { journal.push({ month: m, text: `${label}: owner's drawings`, debit: "Drawings", credit: "Bank", amount: drawings }); bank -= drawings; totals.drawings += drawings; }

  const history = [...state.history, { month: m, buy, price, sold, demand, revenue, bank: round(bank), inventory, lostSales: demand - sold }];
  return { ...state, month: m + 1, done: m + 1 >= 12, bank: round(bank), inventory, receivables: round(receivables), payables: round(payables), journal, history, totals: { ...totals, revenue: round(totals.revenue), creditSales: round(totals.creditSales) } };
}

export function yearEndAccounts(state) {
  const { totals } = state;
  const closingInventory = state.inventory * SHOP.unitCost;
  const costOfSales = totals.purchases - closingInventory;
  const grossProfit = round(totals.revenue - costOfSales);
  const profit = round(grossProfit - totals.rent - totals.wages);
  const bankAsset = Math.max(0, state.bank);
  const overdraft = round(Math.max(0, -state.bank));
  const currentAssets = round(closingInventory + state.receivables + bankAsset);
  const currentLiabilities = round(state.payables + overdraft);
  const closingCapital = round(SHOP.capital + profit - totals.drawings);
  return {
    revenue: totals.revenue, purchases: totals.purchases, closingInventory, costOfSales, grossProfit, rent: totals.rent, wages: totals.wages, profit,
    bank: bankAsset, overdraft, receivables: state.receivables, payables: state.payables, currentAssets, currentLiabilities,
    openingCapital: SHOP.capital, drawings: totals.drawings, closingCapital,
    balances: round(currentAssets - currentLiabilities) === closingCapital,
    ratioInput: {
      revenue: totals.revenue, costOfSales, profit, interest: 0, capitalEmployed: closingCapital, currentAssets, inventory: closingInventory, openingInventory: 0,
      currentLiabilities, tradeReceivables: state.receivables, creditSales: totals.creditSales, tradePayables: state.payables, creditPurchases: totals.creditPurchases,
    },
  };
}
