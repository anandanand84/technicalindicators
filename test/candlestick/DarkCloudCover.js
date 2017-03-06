var DarkCloudCover = require('../../lib/candlestick/DarkCloudCover').default;
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var input = {
  open: [30.10,39.45],
  high: [37.40,41.45],
  close: [35.36,32.50],
  low: [28.30,31.25],
  
}

describe('DarkCloudCover: ', function() {
   before(function() {
    var imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/darkCloudCover.png',imageBuffer);
  });
  it('Check whether the supplied data has DarkCloudCover pattern', function() {
   var darkCloudCover = new DarkCloudCover ();
   var result        = darkCloudCover.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for DarkCloudCover');
  });
})

