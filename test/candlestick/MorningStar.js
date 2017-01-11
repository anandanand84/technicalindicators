var MorningStar = require('../../lib/candlestick/MorningStar');
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

// var Input = {
//   open: [22.20,19.80,20.70],
//   high: [22.50,20.45,21.82],
//   close: [20.80,20.30,21.58],
//   low: [20.65,19.60,20.40]
// }

var Input = {
  open: [22.20,20.30,20.70],
  high: [22.50,20.45,21.82],
  close: [20.80,19.80,21.58],
  low: [20.65,19.60,20.40]
}

describe('MorningStar : ', function() {
  before(function() {
    var imageBuffer = drawCandleStick(Input);
    fs.writeFileSync(__dirname+'/images/MorningStar.png',imageBuffer);
  });
  it('Check whether the supplied data has MorningStar pattern', function() {
   var morningStar = new MorningStar ();
   var result      = morningStar.hasPattern(Input);
   assert.deepEqual(result, true, 'Invalid result for MorningStar');
  });
})



