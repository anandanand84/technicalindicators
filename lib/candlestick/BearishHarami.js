import CandlestickFinder from './CandlestickFinder';
export default class BearishHarami extends CandlestickFinder {
    constructor() {
        super();
        this.requiredCount = 2;
        this.name = 'BearishHarami';
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
        let isBearishHaramiPattern = ((firstdaysOpen < seconddaysOpen) &&
            (firstdaysClose > seconddaysOpen) &&
            (firstdaysClose > seconddaysClose) &&
            (firstdaysOpen < seconddaysLow) &&
            (firstdaysHigh > seconddaysHigh));
        return (isBearishHaramiPattern);
    }
}
export function bearishharami(data) {
    return new BearishHarami().hasPattern(data);
}
