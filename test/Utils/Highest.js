
"use strict";
let assert = require('assert');
let Highest    = require('../../lib/Utils/Highest').Highest;

let input = {
  values : [10,20,30,40,30,20,10,20,16,29,15],
  period : 3
}

let expectResult = [30, 40, 40, 40, 30, 20, 20, 29, 29]

describe('Highest', function() {
  it('should calculate Highest using the calculate method', function() {
    var result = Highest.calculate(input);
    assert.deepEqual(result, expectResult, 'Wrong Results');
  });
})
