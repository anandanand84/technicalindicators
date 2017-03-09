"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MorningStar_1 = require("./MorningStar");
const BullishEngulfingPattern_1 = require("./BullishEngulfingPattern");
const BullishHarami_1 = require("./BullishHarami");
const BullishHaramiCross_1 = require("./BullishHaramiCross");
const MorningDojiStar_1 = require("./MorningDojiStar");
const DownsideTasukiGap_1 = require("./DownsideTasukiGap");
const BullishMarubozu_1 = require("./BullishMarubozu");
const PiercingLine_1 = require("./PiercingLine");
const ThreeWhiteSoldiers_1 = require("./ThreeWhiteSoldiers");
const CandlestickFinder_1 = require("./CandlestickFinder");
let bullishPatterns = [new BullishEngulfingPattern_1.default(), new DownsideTasukiGap_1.default(), new BullishHarami_1.default(), new BullishHaramiCross_1.default(),
    new MorningDojiStar_1.default(), new MorningStar_1.default(), new BullishMarubozu_1.default(), new PiercingLine_1.default(), new ThreeWhiteSoldiers_1.default()];
class BullishPatterns extends CandlestickFinder_1.default {
    constructor() {
        super();
        this.name = 'Bullish Candlesticks';
    }
    hasPattern(data) {
        return bullishPatterns.reduce(function (state, pattern) {
            let result = pattern.hasPattern(data);
            if (result) {
                console.log('Matched pattern ', pattern.name);
            }
            return state || result;
        }, false);
    }
}
exports.default = BullishPatterns;
function bullish(data) {
    return new BullishPatterns().hasPattern(data);
}
exports.bullish = bullish;
//# sourceMappingURL=Bullish.js.map