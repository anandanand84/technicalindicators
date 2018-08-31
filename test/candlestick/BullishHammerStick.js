var BullishHammer   = require('../../lib/candlestick/BullishHammerStick').default;
var assert          = require('assert');
var drawCandleStick = require('draw-candlestick');
var fs              = require('fs');

var basicHammer = {
  open: [26.13],
  high: [30.10],
  close: [30.10],
  low: [10.06],
}

describe('Bullish Hammer (Single Stick): ', function() {
   before(function() {
    var imageBuffer = drawCandleStick(basicHammer);
    fs.writeFileSync(__dirname+'/images/BullishHammerStick.png',imageBuffer);
  });
  it('Check whether the supplied data has Bullish Hammer (Single Stick) pattern', function() {
   var bullishHammer = new BullishHammer();
   var result = bullishHammer.hasPattern(basicHammer);
   assert.deepEqual(result, true, 'Invalid result for Bullish Hammer (Single Stick)');
  });
})
