var BearishHammer   = require('../../lib/candlestick/BearishHammerStick').default;
var assert          = require('assert');
var drawCandleStick = require('draw-candlestick');
var fs              = require('fs');

var basicHammer = {
  open: [30.10],
  high: [30.10],
  close: [26.13],
  low: [10.06],
}

describe('Bearish Hammer (Single Stick) : ', function() {
   before(function() {
    var imageBuffer = drawCandleStick(basicHammer);
    fs.writeFileSync(__dirname+'/images/BearishHammerStick.png',imageBuffer);
  });
  it('Check whether the supplied data has Bearish Hammer (Single Stick) pattern', function() {
   var bearishHammer = new BearishHammer();
   var result = bearishHammer.hasPattern(basicHammer);
   assert.deepEqual(result, true, 'Invalid result for Bearish Hammer (Single Stick)');
  });
})
