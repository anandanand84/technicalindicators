const CandlestickFinder = require('./CandlestickFinder.js');

class Marubozu extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'Marubozu';
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
        let isBullishMarbozu =  this.approximateEqual(daysClose, daysHigh) && 
                                this.approximateEqual(daysLow, daysOpen) &&
                                daysOpen < daysClose && 
                                daysOpen < daysHigh;
        

        return (isBearishMarbozu || isBullishMarbozu);
        
    }
}

module.exports = Marubozu;