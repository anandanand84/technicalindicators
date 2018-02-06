import { CandleData } from '../StockData';
import { Indicator, IndicatorInput } from '../indicator/indicator';
import { SMA } from       '../moving_averages/SMA';
import LinkedList from '../Utils/FixedSizeLinkedList';

export class CCIInput extends IndicatorInput {
  high : number[];
  low :number[];
  close : number[];
  period : number;
};


export class CCI extends Indicator {
  result : number[]
  generator:IterableIterator<number | undefined>;;
  constructor(input:CCIInput) {
    super(input);
    var lows = input.low;
    var highs = input.high;
    var closes = input.close;
    var period = input.period;
    var format = this.format;
    let constant = .015;
    var currentTpSet = new LinkedList(period);;
    
    var tpSMACalculator  = new SMA({period: period, values:[], format : (v) => {return v}});

    if(!((lows.length === highs.length) && (highs.length === closes.length) )){
      throw ('Inputs(low,high, close) not of equal size');
    }

    this.result = [];

    this.generator = (function* (){
      var tick = yield;
      while (true) {
        let tp = (tick.high + tick.low + tick.close)/3
        currentTpSet.push(tp);
        let smaTp = tpSMACalculator.nextValue(tp);
        let meanDeviation:number = null;
        let cci:number;
        let sum = 0;
        if(smaTp != undefined) {
          //First, subtract the most recent 20-period average of the typical price from each period's typical price. 
          //Second, take the absolute values of these numbers.
          //Third,sum the absolute values. 
          for(let x of currentTpSet.iterator()){
            sum = sum + (Math.abs(x - smaTp))
          }
          //Fourth, divide by the total number of periods (20). 
          meanDeviation = sum / 20
          cci = (tp  -  smaTp) / (constant * meanDeviation)
        }
        tick = yield cci;
      }
    })();

    this.generator.next();

    lows.forEach((tick,index) => {
      var result = this.generator.next({
        high : highs[index],
        low  : lows[index],
        close : closes[index]
      });
      if(result.value != undefined){
        this.result.push(result.value);
      }
    });
  };

  static calculate = cci;

  nextValue(price:CandleData):number | undefined {
      let result = this.generator.next(price).value;
      if(result != undefined) {
        return result;
      }
  };
}

export function cci(input:CCIInput):number[] {
    Indicator.reverseInputs(input);
    var result = new CCI(input).result;
    if(input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
  };