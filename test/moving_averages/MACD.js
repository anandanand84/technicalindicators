/**
 * Created by AAravindan on 5/4/16.
 */
var MACD = require('../../lib/moving_averages/MACD');
var assert = require('assert');

var data = {
  prices            : [127.75,129.02,132.75,145.40,148.98,137.52,147.38,139.05,137.23,149.30,162.45,178.95,200.35,221.90,243.23,243.52,286.42,280.27],
  fastPeriod        : 5,
  slowPeriod        : 8,
  signalPeriod      : 3 ,
  SimpleMAOscillator: false,
  SimpleMASignal    : false
}

var expectedOutput = [
  {
    "MACD": 1.52,
    "histogram": undefined,
    "signal": undefined
  },
  {
    "MACD": 0.88,
    "histogram": undefined,
    "signal": undefined
  },
  {
    "MACD": 1.82,
    "histogram": 0.41,
    "signal": 1.41
  },
  {
    "MACD": 3.63,
    "histogram": 1.11,
    "signal": 2.52
  },
  {
    "MACD": 6.14,
    "histogram": 1.81,
    "signal": 4.33
  },
  {
    "MACD": 9.35,
    "histogram": 2.51,
    "signal": 6.84
  },
  {
    "MACD": 12.73,
    "histogram": 2.95,
    "signal": 9.78
  },
  {
    "MACD": 15.9,
    "histogram": 3.06,
    "signal": 12.84
  },
  {
    "MACD": 16.41,
    "histogram": 1.78,
    "signal": 14.63
  },
  {
    "MACD": 20.22,
    "histogram": 2.8,
    "signal": 17.42
  },
  {
    "MACD": 20.01,
    "histogram": 1.29,
    "signal": 18.72
  }
];

var input;

describe('MACD', function() {

  beforeEach(function(){
    input = JSON.parse(JSON.stringify(data));
  });

  it('should calculate MACD using the calculate method', function() {
    assert.deepEqual(MACD.calculate(input), expectedOutput,'Wrong Results');
  });

  it('should be able to get EMA from the get results', function() {
    var macd = new MACD(input);
    assert.deepEqual(macd.getResult(), expectedOutput,'Wrong Results');
  });

  it('should be able to get MACD for the next bar using nextValue', function() {
    input.prices = [];
    var macd = new MACD(input);
    var results = [];
    data.prices.forEach(price => {
      var result = macd.nextValue(price);
      if(result)
        results.push(result)
    });
    assert.deepEqual(results,  expectedOutput, 'Wrong Results');

  });
});