var BullishHaramiCross = require('../../lib/candlestick/BullishHaramiCross').default;
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var input = {
  open: [25.13, 23.45],
  high: [25.80,24.59],
  close: [22.14,23.45],
  low: [21.7,23.07],
}

describe('BullishHaramiCross: ', function() {
  before(function() {
    var imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/BullishHaramiCross.png',imageBuffer);
  });
  it('Check whether the supplied data has BullishHaramiCross pattern', function() {
   var bullishHaramiCross = new BullishHaramiCross ();
   var result = bullishHaramiCross.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for BullishHaramiCross')
   
  });
})

