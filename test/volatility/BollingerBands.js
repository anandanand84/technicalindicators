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
    "lower": 124.13431,
    "middle": 139.438,
    "upper": 154.74169,
    "pb": 0.82221
  },
  {
    "lower": 124.3819,
    "middle": 142.908,
    "upper": 161.4341,
    "pb": 1.02742
  },
  {
    "lower": 121.71024,
    "middle": 147.901,
    "upper": 174.09176,
    "pb": 1.09275
  },
  {
    "lower": 115.78037,
    "middle": 154.661,
    "upper": 193.54163,
    "pb": 1.08755
  },
  {
    "lower": 107.06844,
    "middle": 162.311,
    "upper": 217.55356,
    "pb": 1.03934
  },
  {
    "lower": 99.31718,
    "middle": 171.736,
    "upper": 244.15482,
    "pb": 0.99361
  },
  {
    "lower": 102.41148,
    "middle": 182.336,
    "upper": 262.26052,
    "pb": 0.88276
  },
  {
    "lower": 98.98124,
    "middle": 196.24,
    "upper": 293.49876,
    "pb": 0.96361
  },
  {
    "lower": 109.47751,
    "middle": 210.362,
    "upper": 311.24649,
    "pb": 0.84648
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
