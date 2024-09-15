// import * as pt from 'pareto-core-types'
// import * as pc from "pareto-core-candidates"

// // export function dictionaryIsEmpty<T>(
// //     dict: pt.Dictionary<T>
// // ) {
// //     let isEmpty = true
// //     dict.forEach(() => false, () => {
// //         isEmpty = false
// //     })
// //     return isEmpty
// // }

// // export function listIsEmpty<T>(
// //     list: pt.Array<T>
// // ) {
// //     let isEmpty = true
// //     list.forEach(() => {
// //         isEmpty = false
// //     })
// //     return isEmpty
// // }

// export function getEntry<T>(
//     dict: pt.Dictionary<T>,
//     keyToBeFound: string,
// ): null | T {

//     let entry: T | null = null
//     dict.forEach(() => false, ($, key) => {
//         if (key === keyToBeFound) {
//             entry = $
//         }
//     })
//     return entry
// }


// export function getUnsafeEntry<T>(
//     dict: pt.Dictionary<T>,
//     keyToBeFound: string,
// ): T {
//     const entry = getEntry(dict, keyToBeFound)
//     if (entry === null) {
//         pc.panic("MISSING ENTRY")
//     } else {
//         return entry
//     }
// }



// export function concat<T>(
//     array: pt.Array<T>,
//     element: T
// ): pt.Array<T> {
//     const builder = pc.createArrayBuilderFIXME<T>()
//     array.forEach(($) => builder.push($))
//     builder.push(element)
//     return builder.toArray()
// }