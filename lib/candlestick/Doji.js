const CandlestickFinder = require('./CandlestickFinder.js');

class Doji extends CandlestickFinder {
    constructor() {
        super();
        this.requiredCount  = 3;
    }
    logic (data) {
        // {
        //     open : [1,2,3],
        //     high : [2,3,4],
        //     low : [123,123,123]
        //     close : [12,23,11],
        // }
        // data.open[0]
        // > < >= <= && || ===
        //this.approximateEqual(a,b)
        console.log(data);
        return false;
    }
}

module.exports = Doji