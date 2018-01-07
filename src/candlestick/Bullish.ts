import MorningStar from './MorningStar';
import BullishEngulfingPattern from './BullishEngulfingPattern';
import BullishHarami from './BullishHarami';
import BullishHaramiCross from './BullishHaramiCross';
import MorningDojiStar from './MorningDojiStar';
import DownsideTasukiGap from './DownsideTasukiGap';
import BullishMarubozu from './BullishMarubozu';
import PiercingLine from './PiercingLine';
import ThreeWhiteSoldiers from './ThreeWhiteSoldiers';
import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';

let bullishPatterns = [ new BullishEngulfingPattern(), new DownsideTasukiGap(), new BullishHarami(), new BullishHaramiCross(),
                        new MorningDojiStar(), new MorningStar(), new BullishMarubozu(), new PiercingLine(), new ThreeWhiteSoldiers() ]

export default class BullishPatterns extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'Bullish Candlesticks';
    }

    hasPattern (data:StockData) {
        return bullishPatterns.reduce(function(state, pattern) {
            return state || result;
        }, false)
    }
}

export function bullish(data:StockData) {
  return new BullishPatterns().hasPattern(data);
}
