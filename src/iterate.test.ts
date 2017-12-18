import * as assert from 'assert'
import { IteratorWithOperators } from './iterate'

describe('IteratorWithOperators', () => {
    describe('join', () => {
        it('should join all emitted values as strings', () => {
            const iterator = new IteratorWithOperators([1, 2, 'a', 'b'][Symbol.iterator]())
            const joined = iterator.join('-')
            assert.equal(joined, '1-2-a-b')
        })
        it('should return empty string for an empty Iterator', () => {
            const iterator = new IteratorWithOperators([][Symbol.iterator]())
            const joined = iterator.join()
            assert.equal(joined, '')
        })
    })
    describe('take', () => {
        it('should take n items from the beginning', () => {
            const iterator = new IteratorWithOperators([1, 2, 3, 4][Symbol.iterator]()).take(2)
            assert.equal(iterator.next().value, 1)
            assert.equal(iterator.next().value, 2)
            assert.equal(iterator.next().done, true)
        })
    })
    describe('drop', () => {
        it('should drop n items from the beginning', () => {
            const iterator = new IteratorWithOperators([1, 2, 3, 4][Symbol.iterator]()).drop(2)
            assert.equal(iterator.next().value, 3)
            assert.equal(iterator.next().value, 4)
            assert.equal(iterator.next().done, true)
        })
    })
    describe('reduce', () => {
        it('should reduce all emitted values by calling the reducer', () => {
            const iterator = new IteratorWithOperators([1, 2, 4, 3][Symbol.iterator]())
            const max = iterator.reduce(Math.max)
            assert.equal(max, 4)
        })
        it('should use provided initial value', () => {
            const iterator = new IteratorWithOperators([1, 2, 3][Symbol.iterator]())
            const sum = iterator.reduce((sum, x) => sum + x, 100)
            assert.equal(sum, 106)
        })
        it('should throw for a reduce on an empty Iterator with no initial value', () => {
            const iterator = new IteratorWithOperators<number>([][Symbol.iterator]())
            assert.throws(() => {
                iterator.reduce(Math.max)
            }, TypeError)
        })
        it('should return initial value for empty Iterator', () => {
            const iterator = new IteratorWithOperators<number>([][Symbol.iterator]())
            const max = iterator.reduce(Math.max, 10)
            assert.equal(max, 10)
        })
        it('should return single value for single element Iterator', () => {
            const iterator = new IteratorWithOperators([1][Symbol.iterator]())
            const max = iterator.reduce(Math.max)
            assert.equal(max, 1)
        })
    })
    describe('includes', () => {
        it('should return true if the element is emitted by the Iterator', () => {
            const iterator = new IteratorWithOperators([1, 2, 3][Symbol.iterator]())
            assert.equal(iterator.includes(2), true)
        })
        it('should return false if the element is not emitted by the Iterator', () => {
            const iterator = new IteratorWithOperators([1, 3, 5, 7][Symbol.iterator]())
            assert.equal(iterator.includes(2), false)
        })
        it('should return false for an empty Iterator', () => {
            const iterator = new IteratorWithOperators<number>([][Symbol.iterator]())
            assert.equal(iterator.includes(2), false)
        })
    })
    describe('some', () => {
        it('should return true if the predicate returns true for any an element', () => {
            const iterator = new IteratorWithOperators([1, 2, 3][Symbol.iterator]())
            const hasEven = iterator.some(n => n % 2 === 0)
            assert.equal(hasEven, true)
        })
        it('should return false if the predicate returns false for all elements', () => {
            const iterator = new IteratorWithOperators([1, 3, 5, 7][Symbol.iterator]())
            const hasEven = iterator.some(n => n % 2 === 0)
            assert.equal(hasEven, false)
        })
        it('should return false for an empty Iterator', () => {
            const iterator = new IteratorWithOperators<number>([][Symbol.iterator]())
            const hasEven = iterator.some(n => n % 2 === 0)
            assert.equal(hasEven, false)
        })
    })
    describe('every', () => {
        it('should return true if the predicate returns true for all elements', () => {
            const iterator = new IteratorWithOperators([2, 4, 6][Symbol.iterator]())
            const hasEven = iterator.every(n => n % 2 === 0)
            assert.equal(hasEven, true)
        })
        it('should return false if the predicate returns false for any element', () => {
            const iterator = new IteratorWithOperators([2, 4, 5, 6][Symbol.iterator]())
            const hasEven = iterator.every(n => n % 2 === 0)
            assert.equal(hasEven, false)
        })
        it('should return true for an empty Iterator', () => {
            const iterator = new IteratorWithOperators<number>([][Symbol.iterator]())
            const hasEven = iterator.every(n => n % 2 === 0)
            assert.equal(hasEven, true)
        })
    })
    describe('forEach', () => {
        it('should callback for every emitted element', () => {
            const iterator = new IteratorWithOperators([1, 2, 3][Symbol.iterator]())
            let i = 1
            iterator.forEach(v => {
                assert.equal(v, i++)
            })
        })
    })
    describe('toArray', () => {
        it('should return all items as an array', () => {
            const iterator = new IteratorWithOperators([1, 2, 3][Symbol.iterator]())
            assert.deepEqual(iterator.toArray(), [1, 2, 3])
        })
    })
    describe('toSet', () => {
        it('should return all items as a Set', () => {
            const iterator = new IteratorWithOperators([1, 2, 3][Symbol.iterator]())
            const set = iterator.toSet()
            assert(set instanceof Set, 'instanceof Set')
            assert.deepEqual(Array.from(set), [1, 2, 3])
        })
    })
    describe('toSet', () => {
        it('should return all items as a Map', () => {
            const iterator = new IteratorWithOperators([['foo', 1], ['bar', 2]][Symbol.iterator]())
            const map = iterator.toMap<string, number>()
            assert(map instanceof Map, 'instanceof Map')
            assert.deepEqual(Array.from(map), [['foo', 1], ['bar', 2]])
        })
    })
})
