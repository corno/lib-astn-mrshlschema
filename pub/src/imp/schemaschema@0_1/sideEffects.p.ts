// import * as pl from 'pareto-core-lib'
// import * as pc from "pareto-core-candidates"
// import * as api from "../../interface"
// import * as th from "astn-typedhandlers-api"
// import * as generic from "./generic"

// export type DiagnosticSeverity =
//     | ["error", null]

// export function createRoot<PAnnotation>(
//     $: {
//         schema: api.Schema<PAnnotation>,
//     },
//     $i: {
//         onError: (message: string, annotation: Annotation, severity: DiagnosticSeverity) => void
//     },
//     $d: {
//         isNaN: (value: string) => boolean
//     }
// ): th.ITypedValueHandler<PAnnotation> {

//     function createDictionary(
//         _definition: api.Dictionary<PAnnotation>,
//         collectionDefinition: api.Collection<PAnnotation>,
//     ): th.IDictionaryHandler<PAnnotation> {
//         return {
//             onClose: () => {
//                 //
//             },
//             onEntry: () => {
//                 return createNode(collectionDefinition.node)
//             },
//         }
//     }

//     function createList(
//         _definition: api.List,
//         collectionDefinition: api.Collection<PAnnotation>,
//     ): th.IListHandler<PAnnotation> {
//         return {
//             onElement: () => {
//                 return createNode(collectionDefinition.node)
//             },
//             onClose: () => {
//                 //
//             },
//         }
//     }

//     function createStateGroup(
//         definition: api.StateGroup<PAnnotation>,
//     ): th.ITypedTaggedUnionHandler<PAnnotation> {
//         return {
//             onUnexpectedOption: ($) => {
//                 const state = generic.getUnsafeEntry(definition.states, $.defaultOption)
//                 return createNode(state.node)
//             },
//             onOption: ($) => {
//                 const state = generic.getUnsafeEntry(definition.states, $.name)
//                 return createNode(state.node)
//             },
//             onEnd: () => {
//                 //
//             },
//         }
//     }

//     function createProp(
//         name: string,
//         nodedefinition: api.Node<PAnnotation>,
//     ): th.ITypedValueHandler<PAnnotation> {
//         return {
//             onDictionary: () => {
//                 const prop = generic.getUnsafeEntry(nodedefinition.properties, name)
//                 if (prop.type[0] !== "collection") {
//                     pc.panic("unexpected")
//                 }
//                 const $ = prop.type[1]
//                 if ($.type[0] !== "dictionary") {
//                     pc.panic("unexpected")
//                 }
//                 return createDictionary($.type[1], $)
//             },
//             onList: () => {
//                 const prop = generic.getUnsafeEntry(nodedefinition.properties, name)
//                 if (prop.type[0] !== "collection") {
//                     pc.panic("unexpected")
//                 }
//                 const $ = prop.type[1]
//                 if ($.type[0] !== "list") {
//                     pc.panic("unexpected")
//                 }
//                 return createList($.type[1], $)
//             },
//             onTaggedUnion: () => {

//                 const prop = generic.getUnsafeEntry(nodedefinition.properties, name)
//                 if (prop.type[0] !== "state group") {
//                     pc.panic("unexpected")
//                 }
//                 const $ = prop.type[1]
//                 return createStateGroup($)
//             },
//             onTypeReference: () => {
//                 const prop = generic.getUnsafeEntry(nodedefinition.properties, name)
//                 if (prop.type[0] !== "component") {
//                     pc.panic("unexpected")
//                 }
//                 const $ = prop.type[1]
//                 return createNode($.type.reference.get().node)
//             },
//             onMultilineString: (_$) => {
//                 const prop = generic.getUnsafeEntry(nodedefinition.properties, name)
//                 if (prop.type[0] !== "value") {
//                     pc.panic("unexpected")
//                 }
//             },
//             onSimpleString: ($) => {
//                 const prop = generic.getUnsafeEntry(nodedefinition.properties, name)
//                 if (prop.type[0] !== "value") {
//                     pc.panic("unexpected")
//                 }
//                 const $$ = prop.type[1]
//                 if ($.token !== null) {
//                     switch ($$.type[0]) {
//                         case "boolean": {
//                             if ($.token.token.wrapping[0] !== "none") {
//                                 $i.onError(`expected a boolean, found a quoted string`, $.token.annotation, ["error", null])
//                             } else {
//                                 const val = $.value
//                                 if (val !== "true" && val !== "false") {
//                                     $i.onError(`value '${val}' is not a boolean`, $.token.annotation, ["error", null])
//                                 }
//                             }
//                             break
//                         }
//                         case "number": {
//                             if ($.token.token.wrapping[0] !== "none") {
//                                 $i.onError(`expected a number, found a wrapped string`, $.token.annotation, ["error", null])
//                             } else {
//                                 const val = $.value
//                                 //eslint-disable-next-line no-new-wrappers
//                                 if ($d.isNaN(val)) {
//                                     $i.onError(`value '${val}' is not a number`, $.token.annotation, ["error", null])
//                                 }
//                             }
//                             break
//                         }
//                         case "string": {
//                             if ($.token.token.wrapping[0] === "none") {
//                                 $i.onError(`expected a quoted string`, $.token.annotation, ["error", null])
//                             }
//                             break
//                         }
//                         default:
//                             pl.au($$.type[0])
//                     }
//                 }
//             },
//             onGroup: () => {
//                 pc.panic("unexpected")
//             },
//         }
//     }

//     function createNode(
//         definition: api.Node<PAnnotation>,
//     ): th.ITypedValueHandler<PAnnotation> {
//         return {
//             onDictionary: () => {
//                 pc.panic("unexpected")
//             },
//             onList: () => {
//                 pc.panic("unexpected")
//             },
//             onTaggedUnion: () => {
//                 pc.panic("unexpected")
//             },
//             onTypeReference: () => {
//                 pc.panic("unexpected")
//             },
//             onMultilineString: (_$) => {
//                 pc.panic("unexpected")
//             },
//             onSimpleString: (_$) => {
//                 pc.panic("unexpected")
//             },
//             onGroup: () => {
//                 return {
//                     onUnexpectedProperty: () => {
//                         //
//                     },
//                     onProperty: ($) => {
//                         return createProp($.key, definition)
//                     },
//                     // onUnexpectedProperty: () => {
//                     //     //
//                     // },
//                     onClose: () => {
//                         //
//                     },
//                 }
//             },
//         }
//     }

//     return createNode($.schema["root type"].reference.get().node)
// }