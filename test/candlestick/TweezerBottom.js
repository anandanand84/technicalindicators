var TweezerBottom   = require('../../lib/candlestick/TweezerBottom').default;
var assert          = require('assert');
var drawCandleStick = require('draw-candlestick');
var fs              = require('fs');

var testData = {
  open: [40.90, 36.00, 33.10, 30.10, 26.13],
  high: [41.80, 37.60, 35.90, 31.60, 33.60],
  close: [36.00, 33.10, 29.50, 26.13, 31.00],
  low: [28.00, 27.70, 26.90, 25.90, 25.90],
};

describe('Tweezer Bottom : ', function() {
   before(function() {
    var imageBuffer = drawCandleStick(testData);
    fs.writeFileSync(`${__dirname}/images/TweezerBottom.png`,imageBuffer);
  });
  it(`Check whether the supplied data has Tweezer Bottom`, function() {
    var tweezerBottom = new TweezerBottom();
    var result        = tweezerBottom.hasPattern(testData);
    assert.deepEqual(result, true, `Invalid result for Tweezer Bottom`);
  });
})
