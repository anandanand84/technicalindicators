var Doji = require('../../lib/candlestick/Doji');
var assert = require('assert');

var input = {
  open: [30.10,30.18,30.15,29.15,28.35,29.19,28.83,28.13,28.17,28.35,28.34],
  high: [30.20,30.28,30.45,29.35,29.35,29.29,28.83,28.73,28.67,28.85,28.64],
  low:  [29.41,29.32,29.96,28.74,28.56,28.41,28.08,27.43,27.66,27.83,27.40],
  close:[29.87,30.24,30.10,28.90,28.92,28.48,28.56,27.56,28.47,28.28,27.49],
}

describe('Common candlestick utilities : ', function() {
  it('Generate candlestick should generate subset of data based on supplied data', function() {
   var doji = new Doji();
   var result = doji.hasPattern(input);
   assert.deepEqual(result, false, 'Invalid result for Doji');
  });
})
