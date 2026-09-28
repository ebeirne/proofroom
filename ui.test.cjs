const test=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
function element(){return {dataset:{},children:[],textContent:'',append(...x){this.children.push(...x)},replaceChildren(){this.children=[]}}}
test('interactive demo fails, fixes, passes and resets without retaining the fix',()=>{
 const nodes=Object.fromEntries(['demo-result','demo-code','run-demo','fix-demo','reset-demo','demo-cases'].map(k=>[k,element()]));
 vm.runInNewContext(fs.readFileSync(__dirname+'/quick-demo.js','utf8'),{PermissionDemo:require('./permissions-demo.js'),document:{getElementById:id=>nodes[id],createElement:()=>element()}});
 nodes['run-demo'].onclick();assert.equal(nodes['demo-result'].dataset.status,'fail');
 nodes['fix-demo'].onclick();nodes['run-demo'].onclick();assert.equal(nodes['demo-result'].textContent,'pass. only the owner can delete.');
 nodes['reset-demo'].onclick();assert.equal(nodes['demo-result'].dataset.status,undefined);nodes['run-demo'].onclick();assert.equal(nodes['demo-result'].dataset.status,'fail');
});
test('corrupt saved session entries cannot prevent hosted controls from initializing',()=>{
 const nodes={};const document={getElementById:id=>nodes[id]??=(element()),createElement:()=>element()};
 vm.runInNewContext(fs.readFileSync(__dirname+'/hosted.js','utf8'),{document,window:{},localStorage:{getItem:()=>JSON.stringify([null,{}, {coverage:[null]}, {coverage:[{id:'R1',status:'checks-passed'}],createdAt:'test'}])}});
 assert.equal(nodes['session-history'].children.length,1);assert.equal(typeof nodes['connect-github'].onclick,'function');
});

test('permission fixture rejects unauthorized access and catches deny-all implementations',()=>{const d=require('./permissions-demo.js');assert.equal(d.check(d.broken).filter(x=>!x.passed).length,2);assert.ok(d.check(d.corrected).every(x=>x.passed));assert.equal(d.check(()=>false)[0].passed,false);});

test('review UI clears stale evidence after applying a diff and resets cleanly',()=>{
 const nodes={};const document={getElementById:id=>nodes[id]??={...element(),setAttribute(k,v){this[k]=v}},createElement:()=>({...element(),setAttribute(k,v){this[k]=v}})};
 vm.runInNewContext(fs.readFileSync(__dirname+'/review-ui.js','utf8'),{document,PermissionDemo:require('./permissions-demo.js')});
 nodes['review-run'].onclick();assert.match(nodes['review-summary'].textContent,/2 \/ 4/);
 nodes['review-fix'].onclick();assert.equal(nodes['review-diff'].hidden,false);
 nodes['review-fix'].onclick();assert.equal(nodes['review-summary'].textContent,'not checked');assert.equal(nodes['review-actual'].textContent,'not checked');
 nodes['review-run'].onclick();assert.match(nodes['review-summary'].textContent,/4 \/ 4/);
 nodes['review-checks'].children[0].onclick();assert.equal(nodes['review-expected'].textContent,'allow');
 nodes['review-reset'].onclick();assert.equal(nodes['review-summary'].textContent,'not checked');assert.match(nodes['review-source'].textContent,/Boolean/);
});
