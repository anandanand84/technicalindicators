/**
 * Created by AAravindan on 5/10/16.
 */
"use strict"

const LinkedList = require('../Utils/FixedSizeLinkedList');
const SMA        = require('../moving_averages/SMA');
const nf         = require('../Utils/NumberFormatter');

let Stochastic;

module.exports = Stochastic = function(input) {

  let lows = input.low;
  let highs = input.high;
  let closes = input.close;
  let period = input.period;
  let signalPeriod = input.signalPeriod;
  let format = input.format || nf;

  if(!((lows.length === highs.length) && (highs.length === closes.length) )){
    throw ('Inputs(low,high, close) not of equal size');
  }

  this.result = [];
  //%K = (Current Close - Lowest Low)/(Highest High - Lowest Low) * 100
  //%D = 3-day SMA of %K
  //
  //Lowest Low = lowest low for the look-back period
  //Highest High = highest high for the look-back period
  //%K is multiplied by 100 to move the decimal point two places
  this.generator = (function* (){
    let index = 1;
    let pastHighPeriods = new LinkedList(period, true, false);
    let pastLowPeriods = new LinkedList(period, false, true);
    let dSma           = new SMA({
      period : signalPeriod,
      values : [],
      format : (v) => {return v}
    });
    let k,d;
    var tick = yield;
    while (true) {
      pastHighPeriods.push(tick.high);
      pastLowPeriods.push(tick.low);
      if(index < period){
        index++;
        tick = yield;
        continue;
      }
      let periodLow = pastLowPeriods.periodLow;
      k = (tick.close - periodLow) / (pastHighPeriods.periodHigh - periodLow) * 100;
      d = dSma.nextValue(k);
      tick = yield {
        k : format(k),
        d : d ? format(d) : undefined
      }
    }
  })();

  this.generator.next();

  lows.forEach((tick, index) => {
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

Stochastic.calculate = function(input) {
  if(input.reversedInput) {
    input.high.reverse();
    input.low.reverse();
    input.close.reverse();
  }
  let result = (new Stochastic(input)).result;
  input.reversedInput ? result.reverse():undefined;
  return result;
};

Stochastic.prototype.getResult = function () {
  return this.result;
};

Stochastic.prototype.nextValue = function (input) {
  let nextResult = this.generator.next(input);
  if(nextResult.value !== undefined)
    return nextResult.value;
};
