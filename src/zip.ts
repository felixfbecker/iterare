
export class ZipIterator<A, B> implements Iterator<[A, B]> {

    constructor(private a: Iterator<A>, private b: Iterator<B>) {}

    next(): IteratorResult<[A, B]> {
        const a = this.a.next()
        if (a.done) {
            return { done: true } as IteratorResult<[A, B]>
        }
        const b = this.b.next()
        if (b.done) {
            return { done: true } as IteratorResult<[A, B]>
        }
        return { value: [a.value, b.value], done: false }
    }
}
