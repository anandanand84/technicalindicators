var DragonFlyDoji = require('../../lib/candlestick/DragonFlyDoji').default;
var assert = require('assert');
var drawCandleStick         = require('draw-candlestick');
var fs                      = require('fs');

var input = {
  open: [30.10],
  high: [30.10],
  close: [30.13],
  low: [28.10],
  
}

var inputDot = {
  open: [30.10],
  high: [30.11],
  close: [30.10],
  low: [30.09],

}

describe('DragonFlyDoji : ', function() {
   before(function() {
    var imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/dragonFlyDoji.png',imageBuffer);
  });
  it('Check whether the supplied data has DragonFlyDoji pattern', function() {
   var dragonFlyDoji = new DragonFlyDoji();
   var result = dragonFlyDoji.hasPattern(input);
   assert.deepEqual(result, true, 'Invalid result for DragonFlyDoji');
  });
  it('Check whether the supplied data has DragonFlyDoji pattern', function() {
   var dragonFlyDoji = new DragonFlyDoji();
   var result = dragonFlyDoji.hasPattern(inputDot);
   assert.deepEqual(result, false, 'Invalid result for a single point Doji');
  });
})
