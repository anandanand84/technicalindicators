import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';

export default class GraveStoneDoji extends CandlestickFinder {
    constructor() {
        super();
        this.requiredCount  = 1;
        this.name = 'GraveStoneDoji';
    }
    logic (data:StockData) {
        let daysOpen   = data.open[0];
        let daysClose  = data.close[0];
        let daysLow   = data.low[0];

        let isOpenEqualsClose     = this.approximateEqual(daysOpen, daysClose);
        let isLowEqualsOpen      = this.approximateEqual(daysOpen, daysLow);
        
        return (isOpenEqualsClose && isLowEqualsOpen);
    }
}