"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Doji_1 = require("./Doji");
const CandlestickFinder_1 = require("./CandlestickFinder");
class MorningDojiStar extends CandlestickFinder_1.default {
    constructor() {
        super();
        this.name = 'MorningDojiStar';
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
        let dojiExists = new Doji_1.default().hasPattern({
            "open": [seconddaysOpen],
            "close": [seconddaysClose],
            "high": [seconddaysHigh],
            "low": [seconddaysLow]
        });
        let isThirdBullish = thirddaysOpen < thirddaysClose;
        let gapExists = ((seconddaysHigh < firstdaysLow) &&
            (seconddaysLow < firstdaysLow) &&
            (thirddaysOpen > seconddaysHigh) &&
            (seconddaysClose < thirddaysOpen));
        let doesCloseAboveFirstMidpoint = thirddaysClose > firstdaysMidpoint;
        return (isFirstBearish && dojiExists && isThirdBullish && gapExists &&
            doesCloseAboveFirstMidpoint);
    }
}
exports.default = MorningDojiStar;
//# sourceMappingURL=MorningDojiStar.js.map