import { Indicator, IndicatorInput } from '../indicator/indicator';
/**
 * Created by AAravindan on 5/8/16.
 */
"use strict";
import { WEMA } from '../moving_averages/WEMA';
import { TrueRange } from './TrueRange';
export class ATRInput extends IndicatorInput {
}
;
export class ATR extends Indicator {
    constructor(input) {
        super(input);
        var lows = input.low;
        var highs = input.high;
        var closes = input.close;
        var period = input.period;
        var format = this.format;
        if (!((lows.length === highs.length) && (highs.length === closes.length))) {
            throw ('Inputs(low,high, close) not of equal size');
        }
        var trueRange = new TrueRange({
            low: [],
            high: [],
            close: []
        });
        var wema = new WEMA({ period: period, values: [], format: (v) => { return v; } });
        this.result = [];
        this.generator = (function* () {
            var tick = yield;
            var avgTrueRange, trange;
            ;
            while (true) {
                trange = trueRange.nextValue({
                    low: tick.low,
                    high: tick.high,
                    close: tick.close
                });
                if (trange === undefined) {
                    avgTrueRange = undefined;
                }
                else {
                    avgTrueRange = wema.nextValue(trange);
                }
                tick = yield avgTrueRange;
            }
        })();
        this.generator.next();
        lows.forEach((tick, index) => {
            var result = this.generator.next({
                high: highs[index],
                low: lows[index],
                close: closes[index]
            });
            if (result.value !== undefined) {
                this.result.push(format(result.value));
            }
        });
    }
    ;
    nextValue(price) {
        return this.generator.next(price).value;
    }
    ;
}
ATR.calculate = atr;
export function atr(input) {
    Indicator.reverseInputs(input);
    var result = new ATR(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}
;
