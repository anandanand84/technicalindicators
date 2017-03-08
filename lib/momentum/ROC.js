"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const indicator_1 = require("../indicator/indicator");
const FixedSizeLinkedList_1 = require("../Utils/FixedSizeLinkedList");
class ROCInput extends indicator_1.IndicatorInput {
}
exports.ROCInput = ROCInput;
class ROC extends indicator_1.Indicator {
    constructor(input) {
        super(input);
        var period = input.period;
        var priceArray = input.values;
        this.result = [];
        this.generator = (function* () {
            let index = 1;
            var pastPeriods = new FixedSizeLinkedList_1.default(period);
            ;
            var tick = yield;
            var roc;
            while (true) {
                pastPeriods.push(tick);
                if (index < period) {
                    index++;
                }
                else {
                    roc = ((tick - pastPeriods.lastShift) / (pastPeriods.lastShift)) * 100;
                }
                tick = yield roc;
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
    static calculate(input) {
        indicator_1.Indicator.reverseInputs(input);
        var result = new ROC(input).result;
        if (input.reversedInput) {
            result.reverse();
        }
        indicator_1.Indicator.reverseInputs(input);
        return result;
    }
    ;
    nextValue(price) {
        var nextResult = this.generator.next(price);
        if (nextResult.value)
            return this.format(nextResult.value);
    }
    ;
}
exports.ROC = ROC;
;
