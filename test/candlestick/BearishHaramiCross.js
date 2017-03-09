var BearishHaramiCross = require('../../lib/candlestick/BearishHaramiCross').default;
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var input = {
  open: [25.13, 23.45],
  high: [25.80,24.59],
  close: [22.14,23.45],
  low: [21.7,23.07],
  
}

describe('BearishHaramiCross: ', function() {
  before(function() {
    var imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/BearishHaramiCross.png',imageBuffer);
  });
  it('Check whether the supplied data has BearishHaramiCross pattern', function() {
   var bearishHaramiCross = new BearishHaramiCross ();
   var result = bearishHaramiCross.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for BearishHaramiCross')
   
  });
})

