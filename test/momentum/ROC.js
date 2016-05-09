/**
 * Created by AAravindan on 5/7/16.
 */
const assert = require('assert');
const ROC     = require('../../lib/momentum/ROC')

//var data = [4,2,5,8,6];
var data = [11045.27,11167.32,11008.61,11151.83,10926.77,10868.12,10520.32,10380.43,10785.14,10748.26,10896.91,10782.95,10620.16,10625.83,10510.95,10444.37,10068.01,10193.39,10066.57,10043.75];
var period = 12;
var expectResult = [-3.85,-4.85,-4.52,-6.34,-7.86,-6.21,-4.31,-3.24]
describe('Rate of change', function() {
  "use strict";
  it('should calculate ROC using the calculate method', function() {
    assert.deepEqual(ROC.calculate({period : period, values : data}), expectResult, 'Wrong Results');
  });

  it('should be able to calculate ROC by using getResult', function() {
    var roc = new ROC({period : period, values : data});
    assert.deepEqual(roc.getResult(),  expectResult, 'Wrong Results while calculating next bar');
  });

  it('should be able to get ROC for the next bar using nextValue', function() {
    var roc = new ROC({period : period, values : []});
    var results = [];
    data.forEach(price => {
      var result = roc.nextValue(price);
      if(result)
        results.push(result)
    });
    assert.deepEqual(results, expectResult, 'Wrong Results while getting results');
  })
})