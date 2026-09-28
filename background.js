(()=>{
const canvas=document.createElement('canvas');canvas.id='registration-field';canvas.setAttribute('aria-hidden','true');document.body.prepend(canvas);
const ctx=canvas.getContext('2d'),reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(pointer:fine)');let w=0,h=0,points=[],pointer=null,last=0,frame=0;
function resize(){w=innerWidth;h=innerHeight;const d=Math.min(devicePixelRatio||1,1.5);canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0);points=[];for(let y=22;y<h;y+=38)for(let x=24;x<w;x+=38)points.push({x,y,dx:0,dy:0});draw(0)}
function draw(t){ctx.clearRect(0,0,w,h);for(const p of points){const vx=pointer?pointer.x-p.x:0,vy=pointer?pointer.y-p.y:0,dist=Math.hypot(vx,vy),influence=pointer?Math.max(0,1-dist/190):0;const amount=reduced.matches?0:influence*.045;p.dx+=(vx*amount-p.dx)*.09;p.dy+=(vy*amount-p.dy)*.09;const breath=reduced.matches?0:(Math.sin(t*.00045+p.x*.002+p.y*.001)+1)*.015;ctx.strokeStyle=`rgba(65,105,255,${.19+breath+influence*.22})`;ctx.lineWidth=.7;const x=p.x+p.dx,y=p.y+p.dy,s=1.6+influence*1.4;ctx.beginPath();ctx.moveTo(x-s,y);ctx.lineTo(x+s,y);ctx.moveTo(x,y-s);ctx.lineTo(x,y+s);ctx.stroke()}}
function tick(t){if(!document.hidden&&t-last>33){last=t;draw(t)}if(!reduced.matches)frame=requestAnimationFrame(tick)}
function start(){cancelAnimationFrame(frame);pointer=null;draw(0);if(!reduced.matches)frame=requestAnimationFrame(tick)}
addEventListener('pointermove',e=>{if(fine.matches&&!reduced.matches&&e.pointerType!=='touch')pointer={x:e.clientX,y:e.clientY}},{passive:true});document.documentElement.addEventListener('pointerleave',()=>pointer=null);addEventListener('blur',()=>pointer=null);addEventListener('resize',resize);reduced.addEventListener('change',start);resize();start();
})();
