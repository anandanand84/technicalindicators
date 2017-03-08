"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const indicator_1 = require("../indicator/indicator");
const SMA_1 = require("./SMA");
class EMA extends indicator_1.Indicator {
    constructor(input) {
        super(input);
        var period = input.period;
        var priceArray = input.values;
        var exponent = (2 / (period + 1));
        var sma;
        this.result = [];
        sma = new SMA_1.SMA({ period: period, values: [] });
        var genFn = (function* () {
            var tick = yield;
            var prevEma;
            while (true) {
                if (prevEma && tick) {
                    prevEma = ((tick - prevEma) * exponent) + prevEma;
                    tick = yield prevEma;
                }
                else {
                    tick = yield;
                    prevEma = sma.nextValue(tick);
                    if (prevEma)
                        tick = yield prevEma;
                }
            }
        });
        this.generator = genFn();
        this.generator.next();
        this.generator.next();
        priceArray.forEach((tick) => {
            var result = this.generator.next(tick);
            if (result.value) {
                this.result.push(this.format(result.value));
            }
        });
    }
    static calculate(input) {
        indicator_1.Indicator.reverseInputs(input);
        var result = new EMA(input).result;
        if (input.reversedInput) {
            result.reverse();
        }
        indicator_1.Indicator.reverseInputs(input);
        return result;
    }
    nextValue(price) {
        var result = this.generator.next(price).value;
        if (result)
            return this.format(result);
    }
    ;
}
exports.EMA = EMA;
//# sourceMappingURL=EMA.js.map