var DownsideTasukiGap = require('../../lib/candlestick/DownsideTasukiGap');
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var threeDayInput = {
  open: [45.00, 33.45, 30.20],
  high: [46.20,34.70,36.63],
  close:[41.20,29.31,36.28],
  low: [38.56,28,29.80],
  
}

describe('DownsideTasukiGap : ', function() {
   before(function() {
    var imageBuffer = drawCandleStick(threeDayInput);
    fs.writeFileSync(__dirname+'/images/downsideTasukiGap.png',imageBuffer);
  });
  it('Check whether the supplied data has DownsideTasukiGap pattern', function() {
   var downsideTasukiGap = new DownsideTasukiGap ();
   var result        = downsideTasukiGap.hasPattern(threeDayInput);
   assert.deepEqual(result, true, 'Invalid result for DownsideTasukiGap');
  });
})

