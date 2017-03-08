"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const indicator_1 = require("../indicator/indicator");
const SMA_1 = require("../moving_averages/SMA");
const ROC_1 = require("./ROC");
class KSTInput extends indicator_1.IndicatorInput {
}
exports.KSTInput = KSTInput;
class KSTOutput {
}
exports.KSTOutput = KSTOutput;
class KST extends indicator_1.Indicator {
    constructor(input) {
        super(input);
        let priceArray = input.values;
        let rocPer1 = input.ROCPer1;
        let rocPer2 = input.ROCPer2;
        let rocPer3 = input.ROCPer3;
        let rocPer4 = input.ROCPer4;
        let smaPer1 = input.SMAROCPer1;
        let smaPer2 = input.SMAROCPer2;
        let smaPer3 = input.SMAROCPer3;
        let smaPer4 = input.SMAROCPer4;
        let signalPeriod = input.signalPeriod;
        let roc1 = new ROC_1.ROC({ period: rocPer1, values: [] });
        let roc2 = new ROC_1.ROC({ period: rocPer2, values: [] });
        let roc3 = new ROC_1.ROC({ period: rocPer3, values: [] });
        let roc4 = new ROC_1.ROC({ period: rocPer4, values: [] });
        let sma1 = new SMA_1.SMA({ period: smaPer1, values: [], format: (v) => { return v; } });
        let sma2 = new SMA_1.SMA({ period: smaPer2, values: [], format: (v) => { return v; } });
        let sma3 = new SMA_1.SMA({ period: smaPer3, values: [], format: (v) => { return v; } });
        let sma4 = new SMA_1.SMA({ period: smaPer4, values: [], format: (v) => { return v; } });
        let signalSMA = new SMA_1.SMA({ period: signalPeriod, values: [], format: (v) => { return v; } });
        var format = this.format;
        this.result = [];
        let firstResult = Math.max(rocPer1 + smaPer1, rocPer2 + smaPer2, rocPer3 + smaPer3, rocPer4 + smaPer4);
        this.generator = (function* () {
            let index = 1;
            let tick = yield;
            let kst;
            let RCMA1, RCMA2, RCMA3, RCMA4, signal, result;
            while (true) {
                let roc1Result = roc1.nextValue(tick);
                let roc2Result = roc2.nextValue(tick);
                let roc3Result = roc3.nextValue(tick);
                let roc4Result = roc4.nextValue(tick);
                RCMA1 = (roc1Result !== undefined) ? sma1.nextValue(roc1Result) : undefined;
                RCMA2 = (roc2Result !== undefined) ? sma2.nextValue(roc2Result) : undefined;
                RCMA3 = (roc3Result !== undefined) ? sma3.nextValue(roc3Result) : undefined;
                RCMA4 = (roc4Result !== undefined) ? sma4.nextValue(roc4Result) : undefined;
                if (index < firstResult) {
                    index++;
                }
                else {
                    kst = (RCMA1 * 1) + (RCMA2 * 2) + (RCMA3 * 3) + (RCMA4 * 4);
                }
                signal = (kst !== undefined) ? signalSMA.nextValue(kst) : undefined;
                result = kst !== undefined ? {
                    kst: format(kst),
                    signal: signal ? format(signal) : undefined
                } : undefined;
                tick = yield result;
            }
        })();
        this.generator.next();
        priceArray.forEach((tick) => {
            let result = this.generator.next(tick);
            if (result.value !== undefined) {
                this.result.push(result.value);
            }
        });
    }
    ;
    static calculate(input) {
        indicator_1.Indicator.reverseInputs(input);
        var result = new KST(input).result;
        if (input.reversedInput) {
            result.reverse();
        }
        indicator_1.Indicator.reverseInputs(input);
        return result;
    }
    ;
    nextValue(price) {
        let nextResult = this.generator.next(price);
        if (nextResult.value !== undefined)
            return nextResult.value;
    }
    ;
}
exports.KST = KST;
//# sourceMappingURL=KST.js.map