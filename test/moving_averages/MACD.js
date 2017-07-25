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
           "MACD": 1.5206018518518647,
           "histogram": undefined,
           "signal": undefined
         },
         {
           "MACD": 0.8747067901234686,
           "histogram": undefined,
           "signal": undefined
         },
         {
            "MACD": 1.8161162551440384,
            "histogram": 0.41230795610424775,
            "signal": 1.4038082990397907,
         },
         {
            "MACD": 3.630838477366268,
            "histogram": 1.113515089163239,
            "signal": 2.517323388203029,
         },
         {
            "MACD": 6.1361878905654805,
            "histogram": 1.8094322511812262,
            "signal": 4.326755639384254,
         },
         {
            "MACD": 9.35850329810836,
            "histogram": 2.515873829362053,
            "signal": 6.842629468746307,
         },
         {
            "MACD": 12.730555487344787,
            "histogram": 2.9439630092992406,
            "signal": 9.786592478045547,
         },
         {
            "MACD": 15.906022882701109,
            "histogram": 3.05971520232778,
            "signal": 12.846307680373329,
         },
         {
            "MACD": 16.40655983713023,
            "histogram": 1.7801260783784514,
            "signal": 14.62643375875178,
         },
         {
            "MACD": 20.217463455194945,
            "histogram": 2.7955148482215826,
            "signal": 17.421948606973363,
         },
         {
            "MACD": 20.012564334547392,
            "histogram": 1.2953078637870163,
            "signal": 18.717256470760375,
         },
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