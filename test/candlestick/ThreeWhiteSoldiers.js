var ThreeWhiteSoldiers = require('../../lib/candlestick/ThreeWhiteSoldiers').default;
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var input = {
  open: [21.12,21.48,21.80],
  close: [21.65,22.20,22.65],
  high: [21.83,22.40,22.80],
  low: [20.85,21.36,21.66]
}

describe('ThreeWhiteSoldiers : ', function() {
  before(function() {
    var imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/ThreeWhiteSoldiers.png',imageBuffer);
  });
  it('Check whether the supplied data has ThreeWhiteSoldiers pattern', function() {
   var threeWhiteSoldiers = new ThreeWhiteSoldiers ();
   var result      = threeWhiteSoldiers.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for ThreeWhiteSoldiers');
  });
})



