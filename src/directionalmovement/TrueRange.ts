import { CandleData } from '../StockData';
import { Indicator, IndicatorInput } from '../indicator/indicator';
/**
 * Created by AAravindan on 5/8/16.
 */
/**
 * Created by AAravindan on 5/8/16.
 */
"use strict"
export class TrueRangeInput extends IndicatorInput {
  low:number[];
  high:number[]
  close:number[]
};

export class TrueRange extends Indicator {
  result : number[];
  generator:IterableIterator<number | undefined>;
  constructor(input:TrueRangeInput) {
    super(input);
    var lows = input.low;
    var highs = input.high;
    var closes = input.close;
    var format = this.format;

    if(lows.length != highs.length) {
      throw ('Inputs(low,high) not of equal size');
    }

    this.result = [];

    this.generator = (function* ():IterableIterator<number | undefined >{
      var current:CandleData = yield;
      var previousClose,result;
      while (true) {
        result = Math.max(
            current.high - current.low,
            isNaN(Math.abs(current.high - previousClose)) ? 0 : Math.abs(current.high - previousClose),
            isNaN(Math.abs(current.low - previousClose)) ? 0 : Math.abs(current.low - previousClose)
        );
        previousClose = current.close;
        if(result){
          result = format(result)
        }
        current = yield result;
      }
    })();

    this.generator.next();

    lows.forEach((tick, index) => {
      var result = this.generator.next({
        high : highs[index],
        low  : lows[index],
        close: closes[index]
      });
      if(result.value){
        this.result.push(result.value);
      }
    });
  };

  static calculate(input:TrueRangeInput):number[] {
      Indicator.reverseInputs(input);
      var result = new TrueRange(input).result;
      if(input.reversedInput) {
          result.reverse();
      }
      Indicator.reverseInputs(input);
      return result;
  };

  nextValue(price:CandleData):number | undefined {
     return this.generator.next(price).value;
  };

}