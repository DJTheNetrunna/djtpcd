(() => {
  'use strict';
  const products = window.DJ_TEMPLATE_CATALOG;
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money = p => p.price ? `$${p.price} <small>USD</small>` : 'Free';
  const status = p => p.live ? (p.price ? 'Premium demo' : 'Free download') : 'Concept preview';
  const headlines = {nova:'Intelligence, with intention.',launch:'Your next big thing. Live.',orbit:'Make room for your best work.',local:'Good people. Great service.',signal:'Ideas that stay with you.',atelier:'Objects with a point of view.',bento:'Designer. Builder. Human.',flux:'Independent minds. Electric ideas.',forma:'Good design. Great impact.',folio:'A little different. A lot of purpose.',pulse:'Your workflow. In a whole new flow.',studio:'Spaces for what’s next.',gather:'Everyday things. Exceptionally made.',mono:'Ideas into experiences.'};
  let saved=[];let previousFocus;let selected=null;
  try { const data=JSON.parse(localStorage.getItem('djpcd-template-shortlist')||'[]'); if(Array.isArray(data))saved=[...new Set(data.filter(id=>products.some(p=>p.id===id)))]; } catch { /* Storage may be disabled. */ }
  const dialog=$('studio-dialog');
  function persist(){try{localStorage.setItem('djpcd-template-shortlist',JSON.stringify(saved));}catch{} $('shortlist-count').textContent=saved.length;}
  function show(title,html){previousFocus=document.activeElement;$('studio-dialog-title').textContent=title;$('studio-dialog-content').innerHTML=html;if(!dialog.open)dialog.showModal();document.body.style.overflow='hidden';}
  function render(){
    const term=$('studio-search').value.trim().toLowerCase(),cat=$('studio-category').value,tier=$('studio-tier').value;
    let list=products.filter(p=>(cat==='All categories'||p.category===cat)&&(tier==='All prices'||(tier==='Free'?p.price===0:p.price>0))&&`${p.name} ${p.category} ${p.desc}`.toLowerCase().includes(term));
    const sort=$('studio-sort').value;
    if(sort==='Price: low to high')list.sort((a,b)=>a.price-b.price);if(sort==='Price: high to low')list.sort((a,b)=>b.price-a.price);if(sort==='Name')list.sort((a,b)=>a.name.localeCompare(b.name));
    $('studio-results').textContent=`${list.length} of ${products.length} designs · paid previews $39–$99`;
    $('studio-grid').innerHTML=list.map(p=>`<article class="template-card"><button class="template-cover ${esc(p.color)}" data-preview="${p.id}" aria-label="Preview ${esc(p.name)}"><b>${esc(p.name)} ↗</b><small>${esc(p.category.toUpperCase())} / DJ STUDIO</small><strong>${esc(headlines[p.id])}</strong><i aria-hidden="true">${p.id==='orbit'?'▦':p.id==='bento'?'◒':'✳'}</i><span class="template-badge">${status(p)}</span></button><div class="template-card-body"><div class="template-card-title"><h3>${esc(p.name)}</h3><b>${money(p)}</b></div><p>${esc(p.desc)}</p><div class="template-card-meta"><span>${esc(p.category)}</span><span>${p.live?'HTML / CSS / JS':'Design concept'}</span></div><button class="studio-secondary" data-preview="${p.id}">${p.live?'Explore live demo':'View concept details'} ↗</button></div></article>`).join('')||'<div class="studio-empty"><h3>No templates match those filters.</h3><p>Try a different search or reset the filters.</p></div>';
  }
  function preview(id){
    const p=products.find(x=>x.id===id);if(!p)return;selected=p;
    show(p.name,`${p.live?`<div class="demo-devices" aria-label="Demo size"><button class="studio-secondary" data-device="desktop" aria-pressed="true">Desktop</button><button class="studio-secondary" data-device="phone" aria-pressed="false">Mobile</button></div><div class="demo-stage"><iframe src="/assets/templates/${p.id}.html" title="${esc(p.name)} interactive demo" sandbox="allow-scripts"></iframe></div>`:''}<div class="demo-info"><span class="hero-eyebrow">${esc(p.category)} / ${status(p)}</span><h3>${esc(p.desc)}</h3><span class="demo-price">${money(p)}</span><p>${p.live?'Responsive one-page frontend demo. No backend, AI service, checkout, or message delivery is connected.':'Original design concept. Downloadable files, final page count, and commercial terms are still pending.'}</p><div class="studio-actions">${p.live&&!p.price?`<button class="studio-button" data-download="${p.id}">Download free HTML ↓</button>`:''}<button class="studio-secondary" data-save="${p.id}">${saved.includes(p.id)?'Saved to shortlist ✓':'Save to shortlist +'}</button><a class="studio-secondary" href="/index.html#contact">Ask DJ to customize it ↗</a></div><p class="demo-note">${p.price?'Proposed one-time price. Purchases and paid source packages are not available yet.':'Free starter license: adapt for personal, business, or client websites; do not redistribute or sell the unchanged template.'}</p><p id="download-status" role="status" aria-live="polite"></p></div>`);
  }
  function shortlist(){selected=null;show('Your template shortlist',`<div class="demo-info"><p class="studio-notice">Saved in this browser. This is a planning list; no order or payment is created.</p>${saved.length?saved.map(id=>{const p=products.find(x=>x.id===id);return `<div class="shortlist-row"><div><strong>${esc(p.name)}</strong><p>${esc(p.category)} · ${p.price?'Proposed $'+p.price:'Free'} · ${status(p)}</p><button class="studio-link" data-preview="${id}">View design</button></div><button class="studio-secondary" data-remove="${id}">Remove</button></div>`}).join(''):'<p>Your shortlist is empty. Explore the collection and save a design you like.</p>'}<p class="studio-notice">Paid checkout is not connected. Free downloads are available inside the three free starter demos.</p></div>`);}
  document.addEventListener('click',async e=>{
    const b=e.target.closest('button');if(!b)return;
    if(b.dataset.preview)preview(b.dataset.preview);
    if(b.dataset.save){if(!saved.includes(b.dataset.save))saved.push(b.dataset.save);persist();b.textContent='Saved to shortlist ✓';}
    if(b.dataset.remove){saved=saved.filter(x=>x!==b.dataset.remove);persist();shortlist();}
    if(b.dataset.device){dialog.querySelector('.demo-stage').classList.toggle('phone',b.dataset.device==='phone');dialog.querySelectorAll('[data-device]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));}
    if(b.dataset.download){
      const p=products.find(x=>x.id===b.dataset.download&&x.live&&!x.price);if(!p)return;
      b.disabled=true;$('download-status').textContent='Preparing your HTML file…';
      try{const response=await fetch(`/assets/templates/${p.id}.html`);if(!response.ok)throw new Error('Download unavailable');const source=await response.text();if(!source.startsWith('<!DOCTYPE html>'))throw new Error('Unexpected file');const url=URL.createObjectURL(new Blob([source],{type:'text/html;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=`dj-studio-${p.id}.html`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);if(selected?.id===p.id&&$('download-status'))$('download-status').textContent='Download started. Edit the HTML to replace sample content and contact links.';}
      catch{if($('download-status'))$('download-status').innerHTML=`Download did not start. <a class="studio-link" href="/assets/templates/${p.id}.html" download="dj-studio-${p.id}.html">Open or save the HTML file directly</a>.`;}
      finally{b.disabled=false;}
    }
  });
  $('studio-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>{document.body.style.overflow='';$('studio-dialog-content').replaceChildren();selected=null;previousFocus?.focus();});
  $('shortlist-open').addEventListener('click',shortlist);
  $('studio-search').addEventListener('input',render);['studio-category','studio-tier','studio-sort'].forEach(id=>$(id).addEventListener('change',render));
  $('studio-reset').addEventListener('click',()=>{$('studio-search').value='';$('studio-category').selectedIndex=0;$('studio-tier').selectedIndex=0;$('studio-sort').selectedIndex=0;render();});
  persist();render();
})();
