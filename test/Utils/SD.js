/**
 * Created by AAravindan on 5/7/16.
 */
"use strict"
const assert = require('assert');
const SD     = require('../../lib/Utils/SD')

//var data = [4,2,5,8,6];
var data = [11,12,13,14,15,16,18, 19, 22, 23, 23];
var period = 5;
//var expectResult = [2.24]
var expectResult = [
  1.41,
  1.41,
  1.72,
  1.85,
  2.45,
  2.58,
  2.1
]
describe('Standard Deviation', function() {
  "use strict";
  it('should calculate SD using the calculate method', function() {
    assert.deepEqual(SD.calculate({period : period, values : data}), expectResult, 'Wrong Results');
  });

  it('should be able to calculate ROC for reversed input by using calculate method', function() {
    let myInput = Object.assign({}, {
      period : period,
      values : data
    });
    myInput.reversedInput = true;
    myInput.values.reverse();
    assert.deepEqual(SD.calculate(myInput),  expectResult.slice().reverse(), 'Wrong Results while calculating next bar');
  });

  it('should be able to calculate EMA by using getResult', function() {
    var sd = new SD({period : period, values : data});
    assert.deepEqual(sd.getResult(),  expectResult, 'Wrong Results while calculating next bar');
  });

  it('should be able to get EMA for the next bar using nextValue', function() {
    var sd = new SD({period : period, values : []});
    var results = [];
    data.forEach(price => {
      var result = sd.nextValue(price);
      if(result)
        results.push(result)
    });
    assert.deepEqual(results, expectResult, 'Wrong Results while getting results');
  })
})