/**
 * Created by AAravindan on 5/7/16.
 */
"use strict"
const assert = require('assert');
const ROC     = require('../../lib/momentum/ROC').ROC
    
//let data = [4,2,5,8,6];
let data = [11045.27,11167.32,11008.61,11151.83,10926.77,10868.12,10520.32,10380.43,10785.14,10748.26,10896.91,10782.95,10620.16,10625.83,10510.95,10444.37,10068.01,10193.39,10066.57,10043.75];
let period = 12;
let expectResult = [
      -3.848796815288359,
      -4.848880483410521,
      -4.520643387312293,
      -6.343891540670896,
      -7.859230129306283,
      -6.2083414610806775,
      -4.313081731354179,
      -3.243410918430164,
    ]
describe('Rate of change', function() {
  "use strict";
  it('should be able to calculate ROC by using getResult', function() {
    let roc = new ROC({period : period, values : data});
    assert.deepEqual(roc.getResult(),  expectResult, 'Wrong Results while calculating next bar');
  });

  it('should be able to calculate KST for reversed input by using getResult', function() {
    let roc = new ROC({period : period, values : data, reversedInput : true});
    assert.deepEqual(roc.getResult(),  expectResult, 'Wrong Results while calculating next bar');
  });

  it('should be able to get ROC for the next bar using nextValue', function() {
    let roc = new ROC({period : period, values : []});
    let results = [];
    data.forEach(price => {
      let result = roc.nextValue(price);
      if(result)
        results.push(result)
    });
    assert.deepEqual(results, expectResult, 'Wrong Results while getting results');
  })
  
  it('should calculate ROC using the calculate method', function() {
    assert.deepEqual(ROC.calculate({period : period, values : data}), expectResult, 'Wrong Results');
  });

  it('should be able to calculate ROC for reversed input by using calculate method', function() {
    let myInput = Object.assign({}, {
      period : period,
      values : data
    });
    myInput.reversedInput = true;
    myInput.values.reverse();
    assert.deepEqual(ROC.calculate(myInput),  expectResult.slice().reverse(), 'Wrong Results while calculating next bar');
  });
})