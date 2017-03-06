import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class MorningStar extends CandlestickFinder {
    constructor();
    logic(data: StockData): boolean;
}
