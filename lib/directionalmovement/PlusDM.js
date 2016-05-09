/**
 * Created by AAravindan on 5/8/16.
 */
"use strict"
let PDM;

module.exports = PDM = function(input) {

  var lows = input.low
  var highs = input.high;

  if(lows.length != highs.length) {
    throw ('Inputs(low,high) not of equal size');
  }

  var sma,sd;

  this.result = [];

  this.generator = (function* (){
    var plusDm;
    var current = yield;
    var last;
    while (true) {
      if(last) {
        let upMove = (current.high  - last.high)
        let downMove = (last.low - current.low)
        plusDm = parseFloat(((upMove > downMove && upMove > 0) ? upMove : 0).toFixed(2));
      }
      last = current;
      current = yield plusDm;
    }
  })();

  this.generator.next();

  lows.forEach((tick, index) => {
    var result = this.generator.next({
      high : highs[index],
      low  : lows[index]
    });
    if(result.value!==undefined)
      this.result.push(result.value);
  });
};

PDM.calculate = function(input) {
  return (new PDM(input)).result;
};

PDM.prototype.getResult = function () {
  return this.result;
};

PDM.prototype.nextValue = function (price) {
  return this.generator.next(price).value;
};
