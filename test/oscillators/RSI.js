var RSI = require('../../lib/oscillators/RSI');
var assert = require("assert");
var data = require('../data');

var inputRSI = {
  values : data.close.concat([277.35,269.02,263.23,214.90]),
  period : 14
};
var expectedResult = [
    86.41,86.43,89.65,86.50,84.96,80.54,77.56,58.06
  //86.39,86.41,89.65,86.47,84.93,80.52,77.50,58.00
];



//var inputRSI = {
//  values : [45.8433,46.0826,45.8931,46.0328,45.6140,46.2820,46.2820,46.0028,46.0328,46.4116,46.2222,45.6439, 46.2122,46.2521,45.7137,46.4515,45.7835,45.3548,44.0288,44.1783,44.2181,44.5672,43.4205,42.6628,43.1314],
//  period : 14
//};
//var expectedResult = [
//  70.53,66.32,66.55,69.41,66.36,57.97,62.93,63.26,56.06,62.38
//];

describe('RSI (Relative Strength Index)', function () {
  it('should calculate RSI using the calculate method', function () {
    assert.deepEqual(RSI.calculate(inputRSI), expectedResult, 'Wrong Results');
  });

  it('should be able to get RSI for the next bar', function () {
    var rsi = new RSI(inputRSI);
    assert.deepEqual(rsi.getResult(), expectedResult, 'Wrong Results while getting results');
  })

  it('should be able to get RSI for the next bar using nextValue', function () {
    var rsi = new RSI({
      values : [],
      period : 14
    });
    var results = [];
    inputRSI.values.forEach(price => {
      var result = rsi.nextValue(price);
      if (result) {
        results.push(result)
      }
    });
    assert.deepEqual(results, expectedResult, 'Wrong Results while getting results');
  })
})