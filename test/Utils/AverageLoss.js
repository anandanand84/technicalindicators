/**
* Created by AAravindan on 5/5/16.
*/
var AverageLoss = require('../../lib/Utils/AverageLoss').AverageLoss;
var assert = require("assert");
var data = require('../data');

var input = {
 period : 6,
 values : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
}

describe('Average Loss', function() {
 "use strict";
 it('Should calculate average loss', function(){
   assert.deepEqual(AverageLoss.calculate(input), [0,0,0,0,0,0,0,0,0,0]);
 })
});


