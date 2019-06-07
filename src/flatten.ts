import { isIterable } from './utils'

export class FlattenIterator<V> implements Iterator<V> {
    private inner?: Iterator<any>

    constructor(private outer: Iterator<any>) {}

    next(): IteratorResult<V> {
        // Currently iterating over an inner Iterable?
        if (this.inner) {
            const result = this.inner.next()
            // If not done, return result
            if (!result.done) {
                return result
            }
            // Else stop iterating inner Iterable
            this.inner = undefined
        }
        // Continue with next outer element
        const { value, done } = this.outer.next()
        // If the value is iterable, start iterating over it
        if (isIterable(value)) {
            this.inner = value[Symbol.iterator]()
            return this.next()
        }
        return { value, done }
    }
}
