var BullishSpinningTop = require('../../lib/candlestick/BullishSpinningTop');
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var input = {
  open: [20.50],
  high: [20.87],
  close: [20.62],
  low: [20.23],
  
}

describe('BullishSpinningTop : ', function() {
   before(function() {
    var imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/BullishSpinningTop.png',imageBuffer);
  });
  it('Check whether the supplied data has BullishSpinningTop pattern', function() {
   var bullishSpinningTop = new BullishSpinningTop ();
   var result = bullishSpinningTop.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for BullishSpinningTop')
   
  });
})

