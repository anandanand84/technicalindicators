/**
 * Created by AAravindan on 5/8/16.
 */
"use strict"
const WEMA        = require('../moving_averages/WEMA');
const TrueRange  = require('./TrueRange');
const nf = require('./../Utils/NumberFormatter');

let ATR;

let validateInput = function(input) {
  return input;
};

module.exports = ATR = function(input) {

  if(!validateInput) {
    throw 'Invalid Input'
  };

  var lows = input.low;
  var highs = input.high;
  var closes = input.close;
  var period = input.period;
  var format = input.format || nf;

  if(!((lows.length === highs.length) && (highs.length === closes.length) )){
    throw ('Inputs(low,high, close) not of equal size');
  }

  var trueRange = new TrueRange({
    low : [],
    high: [],
    close: []
  });


  var wema = new WEMA({period : period, values : [], format : (v) => {return v}});


  this.result = [];

  this.generator = (function* (){
    var tick = yield;
    var avgTrueRange,trange;;
    while (true) {
      trange = trueRange.nextValue({
        low : tick.low,
        high : tick.high,
        close : tick.close
      });
      if(trange === undefined){
        avgTrueRange = undefined;
      }else {
        avgTrueRange = wema.nextValue(trange);
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
      this.result.push(format(result.value));
    }
  });
};

ATR.calculate = function(input) {
  if(input.reversedInput) {
    input.high.reverse();
    input.low.reverse();
    input.close.reverse();
  }
  let result = (new ATR(input)).result;
  input.reversedInput ? result.reverse():undefined;
  return result;
};

ATR.prototype.getResult = function () {
  return this.result;
};

ATR.prototype.nextValue = function (price) {
  return this.generator.next(price).value;
};
