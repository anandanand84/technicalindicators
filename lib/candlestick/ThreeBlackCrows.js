"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CandlestickFinder_1 = require("./CandlestickFinder");
class ThreeBlackCrows extends CandlestickFinder_1.default {
    constructor() {
        super();
        this.name = 'ThreeBlackCrows';
        this.requiredCount = 3;
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
        let thirddaysOpen = data.open[2];
        let thirddaysClose = data.close[2];
        let thirddaysHigh = data.high[2];
        let thirddaysLow = data.low[2];
        let isDownTrend = firstdaysLow > seconddaysLow &&
            seconddaysLow > thirddaysLow;
        let isAllBearish = firstdaysOpen > firstdaysClose &&
            seconddaysOpen > seconddaysClose &&
            thirddaysOpen > thirddaysClose;
        let doesOpenWithinPreviousBody = firstdaysOpen > seconddaysOpen &&
            seconddaysOpen > firstdaysClose &&
            seconddaysOpen > thirddaysOpen &&
            thirddaysOpen > seconddaysClose;
        return (isDownTrend && isAllBearish && doesOpenWithinPreviousBody);
    }
}
exports.default = ThreeBlackCrows;
function threeblackcrows(data) {
    return new ThreeBlackCrows().hasPattern(data);
}
exports.threeblackcrows = threeblackcrows;
//# sourceMappingURL=ThreeBlackCrows.js.map