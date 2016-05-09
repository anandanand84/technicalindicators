/**
 * Created by AAravindan on 5/8/16.
 */
"use strict"
const SMA        = require('../moving_averages/SMA');
const TrueRange  = require('./TrueRange');

let ATR;

let validateInput = function(input) {
  return input;
};

module.exports = ATR = function(input) {

  if(!validateInput) {
    throw 'Invalid Input'
  };

  var lows = input.low
  var highs = input.high;
  var closes = input.close;
  var period = input.period;

  if(!((lows.length === highs.length) && (highs.length === closes.length) )){
    throw ('Inputs(low,high, close) not of equal size');
  }

  var trueRange = new TrueRange({
    low : [],
    high: [],
    close: []
  });


  var maProducer = new SMA({period : period, values : []});


  this.result = [];

  this.generator = (function* (){
    var tick,trange;
    tick = yield;
    var avgTrueRange;
    while (true) {
      trange = trueRange.nextValue({
        low : tick.low,
        high : tick.high,
        close : tick.close
      });
      if(trange === undefined){
        avgTrueRange = undefined;
      }
      else if(avgTrueRange === undefined){
        avgTrueRange = maProducer.nextValue(trange);
      }else {
        avgTrueRange = ((avgTrueRange * (period - 1)) + trange) / period;
      }
      tick = yield avgTrueRange
    }
  })();

  this.generator.next();

  lows.forEach((tick,index) => {
    var result = this.generator.next({
      high : highs[index],
      low  : lows[index],
      close : closes[index]
    });
    if(result.value !== undefined){
      this.result.push(parseFloat(result.value.toFixed(2)));
    }
  });
};

ATR.calculate = function(input) {
  return (new ATR(input)).result;
};

ATR.prototype.getResult = function () {
  return this.result;
};

ATR.prototype.nextValue = function (price) {
  return this.generator.next(price).value;
};
