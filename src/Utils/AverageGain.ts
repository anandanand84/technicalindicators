import { Indicator, IndicatorInput } from '../indicator/indicator';


export class AvgGainInput extends IndicatorInput {
  period:number
  values:number[]
}

export class AverageGain extends Indicator {
  generator:IterableIterator<number | undefined>;
  constructor(input:AvgGainInput) {
    super(input);
    let values = input.values;
    let period = input.period;
    let format = this.format;

    this.generator = (function* (period){
      var currentValue = yield;
      var counter = 1;
      var gainSum = 0;
      var avgGain;
      var gain;
      var lastValue;
      while(true){
        gain = lastValue ? (currentValue - lastValue) : 0;
        gain = gain ? gain : 0;
        if(gain > 0){
          gainSum = gainSum + gain;
        }
        if(counter < (period + 1)){
          counter++;
        }
        else if(!avgGain){
          avgGain = gainSum / period;
        }else {
          avgGain = ((avgGain * (period-1)) + (gain > 0 ? gain : 0))/period;
        }
        lastValue = currentValue;
        avgGain = avgGain ? format(avgGain) : undefined;
        currentValue = yield avgGain;
      }
    })(period);

    this.generator.next();

    this.result = [];

    values.forEach((tick:number) => {
      var result = this.generator.next(tick);
      if(result.value !== undefined){
        this.result.push(result.value);
      }
    });
  }

  static calculate = averagegain;

    nextValue(price:number):number | undefined {
        return this.generator.next(price).value;
    };
}

export function averagegain(input:AvgGainInput):number[] {
       Indicator.reverseInputs(input);
        var result = new AverageGain(input).result;
        if(input.reversedInput) {
            result.reverse();
        }
        Indicator.reverseInputs(input);
        return result;
    };