/**
 * Created by AAravindan on 5/3/16.
 */
var EMA = require('../../lib/moving_averages/EMA');
var assert = require('assert');


var prices = [127.75,129.02,132.75,145.40,148.98,137.52,147.38,139.05,137.23,149.30,162.45];
var period = 9;

describe('EMA', function() {
  it('should calculate EMA using the calculate method', function() {
    assert.deepEqual(EMA.calculate(period, prices), [138.34, 140.53, 144.92], 'Wrong Results');
  });

  it('should be able to get EMA from the get results', function() {
    var emaProducer = new EMA(period, prices);
    assert.deepEqual(emaProducer.getResult(),  [138.34, 140.53, 144.92], 'Wrong Results while getting results');
    assert.equal(emaProducer.nextValue(178.95), 151.72, 'Wrong Results while calculating next bar EMA');
  })

  it('should be able to get EMA for the next bar using nextValue', function() {
    var emaProducer = new EMA(period, []);
    var results = [];
    prices.forEach(price => {
      var result = emaProducer.nextValue(price);
      if(result)
        results.push(result)
    });
    assert.deepEqual(results,  [138.34, 140.53, 144.92], 'Wrong Results while getting results');
  })
})
