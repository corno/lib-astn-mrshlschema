import * as pl from 'pareto-core-lib'
import * as pb from 'pareto-core-exe'
pl.logDebugMessage("no tests yet")

import * as lib from "../../../../lib"
import * as pll from "pareto-lang-lib"
import * as pf from "pareto-filesystem-res"

import * as ael from "astn-expect-lib"
import * as ap from "astn-parser-lib"
import * as at from "astn-tokenizer-lib"
import * as ata from "astn-tokenizer-api"
import * as h from "astn-handlers-api"
import * as prl from "pareto-resolve-lib"

import * as fp from "fountain-pen"

const fsLib = pf.init()



function createDummyValueHandler<PAnnotation>(): h.IValueHandler<PAnnotation> {

    function createDummyObjectHandler(): h.IObjectHandler<PAnnotation> {
        return {
            property: () => createDummyRequiredValueHandler(),
            anonymousProperty: () => createDummyValueHandler(),
            onEnd: () => { },
        }
    }
    function createDummyArrayHandler(): h.IArrayHandler<PAnnotation> {
        return {
            element: () => createDummyValueHandler(),
            onEnd: () => { }
        }
    }
    function createDummyRequiredValueHandler(): h.IRequiredValueHandler<PAnnotation> {
        return {
            missing: () => { },
            exists: createDummyValueHandler()
        }

    }
    function createDummyTaggedUnionHandler(): h.ITaggedUnionHandler<PAnnotation> {
        return {
            option: () => createDummyRequiredValueHandler(),
            missingOption: () => createDummyRequiredValueHandler(),
            end: () => { }
        }
    }
    return {
        object: () => createDummyObjectHandler(),
        array: () => createDummyArrayHandler(),
        taggedUnion: () => createDummyTaggedUnionHandler(),
        simpleString: () => {

        },
        multilineString: () => {

        }
    }
}

type Object = { [key: string]: PossibleValue }

type PossibleValue = Value | null

type Array = Value[]

type TaggedUnion = [string | null, Value | null]

type Value =
    | string
    | TaggedUnion
    | Value[]
    | Object


function createLoggingValueHandler<PAnnotation>(set: (value: Value) => void): h.IValueHandler<PAnnotation> {

    function createLoggingObjectHandler(x: Object): h.IObjectHandler<PAnnotation> {
        return {
            property: ($) => {
                return createLoggingRequiredValueHandler((res) => {
                    x[`>${$.token.token.value}`] = res
                })
            },
            anonymousProperty: () => {

                return createLoggingValueHandler((res) => {
                    // x[`>${$.token.token.value}`] = res
                })
            },
            onEnd: () => {

            },
        }
    }
    function createLoggingArrayHandler(x: Array): h.IArrayHandler<PAnnotation> {
        return {
            element: () => {
                return createLoggingValueHandler((val) => {
                    x.push(val)
                })
            },
            onEnd: () => { }
        }
    }
    function createLoggingTaggedUnionHandler(x: TaggedUnion): h.ITaggedUnionHandler<PAnnotation> {
        return {
            option: ($) => {
                x[0] = $.token.token.value
                return createLoggingRequiredValueHandler(($) => {
                    x[1] = $
                })
            },
            missingOption: () => {
                return createLoggingRequiredValueHandler(($) => {
                    //x[1] = $
                })
            },
            end: () => { }
        }
    }
    return {
        object: () => {
            const x: Object = {}
            set(x)
            return createLoggingObjectHandler(x)
        },
        array: () => {
            const x: Array = []
            set(x)
            return createLoggingArrayHandler(x)
        },
        taggedUnion: () => {

            const x: TaggedUnion = [null, null]
            set(x)
            return createLoggingTaggedUnionHandler(x)
        },
        simpleString: ($) => {
            set($.token.token.value)
        },
        multilineString: ($) => {
            set($.token.token.lines.join(`\n`))

        }
    }
}
function createLoggingRequiredValueHandler<PAnnotation>(set: (value: Value | null) => void): h.IRequiredValueHandler<PAnnotation> {
    return {
        missing: () => {
            //throw new Error("@@@@")
            set(null)
        },
        exists: createLoggingValueHandler(($) => {
            set($)
        })
    }

}

pb.runProgram($ => {
    const expectLib = ael.init()

    const err = pb.createStdErr()

    function logError(str: string) {
        err.write(str)
        err.write("\n")
    }

    if ($.argument === undefined) {
        throw "HMMMM"
    }
    pl.logDebugMessage($.argument)
    fsLib.file<string | null>(
        [$.argument, "in.astn"],
        (data) => {
            return {
                execute: ($) => {
                    $(data)
                }
            }
        },
        (err) => {
            logError(`FS error: ${err[0]}`)
            return {
                execute: ($) => {
                    $(null)
                }
            }
        }
    ).execute($ => {


        const ec = expectLib.createCreateExpectContext<ata.TokenizerAnnotationData>(
            {
                issueHandler: ($) => {
                    if ($.severity[0] === "error") {
                        logError(`EXPECT ISSUE`)
                        // $i.onError(["expect", {
                        //     issue: $.issue,
                        //     annotation: $.annotation,
                        // }])
                    }
                },
                createDummyValueHandler: () => createDummyValueHandler(),
            }
        )(
            {
                duplicateEntrySeverity: ["warning", null],
                onDuplicateEntry: ["ignore", null],
            }
        )

        if ($ !== null) {

            const parserLib = ap.init()

            const tokenizerLib = at.init()
            const mrshlschemaLib = lib.init()

            const parser = parserLib.createCreateTreeParser<ata.TokenizerAnnotationData>({
                onError: ($) => {
                    logError(parserLib.createTreeParserErrorMessage($.error))
                }
            })({

                handler: {
                    root: mrshlschemaLib.createCreateDeserializer(
                        {
                            onError: ($) => {
                                const err = ((): string => {

                                    switch ($.error[0]) {
                                        case "missing value":
                                            return pl.cc($.error[1], ($) => {
                                                return `missing value`

                                            })
                                        default: return pl.au($.error[0])
                                    }
                                })()
                                logError(`${err} @ ${$.annotation === null ? "root" : tokenizerLib.createRangeMessage($.annotation.range)}`)

                                //logError("expect issue !!!!!")
                            },

                        },
                        prl.createResolveRegistry(
                            () => {
                                pl.logDebugMessage("@#$@$@#$UR")
                            }
                        ),
                        ec,

                    )({

                        onDone: ($) => {
                            if ($ !== null) {
                                // lib.generateCode(
                                //     $
                                // )
                                mrshlschemaLib.createGenerateCode()(
                                    $,
                                    ($) => {
                                        const root = $

                                        fp.processBlock(($) => $)(
                                            {
                                                onData: ($) => {
                                                    pl.logDebugMessage($)
                                                },
                                                onEnd: () => {

                                                }
                                            },
                                            {
                                                indentation: "    ",
                                                newline: "\n",
                                                trimLines: true,
                                            },
                                            ($) => {
                                                pll.generateTypeScript(
                                                    pll.createBuilder(root),
                                                    $,
                                                )
                                            }
                                        )
                                    }
                                )
                            }
                            return {
                                onToken: () => {
                                    throw new Error("!!!")
                                },
                                onEnd: () => {

                                }
                            }
                        },
                    }),
                    onEnd: () => { },

                },
            })
            const tok = tokenizerLib.createCreateTokenizer(
                {
                    onError: ($) => {
                        logError(tokenizerLib.createTokenizerErrorMessage($.error))
                    },


                }
            )({

                consumer: parserLib.createCreateHeaderParser(
                    {
                        onError: ($) => {
                            logError(parserLib.createHeaderErrorMessage($.error))
                        }
                    }
                )({

                    handler: {
                        onEmbeddedSchema: () => {
                            throw "FIXME"
                        },
                        onNoInternalSchema: () => {
                            pl.logDebugMessage("NO INTERNAL SCHEMA ")
                            return parser
                        },
                        onSchemaReference: ($) => {
                            pl.logDebugMessage($.token.token.value)
                            if ($.token.token.value !== "mrshl/schemaschema@0.1") {
                                throw "FIXME"
                            }
                            return parser
                        },
                    },
                })
            })


            tok.onData($)
            tok.onEnd()
        }
    })


})
