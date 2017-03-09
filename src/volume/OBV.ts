import { Indicator, IndicatorInput } from '../indicator/indicator';
import { CandleData } from '../StockData';
/**
 * Created by AAravindan on 5/17/16.
 */
"use strict"
export class OBVInput extends IndicatorInput {
  close:number[];
  volume:number[];
}

export class OBV extends Indicator {
  generator:IterableIterator<number | undefined>;
  constructor(input:OBVInput) {
    super(input);
    var closes      = input.close;
    var volumes     = input.volume;

    this.result = [];

    this.generator = (function* (){
      var result = 0;
      var tick;
      var lastClose;
      tick = yield;
      if(tick.close && (typeof tick.close === 'number')){
        lastClose = tick.close;
        tick = yield;
      }
      while (true)
      {
        if(lastClose < tick.close ){
          result = result + tick.volume;
        }
        else if(tick.close < lastClose){
          result = result - tick.volume;
        }
        lastClose = tick.close;
        tick = yield result;
      }
    })();

    this.generator.next();

    closes.forEach((close, index) => {
      let tickInput = {
        close   : closes[index],
        volume  : volumes[index]
      }
      let result = this.generator.next(tickInput);
      if(result.value){
        this.result.push(result.value);
      }
    });
  }

  static calculate = obv;

  nextValue(price:CandleData):number | undefined {
     return this.generator.next(price).value;
  };

}

export function obv(input:OBVInput):number[] {
      Indicator.reverseInputs(input);
      var result = new OBV(input).result;
      if(input.reversedInput) {
          result.reverse();
      }
      Indicator.reverseInputs(input);
      return result;
  };