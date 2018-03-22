/**
 * Created by AAravindan on 5/9/16.
 */
"use strict";
import { ROC } from './ROC.js';
import { EMA } from '../moving_averages/EMA.js';
import { Indicator, IndicatorInput } from '../indicator/indicator';
export class TRIXInput extends IndicatorInput {
}
;
export class TRIX extends Indicator {
    constructor(input) {
        super(input);
        let priceArray = input.values;
        let period = input.period;
        let format = this.format;
        let ema = new EMA({ period: period, values: [], format: (v) => { return v; } });
        let emaOfema = new EMA({ period: period, values: [], format: (v) => { return v; } });
        let emaOfemaOfema = new EMA({ period: period, values: [], format: (v) => { return v; } });
        let trixROC = new ROC({ period: 1, values: [], format: (v) => { return v; } });
        this.result = [];
        this.generator = (function* () {
            let tick = yield;
            while (true) {
                let initialema = ema.nextValue(tick);
                let smoothedResult = initialema ? emaOfema.nextValue(initialema) : undefined;
                let doubleSmoothedResult = smoothedResult ? emaOfemaOfema.nextValue(smoothedResult) : undefined;
                let result = doubleSmoothedResult ? trixROC.nextValue(doubleSmoothedResult) : undefined;
                tick = yield result ? format(result) : undefined;
            }
        })();
        this.generator.next();
        priceArray.forEach((tick) => {
            let result = this.generator.next(tick);
            if (result.value !== undefined) {
                this.result.push(result.value);
            }
        });
    }
    nextValue(price) {
        let nextResult = this.generator.next(price);
        if (nextResult.value !== undefined)
            return nextResult.value;
    }
    ;
}
TRIX.calculate = trix;
export function trix(input) {
    Indicator.reverseInputs(input);
    var result = new TRIX(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}
;
