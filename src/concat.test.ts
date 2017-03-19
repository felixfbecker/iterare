
import * as assert from 'assert'
import { ConcatIterator } from './concat'

describe('ConcatIterator', () => {
    it('should iterate over all passed iterators sequentially', () => {
        const iterators = [
            [1, 2, 3][Symbol.iterator](),
            [4, 5, 6][Symbol.iterator]()
        ]
        const concat = new ConcatIterator(iterators)
        assert.equal(concat.next().value, 1)
        assert.equal(concat.next().value, 2)
        assert.equal(concat.next().value, 3)
        assert.equal(concat.next().value, 4)
        assert.equal(concat.next().value, 5)
        assert.equal(concat.next().value, 6)
        assert.equal(concat.next().done, true)
    })
})
