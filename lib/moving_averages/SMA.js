"use strict"
const LinkedList = require('linkedlist');
let SMA;

module.exports = SMA = function(input) {

    var period = input.period;
    var price  = input.values;

    this.generator = (function* (period){
        var list = new LinkedList();
        var sum = 0;
        var counter = 1;
        var current = yield;
        var result;
        list.push(0);
        while(true){
            if(counter < period){
                counter ++;
                list.push(current);
                sum = sum + current;
            }
            else{
                sum = sum - list.shift() + current;
                result = ((sum) / period);
                list.push(current);
            }
            current = yield result;
        }
    })(period);

    this.generator.next();

    this.result = [];

    price.forEach((tick) => {
        var result = this.generator.next(tick);
        if(result.value !== undefined){
            this.result.push(parseFloat(result.value.toFixed(2)));
        }
    });
};

SMA.calculate = function(input) {
    if(input.reversedInput) {
        input.values.reverse();
    }
    let result = (new SMA(input)).result;
    input.reversedInput ? result.reverse():undefined;
    return result;
};

SMA.prototype.getResult = function () {
    return this.result;
};

SMA.prototype.nextValue = function (price) {
    var result = this.generator.next(price).value;
    if(result)
        return parseFloat(result.toFixed(2));
};

SMA.calculate({period : 4, values : [1,2,3,4,5,6,7,9,10] });
