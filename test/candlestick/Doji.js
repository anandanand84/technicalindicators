var Doji = require('../../lib/candlestick/Doji');
var assert = require('assert');

var singleInput = {
  open: [30.10],
  high: [32.10],
  close: [30.13],
  low: [28.10],
  
}

describe('Common candlestick utilities : ', function() {
  it('Generate candlestick should generate subset of data based on supplied data', function() {
   var doji = new Doji();
   var result = doji.hasPattern(singleInput);
   assert.deepEqual(result, true, 'Invalid result for Doji');
  });
})
