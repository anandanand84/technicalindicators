/**
 * Created by AAravindan on 5/3/16.
 */
var EMA = require('../../lib/moving_averages/EMA').EMA;
var assert = require('assert');
var data   = require('../data');

var prices = data.close;
var period = 9;
var expectedOutput = [
   138.3422222222222,
      140.53377777777777,
      144.91702222222222,
      151.72361777777778,
      161.4488942222222,
      173.53911537777776,
      187.4772923022222,
      198.68583384177776,
      216.23266707342222,
      229.04013365873777,
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
