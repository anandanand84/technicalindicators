const CandlestickFinder = require('./CandlestickFinder.js');

class DragonFlyDoji extends CandlestickFinder {
    constructor() {
        super();
        this.requiredCount  = 1;
    }
    logic (data) {
        let daysOpen   = data.open[0];
        let daysClose  = data.close[0];
        let daysHigh   = data.high[0];

        let isOpenEqualsClose     = this.approximateEqual(daysOpen, daysClose);
        let isHighEqualsOpen      = this.approximateEqual(daysOpen, daysHigh);
        
        return (isOpenEqualsClose && isHighEqualsOpen);
    }
}

module.exports = DragonFlyDoji;