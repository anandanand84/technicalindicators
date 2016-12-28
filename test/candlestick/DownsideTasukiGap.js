var DownsideTasukiGap = require('../../lib/candlestick/DownsideTasukiGap');
var assert = require('assert');

var threeDayInput = {
  open: [45.00, 33.45, 30.20],
  high: [46.20,34.70,36.63],
  close:[41.20,29.31,36.28],
  low: [38.56,28,31.31],
  
}

describe('Common candlestick utilities : ', function() {
  it('Generate candlestick should generate subset of data based on supplied data', function() {
   var downsideTasukiGap = new DownsideTasukiGap ();
   var result        = downsideTasukiGap.hasPattern(threeDayInput);
   assert.deepEqual(result, true, 'Invalid result for DownsideTasukiGap');
  });
})

