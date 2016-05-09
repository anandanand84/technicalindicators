/**
 * Created by AAravindan on 5/5/16.
 */
"use strict"
const SMA = require('../moving_averages/SMA');
let AvgGain;

module.exports = AvgGain = function(input) {

  let values = input.values;
  let period = input.period;
  var gainMA = new SMA({ period : period, values : []})
  this.generator = (function* (period){
    var currentValue = yield;
    var lastValue;
    var gain;
    while(true){
      if(!lastValue){
        lastValue = currentValue;
        currentValue = yield;
      }
      gain = (currentValue - lastValue) >= 0 ? (currentValue - lastValue) : 0;
      console.log('input of maGain', gain);
      var maGain = gainMA.nextValue(gain);
      console.log('Output of maGain', maGain);
      lastValue = currentValue;
      currentValue = yield maGain
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

AvgGain.calculate = function(period, price, options) {
  return (new AvgGain(period, price, options)).result;
};

AvgGain.prototype.getResult = function () {
  return this.result;
};

AvgGain.prototype.nextValue = function (price) {
  return this.generator.next(price).value;
};
