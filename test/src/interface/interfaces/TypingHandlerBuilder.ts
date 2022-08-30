import * as h from "astn-handlers-api"
import { ITypingHandler } from "./TypingHandler"

export type ITypingHandlerBuilder<Annotation> = ($i: {
    onDone: ($i: {
        handler: ITypingHandler<Annotation> | null
    }) => void
}) => h.IRequiredValueHandler<Annotation>



type IInterface = {
    aCall: () => void
    nestedCall: (
        callback: ($: IInterface) => void
    ) => void
}

function createReturnInterface(
): IInterface {
    return {
        aCall: () => {

        },
        nestedCall: () => {

        }
    }
}

function createCallbackInterface(
    downStreamInterface: IInterface,
    callback: ($i: IInterface) => void,
): void {
    callback({
        aCall: () => {
            downStreamInterface.aCall()
        },
        nestedCall: (cb) => {
            cb({
                aCall: () => {
                },
                nestedCall: (cb) => {
                },

            })
        },

    })
}