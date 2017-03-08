"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const indicator_1 = require("../indicator/indicator");
"use strict";
const FixedSizeLinkedList_1 = require("../Utils/FixedSizeLinkedList");
const SMA_1 = require("../moving_averages/SMA");
class StochasticInput extends indicator_1.IndicatorInput {
}
exports.StochasticInput = StochasticInput;
;
class StochasticOutput {
}
exports.StochasticOutput = StochasticOutput;
;
class Stochastic extends indicator_1.Indicator {
    constructor(input) {
        super(input);
        let lows = input.low;
        let highs = input.high;
        let closes = input.close;
        let period = input.period;
        let signalPeriod = input.signalPeriod;
        let format = this.format;
        if (!((lows.length === highs.length) && (highs.length === closes.length))) {
            throw ('Inputs(low,high, close) not of equal size');
        }
        this.result = [];
        this.generator = (function* () {
            let index = 1;
            let pastHighPeriods = new FixedSizeLinkedList_1.default(period, true, false);
            let pastLowPeriods = new FixedSizeLinkedList_1.default(period, false, true);
            let dSma = new SMA_1.SMA({
                period: signalPeriod,
                values: [],
                format: (v) => { return v; }
            });
            let k, d;
            var tick = yield;
            while (true) {
                pastHighPeriods.push(tick.high);
                pastLowPeriods.push(tick.low);
                if (index < period) {
                    index++;
                    tick = yield;
                    continue;
                }
                let periodLow = pastLowPeriods.periodLow;
                k = (tick.close - periodLow) / (pastHighPeriods.periodHigh - periodLow) * 100;
                d = dSma.nextValue(k);
                tick = yield {
                    k: format(k),
                    d: d ? format(d) : undefined
                };
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
                this.result.push(result.value);
            }
        });
    }
    ;
    static calculate(input) {
        indicator_1.Indicator.reverseInputs(input);
        var result = new Stochastic(input).result;
        if (input.reversedInput) {
            result.reverse();
        }
        indicator_1.Indicator.reverseInputs(input);
        return result;
    }
    ;
    nextValue(input) {
        let nextResult = this.generator.next(input);
        if (nextResult.value !== undefined)
            return nextResult.value;
    }
    ;
}
exports.Stochastic = Stochastic;
//# sourceMappingURL=Stochastic.js.map