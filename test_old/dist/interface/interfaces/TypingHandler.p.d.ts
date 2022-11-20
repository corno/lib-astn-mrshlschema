import * as tha from "astn-typedhandlers-api";
import * as h from "astn-handlers-api";
export declare type ITypingHandler<PAnnotation> = ($i: {
    downstreamHandler: tha.ITypedValueHandler<PAnnotation>;
}) => h.IRequiredValueHandler<PAnnotation>;
