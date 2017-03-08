"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CandlestickFinder_1 = require("./CandlestickFinder");
class DarkCloudCover extends CandlestickFinder_1.default {
    constructor() {
        super();
        this.name = 'DarkCloudCover';
        this.requiredCount = 2;
    }
    logic(data) {
        let firstdaysOpen = data.open[0];
        let firstdaysClose = data.close[0];
        let firstdaysHigh = data.high[0];
        let firstdaysLow = data.low[0];
        let seconddaysOpen = data.open[1];
        let seconddaysClose = data.close[1];
        let seconddaysHigh = data.high[1];
        let seconddaysLow = data.low[1];
        let firstdayMidpoint = ((firstdaysClose + firstdaysOpen) / 2);
        let isFirstBullish = firstdaysClose > firstdaysOpen;
        let isSecondBearish = seconddaysClose < seconddaysOpen;
        let isDarkCloudPattern = ((seconddaysOpen > firstdaysHigh) &&
            (seconddaysClose < firstdayMidpoint) &&
            (seconddaysClose > firstdaysOpen));
        return (isFirstBullish && isSecondBearish && isDarkCloudPattern);
    }
}
exports.default = DarkCloudCover;
//# sourceMappingURL=DarkCloudCover.js.map