"use strict"
var RSI = require('../../lib/oscillators/RSI').RSI;
var assert = require("assert");
var data = require('../data');

var inputRSI = {
  values : [127.75,129.02,132.75,145.40,148.98,137.52,147.38,139.05,137.23,149.30,162.45,178.95,200.35,221.90,243.23,243.52,286.42,280.27,277.35,269.02,263.23,214.90],
  period : 14
};
var expectedResult = [
    86.38,86.41,89.65,86.47,84.93,80.52,77.51,58
  //86.39,86.41,89.65,86.47,84.93,80.52,77.50,58.00
];



//var inputRSI = {
//  values : [45.8433,46.0826,45.8931,46.0328,45.6140,46.2820,46.2820,46.0028,46.0328,46.4116,46.2222,45.6439, 46.2122,46.2521,45.7137,46.4515,45.7835,45.3548,44.0288,44.1783,44.2181,44.5672,43.4205,42.6628,43.1314],
//  period : 14
//};
//var expectedResult = [
//  70.53,66.32,66.55,69.41,66.36,57.97,62.93,63.26,56.06,62.38
//];

describe('RSI (Relative Strength Index)', function () {
  it('should calculate RSI using the calculate method', function () {
    assert.deepEqual(RSI.calculate(inputRSI), expectedResult, 'Wrong Results');
  });

  it('should be able to get RSI for the next bar', function () {
    var rsi = new RSI(inputRSI);
    assert.deepEqual(rsi.getResult(), expectedResult, 'Wrong Results while getting results');
  })

  it('should be able to get RSI for the next bar using nextValue', function () {
    var rsi = new RSI({
      values : [],
      period : 14
    });
    var results = [];
    inputRSI.values.forEach(price => {
      var result = rsi.nextValue(price);
      if (result) {
        results.push(result)
      }
    });
    assert.deepEqual(results, expectedResult, 'Wrong Results while getting results');
  })

  it('should be able to calculate ROC for reversed input by using calculate method', function() {
    let myInput = Object.assign({}, inputRSI);
    myInput.reversedInput = true;
    myInput.values.reverse();
    assert.deepEqual(RSI.calculate(myInput),  expectedResult.slice().reverse(), 'Wrong Results while calculating next bar');
  });
})