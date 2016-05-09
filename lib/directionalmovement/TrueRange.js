/**
 * Created by AAravindan on 5/8/16.
 */
/**
 * Created by AAravindan on 5/8/16.
 */
"use strict"
let TrueRange;

module.exports = TrueRange = function(input) {

  var lows = input.low;
  var highs = input.high;
  var closes = input.close;

  if(lows.length != highs.length) {
    throw ('Inputs(low,high) not of equal size');
  }

  var sma,sd;

  this.result = [];

  this.generator = (function* (){
    var current = yield;
    var previousClose,result;
    while (true) {
      result = Math.max(
          current.high - current.low,
          isNaN(Math.abs(current.high - previousClose)) ? 0 : Math.abs(current.high - previousClose),
          isNaN(Math.abs(current.low - previousClose)) ? 0 : Math.abs(current.low - previousClose)
      );
      previousClose = current.close;
      if(result){
        result = parseFloat(result.toFixed(2))
      }
      current = yield result;
    }
  })();

  this.generator.next();

  lows.forEach((tick, index) => {
    var result = this.generator.next({
      high : highs[index],
      low  : lows[index],
      close: closes[index]
    });
    if(result.value){
      this.result.push(result.value);
    }
  });
};

TrueRange.calculate = function(input) {
  return (new TrueRange(input)).result;
};

TrueRange.prototype.getResult = function () {
  return this.result;
};

TrueRange.prototype.nextValue = function (price) {
  return this.generator.next(price).value;
};
