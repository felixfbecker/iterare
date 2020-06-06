export class FilterIterator<T, V extends T = T> implements Iterator<T> {
    constructor(
        private source: Iterator<T>,
        private predicate: ((element: T) => element is V) | ((element: T) => boolean)
    ) {}

    next(): IteratorResult<V> {
        let result: IteratorResult<T>
        // Skip elements until predicate returns true
        do {
            result = this.source.next()
        } while (!result.done && !this.predicate(result.value))
        return result as IteratorResult<V>
    }
}
