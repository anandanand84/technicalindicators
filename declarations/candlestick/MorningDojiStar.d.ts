import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class MorningDojiStar extends CandlestickFinder {
    constructor();
    logic(data: StockData): boolean;
}
export declare function morningdojistar(data: StockData): any;
