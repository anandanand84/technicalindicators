let config = {};
export function setConfig(key, value) {
    config[key] = value;
}
export function getConfig(key) {
    return config[key];
}
