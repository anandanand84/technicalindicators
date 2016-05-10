/**
 * Created by AAravindan on 5/3/16.
 */
"use strict"
var BB = require('../../lib/volatility/BollingerBands');
var assert = require('assert');
var data   = require('../data')

var prices = data.close;

var period = 10;

var stdDev = 2;
var expectResult =  [
   {
     "lower": 124.14,
    "middle": 139.44,
    "upper": 154.74,
  },
  {
    "lower": 124.39,
    "middle": 142.91,
    "upper": 161.43,
  },
  {
    "lower": 121.7,
    "middle": 147.9,
    "upper": 174.1,
  },
  {
    "lower": 115.78,
    "middle": 154.66,
    "upper": 193.54,
  },
  {
    "lower": 107.07,
    "middle": 162.31,
    "upper": 217.55,
  },
  {
    "lower": 99.32000000000001,
    "middle": 171.74,
    "upper": 244.16000000000003,
  },
  {
    "lower": 102.42,
    "middle": 182.34,
    "upper": 262.26,
  },
  {
    "lower": 98.98,
    "middle": 196.24,
    "upper": 293.5,
  },
  {
    "lower": 109.48000000000002,
    "middle": 210.36,
    "upper": 311.24,
  }
]


describe('BB (Bollinger Bands)', function() {
    it('should calculate BB using the calculate method', function() {
        assert.deepEqual(BB.calculate({period : period, values : prices ,stdDev : stdDev}), expectResult, 'Wrong Results');
    });

    it('should be able to calculate BB for reversed input by using calculate method', function() {
      let myInput = Object.assign({}, {
        period : period,
        values : prices,
        stdDev : stdDev
      });
      myInput.reversedInput = true;
      myInput.values.reverse();
      assert.deepEqual(BB.calculate(myInput),  expectResult.slice().reverse(), 'Wrong Results while calculating next bar');
    });

    it('should be able to calculate BB by using getResult', function() {
        var bb = new BB({period : period, values : prices,stdDev : stdDev});
        assert.deepEqual(bb.getResult(),  expectResult, 'Wrong Results while calculating next bar');
    });

    it('should be able to get BB for the next bar using nextValue', function() {
        var bb = new BB({period : period, values : [],stdDev : stdDev});
        var results = [];
        prices.forEach(price => {
            var result = bb.nextValue(price);
            if(result)
                results.push(result)
        });
        assert.deepEqual(results, expectResult, 'Wrong Results while getting results');
    })

})