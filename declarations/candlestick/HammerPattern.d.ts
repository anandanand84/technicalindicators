import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class HammerPattern extends CandlestickFinder {
    constructor();
    logic(data: StockData): boolean;
    downwardTrend(data: StockData, confirm?: boolean): boolean;
    includesHammer(data: StockData, confirm?: boolean): any;
    hasConfirmation(data: StockData): boolean;
}
export declare function hammerpattern(data: StockData): any;
