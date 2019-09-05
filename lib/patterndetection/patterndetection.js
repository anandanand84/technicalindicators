var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Indicator, IndicatorInput } from '../indicator/indicator';
// import * as tf from '@tensorflow/tfjs';
var isNodeEnvironment = false;
var model;
var oneHotMap = ['IHS', 'TU', 'DB', 'HS', 'TD', 'DT'];
var tf;
try {
    isNodeEnvironment = Object.prototype.toString.call(global.process) === '[object process]';
}
catch (e) { }
export class PatternDetectorInput extends IndicatorInput {
    constructor(values) {
        super();
        this.values = values;
    }
}
export var AvailablePatterns;
(function (AvailablePatterns) {
    AvailablePatterns[AvailablePatterns["IHS"] = 0] = "IHS";
    AvailablePatterns[AvailablePatterns["TU"] = 1] = "TU";
    AvailablePatterns[AvailablePatterns["DB"] = 2] = "DB";
    AvailablePatterns[AvailablePatterns["HS"] = 3] = "HS";
    AvailablePatterns[AvailablePatterns["TD"] = 4] = "TD";
    AvailablePatterns[AvailablePatterns["DT"] = 5] = "DT";
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
var modelLoaded = false;
var laodingModel = false;
var loadingPromise;
function loadModel() {
    return __awaiter(this, void 0, void 0, function* () {
        if (modelLoaded)
            return Promise.resolve(true);
        if (laodingModel)
            return loadingPromise;
        laodingModel = true;
        loadingPromise = new Promise(function (resolve, reject) {
            return __awaiter(this, void 0, void 0, function* () {
                if (isNodeEnvironment) {
                    tf = require('@tensorflow/tfjs');
                    console.log('Nodejs Environment detected ');
                    var tfnode = require('@tensorflow/tfjs-node');
                    var modelPath = require('path').resolve(__dirname, '../tf_model/model.json');
                    model = yield tf.loadModel(tfnode.io.fileSystem(modelPath));
                }
                else {
                    if (typeof window.tf == "undefined") {
                        modelLoaded = false;
                        laodingModel = false;
                        console.log('Tensorflow js not imported, pattern detection may not work');
                        resolve();
                        return;
                    }
                    tf = window.tf;
                    console.log('Browser Environment detected ', tf);
                    console.log('Loading model ....');
                    model = yield tf.loadModel('/tf_model/model.json');
                    modelLoaded = true;
                    laodingModel = false;
                    setTimeout(resolve, 1000);
                    console.log('Loaded model');
                    return;
                }
                modelLoaded = true;
                laodingModel = false;
                resolve();
                return;
            });
        });
        yield loadingPromise;
        return;
    });
}
loadModel();
export function predictPattern(input) {
    return __awaiter(this, void 0, void 0, function* () {
        yield loadModel();
        if (input.values.length < 300) {
            console.warn('Pattern detector requires atleast 300 data points for a reliable prediction, received just ', input.values.length);
        }
        Indicator.reverseInputs(input);
        var values = input.values;
        var output = yield model.predict(tf.tensor2d([l2Normalize(interpolateArray(values, 400))]));
        var index = tf.argMax(output, 1).get(0);
        Indicator.reverseInputs(input);
        return { patternId: index, pattern: oneHotMap[index], probability: output.get(0, 4) * 100 };
    });
}
export function hasDoubleBottom(input) {
    return __awaiter(this, void 0, void 0, function* () {
        var result = yield predictPattern(input);
        return (result.patternId === AvailablePatterns.DB);
    });
}
export function hasDoubleTop(input) {
    return __awaiter(this, void 0, void 0, function* () {
        var result = yield predictPattern(input);
        return (result.patternId === AvailablePatterns.DT);
    });
}
export function hasHeadAndShoulder(input) {
    return __awaiter(this, void 0, void 0, function* () {
        var result = yield predictPattern(input);
        return (result.patternId === AvailablePatterns.HS);
    });
}
export function hasInverseHeadAndShoulder(input) {
    return __awaiter(this, void 0, void 0, function* () {
        var result = yield predictPattern(input);
        return (result.patternId === AvailablePatterns.IHS);
    });
}
export function isTrendingUp(input) {
    return __awaiter(this, void 0, void 0, function* () {
        var result = yield predictPattern(input);
        return (result.patternId === AvailablePatterns.TU);
    });
}
export function isTrendingDown(input) {
    return __awaiter(this, void 0, void 0, function* () {
        var result = yield predictPattern(input);
        return (result.patternId === AvailablePatterns.TD);
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
