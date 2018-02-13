import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class BearishPatterns extends CandlestickFinder {
    constructor();
    hasPattern(data: StockData): any;
}
export declare function bearish(data: StockData): any;
