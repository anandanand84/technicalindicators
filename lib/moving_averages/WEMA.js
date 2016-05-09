"use strict"
//TODO; THis is copied from EMA for checking if WEMA works correctly, we need to refactor if this works good.
const SMA        = require('./SMA');

let WEMA;

module.exports = WEMA = function(input) {

  var period = input.period
  var priceArray = input.values;
  var exponent = 1 / period;
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

WEMA.calculate = function(input) {
  return (new WEMA(input)).result;
};

WEMA.prototype.getResult = function () {
  return this.result;
};

WEMA.prototype.nextValue = function (price) {
  var nextResult = this.generator.next(price);
  if(nextResult.value)
    return parseFloat(nextResult.value.toFixed(2));
};
