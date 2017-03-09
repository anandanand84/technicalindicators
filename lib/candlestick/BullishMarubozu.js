"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CandlestickFinder_1 = require("./CandlestickFinder");
class BullishMarubozu extends CandlestickFinder_1.default {
    constructor() {
        super();
        this.name = 'BullishMarubozu';
        this.requiredCount = 1;
    }
    logic(data) {
        let daysOpen = data.open[0];
        let daysClose = data.close[0];
        let daysHigh = data.high[0];
        let daysLow = data.low[0];
        let isBullishMarbozu = this.approximateEqual(daysClose, daysHigh) &&
            this.approximateEqual(daysLow, daysOpen) &&
            daysOpen < daysClose &&
            daysOpen < daysHigh;
        return (isBullishMarbozu);
    }
}
exports.default = BullishMarubozu;
function bullishmarubozu(data) {
    return new BullishMarubozu().hasPattern(data);
}
exports.bullishmarubozu = bullishmarubozu;
//# sourceMappingURL=BullishMarubozu.js.map