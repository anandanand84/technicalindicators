var ThreeBlackCrows = require('../../lib/candlestick/ThreeBlackCrows');
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var input = {
  open: [21.65,21.48,21.25],
  high: [21.82,21.57,21.35],
  close: [21.32,21.10,20.70],
  low: [21.25,20.97,20.60]
}

describe('ThreeBlackCrows : ', function() {
  before(function() {
    var imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/ThreeBlackCrows.png',imageBuffer);
  });
  it('Check whether the supplied data has ThreeBlackCrows pattern', function() {
   var threeBlackCrows = new ThreeBlackCrows ();
   var result      = threeBlackCrows.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for ThreeBlackCrows');
  });
})



