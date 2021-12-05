/**
 * An iterator that emits results by running each element through a provided predicate
 */
export class MapIterator<T, R> implements Iterator<R> {
    private index: number

    constructor(private source: Iterator<T>, private iteratee: (value: T, index: number) => R) {
        this.index = 0
    }

    next(): IteratorResult<R> {
        const { value, done } = this.source.next()
        return { value: !done && this.iteratee(value, this.index++), done } as IteratorResult<R>
    }
}
