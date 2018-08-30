import StockData from '../StockData';
import CandlestickFinder from './CandlestickFinder';
export default class ShootingStar extends CandlestickFinder {
    constructor();
    logic(data: StockData): boolean;
    upwardTrend(data: StockData, confirm?: boolean): boolean;
    includesHammer(data: StockData, confirm?: boolean): any;
    hasConfirmation(data: StockData): boolean;
}
export declare function shootingstar(data: StockData): any;
