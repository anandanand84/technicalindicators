var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
import { Indicator, IndicatorInput } from '../indicator/indicator';
import { getConfig } from '../config';
import KerasJS from 'keras-js';
var isNodeEnvironment = false;
try {
    isNodeEnvironment = Object.prototype.toString.call(global.process) === '[object process]';
}
catch (e) { }
var modelPath = getConfig('MODEL_PATH') || '/dist/model.bin';
var model = new KerasJS.Model({
    filepath: isNodeEnvironment ? __dirname + '/model.bin' : modelPath,
    gpu: false,
    filesystem: isNodeEnvironment
});
export class PatternDetectorInput extends IndicatorInput {
    constructor(values) {
        super();
        this.values = values;
    }
}
export var AvailablePatterns;
(function (AvailablePatterns) {
    AvailablePatterns[AvailablePatterns['TD'] = 0] = 'TD';
    AvailablePatterns[AvailablePatterns['IHS'] = 1] = 'IHS';
    AvailablePatterns[AvailablePatterns['HS'] = 2] = 'HS';
    AvailablePatterns[AvailablePatterns['TU'] = 3] = 'TU';
    AvailablePatterns[AvailablePatterns['DT'] = 4] = 'DT';
    AvailablePatterns[AvailablePatterns['DB'] = 5] = 'DB';
})(AvailablePatterns || (AvailablePatterns = {}));
function interpolateArray(data, fitCount) {
    var linearInterpolate = function (before, after, atPoint) {
        return before + (after - before) * atPoint;
    };
    var newData = new Array();
    var springFactor = new Number((data.length - 1) / (fitCount - 1));
    newData[0] = data[0]; // for new allocation
    for (var i = 1; i < fitCount - 1; i++) {
        var tmp = i * springFactor;
        var before = new Number(Math.floor(tmp)).toFixed();
        var after = new Number(Math.ceil(tmp)).toFixed();
        var atPoint = tmp - before;
        newData[i] = linearInterpolate(data[before], data[after], atPoint);
    }
    newData[fitCount - 1] = data[data.length - 1]; // for new allocation
    return newData;
}
;
function l2Normalize(arr) {
    var sum = arr.reduce((cum, value) => { return cum + (value * value); }, 0);
    var norm = Math.sqrt(sum);
    return arr.map((v) => v / norm);
}
export class PatternDetectorOutput {
}
export function predictPattern(input) {
    return __awaiter(this, void 0, void 0, function* () {
        if (input.values.length < 200) {
            console.warn('Pattern detector requires atleast 250 data for a reliable prediction, received just ', input.values.length);
        }
        yield model.ready();
        Indicator.reverseInputs(input);
        var data = input.values;
        var closes = l2Normalize(interpolateArray(data, 400));
        let result = yield model.predict({
            input: new Float32Array(closes)
        });
        var index = result.output.indexOf(Math.max(...result.output));
        Indicator.reverseInputs(input);
        return {
            pattern: AvailablePatterns[index],
            patternId: index,
            probability: result.output[index] * 100
        };
    });
}
export function hasDoubleBottom(input) {
    return __awaiter(this, void 0, void 0, function* () {
        var result = yield predictPattern(input);
        return (result.patternId === AvailablePatterns.DB && result.probability > 75);
    });
}
export function hasDoubleTop(input) {
    return __awaiter(this, void 0, void 0, function* () {
        var result = yield predictPattern(input);
        return (result.patternId === AvailablePatterns.DT && result.probability > 75);
    });
}
export function hasHeadAndShoulder(input) {
    return __awaiter(this, void 0, void 0, function* () {
        var result = yield predictPattern(input);
        return (result.patternId === AvailablePatterns.HS && result.probability > 75);
    });
}
export function hasInverseHeadAndShoulder(input) {
    return __awaiter(this, void 0, void 0, function* () {
        var result = yield predictPattern(input);
        return (result.patternId === AvailablePatterns.IHS && result.probability > 75);
    });
}
export function isTrendingUp(input) {
    return __awaiter(this, void 0, void 0, function* () {
        var result = yield predictPattern(input);
        return (result.patternId === AvailablePatterns.TU && result.probability > 75);
    });
}
export function isTrendingDown(input) {
    return __awaiter(this, void 0, void 0, function* () {
        var result = yield predictPattern(input);
        return (result.patternId === AvailablePatterns.TD && result.probability > 75);
    });
}
export class PatternDetector extends Indicator {
}
PatternDetector.predictPattern = predictPattern;
PatternDetector.hasDoubleBottom = hasDoubleBottom;
PatternDetector.hasDoubleTop = hasDoubleTop;
PatternDetector.hasHeadAndShoulder = hasHeadAndShoulder;
PatternDetector.hasInverseHeadAndShoulder = hasInverseHeadAndShoulder;
PatternDetector.isTrendingUp = isTrendingUp;
PatternDetector.isTrendingDown = isTrendingDown;
//# sourceMappingURL=patterndetection.js.map