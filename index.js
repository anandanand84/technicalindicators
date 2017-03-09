"use strict"
let Indicators = require('./lib');
Object.keys(Indicators).forEach(function(indicator) {
  global[indicator] = Indicators[indicator];
})
module.exports = Indicators;
