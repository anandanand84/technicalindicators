// "use strict"
// var StochasticRSI = require('../../lib/momentum/StochasticRSI').StochasticRSI;
// var AverageGain = require('../../lib/Utils/AverageGain').AverageGain;
// var AverageLoss = require('../../lib/Utils/AverageLoss').AverageLoss;
// var assert = require("assert");
// var data = require('../data');

// var inputStochasticRSI = {
//   values : [44.34,44.09,44.15,43.61,44.33,44.83,45.10,45.42,45.84,46.08,45.89,46.03,45.61,46.28,46.28,46.00,46.03,46.41,46.22,45.64,46.21,46.25,45.71,46.45,45.78,45.35,44.03,44.18,44.22,44.57,43.42,42.66,43.13],
//   rsiPeriod : 14,
//   stochasticPeriod : 14,
//   kPeriod : 3,
//   dPeriod : 3,
// };
// var expectedResult = [
//   70.46,
//   66.25,
//   66.48,
//   69.35,
//   66.29,
//   57.92,
//   62.88,
//   63.21,
//   56.01,
//   62.34,
//   54.67,
//   50.39,
//   40.02,
//   41.49,
//   41.90,
//   45.50,
//   37.32,
//   33.09,
//   37.79
// ];

// describe('StochasticRSI', function () {
//   it('should calculate StochasticRSI using the calculate method', function () {
//     assert.deepEqual(StochasticRSI.calculate(inputStochasticRSI), expectedResult, 'Wrong Results');
//   });
// })