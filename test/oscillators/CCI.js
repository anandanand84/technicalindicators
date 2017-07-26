"use strict"
var CCI = require('../../lib/oscillators/CCI').CCI;
var assert = require("assert");
var data = require('../data');

var inputCCI = {
  open : [
    23.94,23.85,23.94,23.73,23.60,23.46,23.53,23.73,24.09,23.95,23.92,24.04,23.83,24.05,24.89,24.95,24.91,25.24,25.13,25.26,24.74,24.36,24.49,24.70,24.65,24.48,24.46,24.62,23.81,23.91
  ],
  high : [
    24.20,24.07,24.04,23.87,23.67,23.59,23.80,23.80,24.30,24.15,24.05,24.06,23.88,25.14,25.20,25.07,25.22,25.37,25.36,25.26,24.82,24.44,24.65,24.84,24.75,24.51,24.68,24.67,23.84,24.30,
  ],
  low : [
      23.85,23.72,23.64,23.37,23.46,23.18,23.40,23.57,24.05,23.77,23.60,23.84,23.64,23.94,24.74,24.77,24.90,24.93,24.96,24.93,24.21,24.21,24.43,24.44,24.20,24.25,24.21,24.15,23.63,23.76,
  ],
  close : [
      23.89,23.95,23.67,23.78,23.50,23.32,23.75,23.79,24.14,23.81,23.78,23.86,23.70,24.96,24.88,24.96,25.18,25.07,25.27,25.00,24.46,24.28,24.62,24.58,24.53,24.35,24.34,24.23,23.76,24.20,
  ],
  period : 20
};
var expectedResult = [
    102.19852632840085,
      30.770139381053642,
      6.498977012877848,
      33.16030534351142,
      34.93862134088762,
      13.992326788535587,
      -10.730541358353888,
      -11.528187825109272,
      -29.31511455515407,
      -129.55641482382595,
      -73.17724561559666,
];




describe('CCI (Commodity Channel Index', function () {
  it('should calculate CCI using the calculate method', function () {
    assert.deepEqual(CCI.calculate(inputCCI), expectedResult, 'Wrong Results');
  });

  it('should be able to get CCI for the next bar', function () {
    var cci = new CCI(inputCCI);
    assert.deepEqual(cci.getResult(), expectedResult, 'Wrong Results while getting results');
  })

  it('should be able to get CCI for the next bar using nextValue', function () {
    var cci = new CCI({
      open : [],
      high : [],
      low : [],
      close : [],
      period : 20
    });

    var results = [];

    inputCCI.close.forEach((price,index) => {
      var result = cci.nextValue({
          open : inputCCI.open[index],
          high : inputCCI.high[index],
          low : inputCCI.low[index],
          close : inputCCI.close[index]
      });
      if (result != undefined) {
        results.push(result)
      }
    });
    assert.deepEqual(results, expectedResult, 'Wrong Results while getting results');
  })
})