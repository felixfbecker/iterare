
export class ConcatIterator<T> implements Iterator<T> {

    constructor(private toConcat: Iterator<T>[]) {}

    next(): IteratorResult<T> {
        if (this.toConcat.length === 0) {
            return { done: true } as IteratorResult<T>
        }
        const result = this.toConcat[0].next()
        if (!result.done) {
            return result
        }
        this.toConcat.shift()
        return this.next()
    }
}
