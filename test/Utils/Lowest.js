
"use strict";
let assert = require('assert');
let Lowest    = require('../../lib/Utils/Lowest').Lowest;

let input = {
  values : [10,20,30,40,30,20,10,20,16,29,15],
  period : 3
}

let expectResult = [ 10, 20, 30, 20, 10, 10, 10, 16, 15 ]

describe('Lowest', function() {
  it('should calculate Lowest using the calculate method', function() {
    var result = Lowest.calculate(input);
    assert.deepEqual(result, expectResult, 'Wrong Results');
  });
})
