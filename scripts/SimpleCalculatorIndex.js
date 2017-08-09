'use strict';
//显示台对象
var Main = {
    isFirst: true,                                  //用以判断当前输入环境是Operation.first还是Operation.second
    temp: 0,                                        //输入数字的缓存
    count: 0,                                       //统计输入数字的次数
    description: document.getElementById("sum"),    //用来显示运算过程
    out: document.getElementById("content"),        //用来显示运算结果
    formula: "",                                    //用来记录运算表达式，以便输出到运算过程显示框
    computer: 0,                                    //运算实体对象
    subCount: 0,                                    //记录减号按键次数
    addCount: 0,                                    //记录加号按键次数
    multiCount: 0,                                  //记录乘号按键次数
    divCount: 0,                                    //记录除号按键次数
    modCount: 0,                                    //记录求模按键次数
    subLocation: -1,                                //记录运算公式字符串中运算符号位置
    dotAddress: -1,                                 //记录小数点在数值字符串中的位置
    dotFlag: false,                                 //用以判断小数点按键是否按下
    dotLocation: -1,                                //永久保存subLocation
    deleteTemp: 0,                                  //永久保存存入Operation.first的temp值
    deleteCount: 0,                                 //永久保存存入Operation.first的count值
    deleteDotAddress: -1,                           //永久保存存入Operation.first的dotAddress值
    inClick: function (number) {
        if (number === 'd') {
            var last = this.formula.charAt(this.formula.length - 1);
            var fl = this.formula.length;
            if (last === '.' || last === '+' || last === '-' || last === 'X' || last === '/' || last === '%') {
                switch (last) {
                    case '.':
                        this.dotAddress = -1;
                        this.dotFlag = false;
                        break;
                    case '+':
                        this.addCount--;
                        this.isFirst = true;
                        this.temp = this.deleteTemp;
                        this.count=this.deleteCount;
                        this.dotAddress = this.deleteDotAddress;
                        break;
                    case '-':
                        this.subCount--;
                        if (fl === this.dotLocation + 1) {
                            this.isFirst = true;
                            this.temp = this.deleteTemp;
                            this.count=this.deleteCount;
                            this.dotAddress = this.deleteDotAddress;
                        }
                        break;
                    case 'X':
                        this.multiCount--;
                        this.isFirst = true;
                        this.temp = this.deleteTemp;
                        this.count=this.deleteCount;
                        this.dotAddress = this.deleteDotAddress;
                        break;
                    case '/':
                        this.divCount--;
                        this.isFirst = true;
                        this.temp = this.deleteTemp;
                        this.count=this.deleteCount;
                        this.dotAddress = this.deleteDotAddress;
                        break;
                    case '%':
                        this.modCount--;
                        this.isFirst = true;
                        this.temp = this.deleteTemp;
                        this.count=this.deleteCount;
                        this.dotAddress = this.deleteDotAddress;
                        break;
                }
                this.formula = this.formula.substring(0, this.formula.length - 1);
                this.description.value = this.formula;
                return;
            }

            this.formula = this.formula.substring(0, this.formula.length - 1);
            this.description.value = this.formula;

            var f = this.temp % 10;
            f /= 10;
            this.temp = this.temp / 10 - f;
            --this.count;
            if (this.isFirst) {
                Operation.first = this.temp;
                this.subLocation = this.formula.length;
                this.dotLocation = this.subLocation;
            } else {
                Operation.second = this.temp;
            }
        } else {
            this.formula += number;
            this.description.value = this.formula;
        }

        if (number === 'PI') {
            if (this.isFirst) {
                Operation.first = Math.PI;
                this.subLocation = this.formula.length;            //保证记录的是第一个运算数的后面那个运算符
                this.dotLocation = this.subLocation;
            } else {
                Operation.second = Math.PI;
            }
        }

        if (number === '.') {
            this.dotAddress = this.count;
            this.dotFlag = true;
        }

        if (typeof number === "number") {
            if (this.count === 0) {
                this.temp += number;
            } else {
                this.temp = this.temp * 10 + number;
            }
            this.count++;

            if (this.isFirst) {
                Operation.first = this.temp;
                this.subLocation = this.formula.length;
                this.dotLocation = this.subLocation;
                this.deleteTemp = this.temp;
                this.deleteCount = this.count;
                this.deleteDotAddress = this.dotAddress;
            } else {
                Operation.second = this.temp;
            }
        }
    },

    getOperation: function (math) {
        //如果Operation.first是小数的话，在输入运算符号之前进行小数化
        if (this.dotFlag) {
            let mi = this.count - this.dotAddress;
            this.temp = this.temp * Math.pow(10, -mi);
            if (this.isFirst) {
                Operation.first = this.temp;
            }
            this.dotFlag = !this.dotFlag;
        }
        this.formula += math;
        this.description.value = this.formula;


        //此时记录输入各个运算符号按键的次数
        switch (math) {
            case '+':
                Main.addCount++;
                break;
            case '-':
                Main.subCount++;
                break;
            case 'X':
                Main.multiCount++;
                break;
            case '/':
                Main.divCount++;
                break;
            case '%':
                Main.modCount++;
                break;
        }
        if (math === '+' || math === 'X' || math === '%' || math === '^' || math === '/') {
            this.isFirst = !this.isFirst;
        } else if (math === '-') {
            if (this.formula.charAt(this.subLocation) === '-') {
                this.isFirst = !this.isFirst;
                this.subLocation = -2;         //防止减号运算和第二个运算数也为负数的矛盾
            }
        }

        this.count = 0;
        this.temp = 0;
        this.dotAddress = -1;
    },
    display: function () {
        //如果第二个运算数为小数的话，在此进行小数化
        if (this.dotFlag) {
            let m = this.count - this.dotAddress;
            this.temp = this.temp * Math.pow(10, -m);
            if (this.isFirst) {
                Operation.first = this.temp;
            } else {
                Operation.second = this.temp;
            }
            this.dotFlag = !this.dotFlag;
        }


        //计算之前首先根据各运算符按键次数判断运算逻辑
        if (this.subCount === 1) {
            if (this.addCount != 0 || this.multiCount != 0 || this.divCount != 0 || this.modCount != 0) {
                if (this.formula.charAt(0) === '-') {
                    Operation.first = Operation.first * (-1);
                } else {
                    Operation.second = Operation.second * (-1);
                    if (this.addCount === 1) {
                        operationFactory.produce('+');
                    }
                    if (this.multiCount === 1) {
                        operationFactory.produce('X');
                    }
                    if (this.divCount === 1) {
                        operationFactory.produce('/');
                    }
                    if (this.modCount === 1) {
                        operationFactory.produce('%');
                    }
                }
            } else {
                operationFactory.produce('-');
            }
        } else if (this.subCount === 2) {
            if (this.addCount != 0 || this.multiCount != 0 || this.divCount != 0 || this.modCount != 0) {
                Operation.first *= (-1);
                Operation.second *= (-1);
                if (this.addCount === 1) {
                    operationFactory.produce('+');
                }
                if (this.multiCount === 1) {
                    operationFactory.produce('X');
                }
                if (this.divCount === 1) {
                    operationFactory.produce('/');
                }
                if (this.modCount === 1) {
                    operationFactory.produce('%');
                }
            } else {
                if (this.formula.charAt(0) === '-') {
                    Operation.first *= (-1);
                } else {
                    Operation.second *= (-1);
                }
            }
        } else if (this.subCount === 3) {
            Operation.first *= (-1);
            Operation.second *= (-1);
        }


        this.formula += '=';
        this.description.value = this.formula;
        this.computer.get(Operation.first, Operation.second);
        this.out.value = Operation.result;
        this.count = 0;
        this.temp = 0;
        this.formula = "";
        this.subLocation = -1;
        this.addCount = 0;
        this.subCount = 0;
        this.multiCount = 0;
        this.divCount = 0;
        this.modCount = 0;
        this.deleteCount = 0;
        this.deleteTemp = 0;
        this.dotLocation = -1;
        if (this.isFirst === false) {
            this.isFirst = !this.isFirst;
        }

    },
    onreset: function () {
        Operation.first = 0;
        Operation.second = 0;
        Operation.result = 0;
        this.isFirst = true;
        this.count = 0;
        this.temp = 0;
        this.formula = "";
        this.out.value = 0;
        this.description.value = "";
        this.dotFlag = false;
        this.subLocation = -1;
        this.dotAddress = -1;
        this.subCount = 0;
        this.addCount = 0;
        this.multiCount = 0;
        this.divCount = 0;
        this.modCount = 0;
        this.deleteCount = 0;
        this.deleteTemp = 0;
        this.dotLocation = -1;
    }
};

//同时向显示台对象和运算对象工厂传入运算类型参数
function compute(math) {
    Main.getOperation(math);
    operationFactory.produce(math);
}

