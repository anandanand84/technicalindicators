import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class DownsideTasukiGap extends CandlestickFinder {
    constructor();
    logic(data: StockData): boolean;
}
