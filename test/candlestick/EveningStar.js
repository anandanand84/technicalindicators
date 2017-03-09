var EveningStar = require('../../lib/candlestick/EveningStar').default;
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var input = {
  open: [18.35,22.20,21.60],
  high: [21.60,22.70,22.05],
  close: [21.30,22.52,19.45],
  low: [18.13,21.87,19.30]
}

describe('EveningStar : ', function() {
  before(function() {
    var imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/EveningStar.png',imageBuffer);
  });
  it('Check whether the supplied data has EveningStar pattern', function() {
   var eveningStar = new EveningStar ();
   var result        = eveningStar.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for EveningStar');
  });
})



