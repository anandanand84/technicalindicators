var GraveStoneDoji = require('../../lib/candlestick/GraveStoneDoji');
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var singleInput = {
  open: [30.10],
  high: [36.13],
  close: [30.13],
  low: [30.12],
  
}

describe('GraveStoneDoji : ', function() {
   before(function() {
    var imageBuffer = drawCandleStick(singleInput);
    fs.writeFileSync(__dirname+'/images/graveStoneDoji.png',imageBuffer);
  });
  it('Check whether the supplied data has GraveStoneDoji pattern', function() {
   var graveStoneDoji = new GraveStoneDoji();
   var result = graveStoneDoji.hasPattern(singleInput);
   assert.deepEqual(result, true, 'Invalid result for GraveStoneDoji');
  });
})
