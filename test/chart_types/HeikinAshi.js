/**
 * Created by AAravindan on 5/4/16.
 */
var HeikinAshi = require('../../lib/chart_types/HeikinAshi').HeikinAshi;
var assert = require('assert');

var data = {
    open : [58.67,57.46,56.37,55.98,54.79,52.21,51.31,51.82,51.58],
    high : [58.82,57.72,56.88,56.09,55.03,53.12,53.08,50.04,53.69],
    low :  [57.03,56.21,55.35,54.17,52.32,50.59,49.93,50.80,51.34],
    close: [57.73,56.27,56.81,54.17,53.83,50.59,53.03,50.86,53.10]
}

let expectedOutput = {
        "close": [
          58.0625,
          56.915,
          56.3525,
          55.102500000000006,
          53.9925,
          51.627500000000005,
          51.837500000000006,
          50.879999999999995,
          52.4275,
        ],
        "high": [
          58.82,
          58.13125,
          57.523125,
          56.9378125,
          56.02015625,
          55.006328124999996,
          53.316914062500004,
          52.577207031250005,
          53.69,
        ],
        "low": [
          57.03,
          56.21,
          55.35,
          54.17,
          52.32,
          50.59,
          49.93,
          50.8,
          51.34,
        ],
        "open": [
          58.2,
          58.13125,
          57.523125,
          56.9378125,
          56.02015625,
          55.006328124999996,
          53.316914062500004,
          52.577207031250005,
          51.728603515625,
        ],
        "timestamp": [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ],
        "volume": [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ]
      }

describe('HeikinAshi (Calculate Heikin ashi bars)', function() {
  let input = {};
  beforeEach(function(){
    input = JSON.parse(JSON.stringify(data));
  });

  it('should calculate HeikinAshi using the calculate method', function() {
    assert.deepEqual(HeikinAshi.calculate(input), expectedOutput,'Wrong Results');
  });

  it('should be able to get HeikinAshi for the next bar using nextValue', function() {
    input.values = [];
    var heikinAshi = new HeikinAshi(input);
    var result = heikinAshi.nextValue({
        open : 53.42,
        high: 53.90,
        low : 52.88,
        close : 53.57 
    });
    assert.deepEqual(result,  { timestamp : 0, volume: 0, open : 52.0780517578125, high : 53.90, low : 52.0780517578125, close : 53.4425}, 'Wrong Results');
  });
});