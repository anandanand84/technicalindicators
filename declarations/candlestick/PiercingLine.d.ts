import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class PiercingLine extends CandlestickFinder {
    constructor();
    logic(data: StockData): boolean;
}
export declare function piercingline(data: StockData): any;
