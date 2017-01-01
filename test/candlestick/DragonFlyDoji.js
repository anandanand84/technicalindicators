var DragonFlyDoji = require('../../lib/candlestick/DragonFlyDoji');
var assert = require('assert');

var singleInput = {
  open: [30.10],
  high: [30.10],
  close: [30.13],
  low: [28.10],
  
}

describe('Common candlestick utilities : ', function() {
  it('Generate candlestick should generate subset of data based on supplied data', function() {
   var dragonFlyDoji = new DragonFlyDoji();
   var result = dragonFlyDoji.hasPattern(singleInput);
   assert.deepEqual(result, true, 'Invalid result for DragonFlyDoji');
  });
})
