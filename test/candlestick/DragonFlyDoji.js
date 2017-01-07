var DragonFlyDoji = require('../../lib/candlestick/DragonFlyDoji');
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var singleInput = {
  open: [30.10],
  high: [30.10],
  close: [30.13],
  low: [28.10],
  
}

describe('DragonFlyDoji : ', function() {
   before(function() {
    var imageBuffer = drawCandleStick(singleInput);
    fs.writeFileSync(__dirname+'/images/dragonFlyDoji.png',imageBuffer);
  });
  it('Check whether the supplied data has DragonFlyDoji pattern', function() {
   var dragonFlyDoji = new DragonFlyDoji();
   var result = dragonFlyDoji.hasPattern(singleInput);
   assert.deepEqual(result, true, 'Invalid result for DragonFlyDoji');
  });
})
