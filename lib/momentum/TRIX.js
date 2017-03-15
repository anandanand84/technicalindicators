/**
 * Created by AAravindan on 5/9/16.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ROC_js_1 = require("./ROC.js");
const EMA_js_1 = require("../moving_averages/EMA.js");
const indicator_1 = require("../indicator/indicator");
class TRIXInput extends indicator_1.IndicatorInput {
}
exports.TRIXInput = TRIXInput;
;
class TRIX extends indicator_1.Indicator {
    constructor(input) {
        super(input);
        let priceArray = input.values;
        let period = input.period;
        let format = this.format;
        let ema = new EMA_js_1.EMA({ period: period, values: [], format: (v) => { return v; } });
        let emaOfema = new EMA_js_1.EMA({ period: period, values: [], format: (v) => { return v; } });
        let emaOfemaOfema = new EMA_js_1.EMA({ period: period, values: [], format: (v) => { return v; } });
        let trixROC = new ROC_js_1.ROC({ period: 1, values: [], format: (v) => { return v; } });
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
exports.TRIX = TRIX;
function trix(input) {
    indicator_1.Indicator.reverseInputs(input);
    var result = new TRIX(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    indicator_1.Indicator.reverseInputs(input);
    return result;
}
exports.trix = trix;
;
//# sourceMappingURL=TRIX.js.map