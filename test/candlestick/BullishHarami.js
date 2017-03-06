var BullishHarami = require('../../lib/candlestick/BullishHarami').default;
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var input = {
  open: [20.12, 22,13],
  high: [23.82,22.76],
  close: [23.50,21.70],
  low: [19.88,21.31],
}

describe('BullishHarami : ', function() {
   before(function() {
    var imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/BullishHarami.png',imageBuffer);
  });
  it('Check whether the supplied data has BullishHarami pattern', function() {
   var bullishHarami = new BullishHarami ();
   var result = bullishHarami.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for BullishHarami')
   
  });
})

