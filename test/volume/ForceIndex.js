"use strict"
var ForceIndex = require('../../lib/volume/ForceIndex').ForceIndex;
var assert = require("assert");

var inputForceIndex = {
  open : [

  ],
  high : [
  ],
  low : [
  ],
  close : [
      14.33,14.23,13.98,13.96,13.93,13.84,13.99,14.31,14.51,14.46,14.61,14.48,14.53,14.56,14.25,14.42
  ],
  volume : [
      0,45579,66285,51761,69341,41631,73499,55427,61082,33325,39191,51128,46505,44562,48815,33411
  ],
  period : 1
};
var expectedResult = [
    -4558,-16571,-1035,-2080,-3747,11025,17737,12216,-1666,5879,-6647,2325,1337,-15133,5680
];




describe('ForceIndex (Force Index', function () {
  it('should calculate ForceIndex using the calculate method', function () {
    assert.deepEqual(ForceIndex.calculate(inputForceIndex).map(Math.round), expectedResult, 'Wrong Results');
  });

  it('should be able to get ForceIndex for the next bar', function () {
    var forceIndex = new ForceIndex(inputForceIndex);
    assert.deepEqual(forceIndex.getResult().map(Math.round), expectedResult, 'Wrong Results while getting results');
  })

  it('should be able to get ForceIndex for the next bar using nextValue', function () {
    var forceIndex = new ForceIndex({
      open : [],
      high : [],
      low : [],
      close : [],
      volume : []
    });

    var results = [];

    inputForceIndex.close.forEach((price,index) => {
      var result = forceIndex.nextValue({
          open : inputForceIndex.open[index],
          high : inputForceIndex.high[index],
          low : inputForceIndex.low[index],
          close : inputForceIndex.close[index],
          volume : inputForceIndex.volume[index]
      });
      if (result != undefined) {
        results.push(result)
      }
    });
    assert.deepEqual(results.map(Math.round), expectedResult, 'Wrong Results while getting results');
  })
})