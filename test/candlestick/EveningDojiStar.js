var EveningDojiStar = require('../../lib/candlestick/EveningDojiStar');
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var Input = {
  open: [18.35,22.20,21.60],
  high: [21.60,22.40,22.05],
  close: [21.30,22.22,19.45],
  low: [18.13,21.87,19.30]
}

describe('EveningDojiStar : ', function() {
  before(function() {
    var imageBuffer = drawCandleStick(Input);
    fs.writeFileSync(__dirname+'/images/EveningDojiStar.png',imageBuffer);
  });
  it('Check whether the supplied data has EveningDojiStar pattern', function() {
   var eveningDojiStar = new EveningDojiStar ();
   var result        = eveningDojiStar.hasPattern(Input);
   assert.deepEqual(result, true, 'Invalid result for EveningDojiStar');
  });
})



