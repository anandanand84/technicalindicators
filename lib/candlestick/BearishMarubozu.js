"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CandlestickFinder_1 = require("./CandlestickFinder");
class BearishMarubozu extends CandlestickFinder_1.default {
    constructor() {
        super();
        this.name = 'BearishMarubozu';
        this.requiredCount = 1;
    }
    logic(data) {
        let daysOpen = data.open[0];
        let daysClose = data.close[0];
        let daysHigh = data.high[0];
        let daysLow = data.low[0];
        let isBearishMarbozu = this.approximateEqual(daysOpen, daysHigh) &&
            this.approximateEqual(daysLow, daysClose) &&
            daysOpen > daysClose &&
            daysOpen > daysLow;
        return (isBearishMarbozu);
    }
}
exports.default = BearishMarubozu;
