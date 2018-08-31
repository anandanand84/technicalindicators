var BullishInvertedHammer = require('../../lib/candlestick/BullishInvertedHammerStick').default;
var assert                = require('assert');
var drawCandleStick       = require('draw-candlestick');
var fs                    = require('fs');

var basicHammer = {
  open: [26.13],
  high: [52.06],
  close: [30.10],
  low: [26.13],
}

describe('Bullish Inverted Hammer (Single Stick) : ', function() {
   before(function() {
    var imageBuffer = drawCandleStick(basicHammer);
    fs.writeFileSync(__dirname+'/images/BullishInvertedHammerStick.png',imageBuffer);
  });
  it('Check whether the supplied data has Bullish Inverted Hammer (Single Stick) pattern', function() {
   var bullishInvertedHammer = new BullishInvertedHammer();
   var result = bullishInvertedHammer.hasPattern(basicHammer);
   assert.deepEqual(result, true, 'Invalid result for Bullish Inverted Hammer (Single Stick)');
  });
})
