import test from 'node:test';
import assert from 'node:assert/strict';
import {COMMAND_DRILLS, DOUBLE_ENTRY, FIND_ERROR, RATIO_EXAMPLE, SORTERS, computeRatios} from '../app/_lib/lab-content.mjs';

test('Command-word drills have four options and a valid answer',()=>{
  for(const d of COMMAND_DRILLS){assert.equal(d.options.length,4,d.id);assert(d.answer>=0&&d.answer<4,d.id);assert.equal(new Set(d.options).size,4,d.id);}
});

test('Double-entry tasks offer both correct accounts among distinct options',()=>{
  for(const t of DOUBLE_ENTRY){assert(t.options.includes(t.debit),t.id);assert(t.options.includes(t.credit),t.id);assert.notEqual(t.debit,t.credit);assert.equal(new Set(t.options).size,t.options.length,t.id);}
});

test('Find-the-error puzzles point at a real row',()=>{
  for(const p of FIND_ERROR){assert(p.wrong>=0&&p.wrong<p.rows.length,p.id);for(const r of p.rows)assert.equal(r.length,p.columns.length,p.id);}
  const rec=FIND_ERROR.find(p=>p.id==='fe6');assert.equal(2600+500-310,2790);assert(rec);
  const app=FIND_ERROR.find(p=>p.id==='fe7');assert.equal(40000+600-8000-3000,29600);assert(app);
});

test('Ratio calculator matches hand calculations',()=>{
  const r=Object.fromEntries(computeRatios(RATIO_EXAMPLE).map(x=>[x.id,x.value]));
  assert.equal(r.gm,35);assert.equal(r.mu,53.85);assert.equal(r.pm,15);assert.equal(r.roce,21.67);
  assert.equal(r.cr,1.73);assert.equal(r.at,1);assert.equal(r.it,7.8);assert.equal(r.id,46.79);
  assert.equal(r.rd,36.5);assert.equal(r.pd,38.32);
  assert.equal(computeRatios({...RATIO_EXAMPLE,revenue:''}).find(x=>x.id==='gm').value,null);
});

test('Every drag-and-drop item belongs to one of its zones',()=>{
  for(const set of SORTERS){const names=set.items.map(i=>i[0]);assert.equal(new Set(names).size,names.length,set.id);for(const [,zone] of set.items)assert(set.zones.includes(zone),set.id+zone);}
});
