import * as pt from "pareto-core-types"

// /* eslint
//     "camelcase": "off",
//     "max-len": "off",
//     "@typescript-eslint/no-unused-vars": "off",
// */
// import * as pl from "pareto-core-lib"
// import * as pc from "pareto-core-candidates"
// import * as api from "../../../interface"
// import * as t from "pareto-lang-api"
// import { generateCore } from "./core"
// import { generateDeserializeAPI } from "./deserializeAPI"
// import { generateDeserializeNamespace } from "./deserialize"
// import { generateCreateDeserializer } from "./createDeserializer"
// import { generateBuilder } from "./builder"

// function buildDictionary<T>(
//     builder: (
//         add: (
//             key: string, v: T
//         ) => void
//     ) => void
// ): { [key: string]: T } {
//     const out: { [key: string]: T } = {}
//     builder((key, value) => {
//         out[key] = value
//     })
//     return out
// }

// function buildDictionaryWithNamespaces<T>(
//     namespaces: { [key: string]: { [key: string]: T } }
// ) {
//     const out: { [key: string]: T } = {}
//     pl.createDictionary(namespaces).forEach(() => false, (k, key) => {
//         const ns = k
//         const nsKey = key
//         pl.createDictionary(ns).forEach(() => false, (kk, key) => {
//             if (out[`${key}${nsKey}`] !== undefined) {
//                 pc.panic("key clash")
//             }
//             out[`${key}${nsKey}`] = ns[key]
//         })
//     })
//     return out
// }

// export function generateCode2<PAnnotation>(
//     schema: api.Schema<PAnnotation>,
//     callback: ($: t.__root_B) => void,
// ): void {
//     callback({
//         "namespaces": {
//             "lang": {
//                 "types": {
//                     "boolean": {
//                         "type": {
//                             "type": ["boolean", null],
//                         },
//                     },
//                     "number": {
//                         "type": {
//                             "type": ["number", null],
//                         },
//                     },
//                     "string": {
//                         "type": {
//                             "type": ["string", null],
//                         },
//                     },
//                     "nothing": {
//                         "type": {
//                             "type": ["group", {
//                             }],
//                         },
//                     },
//                 },
//             },
//             "core": generateCore(
//                 schema,
//             ),
//             "build": {
//                 "types": buildDictionary((add) => {
//                     schema["component types"].forEach(() => false, (e, k) => {
//                         function generateBuilderNode(
//                             node: api.Node<PAnnotation>,
//                             keyProperty: api.Property<PAnnotation> | null,
//                         ): t.__type_B {
//                             return {
//                                 "type": ["group", {
//                                     "properties": buildDictionary((add) => {
//                                         node.properties.forEach(() => false, (e, k) => {
//                                             if (e === keyProperty) {
//                                                 return
//                                             }
//                                             add(k, {
//                                                 "type": {
//                                                     "occurence": ["optional", null],
//                                                     "type": ((): t.__type_type_TU_Builder => {
//                                                         switch (e.type[0]) {
//                                                             case "collection": {
//                                                                 const $ = e.type[1]
//                                                                 switch ($.type[0]) {
//                                                                     case "dictionary": {
//                                                                         const $$ = $.type[1]
//                                                                         return ["dictionary", {
//                                                                             "entry": generateBuilderNode($.node, $$["key property"].reference.get()),
//                                                                         }]
//                                                                     }
//                                                                     case "list": {
//                                                                         return ["list", {
//                                                                             "element": generateBuilderNode($.node, null),
//                                                                         }]
//                                                                     }
//                                                                     default:
//                                                                         return pl.au($.type[0])
//                                                                 }
//                                                             }
//                                                             case "component": {
//                                                                 const $ = e.type[1]
//                                                                 return ["type reference", {
//                                                                     "type": {
//                                                                         "type": $.type.reference.name,
//                                                                     },
//                                                                 }]
//                                                             }
//                                                             case "state group": {
//                                                                 const $ = e.type[1]
//                                                                 return ["tagged union", {
//                                                                     "options": buildDictionary((add) => {
//                                                                         $.states.forEach(() => false, (e, k) => {
//                                                                             add(k, {
//                                                                                 "type": generateBuilderNode(e.node, null),
//                                                                             })
//                                                                         })
//                                                                     }),
//                                                                 }]
//                                                             }
//                                                             case "value": {
//                                                                 const $ = e.type[1]
//                                                                 switch ($.type[0]) {
//                                                                     case "boolean":
//                                                                         return ["boolean", null]
//                                                                     case "number":
//                                                                         return ["number", null]
//                                                                     case "string":
//                                                                         return ["string", null]
//                                                                     default:
//                                                                         return pl.au($.type[0])
//                                                                 }
//                                                             }
//                                                             default:
//                                                                 return pl.au(e.type[0])
//                                                         }
//                                                     })(),
//                                                 },
//                                             })
//                                         })
//                                         //"interface calls"
//                                     }),
//                                 }],
//                             }
//                         }
//                         add(k, {
//                             "type": generateBuilderNode(e.node, null),
//                         })
//                     })
//                 }),
//                 "function declarations": {
//                     "build": {
//                         "declaration": {
//                             "in": {
//                                 "type": schema["root type"].reference.name,
//                             },
//                             "out": {
//                                 "namespace selection": {
//                                     "which": ["other", {
//                                         "namespace reference": {
//                                             "namespace": "core",
//                                         },
//                                     }],
//                                 },
//                                 "type": schema["root type"].reference.name,
//                             },
//                         },
//                     },
//                 },
//             },
//             "deserialize api": generateDeserializeAPI(
//             ),
//             "deserialize": generateDeserializeNamespace(
//                 schema,
//             ),
//         },
//         "function implementations": {
//             "build": generateBuilder(
//                 schema,
//             ),
//         },
//         "procedure implementations": {
//             "createDeserializer": generateCreateDeserializer(
//                 schema,
//             ),
//         },
//     })
// }