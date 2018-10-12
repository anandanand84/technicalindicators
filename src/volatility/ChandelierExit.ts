import { Indicator, IndicatorInput } from '../indicator/indicator';
import { ATR } from '../directionalmovement/ATR';
import LinkedList from '../Utils/FixedSizeLinkedList';
export class ChandelierExitInput extends IndicatorInput {
  period : number = 22;
  multiplier : number = 3;
  high : number[];
  low : number[];
  close : number[];
}

export class ChandelierExitOutput extends IndicatorInput {
  exitLong : number;
  exitShort : number;
};

export class ChandelierExit extends Indicator {
  generator:IterableIterator<ChandelierExitOutput | undefined>;
    constructor (input:ChandelierExitInput) {
      super(input);
      var highs       = input.high;
      var lows        = input.low;
      var closes      = input.close;

      this.result = [];
      var atrProducer = new ATR({period : input.period, high : [], low : [], close : [], format : (v) => {return v}});
      var dataCollector = new LinkedList(input.period * 2, true, true, false);
      this.generator = (function* (){
        var result;
        var tick = yield;
        var atr;
        while (true)
        {
          var { high, low } = tick;
          dataCollector.push(high);
          dataCollector.push(low);
          atr = atrProducer.nextValue(tick)
          if((dataCollector.totalPushed >= (2 * input.period)) &&  atr!= undefined) {
            result = {
              exitLong : dataCollector.periodHigh - atr * input.multiplier,
              exitShort : dataCollector.periodLow + atr * input.multiplier
            } 
          }
          tick = yield result
        }
      })();

      this.generator.next();

      highs.forEach((tickHigh, index) => {
        var tickInput = {
          high    : tickHigh,
          low     : lows[index],
          close   : closes[index],
        }
        var result = this.generator.next(tickInput);
        if(result.value != undefined){
          this.result.push(result.value);
        }
      });
  };

  static calculate = chandelierexit;

  nextValue(price:ChandelierExitInput):ChandelierExitOutput | undefined {
     var result =  this.generator.next(price);
     if(result.value != undefined){
        return result.value;
      }
  };
}

export function chandelierexit(input:ChandelierExitInput):number[] {
      Indicator.reverseInputs(input);
      var result = new ChandelierExit(input).result;
      if(input.reversedInput) {
          result.reverse();
      }
      Indicator.reverseInputs(input);
      return result;
  };
