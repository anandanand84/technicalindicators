//data :
// {
//  open : [],
//  high : [],
//  low : [],
//  close : []
// }
class CandlestickFinder {

    constructor() {
        // if (new.target === Abstract) {
        //     throw new TypeError("Abstract class");
        // }
    }

    approximateEqual(a, b) {
        return (((Math.abs(a - b)).toPrecision(4) * 1) <=
                ((a * 0.001).toPrecision(4)) * 1)
    }

    getAllPatternIndex (data) {
        if(data.reversedInput) {
            data.open.reverse();
            data.high.reverse();
            data.low.reverse();
            data.close.reverse();
        }
        let strategyFn = this.logic;
        return this._generateDataForCandleStick(data)
                .map((current, index) => {
                            return strategyFn.call(strategy, current) ? index : undefined;
                        }).filter((hasIndex) => {
                            return hasIndex;
                        });
    }

    hasPattern (data) {
        if(data.reversedInput) {
            data.open.reverse();
            data.high.reverse();
            data.low.reverse();
            data.close.reverse();
        }
        let strategyFn = this.logic;
        return strategyFn.call(this, this._getLastDataForCandleStick(data));
    }

    _getLastDataForCandleStick(data) {
        let requiredCount = this.requiredCount;
        if(data.close.length < requiredCount) {
            throw('Data count less than data required for the strategy ', strategy.name)
        }else if (data.close.length === requiredCount) {
            return data;
        } else {
            let returnVal = {
                open : [],
                high : [],
                low  : [],
                close: []
            };
            let i = 0;
            let index = data.close.length - requiredCount;
            while (i < requiredCount) {
                returnVal.open.push(data.open[index + i]);
                returnVal.high.push(data.high[index + i]);
                returnVal.low.push(data.low[index + i]);
                returnVal.close.push(data.close[index + i]);
                i++;
            }
            return returnVal;
        }
    }

    _generateDataForCandleStick (data) {
            let requiredCount = this.requiredCount;
            if(data.close.length < requiredCount) {
                throw('Data count less than data required for the strategy ', strategy.name)
            }
            let generatedData = data.close.map(function(currentData, index) {
                let i = 0;
                let returnVal = {
                    open : [],
                    high : [],
                    low  : [],
                    close: []
                };
                while(i < requiredCount) {
                    returnVal.open.push(data.open[index + i]);
                    returnVal.high.push(data.high[index + i]);
                    returnVal.low.push(data.low[index + i]);
                    returnVal.close.push(data.close[index + i]);
                    i++;
                }
                return returnVal;
            }).filter((val, index) => { return (index <= (data.close.length - requiredCount))  });
            return generatedData;
    }
}

module.exports = CandlestickFinder