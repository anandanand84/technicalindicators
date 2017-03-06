import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class BearishHarami extends CandlestickFinder {
    constructor();
    logic(data: StockData): boolean;
}
