var DarkCloudCover = require('../../lib/candlestick/DarkCloudCover');
var assert = require('assert');

var twoDayInput = {
  open: [30.10,39.45],
  high: [37.40,39.45],
  close: [35.36,32.50],
  low: [28.30,31.25],
  
}

describe('Common candlestick utilities : ', function() {
  it('Generate candlestick should generate subset of data based on supplied data', function() {
   var darkCloudCover = new DarkCloudCover ();
   var result        = darkCloudCover.hasPattern(twoDayInput);
   assert.deepEqual(result, true, 'Invalid result for DarkCloudCover');
  });
})

