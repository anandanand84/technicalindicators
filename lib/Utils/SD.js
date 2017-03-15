"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const indicator_1 = require("../indicator/indicator");
const SMA_1 = require("../moving_averages/SMA");
const FixedSizeLinkedList_1 = require("../Utils/FixedSizeLinkedList");
/**
 * Created by AAravindan on 5/7/16.
 */
"use strict";
class SDInput extends indicator_1.IndicatorInput {
}
exports.SDInput = SDInput;
;
class SD extends indicator_1.Indicator {
    constructor(input) {
        super(input);
        var period = input.period;
        var priceArray = input.values;
        var sma = new SMA_1.SMA({ period: period, values: [], format: (v) => { return v; } });
        this.result = [];
        this.generator = (function* () {
            var tick;
            var mean;
            var currentSet = new FixedSizeLinkedList_1.default(period);
            ;
            tick = yield;
            var sd;
            while (true) {
                currentSet.push(tick);
                mean = sma.nextValue(tick);
                if (mean) {
                    let sum = 0;
                    for (let x of currentSet.iterator()) {
                        sum = sum + (Math.pow((x - mean), 2));
                    }
                    sd = Math.sqrt(sum / (period));
                }
                tick = yield sd;
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
        var nextResult = this.generator.next(price);
        if (nextResult.value)
            return this.format(nextResult.value);
    }
    ;
}
SD.calculate = sd;
exports.SD = SD;
function sd(input) {
    indicator_1.Indicator.reverseInputs(input);
    var result = new SD(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    indicator_1.Indicator.reverseInputs(input);
    return result;
}
exports.sd = sd;
;
//# sourceMappingURL=SD.js.map