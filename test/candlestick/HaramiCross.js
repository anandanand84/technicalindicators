var HaramiCross = require('../../lib/candlestick/HaramiCross');
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var twoDayInput = {
  open: [25.13, 23.45],
  high: [25.80,24.59],
  close: [22.14,23.45],
  low: [21.7,23.07],
  
}

// var twoDayInput = {
//   open: [20.12, 22.13],
//   high: [23.82,22.76],
//   close: [23.50,22.13],
//   low: [19.88,21.31],
// }

describe('HaramiCross: ', function() {
  before(function() {
    var imageBuffer = drawCandleStick(twoDayInput);
    fs.writeFileSync(__dirname+'/images/HaramiCross.png',imageBuffer);
  });
  it('Check whether the supplied data has HaramiCross pattern', function() {
   var haramiCross = new HaramiCross ();
   var result = haramiCross.hasPattern(twoDayInput);
   assert.deepEqual(result, true, 'Invalid result for HaramiCross')
   
  });
})

