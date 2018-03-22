import { Indicator, IndicatorInput } from '../indicator/indicator';
/**
 * Created by AAravindan on 5/8/16.
 */
export class PDMInput extends IndicatorInput {
}
;
export class PDM extends Indicator {
    constructor(input) {
        super(input);
        var lows = input.low;
        var highs = input.high;
        var format = this.format;
        if (lows.length != highs.length) {
            throw ('Inputs(low,high) not of equal size');
        }
        this.result = [];
        this.generator = (function* () {
            var plusDm;
            var current = yield;
            var last;
            while (true) {
                if (last) {
                    let upMove = (current.high - last.high);
                    let downMove = (last.low - current.low);
                    plusDm = format((upMove > downMove && upMove > 0) ? upMove : 0);
                }
                last = current;
                current = yield plusDm;
            }
        })();
        this.generator.next();
        lows.forEach((tick, index) => {
            var result = this.generator.next({
                high: highs[index],
                low: lows[index]
            });
            if (result.value !== undefined)
                this.result.push(result.value);
        });
    }
    ;
    static calculate(input) {
        Indicator.reverseInputs(input);
        var result = new PDM(input).result;
        if (input.reversedInput) {
            result.reverse();
        }
        Indicator.reverseInputs(input);
        return result;
    }
    ;
    nextValue(price) {
        return this.generator.next(price).value;
    }
    ;
}
