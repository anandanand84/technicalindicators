"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BearishEngulfingPattern_1 = require("./BearishEngulfingPattern");
const BearishHarami_1 = require("./BearishHarami");
const BearishHaramiCross_1 = require("./BearishHaramiCross");
const EveningDojiStar_1 = require("./EveningDojiStar");
const EveningStar_1 = require("./EveningStar");
const BearishMarubozu_1 = require("./BearishMarubozu");
const ThreeBlackCrows_1 = require("./ThreeBlackCrows");
const CandlestickFinder_1 = require("./CandlestickFinder");
let bearishPatterns = [new BearishEngulfingPattern_1.default(), new BearishHarami_1.default(), new BearishHaramiCross_1.default(), new EveningDojiStar_1.default(),
    new EveningStar_1.default(), new BearishMarubozu_1.default(), new ThreeBlackCrows_1.default()];
class BearishPatterns extends CandlestickFinder_1.default {
    constructor() {
        super();
        this.name = 'Bearish Candlesticks';
    }
    hasPattern(data) {
        return bearishPatterns.reduce(function (state, pattern) {
            return state || pattern.hasPattern(data);
        }, false);
    }
}
exports.default = BearishPatterns;
function bearish(data) {
    return new BearishPatterns().hasPattern(data);
}
exports.bearish = bearish;
//# sourceMappingURL=Bearish.js.map