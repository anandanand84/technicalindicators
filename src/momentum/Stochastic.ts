import { IndicatorInput, Indicator } from '../indicator/indicator';
/**
 * Created by AAravindan on 5/10/16.
 */
"use strict"

import LinkedList from '../Utils/FixedSizeLinkedList';
import { SMA }  from '../moving_averages/SMA';

export class StochasticInput extends IndicatorInput{
  period:number;
  low:number[];
  high:number[];
  close:number[];
  signalPeriod:number;
};

export class StochasticOutput{
  k:number;
  d:number;
};

export class Stochastic extends Indicator {
  result:StochasticOutput[]
  generator:IterableIterator<StochasticOutput | undefined>;
  constructor (input:StochasticInput) {
    super(input);
    let lows = input.low;
    let highs = input.high;
    let closes = input.close;
    let period = input.period;
    let signalPeriod = input.signalPeriod;
    let smoothing = input.smoothing;
    let format = this.format;
    if(!((lows.length === highs.length) && (highs.length === closes.length) )){
      throw ('Inputs(low,high, close) not of equal size');
    }
    this.result = [];
    //%K = (Current Close - Lowest Low)/(Highest High - Lowest Low) * 100
    //%D = 3-day SMA of %K
    //
    //Lowest Low = lowest low for the look-back period
    //Highest High = highest high for the look-back period
    //%K is multiplied by 100 to move the decimal point two places
    this.generator = (function* (){
      let index = 1;
      let pastHighPeriods = new LinkedList(period, true, false);
      let pastLowPeriods = new LinkedList(period, false, true);
      let kSma
      if (smoothing > 1) {
          kSma = new SMA({
              period: smoothing,
              values: [],
              format: (v) => { return v; }
          });
      }
      let dSma = new SMA({
        period : signalPeriod,
        values : [],
        format : (v) => {return v}
      });
      let k,d;
      var tick = yield;
      while (true) {
        pastHighPeriods.push(tick.high);
        pastLowPeriods.push(tick.low);
        if(index < period){
          index++;
          tick = yield;
          continue;
        }
        let periodLow = pastLowPeriods.periodLow;
        k = (tick.close - periodLow) / (pastHighPeriods.periodHigh - periodLow) * 100;
        k = isNaN(k) ? 0 : k; //This happens when the close, high and low are same for the entire period; Bug fix for
        if (smoothing > 1) {
            k = kSma.nextValue(k);
            k = isNaN(k) ? 0 : k;
        }
        d = dSma.nextValue(k);
        tick = yield {
          k : format(k),
          d : (d !== undefined) ? format(d) : undefined
        }
      }
    })();

    this.generator.next();

    lows.forEach((tick, index) => {
      var result = this.generator.next({
        high : highs[index],
        low  : lows[index],
        close : closes[index]
      });
      if(result.value !== undefined){
        this.result.push(result.value);
      }
    });
  };

  static calculate = stochastic

  nextValue (input:StochasticInput):StochasticOutput {
    let nextResult = this.generator.next(input);
    if(nextResult.value !== undefined)
      return nextResult.value;
  };
}

export function stochastic(input:StochasticInput):StochasticOutput[] {
        Indicator.reverseInputs(input);
        var result = new Stochastic(input).result;
        if(input.reversedInput) {
            result.reverse();
        }
        Indicator.reverseInputs(input);
        return result;
    };
