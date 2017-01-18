var GraveStoneDoji = require('../../lib/candlestick/GraveStoneDoji');
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var input = {
  open: [30.10],
  high: [36.13],
  close: [30.13],
  low: [30.12],
  
}

describe('GraveStoneDoji : ', function() {
   before(function() {
    var imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/graveStoneDoji.png',imageBuffer);
  });
  it('Check whether the supplied data has GraveStoneDoji pattern', function() {
   var graveStoneDoji = new GraveStoneDoji();
   var result = graveStoneDoji.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for GraveStoneDoji');
  });
})
