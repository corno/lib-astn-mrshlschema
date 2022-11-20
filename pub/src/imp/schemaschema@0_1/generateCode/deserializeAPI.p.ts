// /* eslint
//     "camelcase": "off",
//     "max-len": "off",
//     "@typescript-eslint/no-unused-vars": "off",
// */
// import * as t from "pareto-lang-api"

// export function generateDeserializeAPI(
// ): t.__namespaces_B {
//     return {
//         "type parameters": {
//             "Annotation": {},
//             "NonAnnotation": {},
//         },
//         "types": {
//             "StringToken": {
//                 "type": {
//                     "type": ["group", {
//                         "properties": {
//                             "token": {
//                                 "type": {
//                                     "type": ["group", {
//                                         "properties": {
//                                             "data": {
//                                                 "type": {
//                                                     "type": ["group", {
//                                                         "properties": {
//                                                             "value": {
//                                                                 "type": {
//                                                                     "type": ["string", null],
//                                                                 },
//                                                             },
//                                                         },
//                                                     }],
//                                                 },
//                                             },
//                                         },
//                                     }],
//                                 },
//                             },
//                             "annotation": {
//                                 "type": {
//                                     "type": ["type argument", {
//                                         "argument": "Annotation",
//                                     }],
//                                 },
//                             },
//                         },
//                     }],
//                 },
//             },
//             "ValidationError": {
//                 "type": {
//                     "type": ["group", {
//                         "properties": {
//                             "message": {
//                                 "type": {
//                                     "type": ["string", null],
//                                 },
//                             },
//                             "annotation": {
//                                 "type": {
//                                     "type": ["type argument", {
//                                         "argument": "Annotation",
//                                     }],
//                                 },
//                             },
//                         },
//                     }],
//                 },
//             },
//         },
//         interfaces: {
//             "ValueHandler": {
//                 "definition": {
//                     "type": ["group", {
//                         "members": {
//                         },
//                     }],
//                 },
//             },
//             "RequiredValueHandler": {
//                 "definition": {
//                     "type": ["group", {
//                         "members": {
//                             "exists": {
//                                 "definition": {
//                                     "type": ["reference", {
//                                         "interface": "ValueHandler",
//                                         // "type arguments": {
//                                         //     "Annotation": {},
//                                         //     "NonAnnotation": {},
//                                         // },
//                                     }],
//                                 },
//                             },
//                             "missing": {
//                                 "definition": {
//                                     "type": ["method", {
//                                         "type": {
//                                             "namespace selection": {
//                                                 "which": ["other", {
//                                                     "namespace reference": {
//                                                         "namespace": "lang",
//                                                     },
//                                                 }],
//                                             },
//                                             "type": "nothing",
//                                         },
//                                     }],
//                                 },
//                             },
//                         },
//                     }],
//                 },
//             },
//         },
//         "interface builders": {
//             "ExpectContext": {
//                 "methods": {
//                     "expectVerboseGroup": {
//                         "declaration": {
//                             "return type": ["interface", {
//                                 "interface": {
//                                     "type": ["reference", {
//                                         "interface": "ValueHandler",
//                                         // "type arguments": {
//                                         //     "Annotation": {},
//                                         //     "NonAnnotation": {},
//                                         // },
//                                     }],
//                                 },

//                             }],
//                             "interfaces": {
//                                 "properties": {
//                                     "interface": {
//                                         "type": ["dictionary", {
//                                             "entry": {
//                                                 "type": ["group", {
//                                                     "members": {
//                                                         "onExists": {
//                                                             "definition": {
//                                                                 "type": ["method", {
//                                                                     "type": {
//                                                                         "namespace selection": {
//                                                                             "which": ["other", {
//                                                                                 "namespace reference": {
//                                                                                     "namespace": "lang",
//                                                                                 },
//                                                                             }],
//                                                                         },
//                                                                         "type": "nothing",
//                                                                     },
//                                                                 }],
//                                                             },
//                                                         },
//                                                     },
//                                                 }],
//                                             },
//                                         }],
//                                     },
//                                 },
//                                 "onEnd": {
//                                     "interface": {
//                                         "type": ["method", {
//                                             "type": {
//                                                 "namespace selection": {
//                                                     "which": ["other", {
//                                                         "namespace reference": {
//                                                             "namespace": "lang",
//                                                         },
//                                                     }],
//                                                 },
//                                                 "type": "nothing",
//                                             },
//                                         }],
//                                     },
//                                 },
//                             },
//                         },
//                     },
//                     "expectDictionary": {
//                         "declaration": {
//                             "return type": ["interface", {
//                                 "interface": {
//                                     "type": ["reference", {
//                                         "interface": "ValueHandler",
//                                         // "type arguments": {
//                                         //     "Annotation": {},
//                                         //     "NonAnnotation": {},
//                                         // },
//                                     }],
//                                 },

//                             }],
//                             "interfaces": {
//                                 "onProperty": {
//                                     "interface": {
//                                         "type": ["method", {
//                                             "type": {
//                                                 "type": "StringToken",
//                                             },
//                                             "return type": ["interface", {
//                                                 "interface": {
//                                                     "type": ["reference", {
//                                                         "interface": "RequiredValueHandler",
//                                                         // "type arguments": {
//                                                         //     "Annotation": {},
//                                                         //     "NonAnnotation": {},
//                                                         // },
//                                                     }],
//                                                 },
//                                             }],
//                                         }],
//                                     },
//                                 },
//                             },
//                         },
//                     },
//                     "expectQuotedString": {
//                         "declaration": {
//                             "return type": ["interface", {
//                                 "interface": {
//                                     "type": ["reference", {
//                                         "interface": "ValueHandler",
//                                         // "type arguments": {
//                                         //     "Annotation": {},
//                                         //     "NonAnnotation": {},
//                                         // },
//                                     }],
//                                 },

//                             }],
//                             "interfaces": {
//                                 "callback": {
//                                     "interface": {
//                                         "type": ["method", {
//                                             "type": {
//                                                 "type": "StringToken",
//                                             },
//                                         }],
//                                     },
//                                 },
//                             },
//                         },
//                     },
//                     "expectTaggedUnion": {
//                         "declaration": {
//                             "return type": ["interface", {
//                                 "interface": {
//                                     "type": ["reference", {
//                                         "interface": "ValueHandler",
//                                         // "type arguments": {
//                                         //     "Annotation": {},
//                                         //     "NonAnnotation": {},
//                                         // },
//                                     }],
//                                 },

//                             }],
//                             "interfaces": {
//                                 "options": {
//                                     "interface": {
//                                         "type": ["dictionary", {
//                                             "entry": {
//                                                 "type": ["method", {
//                                                     "type": {
//                                                         "namespace selection": {
//                                                             "which": ["other", {
//                                                                 "namespace reference": {
//                                                                     "namespace": "lang",
//                                                                 },
//                                                             }],
//                                                         },
//                                                         "type": "nothing",
//                                                     },
//                                                     "return type": ["interface", {
//                                                         "interface": {
//                                                             "type": ["reference", {
//                                                                 "interface": "RequiredValueHandler",
//                                                                 // "type arguments": {
//                                                                 //     "Annotation": {},
//                                                                 //     "NonAnnotation": {},
//                                                                 // },
//                                                             }],
//                                                         },
//                                                     }],
//                                                 }],
//                                             },
//                                         }],
//                                     },
//                                 },
//                             },
//                         },
//                     },
//                     "expectList": {
//                         "declaration": {
//                             "return type": ["interface", {
//                                 "interface": {
//                                     "type": ["reference", {
//                                         "interface": "ValueHandler",
//                                         // "type arguments": {
//                                         //     "Annotation": {},
//                                         //     "NonAnnotation": {},
//                                         // },
//                                     }],
//                                 },

//                             }],
//                             "interfaces": {
//                                 "onElement": {
//                                     "interface": {
//                                         "type": ["method", {
//                                             "type": {
//                                                 "namespace selection": {
//                                                     "which": ["other", {
//                                                         "namespace reference": {
//                                                             "namespace": "lang",
//                                                         },
//                                                     }],
//                                                 },
//                                                 "type": "nothing",
//                                             },
//                                             "return type": ["interface", {
//                                                 "interface": {
//                                                     "type": ["reference", {
//                                                         "interface": "ValueHandler",
//                                                         // "type arguments": {
//                                                         //     "Annotation": {},
//                                                         //     "NonAnnotation": {},
//                                                         // },
//                                                     }],
//                                                 },
//                                             }],
//                                         }],
//                                     },
//                                 },
//                             },
//                         },
//                     },
//                 },
//             },
//         },
//     }
// }