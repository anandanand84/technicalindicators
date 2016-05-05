# TechnicalIndicators

A javascript technical indicators written in javascript. 

# Not Ready Yet

This project is still under development. Do not use it for production or any serious project, API's may change in future.
 
# Installation

For nodejs install using npm

``` 
npm install --save technicalindicators
```
For browser install using bower

```
bower install --save technicalindicators
```

# API

There are three ways you can use to get the indicator results.

##calculate 

Every indicator has a static method ```calculate``` which can be used to calculate the indicator without creating an object.

```javascript
const SMA = require('technicalindicators').SMA;
var prices = [1,2,3,4,5,6,7,8,9,10,12,13,15];
var period = 10;
SMA.calculate(period, prices)
```

##nextValue

```nextValue``` method is used to get the next indicator value.

```javascript
var sma = new SMA(period, []);
var results = [];
prices.forEach(price => {
  var result = sma.nextValue(price);
  if(result)
    results.push(result)
});
```

##getResult

This a merge of calculate and nextValue. The usual use case would be

1.Initialize indicator with available price value

2.Get results for initialized values 

3.Use nextValue to get next indicator values for further tick.
    
```javascript
var sma = new SMA(period, prices);
sma.getResult(); // [5.5, 6.6, 7.7, 8.9]
sma.nextValue(16); // 10.1
```

Note:  Calling nextValue will not update getResult() value. 

# Contribute

Create issues about anything you want to report, change of API's, or request for adding new indicators. You can also create pull request with new indicators.