/**
 * Created by AAravindan on 5/7/16.
 */
var LinkedList = require("linkedlist")

var Util       = require('util');

function FixedSizeLinkedList(size, maintainHigh, maintainLow) {
  if(!size || typeof size !== 'number'){
    throw('Size required and should be a number.');
  }
  LinkedList.call(this);
  this.size = size;
  this.maintainHigh = maintainHigh;
  this.maintainLow  = maintainLow;
  this.periodHigh = 0;
  this.periodLow  = Infinity;
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

    //TODO: FInd a better way
     if(this.maintainHigh )
      if (this.lastShift == this.periodHigh)
        this.calculatePeriodHigh();
     if(this.maintainLow)
      if (this.lastShift == this.periodLow)
        this.calculatePeriodLow();
  }else {
    this._push(data);
  }

  //TODO: FInd a better way
  if(this.maintainHigh )
    if(this.periodHigh <= data)
      (this.periodHigh = data);
  if(this.maintainLow)
    if(this.periodLow >= data)
      (this.periodLow = data);
};

FixedSizeLinkedList.prototype.iterator = function *(linkedList) {
  this.resetCursor();
  while(this.next()){
    yield this.current;
  }
};

FixedSizeLinkedList.prototype.calculatePeriodHigh = function (linkedList) {
  this.resetCursor();
  if(this.next())
    this.periodHigh = this.current;
  while(this.next()){
    if(this.periodHigh <= this.current){
      this.periodHigh = this.current;
    };
  };
};

FixedSizeLinkedList.prototype.calculatePeriodLow = function () {
  this.resetCursor();
  if(this.next())
    this.periodLow = this.current;
  while(this.next()){
    if(this.periodLow >= this.current){
      this.periodLow = this.current;
    };
  };
};

module.exports = FixedSizeLinkedList;