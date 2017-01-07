var BearishEngulfingPattern = require('../../lib/candlestick/BearishEngulfingPattern');
var assert                  = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');
var twoDayBearishInput = {
  open: [21.44,27.89],
  high: [25.10,30.87],
  close: [23.25,15.36],
  low: [20.82,14.93],
}

describe('BearishEngulfingPattern : ', function() {
  before(function() {
    var imageBuffer = drawCandleStick(twoDayBearishInput);
    fs.writeFileSync(__dirname+'/images/bearishEngulfing.png',imageBuffer);
  });
  it('Check whether the supplied data has BearishEngulfingPattern pattern', function() {
   var bearishEngulfingPattern = new BearishEngulfingPattern ();
   var result        = bearishEngulfingPattern.hasPattern(twoDayBearishInput);
   assert.deepEqual(result, true, 'Invalid result for BearishEngulfingPattern');
   
  });
})

