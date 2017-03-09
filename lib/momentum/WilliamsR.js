"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const indicator_1 = require("../indicator/indicator");
const FixedSizeLinkedList_1 = require("../Utils/FixedSizeLinkedList");
class WilliamsRInput extends indicator_1.IndicatorInput {
}
exports.WilliamsRInput = WilliamsRInput;
;
class WilliamsR extends indicator_1.Indicator {
    constructor(input) {
        super(input);
        let lows = input.low;
        let highs = input.high;
        let closes = input.close;
        let period = input.period;
        let format = this.format;
        if (!((lows.length === highs.length) && (highs.length === closes.length))) {
            throw ('Inputs(low,high, close) not of equal size');
        }
        this.result = [];
        this.generator = (function* () {
            let index = 1;
            let pastHighPeriods = new FixedSizeLinkedList_1.default(period, true, false);
            let pastLowPeriods = new FixedSizeLinkedList_1.default(period, false, true);
            let periodLow;
            let periodHigh;
            var tick = yield;
            let williamsR;
            while (true) {
                pastHighPeriods.push(tick.high);
                pastLowPeriods.push(tick.low);
                if (index < period) {
                    index++;
                    tick = yield;
                    continue;
                }
                periodLow = pastLowPeriods.periodLow;
                periodHigh = pastHighPeriods.periodHigh;
                williamsR = format((periodHigh - tick.close) / (periodHigh - periodLow) * -100);
                tick = yield williamsR;
            }
        })();
        this.generator.next();
        lows.forEach((low, index) => {
            var result = this.generator.next({
                high: highs[index],
                low: lows[index],
                close: closes[index]
            });
            if (result.value !== undefined) {
                this.result.push(result.value);
            }
        });
    }
    ;
    nextValue(price) {
        var nextResult = this.generator.next(price);
        if (nextResult.value)
            return this.format(nextResult.value);
    }
    ;
}
WilliamsR.calculate = williamsr;
exports.WilliamsR = WilliamsR;
function williamsr(input) {
    indicator_1.Indicator.reverseInputs(input);
    var result = new WilliamsR(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    indicator_1.Indicator.reverseInputs(input);
    return result;
}
exports.williamsr = williamsr;
;
//# sourceMappingURL=WilliamsR.js.map