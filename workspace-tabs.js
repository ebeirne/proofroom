(()=>{
const host=document.querySelector('#workspace'),sections=[...host.querySelectorAll(':scope > .brief-panel')];
const nav=document.createElement('div');nav.className='workspace-tabs';nav.setAttribute('role','tablist');nav.setAttribute('aria-label','Workspace');
const groups=[sections.slice(0,1),sections.slice(1,3),sections.slice(3,4),sections.slice(4,5),sections.slice(5)];
const buttons=[];groups.forEach((group,i)=>{const panel=document.createElement('div');panel.id='workspace-panel-'+i;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby','workspace-tab-'+i);group.forEach(s=>panel.append(s));host.append(panel);const b=document.createElement('button');b.id='workspace-tab-'+i;b.textContent=['direction','requirements','task packet','checks','history'][i];b.setAttribute('role','tab');b.setAttribute('aria-controls',panel.id);b.onclick=()=>select(i);b.onkeydown=e=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?groups.length-1:(i+(e.key==='ArrowRight'?1:groups.length-1))%groups.length;select(next);buttons[next].focus()}};buttons.push(b);nav.append(b)});
function select(active){buttons.forEach((b,i)=>{b.setAttribute('aria-selected',String(i===active));b.tabIndex=i===active?0:-1;document.getElementById('workspace-panel-'+i).hidden=i!==active});host.querySelector('.brief-toolbar').hidden=active!==0}
host.insertBefore(nav,host.firstChild);select(0);
})();
