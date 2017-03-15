"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const indicator_1 = require("../indicator/indicator");
/**
 * Created by AAravindan on 5/8/16.
 */
"use strict";
class MDMInput extends indicator_1.IndicatorInput {
}
exports.MDMInput = MDMInput;
;
class MDM extends indicator_1.Indicator {
    constructor(input) {
        super(input);
        var lows = input.low;
        var highs = input.high;
        var format = this.format;
        if (lows.length != highs.length) {
            throw ('Inputs(low,high) not of equal size');
        }
        this.result = [];
        this.generator = (function* () {
            var minusDm;
            var current = yield;
            var last;
            while (true) {
                if (last) {
                    let upMove = (current.high - last.high);
                    let downMove = (last.low - current.low);
                    minusDm = format((downMove > upMove && downMove > 0) ? downMove : 0);
                }
                last = current;
                current = yield minusDm;
            }
        })();
        this.generator.next();
        lows.forEach((tick, index) => {
            var result = this.generator.next({
                high: highs[index],
                low: lows[index]
            });
            if (result.value !== undefined)
                this.result.push(result.value);
        });
    }
    ;
    static calculate(input) {
        indicator_1.Indicator.reverseInputs(input);
        var result = new MDM(input).result;
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
exports.MDM = MDM;
//# sourceMappingURL=MinusDM.js.map