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
    "lower": 124.1,
    "middle": 139.4,
    "upper": 154.7
  },
  {
    "lower": 124.4,
    "middle": 142.9,
    "upper": 161.4
  },
  {
    "lower": 121.7,
    "middle": 147.9,
    "upper": 174.1
  },
  {
    "lower": 115.8,
    "middle": 154.7,
    "upper": 193.5
  },
  {
    "lower": 107.1,
    "middle": 162.3,
    "upper": 217.6
  },
  {
    "lower": 99.32,
    "middle": 171.7,
    "upper": 244.2
  },
  {
    "lower": 102.4,
    "middle": 182.3,
    "upper": 262.3
  },
  {
    "lower": 98.98,
    "middle": 196.2,
    "upper": 293.5
  },
  {
    "lower": 109.5,
    "middle": 210.4,
    "upper": 311.2
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