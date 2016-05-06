"use strict"
const SMA        = require('./SMA');

let EMA;

module.exports = EMA = function(input) {

    var period = input.period
    var priceArray = input.values;
    var exponent = 2 / (period + 1);
    var sma;

    this.result = [];

    sma = new SMA({period : period, values :[]});

    this.generator = (function* (){
        var tick;
        var prevEma;
        while (true) {
            if(prevEma && tick){
                prevEma = ((tick - prevEma) * exponent) + prevEma;
                tick = yield prevEma;
            }else {
                tick = yield;
                prevEma = sma.nextValue(tick)
                if(prevEma)
                    tick = yield prevEma;
            }
        }
    })();

    this.generator.next();

    priceArray.forEach((tick) => {
        var result = this.generator.next(tick);
        if(result.value){
            this.result.push(parseFloat(result.value.toFixed(2)));
        }
    });
};

EMA.calculate = function(input) {
    return (new EMA(input)).result;
};

EMA.prototype.getResult = function () {
    return this.result;
};

EMA.prototype.nextValue = function (price) {
    var nextResult = this.generator.next(price);
    if(nextResult.value)
        return parseFloat(nextResult.value.toFixed(2));
};
