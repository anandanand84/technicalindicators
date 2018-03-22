import { IndicatorInput, Indicator } from '../indicator/indicator';
"use strict";
/*
  There seems to be a few interpretations of the rules for this regarding which prices.
  I mean the english from which periods are included. The wording does seem to
  introduce some discrepancy so maybe that is why. I want to put the author's
  own description here to reassess this later.
  ----------------------------------------------------------------------------------------
  For the first day of entry the SAR is the previous Significant Point

  If long the SP is the lowest price reached while in the previous short trade
  If short the SP is the highest price reached while in the previous long trade

  If long:
  Find the difference between the highest price made while in the trade and the SAR for today.
  Multiple the difference by the AF and ADD the result to today's SAR to obtain the SAR for tomorrow.
  Use 0.02 for the first AF and increase it by 0.02 on every day that a new high for the trade is made.
  If a new high is not made continue to use the AF as last increased. Do not increase the AF above .20

  Never move the SAR for tomorrow ABOVE the previous day's LOW or today's LOW.
  If the SAR is calculated to be ABOVE the previous day's LOW or today's LOW then use the lower low between today and the previous day as the new SAR.
  Make the next day's calculations based on this SAR.

  If short:
  Find the difference between the lowest price made while in the trade and the SAR for today.
  Multiple the difference by the AF and SUBTRACT the result to today's SAR to obtain the SAR for tomorrow.
  Use 0.02 for the first AF and increase it by 0.02 on every day that a new high for the trade is made.
  If a new high is not made continue to use the AF as last increased. Do not increase the AF above .20

  Never move the SAR for tomorrow BELOW the previous day's HIGH or today's HIGH.
  If the SAR is calculated to be BELOW the previous day's HIGH or today's HIGH then use the higher high between today and the previous day as the new SAR. Make the next day's calculations based on this SAR.
  ----------------------------------------------------------------------------------------
*/
export class PSARInput extends IndicatorInput {
}
;
export class PSAR extends Indicator {
    constructor(input) {
        super(input);
        let highs = input.high || [];
        let lows = input.low || [];
        var genFn = function* (step, max) {
            let curr, extreme, sar, furthest;
            let up = true;
            let accel = step;
            let prev = yield;
            while (true) {
                if (curr) {
                    sar = sar + accel * (extreme - sar);
                    if (up) {
                        sar = Math.min(sar, furthest.low, prev.low);
                        if (curr.high > extreme) {
                            extreme = curr.high;
                            accel = Math.min(accel + step, max);
                        }
                        ;
                    }
                    else {
                        sar = Math.max(sar, furthest.high, prev.high);
                        if (curr.low < extreme) {
                            extreme = curr.low;
                            accel = Math.min(accel + step, max);
                        }
                    }
                    if ((up && curr.low < sar) || (!up && curr.high > sar)) {
                        accel = step;
                        sar = extreme;
                        up = !up;
                        extreme = !up ? curr.low : curr.high;
                    }
                }
                else {
                    // Randomly setup start values? What is the trend on first tick??
                    sar = prev.low;
                    extreme = prev.high;
                }
                furthest = prev;
                if (curr)
                    prev = curr;
                curr = yield sar;
            }
        };
        this.result = [];
        this.generator = genFn(input.step, input.max);
        this.generator.next();
        lows.forEach((tick, index) => {
            var result = this.generator.next({
                high: highs[index],
                low: lows[index],
            });
            if (result.value !== undefined) {
                this.result.push(result.value);
            }
        });
    }
    ;
    nextValue(input) {
        let nextResult = this.generator.next(input);
        if (nextResult.value !== undefined)
            return nextResult.value;
    }
    ;
}
PSAR.calculate = psar;
export function psar(input) {
    Indicator.reverseInputs(input);
    var result = new PSAR(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}
;
