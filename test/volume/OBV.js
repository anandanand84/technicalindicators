/**
 * Created by AAravindan on 5/17/16.
 */
/**
 * Created by AAravindan on 5/8/16.
 */
"use strict";
let assert = require('assert');
let OBV    = require('../../lib/volume/OBV').OBV;

let input = {
  close : [53.26,53.30,53.32,53.72,54.19,53.92,54.65,54.60,54.21,54.53,53.79,53.66,53.56,53.57,53.94,53.27],
  volume : [88888,8200,8100,8300,8900,9200,13300,10300,9900,10100,11300,12600,10700,11500,23800,14600]
}

let expectResult = [8200,16300,24600,33500,24300,37600,27300,17400,27500,16200,3600,-7100,4400,28200,13600]

describe('OBV (Accumulation Distribution line)', function() {
  it('should calculate OBV using the calculate method', function() {
    assert.deepEqual(OBV.calculate(input), expectResult, 'Wrong Results');
  });

  it('should be able to calculate OBV by using getResult', function() {
    let obv = new OBV(input);
    assert.deepEqual(obv.getResult(),  expectResult, 'Wrong Results while calculating next bar');
  });

  it('should be able to get OBV for the next bar using nextValue', function() {
    let obv = new OBV({volume:[], close:[]});
    let results = [];
    input.close.forEach(function(close,index) {
      let result = obv.nextValue({
        close: input.close[index],
        volume: input.volume[index]
      });
      if(result !== undefined){
        results.push(parseFloat(result.toFixed(2)));
      }
    });
    assert.deepEqual(results, expectResult, 'Wrong Results while getting results');
  })

  it('should be able to calculate OBV for reversed input by using calculate method', function() {
    let myInput = Object.assign({}, input);
    myInput.reversedInput = true;
    myInput.close.reverse();
    myInput.volume.reverse();
    assert.deepEqual(OBV.calculate(myInput),  expectResult.slice().reverse(), 'Wrong Results while calculating next bar');
  });

})