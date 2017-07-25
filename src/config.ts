let config:any = {

};
export function setConfig(key:any, value:any) {
    config[key] = value;
}

export function getConfig(key:any){
    return config[key];
}
