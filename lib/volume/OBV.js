"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const indicator_1 = require("../indicator/indicator");
"use strict";
class OBVInput extends indicator_1.IndicatorInput {
}
exports.OBVInput = OBVInput;
class OBV extends indicator_1.Indicator {
    constructor(input) {
        super(input);
        var closes = input.close;
        var volumes = input.volume;
        this.result = [];
        this.generator = (function* () {
            var result = 0;
            var tick;
            var lastClose;
            tick = yield;
            if (tick.close && (typeof tick.close === 'number')) {
                lastClose = tick.close;
                tick = yield;
            }
            while (true) {
                if (lastClose < tick.close) {
                    result = result + tick.volume;
                }
                else if (tick.close < lastClose) {
                    result = result - tick.volume;
                }
                lastClose = tick.close;
                tick = yield result;
            }
        })();
        this.generator.next();
        closes.forEach((close, index) => {
            let tickInput = {
                close: closes[index],
                volume: volumes[index]
            };
            let result = this.generator.next(tickInput);
            if (result.value) {
                this.result.push(result.value);
            }
        });
    }
    static calculate(input) {
        indicator_1.Indicator.reverseInputs(input);
        var result = new OBV(input).result;
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
exports.OBV = OBV;
//# sourceMappingURL=OBV.js.map