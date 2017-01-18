var BearishSpinningTop = require('../../lib/candlestick/BearishSpinningTop');
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var input = {
  open: [20.62],
  high: [20.75],
  close: [20.50],
  low: [20.34],
  
}

describe('BearishSpinningTop : ', function() {
   before(function() {
    var imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/BearishSpinningTop.png',imageBuffer);
  });
  it('Check whether the supplied data has BearishSpinningTop pattern', function() {
   var bearishSpinningTop = new BearishSpinningTop ();
   var result = bearishSpinningTop.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for BearishSpinningTop')
   
  });
})

