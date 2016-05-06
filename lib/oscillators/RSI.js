/**
 * Created by AAravindan on 5/5/16.
 */
"use strict"
let RSI;

module.exports = RSI = function(period, price, options) {

  this.generator = (function* (period){
    var avgGain = 0;
    var avgLoss = 1;
    var current = yield;
    list.push(0);
    while(true){
      if(counter < period){
        counter ++;
        list.push(current);
        sum = sum + current;
        current = yield;
      }
      else{
        sum = sum - list.shift() + current;
        let result = ((sum) / period);
        current = yield result;
        list.push(current);
      }
    }
  })(period);

  this.generator.next();

  this.result = [];

  price.forEach((tick) => {
    var result = this.generator.next(tick);
    if(result.value !== undefined){
      this.result.push(result.value);
    }
  });
};

RSI.calculate = function(period, price, options) {
  return (new RSI(period, price, options)).result;
};

RSI.prototype.getResult = function () {
  return this.result;
};

RSI.prototype.nextValue = function (price) {
  return this.generator.next(price).value;
};
