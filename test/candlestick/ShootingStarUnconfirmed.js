var ShootingStar    = require('../../lib/candlestick/ShootingStarUnconfirmed').default;
var assert          = require('assert');
var drawCandleStick = require('draw-candlestick');
var fs              = require('fs');

var shootingStarData = [
  {
    name: 'Bearish',
    data: {
      open: [28.90, 29.50, 33.10, 36.00, 42.80],
      high: [36.10, 35.90, 37.60, 41.80, 48.80],
      close: [29.50, 33.10, 36.00, 40.90, 40.90],
      low: [27.00, 26.90, 27.70, 28.00, 40.90],
    },
  },
  {
    name: 'Bullish',
    data: {
      open: [28.90, 29.50, 33.10, 36.00, 40.90],
      high: [36.10, 35.90, 37.60, 41.80, 48.80],
      close: [29.50, 33.10, 36.00, 40.90, 42.80],
      low: [27.00, 26.90, 27.70, 28.00, 40.90],
    },
  },
];

describe('Shooting Star (Unconfirmed) : ', function() {
   before(function() {
    shootingStarData.forEach((patternSet) => {
      var imageBuffer = drawCandleStick(patternSet.data);
      fs.writeFileSync(`${__dirname}/images/${patternSet.name.replace(' ', '')}ShootingStarUnconfirmed.png`,imageBuffer);
    });
  });
  shootingStarData.forEach((patternSet) => {
    it(`Check whether the supplied data has Shooting Star (Unconfirmed): ${patternSet.name}`, function() {
      var hangingMan = new ShootingStar();
      var result = hangingMan.hasPattern(patternSet.data);
      assert.deepEqual(result, true, `Invalid result for Shooting Star (Unconfirmed): ${patternSet.name}`);
     });
  });
})
