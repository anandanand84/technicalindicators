"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CandlestickFinder_1 = require("./CandlestickFinder");
const Doji_1 = require("./Doji");
class AbandonedBaby extends CandlestickFinder_1.default {
    constructor() {
        super();
        this.name = 'AbandonedBaby';
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
        let isFirstBearish = firstdaysClose < firstdaysOpen;
        let dojiExists = new Doji_1.default().hasPattern({
            "open": [seconddaysOpen],
            "close": [seconddaysClose],
            "high": [seconddaysHigh],
            "low": [seconddaysLow]
        });
        let gapExists = ((seconddaysHigh < firstdaysLow) &&
            (thirddaysLow > seconddaysHigh) &&
            (thirddaysClose > thirddaysOpen));
        let isThirdBullish = (thirddaysHigh < firstdaysOpen);
        return (isFirstBearish && dojiExists && gapExists && isThirdBullish);
    }
}
exports.default = AbandonedBaby;
//# sourceMappingURL=AbandonedBaby.js.map