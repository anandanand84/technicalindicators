import { runInThisContext } from 'vm';
import * as console from 'console';
import { Indicator, IndicatorInput } from '../indicator/indicator';
import { MDM } from   './MinusDM';
import { PDM } from    './PlusDM';
import { TrueRange } from './TrueRange';
import { SMA } from       '../moving_averages/SMA';
import { WEMA } from       '../moving_averages/WEMA';

export class ADXInput extends IndicatorInput {
  high : number[];
  low :number[];
  close : number[];
  period : number;
};


export class ADX extends Indicator {
  generator:IterableIterator<number | undefined>;
  constructor(input:ADXInput) {
    super(input);
    var lows = input.low;
    var highs = input.high;
    var closes = input.close;
    var period = input.period;
    var format = this.format;

    var plusDM = new PDM({
      high: [],
      low : []
    });

    var minusDM = new MDM({
      high: [],
      low : []
    });

    var emaPDM = new WEMA({period: period, values:[], format : (v) => {return v}});
    var emaMDM = new WEMA({period: period, values:[], format : (v) => {return v}});
    var emaTR  = new WEMA({period: period, values:[], format : (v) => {return v}});
    var smaDX  = new SMA({period: period, values:[], format : (v) => {return v}});

    var tr    = new TrueRange({
      low : [],
      high: [],
      close: [],
    });

    if(!((lows.length === highs.length) && (highs.length === closes.length) )){
      throw ('Inputs(low,high, close) not of equal size');
    }

    this.result = [];

    this.generator = (function* (){
      var tick = yield;
      var index = 0;
      var lastATR,lastAPDM,lastAMDM,lastPDI,lastMDI,lastDX,smoothedDX;
      lastATR = 0;
      lastAPDM = 0;
      lastAMDM = 0;
      while (true) {
        let calcTr = tr.nextValue(tick);
        let calcPDM = plusDM.nextValue(tick);
        calcPDM = calcPDM ? calcPDM : 0;
        let calcMDM = minusDM.nextValue(tick);
        calcMDM = calcMDM ? calcMDM : 0;
        if(calcTr!==undefined){
          if(index < period){
            lastATR  = lastATR + calcTr;
            lastAPDM = lastAPDM + calcPDM;
            lastAMDM = lastAMDM + calcMDM;
            index++;
            tick = yield
            continue;
          }
          else if(index === period) {
            lastPDI = (lastAPDM) * 100 / lastATR;
            lastMDI = (lastAMDM) * 100 / lastATR;
            index++;
          }
          else {
            lastATR =  (lastATR - (lastATR / period)) + calcTr;
            lastAPDM = (lastAPDM - (lastAPDM / period)) + calcPDM;
            lastAMDM = (lastAMDM - (lastAMDM / period)) + calcMDM;
            lastPDI = (lastAPDM) * 100 / lastATR;
            lastMDI = (lastAMDM) * 100 / lastATR;
          }
          lastDX = (Math.abs(lastPDI - lastMDI) / (lastPDI + lastMDI)) * 100;
          if(!smoothedDX){
            smoothedDX = smaDX.nextValue(lastDX)
          }
          else{
            smoothedDX = ((smoothedDX * (period-1)) + lastDX)/ period;
          }
        }
        tick = yield smoothedDX;
      }
    })();

    this.generator.next();

    lows.forEach((tick,index) => {
      var result = this.generator.next({
        high : highs[index],
        low  : lows[index],
        close : closes[index]
      });
      if(result.value){
        this.result.push(format(result.value));
      }
    });
  };

  static calculate(input:ADXInput):number[] {
    Indicator.reverseInputs(input);
    var result = new ADX(input).result;
    if(input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
  };

  nextValue(price:number):number | undefined {
      let result = this.generator.next(price).value;
      if(result) {
        return this.format(result);
      }
  };
}