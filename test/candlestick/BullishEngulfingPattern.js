var BullishEngulfingPattern = require('../../lib/candlestick/BullishEngulfingPattern');
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var input = {
  open: [23.25,15.36],
  high: [25.10,30.87],
  close: [21.44,27.89],
  low: [20.82,14.93],
}

describe('BullishEngulfingPattern : ', function() {
   before(function() {
    var imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/bullishEngulfingPattern.png',imageBuffer);
  });
  it('Check whether the supplied data has BullishEngulfingPattern pattern', function() {
   var bullishEngulfingPattern = new BullishEngulfingPattern ();
   var result        = bullishEngulfingPattern.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for BullishEngulfingPattern');
   
  });
})

