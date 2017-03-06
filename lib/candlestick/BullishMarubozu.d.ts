import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class BullishMarubozu extends CandlestickFinder {
    constructor();
    logic(data: StockData): boolean;
}
