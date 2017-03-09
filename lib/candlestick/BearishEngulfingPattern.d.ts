import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class BearishEngulfingPattern extends CandlestickFinder {
    constructor();
    logic(data: StockData): boolean;
}
export declare function bearishengulfingpattern(data: StockData): any;
