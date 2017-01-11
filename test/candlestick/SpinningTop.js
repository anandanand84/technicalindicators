var SpinningTop = require('../../lib/candlestick/SpinningTop');
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var Input = {
  open: [20.50],
  high: [20.87],
  close: [20.62],
  low: [20.23],
  
}

describe('SpinningTop : ', function() {
   before(function() {
    var imageBuffer = drawCandleStick(Input);
    fs.writeFileSync(__dirname+'/images/SpinningTop.png',imageBuffer);
  });
  it('Check whether the supplied data has SpinningTop pattern', function() {
   var spinningTop = new SpinningTop ();
   var result = spinningTop.hasPattern(Input);
   assert.deepEqual(result, true, 'Invalid result for SpinningTop')
   
  });
})

