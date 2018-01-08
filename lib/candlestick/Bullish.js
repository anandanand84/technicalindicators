import MorningStar from './MorningStar';
import BullishEngulfingPattern from './BullishEngulfingPattern';
import BullishHarami from './BullishHarami';
import BullishHaramiCross from './BullishHaramiCross';
import MorningDojiStar from './MorningDojiStar';
import DownsideTasukiGap from './DownsideTasukiGap';
import BullishMarubozu from './BullishMarubozu';
import PiercingLine from './PiercingLine';
import ThreeWhiteSoldiers from './ThreeWhiteSoldiers';
import CandlestickFinder from './CandlestickFinder';
let bullishPatterns = [new BullishEngulfingPattern(), new DownsideTasukiGap(), new BullishHarami(), new BullishHaramiCross(),
    new MorningDojiStar(), new MorningStar(), new BullishMarubozu(), new PiercingLine(), new ThreeWhiteSoldiers()];
export default class BullishPatterns extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'Bullish Candlesticks';
    }
    hasPattern(data) {
        return bullishPatterns.reduce(function (state, pattern) {
            let result = pattern.hasPattern(data);
            return state || result;
        }, false);
    }
}
export function bullish(data) {
    return new BullishPatterns().hasPattern(data);
}
//# sourceMappingURL=Bullish.js.map