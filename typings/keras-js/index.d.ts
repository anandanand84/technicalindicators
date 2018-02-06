declare module "keras-js" {
    export class Model {
        constructor(opts:any);
        ready():Promise<Boolean>;
        predict({ input:Float32Array }):Promise<any>;
    }
}   