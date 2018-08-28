import CandlestickFinder from './CandlestickFinder';
export default class BearishInvertedHammer extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'BearishInvertedHammer';
        this.requiredCount = 1;
    }
    logic(data) {
        let daysOpen = data.open[0];
        let daysClose = data.close[0];
        let daysHigh = data.high[0];
        let daysLow = data.low[0];
        let isBearishInvertedHammer = daysOpen > daysClose;
        isBearishInvertedHammer = isBearishInvertedHammer && this.approximateEqual(daysClose, daysLow);
        isBearishInvertedHammer = isBearishInvertedHammer && (daysOpen - daysClose) < (daysHigh - daysOpen);
        return isBearishInvertedHammer;
    }
}
export function bearishinvertedhammer(data) {
    return new BearishInvertedHammer().hasPattern(data);
}
