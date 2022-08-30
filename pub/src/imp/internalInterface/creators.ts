
import * as api from "../interface"
import * as pra from "pareto-resolve-lib"
import * as aea from "astn-expect-api"
import * as pla from "pareto-lang-api"
import { DeserializeError } from "./types/DeserializeError"

export type CreateCreateDeserializer = <Annotation>(
    $i: {
        onError: (
            $: {
                error: DeserializeError,
                annotation: Annotation | null
            }
        ) => void,
    },
    x: pra.ResolveRegistry<Annotation>,
    ec: aea.IExpectContext<Annotation>,

) => api.CreateDeserializer<Annotation>


export type CreateCreateDeserializerWithSerializedError = <Annotation>(
    $i: {
        onError: (
            $: {
                error: string,
                annotation: Annotation | null
            },
        ) => void,
    },
    x: pra.ResolveRegistry<Annotation>,
    ec: aea.IExpectContext<Annotation>,

) => api.CreateDeserializer<Annotation>

export type CreateConvertToSASTNSchema = <Annotation>() => api.ConvertToASTNSchema<Annotation>

export type GenerateCode<Annotation> = (
    schema: api.Schema<Annotation>,
    callback: ($: pla.__root_B) => void,
) => void