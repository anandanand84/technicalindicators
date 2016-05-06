/**
 * Created by AAravindan on 5/3/16.
 */
var WMA = require('../../lib/moving_averages/WMA');
var assert = require('assert');
var data   = require('../data');

var prices = data.close;
var expectedResult = [
  140.33,
  142.52,
  146.86,
  153.76,
  163.92,
  177.16,
  193.05,
  206.64,
  226.68,
  242.22
];
var period = 9;

describe('WMA (Weighted Moving Average)', function() {
  it('should calculate WMA using the calculate method', function() {
    assert.deepEqual(WMA.calculate(period, prices), expectedResult, 'Wrong Results');
  });

  it('should be able to get WMA for the next bar', function() {
    var wma = new WMA(period, prices);
    assert.deepEqual(wma.getResult(),  expectedResult, 'Wrong Results while getting results');
  })

  it('should be able to get WMA for the next bar using nextValue', function() {
    var wma = new WMA(period, []);
    var results = [];
    prices.forEach(price => {
      var result = wma.nextValue(price);
      if(result)
        results.push(result)
    });
    assert.deepEqual(results,  expectedResult, 'Wrong Results while getting results');
  })
})
