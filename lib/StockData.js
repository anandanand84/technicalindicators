export default class StockData {
    constructor(open, high, low, close, reversedInput) {
        this.open = open;
        this.high = high;
        this.low = low;
        this.close = close;
        this.reversedInput = reversedInput;
    }
}
export class CandleData {
}
export class CandleList {
    constructor() {
        this.open = [];
        this.high = [];
        this.low = [];
        this.close = [];
        this.volume = [];
        this.timestamp = [];
    }
}
