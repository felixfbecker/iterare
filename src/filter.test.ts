
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
})
