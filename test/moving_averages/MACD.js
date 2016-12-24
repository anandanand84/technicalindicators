/**
 * Created by AAravindan on 5/4/16.
 */
var MACD = require('../../lib/moving_averages/MACD');
var assert = require('assert');
var data   = require('../data');

var macdInput = {
  values            : data.close,
  fastPeriod        : 5,
  slowPeriod        : 8,
  signalPeriod      : 3 ,
  SimpleMAOscillator: false,
  SimpleMASignal    : false
}

var expectedOutput = [
  {
    "MACD": 1.508,
    "histogram": undefined,
    "signal": undefined
  },
  {
    "MACD": 0.8641,
    "histogram": undefined,
    "signal": undefined
  },
  {
    "MACD": 1.807,
    "histogram": 0.4144,
    "signal": 1.393
  },
  {
    "MACD": 3.624,
    "histogram": 1.115,
    "signal": 2.508
  },
  {
    "MACD": 6.130,
    "histogram": 1.811,
    "signal": 4.319
  },
  {
    "MACD": 9.354,
    "histogram": 2.517,
    "signal": 6.837
  },
  {
    "MACD": 12.73,
    "histogram": 2.945,
    "signal": 9.782
  },
  {
    "MACD": 15.9,
    "histogram": 3.061,
    "signal": 12.84
  },
  {
    "MACD": 16.40,
    "histogram": 1.781,
    "signal": 14.62
  },
  {
    "MACD": 20.22,
    "histogram": 2.796,
    "signal": 17.42
  },
  {
    "MACD": 20.01,
    "histogram": 1.296,
    "signal": 18.72
  }
];

var input;

describe('MACD (Moving Average Convergence Divergence)', function() {

  beforeEach(function(){
    input = JSON.parse(JSON.stringify(macdInput));
  });

  it('should calculate MACD using the calculate method', function() {
    assert.deepEqual(MACD.calculate(input), expectedOutput,'Wrong Results');
  });

  it('should be able to get EMA from the get results', function() {
    var macd = new MACD(input);
    assert.deepEqual(macd.getResult(), expectedOutput,'Wrong Results');
  });

  it('should be able to get MACD for the next bar using nextValue', function() {
    input.values = [];
    var macd = new MACD(input);
    var results = [];
    macdInput.values.forEach(price => {
      var result = macd.nextValue(price);
      if(result)
        results.push(result)
    });
    assert.deepEqual(results,  expectedOutput, 'Wrong Results');

  });
});