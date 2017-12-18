export class FilterIterator<T> implements Iterator<T> {
    constructor(private source: Iterator<T>, private predicate: (element: T) => boolean) {}

    next(): IteratorResult<T> {
        let result: IteratorResult<T>
        // Skip elements until predicate returns true
        do {
            result = this.source.next()
        } while (!result.done && !this.predicate(result.value))
        return result
    }
}
