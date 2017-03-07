"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const linkedlist = require("linkedlist");
class FixedSizeLinkedList extends linkedlist {
    constructor(size, maintainHigh, maintainLow) {
        super();
        this.size = size;
        this.maintainHigh = maintainHigh;
        this.maintainLow = maintainLow;
        this.periodHigh = 0;
        this.periodLow = Infinity;
        this.iterator = function* () {
            this.resetCursor();
            while (this.next()) {
                yield this.current;
            }
        };
        if (!size || typeof size !== 'number') {
            throw ('Size required and should be a number.');
        }
        this._push = this.push;
        this.push = function (data) {
            this.add(data);
        };
    }
    add(data) {
        if (this.length === this.size) {
            this.lastShift = this.shift();
            this._push(data);
            if (this.maintainHigh)
                if (this.lastShift == this.periodHigh)
                    this.calculatePeriodHigh();
            if (this.maintainLow)
                if (this.lastShift == this.periodLow)
                    this.calculatePeriodLow();
        }
        else {
            this._push(data);
        }
        if (this.maintainHigh)
            if (this.periodHigh <= data)
                (this.periodHigh = data);
        if (this.maintainLow)
            if (this.periodLow >= data)
                (this.periodLow = data);
    }
    calculatePeriodHigh() {
        this.resetCursor();
        if (this.next())
            this.periodHigh = this.current;
        while (this.next()) {
            if (this.periodHigh <= this.current) {
                this.periodHigh = this.current;
            }
            ;
        }
        ;
    }
    calculatePeriodLow() {
        this.resetCursor();
        if (this.next())
            this.periodLow = this.current;
        while (this.next()) {
            if (this.periodLow >= this.current) {
                this.periodLow = this.current;
            }
            ;
        }
        ;
    }
}
exports.default = FixedSizeLinkedList;
