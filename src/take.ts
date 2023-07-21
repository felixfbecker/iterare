export class TakeIterator<T> implements Iterator<T> {
    constructor(private source: Iterator<T>, private count: number) {}

    private i = 0

    next(): IteratorResult<T> {
        while (this.i++ < this.count) {
            return this.source.next()
        }

        return { done: true, value: (undefined as unknown) as T }
    }
}
