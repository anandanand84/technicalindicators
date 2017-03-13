import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class BullishPatterns extends CandlestickFinder {
    constructor();
    hasPattern(data: StockData): boolean;
}
export declare function bullish(data: StockData): boolean;
