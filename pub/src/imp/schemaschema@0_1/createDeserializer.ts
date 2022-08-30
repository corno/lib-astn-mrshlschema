import * as pl from "pareto-core-lib"
import * as pa from "pareto-core-types"
import * as aea from "astn-expect-api"
import * as pc from "pareto-core-candidates"

import * as h from "astn-handlers-api"
import * as pra from "pareto-resolve-lib"
import * as api from "../../interface"
import * as inf from "../../interface"
import { createDeserializerErrorMessage } from "./createDeserializerErrorMessage"

/**
 * this function is only calls back if the value is not null
 * @param value value
 * @param callback
 */
function assertNotNull<T>(value: T | null): T {
    if (value !== null) {
        return value
    }
    const err = pc.panic("unexpected null value")
    throw err
}

export function createDeserializer<Annotation>(
    $i: {
        onError: (
            $: {
                error: inf.DeserializeError,
                annotation: Annotation | null,
            }
        ) => void,
        onDone: (
            metaData: null | api.Schema<Annotation>
        ) => void,
    },
    x: pra.ResolveRegistry<Annotation>,
    ec: aea.IExpectContext<Annotation>,
): h.IRequiredValueHandler<Annotation> {

    function createReference<T>(
        propertyName: string,
        annotatedName: pra.AnnotatedString<Annotation> | null,
        defaultName: string,
        contextAnnotation: Annotation,
        lookup: pc.Lookup<T>,
    ): api.AnnotatedReference<T, Annotation> {
        return {
            annotation: annotatedName === null ? contextAnnotation : annotatedName.annotation,
            reference: x.createReference(
                propertyName,
                annotatedName,
                defaultName,
                contextAnnotation,
                lookup,
            )
        }
    }
    const componentTypes = pc.createDictionaryBuilder<api.ComponentType<Annotation>>()
    let rootName: pra.AnnotatedString<Annotation> | null = null

    function wrap(
        handler: h.IValueHandler<Annotation>,
        contextAnnotation: Annotation,
    ): h.IRequiredValueHandler<Annotation> {
        return {
            exists: handler,
            missing: () => {
                $i.onError({
                    error: ["missing value", {
                    }],
                    annotation: contextAnnotation
                })
            },
        }
    }

    function createNodeDeserialiser(
        context: aea.IExpectContext<Annotation>,
        componentTypes: pc.Lookup<api.ComponentType<Annotation>>,
        callback: (node: api.Node<Annotation>) => void,
    ): aea.ExpectedProperty<Annotation> {


        return {
            onExists: ($) => {
                const properties = pc.createDictionaryBuilder<api.Property<Annotation>>()
                return wrap(
                    context.expectVerboseGroup({
                        properties: {
                            "properties": {
                                onExists: ($) => wrap(
                                    context.expectDictionary({
                                        onProperty: (propertyData) => {
                                            let targetPropertyType: api.PropertyType<Annotation> | null = null
                                            return wrap(
                                                context.expectVerboseGroup({
                                                    properties: {
                                                        "type": {
                                                            onExists: ($) => wrap(
                                                                context.expectTaggedUnion({
                                                                    options: {
                                                                        "collection": ($) => {
                                                                            let targetCollectionType: api.CollectionType<Annotation> | null = null
                                                                            let targetNode: api.Node<Annotation> | null = null

                                                                            return wrap(
                                                                                context.expectVerboseGroup({
                                                                                    properties: {
                                                                                        "node": createNodeDeserialiser(
                                                                                            context,
                                                                                            componentTypes,
                                                                                            (node) => {
                                                                                                targetNode = node
                                                                                            },
                                                                                        ),
                                                                                        "type": {
                                                                                            onExists: ($) => wrap(
                                                                                                context.expectTaggedUnion({
                                                                                                    options: {
                                                                                                        "dictionary": ($) => {
                                                                                                            let targetKeyProperty: pra.AnnotatedString<Annotation> | null = null
                                                                                                            return wrap(
                                                                                                                context.expectVerboseGroup({
                                                                                                                    properties: {
                                                                                                                        "key property": {
                                                                                                                            onExists: ($) => wrap(
                                                                                                                                context.expectQuotedString({
                                                                                                                                    warningOnly: true,
                                                                                                                                    callback: ($) => {
                                                                                                                                        targetKeyProperty = {
                                                                                                                                            value: $.token.token.value,
                                                                                                                                            annotation: $.token.annotation,
                                                                                                                                        }
                                                                                                                                    },
                                                                                                                                }),
                                                                                                                                $.token.annotation,
                                                                                                                            ),
                                                                                                                            onNotExists: ($) => {
                                                                                                                                targetKeyProperty = {
                                                                                                                                    value: "name",
                                                                                                                                    annotation: $.beginToken.annotation,
                                                                                                                                }
                                                                                                                            },
                                                                                                                        },
                                                                                                                    },
                                                                                                                    onEnd: ($) => {
                                                                                                                        const assertedTargetNode = assertNotNull(targetNode)

                                                                                                                        const assertedTargetKeyProperty = assertNotNull(targetKeyProperty)
                                                                                                                        targetCollectionType = ["dictionary", {
                                                                                                                            "key property": createReference(
                                                                                                                                "key property",
                                                                                                                                assertedTargetKeyProperty,
                                                                                                                                "name",
                                                                                                                                $.annotation,
                                                                                                                                assertedTargetNode.properties.getLookup(),
                                                                                                                            ),
                                                                                                                        }]

                                                                                                                    },
                                                                                                                }),
                                                                                                                $.annotation
                                                                                                            )
                                                                                                        },
                                                                                                        "list": ($) => {
                                                                                                            targetCollectionType = ["list", {
                                                                                                            }]
                                                                                                            return wrap(
                                                                                                                context.expectVerboseGroup({}),

                                                                                                                $.annotation
                                                                                                            )
                                                                                                        },
                                                                                                    },
                                                                                                }),
                                                                                                $.token.annotation,
                                                                                            ),
                                                                                            onNotExists: () => {
                                                                                                targetCollectionType = ["list", {}]
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                    onEnd: () => {
                                                                                        const assertedTargetNode = assertNotNull(targetNode)
                                                                                        const asserted = assertNotNull(targetCollectionType)
                                                                                        targetPropertyType = ["collection", {
                                                                                            "type": asserted,
                                                                                            "node": assertedTargetNode,
                                                                                        }]
                                                                                    },
                                                                                }),
                                                                                $.annotation,
                                                                            )
                                                                        },
                                                                        "component": ($) => {
                                                                            let targetComponentTypeName: pra.AnnotatedString<Annotation> | null = null
                                                                            return wrap(
                                                                                context.expectVerboseGroup({
                                                                                    properties: {
                                                                                        "type": {
                                                                                            onExists: ($) => wrap(
                                                                                                context.expectQuotedString({
                                                                                                    warningOnly: true,
                                                                                                    callback: ($) => {
                                                                                                        targetComponentTypeName = {
                                                                                                            value: $.token.token.value,
                                                                                                            annotation: $.token.annotation,
                                                                                                        }
                                                                                                    },
                                                                                                }),
                                                                                                $.token.annotation,
                                                                                            ),
                                                                                            onNotExists: (data) => {
                                                                                                targetComponentTypeName = {
                                                                                                    value: "",
                                                                                                    annotation: data.beginToken.annotation,
                                                                                                }
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                    onEnd: ($) => {
                                                                                        const assertedTargetComponentTypeName = assertNotNull(targetComponentTypeName)
                                                                                        targetPropertyType = ["component", {
                                                                                            "type": createReference(
                                                                                                "type",
                                                                                                assertedTargetComponentTypeName,
                                                                                                "",
                                                                                                $.annotation,
                                                                                                componentTypes,
                                                                                            ),
                                                                                        }]
                                                                                    },
                                                                                }),
                                                                                $.annotation,
                                                                            )
                                                                        },
                                                                        "state group": ($) => {
                                                                            const states = pc.createDictionaryBuilder<api.State<Annotation>>()
                                                                            let targetDefaultState: null | pra.AnnotatedString<Annotation> = null
                                                                            return wrap(
                                                                                context.expectVerboseGroup({
                                                                                    properties: {
                                                                                        "states": {
                                                                                            onExists: ($) => wrap(
                                                                                                context.expectDictionary({
                                                                                                    onProperty: (stateData) => {
                                                                                                        let targetNode: api.Node<Annotation> | null = null
                                                                                                        return wrap(
                                                                                                            context.expectVerboseGroup({
                                                                                                                properties: {
                                                                                                                    "node": createNodeDeserialiser(
                                                                                                                        context,
                                                                                                                        componentTypes,
                                                                                                                        (node) => {
                                                                                                                            targetNode = node
                                                                                                                        },
                                                                                                                    ),
                                                                                                                },
                                                                                                                onEnd: () => {
                                                                                                                    const asserted = assertNotNull(targetNode)
                                                                                                                    states.add(stateData.token.token.value, {
                                                                                                                        node: asserted,
                                                                                                                    })
                                                                                                                },
                                                                                                            }),
                                                                                                            stateData.token.annotation,
                                                                                                        )
                                                                                                    },
                                                                                                }),

                                                                                                $.token.annotation,
                                                                                            ),
                                                                                            onNotExists: () => {
                                                                                                //nothing to do, states dictionary already initialized
                                                                                            },
                                                                                        },
                                                                                        "default state": {
                                                                                            onExists: ($) => wrap(
                                                                                                context.expectQuotedString({
                                                                                                    warningOnly: true,
                                                                                                    callback: ($) => {
                                                                                                        targetDefaultState = {
                                                                                                            value: $.token.token.value,
                                                                                                            annotation: $.token.annotation,
                                                                                                        }
                                                                                                    },
                                                                                                }),
                                                                                                $.token.annotation,
                                                                                            ),
                                                                                            onNotExists: (data) => {
                                                                                                targetDefaultState = {
                                                                                                    value: "yes",
                                                                                                    annotation: data.beginToken.annotation,
                                                                                                }
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                    onEnd: ($) => {
                                                                                        const assertedTargetDefaultState = assertNotNull(targetDefaultState)
                                                                                        targetPropertyType = ["state group", {
                                                                                            "states": states.toDictionary(),
                                                                                            "default state": createReference(
                                                                                                "default state",
                                                                                                assertedTargetDefaultState,
                                                                                                "yes",
                                                                                                $.annotation,
                                                                                                states.toDictionary().getLookup(),
                                                                                            ),
                                                                                        }]

                                                                                    },
                                                                                }),
                                                                                $.annotation,
                                                                            )
                                                                        },
                                                                        "value": ($) => {
                                                                            let targetValueType: api.ValueType | null = null
                                                                            let defaultValue: string | null = null
                                                                            return wrap(
                                                                                context.expectVerboseGroup({
                                                                                    properties: {
                                                                                        "type": {
                                                                                            onExists: ($) => wrap(
                                                                                                context.expectTaggedUnion({
                                                                                                    options: {
                                                                                                        "number": ($) => {
                                                                                                            targetValueType = ["number", {}]
                                                                                                            return wrap(
                                                                                                                context.expectVerboseGroup({}),
                                                                                                                $.annotation

                                                                                                            )
                                                                                                        },
                                                                                                        "text": ($) => {
                                                                                                            targetValueType = ["string", {}]
                                                                                                            return wrap(
                                                                                                                context.expectVerboseGroup({}),
                                                                                                                $.annotation,
                                                                                                            )
                                                                                                        },
                                                                                                    },
                                                                                                }),
                                                                                                $.token.annotation,
                                                                                            ),
                                                                                            onNotExists: () => {
                                                                                                targetValueType = ["string", {}]
                                                                                            },
                                                                                        },
                                                                                        "default value": {
                                                                                            onExists: ($) => wrap(
                                                                                                context.expectQuotedString({
                                                                                                    warningOnly: true,
                                                                                                    callback: ($) => {
                                                                                                        defaultValue = $.token.token.value
                                                                                                    },
                                                                                                }),
                                                                                                $.token.annotation,
                                                                                            ),
                                                                                            onNotExists: () => {
                                                                                                defaultValue = ""
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                    onEnd: () => {
                                                                                        const assertedTargetValueType = assertNotNull(targetValueType)
                                                                                        const assertedDefaultValue = assertNotNull(defaultValue)
                                                                                        targetPropertyType = ["value", {
                                                                                            "default value": assertedDefaultValue,
                                                                                            "type": assertedTargetValueType,
                                                                                        }]
                                                                                    },
                                                                                }),
                                                                                $.annotation,
                                                                            )
                                                                        },
                                                                    },
                                                                }),
                                                                $.token.annotation
                                                            ),
                                                            onNotExists: () => {
                                                                targetPropertyType = ["value", {
                                                                    "default value": "",
                                                                    "type": ["string", {}],
                                                                }]
                                                            },
                                                        },
                                                    },
                                                    onEnd: () => {
                                                        const asserted = assertNotNull(targetPropertyType)
                                                        properties.add(propertyData.token.token.value, {
                                                            type: asserted,
                                                        })
                                                    },
                                                }),
                                                propertyData.token.annotation,
                                            )
                                        },
                                    }),
                                    $.token.annotation
                                ),
                                onNotExists: () => {
                                    //nothing to do, properties dictionary already created
                                },
                            },
                        },
                        onEnd: () => {
                            callback({ properties: properties.toDictionary() })
                        },
                    }),
                    $.token.annotation,
                )
            },
            onNotExists: () => {
                callback({
                    properties: pc.createDictionaryBuilder<api.Property<Annotation>>().toDictionary(),
                })
            },
        }
    }

    return {
        exists: ec.expectVerboseGroup({
            properties: {
                "component types": {
                    onExists: (_propertyData) => wrap(
                        ec.expectDictionary({
                            onBegin: () => {
                                //
                            },
                            onProperty: (propertyData) => {
                                //pl.logDebugMessage(`!!!>>>> ${propertyData.token.token.value}`)
                                let targetNode: api.Node<Annotation> | null = null
                                return wrap(
                                    ec.expectVerboseGroup({
                                        properties: {
                                            "node": createNodeDeserialiser(
                                                ec,
                                                componentTypes.toDictionary().getLookup(),
                                                (node) => {
                                                    targetNode = node
                                                },
                                            ),
                                        },
                                        onEnd: () => {
                                            const asserted = assertNotNull(targetNode)
                                            componentTypes.add(propertyData.token.token.value, {
                                                node: asserted,
                                            })
                                        },
                                    }),

                                    propertyData.token.annotation)
                            },
                        }),
                        _propertyData.token.annotation),
                    onNotExists: (): void => {
                        //nothing to do, component types already initialized
                    },
                },
                "root type": {
                    onExists: (_propertyData) => wrap(
                        ec.expectQuotedString({
                            warningOnly: true,
                            callback: ($) => {
                                rootName = {
                                    value: $.token.token.value,
                                    annotation: $.token.annotation,
                                }
                            },
                        }),
                        _propertyData.token.annotation
                    ),
                    onNotExists: (data) => {
                        rootName = {
                            value: "root",
                            annotation: data.beginToken.annotation,
                        }
                    },
                },
            },
            onEnd: ($) => {
                let targetSchema: api.Schema<Annotation> | null = null

                const assertedRootName = assertNotNull(rootName)
                targetSchema = {
                    "component types": componentTypes.toDictionary(),
                    "root type": createReference(
                        "root type",
                        assertedRootName,
                        "root",
                        $.annotation,
                        componentTypes.toDictionary().getLookup(),
                    ),
                }
                const success = x.resolve(
                    ($) => $i.onError(["resolve", {
                        message: $.message,
                        annotation: $.annotation
                    }])
                )
                $i.onDone(success ? targetSchema : null)
            },
        }),
        missing: () => {
            pc.panic("!")
            $i.onError({
                error: ["missing value", {  }],
                annotation: null,
            })
        },
    }
}

export function createCreateDeserializerWithSerializedError<Annotation>(
    $x: {
        onError: (
            $: {
                error: string,
                annotation: Annotation | null
            },
        ) => void
    },
    x: pra.ResolveRegistry<Annotation>,
    ec: aea.IExpectContext<Annotation>,
): api.CreateDeserializer<Annotation> {
    return createCreateDeserializer(
        {
            onError: ($) => {
                $x.onError({
                    error : createDeserializerErrorMessage($.error),
                    annotation: $.annotation,
                })
            },
        },
        x,
        ec,
    )
}



export function createCreateDeserializer<Annotation>(
    $x: {
        onError: (
            $: {
                error: inf.DeserializeError,
                annotation: Annotation | null,
            }
        ) => void
    },
    x: pra.ResolveRegistry<Annotation>,
    ec: aea.IExpectContext<Annotation>,
): api.CreateDeserializer<Annotation> {
    return ($i) => {
        return createDeserializer(
            {
                onError: $x.onError,
                onDone: $i.onDone,
            },
            x,
            ec,
        )
    }
}
