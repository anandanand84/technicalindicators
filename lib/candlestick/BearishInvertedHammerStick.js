import CandlestickFinder from './CandlestickFinder';
export default class BearishInvertedHammerStick extends CandlestickFinder {
    constructor() {
        super();
        this.name = 'BearishInvertedHammerStick';
        this.requiredCount = 1;
    }
    logic(data) {
        let daysOpen = data.open[0];
        let daysClose = data.close[0];
        let daysHigh = data.high[0];
        let daysLow = data.low[0];
        let isBearishInvertedHammer = daysOpen > daysClose;
        isBearishInvertedHammer = isBearishInvertedHammer && this.approximateEqual(daysClose, daysLow);
        isBearishInvertedHammer = isBearishInvertedHammer && (daysOpen - daysClose) <= 2 * (daysHigh - daysOpen);
        return isBearishInvertedHammer;
    }
}
export function bearishinvertedhammerstick(data) {
    return new BearishInvertedHammerStick().hasPattern(data);
}
