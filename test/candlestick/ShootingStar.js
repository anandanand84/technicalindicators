var ShootingStar    = require('../../lib/candlestick/ShootingStar').default;
var assert          = require('assert');
var drawCandleStick = require('draw-candlestick');
var fs              = require('fs');

var shootingStarData = [
  {
    name: 'Bearish',
    data: {
      open: [29.50, 33.10, 36.00, 42.80, 40.90],
      high: [35.90, 37.60, 41.80, 48.80, 43.10],
      close: [33.10, 36.00, 40.90, 40.90, 38.05],
      low: [26.90, 27.70, 28.00, 40.90, 37.50],
    },
  },
  {
    name: 'Bullish',
    data: {
      open: [29.50, 33.10, 36.00, 40.90, 40.90],
      high: [35.90, 37.60, 41.80, 48.80, 43.10],
      close: [33.10, 36.00, 40.90, 42.80, 38.05],
      low: [26.90, 27.70, 28.00, 40.90, 37.50],
    },
  },
];

describe('Shooting Star : ', function() {
   before(function() {
    shootingStarData.forEach((patternSet) => {
      var imageBuffer = drawCandleStick(patternSet.data);
      fs.writeFileSync(`${__dirname}/images/${patternSet.name.replace(' ', '')}ShootingStar.png`,imageBuffer);
    });
  });
  shootingStarData.forEach((patternSet) => {
    it(`Check whether the supplied data has Shooting Star: ${patternSet.name}`, function() {
      var hangingMan = new ShootingStar();
      var result = hangingMan.hasPattern(patternSet.data);
      assert.deepEqual(result, true, `Invalid result for Shooting Star: ${patternSet.name}`);
     });
  });
})
