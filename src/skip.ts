export class SkipIterator<T> implements Iterator<T> {
    constructor(private source: Iterator<T>, private count: number) {}

    private i = 0

    next(): IteratorResult<T> {
        while (this.i++ < this.count && !this.source.next().done) {}
        return this.source.next()
    }
}
