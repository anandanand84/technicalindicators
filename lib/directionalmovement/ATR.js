"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const indicator_1 = require("../indicator/indicator");
"use strict";
const WEMA_1 = require("../moving_averages/WEMA");
const TrueRange_1 = require("./TrueRange");
class ATRInput extends indicator_1.IndicatorInput {
}
exports.ATRInput = ATRInput;
;
class ATR extends indicator_1.Indicator {
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
        var trueRange = new TrueRange_1.TrueRange({
            low: [],
            high: [],
            close: []
        });
        var wema = new WEMA_1.WEMA({ period: period, values: [], format: (v) => { return v; } });
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
    static calculate(input) {
        indicator_1.Indicator.reverseInputs(input);
        var result = new ATR(input).result;
        if (input.reversedInput) {
            result.reverse();
        }
        indicator_1.Indicator.reverseInputs(input);
        return result;
    }
    ;
    nextValue(price) {
        return this.generator.next(price).value;
    }
    ;
}
exports.ATR = ATR;
//# sourceMappingURL=ATR.js.map