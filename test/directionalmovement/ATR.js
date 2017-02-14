/**
 * Created by AAravindan on 5/8/16.
 */
var assert = require('assert');
var ATR    = require('../../lib/directionalmovement/ATR');

var period = 14

var input = {
  high : [48.70,48.72,48.90,48.87,48.82,49.05,49.20,49.35,49.92,50.19,50.12,49.66,49.88,50.19,50.36,50.57,50.65,50.43,49.63,50.33,50.29,50.17,49.32,48.50,48.32,46.80,47.80,48.39,48.66,48.79],
  low  : [47.79,48.14,48.39,48.37,48.24,48.64,48.94,48.86,49.50,49.87,49.20,48.90,49.43,49.73,49.26,50.09,50.30,49.21,48.98,49.61,49.20,49.43,48.08,47.64,41.55,44.28,47.31,47.20,47.90,47.73],
  close : [48.16,48.61,48.75,48.63,48.74,49.03,49.07,49.32,49.91,50.13,49.53,49.50,49.75,50.03,50.31,50.52,50.41,49.34,49.37,50.23,49.24,49.93,48.43,48.18,46.57,45.41,47.77,47.72,48.62,47.85],
  period : period
}

      
var expectResult =  [
      0.55429,
      0.59327,
      0.58517,
      0.56838,
      0.61492,
      0.61743,
      0.6419,
      0.6739,
      0.6922,
      0.7749,
      0.78098,
      1.20876,
      1.30242,
      1.38011,
      1.36653,
      1.33606,
      1.31634
   ]


var expectResultNextBar = [
  0.5543,
  0.5933,
  0.5852,
  0.5684,
  0.6149,
  0.6174,
  0.6419,
  0.6739,
  0.6922,
  0.7749,
  0.781,
  1.209,
  1.302,
  1.38,
  1.367,
  1.336,
  1.316,
];


var expected =   [
    0.55429,
    0.59327,
    0.58517,
    0.56838,
    0.61492,
    0.61743,
    0.6419,
    0.6739,
    0.6922,
    0.7749,
    0.78098,
    1.20876,
    1.30242,
    1.38011,
    1.36653,
    1.33606,
    1.31634
  ];

describe('ATR (Average True Range)', function() {
  it('should calculate ATR using the calculate method', function() {
    assert.deepEqual(ATR.calculate(input), expectResult, 'Wrong Results');
  });

  it('should be able to caÎlculate ATR by using getResult', function() {
    var atr = new ATR(input);
    assert.deepEqual(atr.getResult(),  expected, 'Wrong Results while calculating next bar');
  });



  it('should be able to get ATR for the next bar using nextValue', function() {
    var atr = new ATR({period : period, high : [], low:[], close:[]});
    var results = [];
    input.close.forEach(function(close,index) {
      var result = atr.nextValue({
        close: input.close[index],
        high: input.high[index],
        low: input.low[index]
      });
      if(result !== undefined){
        results.push(parseFloat(result.toPrecision(4)));
      }
    });
    assert.deepEqual(results, expectResultNextBar, 'Wrong Results while getting results');
  })

})