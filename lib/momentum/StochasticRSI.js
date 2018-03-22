import { IndicatorInput, Indicator } from '../indicator/indicator';
/**
 * Created by AAravindan on 5/10/16.
 */
"use strict";
import { SMA } from '../moving_averages/SMA';
import { RSI } from '../oscillators/RSI';
import { Stochastic } from '../momentum/Stochastic';
export class StochasticRsiInput extends IndicatorInput {
}
;
export class StochasticRSIOutput {
}
;
export class StochasticRSI extends Indicator {
    constructor(input) {
        super(input);
        let closes = input.values;
        let rsiPeriod = input.rsiPeriod;
        let stochasticPeriod = input.stochasticPeriod;
        let kPeriod = input.kPeriod;
        let dPeriod = input.dPeriod;
        let format = this.format;
        this.result = [];
        this.generator = (function* () {
            let index = 1;
            let rsi = new RSI({ period: rsiPeriod, values: [] });
            let stochastic = new Stochastic({ period: stochasticPeriod, high: [], low: [], close: [], signalPeriod: kPeriod });
            let dSma = new SMA({
                period: dPeriod,
                values: [],
                format: (v) => { return v; }
            });
            let lastRSI, stochasticRSI, d, result;
            var tick = yield;
            while (true) {
                lastRSI = rsi.nextValue(tick);
                if (lastRSI !== undefined) {
                    var stochasticInput = { high: lastRSI, low: lastRSI, close: lastRSI };
                    stochasticRSI = stochastic.nextValue(stochasticInput);
                    if (stochasticRSI !== undefined && stochasticRSI.d !== undefined) {
                        d = dSma.nextValue(stochasticRSI.d);
                        if (d !== undefined)
                            result = {
                                stochRSI: stochasticRSI.k,
                                k: stochasticRSI.d,
                                d: d
                            };
                    }
                }
                tick = yield result;
            }
        })();
        this.generator.next();
        closes.forEach((tick, index) => {
            var result = this.generator.next(tick);
            if (result.value !== undefined) {
                this.result.push(result.value);
            }
        });
    }
    ;
    nextValue(input) {
        let nextResult = this.generator.next(input);
        if (nextResult.value !== undefined)
            return nextResult.value;
    }
    ;
}
StochasticRSI.calculate = stochasticrsi;
export function stochasticrsi(input) {
    Indicator.reverseInputs(input);
    var result = new StochasticRSI(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}
;
