import { Indicator, IndicatorInput } from '../indicator/indicator';
import { getConfig } from '../config';
import KerasJS from 'keras-js';

var isNodeEnvironment = false;

declare var module;
declare var __dirname;

(function () {
    if (typeof (module) !== 'undefined' && module.exports) {
            isNodeEnvironment = true;
    } 
})();

var modelPath = getConfig('MODEL_PATH') || '/dist/model.bin';

var model = new KerasJS.Model({
    filepath: isNodeEnvironment ? __dirname + '/model.bin' : modelPath,
    gpu: false,
    filesystem: isNodeEnvironment
})

export class PatternDetectorInput extends IndicatorInput {
    constructor(public values:number[]) {
        super();
    }
}

export enum AvailablePatterns {
    'TD', 
    'IHS',
    'HS',
    'TU',
    'DT',
    'DB'
}

function interpolateArray(data:any, fitCount:any):number[] {
    var linearInterpolate = function (before:any, after:any, atPoint:any) {
        return before + (after - before) * atPoint;
    };

    var newData = new Array();
    var springFactor:any = new Number((data.length - 1) / (fitCount - 1));
    newData[0] = data[0]; // for new allocation
    for ( var i = 1; i < fitCount - 1; i++) {
        var tmp = i * springFactor;
        var before:any = new Number(Math.floor(tmp)).toFixed();
        var after:any = new Number(Math.ceil(tmp)).toFixed();
        var atPoint = tmp - before;
        newData[i] = linearInterpolate(data[before], data[after], atPoint);
    }
    newData[fitCount - 1] = data[data.length - 1]; // for new allocation
    return newData;
};

function l2Normalize(arr:any):number[] {
    var sum = arr.reduce((cum:any, value:any)=> { return cum + (value * value) }, 0);
    var norm = Math.sqrt(sum);
    return arr.map((v:any)=>v/norm);
}

export class PatternDetectorOutput {
    patternId: AvailablePatterns
    pattern : string
    probability : number
}

export async function predictPattern(input:PatternDetectorInput): Promise<PatternDetectorOutput> {
        if(input.values.length < 200) {
            console.warn('Pattern detector requires atleast 250 data for a reliable prediction, received just ', input.values.length)
        }
        await model.ready()
        Indicator.reverseInputs(input);
        var data = input.values;
        var closes = l2Normalize(interpolateArray(data, 400));
        let result = await model.predict({
            input : new Float32Array(closes)
        })
        var index= result.output.indexOf(Math.max(...result.output));
        Indicator.reverseInputs(input);
        return {
            pattern : AvailablePatterns[index] as any,
            patternId: index,
            probability : result.output[index] * 100
        }
}

export async function hasDoubleBottom(input:PatternDetectorInput):Promise<Boolean> {
    var result = await predictPattern(input)
    return (result.patternId === AvailablePatterns.DB && result.probability > 75)
}

export async function hasDoubleTop(input:PatternDetectorInput):Promise<Boolean> {
    var result = await predictPattern(input)
    return (result.patternId === AvailablePatterns.DT && result.probability > 75)
}

export async function hasHeadAndShoulder(input:PatternDetectorInput):Promise<Boolean> {
    var result = await predictPattern(input)
    return (result.patternId === AvailablePatterns.HS && result.probability > 75)
}

export async function hasInverseHeadAndShoulder(input:PatternDetectorInput):Promise<Boolean> {
    var result = await predictPattern(input)
    return (result.patternId === AvailablePatterns.IHS && result.probability > 75)
}

export async function isTrendingUp(input:PatternDetectorInput):Promise<Boolean> {
    var result = await predictPattern(input)
    return (result.patternId === AvailablePatterns.TU && result.probability > 75)
}

export async function isTrendingDown(input:PatternDetectorInput):Promise<Boolean> {
    var result = await predictPattern(input)
    return (result.patternId === AvailablePatterns.TD && result.probability > 75)
}

export class PatternDetector extends Indicator {
    static predictPattern = predictPattern;
    static hasDoubleBottom = hasDoubleBottom;
    static hasDoubleTop = hasDoubleTop;
    static hasHeadAndShoulder = hasHeadAndShoulder;
    static hasInverseHeadAndShoulder = hasInverseHeadAndShoulder;
    static isTrendingUp = isTrendingUp;
    static isTrendingDown = isTrendingDown;
}