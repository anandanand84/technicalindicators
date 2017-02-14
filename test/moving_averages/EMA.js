/**
 * Created by AAravindan on 5/3/16.
 */
var EMA = require('../../lib/moving_averages/EMA');
var assert = require('assert');
var data   = require('../data');

var prices = data.close;
var period = 9;
var expectedOutput = [
  138.34222,
  140.53378,
  144.91702,
  151.72362,
  161.44889,
  173.53911,
  187.47729,
  198.68583,
  216.23267,
  229.04013
]


describe('EMA (Exponential Moving Average)', function() {
  it('should calculate EMA using the calculate method', function() {
    assert.deepEqual(EMA.calculate({period : period, values : prices}), expectedOutput, 'Wrong Results');
  });

  it('should be able to get EMA from the get results', function() {
    var emaProducer = new EMA({period : period, values : prices});
    assert.deepEqual(emaProducer.getResult(),  expectedOutput, 'Wrong Results while getting results');
  });

  it('should be able to get EMA for the next bar using nextValue', function() {
    var emaProducer = new EMA({period : period, values : []});
    var results = [];
    prices.forEach(price => {
      var result = emaProducer.nextValue(price);
      if(result)
        results.push(result)
    });
    assert.deepEqual(results,  expectedOutput, 'Wrong Results while getting results');
  })
})
