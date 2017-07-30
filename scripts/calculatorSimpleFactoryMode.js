'use strict';
//运算原型
var Operation = {
    first: 0,
    second: 0,
    result: 0
};

//各种运算对象
var Add = {
    get: function (num1, num2) {
        Operation.result = num1 + num2;
    },
    __proto__: Operation
};

var Sub = {
    get: function (num1, num2) {
        Operation.result = num1 - num2;
    },
    __proto__: Operation
};

var Multi = {
    get: function (num1, num2) {
        Operation.result = num1 * num2;
    },
    __proto__: Operation
};

var Div = {
    get: function (num1, num2) {
        if (num1 === 0) {
            alert("被除数不能为0");
            return;
        }
        Operation.result = num1 / num2;
    },
    __proto__: Operation
};

var Pow = {
    get: function (num1, num2) {
        Operation.result = Math.pow(num1, num2);
    },
    __proto__: Operation
};

var Sqrt = {
    get: function (num1) {
        Operation.result = Math.sqrt(num1);
    },
    __proto__: Operation
};

var Sin = {
    get: function (num1) {
        var a = (Math.PI / 180) * num1;
        Operation.result = Math.sin(a);
    },
    __proto__: Operation
};

var Cos = {
    get: function (num1) {
        var b = (Math.PI / 180) * num1;
        Operation.result = Math.cos(b);
    },
    __proto__: Operation
};

var Mod = {
    get: function (num1, num2) {
        Operation.result = num1 % num2;
    },
    __proto__: Operation
};

//运算对象工厂
var operationFactory = {
    produce: function (math) {
        switch (math) {
            case 'plus':
                Main.com = Add;
                break;
            case 'minus':
                Main.com = Sub;
                break;
            case 'multi':
                Main.com = Multi;
                break;
            case 'divi':
                Main.com = Div;
                break;
            case 'pow':
                Main.com = Pow;
                break;
            case 'sqrt':
                Main.com = Sqrt;
                break;
            case 'sin':
                Main.com = Sin;
                break;
            case 'cos':
                Main.com = Cos;
                break;
            case 'mod':
                Main.com = Mod;
                break;
        }
    },
    __proto__: Operation
};


//显示台对象
var Main = {
    isFirst: true,
    temp: 0,
    count: 0,
    out: document.getElementById("output"),
    com: 0,
    inClick: function (number) {
        if (this.count === 0) {
            this.temp += number;
        } else {
            this.temp = this.temp * 10 + number;
        }
        this.count++;
        if (this.isFirst) {
            Operation.first = this.temp;
            this.out.value = this.temp;
        } else {
            Operation.second = this.temp;
            this.out.value = this.temp;
        }
    },
    getOperation: function (math) {
        if (math != 'sqrt' || 'cos' || 'sin') {
            this.isFirst = !this.isFirst;
        }
        this.count = 0;
        this.temp = 0;
    },
    display: function () {
        this.com.get(Operation.first, Operation.second);
        this.out.value = Operation.result;
        this.count = 0;
        this.temp = 0;
        if (this.isFirst === false) {
            this.isFirst = !this.isFirst;
        }
    }
};

//同时向显示台对象和运算对象工厂传入运算类型参数
function compute(math) {
    Main.getOperation(math);
    operationFactory.produce(math);
}

