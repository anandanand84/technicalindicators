var BearishHammer = require('../../lib/candlestick/BearishHammer').default;
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var basicHammer = {
  open: [30.10],
  high: [30.10],
  close: [26.13],
  low: [10.06],
}

describe('Bearish Hammer : ', function() {
   before(function() {
    var imageBuffer = drawCandleStick(basicHammer);
    fs.writeFileSync(__dirname+'/images/bearishhammer.png',imageBuffer);
  });
  it('Check whether the supplied data has Bearish Hammer pattern', function() {
   var bearishHammer = new BearishHammer();
   var result = bearishHammer.hasPattern(basicHammer);
   assert.deepEqual(result, true, 'Invalid result for Bearish Hammer');
  });
})
