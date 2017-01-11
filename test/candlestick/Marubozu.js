var Marubozu = require('../../lib/candlestick/Marubozu');
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var Input = {
  close: [31.23],
  open: [30.50],
  high: [31.23],
  low: [30.50],
}

describe('Marubozu : ', function() {
   before(function() {
    var imageBuffer = drawCandleStick(Input);
    fs.writeFileSync(__dirname+'/images/Marubozu.png',imageBuffer);
  });
  it('Check whether the supplied data has Marubozu pattern', function() {
   var marubozu = new Marubozu();
   var result = marubozu.hasPattern(Input);
   assert.deepEqual(result, true, 'Invalid result for Marubozu');
  });
})
