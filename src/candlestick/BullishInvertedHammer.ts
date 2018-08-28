import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';

export default class BullishInvertedHammer extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'BullishInvertedHammer';
        this.requiredCount  = 1;
    }
    logic (data:StockData) {
        let daysOpen  = data.open[0];
        let daysClose = data.close[0];
        let daysHigh  = data.high[0];
        let daysLow   = data.low[0];

        let isBullishInvertedHammer = daysClose > daysOpen;
        isBullishInvertedHammer = isBullishInvertedHammer && this.approximateEqual(daysOpen, daysLow);
        isBullishInvertedHammer = isBullishInvertedHammer && (daysClose - daysOpen) < (daysHigh - daysClose);

        return isBullishInvertedHammer;
    }
}

export function bullishinvertedhammer(data:StockData) {
  return new BullishInvertedHammer().hasPattern(data);
}