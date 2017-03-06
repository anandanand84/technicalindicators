import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class BearishPatterns extends CandlestickFinder {
    constructor();
    hasPattern(data: StockData): boolean;
}
