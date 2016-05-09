/**
 * Created by AAravindan on 5/8/16.
 */
/**
 * Created by AAravindan on 5/4/16.
 */
"use strict"
const MinusDM        = require('./MinusDM');
const PlusDM         = require('./PlusDM');
const TrueRange      = require('./TrueRange');
const SMA            = require('../moving_averages/SMA');

let ADX;

let validateInput = function(input) {
  return input;
};

module.exports = ADX = function(input) {

  var lows = input.low
  var highs = input.high;
  var closes = input.close;
  var period = input.period;

  var plusDM = new PlusDM({
    high: [],
    low : []
  });

  var minusDM = new MinusDM({
    high: [],
    low : []
  });

  var smaPDM = new SMA({period: period, values:[]});
  var smaMDM = new SMA({period: period, values:[]});
  var smaTR  = new SMA({period: period, values:[]});
  var smaDX  = new SMA({period: period, values:[]});

  var tr    = new TrueRange({
    low : [],
    high: [],
    close: [],
  });

  if(!((lows.length === highs.length) && (highs.length === closes.length) )){
    throw ('Inputs(low,high, close) not of equal size');
  }

  if(!validateInput) {
    throw 'Invalid Input'
  };


  this.result = [];

  this.generator = (function* (){
    var tick = yield;
    var index = 1;
    var lastATR,lastAPDM,lastAMDM,lastPDI,lastMDI,lastDX,smoothedDX;
    while (true) {
      if(!((lastATR!=undefined) && (lastAPDM!=undefined) && (lastAMDM!=undefined))){
        let calcTr = tr.nextValue(tick);
        let calcPDM = plusDM.nextValue(tick);
        let calcMDM = minusDM.nextValue(tick);
        if(index > 1){
          lastATR  = smaTR.nextValue(calcTr);
          lastAPDM = smaPDM.nextValue(calcPDM);
          lastAMDM = smaMDM.nextValue(calcMDM);
        }
        console.log(lastATR, lastAPDM, lastAMDM)
        index++;
      }else {
        let calcTr = tr.nextValue(tick);
        let calcPDM = plusDM.nextValue(tick);
        let calcMDM = minusDM.nextValue(tick);
        if(index > 1){
          lastATR  = smaTR.nextValue(calcTr);
          lastAPDM = smaPDM.nextValue(calcPDM);
          lastAMDM = smaMDM.nextValue(calcMDM);
        }
        console.log(lastATR, lastAPDM, lastAMDM)

        lastPDI = lastAPDM / lastATR;
        lastMDI = lastAMDM / lastATR;
        lastDX = (Math.abs(lastPDI - lastMDI) / (lastPDI + lastMDI)) * 100;
        if(!smoothedDX){
          smoothedDX = smaDX.nextValue(lastDX)
        }
        else{
          smoothedDX = ((smoothedDX * (period-1)) + lastDX)/ period;
        }
      }
      tick = yield smoothedDX;
    }
  })();

  this.generator.next();

  lows.forEach((tick,index) => {
    var result = this.generator.next({
      high : highs[index],
      low  : lows[index],
      close : closes[index]
    });
    if(result.value){
      this.result.push(result.value);
    }
  });
};

ADX.calculate = function(input) {
  return (new ADX(input)).result;
};

ADX.prototype.getResult = function () {
  return this.result;
};

ADX.prototype.nextValue = function (price) {
  return this.generator.next(price).value;
};
