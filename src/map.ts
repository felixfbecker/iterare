/**
 * An iterator that emits results by running each element through a provided predicate
 */
export class MapIterator<T, R> implements Iterator<R> {
    constructor(private source: Iterator<T>, private iteratee: (value: T) => R) {}

    next(): IteratorResult<R> {
        const { value, done } = this.source.next()
        return { value: !done && this.iteratee(value), done } as IteratorResult<R>
    }
}
