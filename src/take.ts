
export class TakeIterator<T> implements Iterator<T> {

    private i = 0

    constructor(private source: Iterator<T>, private limit: number) {}

    next(): IteratorResult<T> {
        if (this.i === this.limit) {
            return { done: true } as IteratorResult<T>
        }
        this.i++
        return this.source.next()
    }
}
