"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const indicator_1 = require("../indicator/indicator");
class AvgGainInput extends indicator_1.IndicatorInput {
}
exports.AvgGainInput = AvgGainInput;
class AverageGain extends indicator_1.Indicator {
    constructor(input) {
        super(input);
        let values = input.values;
        let period = input.period;
        let format = this.format;
        this.generator = (function* (period) {
            var currentValue = yield;
            var counter = 1;
            var gainSum = 0;
            var avgGain;
            var gain;
            var lastValue;
            while (true) {
                gain = lastValue ? (currentValue - lastValue) : 0;
                gain = gain ? gain : 0;
                if (gain > 0) {
                    gainSum = gainSum + gain;
                }
                if (counter < (period + 1)) {
                    counter++;
                }
                else if (!avgGain) {
                    avgGain = gainSum / period;
                }
                else {
                    avgGain = ((avgGain * (period - 1)) + (gain > 0 ? gain : 0)) / period;
                }
                lastValue = currentValue;
                avgGain = avgGain ? format(avgGain) : undefined;
                currentValue = yield avgGain;
            }
        })(period);
        this.generator.next();
        this.result = [];
        values.forEach((tick) => {
            var result = this.generator.next(tick);
            if (result.value !== undefined) {
                this.result.push(result.value);
            }
        });
    }
    static calculate(input) {
        indicator_1.Indicator.reverseInputs(input);
        var result = new AverageGain(input).result;
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
exports.AverageGain = AverageGain;
//# sourceMappingURL=AverageGain.js.map