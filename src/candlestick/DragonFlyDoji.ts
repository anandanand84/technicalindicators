import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';

export default class DragonFlyDoji extends CandlestickFinder {
    constructor() {
        super();
        this.requiredCount  = 1;
        this.name = 'DragonFlyDoji';
    }
    logic (data:StockData) {
        let daysOpen   = data.open[0];
        let daysClose  = data.close[0];
        let daysHigh   = data.high[0];

        let isOpenEqualsClose     = this.approximateEqual(daysOpen, daysClose);
        let isHighEqualsOpen      = this.approximateEqual(daysOpen, daysHigh);
        
        return (isOpenEqualsClose && isHighEqualsOpen);
    }
}