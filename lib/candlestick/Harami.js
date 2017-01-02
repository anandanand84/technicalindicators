const CandlestickFinder = require('./CandlestickFinder');

class Harami extends CandlestickFinder {
    constructor() {
        super();
        this.requiredCount  = 2;
    }
    logic (data) {
        let firstdaysOpen   = data.open[0];
        let firstdaysClose  = data.close[0];
        let firstdaysHigh   = data.high[0];
        let firstdaysLow    = data.low[0]
        let seconddaysOpen  = data.open[1];
        let seconddaysClose = data.close[1];
        let seconddaysHigh  = data.high[1];
        let seconddaysLow   = data.low[1]

        let isHaramiPattern1 = ((firstdaysOpen > seconddaysOpen) && 
                               (firstdaysClose < seconddaysOpen)&&
                               (firstdaysClose < seconddaysClose)&& 
                               (firstdaysOpen  > seconddaysLow)&&
                               (firstdaysHigh  > seconddaysHigh)); 
        
        let isHaramiPattern2 = ((firstdaysOpen < seconddaysOpen) && 
                               (firstdaysClose > seconddaysOpen)&&
                               (firstdaysClose > seconddaysClose)&& 
                               (firstdaysOpen  < seconddaysLow)&&
                               (firstdaysHigh  > seconddaysHigh));           
   
        return (isHaramiPattern1 || isHaramiPattern2);
        
   }
}

module.exports = Harami;