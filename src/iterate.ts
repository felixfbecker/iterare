
import { ConcatIterator } from './concat'
import { FilterIterator } from './filter'
import { FlattenIterator } from './flatten'
import { MapIterator } from './map'
import { toIterator } from './utils'
import { ZipIterator } from './zip'

export class IteratorWithOperators<T> implements IterableIterator<T> {

    /**
     * @param source Iterator to wrap
     */
    constructor(private source: Iterator<T>) {}

    /**
     * Returns a `{ value, done }` object that adheres to the Iterator protocol
     */
    next(): IteratorResult<T> {
        return this.source.next()
    }

    /**
     * The presence of this method makes the Iterator itself Iterable.
     * This makes it possible to pass it to `for of` and Iterable-accepting functions like `Array.from()`
     */
    [Symbol.iterator](): this {
        return this
    }

    /**
     * Returns a new Iterator by running each element thru iteratee
     */
    map<R>(iteratee: (value: T) => R): IteratorWithOperators<R> {
        return new IteratorWithOperators(new MapIterator(this.source, iteratee))
    }

    /**
     * Returns a new Iterator of all elements predicate returns truthy for
     */
    filter(predicate: (element: T) => boolean): IteratorWithOperators<T> {
        return new IteratorWithOperators(new FilterIterator(this.source, predicate))
    }

    /**
     * Returns a new Iterator concatenating the Iterator with an additional Iterator or Iterable
     */
    concat<C>(collection: Iterable<C> | Iterator<C>): IteratorWithOperators<T | C> {
        return new IteratorWithOperators(new ConcatIterator<T | C>([this.source, toIterator(collection)]))
    }

    /**
     * Returns a new Iterator that flattens items emitted by the Iterator a single level deep
     */
    flatten<R>(): IteratorWithOperators<R> {
        return new IteratorWithOperators(new FlattenIterator<R>(this.source))
    }

    /**
     * Reduces the Iterator to a value which is the accumulated result of running each emitted element thru iteratee,
     * where each successive invocation is supplied the return value of the previous.
     * The first element of collection is used as the initial value.
     */
    reduce(iteratee: (acc: T, val: T) => T): T;
    /**
     * Reduces the Iterator to a value which is the accumulated result of running each emitted element thru iteratee,
     * where each successive invocation is supplied the return value of the previous.
     *
     * @param initialValue The initial value for `acc`
     */
    reduce<A>(iteratee: (acc: A, val: T) => A, initialValue: A): A;
    reduce(iteratee: (acc: any, val: any) => any, accumulator?: any): any {
        let result: IteratorResult<T>
        if (accumulator === undefined) {
            result = this.source.next()
            if (result.done) {
                throw new TypeError('Reduce of empty Iterator with no initial value')
            }
            accumulator = result.value
        }
        while (true) {
            result = this.source.next()
            if (result.done) {
                break
            }
            accumulator = iteratee(accumulator, result.value)
        }
        return accumulator
    }

    /**
     * Iterates and checks if `value` is emitted by the Iterator
     *
     * @param value The value to search
     */
    includes(value: T): boolean {
        let result: IteratorResult<T>
        do {
            result = this.source.next()
            if (!result.done && result.value === value) {
                return true
            }
        } while (!result.done)
        return false
    }

    /**
     * Iterates and checks if `predicate` returns truthy for any element emitted by the Iterator
     */
    some(predicate: (value: T) => boolean): boolean {
        let result: IteratorResult<T>
        do {
            result = this.source.next()
            if (!result.done && predicate(result.value)) {
                return true
            }
        } while (!result.done)
        return false
    }

    /**
     * Iterates and checks if `predicate` returns truthy for all elements emitted by the Iterator
     */
    every(predicate: (value: T) => boolean): boolean {
        let result: IteratorResult<T>
        do {
            result = this.source.next()
            if (!result.done && !predicate(result.value)) {
                return false
            }
        } while (!result.done)
        return true
    }

    /**
     * Iterates and invokes `iteratee` for every element emitted by the Iterator
     */
    forEach(iteratee: (value: T) => any): void {
        let result: IteratorResult<T>
        while (true) {
            result = this.source.next()
            if (result.done) {
                break
            }
            iteratee(result.value)
        }
    }

    /**
     * Iterates and joins all elements emitted by the Iterator together as a string separated by an optional separator
     */
    join(separator = ','): string {
        let joined = ''
        let result: IteratorResult<T>
        while (true) {
            result = this.source.next()
            if (result.done) {
                break
            }
            joined += separator + result.value
        }
        return joined.substr(1)
    }

    /**
     * Iterates and returns all items emitted by the Iterator as an array.
     * Equivalent to passing the Iterator to `Array.from()`
     */
    toArray(): T[] {
        return Array.from(this)
    }

    /**
     * Iterates and returns all items emitted by the Iterator as an ES6 Set.
     * Equivalent to passing the Iterator to `new Set()`
     */
    toSet(): Set<T> {
        const set = new Set<T>()
        while (true) {
            const { value, done } = this.next()
            if (done) {
                return set
            }
            set.add(value)
        }
    }

    /**
     * Iterates and returns all `[key, value]` paris emitted by the Iterator as an ES6 Map.
     * Equivalent to passing the Iterator to `new Map()`
     */
    toMap<K, V>(): Map<K, V> {
        return new Map<K, V>(this as any)
    }
}

/**
 * Creates an Iterator with advanced chainable operator methods for any Iterable or Iterator
 */
export function iterate<T>(collection: Iterator<T> | Iterable<T>) {
    return new IteratorWithOperators(toIterator(collection))
}

/**
 * Creates an Iterator that emits pairs of values from the two passed Iterators
 */
export function zip<A, B>(a: Iterator<A> | Iterable<A>, b: Iterator<B> | Iterable<B>) {
    return new IteratorWithOperators(new ZipIterator(toIterator(a), toIterator(b)))
}

export default iterate
