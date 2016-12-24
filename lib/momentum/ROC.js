/**
 * Created by AAravindan on 5/9/16.
 */
/**
 * Created by AAravindan on 5/7/16.
 */
"use strict"

const LinkedList = require('../Utils/FixedSizeLinkedList');
const nf = require('../Utils/NumberFormatter');

let ROC;

module.exports = ROC = function(input) {

  var period = input.period
  var priceArray = input.values;

  this.format = input.format || nf;

  this.result = [];

  this.generator = (function* (){
    let index = 1;
    var pastPeriods = new LinkedList(period);;
    var tick = yield;
    var roc;
    while (true) {
      pastPeriods.push(tick)
      if(index < period){
        index++;
      }else {
        roc = ((tick - pastPeriods.lastShift) / (pastPeriods.lastShift)) * 100
      }
      tick = yield roc;
    }
  })();

  this.generator.next();

  priceArray.forEach((tick) => {
    var result = this.generator.next(tick);
    if(result.value){
      this.result.push(this.format(result.value));
    }
  });
};

ROC.calculate = function(input) {
  input.reversedInput ? input.values.reverse(): undefined;
  let result = (new ROC(input)).result;
  input.reversedInput ? result.reverse():undefined;
  return result;
};

ROC.prototype.getResult = function () {
  return this.result;
};

ROC.prototype.nextValue = function (price) {
  var nextResult = this.generator.next(price);
  if(nextResult.value)
    return this.format(nextResult.value);
};
