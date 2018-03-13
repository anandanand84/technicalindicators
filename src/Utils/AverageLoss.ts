import { Indicator, IndicatorInput } from '../indicator/indicator';
export class AvgLossInput extends IndicatorInput {
  values:number[]
  period:number
}

export class AverageLoss extends Indicator {
  generator:IterableIterator<number | undefined>;
  constructor(input:AvgLossInput) {
    super(input);
    let values = input.values;
    let period = input.period;
    let format = this.format;

    this.generator = (function* (period){
      var currentValue = yield;
      var counter = 1;
      var lossSum = 0;
      var avgLoss;
      var loss;
      var lastValue = currentValue;
      currentValue = yield
      while(true){
        loss = lastValue - currentValue;
        loss = loss > 0 ? loss : 0;
        if(loss > 0){
          lossSum = lossSum + loss;
        }
        if(counter < period){
          counter++;
        }
        else if(avgLoss === undefined){ 
          avgLoss = lossSum / period;
        }else {
          avgLoss = ((avgLoss * (period-1)) + loss)/period;
        }
        lastValue = currentValue;
        avgLoss = (avgLoss!==undefined) ? format(avgLoss) : undefined;
        currentValue = yield avgLoss;
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

  static calculate = averageloss;

    nextValue(price:number):number | undefined {
        return this.generator.next(price).value;
    };
} 

export function averageloss(input:AvgLossInput):number[] {
       Indicator.reverseInputs(input);
        var result = new AverageLoss(input).result;
        if(input.reversedInput) {
            result.reverse();
        }
        Indicator.reverseInputs(input);
        return result;
    };
