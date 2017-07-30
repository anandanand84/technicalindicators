//babel-node debug.js
var RSI = require('./lib/oscillators/RSI').RSI;

var inputRSI = {
 values : [ 294434, 294435, 294435, 294500, 294500, 294400, 294520, 294539, 294539, 294600, 294600, 294600, 294600, 294600, 294700 ],
 period : 14
};

var inputRSI1 = {
 values : [ 294435, 294435, 294435, 294500, 294500, 294400, 294520, 294539, 294539, 294600, 294600, 294600, 294600, 294600, 294700 ],
 period : 14
};
//var expectedResult = [
//  70.53,66.32,66.55,69.41,66.36,57.97,62.93,63.26,56.06,62.38
//];

console.log(RSI.calculate(inputRSI))
console.log(RSI.calculate(inputRSI1))
