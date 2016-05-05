/**
 * Created by AAravindan on 5/4/16.
 */
/**
 * Created by AAravindan on 5/3/16.
 */
var MACD = require('../../lib/moving_averages/MACD');
var assert = require('assert');


var prices = [1,2,3,4,5,6,7,8,9,10,12,13,15];

var period = 10;

describe('MACD', function() {
  it('should calculate MACD using the calculate method', function() {
    assert.deepEqual(MACD.calculate(5, 8, 3, prices, { SimpleMASignal : true}), [5.5, 6.6, 7.7, 8.9], 'Wrong Results');
  });

  it('should be able to calculate for the next bar', function() {
  });
})