"use strict"
const SMA        = require('./SMA');

let BollingerBands;

module.exports = BollingerBands = function(input) {

    var period = input.period
    var priceArray = input.values;
    var stdDev     = input.stdDev;

    var sma;

    this.result = [];

    sma = new SMA({period : period, values :[]});

    this.generator = (function* (){
        var result;
        var tick;
        var calcSMA;
        var stdDev;
        while (true) {
            if(calcSMA){
                result = calculateResult
                calcSMA = sma.nextValue(yield result);
            }else {
                tick = yield;
                calcSMA = sma.nextValue(tick)
                (tick - calcSMA)  ^ 2
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

BollingerBands.calculate = function(input) {
    return (new BollingerBands(input)).result;
};

BollingerBands.prototype.getResult = function () {
    return this.result;
};

BollingerBands.prototype.nextValue = function (price) {
    var nextResult = this.generator.next(price);
    if(nextResult.value)
        return parseFloat(nextResult.value.toFixed(2));
};
