var TypicalPrice = require('../../lib/chart_types/TypicalPrice').TypicalPrice;
var assert = require('assert');

var data = {
    high : [1, 4, 1, 2, 1],
    low :  [2, 5, 2, 2, 1],
    close: [3, 6, 4, 2, 1]
}

var expectedOutput = [(1 + 2 + 3)/ 3, (4 + 5 +6)/ 3, (1 + 2 + 4)/ 3, 2, 1];

describe('TypicalPrice ', function() {
    let input = {};
    beforeEach(function(){
      input = JSON.parse(JSON.stringify(data));
    });
    it('should calculate TypicalPrice using the calculate method', function() {
      assert.deepEqual(TypicalPrice.calculate(input), expectedOutput,'Wrong Results');
    });
  
    it('should be able to get TypicalPrice for the next bar using nextValue', function() {
      input.values = [];
      var typicalPrice = new TypicalPrice(input);
      var result = typicalPrice.nextValue({
          high: 4,
          low : 4,
          close : 4 
      });
      assert.deepEqual(result,  4, 'Wrong Results');
    });
  });