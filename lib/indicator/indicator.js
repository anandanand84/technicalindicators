"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberFormatter_1 = require("../Utils/NumberFormatter");
class IndicatorInput {
}
exports.IndicatorInput = IndicatorInput;
class Indicator {
    constructor(input) {
        this.format = input.format || NumberFormatter_1.format;
    }
    static reverseInputs(input) {
        if (input.reversedInput) {
            input.values ? input.values.reverse() : undefined;
            input.open ? input.open.reverse() : undefined;
            input.high ? input.high.reverse() : undefined;
            input.low ? input.low.reverse() : undefined;
            input.close ? input.close.reverse() : undefined;
            input.volume ? input.volume.reverse() : undefined;
        }
    }
    getResult() {
        return this.result;
    }
}
exports.Indicator = Indicator;
