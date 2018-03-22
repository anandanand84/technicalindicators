import { Indicator, IndicatorInput } from '../indicator/indicator';
export class VWAPInput extends IndicatorInput {
}
;
export class VWAP extends Indicator {
    constructor(input) {
        super(input);
        var lows = input.low;
        var highs = input.high;
        var closes = input.close;
        var volumes = input.volume;
        var format = this.format;
        if (!((lows.length === highs.length) && (highs.length === closes.length))) {
            throw ('Inputs(low,high, close) not of equal size');
        }
        this.result = [];
        this.generator = (function* () {
            var tick = yield;
            let cumulativeTotal = 0;
            let cumulativeVolume = 0;
            while (true) {
                let typicalPrice = (tick.high + tick.low + tick.close) / 3;
                let total = tick.volume * typicalPrice;
                cumulativeTotal = cumulativeTotal + total;
                cumulativeVolume = cumulativeVolume + tick.volume;
                tick = yield cumulativeTotal / cumulativeVolume;
                ;
            }
        })();
        this.generator.next();
        lows.forEach((tick, index) => {
            var result = this.generator.next({
                high: highs[index],
                low: lows[index],
                close: closes[index],
                volume: volumes[index]
            });
            if (result.value != undefined) {
                this.result.push(result.value);
            }
        });
    }
    ;
    ;
    nextValue(price) {
        let result = this.generator.next(price).value;
        if (result != undefined) {
            return result;
        }
    }
    ;
}
VWAP.calculate = vwap;
export function vwap(input) {
    Indicator.reverseInputs(input);
    var result = new VWAP(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}
;
