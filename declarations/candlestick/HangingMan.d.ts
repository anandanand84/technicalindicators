import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class HangingMan extends CandlestickFinder {
    constructor();
    logic(data: StockData): boolean;
    upwardTrend(data: StockData, confirm?: boolean): boolean;
    includesHammer(data: StockData, confirm?: boolean): any;
    hasConfirmation(data: StockData): boolean;
}
export declare function hangingman(data: StockData): any;
