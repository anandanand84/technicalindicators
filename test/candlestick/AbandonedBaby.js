var AbandonedBaby = require('../../lib/candlestick/AbandonedBaby');
var assert = require('assert');

var threeDayInput = {
  open: [30.10,27.18,29.87],
  high: [32.40,28.32,31.20],
  close: [34.41,27.18,30.62],
  low: [29.87,24.67,29.30],
  
}

describe('Common candlestick utilities : ', function() {
  it('Generate candlestick should generate subset of data based on supplied data', function() {
   var abandonedBaby = new AbandonedBaby ();
   var result        = abandonedBaby.hasPattern(threeDayInput);
   assert.deepEqual(result, true, 'Invalid result for AbandonedBaby');
  });
})

