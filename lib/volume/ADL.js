"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const indicator_1 = require("../indicator/indicator");
class ADLInput extends indicator_1.IndicatorInput {
}
exports.ADLInput = ADLInput;
class ADL extends indicator_1.Indicator {
    constructor(input) {
        super(input);
        var highs = input.high;
        var lows = input.low;
        var closes = input.close;
        var volumes = input.volume;
        if (!((lows.length === highs.length) && (highs.length === closes.length) && (highs.length === volumes.length))) {
            throw ('Inputs(low,high, close, volumes) not of equal size');
        }
        this.result = [];
        this.generator = (function* () {
            var result = 0;
            var tick;
            tick = yield;
            while (true) {
                let moneyFlowMultiplier = ((tick.close - tick.low) - (tick.high - tick.close)) / (tick.high - tick.low);
                let moneyFlowVolume = moneyFlowMultiplier * tick.volume;
                result = result + moneyFlowVolume;
                tick = yield Math.round(result);
            }
        })();
        this.generator.next();
        highs.forEach((tickHigh, index) => {
            var tickInput = {
                high: tickHigh,
                low: lows[index],
                close: closes[index],
                volume: volumes[index]
            };
            var result = this.generator.next(tickInput);
            if (result.value) {
                this.result.push(result.value);
            }
        });
    }
    ;
    static calculate(input) {
        indicator_1.Indicator.reverseInputs(input);
        var result = new ADL(input).result;
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
exports.ADL = ADL;
//# sourceMappingURL=ADL.js.map