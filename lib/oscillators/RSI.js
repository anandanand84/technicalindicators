/**
 * Created by AAravindan on 5/5/16.
 */
"use strict"
const AverageGain = require('../Utils/AverageGain');
const AverageLoss = require('../Utils/AverageLoss');

let RSI;

module.exports = RSI = function(input, options) {

  var period = input.period;
  var values = input.values;

  var GainProvider = new AverageGain({period : period, values : [] });
  var LossProvider = new AverageLoss({period : period, values : [] });
  this.generator = (function* (period){
    var current = yield;
    var lastAvgGain,lastAvgLoss, RS, currentRSI;
    while(true){
      lastAvgGain = GainProvider.nextValue(current);
      lastAvgLoss = LossProvider.nextValue(current);
      if(lastAvgGain && lastAvgLoss){
        if(lastAvgLoss === 0){
          currentRSI = 100;
        }else{
          RS = lastAvgGain / lastAvgLoss;
          currentRSI = parseFloat((100 - (100 / (1 + RS))).toFixed(2));
        }
      }
      current = yield currentRSI;
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

RSI.calculate = function(input) {
  input.reversedInput ? input.values.reverse(): undefined;
  let result = (new RSI(input)).result;
  input.reversedInput ? result.reverse():undefined;
  return result;
};

RSI.prototype.getResult = function () {
  return this.result;
};

RSI.prototype.nextValue = function (price) {
  return this.generator.next(price).value;
};
