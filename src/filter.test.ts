import * as assert from 'assert'
import { FilterIterator } from './filter'

describe('FilterIterator', () => {
    it('should only emit elements the predicate returns true for', () => {
        const collection = [1, 2, 3, 4, 5, 6][Symbol.iterator]()
        const filtered = new FilterIterator(collection, x => x % 2 === 0)
        assert.equal(filtered.next().value, 2)
        assert.equal(filtered.next().value, 4)
        assert.equal(filtered.next().value, 6)
        assert.equal(filtered.next().done, true)
    })
    it('should correctly infer type of the resulting iterable', () => {
        const collection: IterableIterator<string | number> = [1, 'a'][Symbol.iterator]()
        const isNumber = (x: string | number): x is number => typeof x === 'number'
        const filtered = new FilterIterator(collection, isNumber)
        assert.equal(filtered.next().value.toFixed(2), '1.00') // tsc will fail if .value is not of type "number"
    })
})
