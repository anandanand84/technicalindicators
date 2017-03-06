"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CandlestickFinder_1 = require("./CandlestickFinder");
class GraveStoneDoji extends CandlestickFinder_1.default {
    constructor() {
        super();
        this.requiredCount = 1;
        this.name = 'GraveStoneDoji';
    }
    logic(data) {
        let daysOpen = data.open[0];
        let daysClose = data.close[0];
        let daysLow = data.low[0];
        let isOpenEqualsClose = this.approximateEqual(daysOpen, daysClose);
        let isLowEqualsOpen = this.approximateEqual(daysOpen, daysLow);
        return (isOpenEqualsClose && isLowEqualsOpen);
    }
}
exports.default = GraveStoneDoji;
