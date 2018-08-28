var BullishInvertedHammer = require('../../lib/candlestick/BullishInvertedHammer').default;
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var basicHammer = {
  open: [26.13],
  high: [52.06],
  close: [30.10],
  low: [26.13],
}

describe('Bullish Inverted Hammer : ', function() {
   before(function() {
    var imageBuffer = drawCandleStick(basicHammer);
    fs.writeFileSync(__dirname+'/images/bullishinvertedhammer.png',imageBuffer);
  });
  it('Check whether the supplied data has Bullish Inverted Hammer pattern', function() {
   var bullishInvertedHammer = new BullishInvertedHammer();
   var result = bullishInvertedHammer.hasPattern(basicHammer);
   assert.deepEqual(result, true, 'Invalid result for Bullish Inverted Hammer');
  });
})
