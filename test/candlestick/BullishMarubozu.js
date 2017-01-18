var BullishMarubozu = require('../../lib/candlestick/BullishMarubozu');
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var input = {
  close: [31.23],
  open: [30.50],
  high: [31.23],
  low: [30.50],
}

describe('BullishMarubozu : ', function() {
   before(function() {
    var imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/BullishMarubozu.png',imageBuffer);
  });
  it('Check whether the supplied data has BullishMarubozu pattern', function() {
   var bullishMarubozu = new BullishMarubozu();
   var result = bullishMarubozu.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for BullishMarubozu');
  });
})
