# WebCalculatorDemo
This is my first JS project, is a simple calculator, the latter will be a variety of improvements, such as beautify the appearance, increase the function, etc.

## 项目特点
* 使用的是原生 JavaScript 、 CSS 、 HTML 语言，并没有使用任何框架
* 使用了工厂模式的设计模式
* `xxx-abandon.js`是最早的计算器业务逻辑代码，因扩展性、复用性、可维护性较低，后重构代码写了`OperationTypeFactory.js`和`SimpleCalculatorIndex.js`这份新的业务代码，改善了扩展性，复用性和可维护性。其中`OperationTypeFactory.js`是运算类型对象代码，以后如果想增加运算类型，可在此增加对应运算类型对象。`SimpleCalculatorIndex.js`主要有一个`Main`类对象，其提供了与界面交互的业务代码。
* 后期会不定期逐步增加功能或美化外观

## 版本更新
### version 1.0

![1.0版本效果](http://ww1.sinaimg.cn/large/7b6c9535ly1fi2c2bh5c3g209u0bie83.gif)

1. 提供了开方、三角函数、乘除加减运算、求幂运算
2. 只能进行正整数的运算

### version 2.0

![乘法运算](http://ww1.sinaimg.cn/large/7b6c9535gy1fiddesarljg20rs0e8u0x.gif)

![支持小数点和负数运算](http://ww1.sinaimg.cn/large/7b6c9535gy1fiddj6nzaxg20rs0e8npe.gif)

1. 支持小数点、负数运算
2. 提供 $ \pi $数值
3. 提供一键清除运算过程和退位
4. 支持显示运算表达式


## TO-DO

1. 增加科学计算界面
2. 增加多表达式计算


## 我的个人博客
**[刘志宇的新天地](http://barryliu1995.studio/)**
