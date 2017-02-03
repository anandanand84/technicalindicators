var AbandonedBaby = require('../../lib/candlestick/AbandonedBaby');
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var input = {
  open: [31.10,26.18,27.47],
  high: [31.80,26.91,30.94],
  close: [28.10,26.18,30.62],
  low: [27.50,25.40,27.03]
}

describe('AbandonedBaby : ', function() {
  before(function() {
    var imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/abandonedbaby.png',imageBuffer);
  });
  it('Check whether the supplied data has AbandonedBaby pattern', function() {
   var abandonedBaby = new AbandonedBaby ();
   var result        = abandonedBaby.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for AbandonedBaby');
  });
})



