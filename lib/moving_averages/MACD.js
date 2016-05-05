/**
 * Created by AAravindan on 5/4/16.
 */
"use strict"
const SMA        = require('./SMA');
const EMA        = require('./EMA');

let MACD;
module.exports = MACD = function(fastPeriod, slowPeriod, signalPeriod, priceArray, options ) {

  options = options || {};

  var oscillatorMAtype = options.SimpleMAOscillator ? SMA : EMA;

  var signalMAtype   = options.SimpleMASignal ? SMA : EMA;

  var fastMAProducer = new oscillatorMAtype(fastPeriod, []);

  var slowMAProducer = new oscillatorMAtype(slowPeriod, []);

  var signalMAProducer = new signalMAtype(signalPeriod, []);

  this.result = [];

  this.generator = (function* (){
    var index = 1;
    var tick;
    while (true) {
      if(index < slowPeriod){
        tick = yield;
        fastMAProducer.nextValue(tick);
        slowMAProducer.nextValue(tick);
        signalMAProducer.nextValue(tick);
        index++;
        continue;
      }
      let fast = fastMAProducer.nextValue(tick);
      let slow = slowMAProducer.nextValue(tick);
      let MACD = fast - slow;
      let signal = signalMAProducer.nextValue(MACD);
      let histogram = MACD - signal;
      tick = yield({
        fast : fast,
        slow : slow,
        MACD : parseFloat(MACD.toFixed(2)),
        signal : parseFloat(signal.toFixed(2)),
        histogram : parseFloat(histogram.toFixed(2))
      })
    }
  })();

  this.generator.next();

  priceArray.forEach((tick) => {
    var result = this.generator.next(tick);
    if(result.value){
      this.result.push(result.value);
    }
  });
};

MACD.calculate = function(fastPeriod, slowPeriod, signalPeriod, priceArray, options) {
  return (new MACD(fastPeriod, slowPeriod, signalPeriod, priceArray, options)).result;
};

MACD.prototype.getResult = function () {
  return this.result;
};

MACD.prototype.nextValue = function (price) {
  return this.generator.next(price).value.toFixed(2);
};
