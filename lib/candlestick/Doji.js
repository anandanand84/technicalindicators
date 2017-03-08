"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CandlestickFinder_1 = require("./CandlestickFinder");
class Doji extends CandlestickFinder_1.default {
    constructor() {
        super();
        this.name = 'Doji';
        this.requiredCount = 1;
    }
    logic(data) {
        let daysOpen = data.open[0];
        let daysClose = data.close[0];
        return this.approximateEqual(daysOpen, daysClose);
    }
}
exports.default = Doji;
//# sourceMappingURL=Doji.js.map