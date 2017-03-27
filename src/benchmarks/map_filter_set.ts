
/* tslint:disable:no-console */

import { Event, Suite } from 'benchmark'
import * as _ from 'lodash'
import 'rxjs'
import { IteratorObservable } from 'rxjs/observable/IteratorObservable.js'
import { iterate } from '../iterate'

const suite = new Suite()

// Simulate iterating over a very lage Set of strings and applying a filter and a map on it

const hugeSet = new Set<string>()
for (let i = 0; i < 10000; i++) {
    hugeSet.add('file:///foo/bar/' + i)
}

suite.add('Loop', () => {
    const result = new Set()
    for (const uri of hugeSet) {
        if (!uri.startsWith('file://')) {
            continue
        }
        result.add(uri.substr('file:///'.length))
    }
})

suite.add('iterare', () => {
    iterate(hugeSet)
        .filter(uri => uri.startsWith('file://'))
        .map(uri => uri.substr('file:///'.length))
        .toSet()
})

suite.add('Array method chain', () => {
    return new Set(
        Array.from(hugeSet)
            .filter(uri => uri.startsWith('file://'))
            .map(uri => uri.substr('file:///'.length))
    )
})

suite.add('Lodash', () => {
    // Need to convert to Array first, because lodash does not support Sets
    // This uses lodash's lazy evaluation feature
    return new Set(
        _(Array.from(hugeSet))
            .filter((uri: string) => uri.startsWith('file://'))
            .map(uri => uri.substr('file:///'.length))
            .value()
    )
})

suite.add('RxJS', () => {
    new IteratorObservable<string>(hugeSet[Symbol.iterator]())
        .filter((uri: string) => uri.startsWith('file://'))
        .map(uri => uri.substr('file:///'.length))
        .toArray()
        .map(arr => new Set(arr))
        .subscribe(result => {
            // Finished
        })
})

suite.on('cycle', (event: Event) => {
    console.log(String(event.target))
})

suite.on('complete', function (this: Suite) {
    console.log('Fastest is ' + this.filter('fastest').map('name' as any))
})

suite.run({ async: true })
