/**
 * Calcaultes the fibonacci retracements for given start and end points
 *
 * If calculating for up trend start should be low and end should be high and vice versa
 *
 * returns an array of retracements level containing [0 , 23.6, 38.2, 50, 61.8, 78.6, 100, 127.2, 161.8, 261.8, 423.6]
 *
 * @export
 * @param {number} start
 * @param {number} end
 * @returns {number[]}
 */
export function fibonacciretracement(start, end) {
    let levels = [0, 23.6, 38.2, 50, 61.8, 78.6, 100, 127.2, 161.8, 261.8, 423.6];
    let retracements;
    if (start < end) {
        retracements = levels.map(function (level) {
            let calculated = end - Math.abs(start - end) * (level) / 100;
            return calculated > 0 ? calculated : 0;
        });
    }
    else {
        retracements = levels.map(function (level) {
            let calculated = end + Math.abs(start - end) * (level) / 100;
            return calculated > 0 ? calculated : 0;
        });
    }
    return retracements;
}
