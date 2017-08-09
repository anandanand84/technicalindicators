/**
 * Created by AAravindan on 5/3/16.
 */
var sma = require('../dist/index.js').sma;
var cci = require('../dist/index.js').cci;
var assert = require('assert');
var data   = require('./data')

var prices = data.close;

var period = 10;

var expectResult =  [
    139.438,
    142.908,
    147.901,
    154.661,
    162.31099999999998,
    171.736,
    182.33599999999998,
    196.24,
    210.362,
]


describe('Test in node after build process', function() {
  it('should calculate sma', function() {
    assert.deepEqual(sma({period : period, values : prices}), expectResult, 'Wrong Results');
  });
})