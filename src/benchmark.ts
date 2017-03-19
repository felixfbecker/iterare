
/* tslint:disable:no-console */

import { Event, Suite } from 'benchmark'
import * as _ from 'lodash'
import { Observable } from 'rxjs'
import { iterate } from './iterate'

const suite = new Suite()

// Simulate iterating over a very lage Set of strings and applying a filter and a map on it

const hugeSet = new Set(new Array<string>(10000).fill('file:///foo/bar'))

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
    return new Set(
        // This uses lodash's lazy evaluation feature
        _(hugeSet)
            .filter((uri: string) => uri.startsWith('file://'))
            .map(uri => uri.substr('file:///'.length))
            .value()
    )
})

suite.add('RxJS', (deferred: any) => {
    Observable.from(Array.from(hugeSet))
        .filter((uri: string) => uri.startsWith('file://'))
        .map(uri => uri.substr('file:///'.length))
        .toArray()
        .subscribe(result => {
            deferred.resolve()
        })
}, { defer: true })

suite.on('cycle', (event: Event) => {
    console.log(String(event.target))
})

suite.on('complete', function (this: Suite) {
    console.log('Fastest is ' + this.filter('fastest').map('name' as any))
})

suite.run({ async: true })
