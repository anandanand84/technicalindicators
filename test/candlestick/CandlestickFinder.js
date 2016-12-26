var CandlestickFinder = require('../../lib/candlestick/CandlestickFinder');
var assert = require('assert');


var input = {
  open: [30.10,30.18,30.15,29.15,28.35,29.19,28.83,28.13,28.17,28.35,28.34],
  high: [30.20,30.28,30.45,29.35,29.35,29.29,28.83,28.73,28.67,28.85,28.64],
  low:  [29.41,29.32,29.96,28.74,28.56,28.41,28.08,27.43,27.66,27.83,27.40],
  close:[29.87,30.24,30.10,28.90,28.92,28.48,28.56,27.56,28.47,28.28,27.49],
}

var expectResult =  [
  {
    "open": [
      30.1,
      30.18,
      30.15
    ],
    "high": [
      30.2,
      30.28,
      30.45
    ],
    "low": [
      29.41,
      29.32,
      29.96
    ],
    "close": [
      29.87,
      30.24,
      30.1
    ]
  },
  {
    "open": [
      30.18,
      30.15,
      29.15
    ],
    "high": [
      30.28,
      30.45,
      29.35
    ],
    "low": [
      29.32,
      29.96,
      28.74
    ],
    "close": [
      30.24,
      30.1,
      28.9
    ]
  },
  {
    "open": [
      30.15,
      29.15,
      28.35
    ],
    "high": [
      30.45,
      29.35,
      29.35
    ],
    "low": [
      29.96,
      28.74,
      28.56
    ],
    "close": [
      30.1,
      28.9,
      28.92
    ]
  },
  {
    "open": [
      29.15,
      28.35,
      29.19
    ],
    "high": [
      29.35,
      29.35,
      29.29
    ],
    "low": [
      28.74,
      28.56,
      28.41
    ],
    "close": [
      28.9,
      28.92,
      28.48
    ]
  },
  {
    "open": [
      28.35,
      29.19,
      28.83
    ],
    "high": [
      29.35,
      29.29,
      28.83
    ],
    "low": [
      28.56,
      28.41,
      28.08
    ],
    "close": [
      28.92,
      28.48,
      28.56
    ]
  },
  {
    "open": [
      29.19,
      28.83,
      28.13
    ],
    "high": [
      29.29,
      28.83,
      28.73
    ],
    "low": [
      28.41,
      28.08,
      27.43
    ],
    "close": [
      28.48,
      28.56,
      27.56
    ]
  },
  {
    "open": [
      28.83,
      28.13,
      28.17
    ],
    "high": [
      28.83,
      28.73,
      28.67
    ],
    "low": [
      28.08,
      27.43,
      27.66
    ],
    "close": [
      28.56,
      27.56,
      28.47
    ]
  },
  {
    "open": [
      28.13,
      28.17,
      28.35
    ],
    "high": [
      28.73,
      28.67,
      28.85
    ],
    "low": [
      27.43,
      27.66,
      27.83
    ],
    "close": [
      27.56,
      28.47,
      28.28
    ]
  },
  {
    "open": [
      28.17,
      28.35,
      28.34
    ],
    "high": [
      28.67,
      28.85,
      28.64
    ],
    "low": [
      27.66,
      27.83,
      27.4
    ],
    "close": [
      28.47,
      28.28,
      27.49
    ]
  }
]

let singleLastData = {
    "open": [
      28.17,
      28.35,
      28.34
    ],
    "high": [
      28.67,
      28.85,
      28.64
    ],
    "low": [
      27.66,
      27.83,
      27.4
    ],
    "close": [
      28.47,
      28.28,
      27.49
    ]
  }

describe('Common candlestick utilities : ', function() {
  it('Generate candlestick should generate subset of data based on supplied data', function() {
   var results = CandlestickFinder.prototype._generateDataForCandleStick.call({ requiredCount : 3 }, input);
   assert.deepEqual(results.length, input.close.length - (3 -1), 'Wrong subset length of data while generating data for candlestick');
   assert.deepEqual(results, expectResult, 'Wrong subset of data while generating data for candlestick');
  })
  
  it('Generate candlestick should generate subset of data based on supplied data', function() {
   let results = CandlestickFinder.prototype._getLastDataForCandleStick.call({ requiredCount : 3 }, input);
   assert.deepEqual(results, expectResult[expectResult.length - 1], 'Wrong Results while getting last data for candlestick');
  })
  
  it('Generate candlestick should generate subset of data based on supplied data', function() {
   let results = CandlestickFinder.prototype._getLastDataForCandleStick.call({ requiredCount : 3 }, singleLastData);
   assert.deepEqual(results, expectResult[expectResult.length - 1], 'Wrong Results while getting single last data for candlestick');
  })
  
  it('Approximate Equal return true when value is less than 0.1 percent of difference', function() {
   var results = CandlestickFinder.prototype.approximateEqual.call(null ,1 , 1.001);
   assert.deepEqual(results, true, 'Approximate equal returns fals when true');
   var results = CandlestickFinder.prototype.approximateEqual.call(null ,10 , 10.01);
   assert.deepEqual(results, true, 'Approximate equal returns fals when true');
   var results = CandlestickFinder.prototype.approximateEqual.call(null ,100 , 100.1);
   assert.deepEqual(results, true, 'Approximate equal returns fals when true');
   var results = CandlestickFinder.prototype.approximateEqual.call(null ,1000 , 1001);
   assert.deepEqual(results, true, 'Approximate equal returns fals when true');
   var results = CandlestickFinder.prototype.approximateEqual.call(null ,10000 , 10010);
   assert.deepEqual(results, true, 'Approximate equal returns fals when true');
  })
})
