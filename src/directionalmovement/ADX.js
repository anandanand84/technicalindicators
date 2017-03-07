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
const WEMA            = require('../moving_averages/WEMA');

let ADX;

let validateInput = function(input) {
  return input;
};

module.exports = ADX = function(input) {

  var lows = input.low;
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

  var emaPDM = new WEMA({period: period, values:[], format : (v) => {return v}});
  var emaMDM = new WEMA({period: period, values:[], format : (v) => {return v}});
  var emaTR  = new WEMA({period: period, values:[], format : (v) => {return v}});
  var smaDX  = new SMA({period: period, values:[], format : (v) => {return v}});

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
    var index = 0;
    var lastATR,lastAPDM,lastAMDM,lastPDI,lastMDI,lastDX,smoothedDX;
    lastATR = 0;
    lastAPDM = 0;
    lastAMDM = 0;
    while (true) {
      let calcTr = tr.nextValue(tick);
      let calcPDM = plusDM.nextValue(tick);
      let calcMDM = minusDM.nextValue(tick);
      if(calcTr!==undefined){
        if(index < period){
          lastATR  = lastATR + calcTr;
          lastAPDM = lastAPDM + calcPDM;
          lastAMDM = lastAMDM + calcMDM;
          index++;
          tick = yield
          continue;
        }
        else if(index === period) {
          lastPDI = (lastAPDM) * 100 / lastATR;
          lastMDI = (lastAMDM) * 100 / lastATR;
          index++;
        }
        else {
          lastATR =  (lastATR - (lastATR / period)) + calcTr;
          lastAPDM = (lastAPDM - (lastAPDM / period)) + calcPDM;
          lastAMDM = (lastAMDM - (lastAMDM / period)) + calcMDM;
          lastPDI = (lastAPDM) * 100 / lastATR;
          lastMDI = (lastAMDM) * 100 / lastATR;
        }
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
  if(input.reversedInput) {
    input.high.reverse();
    input.low.reverse();
    input.close.reverse();
  }
  let result = (new ADX(input)).result;
  input.reversedInput ? result.reverse():undefined;
  return result;
};

ADX.prototype.getResult = function () {
  return this.result;
};

ADX.prototype.nextValue = function (price) {
  return this.generator.next(price).value;
};
