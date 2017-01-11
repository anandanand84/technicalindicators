const CandlestickFinder = require('./CandlestickFinder.js');

class SpinningTop extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'SpinningTop';
        this.requiredCount  = 1;
    }
    logic (data) {
        let daysOpen  = data.open[0];
        let daysClose = data.close[0];
        let daysHigh  = data.high[0];
        let daysLow   = data.low[0];

        let bodyLength           = Math.abs(daysClose-daysOpen);
        let upperShadowLength    = Math.abs(daysHigh-daysClose);
        let lowerShadowLength    = Math.abs(daysOpen-daysLow);
        let isSpinningTop = bodyLength < upperShadowLength && 
                                 bodyLength < lowerShadowLength;

        return isSpinningTop;
    }
}

module.exports = SpinningTop;