"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CandlestickFinder_1 = require("./CandlestickFinder");
class BearishSpinningTop extends CandlestickFinder_1.default {
    constructor() {
        super();
        this.name = 'BearishSpinningTop';
        this.requiredCount = 1;
    }
    logic(data) {
        let daysOpen = data.open[0];
        let daysClose = data.close[0];
        let daysHigh = data.high[0];
        let daysLow = data.low[0];
        let bodyLength = Math.abs(daysClose - daysOpen);
        let upperShadowLength = Math.abs(daysHigh - daysOpen);
        let lowerShadowLength = Math.abs(daysHigh - daysLow);
        let isBearishSpinningTop = bodyLength < upperShadowLength &&
            bodyLength < lowerShadowLength;
        return isBearishSpinningTop;
    }
}
exports.default = BearishSpinningTop;
//# sourceMappingURL=BearishSpinningTop.js.map