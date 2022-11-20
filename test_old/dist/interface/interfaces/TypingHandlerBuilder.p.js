"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createReturnInterface() {
    return {
        aCall: () => {
        },
        nestedCall: () => {
        }
    };
}
function createCallbackInterface(downStreamInterface, callback) {
    callback({
        aCall: () => {
            downStreamInterface.aCall();
        },
        nestedCall: (cb) => {
            cb({
                aCall: () => {
                },
                nestedCall: (cb) => {
                },
            });
        },
    });
}
