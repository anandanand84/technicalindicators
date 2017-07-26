/**
 * Created by AAravindan on 5/4/16.
 */
import { Indicator, IndicatorInput } from '../indicator/indicator';
import { SMA } from './SMA';
import { EMA } from './EMA';

export class MACDInput extends IndicatorInput {
    SimpleMAOscillator:boolean = true;
    SimpleMASignal:boolean = true;
    fastPeriod:number;
    slowPeriod:number;
    signalPeriod:number;
    constructor(public period:number, 
                public values:number[]) {
        super();
    }
}

export class MACDOutput {
    MACD?:number
    signal?:number
    histogram?:number
}

export class MACD extends Indicator{
    result : MACDOutput[];
    generator:IterableIterator<MACDOutput | undefined>;
    constructor(input:MACDInput) {
      super(input);
      var oscillatorMAtype = input.SimpleMAOscillator ? SMA : EMA;
      var signalMAtype   = input.SimpleMASignal ? SMA : EMA;
      var fastMAProducer = new oscillatorMAtype({period : input.fastPeriod, values : [], format : (v) => {return v}});
      var slowMAProducer = new oscillatorMAtype({period : input.slowPeriod, values : [], format : (v) => {return v}});
      var signalMAProducer = new signalMAtype({period : input.signalPeriod, values : [], format : (v) => {return v}});
      var format = this.format;
      this.result = [];

      this.generator = (function* (){
        var index = 0;
        var tick;
        var MACD:number|undefined, signal:number|undefined, histogram:number|undefined, fast:number|undefined, slow:number|undefined;
        while (true) {
          if(index < input.slowPeriod){
            tick = yield;
            fast = fastMAProducer.nextValue(tick);
            slow = slowMAProducer.nextValue(tick);
            index++;
            continue;
          }
          if(fast && slow) { //Just for typescript to be happy
            MACD = fast - slow;
            signal = signalMAProducer.nextValue(MACD);
          } 
          histogram = MACD - signal;
          tick = yield({
            //fast : fast,
            //slow : slow,
            MACD : format(MACD),
            signal : signal ? format(signal) : undefined,
            histogram : isNaN(histogram) ? undefined : format(histogram)
          })
          fast = fastMAProducer.nextValue(tick);
          slow = slowMAProducer.nextValue(tick);
        }
      })();

      this.generator.next();

      input.values.forEach((tick) => {
        var result = this.generator.next(tick);
        if(result.value != undefined){
          this.result.push(result.value);
        }
      });
    }

    static calculate=macd;

    nextValue(price:number):MACDOutput | undefined {
        var result = this.generator.next(price).value;
        return result;
    };
}

export function macd(input:MACDInput):MACDOutput[] {
       Indicator.reverseInputs(input);
        var result = new MACD(input).result;
        if(input.reversedInput) {
            result.reverse();
        }
        Indicator.reverseInputs(input);
        return result;
    };