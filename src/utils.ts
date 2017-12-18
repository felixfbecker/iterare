export function isIterator(candidate: any): candidate is Iterator<any> {
    return typeof candidate === 'object' && candidate !== null && typeof candidate.next === 'function'
}

export function isIterable(candidate: any): candidate is Iterable<any> {
    return typeof candidate === 'object' && candidate !== null && typeof candidate[Symbol.iterator] === 'function'
}

export function toIterator<T>(collection: Iterator<T> | Iterable<T>): Iterator<T> {
    if (isIterator(collection)) {
        return collection
    }
    if (isIterable(collection)) {
        return collection[Symbol.iterator]()
    }
    throw new Error('Passed collection is neither an Iterator nor an Iterable')
}
