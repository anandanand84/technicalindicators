var HammerPattern   = require('../../lib/candlestick/HammerPattern').default;
var assert          = require('assert');
var drawCandleStick = require('draw-candlestick');
var fs              = require('fs');

var hammerData = [
  {
    name: 'Bearish',
    data: {
      open: [40.90, 36.00, 33.10, 30.10, 26.13],
      high: [41.80, 37.60, 35.90, 30.10, 33.60],
      close: [36.00, 33.10, 29.50, 26.13, 31.00],
      low: [28.00, 27.70, 26.90, 10.06, 25.90],
    },
  },
  {
    name: 'Bearish Inverted',
    data: {
      open: [40.90, 36.00, 33.10, 29.10, 26.13],
      high: [41.80, 37.60, 35.90, 36.10, 33.60],
      close: [36.00, 33.10, 29.50, 26.13, 31.00],
      low: [28.00, 27.70, 26.90, 26.13, 25.90],
    },
  },
  {
    name: 'Bullish',
    data: {
      open: [40.90, 36.00, 33.10, 26.13, 26.13],
      high: [41.80, 37.60, 35.90, 30.10, 33.60],
      close: [36.00, 33.10, 29.50, 30.10, 31.00],
      low: [28.00, 27.70, 26.90, 10.06, 25.90],
    },
  },
  {
    name: 'Bullish Inverted',
    data: {
      open: [40.90, 36.00, 33.10, 26.13, 26.13],
      high: [41.80, 37.60, 35.90, 36.10, 33.60],
      close: [36.00, 33.10, 29.50, 29.10, 31.00],
      low: [28.00, 27.70, 26.90, 26.13, 25.90],
    },
  },
]

describe('Hammer Pattern : ', function() {
   before(function() {
    hammerData.forEach((patternSet) => {
      var imageBuffer = drawCandleStick(patternSet.data);
      fs.writeFileSync(`${__dirname}/images/${patternSet.name.replace(' ', '')}HammerPattern.png`,imageBuffer);
    });
  });
  hammerData.forEach((patternSet) => {
    it(`Check whether the supplied data has Hammer Pattern: ${patternSet.name}`, function() {
      var Hammer = new HammerPattern();
      var result = Hammer.hasPattern(patternSet.data);
      assert.deepEqual(result, true, `Invalid result for Hammer Pattern: ${patternSet.name}`);
     });
  });
})
