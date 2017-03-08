/**
 * Created by AAravindan on 5/7/16.
 */
"use strict"
const assert = require('assert');
const WilliamsR     = require('../../lib/momentum/WilliamsR').WilliamsR

//let data = [4,2,5,8,6];
let high  = [127.0090,127.6159,126.5911,127.3472,128.1730,128.4317,127.3671,126.4220,126.8995,126.8498,125.6460,125.7156,127.1582,127.7154,127.6855,128.2228,128.2725,128.0934,128.2725,127.7353,128.7700,129.2873,130.0633,129.1182,129.2873,128.4715,128.0934,128.6506,129.1381,128.6406];
let low   = [125.3574,126.1633,124.9296,126.0937,126.8199,126.4817,126.0340,124.8301,126.3921,125.7156,124.5615,124.5715,125.0689,126.8597,126.6309,126.8001,126.7105,126.8001,126.1335,125.9245,126.9891,127.8148,128.4715,128.0641,127.6059,127.5960,126.9990,126.8995,127.4865,127.3970];
let close = [125.3574,126.1633,124.9296,126.0937,126.8199,126.4817,126.0340,124.8301,126.3921,125.7156,124.5615,124.5715,125.0689,127.2876,127.1781,128.0138,127.1085,127.7253,127.0587,127.3273,128.7103,127.8745,128.5809,128.6008,127.9342,128.1133,127.5960,127.5960,128.6904,128.2725];
let period = 14;
let expectResult=[-29.56178,-32.39109,-10.79789,-34.18945,-18.25229,-35.4762,-25.47022,-1.41856,-29.89547,-26.94391,-26.58221,-38.76871,-39.04373,-59.6139,-59.6139,-33.17145,-43.26858]
let input = {
  high: high,
  low: low,
  close: close,
  period: period,
};

describe('WilliamsR', function() {
  "use strict";
  it('should calculate WilliamsR using the calculate method', function() {
    assert.deepEqual(WilliamsR.calculate(input), expectResult, 'Wrong Results');
  });

  it('should be able to calculate williamsR by using getResult', function() {
    let williamsR = new WilliamsR(input);
    assert.deepEqual(williamsR.getResult(),  expectResult, 'Wrong Results while calculating next bar');
  });


  it('should be able to get williamsR for the next bar using nextValue', function() {
    let myInput = Object.assign({}, input);
    myInput.high = [];
    myInput.low  = [];
    myInput.close = [];
    let williamsR = new WilliamsR(myInput);
    let results = [];
    input.high.forEach((price,index) => {
      let result = williamsR.nextValue({
        high : input.high[index],
        low  : input.low[index],
        close: input.close[index]
      });
      if(result)
        results.push(result)
    });
    assert.deepEqual(results, expectResult, 'Wrong Results while getting results');
  })

  it('should be able to calculate williamsR for reversed input by using calculate method', function() {
    let myInput = Object.assign({}, input);
    myInput.reversedInput = true;
    myInput.high.reverse();
    myInput.low.reverse();
    myInput.close.reverse();
    assert.deepEqual(WilliamsR.calculate(myInput),  expectResult.slice().reverse(), 'Wrong Results while calculating next bar');
  });
});