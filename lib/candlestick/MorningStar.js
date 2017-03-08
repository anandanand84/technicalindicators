"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CandlestickFinder_1 = require("./CandlestickFinder");
class MorningStar extends CandlestickFinder_1.default {
    constructor() {
        super();
        this.name = 'MorningStar';
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
        let firstdaysMidpoint = ((firstdaysOpen + firstdaysClose) / 2);
        let isFirstBearish = firstdaysClose < firstdaysOpen;
        let isSmallBodyExists = ((firstdaysLow > seconddaysLow) &&
            (firstdaysLow > seconddaysHigh));
        let isThirdBullish = thirddaysOpen < thirddaysClose;
        let gapExists = ((seconddaysHigh < firstdaysLow) &&
            (seconddaysLow < firstdaysLow) &&
            (thirddaysOpen > seconddaysHigh) &&
            (seconddaysClose < thirddaysOpen));
        let doesCloseAboveFirstMidpoint = thirddaysClose > firstdaysMidpoint;
        return (isFirstBearish && isSmallBodyExists && gapExists && isThirdBullish && doesCloseAboveFirstMidpoint);
    }
}
exports.default = MorningStar;
//# sourceMappingURL=MorningStar.js.map