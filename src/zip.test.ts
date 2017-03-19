
import * as assert from 'assert'
import { ZipIterator } from './zip'

describe('ZipIterator', () => {
    it('should emit pairs of values from the passed Iteratos', () => {
        const a = [1, 2, 3, 4][Symbol.iterator]()
        const b = ['a', 'b', 'c', 'd'][Symbol.iterator]()
        const mapped = new ZipIterator(a, b)
        assert.deepEqual(mapped.next().value, [1, 'a'])
        assert.deepEqual(mapped.next().value, [2, 'b'])
        assert.deepEqual(mapped.next().value, [3, 'c'])
        assert.deepEqual(mapped.next().value, [4, 'd'])
        assert.equal(mapped.next().done, true)
    })
    it('should finish if the when the first iterator finishes', () => {
        const a = [1, 2][Symbol.iterator]()
        const b = ['a', 'b', 'c', 'd'][Symbol.iterator]()
        const mapped = new ZipIterator(a, b)
        assert.deepEqual(mapped.next().value, [1, 'a'])
        assert.deepEqual(mapped.next().value, [2, 'b'])
        assert.equal(mapped.next().done, true)
    })
    it('should finish if the when the first iterator finishes', () => {
        const a = [1, 2, 3, 4][Symbol.iterator]()
        const b = ['a', 'b'][Symbol.iterator]()
        const mapped = new ZipIterator(a, b)
        assert.deepEqual(mapped.next().value, [1, 'a'])
        assert.deepEqual(mapped.next().value, [2, 'b'])
        assert.equal(mapped.next().done, true)
    })
})
