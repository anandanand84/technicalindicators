var BullishEngulfingPattern = require('../../lib/candlestick/BullishEngulfingPattern');
var assert = require('assert');

var twoDayBullishInput = {
  open: [23.25,15.36],
  high: [25.10,30.87],
  close: [21.44,27.89],
  low: [20.82,14.93],
}

describe('Common candlestick utilities : ', function() {
  it('Generate candlestick should generate subset of data based on supplied data', function() {
   var bullishEngulfingPattern = new BullishEngulfingPattern ();
   var result        = bullishEngulfingPattern.hasPattern(twoDayBullishInput);
   assert.deepEqual(result, true, 'Invalid result for BullishEngulfingPattern');
   
  });
})

