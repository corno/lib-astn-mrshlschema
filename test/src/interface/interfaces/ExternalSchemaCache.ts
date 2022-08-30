import * as tc from "astn-tokenconsumer-api"
import * as th from "astn-typedhandlers-api"
import { SchemaCacheUnmarshallError } from "../types/SchemaCacheUnmarshallError"


export type CreateUnmarshaller2<Annotation> = (
    $: {
        schemaID: string
    },
    $i: {
        onError: ($: SchemaCacheUnmarshallError) => void
        onDone: () => void,
    },
    downstreamHander: th.ITypedValueHandler<Annotation>
) => tc.IContentTokenConsumer<Annotation>

export type IExternalSchemaCache<Annotation> = {
    createUnmarshaller: CreateUnmarshaller2<Annotation>,
}