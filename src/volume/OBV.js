/**
 * Created by AAravindan on 5/17/16.
 */
"use strict"
let OBV;

module.exports = OBV = function(input) {

  var closes      = input.close;
  var volumes     = input.volume;

  this.result = [];

  this.generator = (function* (){
    var result = 0;
    var tick;
    var lastClose;
    tick = yield;
    if(tick.close && (typeof tick.close === 'number')){
      lastClose = tick.close;
      tick = yield;
    }
    while (true)
    {
      if(lastClose < tick.close ){
        result = result + tick.volume;
      }
      else if(tick.close < lastClose){
        result = result - tick.volume;
      }
      lastClose = tick.close;
      tick = yield result;
    }
  })();

  this.generator.next();

  closes.forEach((close, index) => {
    let tickInput = {
      close   : closes[index],
      volume  : volumes[index]
    }
    let result = this.generator.next(tickInput);
    if(result.value){
      this.result.push(result.value);
    }
  });
};

OBV.calculate = function(input) {
  if(input.reversedInput) {
    input.close.reverse();
    input.volume.reverse();
  }
  let result = (new OBV(input)).result;
  input.reversedInput ? result.reverse():undefined;
  return result;
};

OBV.prototype.getResult = function () {
  return this.result;
};

OBV.prototype.nextValue = function (price) {
  return this.generator.next(price).value;
};
