"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CandlestickFinder_1 = require("./CandlestickFinder");
class DragonFlyDoji extends CandlestickFinder_1.default {
    constructor() {
        super();
        this.requiredCount = 1;
        this.name = 'DragonFlyDoji';
    }
    logic(data) {
        let daysOpen = data.open[0];
        let daysClose = data.close[0];
        let daysHigh = data.high[0];
        let isOpenEqualsClose = this.approximateEqual(daysOpen, daysClose);
        let isHighEqualsOpen = this.approximateEqual(daysOpen, daysHigh);
        return (isOpenEqualsClose && isHighEqualsOpen);
    }
}
exports.default = DragonFlyDoji;
function dragonflydoji(data) {
    return new DragonFlyDoji().hasPattern(data);
}
exports.dragonflydoji = dragonflydoji;
//# sourceMappingURL=DragonFlyDoji.js.map