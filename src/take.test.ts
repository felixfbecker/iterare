import * as assert from 'assert'
import { TakeIterator } from './take'

describe('TakeIterator', () => {
    it('should take first given count emits', () => {
        const collection = [1, 2, 3, 4][Symbol.iterator]()
        const mapped = new TakeIterator(collection, 2)
        assert.equal(mapped.next().value, 1)
        assert.equal(mapped.next().value, 2)
        assert.equal(mapped.next().done, true)
    })

    it('should take all elements if given count is larger than source length', () => {
        const collection = [1, 2, 3, 4][Symbol.iterator]()
        const mapped = new TakeIterator(collection, 5)
        assert.equal(mapped.next().value, 1)
        assert.equal(mapped.next().value, 2)
        assert.equal(mapped.next().value, 3)
        assert.equal(mapped.next().value, 4)
        assert.equal(mapped.next().done, true)
    })

    it('should emit nothing if the take count is less than 0', () => {
        const collection = [1, 2, 3, 4][Symbol.iterator]()
        const mapped = new TakeIterator(collection, 0)
        assert.equal(mapped.next().done, true)
    })
})
