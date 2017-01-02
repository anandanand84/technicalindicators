var Harami = require('../../lib/candlestick/Harami');
var assert = require('assert');

var twoDayInput = {
  open: [25.13, 23.45],
  high: [25.80,24.59],
  close: [22.14,24.1],
  low: [21.7,23.07],
  
}

/*var twoDayInput1 = {
  open: [20.12, 22,13],
  high: [23.82,22.76],
  close: [23.50,21.70],
  low: [19.88,21.31],
}*/

describe('Common candlestick utilities : ', function() {
  it('Generate candlestick should generate subset of data based on supplied data', function() {
   var harami = new Harami ();
   var result = harami.hasPattern(twoDayInput);
   assert.deepEqual(result, true, 'Invalid result for Harami')
   
  });
})

