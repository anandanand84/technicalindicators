/**
 * Created by AAravindan on 5/7/16.
 */
"use strict"
const assert = require('assert');
const Stochastic     = require('../../lib/momentum/Stochastic')

//let data = [4,2,5,8,6];
let high  = [127.009,127.616,126.591,127.347,128.173,128.432,127.367,126.422,126.900,126.850,125.646,125.716,127.158,127.715,127.686,128.223,128.273,128.093,128.273,127.735,128.770,129.287,130.063,129.118,129.287,128.472,128.093,128.651,129.138,128.641];
let low   = [125.357,126.163,124.930,126.094,126.820,126.482,126.034,124.830,126.392,125.716,124.562,124.572,125.069,126.860,126.631,126.800,126.711,126.800,126.134,125.925,126.989,127.815,128.472,128.064,127.606,127.596,126.999,126.900,127.487,127.397];
let close = [125.357,126.163,124.930,126.094,126.820,126.482,126.034,124.830,126.392,125.716,124.562,124.572,125.069,127.288,127.178,128.014,127.109,127.725,127.059,127.327,128.710,127.875,128.581,128.601,127.934,128.113,127.596,127.596,128.690,128.273];
let period = 14;
let signalPeriod = 3;
let expectResult = [{
  "d": undefined,
  "k": 70.43928
},
{
  "d": undefined,
  "k": 67.5969
},
{
  "d": 75.74505,
  "k": 89.19897
},
{
  "d": 74.20327,
  "k": 65.81395
},
{
  "d": 78.91473,
  "k": 81.73127
},
{
  "d": 70.68906,
  "k": 64.52196
},
{
  "d": 73.58715,
  "k": 74.50822
},
{
  "d": 79.20144,
  "k": 98.57414
},
{
  "d": 81.06626,
  "k": 70.1164
},
{
  "d": 80.58333,
  "k": 73.05944
},
{
  "d": 72.19962,
  "k": 73.42301
},
{
  "d": 69.23664,
  "k": 61.22746
},
{
  "d": 65.20121,
  "k": 60.95314
},
{
  "d": 54.18748,
  "k": 40.38183
},
{
  "d": 47.23893,
  "k": 40.38183
},
{
  "d": 49.19446,
  "k": 66.81972
},
{
  "d": 54.64798,
  "k": 56.74239
}
]
let input = {
  high: high,
  low: low,
  close: close,
  period: period,
  signalPeriod: signalPeriod
};

describe('Stochastic', function() {
  "use strict";
  it('should calculate Stochastic using the calculate method', function() {
    assert.deepEqual(Stochastic.calculate(input), expectResult, 'Wrong Results');
  });

  it('should be able to calculate Stochastic for reversed input by using calculate method', function() {
    let myInput = Object.assign({}, input);
    myInput.reversedInput = true;
    myInput.high.reverse();
    myInput.low.reverse();
    myInput.close.reverse();
    assert.deepEqual(Stochastic.calculate(myInput),  expectResult.slice().reverse(), 'Wrong Results while calculating next bar');
  });

  it('should be able to calculate Stochastic by using getResult', function() {
    let stochastic = new Stochastic(input);
    assert.deepEqual(stochastic.getResult(),  expectResult, 'Wrong Results while calculating next bar');
  });


  it('should be able to get Stochastic for the next bar using nextValue', function() {
    let myInput = Object.assign({}, input);
    myInput.high = [];
    myInput.low  = [];
    myInput.close = [];
    let stochastic = new Stochastic(myInput);
    let results = [];
    input.high.forEach((price,index) => {
      let result = stochastic.nextValue({
        high : input.high[index],
        low  : input.low[index],
        close: input.close[index]
      });
      if(result)
        results.push(result)
    });
    assert.deepEqual(results, expectResult, 'Wrong Results while getting results');
  })
})