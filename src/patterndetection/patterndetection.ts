import { Indicator, IndicatorInput } from '../indicator/indicator';
import { getConfig } from '../config';
import * as tf from '@tensorflow/tfjs';

var isNodeEnvironment = false;

var model;
var oneHotMap = ['IHS', 'TU', 'DB', 'HS', 'TD', 'DT'];

declare var module;
declare var __dirname;
declare var global;
declare var require;

try {
    isNodeEnvironment = Object.prototype.toString.call(global.process) === '[object process]' 
 } catch(e) {}

export class PatternDetectorInput extends IndicatorInput {
    constructor(public values:number[]) {
        super();
    }
}

export enum AvailablePatterns {
    'IHS',
    'TU',
    'DB',
    'HS',
    'TD', 
    'DT'
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

var modelLoaded = false;
var laodingModel = false;
var loadingPromise;

async function loadModel() {
    if(modelLoaded) return Promise.resolve(true);
    if(laodingModel) return loadingPromise;
    loadingPromise = new Promise(async function(resolve, reject) {
        if(isNodeEnvironment) {
            console.log('Nodejs Environment detected ');
            var tfnode = require('@tensorflow/tfjs-node');
            var modelPath = require('path').resolve(__dirname, '../tf_model/model.json');
            model = await tf.loadModel(tfnode.io.fileSystem(modelPath));
        } else {
            console.log('Browser Environment detected ');
            if((typeof tf === "undefined") || (typeof tf.loadModel === "undefined")) {
                console.log('Tensorflow js not imported, pattern detection may not work');
                modelLoaded = false;
                laodingModel = false;
                resolve();
                return;
            }
            model = await tf.loadModel('/tf_model/model.json');
        }
        modelLoaded = true;
        laodingModel = false;
        resolve();
        return;
    });
    laodingModel = true;
    return;
 }

 if(isNodeEnvironment)
    loadModel();

export async function predictPattern(input:PatternDetectorInput):Promise<PatternDetectorOutput> {
    await loadModel()
    if(input.values.length < 300) {
        console.warn('Pattern detector requires atleast 300 data points for a reliable prediction, received just ', input.values.length)
    }
    Indicator.reverseInputs(input);
    var values = input.values;
    var output = await model.predict(tf.tensor2d([l2Normalize(interpolateArray(values, 400))]));
    var index = tf.argMax(output, 1).get(0);
    Indicator.reverseInputs(input);
    return { patternId : index, pattern : oneHotMap[index], probability : output.get(0,4) * 100}
}

export async function hasDoubleBottom(input:PatternDetectorInput):Promise<Boolean> {
    var result = await predictPattern(input)
    return (result.patternId === AvailablePatterns.DB)
}

export async function hasDoubleTop(input:PatternDetectorInput):Promise<Boolean> {
    var result = await predictPattern(input)
    return (result.patternId === AvailablePatterns.DT)
}

export async function hasHeadAndShoulder(input:PatternDetectorInput):Promise<Boolean> {
    var result = await predictPattern(input)
    return (result.patternId === AvailablePatterns.HS)
}

export async function hasInverseHeadAndShoulder(input:PatternDetectorInput):Promise<Boolean> {
    var result = await predictPattern(input)
    return (result.patternId === AvailablePatterns.IHS)
}

export async function isTrendingUp(input:PatternDetectorInput):Promise<Boolean> {
    var result = await predictPattern(input)
    return (result.patternId === AvailablePatterns.TU)
}

export async function isTrendingDown(input:PatternDetectorInput):Promise<Boolean> {
    var result = await predictPattern(input)
    return (result.patternId === AvailablePatterns.TD)
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