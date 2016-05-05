/**
 * Created by AAravindan on 5/3/16.
 */
var SMA = require('../../lib/moving_averages/SMA');
var assert = require('assert');


var prices = [1,2,3,4,5,6,7,8,9,10,12,13,15];

var period = 10;

describe('SMA', function() {
  it('should calculate SMA using the calculate method', function() {
    assert.deepEqual(SMA.calculate(period, prices), [5.5, 6.6, 7.7, 8.9], 'Wrong Results');
  });

  it('should be able to calculate EMA by using getResult', function() {
      var smaProducer = new SMA(period, prices);
      assert.deepEqual(smaProducer.getResult(),  [5.5, 6.6, 7.7, 8.9], 'Wrong Results while calculating next bar');
  });

  it('should be able to get EMA for the next bar using nextValue', function() {
    var smaProducer = new SMA(period, []);
    var results = [];
    prices.forEach(price => {
      var result = smaProducer.nextValue(price);
      if(result)
        results.push(result)
    });
    assert.deepEqual(results,  [5.5, 6.6, 7.7, 8.9], 'Wrong Results while getting results');
  })

})