// js预编译
// 1.语法分析
// 2.预编译
// 3.解释执行（解释一行，执行一行）

// 预编译过程（函数）
// 1、创建AO对象
// 2、查找形参和变量声明，形参名及变量名赋为AO的属性名，并将值赋为undefined
// 3、实参和形参统一，将实参值赋给形参
// 4、查找函数声明，函数名赋为AO的属性名，其值为函数体

function test(a) {
  console.log(a);
  var a = 123;
  console.log(a);

  function a() {}
  console.log(a);
  var b = function () {}
  console.log(b);

  function d() {}
}
test(1)
test(3)