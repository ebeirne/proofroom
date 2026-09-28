(()=>{
const result=document.getElementById('demo-result'),graphic=document.querySelector('.registration'),label=document.getElementById('registration-state');
function update(){const status=result.dataset.status;graphic.dataset.state=status||'idle';label.textContent=status==='pass'?'permissions match':status==='fail'?'permission mismatch':'ready to check'}
new MutationObserver(update).observe(result,{attributes:true,childList:true,subtree:true});update();
})();

document.getElementById('open-workspace-nav').addEventListener('click',()=>{document.querySelector('.advanced-workspace').open=true});
