/**
 * Created by AAravindan on 5/7/16.
 */
const assert = require('assert');
const KST     = require('../../lib/momentum/KST')

var close = [1344.78,1357.98,1355.69,1325.51,1335.02,1313.72,1319.99,1331.85,1329.04,1362.16,1365.51,1374.02,1367.58,1354.68,1352.46,1341.47,1341.45,1334.76,1356.78,1353.64,1363.67,1372.78,1376.51,1362.66,1350.52,1338.31,1337.89,1360.02,1385.97,1385.30,1379.32,1375.32,1365.00,1390.99,1394.23,1401.35,1402.22,1402.80,1405.87,1404.11,1403.93,1405.53,1415.51,1418.16,1418.13,1413.17,1413.49,1402.08,1411.13,1410.44];
var input = {
  values      : close,
  ROCPer1     : 10,
  ROCPer2     : 15,
  ROCPer3     : 20,
  ROCPer4     : 30,
  SMAROCPer1  : 10,
  SMAROCPer2  : 10,
  SMAROCPer3  : 10,
  SMAROCPer4  : 15,
  signalPeriod: 3
};

  var expectResult = [{
    kst: 36.59,
    signal: undefined
  },
  {
    kst: 37.23,
    signal: undefined
  },
  {
    kst: 38.36,
    signal: 37.39
  },
  {
    kst: 38.76,
    signal: 38.12
  },
  {
    kst: 37.54,
    signal: 38.22
  },
  {
    kst: 36.23,
    signal: 37.51
  }
];

describe('Know Sure Thing', function() {
  "use strict";
  it('should calculate KST using the calculate method', function() {
    assert.deepEqual(KST.calculate(input), expectResult, 'Wrong Results');
  });

  it('should be able to calculate KST by using getResult', function() {
    var roc = new KST(input);
    assert.deepEqual(roc.getResult(),  expectResult, 'Wrong Results while calculating next bar');
  });

  it('should be able to get KST for the next bar using nextValue', function() {
    var rocInput = Object.assign({}, input);
    rocInput.values = [];
    var roc = new KST(rocInput);
    var results = [];
    input.values.forEach(price => {
      var result = roc.nextValue(price);
      if(result)
        results.push(result)
    });
    assert.deepEqual(results, expectResult, 'Wrong Results while getting results');
  })
})