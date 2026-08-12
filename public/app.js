const $ = (s) => document.querySelector(s);
const money0 = new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});
const money2 = new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:2,maximumFractionDigits:2});
let baseline;

async function loadBaseline(){
  let mode='D1 API';
  try{
    const r=await fetch('/api/baseline',{headers:{accept:'application/json'}});
    if(!r.ok) throw new Error('api unavailable');
    const api=await r.json();
    if(!api.ok||!api.metrics?.length) throw new Error('empty api');
    const fallback=await (await fetch('/data/baseline.json')).json();
    baseline={...fallback,headline_metrics:api.metrics.map(m=>({...m,year:Number(String(m.effective_date).slice(0,4))}))};
  }catch{
    baseline=await (await fetch('/data/baseline.json')).json();
    mode='Authoritative static fallback';
  }
  $('#dataMode').textContent=mode;
  renderMetrics();renderHundred();
}

function formatMetric(m){
  if(m.unit==='percent') return `${m.value}%`;
  if(m.unit==='USD/month') return `${money0.format(m.value)}/mo`;
  return money0.format(m.value);
}

function renderMetrics(){
  const grid=$('#metricGrid');
  grid.innerHTML=baseline.headline_metrics.map((m,i)=>`<article class="metric-card ${i===0?'feature':''}">
    <div class="meta"><span>${String(m.statistic).toUpperCase()}</span><span>${m.year} • ${m.geography||'United States'}</span></div>
    <div class="value">${formatMetric(m)}</div><h3>${m.label}</h3><p>${m.methodology}</p>
    <a href="${m.source_url}" target="_blank" rel="noreferrer">${m.source_name||m.agency} ↗</a>
  </article>`).join('');
}

function renderHundred(){
  const cats=baseline.spending.categories;
  const max=Math.max(...cats.map(c=>c.per_100_income));
  $('#hundredBars').innerHTML=cats.map(c=>`<div class="bar-row"><div class="bar-label">${c.label}</div><div class="bar-track"><div class="bar-fill" style="width:${(c.per_100_income/max)*100}%"></div></div><div class="bar-value">${money2.format(c.per_100_income)}</div><div class="bar-sub">${c.share_of_spending}% of mean annual expenditures • ${money0.format(c.annual)}/yr</div></div>`).join('');
  const assigned=baseline.spending.average_annual_expenditures/baseline.spending.average_income_before_taxes*100;
  $('#remainderValue').textContent=money2.format(100-assigned);
}

function calcTax(taxable,brackets){let tax=0,prev=0,marginal=0;for(const [limit,rate] of brackets){const upper=limit??Infinity;if(taxable>prev){const chunk=Math.min(taxable,upper)-prev;tax+=Math.max(0,chunk)*rate;marginal=rate}if(taxable<=upper)break;prev=upper}return{tax,marginal}}

function profileEstimate(fd){
  const income=Number(fd.get('income')||0),household=fd.get('household');
  const deduction=baseline.tax_2026.standard_deduction[household];
  const taxable=Math.max(0,income-deduction);
  const federal=calcTax(taxable,baseline.tax_2026.brackets[household]);
  const ss=Math.min(income,baseline.payroll_2026.social_security_wage_base)*baseline.payroll_2026.social_security_rate;
  const med=income*baseline.payroll_2026.medicare_rate;
  const extraThreshold=household==='married_joint'?250000:200000;
  const addMed=Math.max(0,income-extraThreshold)*0.009;
  const fica=ss+med+addMed;
  return{income,household,deduction,taxable,federalTax:federal.tax,marginal:federal.marginal,fica,takeHome:income-federal.tax-fica};
}

function renderProfile(fd){
  const e=profileEstimate(fd);const housingCost=Number(fd.get('housingCost')||0)*12;const burden=e.income?housingCost/e.income:0;const housing=fd.get('housing');
  $('#takeHome').textContent=money0.format(Math.max(0,e.takeHome));
  $('#takeHomeNote').textContent=`Federal + employee payroll tax estimate only • ${money0.format(e.income)} input income`;
  $('#effectiveRate').textContent=e.income?`${(e.federalTax/e.income*100).toFixed(1)}%`:'0.0%';
  $('#marginalRate').textContent=`${(e.marginal*100).toFixed(0)}%`;
  $('#ficaValue').textContent=money0.format(e.fica);
  $('#federalTax').textContent=money0.format(e.federalTax);
  $('#taxExplainer').textContent=`Your marginal bracket is ${(e.marginal*100).toFixed(0)}%, but your estimated effective federal income-tax rate is ${e.income?(e.federalTax/e.income*100).toFixed(1):'0.0'}%. That is the difference most people miss.`;
  $('#housingBurden').textContent=`${(burden*100).toFixed(1)}% of gross income`;
  const s=$('#housingStatus');
  if(housing==='rent'){
    const diff=burden*100-31;
    if(diff<-3){s.className='status good';s.textContent='BELOW U.S. MEDIAN';$('#housingCompare').textContent=`About ${Math.abs(diff).toFixed(1)} percentage points below the 2024 U.S. renter median of 31%.`;}
    else if(diff>3){s.className='status bad';s.textContent='ABOVE U.S. MEDIAN';$('#housingCompare').textContent=`About ${diff.toFixed(1)} percentage points above the 2024 U.S. renter median of 31%. Local comparison comes next.`;}
    else{s.className='status warn';s.textContent='NEAR U.S. MEDIAN';$('#housingCompare').textContent='Within roughly 3 percentage points of the 2024 U.S. renter median of 31%.';}
  }else{s.className='status info';s.textContent='OWNER BASELINE NEXT';$('#housingCompare').textContent='We are not using the renter benchmark for owners. Total ownership-cost comparisons will include taxes, insurance, PMI, and maintenance.'}
  const children=Number(fd.get('children')||0);const firstOpp=$('#opportunityGrid .opportunity');
  if(children>0){firstOpp.querySelector('p').textContent=`You entered ${children} child${children===1?'':'ren'}. Child-related federal tax benefits are worth screening next, but the MVP will not invent eligibility or a dollar value without ages and qualifying-child details.`;firstOpp.querySelector('.status').textContent='CHECK NEXT';}
  $('#results').hidden=false;$('#results').scrollIntoView({behavior:'smooth',block:'start'});
}

$('#profileForm').addEventListener('submit',(ev)=>{ev.preventDefault();const fd=new FormData(ev.currentTarget);const saved=Object.fromEntries(fd.entries());saved.car=fd.get('car')==='on';localStorage.setItem('america-explained-profile',JSON.stringify(saved));renderProfile(fd)});
$('#editProfile').addEventListener('click',()=>$('#personalize').scrollIntoView({behavior:'smooth'}));

function restoreProfile(){try{const s=JSON.parse(localStorage.getItem('america-explained-profile')||'null');if(!s)return;const f=$('#profileForm');for(const [k,v] of Object.entries(s)){const el=f.elements.namedItem(k);if(!el)continue;if(el.type==='checkbox')el.checked=Boolean(v);else el.value=v}}catch{}}

const root=document.documentElement;const savedTheme=localStorage.getItem('ae-theme');if(savedTheme)root.dataset.theme=savedTheme;
$('#themeToggle').addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';localStorage.setItem('ae-theme',root.dataset.theme)});
restoreProfile();loadBaseline();
