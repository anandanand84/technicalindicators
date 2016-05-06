/**
 * Created by AAravindan on 5/5/16.
 */
"use strict"
let AVG_GAIN;

module.exports = AVG_GAIN = function(input) {

  let values = input.values;
  let period = input.period;

  this.generator = (function* (period){
    var lastValue;
    var counter = 1;
    lastValue = yield;
    var gainSum = 0;
    var avgGain;
    while(true){
      if(counter < period){
        var currentValue = yield;
        var gain = lastValue - currentValue;
        if(gain > 0){
          gainSum = gainSum + gain;
        }
      }
      else if(!avgGain){
        var avgGain = gainSum / period;
        lastValue = yield avgGain;
      }else {

      }
    }
  })(period);

  this.generator.next();

  this.result = [];

  values.forEach((tick) => {
    var result = this.generator.next(tick);
    if(result.value !== undefined){
      this.result.push(result.value);
    }
  });
};

AVG_GAIN.calculate = function(period, price, options) {
  return (new AVG_GAIN(period, price, options)).result;
};

AVG_GAIN.prototype.getResult = function () {
  return this.result;
};

AVG_GAIN.prototype.nextValue = function (price) {
  return this.generator.next(price).value;
};
