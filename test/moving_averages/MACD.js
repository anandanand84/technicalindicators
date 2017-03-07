/**
 * Created by AAravindan on 5/4/16.
 */
var MACD = require('../../lib/moving_averages/MACD').MACD;
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
    "MACD": 1.5206,
    "histogram": undefined,
    "signal": undefined
  },
  {
    "MACD": 0.87471,
    "histogram": undefined,
    "signal": undefined
  },
  {
    "MACD": 1.81612,
    "histogram": 0.41231,
    "signal": 1.40381
  },
  {
    "MACD": 3.63084,
    "histogram": 1.11351,
    "signal": 2.51732
  },
  {
    "MACD": 6.13619,
    "histogram": 1.80943,
    "signal": 4.32676
  },
  {
    "MACD": 9.3585,
    "histogram": 2.51587,
    "signal": 6.84263
  },
  {
    "MACD": 12.73056,
    "histogram": 2.94396,
    "signal": 9.78659
  },
  {
    "MACD": 15.90602,
    "histogram": 3.05972,
    "signal": 12.84631
  },
  {
    "MACD": 16.40656,
    "histogram": 1.78013,
    "signal": 14.62643
  },
  {
    "MACD": 20.21746,
    "histogram": 2.79551,
    "signal": 17.42195
  },
  {
    "MACD": 20.01256,
    "histogram": 1.29531,
    "signal": 18.71726
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