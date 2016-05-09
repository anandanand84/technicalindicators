/**
 * Created by AAravindan on 5/9/16.
 */
"use strict"

const ROC = require('./ROC.js');
const SMA = require('../moving_averages/SMA.js');

let KST;

module.exports = KST = function(input) {

  var period      = input.period;
  var priceArray  = input.values;
  var rocPer1     = input.ROCPer1;
  var rocPer2     = input.ROCPer2;
  var rocPer3     = input.ROCPer3;
  var rocPer4     = input.ROCPer4;

  var smaPer1     = input.SMAROCPer1;
  var smaPer2     = input.SMAROCPer2;
  var smaPer3     = input.SMAROCPer3;
  var smaPer4     = input.SMAROCPer4;

  var signalPeriod= input.signalPeriod;

  var roc1        = new ROC({ period : rocPer1, values: []});
  var roc2        = new ROC({ period : rocPer2, values: []});
  var roc3        = new ROC({ period : rocPer3, values: []});
  var roc4        = new ROC({ period : rocPer4, values: []});

  var sma1        = new SMA({ period : smaPer1, values: []});
  var sma2        = new SMA({ period : smaPer2, values: []});
  var sma3        = new SMA({ period : smaPer3, values: []});
  var sma4        = new SMA({ period : smaPer4, values: []});
  var signalSMA   = new SMA({ period : signalPeriod, values: []})

  this.result = [];

  var firstResult = Math.max(rocPer1 + smaPer1, rocPer2+smaPer2, rocPer3+smaPer3, rocPer4+smaPer4);
  this.generator = (function* (){
    let index = 1;
    var tick = yield;
    var kst;
    var RCMA1,RCMA2,RCMA3,RCMA4,signal,result;
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
    var result = this.generator.next(tick);
    if(result.value !== undefined){
      this.result.push(result.value);
    }
  });
};

KST.calculate = function(input) {
  return (new KST(input)).result;
};

KST.prototype.getResult = function () {
  return this.result;
};

KST.prototype.nextValue = function (price) {
  var nextResult = this.generator.next(price);
  if(nextResult.value !== undefined)
    return nextResult.value;
};
