/**
 * Created by AAravindan on 5/3/16.
 */
var WMA = require('../../lib/moving_averages/WMA');
var assert = require('assert');


var prices = [127.75,129.02,132.75,145.40,148.98,137.52,147.38,139.05,137.23,149.30,162.45, 178.95];
var period = 9;

describe('WMA', function() {
  it('should calculate WMA using the calculate method', function() {
    assert.deepEqual(WMA.calculate(period, prices), [140.33, 142.52, 146.86,153.76], 'Wrong Results');
  });

  it('should be able to get WMA for the next bar', function() {
    var wma = new WMA(period, prices);
    assert.deepEqual(wma.getResult(),  [140.33, 142.52, 146.86,153.76], 'Wrong Results while getting results');
  })

  it('should be able to get WMA for the next bar using nextValue', function() {
    var wma = new WMA(period, []);
    var results = [];
    prices.forEach(price => {
      var result = wma.nextValue(price);
      if(result)
        results.push(result)
    });
    assert.deepEqual(results,  [140.33, 142.52, 146.86,153.76], 'Wrong Results while getting results');
  })
})
