var MorningDojiStar = require('../../lib/candlestick/MorningDojiStar');
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var Input = {
  open: [22.20,20.30,20.70],
  high: [22.50,20.45,21.82],
  close: [20.80,20.30,21.58],
  low: [20.65,20.10,20.40]
}

describe('MorningDojiStar : ', function() {
  before(function() {
    var imageBuffer = drawCandleStick(Input);
    fs.writeFileSync(__dirname+'/images/MorningDojiStar.png',imageBuffer);
  });
  it('Check whether the supplied data has MorningDojiStar pattern', function() {
   var morningDojiStar = new MorningDojiStar ();
   var result      = morningDojiStar.hasPattern(Input);
   assert.deepEqual(result, true, 'Invalid result for MorningDojiStar');
  });
})



