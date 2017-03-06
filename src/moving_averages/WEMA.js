"use strict"
//TODO; THis is copied from EMA for checking if WEMA works correctly, we need to refactor if this works good.
const SMA        = require('./SMA');
const nf = require('./../Utils/NumberFormatter');

let WEMA;



module.exports = WEMA = function(input) {

  var period = input.period
  var priceArray = input.values;
  var sma;
  this.format = input.format || nf;

  this.result = [];

  sma = new SMA({period : period, values :[], format : (v) => {return v}});

  this.generator = (function* (){
    var tick = yield;
    var prevMa,currentMa;
    while (true) {
      if(prevMa === undefined){
        currentMa = sma.nextValue(tick);
      }else {
        currentMa = ((prevMa * (period - 1)) + tick) / period;
      }
      prevMa = currentMa;
      tick = yield currentMa;
    }
  })();

  this.generator.next();

  priceArray.forEach((tick) => {
    var result = this.generator.next(tick);
    if(result.value){
      this.result.push(this.format(result.value));
    }
  });
};

WEMA.calculate = function(input) {
  if(input.reversedInput) {
    input.values.reverse();
  }
  let result = (new WEMA(input)).result;
  input.reversedInput ? result.reverse():undefined;
  return result;
};

WEMA.prototype.getResult = function () {
  return this.result;
};

WEMA.prototype.nextValue = function (price) {
  var nextResult = this.generator.next(price);
  if(nextResult.value)
    return this.format(nextResult.value);
};
