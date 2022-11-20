"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const pl = __importStar(require("pareto-core-lib"));
const pb = __importStar(require("pareto-core-exe"));
pl.logDebugMessage("no tests yet");
const lib = __importStar(require("../../../../lib"));
const pll = __importStar(require("pareto-lang-lib"));
const pf = __importStar(require("pareto-filesystem-res"));
const ael = __importStar(require("astn-expect-lib"));
const ap = __importStar(require("astn-parser-lib"));
const at = __importStar(require("astn-tokenizer-lib"));
const prl = __importStar(require("pareto-resolve-lib"));
const fp = __importStar(require("fountain-pen"));
const fsLib = pf.init();
function createDummyValueHandler() {
    function createDummyObjectHandler() {
        return {
            property: () => createDummyRequiredValueHandler(),
            anonymousProperty: () => createDummyValueHandler(),
            onEnd: () => { },
        };
    }
    function createDummyArrayHandler() {
        return {
            element: () => createDummyValueHandler(),
            onEnd: () => { }
        };
    }
    function createDummyRequiredValueHandler() {
        return {
            missing: () => { },
            exists: createDummyValueHandler()
        };
    }
    function createDummyTaggedUnionHandler() {
        return {
            option: () => createDummyRequiredValueHandler(),
            missingOption: () => createDummyRequiredValueHandler(),
            end: () => { }
        };
    }
    return {
        object: () => createDummyObjectHandler(),
        array: () => createDummyArrayHandler(),
        taggedUnion: () => createDummyTaggedUnionHandler(),
        simpleString: () => {
        },
        multilineString: () => {
        }
    };
}
function createLoggingValueHandler(set) {
    function createLoggingObjectHandler(x) {
        return {
            property: ($) => {
                return createLoggingRequiredValueHandler((res) => {
                    x[`>${$.token.token.value}`] = res;
                });
            },
            anonymousProperty: () => {
                return createLoggingValueHandler((res) => {
                    // x[`>${$.token.token.value}`] = res
                });
            },
            onEnd: () => {
            },
        };
    }
    function createLoggingArrayHandler(x) {
        return {
            element: () => {
                return createLoggingValueHandler((val) => {
                    x.push(val);
                });
            },
            onEnd: () => { }
        };
    }
    function createLoggingTaggedUnionHandler(x) {
        return {
            option: ($) => {
                x[0] = $.token.token.value;
                return createLoggingRequiredValueHandler(($) => {
                    x[1] = $;
                });
            },
            missingOption: () => {
                return createLoggingRequiredValueHandler(($) => {
                    //x[1] = $
                });
            },
            end: () => { }
        };
    }
    return {
        object: () => {
            const x = {};
            set(x);
            return createLoggingObjectHandler(x);
        },
        array: () => {
            const x = [];
            set(x);
            return createLoggingArrayHandler(x);
        },
        taggedUnion: () => {
            const x = [null, null];
            set(x);
            return createLoggingTaggedUnionHandler(x);
        },
        simpleString: ($) => {
            set($.token.token.value);
        },
        multilineString: ($) => {
            set($.token.token.lines.join(`\n`));
        }
    };
}
function createLoggingRequiredValueHandler(set) {
    return {
        missing: () => {
            //throw new Error("@@@@")
            set(null);
        },
        exists: createLoggingValueHandler(($) => {
            set($);
        })
    };
}
pb.runProgram($ => {
    const expectLib = ael.init();
    const err = pb.createStdErr();
    function logError(str) {
        err.write(str);
        err.write("\n");
    }
    if ($.argument === undefined) {
        throw "HMMMM";
    }
    pl.logDebugMessage($.argument);
    fsLib.file([$.argument, "in.astn"], (data) => {
        return {
            execute: ($) => {
                $(data);
            }
        };
    }, (err) => {
        logError(`FS error: ${err[0]}`);
        return {
            execute: ($) => {
                $(null);
            }
        };
    }).execute($ => {
        const ec = expectLib.createCreateExpectContext({
            issueHandler: ($) => {
                if ($.severity[0] === "error") {
                    logError(`EXPECT ISSUE`);
                    // $i.onError(["expect", {
                    //     issue: $.issue,
                    //     annotation: $.annotation,
                    // }])
                }
            },
            createDummyValueHandler: () => createDummyValueHandler(),
        })({
            duplicateEntrySeverity: ["warning", null],
            onDuplicateEntry: ["ignore", null],
        });
        if ($ !== null) {
            const parserLib = ap.init();
            const tokenizerLib = at.init();
            const mrshlschemaLib = lib.init();
            const parser = parserLib.createCreateTreeParser({
                onError: ($) => {
                    logError(parserLib.createTreeParserErrorMessage($.error));
                }
            })({
                handler: {
                    root: mrshlschemaLib.createCreateDeserializer({
                        onError: ($) => {
                            const err = (() => {
                                switch ($.error[0]) {
                                    case "missing value":
                                        return pl.cc($.error[1], ($) => {
                                            return `missing value`;
                                        });
                                    default: return pl.au($.error[0]);
                                }
                            })();
                            logError(`${err} @ ${$.annotation === null ? "root" : tokenizerLib.createRangeMessage($.annotation.range)}`);
                            //logError("expect issue !!!!!")
                        },
                    }, prl.createResolveRegistry(() => {
                        pl.logDebugMessage("@#$@$@#$UR");
                    }), ec)({
                        onDone: ($) => {
                            if ($ !== null) {
                                // lib.generateCode(
                                //     $
                                // )
                                mrshlschemaLib.createGenerateCode()($, ($) => {
                                    const root = $;
                                    fp.processBlock(($) => $)({
                                        onData: ($) => {
                                            pl.logDebugMessage($);
                                        },
                                        onEnd: () => {
                                        }
                                    }, {
                                        indentation: "    ",
                                        newline: "\n",
                                        trimLines: true,
                                    }, ($) => {
                                        pll.generateTypeScript(pll.createBuilder(root), $);
                                    });
                                });
                            }
                            return {
                                onToken: () => {
                                    throw new Error("!!!");
                                },
                                onEnd: () => {
                                }
                            };
                        },
                    }),
                    onEnd: () => { },
                },
            });
            const tok = tokenizerLib.createCreateTokenizer({
                onError: ($) => {
                    logError(tokenizerLib.createTokenizerErrorMessage($.error));
                },
            })({
                consumer: parserLib.createCreateHeaderParser({
                    onError: ($) => {
                        logError(parserLib.createHeaderErrorMessage($.error));
                    }
                })({
                    handler: {
                        onEmbeddedSchema: () => {
                            throw "FIXME";
                        },
                        onNoInternalSchema: () => {
                            pl.logDebugMessage("NO INTERNAL SCHEMA ");
                            return parser;
                        },
                        onSchemaReference: ($) => {
                            pl.logDebugMessage($.token.token.value);
                            if ($.token.token.value !== "mrshl/schemaschema@0.1") {
                                throw "FIXME";
                            }
                            return parser;
                        },
                    },
                })
            });
            tok.onData($);
            tok.onEnd();
        }
    });
});
