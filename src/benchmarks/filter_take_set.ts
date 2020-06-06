/* tslint:disable:no-console */

import * as IxES6 from '@reactivex/ix-es2015-cjs'
import { Event, Suite } from 'benchmark'
import * as IxES5 from 'ix'
import * as _ from 'lodash'
import * as obl from 'obliterator';
import 'rxjs'
import * as Rx from 'rxjs'
import * as RxOp from 'rxjs/operators'
import { iterate } from '../iterate'

const suite = new Suite()

// Simulate iterating over a very lage Set of strings and applying a filter on it, then taking only the first 1000 elements
// Smart implementations should only apply the filter predicate to the first 5 elements

const hugeSet = new Set<string>()
for (let i = 0; i < 100000; i++) {
    hugeSet.add('file:///foo/bar/' + i)
    hugeSet.add('http:///foo/bar/' + i)
}

suite.add('Loop', () => {
    const result = new Set()
    let i = 0
    for (const uri of hugeSet) {
        i++
        if (i === 5) {
            break
        }
        if (!uri.startsWith('file://')) {
            continue
        }
        result.add(uri)
    }
})

suite.add('iterare', () => {
    iterate(hugeSet)
        .filter(uri => uri.startsWith('file://'))
        .take(5)
        .toSet()
})

suite.add('Array method chain', () => {
    return new Set(
        Array.from(hugeSet)
            .filter(uri => uri.startsWith('file://'))
            .slice(0, 5)
    )
})

suite.add('Lodash', () => {
    // Need to convert to Array first, because lodash does not support Sets
    // This uses lodash's lazy evaluation feature
    return new Set(
        _(Array.from(hugeSet))
            .filter((uri: string) => uri.startsWith('file://'))
            .take(5)
            .value()
    )
})

suite.add('RxJS', (deferred: any) => {
    Rx.from(hugeSet[Symbol.iterator]())
        .pipe(
            RxOp.filter((uri: string) => uri.startsWith('file://')),
            RxOp.take(5),
            RxOp.toArray(),
            RxOp.map(arr => new Set(arr))
        )
        .subscribe(result => {
            // Finished
        })
})

suite.add('IxJS (ES5)', () => {
    return IxES5.Iterable.from(hugeSet)
        .filter((uri: string) => uri.startsWith('file://'))
        .take(5)
        .toSet()
})

suite.add('IxJS (ES6)', () => {
    return IxES6.Iterable.from(hugeSet)
        .filter((uri: string) => uri.startsWith('file://'))
        .take(5)
        .toSet()
})

suite.add('obliterator', () => {
    return new Set(
        obl.take(
            obl.filter(
                (uri: string) => uri.startsWith('file://'),
                hugeSet[Symbol.iterator]()
            ), 5
        )
    );
})

suite.on('cycle', (event: Event) => {
    console.log(String(event.target))
})

suite.on('complete', function(this: Suite) {
    console.log('Fastest is ' + this.filter('fastest').map('name' as any))
})

suite.run({ async: true })
