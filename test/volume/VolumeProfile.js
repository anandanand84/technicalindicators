
"use strict";
let assert = require('assert');
let VolumeProfile    = require('../../lib/volume/VolumeProfile').VolumeProfile;
let priceFallsBetweenBarRange    = require('../../lib/volume/VolumeProfile').priceFallsBetweenBarRange;

let input = {
  high      : [24.63,24.69,24.99,25.36,25.19,25.17,25.01,24.96,25.08,25.25,25.21,25.37,25.61,25.58,25.46,25.33,25.09,25.03,24.91,24.89,25.13],
  open       : [24.63,24.69,24.99,25.36,25.19,25.17,25.01,24.96,25.08,25.25,25.21,25.37,25.61,25.58,25.46,25.33,25.09,25.03,24.91,24.89,25.13],
  low       : [24.63,23.69,24.99,25.36,25.19,25.17,25.01,24.96,25.08,25.25,25.21,25.37,25.61,25.58,25.46,25.33,25.09,25.03,24.91,24.89,25.13],
  close     : [24.63,23.69,24.99,25.36,25.19,25.17,25.01,24.96,25.08,25.25,25.21,25.37,25.61,25.58,25.46,25.33,25.09,25.03,24.91,24.89,25.13],
  volume    : [18730,12272,24691,18358,22964,15919,16067,16568,16019,9774,22573,12987,10907,5799,7395,5818,7165,5673,5625,5023,7457],
  noOfBars  : 14
}

let expectResult = 
[
  {
    "bearishVolume": 12272,
    "bullishVolume": 0,
    "rangeEnd": 23.82714285714286,
    "rangeStart": 23.69,
    "totalVolume": 12272
  },
  {
    "bearishVolume": 12272,
    "bullishVolume": 0,
    "rangeEnd": 23.964285714285715,
    "rangeStart": 23.82714285714286,
    "totalVolume": 12272
  },
  {
    "bearishVolume": 12272,
    "bullishVolume": 0,
    "rangeEnd": 24.10142857142857,
    "rangeStart": 23.964285714285715,
    "totalVolume": 12272
  },
  {
    "bearishVolume": 12272,
    "bullishVolume": 0,
    "rangeEnd": 24.238571428571426,
    "rangeStart": 24.10142857142857,
    "totalVolume": 12272
  },
  {
    "bearishVolume": 12272,
    "bullishVolume": 0,
    "rangeEnd": 24.37571428571428,
    "rangeStart": 24.238571428571426,
    "totalVolume": 12272
  },
  {
    "bearishVolume": 12272,
    "bullishVolume": 0,
    "rangeEnd": 24.512857142857136,
    "rangeStart": 24.37571428571428,
    "totalVolume": 12272
  },
  {
    "bearishVolume": 12272,
    "bullishVolume": 18730,
    "rangeEnd": 24.64999999999999,
    "rangeStart": 24.512857142857136,
    "totalVolume": 31002
  },
  {
    "bearishVolume": 12272,
    "bullishVolume": 0,
    "rangeEnd": 24.787142857142847,
    "rangeStart": 24.64999999999999,
    "totalVolume": 12272
  },
  {
    "bearishVolume": 0,
    "bullishVolume": 10648,
    "rangeEnd": 24.924285714285702,
    "rangeStart": 24.787142857142847,
    "totalVolume": 10648
  },
  {
    "bearishVolume": 0,
    "bullishVolume": 62999,
    "rangeEnd": 25.061428571428557,
    "rangeStart": 24.924285714285702,
    "totalVolume": 62999
  },
  {
    "bearishVolume": 0,
    "bullishVolume": 69524,
    "rangeEnd": 25.198571428571412,
    "rangeStart": 25.061428571428557,
    "totalVolume": 69524
  },
  {
    "bearishVolume": 0,
    "bullishVolume": 38165,
    "rangeEnd": 25.335714285714268,
    "rangeStart": 25.198571428571412,
    "totalVolume": 38165
  },
  {
    "bearishVolume": 0,
    "bullishVolume": 38740,
    "rangeEnd": 25.472857142857123,
    "rangeStart": 25.335714285714268,
    "totalVolume": 38740
  },
  {
    "bearishVolume": 0,
    "bullishVolume": 5799,
    "rangeEnd": 25.609999999999978,
    "rangeStart": 25.472857142857123,
    "totalVolume": 5799
  }
]

describe('VolumeProfile', function() {

  it('Price falls between range should work for different range:', ()=> {
    assert.deepEqual(priceFallsBetweenBarRange(1,1,1,1), true);
    
    assert.deepEqual(priceFallsBetweenBarRange(1,1,2,2), false);
    assert.deepEqual(priceFallsBetweenBarRange(1,2,2,3), true);
    assert.deepEqual(priceFallsBetweenBarRange(1,2,1,2), true);
    assert.deepEqual(priceFallsBetweenBarRange(1,2,3,4), false);
    assert.deepEqual(priceFallsBetweenBarRange(2,3,1,4), true);
    
    assert.deepEqual(priceFallsBetweenBarRange(2,2,1,1), false);
    assert.deepEqual(priceFallsBetweenBarRange(2,3,1,2), true);
    assert.deepEqual(priceFallsBetweenBarRange(1,2,1,2), true);
    assert.deepEqual(priceFallsBetweenBarRange(3,4,1,2), false);
    assert.deepEqual(priceFallsBetweenBarRange(1,4,2,3), true);
  })

  it('should calculate VolumeProfile using the calculate method', function() {
    assert.deepEqual(VolumeProfile.calculate(input), expectResult, 'Wrong Results');
  });

  it('should be able to calculate VolumeProfile by using getResult', function() {
    let volumeprofile = new VolumeProfile(input);
    assert.deepEqual(volumeprofile.getResult(),  expectResult, 'Wrong Results while calculating next bar');
  });

})
