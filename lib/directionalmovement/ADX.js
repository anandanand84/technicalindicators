"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const indicator_1 = require("../indicator/indicator");
const MinusDM_1 = require("./MinusDM");
const PlusDM_1 = require("./PlusDM");
const TrueRange_1 = require("./TrueRange");
const SMA_1 = require("../moving_averages/SMA");
const WEMA_1 = require("../moving_averages/WEMA");
class ADXInput extends indicator_1.IndicatorInput {
}
exports.ADXInput = ADXInput;
;
class ADX extends indicator_1.Indicator {
    constructor(input) {
        super(input);
        var lows = input.low;
        var highs = input.high;
        var closes = input.close;
        var period = input.period;
        var format = this.format;
        var plusDM = new PlusDM_1.PDM({
            high: [],
            low: []
        });
        var minusDM = new MinusDM_1.MDM({
            high: [],
            low: []
        });
        var emaPDM = new WEMA_1.WEMA({ period: period, values: [], format: (v) => { return v; } });
        var emaMDM = new WEMA_1.WEMA({ period: period, values: [], format: (v) => { return v; } });
        var emaTR = new WEMA_1.WEMA({ period: period, values: [], format: (v) => { return v; } });
        var smaDX = new SMA_1.SMA({ period: period, values: [], format: (v) => { return v; } });
        var tr = new TrueRange_1.TrueRange({
            low: [],
            high: [],
            close: [],
        });
        if (!((lows.length === highs.length) && (highs.length === closes.length))) {
            throw ('Inputs(low,high, close) not of equal size');
        }
        this.result = [];
        this.generator = (function* () {
            var tick = yield;
            var index = 0;
            var lastATR, lastAPDM, lastAMDM, lastPDI, lastMDI, lastDX, smoothedDX;
            lastATR = 0;
            lastAPDM = 0;
            lastAMDM = 0;
            while (true) {
                let calcTr = tr.nextValue(tick);
                let calcPDM = plusDM.nextValue(tick);
                calcPDM = calcPDM ? calcPDM : 0;
                let calcMDM = minusDM.nextValue(tick);
                calcMDM = calcMDM ? calcMDM : 0;
                if (calcTr !== undefined) {
                    if (index < period) {
                        lastATR = lastATR + calcTr;
                        lastAPDM = lastAPDM + calcPDM;
                        lastAMDM = lastAMDM + calcMDM;
                        index++;
                        tick = yield;
                        continue;
                    }
                    else if (index === period) {
                        lastPDI = (lastAPDM) * 100 / lastATR;
                        lastMDI = (lastAMDM) * 100 / lastATR;
                        index++;
                    }
                    else {
                        lastATR = (lastATR - (lastATR / period)) + calcTr;
                        lastAPDM = (lastAPDM - (lastAPDM / period)) + calcPDM;
                        lastAMDM = (lastAMDM - (lastAMDM / period)) + calcMDM;
                        lastPDI = (lastAPDM) * 100 / lastATR;
                        lastMDI = (lastAMDM) * 100 / lastATR;
                    }
                    lastDX = (Math.abs(lastPDI - lastMDI) / (lastPDI + lastMDI)) * 100;
                    if (!smoothedDX) {
                        smoothedDX = smaDX.nextValue(lastDX);
                    }
                    else {
                        smoothedDX = ((smoothedDX * (period - 1)) + lastDX) / period;
                    }
                }
                tick = yield smoothedDX;
            }
        })();
        this.generator.next();
        lows.forEach((tick, index) => {
            var result = this.generator.next({
                high: highs[index],
                low: lows[index],
                close: closes[index]
            });
            if (result.value) {
                this.result.push(format(result.value));
            }
        });
    }
    ;
    static calculate(input) {
        indicator_1.Indicator.reverseInputs(input);
        var result = new ADX(input).result;
        if (input.reversedInput) {
            result.reverse();
        }
        indicator_1.Indicator.reverseInputs(input);
        return result;
    }
    ;
    nextValue(price) {
        let result = this.generator.next(price).value;
        if (result) {
            return this.format(result);
        }
    }
    ;
}
exports.ADX = ADX;
//# sourceMappingURL=ADX.js.map