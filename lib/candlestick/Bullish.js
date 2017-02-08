let CandlestickFinder          = require('./CandlestickFinder.js');
let BullishEngulfingPattern    = require('./BullishEngulfingPattern.js');
let DownsideTasukiGap          = require('./DownsideTasukiGap.js');
let BullishHarami              = require('./BullishHarami');
let BullishHaramiCross         = require('./BullishHaramiCross');
let MorningDojiStar            = require('./MorningDojiStar');
let MorningStar                = require('./MorningStar');
let BullishMarubozu            = require('./BullishMarubozu');
let PiercingLine               = require('./PiercingLine');
let BullishSpinningTop         = require('./BullishSpinningTop');
let ThreeWhiteSoldiers         = require('./ThreeWhiteSoldiers');

let bullishPatterns = [ new BullishEngulfingPattern(), new DownsideTasukiGap(), new BullishHarami(), new BullishHaramiCross(),
                        new MorningDojiStar(), new MorningStar(), new BullishMarubozu(), new PiercingLine(), new ThreeWhiteSoldiers() ]

class BullishPatterns extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'Bullish Candlesticks';
    }

    hasPattern (data) {
        return bullishPatterns.reduce(function(state, pattern) {
            let result = pattern.hasPattern(data);
            if(result) {
                console.log('Matched pattern ', pattern.name);
            }
            return state || result;
        }, false)
    }
}

module.exports = BullishPatterns;