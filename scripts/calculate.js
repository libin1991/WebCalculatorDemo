//面向过程的解决思路
'use strict';

var first=0;
var second=0;
var result=0;
var isFirst=true; //true表示第一个运算数
var math; //运算种类；
var out=document.getElementById("output");
var t=0;
var count=0;
function inClick(number) {
    if (count===0){
        t+=number;
    }else {
        t=t*10+number;
    }
    count++;
    if (isFirst){
        first = t;
        out.value=t;
    }else {
        second =t;
        out.value=t;
    }
}

function getOperation(operation) {
    math=operation;
    if (math!='sqrt'||'cos'||'sin'){
        isFirst=!isFirst;
    }
    count=0;
    t=0;
}

function produce() {
    if (math==='pow'){
        result=Math.pow(first,second);
    }
    if (math==='sqrt'){
        result=Math.sqrt(first);
    }
    if (math==='plus'){
        result=first+second;
    }
    if (math==='minus'){
        result=first-second;
    }
    if (math==='multi'){
        result=first*second;
    }
    if (math==='divi'){
        result=first/second;
    }
    if (math==='cos'){
        var a = (Math.PI/180)*first;
        result=Math.cos(a);
    }
    if (math==='sin'){
        var b = (Math.PI/180)*first;
        result=Math.sin(b);
    }
    if (math==='mod'){
        result=first%second;
    }
    out.value=result;
    first=0;
    second=0;
    t=0;
    count=0;
    if (math!='cos'||'sqrt'||'sin'){
        isFirst=!isFirst;
    }
}