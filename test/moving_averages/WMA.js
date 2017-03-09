/**
 * Created by AAravindan on 5/3/16.
 */
var WMA = require('../../lib/moving_averages/WMA').WMA;
var assert = require('assert');
var data   = require('../data');

var prices = data.close;
var expectedResult = [
  140.32867,
  142.52022,
  146.86289,
  153.76267,
  163.91578,
  177.15778,
  193.04533,
  206.64178,
  226.68178,
  242.21689
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
