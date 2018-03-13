import { CandleData, CandleList } from '../StockData';
import { atr } from '../directionalmovement/ATR';

/**
 * Created by AAravindan on 5/4/16.
 */
import { Indicator, IndicatorInput } from '../indicator/indicator';

export class TypicalPriceInput extends IndicatorInput {
    low? : number[]
    high? : number[]
    close? : number[]
}

export class TypicalPrice extends Indicator{
    result : number[] = [];
    generator:IterableIterator<number | undefined>;
    constructor(input:TypicalPriceInput) {
      super(input);
      this.generator = (function* (){
          let priceInput = yield;
          while (true) {
            priceInput = yield (priceInput.high + priceInput.low + priceInput.close) / 3;
          }
      })();

      this.generator.next();
      input.low.forEach((tick, index) => {
            var result = this.generator.next({ 
                high : input.high[index],
                low : input.low[index],
                close : input.close[index],
            });
            this.result.push(result.value);
      });
    }

    static calculate=typicalprice;

    nextValue(price:CandleData):number | undefined {
        var result = this.generator.next(price).value;
        return result;
    };
}

export function typicalprice(input:TypicalPriceInput):number[] {
    Indicator.reverseInputs(input);
    var result = new TypicalPrice(input).result;
    if(input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
};