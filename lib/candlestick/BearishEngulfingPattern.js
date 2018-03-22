import CandlestickFinder from './CandlestickFinder';
export default class BearishEngulfingPattern extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'BearishEngulfingPattern';
        this.requiredCount = 2;
    }
    logic(data) {
        let firstdaysOpen = data.open[0];
        let firstdaysClose = data.close[0];
        let firstdaysHigh = data.high[0];
        let firstdaysLow = data.low[0];
        let seconddaysOpen = data.open[1];
        let seconddaysClose = data.close[1];
        let seconddaysHigh = data.high[1];
        let seconddaysLow = data.low[1];
        let isBearishEngulfing = ((firstdaysClose > firstdaysOpen) &&
            (firstdaysOpen < seconddaysOpen) &&
            (firstdaysClose < seconddaysOpen) &&
            (firstdaysOpen > seconddaysClose));
        return (isBearishEngulfing);
    }
}
export function bearishengulfingpattern(data) {
    return new BearishEngulfingPattern().hasPattern(data);
}
