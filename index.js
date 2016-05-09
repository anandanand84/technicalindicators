"use strict"
let SMA             = require('./lib/moving_averages/SMA.js');
let EMA             = require('./lib/moving_averages/EMA.js');
let WMA             = require('./lib/moving_averages/WMA.js');
let MACD            = require('./lib/moving_averages/MACD.js');
let RSI             = require('./lib/oscillators/RSI.js');
let BollingerBands  = require('./lib/volatility/BollingerBands.js');
let ADX             = require('./lib/directionalmovement/ADX.js');
let ATR             = require('./lib/directionalmovement/ATR.js');

module.exports = {
  SMA             : SMA,
  EMA             : EMA,
  MACD            : MACD,
  RSI             : RSI,
  WMA             : WMA,
  BollingerBands  : BollingerBands,
  ATR             : ATR,
  ADX             : ADX
};
