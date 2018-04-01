
import { Indicator, IndicatorInput } from '../indicator/indicator';
import FixedSizedLinkedList from './FixedSizeLinkedList';
import { CandleData } from '../StockData';

export class HighestInput extends IndicatorInput {
  values :number[]
  period :number
}

export class Highest extends Indicator {
  generator:IterableIterator<number | undefined>;
    constructor (input:HighestInput) {
      super(input);
      var values     = input.values;
      var period     = input.period;

      this.result = [];

      var periodList = new FixedSizedLinkedList(period, true, false, false);

      this.generator = (function* (){
        var result;
        var tick;
        var high;
        tick = yield;
        while (true)
        {
          periodList.push(tick);
          if(periodList.totalPushed >= period) {
            high = periodList.periodHigh;
          }
          tick = yield high
        }
      })();

      this.generator.next();

      values.forEach((value, index) => {
        var result = this.generator.next(value);
        if(result.value != undefined) {
          this.result.push(result.value);
        }
      });
  };

  static calculate = highest;

  nextValue(price:number):number | undefined {
     var result =  this.generator.next(price);
     if(result.value != undefined){
        return result.value;
      }
  };
}

export function highest(input:HighestInput):number[] {
      Indicator.reverseInputs(input);
      var result = new Highest(input).result;
      if(input.reversedInput) {
          result.reverse();
      }
      Indicator.reverseInputs(input);
      return result;
  };
