"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const indicator_1 = require("../indicator/indicator");
const AverageGain_1 = require("../Utils/AverageGain");
const AverageLoss_1 = require("../Utils/AverageLoss");
class RSIInput extends indicator_1.IndicatorInput {
}
exports.RSIInput = RSIInput;
class RSI extends indicator_1.Indicator {
    constructor(input) {
        super(input);
        var period = input.period;
        var values = input.values;
        var GainProvider = new AverageGain_1.AverageGain({ period: period, values: [] });
        var LossProvider = new AverageLoss_1.AverageLoss({ period: period, values: [] });
        this.generator = (function* (period) {
            var current = yield;
            var lastAvgGain, lastAvgLoss, RS, currentRSI;
            while (true) {
                lastAvgGain = GainProvider.nextValue(current);
                lastAvgLoss = LossProvider.nextValue(current);
                if (lastAvgGain && lastAvgLoss) {
                    if (lastAvgLoss === 0) {
                        currentRSI = 100;
                    }
                    else {
                        RS = lastAvgGain / lastAvgLoss;
                        currentRSI = parseFloat((100 - (100 / (1 + RS))).toFixed(2));
                    }
                }
                current = yield currentRSI;
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
    ;
    nextValue(price) {
        return this.generator.next(price).value;
    }
    ;
}
RSI.calculate = rsi;
exports.RSI = RSI;
function rsi(input) {
    indicator_1.Indicator.reverseInputs(input);
    var result = new RSI(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    indicator_1.Indicator.reverseInputs(input);
    return result;
}
exports.rsi = rsi;
;
//# sourceMappingURL=RSI.js.map