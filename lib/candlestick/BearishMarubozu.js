const CandlestickFinder = require('./CandlestickFinder.js');

class BearishMarubozu extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'BearishMarubozu';
        this.requiredCount  = 1;
    }
    logic (data) {
        let daysOpen  = data.open[0];
        let daysClose = data.close[0];
        let daysHigh  = data.high[0];
        let daysLow   = data.low[0];

        let isBearishMarbozu =  this.approximateEqual(daysOpen, daysHigh) && 
                                this.approximateEqual(daysLow, daysClose) &&
                                daysOpen > daysClose && 
                                daysOpen > daysLow;

        return (isBearishMarbozu);
        
    }
}

module.exports = BearishMarubozu;