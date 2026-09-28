(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.PermissionDemo=factory()})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const cases=[{name:'owner',user:{role:'owner'},expected:true},{name:'viewer',user:{role:'viewer'},expected:false},{name:'unknown role',user:{role:'unknown'},expected:false},{name:'signed out',user:null,expected:false}];
  function broken(user){return Boolean(user)}
  function corrected(user){return user?.role === 'owner'}
  function check(fn){return cases.map(c=>{const actual=fn(c.user);return {name:c.name,expected:c.expected,actual,passed:actual===c.expected}})}
  return {broken,corrected,check};
});
