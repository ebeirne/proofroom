const test=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
function element(){return {dataset:{},children:[],textContent:'',append(...x){this.children.push(...x)},replaceChildren(){this.children=[]}}}
test('interactive demo fails, fixes, passes and resets without retaining the fix',()=>{
 const nodes=Object.fromEntries(['cart-result','cart-code','run-cart','fix-cart','reset-cart'].map(k=>[k,element()]));
 vm.runInNewContext(fs.readFileSync(__dirname+'/quick-demo.js','utf8'),{document:{getElementById:id=>nodes[id]}});
 nodes['run-cart'].onclick();assert.equal(nodes['cart-result'].dataset.status,'fail');
 nodes['fix-cart'].onclick();nodes['run-cart'].onclick();assert.equal(nodes['cart-result'].textContent,'PASS: Expected $90. Actual $90.');
 nodes['reset-cart'].onclick();assert.equal(nodes['cart-result'].dataset.status,undefined);nodes['run-cart'].onclick();assert.equal(nodes['cart-result'].dataset.status,'fail');
});
test('corrupt saved session entries cannot prevent hosted controls from initializing',()=>{
 const nodes={};const document={getElementById:id=>nodes[id]??=(element()),createElement:()=>element()};
 vm.runInNewContext(fs.readFileSync(__dirname+'/hosted.js','utf8'),{document,window:{},localStorage:{getItem:()=>JSON.stringify([null,{}, {coverage:[null]}, {coverage:[{id:'R1',status:'checks-passed'}],createdAt:'test'}])}});
 assert.equal(nodes['session-history'].children.length,1);assert.equal(typeof nodes['connect-github'].onclick,'function');
});
