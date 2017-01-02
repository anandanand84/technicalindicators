var GraveStoneDoji = require('../../lib/candlestick/GraveStoneDoji');
var assert = require('assert');

var singleInput = {
  open: [30.10],
  high: [36.13],
  close: [30.13],
  low: [30.12],
  
}

describe('Common candlestick utilities : ', function() {
  it('Generate candlestick should generate subset of data based on supplied data', function() {
   var graveStoneDoji = new GraveStoneDoji();
   var result = graveStoneDoji.hasPattern(singleInput);
   assert.deepEqual(result, true, 'Invalid result for GraveStoneDoji');
  });
})
