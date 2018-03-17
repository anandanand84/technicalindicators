declare var KerasJS:any
const model = new KerasJS.Model({
  filepaths: {
    model: '/trenddetection_model.json',
    weights: '/trenddetection_model_weights.buf',
    metadata: '/trenddetection_model_metadata.json'
  },
  gpu: true
})

export async function predict(data:number[]) {
    try {
        await model.ready()
        const inputData = {
            input : new Float32Array(data)
        }
        const outputData = await model.predict(inputData)
        console.log(outputData.dense_4);
    } catch (err) {
        console.error("Error occured when predicting trendline", err);
        return [];
    }
}


