import * as assert from 'assert'
import { SliceIterator } from './slice'

describe('SliceIterator', () => {
    it('should emit 3 items from the beginning of the iterator for 0, 3', () => {
        const collection = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10][Symbol.iterator]()
        const slice = new SliceIterator(collection, 0, 4)
        assert.equal(slice.next().value, 1)
        assert.equal(slice.next().value, 2)
        assert.equal(slice.next().value, 3)
        assert.equal(slice.next().done, true)
    })
    it('should emit all items from the beginning of the iterator for 0, Infinity', () => {
        const collection = [1, 2, 3][Symbol.iterator]()
        const slice = new SliceIterator(collection, 0)
        assert.equal(slice.next().value, 1)
        assert.equal(slice.next().value, 2)
        assert.equal(slice.next().value, 3)
        assert.equal(slice.next().done, true)
    })
    it('should emit no items for 0, 0', () => {
        const collection = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10][Symbol.iterator]()
        const slice = new SliceIterator(collection, 0, 0)
        assert.equal(slice.next().done, true)
    })
    it('should emit no items if end < start', () => {
        const collection = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10][Symbol.iterator]()
        const slice = new SliceIterator(collection, 4, 3)
        assert.equal(slice.next().done, true)
    })
    it('should emit only as many items as the source', () => {
        const collection = [1, 2, 3][Symbol.iterator]()
        const slice = new SliceIterator(collection, 0, 6)
        assert.equal(slice.next().value, 1)
        assert.equal(slice.next().value, 2)
        assert.equal(slice.next().value, 3)
        assert.equal(slice.next().done, true)
    })
})
