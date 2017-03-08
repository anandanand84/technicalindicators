/**
 * Created by AAravindan on 5/17/16.
 */
import { Indicator, IndicatorInput } from '../indicator/indicator';
import { CandleData } from '../StockData';

export class ADLInput extends IndicatorInput {
  high:number[]
  low:number[]
  close:number[]
  volume:number[]
}

export class ADL extends Indicator {
  generator:IterableIterator<number | undefined>;
    constructor (input:ADLInput) {
      super(input);
      var highs       = input.high;
      var lows        = input.low;
      var closes      = input.close;
      var volumes     = input.volume;

      if(!((lows.length === highs.length) && (highs.length === closes.length) && (highs.length === volumes.length) )){
        throw ('Inputs(low,high, close, volumes) not of equal size');
      }

      this.result = [];

      this.generator = (function* (){
        var result = 0;
        var tick;
        tick = yield;
        while (true)
        {
          let moneyFlowMultiplier = ((tick.close  -  tick.low) - (tick.high - tick.close)) /(tick.high - tick.low);
          let moneyFlowVolume = moneyFlowMultiplier * tick.volume;
          result = result + moneyFlowVolume
          tick = yield Math.round(result);
        }
      })();

      this.generator.next();

      highs.forEach((tickHigh, index) => {
        var tickInput = {
          high    : tickHigh,
          low     : lows[index],
          close   : closes[index],
          volume  : volumes[index]
        }
        var result = this.generator.next(tickInput);
        if(result.value){
          this.result.push(result.value);
        }
      });
  };

  static calculate(input:ADLInput):number[] {
      Indicator.reverseInputs(input);
      var result = new ADL(input).result;
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