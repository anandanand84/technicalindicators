"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CandlestickFinder_1 = require("./CandlestickFinder");
class BullishSpinningTop extends CandlestickFinder_1.default {
    constructor() {
        super();
        this.name = 'BullishSpinningTop';
        this.requiredCount = 1;
    }
    logic(data) {
        let daysOpen = data.open[0];
        let daysClose = data.close[0];
        let daysHigh = data.high[0];
        let daysLow = data.low[0];
        let bodyLength = Math.abs(daysClose - daysOpen);
        let upperShadowLength = Math.abs(daysHigh - daysClose);
        let lowerShadowLength = Math.abs(daysOpen - daysLow);
        let isBullishSpinningTop = bodyLength < upperShadowLength &&
            bodyLength < lowerShadowLength;
        return isBullishSpinningTop;
    }
}
exports.default = BullishSpinningTop;
