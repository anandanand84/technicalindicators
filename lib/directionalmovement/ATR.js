/**
 * Created by AAravindan on 5/8/16.
 */
"use strict"
const SMA        = require('./SMA');
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
    var index = 1;
    var tick,trange,avgtrueRange;
    tick = yield
    while (true) {
      trange = trueRange.nextvalue({
        low : tick.low,
        high : tick.high,
        close : tick.close
      })
      if(!trange){
        last = undefined;
      }
      else if(!last){
        last = yield maProducer.nextValue(trange);;
      }else {
        last = ((last * (period - 1)) + avgtrueRange) / period;
      }
      tick = yield last
    }
  })();

  this.generator.next();

  lows.forEach((tick,index) => {
    var result = this.generator.next({
      high : highs[index],
      low  : lows[index],
      close : closes[index]
    });
    if(result.value){
      this.result.push(result.value);
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
