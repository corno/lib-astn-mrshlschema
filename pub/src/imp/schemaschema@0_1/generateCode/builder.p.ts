// /* eslint
//     "@typescript-eslint/no-unused-vars": "off",
// */

// import * as api from "../../../interface"
// import * as pl from 'pareto-core-lib'
// import * as t from "pareto-lang-api"

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

// export function generateBuilder<PAnnotation>(
//     schema: api.Schema<PAnnotation>,
// ): t.__function_implementations_B {
//     return {
//         "namespace reference": {
//             "namespace": "build",
//         },
//         "declaration": "build",
//         "block": {
//             "functions": buildDictionary((add) => {
//                 schema["component types"].forEach(() => false, ($, key) => {
//                     function generateTypeBuilder(
//                         $: api.Node<PAnnotation>,
//                         keyProperty: null | api.Property<PAnnotation>,
//                     ): t.__type_expression_B {
//                         return {
//                             "strategy": ["literal", {
//                                 "type": ["group", {
//                                     "properties": buildDictionary((add) => {
//                                         $.properties.forEach(() => false, ($, key) => {
//                                             if ($ === keyProperty) {
//                                                 return
//                                             }
//                                             add(key, {
//                                                 "expression": {
//                                                     "strategy": ((): t.__strategy_type_expression_TU_Builder => {
//                                                         switch ($.type[0]) {
//                                                             case "collection":
//                                                                 return pl.cc($.type[1], ($): t.__strategy_type_expression_TU_Builder => {
//                                                                     return ["map", {
//                                                                         "entry": generateTypeBuilder(
//                                                                             $.node,
//                                                                             ((): null | api.Property<PAnnotation> => {
//                                                                                 switch ($.type[0]) {
//                                                                                     case "dictionary":
//                                                                                         return pl.cc($.type[1], ($) => {
//                                                                                             return $["key property"].reference.get()
//                                                                                         })
//                                                                                     case "list":
//                                                                                         return pl.cc($.type[1], ($) => {
//                                                                                             return null
//                                                                                         })
//                                                                                     default:
//                                                                                         return pl.au($.type[0])
//                                                                                 }
//                                                                             })()
//                                                                         ),
//                                                                     }]
//                                                                 })
//                                                             case "component":
//                                                                 return pl.cc($.type[1], ($): t.__strategy_type_expression_TU_Builder => {
//                                                                     return ["copy", {
//                                                                         "context": {
//                                                                             "start": {
//                                                                                 "start": ["function", {
//                                                                                     "context": ["local function", {
//                                                                                         "function": `build_${$.type.reference.name}`,
//                                                                                     }],
//                                                                                 }],
//                                                                             },
//                                                                         },
//                                                                     }]
//                                                                 })
//                                                             case "state group":
//                                                                 return pl.cc($.type[1], ($): t.__strategy_type_expression_TU_Builder => {
//                                                                     return ["switch", {
//                                                                         "context": {
//                                                                             // "strategy": ["from context", {
//                                                                             // }],
//                                                                             "missing handler": {
//                                                                                 "guaranteed": ["no", {
//                                                                                     "on missing": {
//                                                                                         "strategy": ["literal", {
//                                                                                             "type": ["tagged union", {
//                                                                                                 "option": $["default state"].reference.name,
//                                                                                                 "data": generateTypeBuilder(
//                                                                                                     $["default state"].reference.get().node,
//                                                                                                     null,
//                                                                                                 ),
//                                                                                             }],
//                                                                                         }],
//                                                                                     },
//                                                                                 }],
//                                                                             },
//                                                                         },
//                                                                         "options": buildDictionary((add) => {
//                                                                             $.states.forEach(() => false, ($, k) => {
//                                                                                 add(k, {
//                                                                                     "expression": {
//                                                                                         "strategy": ["literal", {
//                                                                                             "type": ["tagged union", {
//                                                                                                 "option": k,
//                                                                                                 "data": {
//                                                                                                     //"strategy":
//                                                                                                 },
//                                                                                             }],
//                                                                                         }],
//                                                                                     },
//                                                                                 })
//                                                                             })
//                                                                         }),
//                                                                     }]
//                                                                     // return ["literal", {
//                                                                     //     "type": ["tagged union", {
//                                                                     //         "option": $["default state"].name,
//                                                                     //         "data": generateTypeBuilder(
//                                                                     //             $["default state"].get().node,
//                                                                     //             null,
//                                                                     //         ),
//                                                                     //     }],
//                                                                     // }]
//                                                                 })
//                                                             case "value":
//                                                                 return pl.cc($.type[1], ($): t.__strategy_type_expression_TU_Builder => {
//                                                                     return ["copy", {
//                                                                         "context": {
//                                                                             "start": {
//                                                                                 "start": ["context", {
//                                                                                 }],
//                                                                             },
//                                                                             "steps": [{ "property": key }],
//                                                                         },
//                                                                         // "guaranteed": ["no", {
//                                                                         //     "on missing": {
//                                                                         //         "strategy": ["literal", {
//                                                                         //             "type": ((): t.__type_literal_TU_Builder => {
//                                                                         //                 const x = $["default value"]
//                                                                         //                 switch ($.type[0]) {
//                                                                         //                     case "boolean":
//                                                                         //                         return pl.cc($.type[1], ($): t.__type_literal_TU_Builder => {
//                                                                         //                             return ["boolean", {
//                                                                         //                                 "value": x,
//                                                                         //                             }]
//                                                                         //                         })
//                                                                         //                     case "number":
//                                                                         //                         return pl.cc($.type[1], ($) => {
//                                                                         //                             return ["number", {
//                                                                         //                                 "value": x,
//                                                                         //                             }]
//                                                                         //                         })
//                                                                         //                     case "string":
//                                                                         //                         return pl.cc($.type[1], ($) => {
//                                                                         //                             return ["string", {
//                                                                         //                                 "value": x,
//                                                                         //                             }]
//                                                                         //                         })
//                                                                         //                     default:
//                                                                         //                         return pl.au($.type[0])
//                                                                         //                 }
//                                                                         //             })(),
//                                                                         //         }],
//                                                                         //     },
//                                                                         // }],
//                                                                     }]
//                                                                 })
//                                                             default:
//                                                                 return pl.au($.type[0])
//                                                         }
//                                                     })(),
//                                                 },
//                                             })
//                                         })
//                                     }),
//                                 }],
//                             }],
//                         }
//                     }
//                     function generateDefaultTypeBuilder(
//                         $: api.Node<PAnnotation>,
//                         keyProperty: null | api.Property<PAnnotation>,
//                     ): t.__type_expression_B {
//                         return {
//                             "strategy": ["literal", {
//                                 "type": ["group", {
//                                     "properties": buildDictionary((add) => {
//                                         $.properties.forEach(() => false, ($, key) => {
//                                             if ($ === keyProperty) {
//                                                 return
//                                             }
//                                             add(key, {
//                                                 "expression": {
//                                                     "strategy": ((): t.__strategy_type_expression_TU_Builder => {
//                                                         switch ($.type[0]) {
//                                                             case "collection":
//                                                                 return pl.cc($.type[1], ($): t.__strategy_type_expression_TU_Builder => {
//                                                                     switch ($.type[0]) {
//                                                                         case "dictionary":
//                                                                             return pl.cc($.type[1], ($) => {
//                                                                                 return ["literal", {
//                                                                                     "type": ["dictionary", null],
//                                                                                 }]
//                                                                             })
//                                                                         case "list":
//                                                                             return pl.cc($.type[1], ($) => {
//                                                                                 return ["literal", {
//                                                                                     "type": ["list", null],
//                                                                                 }]
//                                                                             })
//                                                                         default:
//                                                                             return pl.au($.type[0])
//                                                                     }
//                                                                 })
//                                                             case "component":
//                                                                 return pl.cc($.type[1], ($): t.__strategy_type_expression_TU_Builder => {
//                                                                     return ["copy", {
//                                                                         "context": {
//                                                                             "start": {
//                                                                                 "start": ["function", {
//                                                                                     "context": ["local function", {
//                                                                                         "function": `buildDefault_${$.type.reference.name}`,
//                                                                                     }],
//                                                                                 }],
//                                                                             },
//                                                                         },
//                                                                     }]
//                                                                 })
//                                                             case "state group":
//                                                                 return pl.cc($.type[1], ($): t.__strategy_type_expression_TU_Builder => {
//                                                                     return ["literal", {
//                                                                         "type": ["tagged union", {
//                                                                             "option": $["default state"].reference.name,
//                                                                             "data": generateTypeBuilder(
//                                                                                 $["default state"].reference.get().node,
//                                                                                 null,
//                                                                             ),
//                                                                         }],
//                                                                     }]
//                                                                 })
//                                                             case "value":
//                                                                 return pl.cc($.type[1], ($): t.__strategy_type_expression_TU_Builder => {
//                                                                     return ["literal", {
//                                                                         "type": ((): t.__type_literal_TU_Builder => {
//                                                                             const x = $["default value"]
//                                                                             switch ($.type[0]) {
//                                                                                 case "boolean":
//                                                                                     return pl.cc($.type[1], ($): t.__type_literal_TU_Builder => {
//                                                                                         return ["boolean", {
//                                                                                             "value": x,
//                                                                                         }]
//                                                                                     })
//                                                                                 case "number":
//                                                                                     return pl.cc($.type[1], ($) => {
//                                                                                         return ["number", {
//                                                                                             "value": x,
//                                                                                         }]
//                                                                                     })
//                                                                                 case "string":
//                                                                                     return pl.cc($.type[1], ($) => {
//                                                                                         return ["string", {
//                                                                                             "value": x,
//                                                                                         }]
//                                                                                     })
//                                                                                 default:
//                                                                                     return pl.au($.type[0])
//                                                                             }
//                                                                         })(),
//                                                                     }]
//                                                                 })
//                                                             default:
//                                                                 return pl.au($.type[0])
//                                                         }
//                                                     })(),
//                                                 },
//                                             })
//                                         })
//                                     }),
//                                 }],
//                             }],
//                         }
//                     }
//                     add(`build_${key}`, {
//                         "declaration": {
//                             "in": {
//                                 "type": key,
//                             },
//                             "out": {
//                                 "type": key,
//                             },
//                         },
//                         "block": {
//                             "expression": generateTypeBuilder(
//                                 $.node,
//                                 null,
//                             ),
//                         },
//                     })
//                     add(`buildDefault_${key}`, {
//                         "declaration": {
//                             "in": {
//                                 "namespace selection": {
//                                     "which": ["other", {
//                                         "namespace reference": {
//                                             "namespace": "lang",
//                                         },
//                                     }],
//                                 },
//                                 "type": "nothing",
//                             },
//                             "out": {
//                                 "type": key,
//                             },
//                         },
//                         "block": {
//                             "expression": generateDefaultTypeBuilder(
//                                 $.node,
//                                 null,
//                             ),
//                         },
//                     })
//                 })
//             }),
//             "expression": {
//                 "strategy": ["copy", {
//                     "context": {
//                         "start": {
//                             "start": ["function", {
//                                 "context": ["local function", {
//                                     "function": `build_${schema["root type"].reference.name}`,
//                                 }],
//                                 "argument": {
//                                     "strategy": ["copy", {

//                                     }],
//                                 },
//                             }],
//                         },
//                     },
//                 }],
//             },
//         },
//     }
// }