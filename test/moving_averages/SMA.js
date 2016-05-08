/**
 * Created by AAravindan on 5/3/16.
 */
var SMA = require('../../lib/moving_averages/SMA');
var assert = require('assert');
var data   = require('../data')

var prices = data.close;

var period = 10;

var expectResult =  [
  139.44,
  142.91,
  147.9,
  154.66,
  162.31,
  171.74,
  182.34,
  196.24,
  210.36
]


  describe('SMA (Simple Moving Average)', function() {
  it('should pass', function(){
    "use strict";
    SMA.calculate({ period : 5, values : [18, 19, 22, 23, 23]})
  })
  it('should calculate SMA using the calculate method', function() {
    assert.deepEqual(SMA.calculate({period : period, values : prices}), expectResult, 'Wrong Results');
  });

  it('should be able to calculate EMA by using getResult', function() {
      var smaProducer = new SMA({period : period, values : prices});
      assert.deepEqual(smaProducer.getResult(),  expectResult, 'Wrong Results while calculating next bar');
  });

  it('should be able to get EMA for the next bar using nextValue', function() {
    var smaProducer = new SMA({period : period, values : []});
    var results = [];
    prices.forEach(price => {
      var result = smaProducer.nextValue(price);
      if(result)
        results.push(result)
    });
    assert.deepEqual(results, expectResult, 'Wrong Results while getting results');
  })

})