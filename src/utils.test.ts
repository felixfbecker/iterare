
import * as assert from 'assert'
import { isIterable, isIterator, toIterator } from './utils'

describe('utils', () => {
    describe('toIterator', () => {
        it('should return the input is already an Iterator', () => {
            const iterator = [1, 2, 3][Symbol.iterator]()
            assert.equal(toIterator(iterator), iterator)
        })
        it('should return an iterator for an Iterable', () => {
            const iterable = [1, 2, 3]
            const iterator = toIterator(iterable)
            assert.equal(iterator.next().value, 1)
            assert.equal(iterator.next().value, 2)
            assert.equal(iterator.next().value, 3)
            assert.equal(iterator.next().done, true)
        })
        it('should throw if the input is neither', () => {
            assert.throws(() => {
                toIterator(123 as any)
            })
        })
    })
    describe('isIterator', () => {
        it('should return true for an Iterator', () => {
            const iterator = { next() { /* empty */ } }
            assert.equal(isIterator(iterator), true)
        })
        it('should return false for an Iterable', () => {
            const iterable = [1, 2, 3]
            assert.equal(isIterator(iterable), false)
        })
        it('should return false for null', () => {
            assert.equal(isIterator(null), false)
        })
        it('should return false for a scalar', () => {
            assert.equal(isIterator(true), false)
        })
        it('should return false for an object with a next property', () => {
            assert.equal(isIterator({ next: 123 }), false)
        })
    })
    describe('isIterable', () => {
        it('should return true for an Iterable', () => {
            const iterable = [1, 2, 3]
            assert.equal(isIterable(iterable), true)
        })
        it('should return false for an Iterator', () => {
            const iterator = { next() { /* empty */ } }
            assert.equal(isIterable(iterator), false)
        })
        it('should return false for null', () => {
            assert.equal(isIterable(null), false)
        })
        it('should return false for a scalar', () => {
            assert.equal(isIterable(true), false)
        })
    })
})
