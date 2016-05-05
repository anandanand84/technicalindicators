"use strict"
const LinkedList = require('linkedlist');

let SMA;

module.exports = SMA = function(period, price, options) {

    this.generator = (function* (period){
        var list = new LinkedList();
        var sum = 0;
        var counter = 1;
        var current = yield;
        list.push(0);
        while(true){
            if(counter < period){
                counter ++;
                list.push(current);
                sum = sum + current;
                current = yield;
            }
            else{
                sum = sum - list.shift() + current;
                let result = ((sum) / period);
                current = yield result;
                list.push(current);
            }
        }
    })(period);

    this.generator.next();

    this.result = [];

    price.forEach((tick) => {
        var result = this.generator.next(tick);
        if(result.value !== undefined){
            this.result.push(result.value);
        }
    });
};

SMA.calculate = function(period, price, options) {
    return (new SMA(period, price, options)).result;
};

SMA.prototype.getResult = function () {
    return this.result;
};

SMA.prototype.nextValue = function (price) {
    return this.generator.next(price).value;
};
