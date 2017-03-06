/**
 * Created by AAravindan on 5/11/16.
 */

"use strict"

const LinkedList = require('../Utils/FixedSizeLinkedList');
const nf         = require('../Utils/NumberFormatter');

let WilliamsR;

module.exports = WilliamsR = function(input) {

  let lows = input.low;
  let highs = input.high;
  let closes = input.close;
  let period = input.period;
  let format = input.format || nf;

  if(!((lows.length === highs.length) && (highs.length === closes.length) )){
    throw ('Inputs(low,high, close) not of equal size');
  }
  this.result = [];

  //%R = (Highest High - Close)/(Highest High - Lowest Low) * -100
  //Lowest Low = lowest low for the look-back period
  //Highest High = highest high for the look-back period
  //%R is multiplied by -100 correct the inversion and move the decimal.
  this.generator = (function* (){
    let index = 1;
    let pastHighPeriods = new LinkedList(period, true, false);
    let pastLowPeriods = new LinkedList(period, false, true);
    let periodLow;
    let periodHigh;
    var tick = yield;
    let williamsR;
    while (true) {
      pastHighPeriods.push(tick.high);
      pastLowPeriods.push(tick.low);
      if(index < period){
        index++;
        tick = yield;
        continue;
      }
      periodLow = pastLowPeriods.periodLow;
      periodHigh= pastHighPeriods.periodHigh;
      williamsR = format((periodHigh - tick.close) / (periodHigh- periodLow) * -100);
      tick = yield williamsR;
    }
  })();

  this.generator.next();

  lows.forEach((low, index) => {
    var result = this.generator.next({
      high : highs[index],
      low  : lows[index],
      close : closes[index]
    });
    if(result.value !== undefined){
      this.result.push(result.value);
    }
  });
};

 WilliamsR.calculate = function(input) {
  if(input.reversedInput) {
    input.high.reverse();
    input.low.reverse();
    input.close.reverse();
  }
  let result = (new WilliamsR(input)).result;
  input.reversedInput ? result.reverse():undefined;
  return result;
};

WilliamsR.prototype.getResult = function () {
  return this.result;
};

WilliamsR.prototype.nextValue = function (input) {
  let nextResult = this.generator.next(input);
  if(nextResult.value !== undefined)
    return nextResult.value;
};
