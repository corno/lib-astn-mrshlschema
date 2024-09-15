// import * as pr from "pareto-runtime"
// import { createDeserializer } from "./createDeserializer"
// import * as t from "./types"
// import { convertToASTNSchema as convertToASTNSchema } from "./convertToASTNSchema"
// import * as sideEffects from "./sideEffects"

// export function createSchemaAndSideEffects<Annotation, NonAnnotation>(
//     onSchemaError: (error: astn.SchemaDeserializationError, annotation: Annotation) => void,
//     onSchema: (schema: astn.ISchemaAndSideEffects<Annotation, NonAnnotation>) => void,
// ): astn.ITreeHandler<Annotation, NonAnnotation> {

//     let foundError = false
//     let schema: null | t.Schema = null

//     return createDeserializer(
//         (errorMessage, annotation) => {
//             foundError = true
//             onSchemaError(["expect", errorMessage], annotation)
//         },
//         (message, annotation) => {
//             foundError = true
//             onSchemaError(["validation", { message: message }], annotation)
//         },
//         (md2) => {
//             schema = md2
//         },
//         () => {
//             if (schema !== null) {
//                 if (foundError) {
//                     pr.logError("SCHEMA FOUND BUT WITH ERRORS")
//                 }
//                 const s = schema
//                 onSchema({
//                     getSchema: () => convertToASTNSchema(s),
//                     createStreamingValidator: (
//                         onValidationError: (message: string, annotation: Annotation, severity: astn.DiagnosticSeverity) => void,
//                     ) => sideEffects.createRoot<Annotation, NonAnnotation>(s, onValidationError),
//                 })
//             } else {
//                 if (!foundError) {
//                     throw new Error("UNEXPECTED: NO SCHEMA AND NO ERRORS")
//                 }
//             }
//         },
//     )
// }