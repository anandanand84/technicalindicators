/**
 * Created by AAravindan on 5/8/16.
 */
/**
 * Created by AAravindan on 5/3/16.
 */
var ADX = require('../../lib/directionalmovement/ADX').ADX;
var assert = require('assert');
var data   = require('../data')

var period = 14;

// var input = {
//   close: [],
//   high: [],
//   low: [],
//   period : period
// }


// var expectResult =  [33.58,32.15,29.93,28.36,26.90,25.78,23.95,22.78,22.07,21.53,20.80,19.59,18.72,18.75,18.84,18.55,17.73,17.95,18.23,17.35]

var input = {
  close: [29.87,30.24,30.10,28.90,28.92,28.48,28.56,27.56,28.47,28.28,27.49,27.23,26.35,26.33,27.03,26.22,26.01,25.46,27.03,27.45,28.36,28.43,27.95,29.01,29.38,29.36,28.91,30.61,30.05,30.19,31.12,30.54,29.78,30.04,30.49,31.47,32.05,31.97,31.13,31.66,32.64,32.59,32.19,32.10,32.93,33.00,31.94],
  high: [30.20,30.28,30.45,29.35,29.35,29.29,28.83,28.73,28.67,28.85,28.64,27.68,27.21,26.87,27.41,26.94,26.52,26.52,27.09,27.69,28.45,28.53,28.67,29.01,29.87,29.80,29.75,30.65,30.60,30.76,31.17,30.89,30.04,30.66,30.60,31.97,32.10,32.03,31.63,31.85,32.71,32.76,32.58,32.13,33.12,33.19,32.52],
  low: [29.41,29.32,29.96,28.74,28.56,28.41,28.08,27.43,27.66,27.83,27.40,27.09,26.18,26.13,26.63,26.13,25.43,25.35,25.88,26.96,27.14,28.01,27.88,27.99,28.76,29.14,28.71,28.93,30.03,29.39,30.14,30.43,29.35,29.99,29.52,30.94,31.54,31.36,30.92,31.20,32.13,32.23,31.97,31.56,32.21,32.63,31.76],
  period : period
}


var expectResult =  [33.70789,32.25668,30.01835,28.43901,26.97249,25.84732,24.01791,22.85086,22.12975,21.5787,20.84157,19.61908,18.72578,18.75196,18.82257,18.52094,17.68461,17.90759,18.17858,17.28769]


describe('ADX (Average Directional Index)', function() {
  it('should calculate ADX using the calculate method', function() {
   assert.deepEqual(ADX.calculate(input), expectResult, 'Wrong Results');
  });

  it('should be able to calculate ADX by using getResult', function() {
   var adx = new ADX(input);
   assert.deepEqual(adx.getResult(),  expectResult, 'Wrong Results while calculating next bar');
  });
  
  it('should be able to get ADX for the next bar using nextValue', function() {
   var adx = new ADX({period : period, high : [], low:[], close:[]});
   var results = [];
   input.close.forEach(function(close,index) {
     var result = adx.nextValue({
       close: input.close[index],
       high: input.high[index],
       low: input.low[index]
     });
     if(result)
       results.push(result)
   });
   assert.deepEqual(results, expectResult, 'Wrong Results while getting results');
  })
})