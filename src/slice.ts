
export class SliceIterator<T> implements Iterator<T> {

    private i = 0

    /**
     * @param {Iterator<T>} source Source Iterator
     * @param {number} start Zero-based positive start index, inclusive
     * @param {number} end Zero-based positive end index, exclusive, defaults to end of iterator
     */
    constructor(private source: Iterator<T>, private start: number, private end: number = Infinity) {}

    next(): IteratorResult<T> {
        // Skip elements before start
        while (this.i < this.start) {
            const result = this.source.next()
            if (result.done) {
                return result
            }
            this.i++
        }
        // Finish when end is reached
        this.i++
        if (this.i >= this.end) {
            return { done: true } as IteratorResult<T>
        }
        return this.source.next()
    }
}
