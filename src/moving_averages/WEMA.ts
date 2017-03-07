"use strict"
//TODO; THis is copied from EMA for checking if WEMA works correctly, we need to refactor if this works good.
import { Indicator, IndicatorInput } from '../indicator/indicator';
import { MAInput, SMA } from './SMA';


export class WEMA extends Indicator {
  period:number;
  price:number[];
  result : number[];
  generator:IterableIterator<number | undefined>;
  constructor(input:MAInput) {
    super(input);
    var period = input.period
    var priceArray = input.values;
    var sma:SMA;

    this.result = [];

    sma = new SMA({period : period, values :[], format : (v) => {return v}});

    this.generator = (function* ():IterableIterator<number | undefined>{
      var tick = yield;
      var prevMa,currentMa:number;
      while (true) {
        if(prevMa === undefined){
          currentMa = sma.nextValue(tick);
        }else {
          currentMa = ((prevMa * (period - 1)) + tick) / period;
        }
        prevMa = currentMa;
        tick = yield currentMa;
      }
    })();

    this.generator.next();

    priceArray.forEach((tick) => {
      var result = this.generator.next(tick);
      if(result.value){
        this.result.push(this.format(result.value));
      }
    });
  }

  static calculate(input:MAInput) {
    Indicator.reverseInputs(input);
    var result = new WEMA(input).result;
    if(input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
  }

  nextValue(price:number):number | undefined {
      var result = this.generator.next(price).value;
      if(result)
          return this.format(result);
  };
};
