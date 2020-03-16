export * from './lib/index.js';
export function getAvailableIndicators () {
  let AvailableIndicators   = []
  AvailableIndicators.push('sma');
  AvailableIndicators.push('ema');
  AvailableIndicators.push('wma');
  AvailableIndicators.push('wema');
  AvailableIndicators.push('macd');
  AvailableIndicators.push('rsi');
  AvailableIndicators.push('bollingerbands');
  AvailableIndicators.push('adx');
  AvailableIndicators.push('atr');
  AvailableIndicators.push('truerange');
  AvailableIndicators.push('roc');
  AvailableIndicators.push('kst');
  AvailableIndicators.push('psar');
  AvailableIndicators.push('stochastic');
  AvailableIndicators.push('williamsr');
  AvailableIndicators.push('adl');
  AvailableIndicators.push('obv');
  AvailableIndicators.push('trix');

  AvailableIndicators.push('cci');
  AvailableIndicators.push('awesomeoscillator');
  AvailableIndicators.push('forceindex');
  AvailableIndicators.push('vwap');
  AvailableIndicators.push('volumeprofile');
  AvailableIndicators.push('renko');
  AvailableIndicators.push('heikinashi');

  AvailableIndicators.push('stochasticrsi');
  AvailableIndicators.push('mfi');

  AvailableIndicators.push('averagegain');
  AvailableIndicators.push('averageloss');
  AvailableIndicators.push('highest');
  AvailableIndicators.push('lowest');
  AvailableIndicators.push('sum');
  AvailableIndicators.push('FixedSizeLinkedList');
  AvailableIndicators.push('sd');
  AvailableIndicators.push('bullish');
  AvailableIndicators.push('bearish');
  AvailableIndicators.push('abandonedbaby');
  AvailableIndicators.push('doji');
  AvailableIndicators.push('bearishengulfingpattern');
  AvailableIndicators.push('bullishengulfingpattern');
  AvailableIndicators.push('darkcloudcover');
  AvailableIndicators.push('downsidetasukigap');
  AvailableIndicators.push('dragonflydoji');
  AvailableIndicators.push('gravestonedoji');
  AvailableIndicators.push('bullishharami');
  AvailableIndicators.push('bearishharami');
  AvailableIndicators.push('bullishharamicross');
  AvailableIndicators.push('bearishharamicross');
  AvailableIndicators.push('eveningdojistar');
  AvailableIndicators.push('eveningstar');
  AvailableIndicators.push('morningdojistar');
  AvailableIndicators.push('morningstar');
  AvailableIndicators.push('bullishmarubozu');
  AvailableIndicators.push('bearishmarubozu');
  AvailableIndicators.push('piercingline');
  AvailableIndicators.push('bullishspinningtop');
  AvailableIndicators.push('bearishspinningtop');
  AvailableIndicators.push('threeblackcrows');
  AvailableIndicators.push('threewhitesoldiers');
  AvailableIndicators.push('bullishhammerstick');
  AvailableIndicators.push('bearishhammerstick');
  AvailableIndicators.push('bullishinvertedhammerstick');
  AvailableIndicators.push('bearishinvertedhammerstick');
  AvailableIndicators.push('hammerpattern');
  AvailableIndicators.push('hammerpatternunconfirmed');
  AvailableIndicators.push('hangingman');
  AvailableIndicators.push('hangingmanunconfirmed');
  AvailableIndicators.push('shootingstar');
  AvailableIndicators.push('shootingstarunconfirmed');
  AvailableIndicators.push('tweezertop');
  AvailableIndicators.push('tweezerbottom');

  // AvailableIndicators.push('predictPattern');
  // AvailableIndicators.push('hasDoubleBottom');
  // AvailableIndicators.push('hasDoubleTop');
  // AvailableIndicators.push('hasHeadAndShoulder');
  // AvailableIndicators.push('hasInverseHeadAndShoulder');
  // AvailableIndicators.push('isTrendingUp');
  // AvailableIndicators.push('isTrendingDown');
  AvailableIndicators.push('ichimokucloud');
  
  AvailableIndicators.push('keltnerchannels');
  AvailableIndicators.push('chandelierexit');
  AvailableIndicators.push('crossup');
  AvailableIndicators.push('crossdown');
  AvailableIndicators.push('crossover');
  return AvailableIndicators;
};

let AvailableIndicators = getAvailableIndicators();
export { AvailableIndicators }
