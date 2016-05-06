var RSI = require('../../lib/oscillators/RSI');
var assert = require("assert");
var data = require('../data');

var inputRSI = data.close;
var expectedResult = [
    86.39,
    86.41,
    89.65,
    86.47,
    84.93,
    80.52,
    77.50,
    58.00
];

describe('RSI (Relative Strength Index)', function () {
  it('should calculate RSI using the calculate method', function () {
    assert.deepEqual(RSI.calculate(inputRSI), expectedResult, 'Wrong Results');
  });

  it('should be able to get RSI for the next bar', function () {
    var rsi = new RSI(inputRSI);
    assert.deepEqual(rsi.getResult(), expectedResult, 'Wrong Results while getting results');
  })

  it('should be able to get RSI for the next bar using nextValue', function () {
    var rsi = new RSI(inputRSI);
    var results = [];
    inputRSI.forEach(price => {
      var result = rsi.nextValue(price);
      if (result) {
        results.push(result)
      }
    });
    assert.deepEqual(results, expectedResult, 'Wrong Results while getting results');
  })
})