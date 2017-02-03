var BearishMarubozu = require('../../lib/candlestick/BearishMarubozu');
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var input = {
  close: [30.50],
  open: [31.23],
  high: [31.23],
  low: [30.50],
}

describe('BearishMarubozu : ', function() {
   before(function() {
    var imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/BearishMarubozu.png',imageBuffer);
  });
  it('Check whether the supplied data has BearishMarubozu pattern', function() {
   var bearishMarubozu = new BearishMarubozu();
   var result = bearishMarubozu.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for BearishMarubozu');
  });
})
