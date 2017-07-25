/**
 * Created by AAravindan on 5/3/16.
 */
var WMA = require('../../lib/moving_averages/WMA').WMA;
var assert = require('assert');
var data   = require('../data');

var prices = data.close;
var expectedResult = [
  140.32866666666666,
      142.52022222222223,
      146.86288888888888,
      153.76266666666666,
      163.91577777777778,
      177.15777777777777,
      193.04533333333333,
      206.64177777777778,
      226.68177777777777,
      242.2168888888889,
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
