"use strict"
var RSI = require('../../lib/oscillators/RSI').RSI;
var AverageGain = require('../../lib/Utils/AverageGain').AverageGain;
var AverageLoss = require('../../lib/Utils/AverageLoss').AverageLoss;
var assert = require("assert");
var data = require('../data');

var inputRSI = {
  values : [44.34,44.09,44.15,43.61,44.33,44.83,45.10,45.42,45.84,46.08,45.89,46.03,45.61,46.28,46.28,46.00,46.03,46.41,46.22,45.64,46.21,46.25,45.71,46.45,45.78,45.35,44.03,44.18,44.22,44.57,43.42,42.66,43.13],
  period : 14
};
var expectedResult = [
  70.46,
  66.25,
  66.48,
  69.35,
  66.29,
  57.92,
  62.88,
  63.21,
  56.01,
  62.34,
  54.67,
  50.39,
  40.02,
  41.49,
  41.90,
  45.50,
  37.32,
  33.09,
  37.79
];

//have issue with this input
var noGainsInput = {
  values : [ 294435, 294435, 294435, 294500, 294500, 294500, 294520, 294539, 294539, 294600, 294600, 294600, 294600, 294600, 294700, 294600, 294600, 294600, 294600, 294600, 294700 ],
  period : 14
 };
 var noGainsExpectedResult = [
  100, 71.1, 71.1, 71.1, 71.1, 71.1, 79.63
 ];
 

describe('RSI (Relative Strength Index)', function () {
  it('should calculate RSI when there is no gains or losses', function () {
    let result = RSI.calculate(noGainsInput);
    assert.deepEqual(result, noGainsExpectedResult, 'Wrong Results');
  });

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
      if (result!==undefined) {
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