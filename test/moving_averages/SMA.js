/**
 * Created by AAravindan on 5/3/16.
 */
var SMA = require('../../lib/moving_averages/SMA');
var assert = require('assert');
var data   = require('../data')

var prices = data.close;

var period = 10;

var expectResult =  [
  139.438,
  142.908,
  147.901,
  154.661,
  162.311,
  171.736,
  182.336,
  196.24,
  210.362
]


describe('SMA (Simple Moving Average)', function() {
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

  it('should be able to get SMA for low values(issue 1)', function() {
    let expectedResult = [ 0.002, 0.00275, 0.0025, 0.003, 0.003, 0.0025 ];
    assert.deepEqual(SMA.calculate({period : 4, values : [0.001, 0.003, 0.001, 0.003, 0.004, 0.002, 0.003, 0.003, 0.002]}), expectedResult, 'Wrong Results');
  })
  
  it('Passing format function should format the results appropriately', function() {
    let expectedResult = [ 0.002, 0.003, 0.003, 0.003, 0.003, 0.003 ];
    assert.deepEqual(SMA.calculate({period : 4, values : [0.001, 0.003, 0.001, 0.003, 0.004, 0.002, 0.003, 0.003, 0.002], format : (val) => { return val.toPrecision(1) }}), expectedResult, 'Wrong Results');
  })
})