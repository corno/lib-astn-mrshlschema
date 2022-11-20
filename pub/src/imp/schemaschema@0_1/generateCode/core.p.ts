// /* eslint
//     "camelcase": "off",
//     "max-len": "off",
//     "@typescript-eslint/no-unused-vars": "off",
// */
// import * as api from "../../../interface"
// import * as t from "pareto-lang-api"
// import * as pl from "pareto-core-lib"

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

// export function generateCore<PAnnotation>(
//     schema: api.Schema<PAnnotation>,
// ): t.__namespaces_B {
//     return {
//         "types": buildDictionary((add) => {
//             schema["component types"].forEach(() => false, (e, k) => {
//                 function generateNode(
//                     node: api.Node<PAnnotation>,
//                     keyProperty: api.Property<PAnnotation> | null,
//                 ): t.__type_B {
//                     return {
//                         "type": ["group", {
//                             "properties": buildDictionary((add) => {
//                                 node.properties.forEach(() => false, (e, k) => {
//                                     if (e === keyProperty) {
//                                         return
//                                     }
//                                     add(k, {
//                                         "type": {
//                                             "type": ((): t.__type_type_TU_Builder => {
//                                                 switch (e.type[0]) {
//                                                     case "collection": {
//                                                         const $ = e.type[1]
//                                                         switch ($.type[0]) {
//                                                             case "dictionary": {
//                                                                 const $$ = $.type[1]
//                                                                 return ["dictionary", {
//                                                                     "entry": generateNode($.node, $$["key property"].reference.get()),
//                                                                 }]
//                                                             }
//                                                             case "list": {
//                                                                 return ["list", {
//                                                                     "element": generateNode($.node, null),
//                                                                 }]
//                                                             }
//                                                             default:
//                                                                 return pl.au($.type[0])
//                                                         }
//                                                     }
//                                                     case "component": {
//                                                         const $ = e.type[1]
//                                                         return ["type reference", {
//                                                             "type": {
//                                                                 "type": $.type.reference.name,
//                                                             },
//                                                         }]
//                                                     }
//                                                     case "state group": {
//                                                         const $ = e.type[1]
//                                                         return ["tagged union", {
//                                                             "options": buildDictionary((add) => {
//                                                                 $.states.forEach(() => false, (e, k) => {
//                                                                     add(k, {
//                                                                         "type": generateNode(e.node, null),
//                                                                     })
//                                                                 })
//                                                             }),
//                                                         }]
//                                                     }
//                                                     case "value": {
//                                                         const $ = e.type[1]
//                                                         switch ($.type[0]) {
//                                                             case "boolean":
//                                                                 return ["boolean", null]
//                                                             case "number":
//                                                                 return ["number", null]
//                                                             case "string":
//                                                                 return ["string", null]
//                                                             default:
//                                                                 return pl.au($.type[0])
//                                                         }
//                                                     }
//                                                     default:
//                                                         return pl.au(e.type[0])
//                                                 }
//                                             })(),
//                                         },
//                                     })
//                                 })
//                             }),
//                         }],
//                     }
//                 }
//                 add(k, {
//                     "type": generateNode(e.node, null),
//                 })
//             })
//         }),
//     }
// }