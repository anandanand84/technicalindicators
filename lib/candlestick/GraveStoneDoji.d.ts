import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class GraveStoneDoji extends CandlestickFinder {
    constructor();
    logic(data: StockData): boolean;
}
