import * as assert from 'assert'
import {SkipIterator} from './skip'

describe('SkipIterator', () => {
    it('should skip first given count emits', () => {
        const collection = [1, 2, 3, 4][Symbol.iterator]()
        const mapped = new SkipIterator(collection, 2)
        assert.equal(mapped.next().value, 3)
        assert.equal(mapped.next().value, 4)
        assert.equal(mapped.next().done, true)
    })

    it('should skip nothing if given count is less than 0', () => {
        const collection = [1, 2, 3, 4][Symbol.iterator]()
        const mapped = new SkipIterator(collection, 0)
        assert.equal(mapped.next().value, 1)
        assert.equal(mapped.next().value, 2)
        assert.equal(mapped.next().value, 3)
        assert.equal(mapped.next().value, 4)
        assert.equal(mapped.next().done, true)
    })

    it('should emit nothing if the skip count is larger than target length', () => {
        const collection = [1, 2, 3, 4][Symbol.iterator]()
        const mapped = new SkipIterator(collection, 5)
        assert.equal(mapped.next().done, true)
    })

    it('should work for Map', () => {
        const collection = new Map([[1, 1], [2, 2], [3, 3], [4, 4]])[Symbol.iterator]()
        const mapped = new SkipIterator(collection, 2)
        assert.deepStrictEqual(mapped.next().value, [3, 3])
        assert.deepStrictEqual(mapped.next().value, [4, 4])
        assert.equal(mapped.next().done, true)
    })
})
