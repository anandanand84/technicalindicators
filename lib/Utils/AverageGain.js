/**
 * Created by AAravindan on 5/5/16.
 */
"use strict"
let AvgGain;

module.exports = AvgGain = function(input) {

  let values = input.values;
  let period = input.period;

  this.generator = (function* (period){
    var currentValue = yield;
    var counter = 1;
    var gainSum = 0;
    var avgGain;
    var gain;
    var lastValue;
    while(true){
      gain = lastValue ? (currentValue - lastValue) : 0;
      gain = gain ? parseFloat(gain.toFixed(2)) : 0;
      if(gain > 0){
        gainSum = gainSum + gain;
      }
      if(counter < (period + 1)){
        counter++;
      }
      else if(!avgGain){
        avgGain = gainSum / period;
      }else {
        avgGain = ((avgGain * (period-1)) + (gain > 0 ? gain : 0))/period;
      }
      lastValue = currentValue;
      avgGain = avgGain ? parseFloat(avgGain.toFixed(2)) : undefined;
      currentValue = yield avgGain;
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

AvgGain.calculate = function(input) {
  if(input.reversedInput) {
    input.values.reverse();
  }
  let result = new AvgGain(input).result;
  input.reversedInput ? result.reverse():undefined;
  return result;
};

AvgGain.prototype.getResult = function () {
  return this.result;
};

AvgGain.prototype.nextValue = function (price) {
  return this.generator.next(price).value;
};
