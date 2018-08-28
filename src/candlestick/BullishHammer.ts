import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';

export default class BullishHammer extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'BullishHammer';
        this.requiredCount  = 1;
    }
    logic (data:StockData) {
        let daysOpen  = data.open[0];
        let daysClose = data.close[0];
        let daysHigh  = data.high[0];
        let daysLow   = data.low[0];

        let isBullishHammer = daysClose > daysOpen;
        isBullishHammer = isBullishHammer && this.approximateEqual(daysClose, daysHigh);
        isBullishHammer = isBullishHammer && (daysClose - daysOpen) < (daysOpen - daysLow);

        return isBullishHammer;
    }
}

export function bullishhammer(data:StockData) {
  return new BullishHammer().hasPattern(data);
}