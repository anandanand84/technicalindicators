import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';

export default class Doji extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'Doji';
        this.requiredCount  = 1;
    }
    logic (data:StockData):boolean {
        let daysOpen = data.open[0];
        let daysClose = data.close[0];
        let daysHigh = data.high[0];
        let daysLow = data.low[0];
        let isOpenEqualsClose = this.approximateEqual(daysOpen, daysClose);
        let isHighEqualsOpen = isOpenEqualsClose && this.approximateEqual(daysOpen, daysHigh);
        let isLowEqualsClose = isOpenEqualsClose && this.approximateEqual(daysClose, daysLow);
        return (isOpenEqualsClose && isHighEqualsOpen == isLowEqualsClose);
    }
}

export function doji(data:StockData) {
  return new Doji().hasPattern(data);
}