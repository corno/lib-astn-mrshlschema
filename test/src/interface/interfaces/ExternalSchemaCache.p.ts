import * as tc from "astn-tokenconsumer-api"
import * as th from "astn-typedhandlers-api"
import { SchemaCacheUnmarshallError } from "../types/SchemaCacheUnmarshallError"


export type CreateUnmarshaller2<PAnnotation> = (
    $: {
        schemaID: string
    },
    $i: {
        onError: ($: SchemaCacheUnmarshallError) => void
        onDone: () => void,
    },
    downstreamHander: th.ITypedValueHandler<PAnnotation>
) => tc.IContentTokenConsumer<PAnnotation>

export type IExternalSchemaCache<PAnnotation> = {
    createUnmarshaller: CreateUnmarshaller2<PAnnotation>,
}