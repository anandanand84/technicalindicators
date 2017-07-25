// /**
//  * Created by AAravindan on 5/3/16.
//  */
// var WEMA = require('../../lib/moving_averages/WEMA').WEMA;
// var assert = require('assert');
// var data   = require('../data');

// var prices = [
// 0.959399999999999,
// 0.4847,
// 1.3553,
// 0.7911,
// 0.880499999999998,
// 0.7516,
// 1.3057,
// 1.1078,
// 1.0187,
// 1.2364,
// 0.583400000000001,
// 1.0484,
// 0.731900000000003,
// 1.0781,
// 0.900100000000002,
// 1.0882,
// 1.1671,
// 1.6322,
// 0.722000000000001
// ];
// var expectedResult = [
//   13.33,
//   13.28,
//   13.42,
//   13.63,
//   14.29,
//   13.99
// ];
// var period = 9;

// describe('WEMA (Weighted Moving Average)', function() {
//   it('should calculate WEMA using the calculate method', function() {
//     assert.deepEqual(WEMA.calculate({
//       period : period,
//       values : prices
//     }), expectedResult, 'Wrong Results');
//   });

//   it('should be able to get WEMA for the next bar', function() {
//     var WEMA = new WEMA({
//       period : period,
//       values : prices
//     });
//     assert.deepEqual(WEMA.getResult(),  expectedResult, 'Wrong Results while getting results');
//   })

//   it('should be able to get WEMA for the next bar using nextValue', function() {
//     var WEMA = new WEMA({
//       period : period,
//       values : []
//     });
//     var results = [];
//     prices.forEach(price => {
//       var result = WEMA.nextValue(price);
//       if(result)
//         results.push(result)
//     });
//     assert.deepEqual(results,  expectedResult, 'Wrong Results while getting results');
//   })
// })
