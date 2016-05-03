/**
 * Created by AAravindan on 5/3/16.
 */
require("babel-polyfill");
const all = require('./index.js');

Object.assign(global, all)