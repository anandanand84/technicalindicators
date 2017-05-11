class Item {
    next:any;
    prev:any;
    data:any;
    constructor (data:any, prev?:any, next?:any) {
        this.next = next
        if (next) next.prev = this
        this.prev = prev
        if (prev) prev.next = this
        this.data = data
    }
}

export class LinkedList {
    private _head:any
    private _tail:any
    private _next:any
    private _length:any=0;
    private _current:any

    constructor() {
        
    }

    get head() {
        return this._head && this._head.data
    }

    get tail() {
        return this._tail && this._tail.data
    }

    get current() {
        return this._current && this._current.data
    }

    get length() {
        return this._length
    }

    public push (data:any) {
        this._tail = new Item(data, this._tail)
        if (this._length === 0) {
            this._head = this._tail
            this._current = this._head
            this._next = this._head
        }
        this._length++
    }

    public pop () {
        var tail = this._tail
        if (this._length === 0) {
            return
        }
        this._length--
        if (this._length === 0) {
            this._head = this._tail = this._current = this._next = undefined
            return tail.data
        }
        this._tail = tail.prev
        this._tail.next = undefined
        if (this._current === tail) {
            this._current = this._tail
            this._next = undefined
        }
        return tail.data
    }

    public shift() {
        var head = this._head
        if (this._length === 0)  {
            return
        }
        this._length--
        if (this._length === 0) {
            this._head = this._tail = this._current = this._next = undefined
            return head.data
        }
        this._head = this._head.next
        if (this._current === head) {
            this._current = this._head
            this._next = this._current.next
        }
        return head.data
    }

    public unshift(data:any) {
        this._head = new Item(data, undefined, this._head)
        if (this._length === 0)  {
            this._tail = this._head
            this._next = this._head
        }
        this._length++
    }
    
    public unshiftCurrent() {
        var current = this._current
        if (current === this._head || this._length < 2) {
            return current && current.data
        }
        // remove
        if (current === this._tail) {
            this._tail = current.prev
            this._tail.next = undefined
            this._current = this._tail
        } else {
            current.next.prev = current.prev
            current.prev.next = current.next
            this._current = current.prev
        }
        this._next = this._current.next
        // unshift
        current.next = this._head
        current.prev = undefined
        this._head.prev = current
        this._head = current
        return current.data
    }

    public removeCurrent() {
        var current = this._current
        if (this._length === 0) {
            return
        }
        this._length--
        if (this._length === 0) {
            this._head = this._tail = this._current = this._next = undefined
            return current.data
        }
        if (current === this._tail) {
            this._tail = current.prev
            this._tail.next = undefined
            this._current = this._tail
        } else if (current === this._head) {
            this._head = current.next
            this._head.prev = undefined
            this._current = this._head
        } else {
            current.next.prev = current.prev
            current.prev.next = current.next
            this._current = current.prev
        }
        this._next = this._current.next
        return current.data
    }

    public resetCursor() {
        this._current = this._next = this._head
        return this
    }

    public next() {
        var next = this._next
        if (next !== undefined) {
            this._next = next.next
            this._current = next
            return next.data
        }
    }
}