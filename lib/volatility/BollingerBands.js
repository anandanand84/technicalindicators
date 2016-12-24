"use strict"
const SMA        = require('../moving_averages/SMA');
const SD         = require('../Utils/SD');
const nf = require('./../Utils/NumberFormatter');
let BollingerBands;

module.exports = BollingerBands = function(input) {

    var period = input.period
    var priceArray = input.values;
    var stdDev     = input.stdDev;
    var format = input.format || nf;

    var sma,sd;

    this.result = [];

    sma = new SMA({period : period, values :[], format : (v) => {return v}});
    sd  = new SD({period : period, values : [], format : (v) => {return v}});

    this.generator = (function* (){
        var result;
        var tick;
        var calcSMA;
        var calcsd;
        tick = yield;
        while (true) {
            calcSMA = sma.nextValue(tick);
            calcsd  = sd.nextValue(tick);
            if(calcSMA){
                result = {
                    middle : format(calcSMA),
                    upper  : format(calcSMA + (calcsd * stdDev)),
                    lower  : format(calcSMA - (calcsd * stdDev))
                }
            }
            tick = yield result;
        }
    })();

    this.generator.next();

    priceArray.forEach((tick) => {
        var result = this.generator.next(tick);
        if(result.value){
            this.result.push(result.value);
        }
    });
};

BollingerBands.calculate = function(input) {
    input.reversedInput ? input.values.reverse(): undefined;
    let result = (new BollingerBands(input)).result;
    input.reversedInput ? result.reverse():undefined;
    return result;
};

BollingerBands.prototype.getResult = function () {
    return this.result;
};

BollingerBands.prototype.nextValue = function (price) {
    return this.generator.next(price).value;
};
