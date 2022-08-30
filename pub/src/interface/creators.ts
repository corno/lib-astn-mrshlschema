//export * from "./interface"
import * as h from "astn-handlers-api"
import { Schema } from "./types/types"

export type CreateDeserializer<Annotation> = (
    $i: {
        onDone: (
            metaData: null | Schema<Annotation>
        ) => void,
    },
) => h.IRequiredValueHandler<Annotation>