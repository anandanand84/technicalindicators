import BearishEngulfingPattern from './BearishEngulfingPattern';
import BearishHarami from './BearishHarami';
import BearishHaramiCross from './BearishHaramiCross';
import EveningDojiStar from './EveningDojiStar';
import EveningStar from './EveningStar';
import BearishMarubozu from './BearishMarubozu';
import ThreeBlackCrows from './ThreeBlackCrows';
import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';

let bearishPatterns = [ new BearishEngulfingPattern(), new BearishHarami(), new BearishHaramiCross(), new EveningDojiStar(),
                        new EveningStar(), new BearishMarubozu(), new ThreeBlackCrows() ]

export default class BearishPatterns extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'Bearish Candlesticks';
    }

    hasPattern (data:StockData) {
        return bearishPatterns.reduce(function(state, pattern) {
            return state || pattern.hasPattern(data);
        }, false)
    }
}