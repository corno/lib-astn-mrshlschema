// //import * as astn from "astn"
// import * as pr from "pareto-runtime"

// import {
//     createDeserializer,
// } from "./createDeserializer"
// import { Schema } from "./types"


// export interface ISchemaHandler {
//     onSchema: (schema: Schema) => void
// }

// export function createSchemaStreamProcesser(
//     handler: ISchemaHandler,
//     onError: (str: string) => void,
// ): pr.IStreamConsumer<string, null> {
//     return astn.createStreamPreTokenizer(
//         astn.createTokenizer(
//             astn.createStructureParser({
//                 onEmbeddedSchema: ($) => {
//                     onError(`expected a schema reference @ ${astn.printRange($.embeddedSchemaAnnotation.range)}`)
//                     return astn.createDummyTreeHandler()
//                 },
//                 onSchemaReference: ($) => {
//                     const expectedSchemaHeader = "mrshl/schemaschema@0.1"
//                     if ($.token.token.value !== expectedSchemaHeader) {
//                         onError(`expected "${expectedSchemaHeader}" but found "${$.token.token.value}"`)
//                     }
//                 },
//                 onNoInternalSchema: () => { },
//                 onBody: () => {
//                     return astn.createTreeParser(
//                         createDeserializer(
//                             (error, annotation) => {
//                                 onError(`${astn.printExpectIssue(error)} @ ${astn.printRange(annotation.range)}`)
//                             },
//                             (error, annotation) => {
//                                 onError(`${error} @ ${astn.printRange(annotation.range)}`)
//                             },
//                             (schema) => {
//                                 if (schema !== null) {
//                                     handler.onSchema(schema)
//                                 } else {
//                                     onError("MISSING SCHEMA")
//                                 }
//                             },
//                             () => { },
//                         ),
//                         {
//                             onTreeError: ($) => {
//                                 onError(`${astn.printTreeParserError($.error)} @ ${astn.printRange($.annotation.range)}`)
//                             },
//                             onStructureError: ($) => {
//                                 onError(`${astn.printStructureError($.error)} @ ${astn.printRange($.annotation.range)}`)
//                             },
//                         },
//                         () => { }
//                     )
//                 },
//                 errors: {
//                     onTreeError: ($) => {
//                         onError(`${astn.printTreeParserError($.error)} @ ${astn.printRange($.annotation.range)}`)
//                     },
//                     onStructureError: ($) => {
//                         onError(`${astn.printStructureError($.error)} @ ${astn.printRange($.annotation.range)}`)
//                     },
//                 },
//             }),
//             ($, range) => {
//                 onError(`${astn.printTokenizerError($)} @ ${astn.printRange(range)}`)
//             }
//         ),
//         ($) => {
//             onError(`${astn.printTokenError($.error)} @ ${astn.printRange($.range)}`)
//         },
//     )
// }
