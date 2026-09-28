(()=>{
const $=id=>document.getElementById(id);let fixed=false,proposing=false,results=null,selected=1,runs=0;
const cases=PermissionDemo.check(PermissionDemo.broken);
function render(){
 $('review-source').textContent="function canDelete(user) {\n  "+(fixed?"return user?.role === 'owner';":"return Boolean(user);")+"\n}";
 $('review-revision').textContent=fixed?'modified / rerun required':'original';
 if(results)$('review-revision').textContent=fixed?'modified / checked':'original / checked';
 $('review-summary').textContent=results?results.filter(c=>c.passed).length+' / 4 passed / run '+runs:'not checked';
 $('review-diff').hidden=!proposing;$('review-fix').textContent=fixed?'fix applied':proposing?'apply this change':'review fix';$('review-fix').disabled=fixed;
 $('review-checks').replaceChildren();cases.forEach((c,i)=>{const btn=document.createElement('button');btn.type='button';btn.setAttribute('aria-pressed',String(i===selected));const status=results?(results[i].passed?'pass':'fail'):'not checked';btn.textContent=c.name+' / '+status;btn.dataset.status=status;btn.onclick=()=>{selected=i;render()};$('review-checks').append(btn)});
 const c=cases[selected],r=results?.[selected];$('review-selected').textContent=c.name;$('review-verdict').textContent=r?(r.passed?'passed':'failed'):'not checked';$('review-verdict').dataset.status=r?(r.passed?'pass':'fail'):'idle';$('review-expected').textContent=c.expected?'allow':'deny';$('review-actual').textContent=r?(r.actual?'allow':'deny'):'not checked';$('review-assertion').textContent='canDelete('+(c.name==='signed out'?'null':JSON.stringify({role:c.name==='unknown role'?'unknown':c.name}))+')\n=== '+c.expected;
 $('review-explanation').textContent=r?(r.passed?'The observed result matches this assertion.':'The implementation allows deletion when the requirement says deny.'):'Run the checks to collect evidence.';
}
$('review-run').onclick=()=>{results=PermissionDemo.check(fixed?PermissionDemo.corrected:PermissionDemo.broken);runs++;selected=results.findIndex(c=>!c.passed);if(selected<0)selected=1;$('review-message').textContent=results.every(c=>c.passed)?'All four assertions passed. Select a case to inspect its evidence.':'Two assertions failed. Select a case or review the proposed fix.';render()};
$('review-fix').onclick=()=>{if(!proposing){proposing=true;$('review-message').textContent='Review the proposed change before applying it.'}else{fixed=true;proposing=false;results=null;$('review-message').textContent='Code changed. Previous evidence cleared. Run the checks again.'}render()};
$('review-reset').onclick=()=>{fixed=false;proposing=false;results=null;runs=0;selected=1;$('review-message').textContent='Reset to the original implementation. Nothing has been checked.';render()};render();
})();