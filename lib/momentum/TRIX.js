/**
 * Created by AAravindan on 5/9/16.
 */
"use strict"

const ROC = require('./ROC.js');
const EMA = require('../moving_averages/EMA.js');

let TRIX;

module.exports = TRIX = function(input) {

  let priceArray  = input.values;
  let period      = input.period;

  let ema              = new EMA({ period : period, values : []});
  let emaOfema         = new EMA({ period : period, values : []});
  let emaOfemaOfema    = new EMA({ period : period, values : []});
  let trixROC          = new ROC({ period : 1, values : []});

  this.result = [];

  this.generator = (function* (){
    let tick = yield;
    while (true) {
      let initialema           = ema.nextValue(tick);
      let smoothedResult       = initialema ? emaOfema.nextValue(initialema) : undefined;
      let doubleSmoothedResult = smoothedResult ? emaOfemaOfema.nextValue(smoothedResult) : undefined;
      let result               = doubleSmoothedResult ? trixROC.nextValue(doubleSmoothedResult) : undefined;
      tick = yield result;
    }
  })();

  this.generator.next();

  priceArray.forEach((tick) => {
    let result = this.generator.next(tick);
    if(result.value !== undefined){
      this.result.push(result.value);
    }
  });
};

TRIX.calculate = function(input) {
  input.reversedInput ? input.values.reverse(): undefined;
  let result = (new TRIX(input)).result;
  input.reversedInput ? result.reverse():undefined;
  return result;
};

TRIX.prototype.getResult = function () {
  return this.result;
};

TRIX.prototype.nextValue = function (price) {
  let nextResult = this.generator.next(price);
  if(nextResult.value !== undefined)
    return nextResult.value;
};
