let CandlestickFinder          = require('./CandlestickFinder.js');
let BearishEngulfingPattern    = require('./BearishEngulfingPattern.js');
let BearishHarami              = require('./BearishHarami');
let BearishHaramiCross         = require('./BearishHaramiCross');
let EveningDojiStar            = require('./EveningDojiStar');
let EveningStar                = require('./EveningStar');
let BearishMarubozu            = require('./BearishMarubozu');
let BearishSpinningTop         = require('./BearishSpinningTop');
let ThreeBlackCrows            = require('./ThreeBlackCrows');

let bearishPatterns = [ new BearishEngulfingPattern(), new BearishHarami(), new BearishHaramiCross(), new EveningDojiStar(),
                        new EveningStar(), new BearishMarubozu(), new ThreeBlackCrows() ]

class BearishPatterns extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'Bearish Candlesticks';
    }

    hasPattern (data) {
        return bearishPatterns.reduce(function(state, pattern) {
            return state || pattern.hasPattern(data);
        }, false)
    }
}

module.exports = BearishPatterns;