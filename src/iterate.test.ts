
import * as assert from 'assert'
import { IteratorWithOperators } from './iterate'

describe('IteratorWithOperators', () => {
    describe('join', () => {
        it('should join all emitted values as strings', () => {
            const iterator = new IteratorWithOperators([1, 2, 'a', 'b'])
            const joined = iterator.join()
            assert.equal(joined, '12ab')
        })
        it('should return empty string for an empty Iterator', () => {
            const iterator = new IteratorWithOperators([])
            const joined = iterator.join()
            assert.equal(joined, '')
        })
    })
    describe('reduce', () => {
        it('should reduce all emitted values by calling the reducer', () => {
            const iterator = new IteratorWithOperators([1, 2, 4, 3])
            const max = iterator.reduce(Math.max)
            assert.equal(max, 4)
        })
        it('should use provided initial value', () => {
            const iterator = new IteratorWithOperators([1, 2, 3])
            const sum = iterator.reduce((sum, x) => sum + x, 100)
            assert.equal(sum, 106)
        })
        it('should throw for a reduce on an empty Iterator with no initial value', () => {
            const iterator = new IteratorWithOperators<number>([])
            assert.throws(() => {
                iterator.reduce(Math.max)
            }, TypeError)
        })
        it('should return initial value for empty Iterator', () => {
            const iterator = new IteratorWithOperators<number>([])
            const max = iterator.reduce(Math.max, 10)
            assert.equal(max, 10)
        })
        it('should return single value for single element Iterator', () => {
            const iterator = new IteratorWithOperators([1])
            const max = iterator.reduce(Math.max)
            assert.equal(max, 1)
        })
    })
    describe('includes', () => {
        it('should return true if the element is emitted by the Iterator', () => {
            const iterator = new IteratorWithOperators([1, 2, 3])
            assert.equal(iterator.includes(2), true)
        })
        it('should return false if the element is not emitted by the Iterator', () => {
            const iterator = new IteratorWithOperators([1, 3, 5, 7])
            assert.equal(iterator.includes(2), false)
        })
        it('should return false for an empty Iterator', () => {
            const iterator = new IteratorWithOperators<number>([])
            assert.equal(iterator.includes(2), false)
        })
    })
    describe('some', () => {
        it('should return true if the predicate returns true for any an element', () => {
            const iterator = new IteratorWithOperators([1, 2, 3])
            const hasEven = iterator.some(n => n % 2 === 0)
            assert.equal(hasEven, true)
        })
        it('should return false if the predicate returns false for all elements', () => {
            const iterator = new IteratorWithOperators([1, 3, 5, 7])
            const hasEven = iterator.some(n => n % 2 === 0)
            assert.equal(hasEven, false)
        })
        it('should return false for an empty Iterator', () => {
            const iterator = new IteratorWithOperators<number>([])
            const hasEven = iterator.some(n => n % 2 === 0)
            assert.equal(hasEven, false)
        })
    })
    describe('every', () => {
        it('should return true if the predicate returns true for all elements', () => {
            const iterator = new IteratorWithOperators([2, 4, 6])
            const hasEven = iterator.every(n => n % 2 === 0)
            assert.equal(hasEven, true)
        })
        it('should return false if the predicate returns false for any element', () => {
            const iterator = new IteratorWithOperators([2, 4, 5, 6])
            const hasEven = iterator.every(n => n % 2 === 0)
            assert.equal(hasEven, false)
        })
        it('should return true for an empty Iterator', () => {
            const iterator = new IteratorWithOperators<number>([])
            const hasEven = iterator.every(n => n % 2 === 0)
            assert.equal(hasEven, true)
        })
    })
    describe('forEach', () => {
        it('should callback for every emitted element', () => {
            const iterator = new IteratorWithOperators([1, 2, 3])
            let i = 1
            iterator.forEach(v => {
                assert.equal(v, i++)
            })
        })
    })
    describe('toArray', () => {
        it('should return all items as an array', () => {
            const iterator = new IteratorWithOperators([1, 2, 3])
            assert.deepEqual(iterator.toArray(), [1, 2, 3])
        })
    })
    describe('toSet', () => {
        it('should return all items as a Set', () => {
            const iterator = new IteratorWithOperators([1, 2, 3])
            const set = iterator.toSet()
            assert(set instanceof Set, 'instanceof Set')
            assert.deepEqual(Array.from(set), [1, 2, 3])
        })
    })
    describe('toSet', () => {
        it('should return all items as a Map', () => {
            const iterator = new IteratorWithOperators([['foo', 1], ['bar', 2]])
            const map = iterator.toMap<string, number>()
            assert(map instanceof Map, 'instanceof Map')
            assert.deepEqual(Array.from(map), [['foo', 1], ['bar', 2]])
        })
    })
})
