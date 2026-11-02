import test from 'node:test';
import assert from 'node:assert/strict';
import {startShop,playMonth,yearEndAccounts,SHOP} from '../app/_lib/shop-sim.mjs';

test('Every journal entry is a valid pair and the year-end position balances',()=>{
  let s=startShop();
  for(let m=0;m<12;m++)s=playMonth(s,{buy:m%3===0?120:50,price:m<6?55:62,drawings:m%2?200:0,onCredit:m%2===0});
  assert.equal(s.done,true);
  for(const j of s.journal){assert.notEqual(j.debit,j.credit);assert(j.amount>=0);}
  const a=yearEndAccounts(s);
  assert.equal(a.balances,true);
  assert.equal(a.costOfSales,a.purchases-a.closingInventory);
  const bank=s.journal.reduce((t,j)=>t+(j.debit==='Bank'?j.amount:0)-(j.credit==='Bank'?j.amount:0),0);
  assert.equal(Math.round(bank*100)/100,s.bank);
});

test('An overdraft becomes a current liability and the position still balances',()=>{
  let s=startShop();
  for(let m=0;m<12;m++)s=playMonth(s,{buy:m===0?250:0,price:90,drawings:900});
  const a=yearEndAccounts(s);
  assert(a.overdraft>0);assert.equal(a.bank,0);assert.equal(a.balances,true);
});

test('Sales never exceed inventory',()=>{
  let s=startShop();s=playMonth(s,{buy:10,price:40});
  assert.equal(s.history[0].sold,10);assert.equal(s.inventory,0);assert(s.history[0].lostSales>0);
  assert.equal(SHOP.months.length,12);
});
