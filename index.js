"use strict"
let SMA                        = require('./lib/moving_averages/SMA.js');
let EMA                        = require('./lib/moving_averages/EMA.js');
let WMA                        = require('./lib/moving_averages/WMA.js');
let WEMA                       = require('./lib/moving_averages/WEMA.js');
let MACD                       = require('./lib/moving_averages/MACD.js');
let RSI                        = require('./lib/oscillators/RSI.js');
let BollingerBands             = require('./lib/volatility/BollingerBands.js');
let ADX                        = require('./lib/directionalmovement/ADX.js');
let ATR                        = require('./lib/directionalmovement/ATR.js');
let ROC                        = require('./lib/momentum/ROC.js');
let KST                        = require('./lib/momentum/KST.js');
let Stochastic                 = require('./lib/momentum/Stochastic.js');
let WilliamsR                  = require('./lib/momentum/WilliamsR.js');
let ADL                        = require('./lib/volume/ADL.js');
let OBV                        = require('./lib/volume/OBV.js');
let TRIX                       = require('./lib/momentum/TRIX.js');

let AbandonedBaby              = require('./lib/candlestick/AbandonedBaby.js');
let Doji                       = require('./lib/candlestick/Doji.js');
let BearishEngulfingPattern    = require('./lib/candlestick/BearishEngulfingPattern.js');
let BullishEngulfingPattern    = require('./lib/candlestick/BullishEngulfingPattern.js');
let DarkCloudCover             = require('./lib/candlestick/DarkCloudCover.js');
let DownsideTasukiGap          = require('./lib/candlestick/DownsideTasukiGap.js');
let DragonFlyDoji              = require('./lib/candlestick/DragonFlyDoji');
let GraveStoneDoji             = require('./lib/candlestick/GraveStoneDoji');
let Harami                     = require('./lib/candlestick/Harami');
let HaramiCross                = require('./lib/candlestick/HaramiCross');
let EveningDojiStar            = require('./lib/candlestick/EveningDojiStar');
let EveningStar                = require('./lib/candlestick/EveningStar');
let MorningDojiStar            = require('./lib/candlestick/MorningDojiStar');
let MorningStar                = require('./lib/candlestick/MorningStar');
let Marubozu                   = require('./lib/candlestick/Marubozu');
let PiercingLine               = require('./lib/candlestick/PiercingLine');
let SpinningTop                = require('./lib/candlestick/SpinningTop');
let ThreeBlackCrows            = require('./lib/candlestick/ThreeBlackCrows');
let ThreeWhiteSoldiers         = require('./lib/candlestick/ThreeWhiteSoldiers');

let Indicators;

global.AvailableIndicators = [];

module.exports = Indicators = {
  SMA                          : SMA,
  EMA                          : EMA,
  MACD                         : MACD,
  RSI                          : RSI,
  WMA                          : WMA,
  BollingerBands               : BollingerBands,
  ATR                          : ATR,
  ADX                          : ADX,
  WEMA                         : WEMA,
  ROC                          : ROC,
  KST                          : KST,
  Stochastic                   : Stochastic,
  WilliamsR                    : WilliamsR,
  ADL                          : ADL,
  OBV                          : OBV,
  TRIX                         : TRIX,
  AbandonedBaby                : new AbandonedBaby(),
  Doji                         : new Doji(),
  BearishEngulfingPattern      : new BearishEngulfingPattern(),
  BullishEngulfingPattern      : new BullishEngulfingPattern(),
  DarkCloudCover               : new DarkCloudCover(),
  DownsideTasukiGap            : new DownsideTasukiGap(),
  DragonFlyDoji                : new DragonFlyDoji(),
  GraveStoneDoji               : new GraveStoneDoji(),
  Harami                       : new Harami(),
  HaramiCross                  : new HaramiCross(),
  EveningDojiStars             : new EveningDojiStars(),
  EveningStar                  : new EveningStar(),
  Marubozu                     : new Marubozu(),
  PiercingLine                 : new PiercingLine(),
  SpinningTop                  : new SpinningTop(),
  MorningStar                  : new MorningStar(),
  MorningDojiStar              : new MorningDojiStar(),
  ThreeBlackCrows              : new ThreeBlackCrows(),
  ThreeWhiteSoldiers           : new ThreeWhiteSoldiers(),

};

Object.assign(global, Indicators);

for(let indicator in Indicators){
  var indicatorName = indicator.toLowerCase();
  global.AvailableIndicators.push(indicator);
  let fn            = Indicators[indicator].calculate || Indicators[indicator].hasPattern
  global[indicatorName] = fn; 
};
