"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//TODO; THis is copied from EMA for checking if WEMA works correctly, we need to refactor if this works good.
const indicator_1 = require("../indicator/indicator");
const SMA_1 = require("./SMA");
class WEMA extends indicator_1.Indicator {
    constructor(input) {
        super(input);
        var period = input.period;
        var priceArray = input.values;
        var sma;
        this.result = [];
        sma = new SMA_1.SMA({ period: period, values: [], format: (v) => { return v; } });
        this.generator = (function* () {
            var tick = yield;
            var prevMa, currentMa;
            while (true) {
                if (prevMa === undefined) {
                    currentMa = sma.nextValue(tick);
                }
                else {
                    currentMa = ((prevMa * (period - 1)) + tick) / period;
                }
                prevMa = currentMa;
                tick = yield currentMa;
            }
        })();
        this.generator.next();
        priceArray.forEach((tick) => {
            var result = this.generator.next(tick);
            if (result.value) {
                this.result.push(this.format(result.value));
            }
        });
    }
    nextValue(price) {
        var result = this.generator.next(price).value;
        if (result)
            return this.format(result);
    }
    ;
}
WEMA.calculate = wema;
exports.WEMA = WEMA;
;
function wema(input) {
    indicator_1.Indicator.reverseInputs(input);
    var result = new WEMA(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    indicator_1.Indicator.reverseInputs(input);
    return result;
}
exports.wema = wema;
//# sourceMappingURL=WEMA.js.map