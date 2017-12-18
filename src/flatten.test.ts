import * as assert from 'assert'
import { FlattenIterator } from './flatten'

describe('FlattenIterator', () => {
    it('should flatten nested iterables', () => {
        const collection = [1, [2, [3]], 4, [5]][Symbol.iterator]()
        const flattened = new FlattenIterator(collection)
        assert.equal(flattened.next().value, 1)
        assert.equal(flattened.next().value, 2)
        assert.deepEqual(flattened.next().value, [3])
        assert.equal(flattened.next().value, 4)
        assert.equal(flattened.next().value, 5)
        assert.equal(flattened.next().done, true)
    })
})
