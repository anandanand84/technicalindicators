/**
 * Created by AAravindan on 5/7/16.
 */
"use strict";
const assert = require('assert');
const TRIX     = require('../../lib/momentum/TRIX').TRIX
var close = [127.75,129.024995,132.75,145.399995,148.975005,137.524995,147.375,139.050005,137.225005,149.300005,162.449995,178.949995,200.350005,221.899995,243.225005,243.524995,286.42499,280.274995,277.350005,269.024995,263.225005,214.899995,214.824995,244.449995,237.824995,258.95001,269.29999,258.524995,266.850005,266.149995,278.125,273.024995,264.024995,267.5,321.274995,351.67499,359.70001,396.774995,381.25,416.350005,444.649995,356.95001,354.42499,397.67499,498.975005,477.475005,529.925,489.399995,558.675,585.875,613,622.225,635.075,683.225,676.25,685.15,780.525,879.4,850.275,946.75,977,1149.025,1391.9];

let input = {
  values      : close,
  period      : 18
};


//let expectResult = [294.0550,299.1142,303.7449,307.7237,312.2738,318.1194,323.9484,330.4611,337.2436,345.5079,356.4119]
let expectResult = [
  3.49505,
  3.52785,
  3.55226,
  3.56435,
  3.59352,
  3.65695,
  3.71853,
  3.79676,
  3.87974,
  4.00172,
  4.19895
]

describe('TRIX', function() {
  "use strict";
  it('should calculate TRIX using the calculate method', function() {
    assert.deepEqual(TRIX.calculate(input), expectResult, 'Wrong Results');
  });

  it('should be able to calculate TRIX by using getResult', function() {
    let trix = new TRIX(input);
    assert.deepEqual(trix.getResult(),  expectResult, 'Wrong Results while calculating next bar');
  });

  it('should be able to get TRIX for the next bar using nextValue', function() {
    let trixInput = Object.assign({}, input);
    trixInput.values = [];
    let trix = new TRIX(trixInput);
    let results = [];
    input.values.forEach(price => {
      let result = trix.nextValue(price);
      if(result)
        results.push(result)
    });
    assert.deepEqual(results, expectResult, 'Wrong Results while getting results');
  });

  it('should be able to calculate TRIX for reversed input by using calculate method', function() {
    let myInput = Object.assign({}, input);
    myInput.reversedInput = true;
    myInput.values.reverse();
    assert.deepEqual(TRIX.calculate(myInput),  expectResult.slice().reverse(), 'Wrong Results while calculating next bar');
  });

})