// import * as astn from "astn-typedhandlers-api"
// import * as pt from 'pareto-core-types'
// import * as pl from 'pareto-core-lib'
// import * as api from "../../interface"
// import * as pra from "pareto-resolve-lib"

// export function convertToASTNSchema<PAnnotation>(
//     schema: api.Schema<PAnnotation>,
//     x: pra.ResolveRegistry<PAnnotation>,
// ): astn.Schema {

//     function convertToASTNSchemaValue(
//         node: api.Node<PAnnotation>, componentTypes: pt.Lookup<astn.TypeDefinition>,
//         keyProperty: null | api.Property<PAnnotation>,
//     ): astn.ValueDefinition {
//         const properties = pl.createDictionaryBuilder<astn.PropertyDefinition>()
//         node.properties.forEach(() => false, (prop, key) => {
//             if (prop === keyProperty) {
//                 return
//             }
//             properties.add(key, {
//                 value: {
//                     type: ((): astn.ValueTypeDefinition => {
//                         switch (prop.type[0]) {
//                             case "collection": {
//                                 const $ = prop.type[1]
//                                 switch ($.type[0]) {
//                                     case "dictionary": {
//                                         const $$ = $.type[1]
//                                         const targetNode = convertToASTNSchemaValue($.node, componentTypes, $$["key property"].reference.get())
//                                         const foo = $$["key property"].reference.get()
//                                         if (foo.type[0] !== "value") {
//                                             throw new Error("unexpected")
//                                         }
//                                         return ["dictionary", {
//                                             "value": targetNode,
//                                             "key": {
//                                                 "default value": foo.type[1]["default value"],
//                                                 "quoted": ((): boolean => {
//                                                     switch (foo.type[1].type[0]) {
//                                                         case "boolean":
//                                                             return false
//                                                         case "number":
//                                                             return false
//                                                         case "string":
//                                                             return true

//                                                         default:
//                                                             return pl.au(foo.type[1].type[0])
//                                                     }
//                                                 })(),

//                                             },
//                                             // "key property": createReference($$["key property"].name, targetNode.properties, resolveRegistry, keys => {
//                                             //     throw new Error(`UNEXPECTED: KEY Property not found: ${$$["key property"].name}, available keys: ${keys.join()}`);
//                                             // }),
//                                         }]
//                                     }
//                                     case "list": {
//                                         const targetNode = convertToASTNSchemaValue($.node, componentTypes, null)
//                                         return ["list", {
//                                             value: targetNode,
//                                         }]
//                                     }
//                                     default:
//                                         return pl.au($.type[0])
//                                 }
//                             }
//                             case "component": {
//                                 const $ = prop.type[1]
//                                 return ["type reference", {
//                                     type: x.createReference(
//                                         "type",
//                                         {
//                                             value: $.type.reference.name,
//                                             annotation: $.type.annotation,
//                                         },
//                                         "",
//                                         $.type.annotation,
//                                         componentTypes,
//                                     ),
//                                 }]
//                             }
//                             case "state group": {
//                                 const $ = prop.type[1]
//                                 const states = pl.createDictionaryBuilder<astn.OptionDefinition>()

//                                 $.states.forEach(() => false, (state, key) => {
//                                     states.add(key, {
//                                         value: convertToASTNSchemaValue(state.node, componentTypes, null),
//                                     })
//                                 })
//                                 return ["tagged union", {
//                                     "options": states.toDictionary(),
//                                     "default option": x.createReference(
//                                         "default option",
//                                         {
//                                             value: $["default state"].reference.name,
//                                             annotation: $["default state"].annotation,
//                                         },
//                                         "yes",
//                                         $["default state"].annotation,
//                                         states.toDictionary().getLookup(),
//                                     ),
//                                 }]
//                             }
//                             case "value": {
//                                 const $ = prop.type[1]
//                                 return ["simple string", {
//                                     "default value": $["default value"],
//                                     "quoted": ((): boolean => {
//                                         switch ($.type[0]) {
//                                             case "boolean":
//                                                 return false
//                                             case "number":
//                                                 return false
//                                             case "string":
//                                                 return true
//                                             default:
//                                                 return pl.au($.type[0])
//                                         }
//                                     })(),
//                                 }]
//                             }
//                             default:
//                                 return pl.au(prop.type[0])
//                         }
//                     })(),

//                 },
//             })
//         })
//         return {
//             type: ["group", {
//                 properties: properties.toDictionary(),
//             }],
//         }
//     }

//     const types = pl.createDictionaryBuilder<astn.TypeDefinition>()
//     schema["component types"].forEach(() => false, (ct, key) => {
//         const ctName = key
//         types.add(ctName, {
//             value: convertToASTNSchemaValue(ct.node, types.toDictionary().getLookup(), null),
//         })
//     })
//     const rootType = x.createReference(
//         "root type",
//         {
//             value: schema["root type"].reference.name,
//             annotation: schema["root type"].annotation,
//         },
//         "root",
//         schema["root type"].annotation,
//         types.toDictionary().getLookup(),
//     )
//     const success = x.resolve(
//         // ($) => {
//         //     throw new Error(`unexpected resolve error: ${$.message}`)
//         // }
//     )
//     if (!success) {
//         throw new Error("UNEXPECTED")
//     }
//     return {
//         "types": types.toDictionary(),
//         "root type": rootType,
//     }
// }