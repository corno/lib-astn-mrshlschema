import * as tha from "astn-typedhandlers-api"
import * as h from "astn-handlers-api"

export type ITypingHandler<Annotation> = (
    $i: {
        downstreamHandler: tha.ITypedValueHandler<Annotation>,
    }
) => h.IRequiredValueHandler<Annotation>