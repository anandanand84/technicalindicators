/**
 * Created by AAravindan on 5/7/16.
 */
var LinkedList = require("linkedlist")

var Util       = require('Util');

function FixedSizeLinkedList(size) {
  if(!size || typeof size !== 'number'){
    throw('Size required and should be a number.');
  }
  LinkedList.call(this);
  this.size = size;
  this._push = this.push;
  this.push = function(data) {
    this.add(data);
  }
}

Util.inherits(FixedSizeLinkedList, LinkedList);

FixedSizeLinkedList.prototype.add =  function(data) {
  if(this.length === this.size){
    this.lastShift = this.shift();
    this._push(data);
  }else {
    this._push(data);
  }
}

FixedSizeLinkedList.prototype.iterator = function *(linkedList) {
  this.resetCursor();
  while(this.next()){
    yield this.current;
  }
};

module.exports = FixedSizeLinkedList;