"use strict"
var VWAP = require('../../lib/volume/VWAP').VWAP;
var assert = require("assert");

var inputVWAP = {
  open : [

  ],
  high : [
    127.36,127.31,127.21,127.15,127.08,127.19,127.09,127.08,127.18,127.16,127.31,127.35,127.34,127.29,127.36
  ],
  low : [
    126.99,127.10,127.11,126.93,126.98,126.99,126.82,126.95,127.05,127.05,127.08,127.20,127.25,127.17,127.25 
  ],
  close : [
    127.28,127.11,127.15,127.04,126.98,127.07,126.93,127.05,127.11,127.15,127.30,127.28,127.28,127.29,127.25
  ],
  volume : [
    89329,16137,23945,20679,27252,20915,17372,17600,13896,6700,13848,9925,5540,10803,19400
  ],
};
var expectedResult = [
    127.21,127.20,127.20,127.17,127.15,127.14,127.13,127.12,127.12,127.12,127.12,127.13,127.13,127.14,127.15
];




describe('VWAP (Commodity Channel Index', function () {
  it('should calculate VWAP using the calculate method', function () {
    assert.deepEqual(VWAP.calculate(inputVWAP).map((val)=>val.toFixed(2)), expectedResult, 'Wrong Results');
  });

  it('should be able to get VWAP for the next bar', function () {
    var vwap = new VWAP(inputVWAP);
    assert.deepEqual(vwap.getResult().map((val)=>val.toFixed(2)), expectedResult, 'Wrong Results while getting results');
  })

  it('should be able to get VWAP for the next bar using nextValue', function () {
    var vwap = new VWAP({
      open : [],
      high : [],
      low : [],
      close : [],
      volume : []
    });

    var results = [];

    inputVWAP.close.forEach((price,index) => {
      var result = vwap.nextValue({
          open : inputVWAP.open[index],
          high : inputVWAP.high[index],
          low : inputVWAP.low[index],
          close : inputVWAP.close[index],
          volume : inputVWAP.volume[index]
      });
      if (result != undefined) {
        results.push(result)
      }
    });
    assert.deepEqual(results.map((val)=>val.toFixed(2)), expectedResult, 'Wrong Results while getting results');
  })
})