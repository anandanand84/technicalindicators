var BearishHaramiCross = require('../../lib/candlestick/BearishHaramiCross').default;
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var input = {
  open: [20.12, 22.13],
  high: [23.82,22.76],
  close: [23.50,22.13],
  low: [19.88,21.31],
  
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

