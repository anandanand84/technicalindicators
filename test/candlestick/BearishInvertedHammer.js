var BearishInvertedHammer = require('../../lib/candlestick/BearishInvertedHammer').default;
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var basicHammer = {
  open: [30.10],
  high: [52.06],
  close: [26.13],
  low: [26.13],
}

describe('Bearish Inverted Hammer : ', function() {
   before(function() {
    var imageBuffer = drawCandleStick(basicHammer);
    fs.writeFileSync(__dirname+'/images/bearishinvertedhammer.png',imageBuffer);
  });
  it('Check whether the supplied data has Bearish Inverted Hammer pattern', function() {
   var bearishInvertedHammer = new BearishInvertedHammer();
   var result = bearishInvertedHammer.hasPattern(basicHammer);
   assert.deepEqual(result, true, 'Invalid result for Bearish Inverted Hammer');
  });
})
