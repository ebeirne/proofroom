'use strict';
const M=window.ProofroomModel,$=s=>document.querySelector(s),KEY='proofroom-planner-v1';
const defaults=['instant','deposits'];
let selected=[...defaults],note='',previous=new Set(),motionOff=matchMedia('(prefers-reduced-motion: reduce)').matches,storageProblem=false;
try{const saved=JSON.parse(localStorage.getItem(KEY)||'null');if(saved&&saved.version===1&&Array.isArray(saved.selected)&&typeof saved.note==='string'){selected=M.normalize(saved.selected);note=saved.note.slice(0,2000);motionOff=motionOff||saved.motionOff===true}}catch{storageProblem=true}
function save(){try{localStorage.setItem(KEY,JSON.stringify({version:1,selected,note,motionOff}));storageProblem=false;$('#storage-status').textContent='Your choices stay in this browser.'}catch{storageProblem=true;$('#storage-status').textContent='Browser storage is unavailable. Export your brief before leaving.'}}
for(const f of M.features){const label=document.createElement('label');label.className='feature';const input=document.createElement('input');input.type='checkbox';input.value=f.id;input.id='feature-'+f.id;const text=document.createElement('span'),strong=document.createElement('strong'),small=document.createElement('small');strong.textContent=f.title;small.textContent=f.short;text.append(strong,small);label.append(input,text);$('#features').append(label);input.onchange=()=>{selected=input.checked?[...selected,f.id]:selected.filter(id=>id!==f.id);save();render(f.title+(input.checked?' added.':' removed.'))}}
function pieceDetails(item){$('#piece-title').textContent=item.title;$('#piece-kind').textContent=item.kind==='decision'?'A decision to make':M.base.includes(item.id)?'Part of the lean start':'An additional piece of work';$('#piece-why').textContent=item.why;$('#piece-assumption').textContent=item.assumption;list('#piece-reasons',item.reasons);list('#piece-questions',item.questions);$('#piece-dialog').showModal()}
function list(selector,items){const target=$(selector);target.replaceChildren();for(const text of items){const li=document.createElement('li');li.textContent=text;target.append(li)}}
function render(message=''){
 const result=M.plan(selected),ids=new Set(result.items.map(x=>x.id));const added=result.items.filter(x=>!previous.has(x.id)),removed=[...previous].filter(id=>!ids.has(id));
 for(const input of document.querySelectorAll('#features input'))input.checked=selected.includes(input.value);
 for(const b of document.querySelectorAll('[data-preset]'))b.setAttribute('aria-pressed',String(JSON.stringify([...presets[b.dataset.preset]].sort())===JSON.stringify([...selected].sort())));
 $('#scope-count').textContent=result.items.length;$('#scope-count').setAttribute('aria-label',result.items.length+' scope pieces');
 $('#change-status').textContent=message?message+' '+(added.length?added.length+' work '+(added.length===1?'piece':'pieces')+' added. ':'')+(removed.length?removed.length+' no longer needed. ':'')+(!added.length&&!removed.length?'The existing pieces already cover its dependencies.':''):'Try removing a feature. Shared dependencies stay until nothing else needs them.';
 const map=$('#dependency-map');map.replaceChildren();
 for(const item of result.items){const b=document.createElement('button');b.className='piece'+(M.base.includes(item.id)?'':' added')+(message&&added.some(x=>x.id===item.id)?' new':'');b.type='button';const title=document.createElement('b'),reason=document.createElement('small');title.textContent=item.title;reason.textContent=M.base.includes(item.id)?'Lean foundation':item.reasons.filter(x=>x!=='Lean starting point').join(' + ');b.append(title,reason);b.setAttribute('aria-label',item.title+'. Why is this needed?');b.onclick=()=>pieceDetails(item);map.append(b)}
 const trade=$('#tradeoffs');trade.replaceChildren();const chosen=M.features.filter(f=>selected.includes(f.id));
 if(!chosen.length){const p=document.createElement('p');p.textContent='A person checks requests and sends confirmations. This keeps the first release smaller, but it needs regular operator attention.';trade.append(p)}
 for(const f of chosen){const p=document.createElement('p'),b=document.createElement('b');b.textContent=f.title+'. ';p.append(b,document.createTextNode(f.tradeoff));trade.append(p)}
 if(selected.includes('deposits')&&selected.includes('reschedule')){const p=document.createElement('p');p.textContent='Together: decide whether a deposit transfers when a booking moves, and what happens when the new service costs more.';trade.append(p)}
 $('#version-title').textContent=chosen.length?chosen.length+' customer '+(chosen.length===1?'feature.':'features.'):'The essentials, for now.';
 $('#version-copy').textContent=chosen.length?'Your version contains the 5 foundation pieces plus '+result.added.length+' additional pieces. Shared dependencies are counted once.':'The same lean starting point: requests, manual approval and a confirmation.';
 list('#version-list',chosen.map(f=>f.title));
 $('#defer-copy').textContent=chosen.length?'To ship leaner, untick an idea above. Its work disappears only when no other selected feature needs it.':'You can add automation later when the manual process earns its place.';
 $('#question-count').textContent=result.questions.length+' questions';list('#questions-list',result.questions);previous=ids;
}
const presets={lean:[],useful:['instant','reschedule','reminders'],full:M.features.map(f=>f.id)};
for(const b of document.querySelectorAll('[data-preset]'))b.onclick=()=>{selected=[...presets[b.dataset.preset]];save();render(b.textContent+' selected.')};
$('#context').value=note;$('#context').oninput=e=>{note=e.target.value.slice(0,2000);save()};
for(const b of document.querySelectorAll('[data-close]'))b.onclick=()=>document.getElementById(b.dataset.close).close();
$('#export').onclick=()=>{$('#brief-preview').value=M.markdown(selected,note);$('#export-status').textContent='Nothing is sent. Download a file or copy the brief.';$('#export-dialog').showModal()};
function download(name,text,type){const blob=new Blob([text],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$('#export-status').textContent='Download requested. The complete brief remains available above to select and copy.'}
$('#download-md').onclick=()=>download('proofroom-booking-brief.md',M.markdown(selected,note),'text/markdown;charset=utf-8');
$('#download-json').onclick=()=>download('proofroom-booking-brief.json',JSON.stringify(M.brief(selected,note),null,2),'application/json');
$('#copy').onclick=async()=>{try{await navigator.clipboard.writeText($('#brief-preview').value);$('#export-status').textContent='Brief copied.'}catch{$('#brief-preview').select();$('#export-status').textContent='Clipboard access is unavailable. The brief is selected so you can copy it manually.'}};
render();if(storageProblem)$('#storage-status').textContent='Saved choices could not be read. Export your brief before leaving.';
