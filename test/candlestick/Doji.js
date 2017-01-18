var Doji = require('../../lib/candlestick/Doji');
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var input = {
  open: [30.10],
  high: [32.10],
  close: [30.13],
  low: [28.10],
  
}

describe('Doji : ', function() {
   before(function() {
    var imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/doji.png',imageBuffer);
  });
  it('Check whether the supplied data has Doji pattern', function() {
   var doji = new Doji();
   var result = doji.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for Doji');
  });
})
