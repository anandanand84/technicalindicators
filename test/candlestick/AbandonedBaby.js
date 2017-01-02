var AbandonedBaby = require('../../lib/candlestick/AbandonedBaby');
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var threeDayInput = {
  open: [30.10,27.18,29.87],
  high: [32.40,27.32,28.70],
  close: [28.10,27.18,30.62],
  low: [27.87,24.67,29.30],
}

describe('Common candlestick utilities : ', function() {
  before(function() {
    var imageBuffer = drawCandleStick(threeDayInput);
    fs.writeFileSync(__dirname+'/images/abandonedbaby.png',imageBuffer);
  });
  it('Generate candlestick should generate subset of data based on supplied data', function() {
   var abandonedBaby = new AbandonedBaby ();
   var result        = abandonedBaby.hasPattern(threeDayInput);
   assert.deepEqual(result, true, 'Invalid result for AbandonedBaby');
  });
})

