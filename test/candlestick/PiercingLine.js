var PiercingLine = require('../../lib/candlestick/PiercingLine');
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var input = {
  open: [42.70, 41.33],
  high: [42.82,42.50],
  close: [41.60,42.34],
  low: [41.45,41.15],
  
}

describe('PiercingLine : ', function() {
   before(function() {
    var imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/PiercingLine.png',imageBuffer);
  });
  it('Check whether the supplied data has PiercingLine pattern', function() {
   var piercingLine = new PiercingLine ();
   var result = piercingLine.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for PiercingLine')
   
  });
})

