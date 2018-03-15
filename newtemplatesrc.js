/**
 * Created by AAravindan on 5/17/16.
 */
var fs = require('fs');
var srcTemplate = (answers) => 
`
import { Indicator, IndicatorInput } from '../indicator/indicator';
import { CandleData } from '../StockData';

export class ${answers.name}Input extends IndicatorInput {
  high:number[]
  open:number[]
  low:number[]
  close:number[]
  volume:number[]
  period :number
}

export class ${answers.name} extends Indicator {
  generator:IterableIterator<number | undefined>;
    constructor (input:${answers.name}Input) {
      super(input);
      var highs       = input.high;
      var lows        = input.low;
      var closes      = input.close;
      var opens       = input.open;
      var volumes     = input.volume;
      var period      = input.period;

      if(!((lows.length === highs.length) && (highs.length === closes.length) && (highs.length === volumes.length) )){
        throw ('Inputs(low,high, close, volumes) not of equal size');
      }

      this.result = [];

      this.generator = (function* (){
        var result;
        var tick;
        tick = yield;
        var lastClose = tick.close; //Fist value 
        tick = yield;
        while (true)
        {
          var { high, low, close, volume } = tick;

          lastClose = close;
          tick = yield result
        }
      })();

      this.generator.next();

      highs.forEach((tickHigh, index) => {
        var tickInput = {
          high    : tickHigh,
          low     : lows[index],
          open    : opens[index],
          close   : closes[index],
          volume  : volumes[index]
        }
        var result = this.generator.next(tickInput);
        if(result.value != undefined){
          this.result.push(result.value);
        }
      });
  };

  static calculate = ${answers.name.toLowerCase()};

  nextValue(price:CandleData):number | undefined {
     var result =  this.generator.next(price);
     if(result.value != undefined){
        return result.value;
      }
  };
}

export function ${answers.name.toLowerCase()}(input:${answers.name}Input):number[] {
      Indicator.reverseInputs(input);
      var result = new ${answers.name}(input).result;
      if(input.reversedInput) {
          result.reverse();
      }
      Indicator.reverseInputs(input);
      return result;
  };
`

var testTemplate = (answers) => 

`
"use strict";
let assert = require('assert');
let ${answers.name}    = require('../../lib/volume/${answers.name}').${answers.name};

let input = {
  high :   [24.63,24.69,24.99,25.36,25.19,25.17,25.01,24.96,25.08,25.25,25.21,25.37,25.61,25.58,25.46,25.33,25.09,25.03,24.91,24.89,25.13],
  low  :   [24.63,24.69,24.99,25.36,25.19,25.17,25.01,24.96,25.08,25.25,25.21,25.37,25.61,25.58,25.46,25.33,25.09,25.03,24.91,24.89,25.13],
  close :  [24.63,24.69,24.99,25.36,25.19,25.17,25.01,24.96,25.08,25.25,25.21,25.37,25.61,25.58,25.46,25.33,25.09,25.03,24.91,24.89,25.13],
  volume : [18730,12272,24691,18358,22964,15919,16067,16568,16019,9774,22573,12987,10907,5799,7395,5818,7165,5673,5625,5023,7457],
  period : 14
}

let expectResult = [49.46,45.11,36.27,28.40,31.53,33.87,41.30]

describe('${answers.name}', function() {
  it('should calculate ${answers.name} using the calculate method', function() {
    assert.deepEqual(${answers.name}.calculate(input), expectResult, 'Wrong Results');
  });

  it('should be able to calculate ${answers.name} by using getResult', function() {
    let ${answers.name.toLowerCase()} = new ${answers.name}(input);
    assert.deepEqual(${answers.name.toLowerCase()}.getResult(),  expectResult, 'Wrong Results while calculating next bar');
  });

  it('should be able to get ${answers.name} for the next bar using nextValue', function() {
    let ${answers.name.toLowerCase()} = new ${answers.name}({ high : [], low:[], close:[], volume : [], period:14});
    let results = [];
    input.close.forEach(function(close,index) {
      let result = ${answers.name.toLowerCase()}.nextValue({
        close: input.close[index],
        high: input.high[index],
        low: input.low[index],
        volume: input.volume[index]
      });
      if(result !== undefined){
        results.push(parseFloat(result.toFixed(2)));
      }
    });
    assert.deepEqual(results, expectResult, 'Wrong Results while getting results');
  })

  it('should be able to calculate ${answers.name} for reversed input by using calculate method', function() {
    let myInput = Object.assign({}, input);
    myInput.reversedInput = true;
    myInput.high.reverse();
    myInput.low.reverse();
    myInput.close.reverse();
    myInput.volume.reverse();
    assert.deepEqual(${answers.name}.calculate(myInput),  expectResult.slice().reverse(), 'Wrong Results while calculating next bar');
  });
})
`
module.exports = {
  getTemplate : function (answers) {
    return srcTemplate(answers);
  },
  getTestTemplate : function (answers) {
    return testTemplate(answers);
  }
}