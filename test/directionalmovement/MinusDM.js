/**
 * Created by AAravindan on 5/8/16.
 */
var MinusDM = require('../../lib/directionalmovement/MinusDM');
var assert = require('assert');
var data   = require('../data')

var period = 14;

var input = {
  close: [29.87,30.24,30.10,28.90,28.92,28.48,28.56,27.56,28.47,28.28,27.49,27.23,26.35,26.33,27.03,26.22,26.01,25.46,27.03,27.45,28.36,28.43,27.95,29.01,29.38,29.36,28.91,30.61,30.05,30.19,31.12,30.54,29.78,30.04,30.49,31.47,32.05,31.97],
  high: [30.20,30.28,30.45,29.35,29.35,29.29,28.83,28.73,28.67,28.85,28.64,27.68,27.21,26.87,27.41,26.94,26.52,26.52,27.09,27.69,28.45,28.53,28.67,29.01,29.87,29.80,29.75,30.65,30.60,30.76,31.17,30.89,30.04,30.66,30.60,31.97,32.10,32.03],
  low: [29.41,29.32,29.96,28.74,28.56,28.41,28.08,27.43,27.66,27.83,27.40,27.09,26.18,26.13,26.63,26.13,25.43,25.35,25.88,26.96,27.14,28.01,27.88,27.99,28.76,29.14,28.71,28.93,30.03,29.39,30.14,30.43,29.35,29.99,29.52,30.94,31.54,31.36],
  period : period
}


var expectResult =  [
  0.09,0.00,1.22,0.18,0.15,0.33,0.65,0.00,0.00,0.43,0.31,0.91,0.05,0.00,0.5,0.70,0.08,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.43,0.00,0.00,0.64,0.00,0.00,1.08,0.00,0.47,0.00,0.00,0.18
]


describe('MinusDM', function() {
  it('should calculate MinusDM using the calculate method', function() {
    assert.deepEqual(MinusDM.calculate(input), expectResult, 'Wrong Results');
  });

  it('should be able to calculate MinusDM by using getResult', function() {
    var minusDm = new MinusDM(input);
    assert.deepEqual(minusDm.getResult(),  expectResult, 'Wrong Results while calculating next bar');
  });

  it('should be able to get MinusDM for the next bar using nextValue', function() {
    var minusDm = new MinusDM({period : period, high : [], low:[], close:[]});
    var results = [];
    input.close.forEach(function(close,index) {
      var result = minusDm.nextValue({
        close: input.close[index],
        high: input.high[index],
        low: input.low[index]
      });
      if(result!==undefined)
        results.push(result)
    });
    assert.deepEqual(results, expectResult, 'Wrong Results while getting results');
  })

})