import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';

export default class BearishHammer extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'BearishHammer';
        this.requiredCount  = 1;
    }
    logic (data:StockData) {
        let daysOpen  = data.open[0];
        let daysClose = data.close[0];
        let daysHigh  = data.high[0];
        let daysLow   = data.low[0];

        let isBearishHammer = daysOpen > daysClose;
        isBearishHammer = isBearishHammer && this.approximateEqual(daysOpen, daysHigh);
        isBearishHammer = isBearishHammer && (daysOpen - daysClose) < (daysClose - daysLow);

        return isBearishHammer;
    }
}

export function bearishhammer(data:StockData) {
  return new BearishHammer().hasPattern(data);
}