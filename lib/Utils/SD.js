/**
 * Created by AAravindan on 5/7/16.
 */
"use strict"

const SMA = require('../moving_averages/SMA');
const LinkedList = require('../Utils/FixedSizeLinkedList');

let SD;

module.exports = SD = function(input) {

  var period = input.period
  var priceArray = input.values;

  var sma = new SMA({period : period, values : [], format : (v) => {return v}});

  this.result = [];

  this.generator = (function* (){
    var tick;
    var mean;
    var currentSet = new LinkedList(period);;
    tick = yield;
    var sd;
    while (true) {
      currentSet.push(tick);
      mean = sma.nextValue(tick);
      if(mean){
        let sum = 0;
        for(let x of currentSet.iterator()){
          sum = sum + (Math.pow((x - mean),2))
        }
        sd = Math.sqrt(sum / (period ))
      }
      tick = yield sd;
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
  input.reversedInput ? input.values.reverse(): undefined;
  let result = (new SD(input)).result;
  input.reversedInput ? result.reverse():undefined;
  return result;
};

SD.prototype.getResult = function () {
  return this.result;
};

SD.prototype.nextValue = function (price) {
  var nextResult = this.generator.next(price);
  if(nextResult.value)
    return parseFloat(nextResult.value.toFixed(2));
};
