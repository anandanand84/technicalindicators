import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class BullishPatterns extends CandlestickFinder {
    constructor();
    hasPattern(data: StockData): any;
}
export declare function bullish(data: StockData): any;
