"use strict"
const SMA        = require('./SMA');
const nf         = require('../Utils/NumberFormatter');

let EMA;

module.exports = EMA = class EMA {
  constructor(input) {
    this._generate(input);
  };

  _generate(input) {
    var period;
    var priceArray;
    var exponent;
    var sma;
    this.format = input.format || nf;
    this.result = [];
    period = input.period;
    exponent = (2 / (period + 1));
    priceArray = input.values;
    sma = new SMA({period : period, values :[], format : (v) => {return v}});

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
        this.result.push(this.format(result.value));
      }
    });
  }

  static calculate(){
    if(input.reversedInput) {
      input.values.reverse();
    }
    let result = (new EMA(input)).result;
    input.reversedInput ? result.reverse():undefined;
    return result;
  }

  set result(result) {
    this.result = result;
  }

  get result() {
    return this.result;
  }

  getResult() {
    return this.result;
  }

  nextValue(input)  {
    var nextResult = this.generator.next(input);
    if(nextResult.value)
      return this.format(nextResult.value);
  }
}
