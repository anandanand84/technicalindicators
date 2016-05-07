/**
 * Created by AAravindan on 5/7/16.
 */
"use strict"

const SMA = require('../moving_averages/SMA');

let SD;

module.exports = SD = function(input) {

  var period = input.period
  var priceArray = input.values;

  this.result = [];

  this.generator = (function* (){
    var tick;
    var mean;
    var valuesForDistance = [];
    while (true) {
      if(mean && tick){
        mean = ((tick - mean) * exponent) + mean;
        tick = yield mean;
      }else {
        tick = yield;
        valuesForDistance.push(tick);
        mean = sma.nextValue(tick);
        if(mean){
          let sum = 0;
          valuesForDistance.reduce(function(sum, distanceValue){
            sum + ((distanceValue - mean)^2)
          }, sum)
          let sd = Math.sqrt(sum / period)
          tick = yield sd;
        }
      }
    }
  })();

  this.generator.next();

  priceArray.forEach((tick) => {
    var result = this.generator.next(tick);
    if(result.value){
      this.result.push(parseFloat(result.value.toFixed(2)));
    }
  });
};

SD.calculate = function(input) {
  return (new SD(input)).result;
};

SD.prototype.getResult = function () {
  return this.result;
};

SD.prototype.nextValue = function (price) {
  var nextResult = this.generator.next(price);
  if(nextResult.value)
    return parseFloat(nextResult.value.toFixed(2));
};
