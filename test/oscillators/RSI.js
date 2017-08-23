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


//have issue with this input
var noGainsInput = {
  values : [ 294435, 294435, 294435, 294500, 294500, 294500, 294520, 294539, 294539, 294600, 294600, 294600, 294600, 294600, 294700, 294600, 294600, 294600, 294600, 294600, 294700 ],
  period : 14
 };
 var noGainsExpectedResult = [
  0, 100, 71.1, 71.1, 71.1, 71.1, 71.1, 79.63
 ];
 

describe('RSI (Relative Strength Index)', function () {
  it('should calculate RSI when there is no gains or losses', function () {
    let result = RSI.calculate(noGainsInput);
    assert.deepEqual(result, noGainsExpectedResult, 'Wrong Results');
  });

  // it('should calculate RSI using the calculate method', function () {
  //   assert.deepEqual(RSI.calculate(inputRSI), expectedResult, 'Wrong Results');
  // });

  // it('should be able to get RSI for the next bar', function () {
  //   var rsi = new RSI(inputRSI);
  //   assert.deepEqual(rsi.getResult(), expectedResult, 'Wrong Results while getting results');
  // })

  // it('should be able to get RSI for the next bar using nextValue', function () {
  //   var rsi = new RSI({
  //     values : [],
  //     period : 14
  //   });
  //   var results = [];
  //   inputRSI.values.forEach(price => {
  //     var result = rsi.nextValue(price);
  //     if (result) {
  //       results.push(result)
  //     }
  //   });
  //   assert.deepEqual(results, expectedResult, 'Wrong Results while getting results');
  // })

  // it('should be able to calculate ROC for reversed input by using calculate method', function() {
  //   let myInput = Object.assign({}, inputRSI);
  //   myInput.reversedInput = true;
  //   myInput.values.reverse();
  //   assert.deepEqual(RSI.calculate(myInput),  expectedResult.slice().reverse(), 'Wrong Results while calculating next bar');
  // });
})