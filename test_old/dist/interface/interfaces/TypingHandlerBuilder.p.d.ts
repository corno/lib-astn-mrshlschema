import * as h from "astn-handlers-api";
import { ITypingHandler } from "./TypingHandler";
export declare type ITypingHandlerBuilder<PAnnotation> = ($i: {
    onDone: ($i: {
        handler: ITypingHandler<PAnnotation> | null;
    }) => void;
}) => h.IRequiredValueHandler<PAnnotation>;
