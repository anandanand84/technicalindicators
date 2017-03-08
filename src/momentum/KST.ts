import { runInThisContext } from 'vm';
import { Indicator, IndicatorInput } from '../indicator/indicator';
import { SMA } from '../moving_averages/SMA';
import { ROC } from './ROC';

export class KSTInput extends IndicatorInput {
  ROCPer1 : number;
  ROCPer2 : number;
  ROCPer3 : number;
  ROCPer4 : number;
  SMAROCPer1 : number;
  SMAROCPer2 : number;
  SMAROCPer3 : number;
  SMAROCPer4 : number;
  signalPeriod: number;
  values : number[];
}

export class KSTOutput {
  kst:number
  signal:number
}

export class KST extends Indicator { 
  result : KSTOutput[];
  generator:IterableIterator<KSTOutput | undefined>;
  constructor(input:KSTInput) {
    super(input);
    let priceArray  = input.values;
    let rocPer1     = input.ROCPer1;
    let rocPer2     = input.ROCPer2;
    let rocPer3     = input.ROCPer3;
    let rocPer4     = input.ROCPer4;

    let smaPer1     = input.SMAROCPer1;
    let smaPer2     = input.SMAROCPer2;
    let smaPer3     = input.SMAROCPer3;
    let smaPer4     = input.SMAROCPer4;

    let signalPeriod= input.signalPeriod;

    let roc1        = new ROC({ period : rocPer1, values: []});
    let roc2        = new ROC({ period : rocPer2, values: []});
    let roc3        = new ROC({ period : rocPer3, values: []});
    let roc4        = new ROC({ period : rocPer4, values: []});

    let sma1        = new SMA({ period : smaPer1, values: [], format : (v) => {return v}});
    let sma2        = new SMA({ period : smaPer2, values: [], format : (v) => {return v}});
    let sma3        = new SMA({ period : smaPer3, values: [], format : (v) => {return v}});
    let sma4        = new SMA({ period : smaPer4, values: [], format : (v) => {return v}});
    let signalSMA   = new SMA({ period : signalPeriod, values: [], format : (v) => {return v}})
    var format = this.format;
    this.result = [];

    let firstResult = Math.max(rocPer1 + smaPer1, rocPer2+smaPer2, rocPer3+smaPer3, rocPer4+smaPer4);
    this.generator = (function* ():IterableIterator<KSTOutput | undefined>{
      let index = 1;
      let tick = yield;
      let kst;
      let RCMA1,RCMA2,RCMA3,RCMA4,signal,result;
      while (true) {
        let roc1Result = roc1.nextValue(tick);
        let roc2Result = roc2.nextValue(tick);
        let roc3Result = roc3.nextValue(tick);
        let roc4Result = roc4.nextValue(tick);
        RCMA1 = (roc1Result!==undefined) ? sma1.nextValue(roc1Result) : undefined;
        RCMA2 = (roc2Result!==undefined) ? sma2.nextValue(roc2Result) : undefined;
        RCMA3 = (roc3Result!==undefined) ? sma3.nextValue(roc3Result) : undefined;
        RCMA4 = (roc4Result!==undefined) ? sma4.nextValue(roc4Result) : undefined;
        if(index < firstResult){
          index++;
        }else {
          kst = (RCMA1 * 1) + (RCMA2 * 2) + (RCMA3 * 3) + (RCMA4 * 4)
        }
        signal = (kst!==undefined) ? signalSMA.nextValue(kst) : undefined;
        result = kst!==undefined ? {
          kst : format(kst),
          signal : signal ? format(signal) : undefined
        } : undefined;
        tick = yield result;
      }
    })();

    this.generator.next();

    priceArray.forEach((tick) => {
      let result = this.generator.next(tick);
      if(result.value !== undefined){
        this.result.push(result.value);
      }
    });
  };

  static calculate(input:KSTInput):KSTOutput[] {
       Indicator.reverseInputs(input);
        var result = new KST(input).result;
        if(input.reversedInput) {
            result.reverse();
        }
        Indicator.reverseInputs(input);
        return result;
    };


  nextValue (price:number) {
    let nextResult = this.generator.next(price);
    if(nextResult.value !== undefined)
      return nextResult.value;
  };
}
