/**
 * Created by AAravindan on 5/3/16.
 */
var WMA = require('../../lib/moving_averages/WMA');
var assert = require('assert');
var data   = require('../data');

var prices = data.close;
var expectedResult = [
  140.3,
  142.5,
  146.9,
  153.8,
  163.9,
  177.2,
  193.0,
  206.6,
  226.7,
  242.2
];
var period = 9;

describe('WMA (Weighted Moving Average)', function() {
  it('should calculate WMA using the calculate method', function() {
    assert.deepEqual(WMA.calculate({
      period : period,
      values : prices
    }), expectedResult, 'Wrong Results');
  });

  it('should be able to get WMA for the next bar', function() {
    var wma = new WMA({
      period : period,
      values : prices
    });
    assert.deepEqual(wma.getResult(),  expectedResult, 'Wrong Results while getting results');
  })

  it('should be able to get WMA for the next bar using nextValue', function() {
    var wma = new WMA({
      period : period,
      values : []
    });
    var results = [];
    prices.forEach(price => {
      var result = wma.nextValue(price);
      if(result)
        results.push(result)
    });
    assert.deepEqual(results,  expectedResult, 'Wrong Results while getting results');
  })
})
