
"use strict";
let assert = require('assert');
let Sum    = require('../../lib/Utils/Sum').Sum;

let input = {
  values : [10,20,30,40,30,20,10,20,16,29,15],
  period : 3
}
                   
let expectResult = [ 60, 90, 100, 90, 60, 50, 46, 65, 60 ]

describe('Sum', function() {
  it('should calculate Sum using the calculate method', function() {
    var result = Sum.calculate(input);
    assert.deepEqual(result, expectResult, 'Wrong Results');
  });
})
