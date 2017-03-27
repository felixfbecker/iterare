
import * as assert from 'assert'
import { TakeIterator } from './take'

describe('TakeIterator', () => {
    it('should emit n items from the beginning of the iterator', () => {
        const collection = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10][Symbol.iterator]()
        const limited = new TakeIterator(collection, 3)
        assert.equal(limited.next().value, 1)
        assert.equal(limited.next().value, 2)
        assert.equal(limited.next().value, 3)
        assert.equal(limited.next().done, true)
    })
    it('should emit no items if n == 0', () => {
        const collection = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10][Symbol.iterator]()
        const limited = new TakeIterator(collection, 0)
        assert.equal(limited.next().done, true)
    })
    it('should emit only as many items as the source', () => {
        const collection = [1, 2, 3][Symbol.iterator]()
        const limited = new TakeIterator(collection, 6)
        assert.equal(limited.next().value, 1)
        assert.equal(limited.next().value, 2)
        assert.equal(limited.next().value, 3)
        assert.equal(limited.next().done, true)
    })
})
