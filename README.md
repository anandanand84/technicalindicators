[![Travis CI](https://img.shields.io/travis/anandanand84/technicalindicators.svg?style=flat-square)](https://travis-ci.org/anandanand84/technicalindicators)

# TechnicalIndicators

A javascript technical indicators written in javascript. 

# Installation

For nodejs install using npm

``` 
npm install --save technicalindicators
```

```
const SMA = require('technicalindicators').SMA;
```
For browser install using bower or npm, but it is necessary to include the babel-polyfill otherwise you will get an error.

```
npm install --save technicalindicators
npm install --save babel-polyfill
bower install --save technicalindicators
```
```
<script src="node_modules/babel-polyfill/browser.js"></script>
<script src="bower_components/technicalindicators/browser.js"></script>
```

All indicators will be available in window object. So you can just use

```
SMA.calculate({period : 5, values : [1,2,3,4,5,6,7,8,9]});
```
or

```
sma({period : 5, values : [1,2,3,4,5,6,7,8,9], reversedInput : true});
```

# Playground
  
  [Playground with code completion](https://anandanand84.github.io/ "Playground")

# Available Indicators

1. [Simple Moving Average (SMA)](https://tonicdev.com/anandaravindan/sma "SMA").
2. [Exponential Moving Average (EMA)](https://tonicdev.com/anandaravindan/ema "EMA").
3. [Weighted Moving Average (WMA)](https://tonicdev.com/anandaravindan/wma "WMA").
4. [Moving Average Convergence Divergence (MACD)](https://tonicdev.com/anandaravindan/macd "MACD").
5. [Bollinger Bands (BB)](https://tonicdev.com/anandaravindan/bb "BB").
6. [Average True Range (ATR)](https://tonicdev.com/anandaravindan/atr "ATR").
7. [Relative Strength Index (RSI)](https://tonicdev.com/anandaravindan/rsi "RSI").
8. [Wilder’s Smoothing (Smoothed Moving Average, WEMA)](https://tonicdev.com/anandaravindan/wema "WEMA").
9. [Rate of Change (ROC)](https://tonicdev.com/anandaravindan/roc "ROC").
10. [Know Sure Thing (KST)](https://tonicdev.com/anandaravindan/kst "KST").
11. [Stochastic Oscillator (KD)](https://tonicdev.com/anandaravindan/stochastic "KD").
12. [WilliamsR (W%R)](https://tonicdev.com/anandaravindan/williamsr "W%R").
13. [Accumulation Distribution Line (ADL)](https://tonicdev.com/anandaravindan/adl "ADL").
14. [On Balance Volume (OBV)](https://tonicdev.com/anandaravindan/obv "OBV").
15. [Triple Exponentially Smoothed Average (TRIX)](https://tonicdev.com/anandaravindan/trix "TRIX").
15. [Average Directional Index (ADX)](https://tonicdev.com/anandaravindan/adx "ADX").


# CandleStick Pattern
1. [Abandoned Baby](https://runkit.com/aarthiaradhana/abandonedbaby).
2. [Bearish Engulfing Pattern](https://runkit.com/aarthiaradhana/bearishengulfingpattern).
3. [Bullish Engulfiing Pattern](https://runkit.com/aarthiaradhana/bullishengulfingpattern).
4. [Dark Cloud Cover](https://runkit.com/aarthiaradhana/darkcloudcover).
5. [Downside Tasuki Gap](https://runkit.com/aarthiaradhana/downsidetasukigap).
6. [Doji](https://runkit.com/aarthiaradhana/doji).
7. [DragonFly Doji](https://runkit.com/aarthiaradhana/dragonflydoji).
8. [GraveStone Doji](https://runkit.com/aarthiaradhana/gravestonedoji).
9. [BullishHarami](https://runkit.com/aarthiaradhana/bullishharami).
10. [Bearish Harami Cross](https://runkit.com/aarthiaradhana/bearishharamicross).
11. [Bullish Harami Cross](https://runkit.com/aarthiaradhana/bullishharamicross).
12. [Bullish Marubozu](https://runkit.com/aarthiaradhana/bullishmarubozu).
13. [Bearish Marubozu](https://runkit.com/aarthiaradhana/bearishmarubozu).
14. [Evening Doji Star](https://runkit.com/aarthiaradhana/eveningdojistar).
15. [Evening Star](https://runkit.com/aarthiaradhana/eveningstar).
16. [Bearish Harami](https://runkit.com/aarthiaradhana/bearishharami).
17. [Piercing Line](https://runkit.com/aarthiaradhana/piercingline).
18. [Bullish Spinning Top](https://runkit.com/aarthiaradhana/bullishspinningtop).
19. [Bearish Spinning Top](https://runkit.com/aarthiaradhana/bearishspinningtop).
20. [Morning Doji Star](https://runkit.com/aarthiaradhana/morningdojistar).
21. [Morning Star](https://runkit.com/aarthiaradhana/morningstar).
22. [Three Black Crows](https://runkit.com/aarthiaradhana/threeblackcrows).
23. [Three White Soldiers](https://runkit.com/aarthiaradhana/threewhitesoldiers).

or 

Search for all bullish or bearish using


```js
var twoDayBullishInput = {
  open: [23.25,15.36],
  high: [25.10,30.87],
  close: [21.44,27.89],
  low: [20.82,14.93],
}

var Bullish = require('technicalindicators').Bullish;

Bullish.hasPattern(twoDayBullishInput) //true

```


# API

There are three ways you can use to get the indicator results.

## calculate 

Every indicator has a static method ```calculate``` which can be used to calculate the indicator without creating an object.

```javascript
const SMA = require('technicalindicators').SMA;
var prices = [1,2,3,4,5,6,7,8,9,10,12,13,15];
var period = 10;
SMA.calculate({period : period, values : prices})
```

## nextValue

```nextValue``` method is used to get the next indicator value.

```javascript
var sma = new SMA({period : period, values : []});
var results = [];
prices.forEach(price => {
  var result = sma.nextValue(price);
  if(result)
    results.push(result)
});
```

## getResult

This a merge of calculate and nextValue. The usual use case would be

1.Initialize indicator with available price value

2.Get results for initialized values 

3.Use nextValue to get next indicator values for further tick.
    
```javascript
var sma = new SMA({period : period, values : prices});
sma.getResult(); // [5.5, 6.6, 7.7, 8.9]
sma.nextValue(16); // 10.1
```

Note:  Calling nextValue will not update getResult() value. 

# Running tests and getting coverage

```
npm test
```

```
npm run cover
```
# Contribute

Create issues about anything you want to report, change of API's, or request for adding new indicators. You can also create pull request with new indicators.

## Adding new indicators.

1. Fork the project, clone it, run

```
npm install
```
```
gulp watch-test
```

2. Add tests for the indicator. Make it pass. It would be better if a sample of the stockcharts excel is used for the test case.
3. Add the indicator to the index.js
4. Run ```npm run build``` so it adds the indicator to the browser.js
5. Add it to read me, with the link to the tonicdev url containing the sample.
6. Add indicator it to keywords in package.json and bower.json
7. Send a pull request.


# Verify Documentation

```
node testdocs.js
```

```
http://localhost:5444/testdocs.html
```




