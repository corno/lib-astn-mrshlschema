//export * from "./interface"
import * as h from "astn-handlers-api"
import { Schema } from "./types/types"

export type CreateDeserializer<PAnnotation> = (
    $i: {
        onDone: (
            metaData: null | Schema<PAnnotation>
        ) => void,
    },
) => h.IRequiredValueHandler<PAnnotation>