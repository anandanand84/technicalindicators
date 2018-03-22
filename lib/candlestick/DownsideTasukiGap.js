import CandlestickFinder from './CandlestickFinder';
export default class DownsideTasukiGap extends CandlestickFinder {
    constructor() {
        super();
        this.requiredCount = 3;
        this.name = 'DownsideTasukiGap';
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
        let thirddaysOpen = data.open[2];
        let thirddaysClose = data.close[2];
        let thirddaysHigh = data.high[2];
        let thirddaysLow = data.low[2];
        let isFirstBearish = firstdaysClose < firstdaysOpen;
        let isSecondBearish = seconddaysClose < seconddaysOpen;
        let isThirdBullish = thirddaysClose > thirddaysOpen;
        let isFirstGapExists = seconddaysHigh < firstdaysLow;
        let isDownsideTasukiGap = ((seconddaysOpen > thirddaysOpen) &&
            (seconddaysClose < thirddaysOpen) &&
            (thirddaysClose > seconddaysOpen) &&
            (thirddaysClose < firstdaysClose));
        return (isFirstBearish && isSecondBearish && isThirdBullish && isFirstGapExists && isDownsideTasukiGap);
    }
}
export function downsidetasukigap(data) {
    return new DownsideTasukiGap().hasPattern(data);
}
