"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const model = new KerasJS.Model({
    filepaths: {
        model: '/trenddetection_model.json',
        weights: '/trenddetection_model_weights.buf',
        metadata: '/trenddetection_model_metadata.json'
    },
    gpu: true
});
function predict(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield model.ready();
            const inputData = {
                input: new Float32Array(data)
            };
            const outputData = yield model.predict(inputData);
            console.log(outputData.dense_4);
        }
        catch (err) {
            console.error("Error occured when predicting trendline", err);
            return [];
        }
    });
}
exports.predict = predict;
//# sourceMappingURL=TrendLine.js.map