import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';

export default class BearishSpinningTop extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'BearishSpinningTop';
        this.requiredCount  = 1;
    }
    logic (data:StockData) {
        let daysOpen  = data.open[0];
        let daysClose = data.close[0];
        let daysHigh  = data.high[0];
        let daysLow   = data.low[0];
        let isBearishSpinningTop = daysClose < daysOpen;
        let bodyLength           = Math.abs(daysClose-daysOpen);
        let upperShadowLength    = Math.abs(daysHigh-daysOpen);
        let lowerShadowLength    = Math.abs(daysClose-daysLow);
        isBearishSpinningTop = isBearishSpinningTop &&
                               bodyLength < upperShadowLength && 
                               bodyLength < lowerShadowLength;

        return isBearishSpinningTop;
    }
}

export function bearishspinningtop(data:StockData) {
  return new BearishSpinningTop().hasPattern(data);
}
