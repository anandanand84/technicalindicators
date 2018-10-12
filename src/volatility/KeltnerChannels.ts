
import { Indicator, IndicatorInput } from '../indicator/indicator';
import { SMA } from '../moving_averages/SMA';
import { EMA } from '../moving_averages/EMA';
import { ATR } from '../directionalmovement/ATR';

export class KeltnerChannelsInput extends IndicatorInput {
  maPeriod : number = 20;
  atrPeriod: number = 10;
  useSMA : boolean = false;
  multiplier : number = 1;
  high : number[];
  low : number[];
  close : number[];
}


export class KeltnerChannelsOutput extends IndicatorInput {
  middle : number;
  upper : number;
  lower :number;
};

export class KeltnerChannels extends Indicator {
  result : KeltnerChannelsOutput[]
  generator:IterableIterator<KeltnerChannelsOutput | undefined>;
    constructor (input:KeltnerChannelsInput) {
      super(input);
      var maType = input.useSMA ? SMA : EMA;
      var maProducer = new maType({period : input.maPeriod, values : [], format : (v) => {return v}});
      var atrProducer = new ATR({period : input.atrPeriod, high : [], low : [], close : [], format : (v) => {return v}});
      var tick;
      this.result = [];
      this.generator = (function* (){
        var KeltnerChannelsOutput
        var result;
        tick = yield;
        while (true)
        {
          var { close } = tick;
          var ma = maProducer.nextValue(close);
          var atr = atrProducer.nextValue(tick)
          if(ma!=undefined && atr!=undefined) {
            result = {
              middle : ma,
              upper : ma + (input.multiplier * (atr)),
              lower : ma - (input.multiplier * (atr))
            }
          }
          tick = yield result;
        }
      })();

      this.generator.next();

      var highs = input.high;

      highs.forEach((tickHigh, index) => {
        var tickInput = {
          high    : tickHigh,
          low     : input.low[index],
          close   : input.close[index],
        }
        var result = this.generator.next(tickInput);
        if(result.value != undefined){
          this.result.push(result.value);
        }
      });
  };

  static calculate = keltnerchannels;

  nextValue(price:KeltnerChannelsInput):KeltnerChannelsOutput | undefined {
     var result =  this.generator.next(price);
     if(result.value != undefined){
        return result.value;
      }
  };
}

export function keltnerchannels(input:KeltnerChannelsInput):KeltnerChannelsOutput[] {
      Indicator.reverseInputs(input);
      var result = new KeltnerChannels(input).result;
      if(input.reversedInput) {
          result.reverse();
      }
      Indicator.reverseInputs(input);
      return result;
  };
