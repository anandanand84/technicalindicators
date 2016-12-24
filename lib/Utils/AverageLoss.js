/**
 * Created by AAravindan on 5/5/16.
 */
"use strict"

const nf  = require('../Utils/NumberFormatter');

let AvgLoss;

module.exports = AvgLoss = function(input) {

  let values = input.values;
  let period = input.period;
  let format = input.format || nf;

  this.generator = (function* (period){
    var currentValue = yield;
    var counter = 1;
    var lossSum = 0;
    var avgLoss;
    var loss;
    var lastValue;
    while(true){
      loss = lastValue ? (lastValue - currentValue) : 0;
      loss = loss ? loss : 0;
      if(loss > 0){
        lossSum = lossSum + loss;
      }
      if(counter < (period + 1)){
        counter++;
      }
      else if(!avgLoss){
        avgLoss = lossSum / period;
      }else {
        avgLoss = ((avgLoss * (period-1)) + (loss > 0 ? loss : 0))/period;
      }
      lastValue = currentValue;
      avgLoss = avgLoss ? format(avgLoss) : undefined;
      currentValue = yield avgLoss;
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

AvgLoss.calculate = function(input) {
  if(input.reversedInput) {
    input.values.reverse();
  }
  let result = new AvgLoss(input).result;
  input.reversedInput ? result.reverse():undefined;
  return result;
};

AvgLoss.prototype.getResult = function () {
  return this.result;
};

AvgLoss.prototype.nextValue = function (price) {
  return this.generator.next(price).value;
};
