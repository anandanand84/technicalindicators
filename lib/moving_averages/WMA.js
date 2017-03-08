"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const indicator_1 = require("../indicator/indicator");
const LinkedList = require("linkedlist");
class WMA extends indicator_1.Indicator {
    constructor(input) {
        super(input);
        var period = input.period;
        var priceArray = input.values;
        this.result = [];
        this.generator = (function* () {
            let data = new LinkedList();
            let denominator = period * (period + 1) / 2;
            while (true) {
                if ((data.length) < period) {
                    data.push(yield);
                }
                else {
                    data.resetCursor();
                    let result = 0;
                    for (let i = 1; i <= period; i++) {
                        result = result + (data.next() * i / (denominator));
                    }
                    var next = yield result;
                    data.shift();
                    data.push(next);
                }
            }
        })();
        this.generator.next();
        priceArray.forEach((tick, index) => {
            var result = this.generator.next(tick);
            if (result.value) {
                this.result.push(this.format(result.value));
            }
        });
    }
    static calculate(input) {
        indicator_1.Indicator.reverseInputs(input);
        var result = new WMA(input).result;
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
exports.WMA = WMA;
;
//# sourceMappingURL=WMA.js.map