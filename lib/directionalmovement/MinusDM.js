/**
 * Created by AAravindan on 5/8/16.
 */
"use strict"
const nf = require('../Utils/NumberFormatter');

let MDM;

module.exports = MDM = function(input) {

  var lows = input.low
  var highs = input.high;
  var format = input.format || nf;

  if(lows.length != highs.length) {
    throw ('Inputs(low,high) not of equal size');
  }

  this.result = [];

  this.generator = (function* (){
    var minusDm;
    var current = yield;
    var last;
    while (true) {
      if(last){
        let upMove = (current.high  - last.high)
        let downMove = (last.low - current.low)
        minusDm = format((downMove > upMove && downMove > 0) ? downMove : 0);
      }
      last = current;
      current = yield minusDm;
    }
  })();

  this.generator.next();

  lows.forEach((tick, index) => {
    var result = this.generator.next({
      high : highs[index],
      low  : lows[index]
    });
    if(result.value !== undefined)
      this.result.push(result.value);
  });
};

MDM.calculate = function(input) {
  if(input.reversedInput) {
    input.high.reverse();
    input.low.reverse();
  }
  let result = (new MDM(input)).result;
  input.reversedInput ? result.reverse():undefined;
  return result;
};

MDM.prototype.getResult = function () {
  return this.result;
};

MDM.prototype.nextValue = function (price) {
  return this.generator.next(price).value;
};
