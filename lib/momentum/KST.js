/**
 * Created by AAravindan on 5/9/16.
 */
"use strict"

const ROC = require('./ROC.js');
const SMA = require('../moving_averages/SMA.js');

let KST;

module.exports = KST = function(input) {

  let priceArray  = input.values;
  let rocPer1     = input.ROCPer1;
  let rocPer2     = input.ROCPer2;
  let rocPer3     = input.ROCPer3;
  let rocPer4     = input.ROCPer4;

  let smaPer1     = input.SMAROCPer1;
  let smaPer2     = input.SMAROCPer2;
  let smaPer3     = input.SMAROCPer3;
  let smaPer4     = input.SMAROCPer4;

  let signalPeriod= input.signalPeriod;

  let roc1        = new ROC({ period : rocPer1, values: []});
  let roc2        = new ROC({ period : rocPer2, values: []});
  let roc3        = new ROC({ period : rocPer3, values: []});
  let roc4        = new ROC({ period : rocPer4, values: []});

  let sma1        = new SMA({ period : smaPer1, values: []});
  let sma2        = new SMA({ period : smaPer2, values: []});
  let sma3        = new SMA({ period : smaPer3, values: []});
  let sma4        = new SMA({ period : smaPer4, values: []});
  let signalSMA   = new SMA({ period : signalPeriod, values: []})

  this.result = [];

  let firstResult = Math.max(rocPer1 + smaPer1, rocPer2+smaPer2, rocPer3+smaPer3, rocPer4+smaPer4);
  this.generator = (function* (){
    let index = 1;
    let tick = yield;
    let kst;
    let RCMA1,RCMA2,RCMA3,RCMA4,signal,result;
    while (true) {
      let roc1Result = roc1.nextValue(tick);
      let roc2Result = roc2.nextValue(tick);
      let roc3Result = roc3.nextValue(tick);
      let roc4Result = roc4.nextValue(tick);
      RCMA1 = (roc1Result!==undefined) ? sma1.nextValue(roc1Result) : undefined;
      RCMA2 = (roc2Result!==undefined) ? sma2.nextValue(roc2Result) : undefined;
      RCMA3 = (roc3Result!==undefined) ? sma3.nextValue(roc3Result) : undefined;
      RCMA4 = (roc4Result!==undefined) ? sma4.nextValue(roc4Result) : undefined;
      if(index < firstResult){
        index++;
      }else {
        kst = (RCMA1 * 1) + (RCMA2 * 2) + (RCMA3 * 3) + (RCMA4 * 4)
      }
      signal = (kst!==undefined) ? signalSMA.nextValue(kst) : undefined;
      result = kst!==undefined ? {
        kst : parseFloat(kst.toFixed(2)),
        signal : signal
      } : undefined;
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

KST.calculate = function(input) {
  input.reversedInput ? input.values.reverse(): undefined;
  let result = (new KST(input)).result;
  input.reversedInput ? result.reverse():undefined;
  return result;
};

KST.prototype.getResult = function () {
  return this.result;
};

KST.prototype.nextValue = function (price) {
  let nextResult = this.generator.next(price);
  if(nextResult.value !== undefined)
    return nextResult.value;
};
