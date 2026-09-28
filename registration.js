(()=>{
const result=document.getElementById('cart-result'),graphic=document.querySelector('.registration'),label=document.getElementById('registration-state');
function update(){const status=result.dataset.status;graphic.dataset.state=status||'idle';label.textContent=status==='pass'?'02 / matched : $90':status==='fail'?'02 / mismatch : +$10':'02 / awaiting check'}
new MutationObserver(update).observe(result,{attributes:true,childList:true,subtree:true});update();
})();
