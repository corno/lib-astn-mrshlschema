
// import * as api from "../interface"
// import * as pra from "pareto-resolve-lib"
// import * as aea from "astn-expect-api"
// import * as pla from "pareto-lang-api"
// import { DeserializeError } from "./types/DeserializeError"

// export type CreateCreateDeserializer = <PAnnotation>(
//     $i: {
//         onError: (
//             $: {
//                 error: DeserializeError,
//                 annotation: Annotation | null
//             }
//         ) => void,
//     },
//     x: pra.ResolveRegistry<PAnnotation>,
//     ec: aea.IExpectContext<PAnnotation>,

// ) => api.CreateDeserializer<PAnnotation>


// export type CreateCreateDeserializerWithSerializedError = <PAnnotation>(
//     $i: {
//         onError: (
//             $: {
//                 error: string,
//                 annotation: Annotation | null
//             },
//         ) => void,
//     },
//     x: pra.ResolveRegistry<PAnnotation>,
//     ec: aea.IExpectContext<PAnnotation>,

// ) => api.CreateDeserializer<PAnnotation>

// export type CreateConvertToSASTNSchema = <PAnnotation>() => api.ConvertToASTNSchema<PAnnotation>

// export type GenerateCode<PAnnotation> = (
//     schema: api.Schema<PAnnotation>,
//     callback: ($: pla.__root_B) => void,
// ) => void