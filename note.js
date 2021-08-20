/**
 * 防抖
 */
function debounce(delay,fn){
  let timer;
  return function(){
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(()=>{
      fn.apply(this,arguments)
    },delay)
  }
}
console.log(1)

/**
 * 节流
 */
function throttle(delay,fn){
  let canRun = true;
  return function(){
    if(!canRun) return;
    canRun = false;
    setTimeout(()=>{
      fn.apply(this,arguments)
      canRun = true;
    },delay)
  }
}

//js内存机制
var a = {n: 1};
var b = a;
a.x = a = {n: 2};

a.x
b.x 

//js闭包
function fun(n,o){
  console.log(o);
  return {
      fun:function(m){
          return fun(m,n);
      }
  };
}

var a = fun(0);a.fun(1);a.fun(2);a.fun(3);
var b = fun(0).fun(1).fun(2).fun(3);
var c = fun(0).fun(1);c.fun(2);c.fun(3);

//js call/apply/bind原理
var obj = {
    say: function () {
        function _say() {
            console.log(this);
        }
        console.log(obj);
        return _say.bind(obj);
    }()
}
obj.say()
