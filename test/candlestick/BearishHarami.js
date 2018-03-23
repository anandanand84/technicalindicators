var BearishHarami = require('../../lib/candlestick/BearishHarami').default;
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var input = {
  open: [20.12, 22,13],
  high: [23.82,22.76],
  close: [23.50,21.70],
  low: [19.88,21.31],
}

describe('BearishHarami : ', function() {
   before(function() {
    var imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/BearishHarami.png',imageBuffer);
  });
  it('Check whether the supplied data has BearishHarami pattern', function() {
   var bearishHarami = new BearishHarami ();
   var result = bearishHarami.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for BearishHarami')
   
  });
})

