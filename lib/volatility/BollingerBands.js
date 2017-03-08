"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const indicator_1 = require("../indicator/indicator");
const SMA_1 = require("../moving_averages/SMA");
const SD_1 = require("../Utils/SD");
class BollingerBandsInput extends indicator_1.IndicatorInput {
}
exports.BollingerBandsInput = BollingerBandsInput;
;
class BollingerBandsOutput extends indicator_1.IndicatorInput {
}
exports.BollingerBandsOutput = BollingerBandsOutput;
;
class BollingerBands extends indicator_1.Indicator {
    constructor(input) {
        super(input);
        var period = input.period;
        var priceArray = input.values;
        var stdDev = input.stdDev;
        var format = this.format;
        var sma, sd;
        this.result = [];
        sma = new SMA_1.SMA({ period: period, values: [], format: (v) => { return v; } });
        sd = new SD_1.SD({ period: period, values: [], format: (v) => { return v; } });
        this.generator = (function* () {
            var result;
            var tick;
            var calcSMA;
            var calcsd;
            tick = yield;
            while (true) {
                calcSMA = sma.nextValue(tick);
                calcsd = sd.nextValue(tick);
                if (calcSMA) {
                    let middle = format(calcSMA);
                    let upper = format(calcSMA + (calcsd * stdDev));
                    let lower = format(calcSMA - (calcsd * stdDev));
                    let pb = format((tick - lower) / (upper - lower));
                    result = {
                        middle: middle,
                        upper: upper,
                        lower: lower,
                        pb: pb
                    };
                }
                tick = yield result;
            }
        })();
        this.generator.next();
        priceArray.forEach((tick) => {
            var result = this.generator.next(tick);
            if (result.value) {
                this.result.push(result.value);
            }
        });
    }
    static calculate(input) {
        indicator_1.Indicator.reverseInputs(input);
        var result = new BollingerBands(input).result;
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
exports.BollingerBands = BollingerBands;
//# sourceMappingURL=BollingerBands.js.map