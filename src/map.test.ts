
import * as assert from 'assert'
import { MapIterator } from './map'

describe('MapIterator', () => {
    it('should emit the results of running each element through the predicate', () => {
        const collection = [1, 2, 3, 4][Symbol.iterator]()
        const mapped = new MapIterator(collection, x => x * 2)
        assert.equal(mapped.next().value, 2)
        assert.equal(mapped.next().value, 4)
        assert.equal(mapped.next().value, 6)
        assert.equal(mapped.next().value, 8)
        assert.equal(mapped.next().done, true)
    })
})
