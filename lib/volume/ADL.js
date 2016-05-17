/**
 * Created by AAravindan on 5/17/16.
 */
"use strict"
let ADL;

module.exports = ADL = function(input) {

  var highs       = input.high;
  var lows        = input.low;
  var closes      = input.close;
  var volumes     = input.volume;

  this.result = [];

  this.generator = (function* (){
    var result = 0;
    var tick;
    tick = yield;
    while (true)
    {
      let moneyFlowMultiplier = ((tick.close  -  tick.low) - (tick.high - tick.close)) /(tick.high - tick.low);
      let moneyFlowVolume = moneyFlowMultiplier * tick.volume;
      result = result + moneyFlowVolume
      tick = yield Math.round(result);
    }
  })();

  this.generator.next();

  highs.forEach((tickHigh, index) => {
    var tickInput = {
      high    : tickHigh,
      low     : lows[index],
      close   : closes[index],
      volume  : volumes[index]
    }
    var result = this.generator.next(tickInput);
    if(result.value){
      this.result.push(result.value);
    }
  });
};

ADL.calculate = function(input) {
  if(input.reversedInput) {
    input.high.reverse();
    input.low.reverse();
    input.close.reverse();
    input.volume.reverse();
  }
  let result = (new ADL(input)).result;
  input.reversedInput ? result.reverse():undefined;
  return result;
};

ADL.prototype.getResult = function () {
  return this.result;
};

ADL.prototype.nextValue = function (price) {
  return this.generator.next(price).value;
};
