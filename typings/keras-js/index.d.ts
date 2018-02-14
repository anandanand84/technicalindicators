declare module "keras-js" {
    namespace KerasJS {
        // Refer to via GreetingLib.Options.Log
        class Model {
            constructor(opts:any);
            ready():Promise<Boolean>;
            predict({ input:Float32Array }):Promise<any>;
        }

        interface Alert {
            modal: boolean;
            title?: string;
            color?: string;
        }
    }
    export default KerasJS;
}   