import { convertToASTNSchema, createCreateDeserializer, createCreateDeserializerWithSerializedError, generateCode2 } from "./schemaschema@0.1"
import * as inf from "../interface"

//export type CreateGenerateCode = <Annotation>() => inf.GenerateCode<Annotation>

// type API = {
//     createCreateDeserializer: inf.CreateCreateDeserializer
//     createCreateDeserializerWithSerializedError: inf.CreateCreateDeserializerWithSerializedError
//     createConvertToASTNSchema: inf.CreateConvertToSASTNSchema
//     createGenerateCode: CreateGenerateCode
// }

export const $: API = {
    createCreateDeserializer: createCreateDeserializer,
    createCreateDeserializerWithSerializedError: createCreateDeserializerWithSerializedError,
    createConvertToASTNSchema: convertToASTNSchema,
    createGenerateCode: generateCode2
}