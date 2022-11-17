/* eslint
    "camelcase": "off",
    "max-len": "off",
    "@typescript-eslint/no-unused-vars": "off",
*/
import * as pl from "pareto-core-lib"
import * as pt from "pareto-core-types"
import * as pc from "pareto-core-candidates"

import * as api from "../../../interface"
import * as t from "pareto-lang-lib"


export function generateCreateDeserializer<PAnnotation>(
    schema: api.Schema<PAnnotation>,
): t.__procedure_implementations_B {
    return {
        "type parameters": {
            "Annotation": {},
            "NonAnnotation": {},
        },
        "namespace reference": {
            "namespace": "deserialize",
            "type arguments": {
                "Annotation": {},
                "NonAnnotation": {},
            },
        },
        "declaration": "createDeserializer",
        "block": {
            "nested procedures": buildDictionary((add) => {
                add("wrap", {
                    "specification": {
                        "return type": ["interface", {
                            "interface": {
                                "type": ["reference", {
                                    "namespace selection": {
                                        "which": ["other", {
                                            "namespace reference": {
                                                "namespace": "deserialize api",
                                                "type arguments": {
                                                    "Annotation": {},
                                                    "NonAnnotation": {},
                                                },
                                            },
                                        }],
                                    },
                                    "interface": "RequiredValueHandler",
                                }],
                            },
                        }],
                        "parameters": {
                            "handler": {
                                "type": ["reference", {
                                    "namespace selection": {
                                        "which": ["other", {
                                            "namespace reference": {
                                                "namespace": "deserialize api",
                                                "type arguments": {
                                                    "Annotation": {},
                                                    "NonAnnotation": {},
                                                },
                                            },
                                        }],
                                    },
                                    "interface": "ValueHandler",
                                }],
                            },
                        },
                        "block": {
                            "return value": ["interface", {
                                "expression": {
                                    "type": ["initialize", {
                                        "type": ["group", {
                                            "strategy": ["inline", {
                                                "members": {
                                                    "exists": {
                                                        "expression": {
                                                            "type": ["initialize", {
                                                                "type": ["method", {
                                                                    "strategy": ["argument", {
                                                                        "argument": "handler",
                                                                    }],
                                                                }],
                                                            }],
                                                        },
                                                    },
                                                    "missing": {
                                                        "expression": {
                                                            "type": ["initialize", {
                                                                "type": ["method", {
                                                                    "strategy": ["procedure implementation", {
                                                                    }],
                                                                }],
                                                            }],
                                                        },
                                                    },
                                                },
                                            }],
                                        }],
                                    }],
                                },
                            }],
                        },
                    },
                })
                schema["component types"].forEach(() => false, (e2, k) => {
                    const typeName = k
                    type Step = {
                        "type":
                        | ["group", {
                            "property": string
                        }]
                        | ["dictionary", {
                        }]
                        | ["list", {
                        }]
                        | ["tagged union option", {
                            "option": string
                        }]
                    }
                    function generateSteps(
                        $: pt.Array<Step>,
                    ): t.__steps_nested_type_reference_B[] {
                        return $.map(($): t.__steps_nested_type_reference_B => {
                            return {
                                "type": ((): t.__type_steps_TU_Builder => {
                                    switch ($.type[0]) {
                                        case "dictionary":
                                            return pl.cc($.type[1], ($): t.__type_steps_TU_Builder => {
                                                return ["dictionary", null]
                                            })
                                        case "group":
                                            return pl.cc($.type[1], ($) => {
                                                return ["group", {
                                                    "property": $.property,
                                                }]
                                            })
                                        case "list":
                                            return pl.cc($.type[1], ($) => {
                                                return ["list", null]
                                            })
                                        case "tagged union option":
                                            return pl.cc($.type[1], ($) => {
                                                return ["tagged union option", {
                                                    "option": $.option,
                                                }]
                                            })
                                        default:
                                            return pl.au($.type[0])
                                    }
                                })(),
                            }
                        })
                    }
                    function generateNodeDeserializer(
                        $: api.Node<PAnnotation>,
                        keyProperty: api.Property<PAnnotation> | null,
                        typePath: pt.Array<Step>,
                    ): t.__internal_procedure_specification_B {
                        return {
                            "return type": ["interface", {
                                "interface": {
                                    "type": ["reference", {
                                        "namespace selection": {
                                            "which": ["other", {
                                                "namespace reference": {
                                                    "namespace": "deserialize api",
                                                    "type arguments": {
                                                        "Annotation": {},
                                                        "NonAnnotation": {},
                                                    },
                                                },
                                            }],
                                        },
                                        "interface": "ValueHandler",
                                    }],
                                },
                            }],
                            "parameters": {
                                "out": {
                                    "type": ["method", {
                                        "type": {
                                            "namespace reference": {
                                                "namespace": "core",
                                            },
                                            "type": k,
                                            "steps": generateSteps(typePath),
                                        },
                                        "return type": ["void", {
                                        }],
                                    }],
                                },
                            },
                            "block": {
                                "states": buildDictionary((add) => {
                                    $.properties.forEach(() => false, ($, k) => {
                                        const newPath = concat<Step>(typePath, { "type": ["group", { "property": k }] })
                                        function generateInitializer(
                                            $: api.Node<PAnnotation>,
                                            keyProperty: api.Property<PAnnotation> | null,
                                        ): t.__type_expression_B {
                                            return {
                                                "strategy": ["literal", {
                                                    "type": ["group", {
                                                        "properties": buildDictionary((add) => {
                                                            $.properties.forEach(() => false, ($, k) => {
                                                                if ($ === keyProperty) {
                                                                    return
                                                                }
                                                                add(k, {
                                                                    "expression": {
                                                                        "strategy": ((): t.__strategy_type_expression_TU_Builder => {
                                                                            switch ($.type[0]) {
                                                                                case "collection":
                                                                                    return pl.cc($.type[1], ($): t.__strategy_type_expression_TU_Builder => {
                                                                                        switch ($.type[0]) {
                                                                                            case "dictionary":
                                                                                                return pl.cc($.type[1], ($) => {
                                                                                                    return ["literal", {
                                                                                                        "type": ["dictionary", {
                                                                                                        }],
                                                                                                    }]
                                                                                                })
                                                                                            case "list":
                                                                                                return pl.cc($.type[1], ($) => {
                                                                                                    return ["literal", {
                                                                                                        "type": ["list", {
                                                                                                        }],
                                                                                                    }]
                                                                                                })
                                                                                            default:
                                                                                                return pl.au($.type[0])
                                                                                        }
                                                                                    })
                                                                                case "component":
                                                                                    return pl.cc($.type[1], ($) => {
                                                                                        return ["literal", {
                                                                                            "type": ["string", {
                                                                                                "value": "FIXME COMP",
                                                                                            }],
                                                                                        }]
                                                                                    })
                                                                                case "state group":
                                                                                    return pl.cc($.type[1], ($) => {
                                                                                        return ["literal", {
                                                                                            "type": ["tagged union", {
                                                                                                "option": $["default state"].reference.name,
                                                                                                "data": generateInitializer(
                                                                                                    $["default state"].reference.get().node,
                                                                                                    null,
                                                                                                ),
                                                                                            }],
                                                                                        }]
                                                                                    })
                                                                                case "value":
                                                                                    return pl.cc($.type[1], ($) => {
                                                                                        const $$ = $
                                                                                        return ["literal", {
                                                                                            "type": ((): t.__type_literal_TU_Builder => {
                                                                                                switch ($.type[0]) {
                                                                                                    case "boolean":
                                                                                                        return pl.cc($.type[1], ($) => {
                                                                                                            return ["boolean", {
                                                                                                                "value": $$["default value"],
                                                                                                            }]
                                                                                                        })
                                                                                                    case "number":
                                                                                                        return pl.cc($.type[1], ($) => {
                                                                                                            return ["number", {
                                                                                                                "value": $$["default value"],
                                                                                                            }]
                                                                                                        })
                                                                                                    case "string":
                                                                                                        return pl.cc($.type[1], ($) => {
                                                                                                            return ["string", {
                                                                                                                "value": $$["default value"],
                                                                                                            }]
                                                                                                        })
                                                                                                    default:
                                                                                                        return pl.au($.type[0])
                                                                                                }
                                                                                            })(),
                                                                                        }]
                                                                                    })
                                                                                default:
                                                                                    return pl.au($.type[0])
                                                                            }
                                                                        })(),
                                                                    },
                                                                })
                                                            })
                                                        }),
                                                    }],
                                                }],
                                            }
                                        }
                                        if ($ === keyProperty) {
                                            return
                                        }
                                        add(k, {
                                            "type": ((): t.__type_states_TU_Builder => {
                                                switch ($.type[0]) {
                                                    case "collection":
                                                        return pl.cc($.type[1], ($) => {
                                                            switch ($.type[0]) {
                                                                case "dictionary":
                                                                    return pl.cc($.type[1], ($): t.__type_states_TU_Builder => {
                                                                        return ["dictionary", {
                                                                            "type": {
                                                                                "namespace reference": {
                                                                                    "namespace": "core",
                                                                                },
                                                                                "type": typeName,
                                                                                "steps": generateSteps(newPath),
                                                                            },
                                                                        }]
                                                                    })
                                                                case "list":
                                                                    return pl.cc($.type[1], ($): t.__type_states_TU_Builder => {
                                                                        return ["list", {
                                                                            "type": {
                                                                                "namespace reference": {
                                                                                    "namespace": "core",
                                                                                },
                                                                                "type": typeName,
                                                                                "steps": generateSteps(newPath),
                                                                            },
                                                                        }]
                                                                    })
                                                                default:
                                                                    return pl.au($.type[0])
                                                            }
                                                        })
                                                    case "component":
                                                        return pl.cc($.type[1], ($): t.__type_states_TU_Builder => {
                                                            return ["type5", {
                                                                "nested type": {
                                                                    "namespace reference": {
                                                                        "namespace": "core",
                                                                    },
                                                                    "type": typeName,
                                                                    "steps": [],
                                                                },
                                                                "expression": generateInitializer($.type.reference.get().node, null),
                                                            }]
                                                        })
                                                    case "state group":
                                                        return pl.cc($.type[1], ($): t.__type_states_TU_Builder => {
                                                            return ["type5", {
                                                                "nested type": {
                                                                    "namespace reference": {
                                                                        "namespace": "core",
                                                                    },
                                                                    "type": typeName,
                                                                    "steps": generateSteps(newPath),
                                                                },
                                                                // "type": k,
                                                                "expression": {
                                                                    "strategy": ["literal", {
                                                                        "type": ["tagged union", {
                                                                            "option": $["default state"].reference.name,
                                                                            "data": generateInitializer(
                                                                                $["default state"].reference.get().node,
                                                                                null,
                                                                            ),
                                                                            //"value": "FIXME SG",
                                                                        }],
                                                                    }],
                                                                },
                                                            }]
                                                        })
                                                    case "value":
                                                        return pl.cc($.type[1], ($) => {
                                                            return ["string", {
                                                                "initial value": $["default value"],
                                                            }]
                                                        })
                                                    default:
                                                        return pl.au($.type[0])
                                                }
                                            })(),
                                        })
                                    })
                                }),
                                "return value": ["interface", {
                                    "expression": {
                                        "type": ["initialize", {
                                            "type": ["reference", {
                                                "strategy": ["procedure call6", {
                                                    "procedure call": {
                                                        "type": ["external", {
                                                            "builder": "context",
                                                            "method": "expectVerboseGroup",
                                                        }],
                                                        "procedure call": {
                                                            "interface arguments": {
                                                                "properties": {
                                                                    "expression": {
                                                                        "type": ["initialize", {
                                                                            "type": ["dictionary", {
                                                                                "entries": buildDictionary((add: (key: string, v: t.__entries_B) => void) => {
                                                                                    $.properties.forEach(() => false, (p, k) => {
                                                                                        if (p === keyProperty) {
                                                                                            return
                                                                                        }
                                                                                        const newPath = concat<Step>(typePath, { "type": ["group", { "property": k }] })
                                                                                        add(k, {
                                                                                            "expression": {
                                                                                                "type": ["initialize", {
                                                                                                    "type": ["group", {
                                                                                                        "strategy": ["inline", {
                                                                                                            "members": {
                                                                                                                "onExists": {
                                                                                                                    "expression": {
                                                                                                                        "type": ["initialize", {
                                                                                                                            "type": ["method", {
                                                                                                                                "strategy": ["procedure implementation", {
                                                                                                                                    "block": {
                                                                                                                                        "return value": ["interface", {
                                                                                                                                            "expression": {
                                                                                                                                                "type": ["initialize", {
                                                                                                                                                    "type": ((): t.__type_initialize_TU_Builder => {
                                                                                                                                                        function x(
                                                                                                                                                            internalProcedure: t.__internal_procedure_specification_B,
                                                                                                                                                            effect: t.__effects_B,
                                                                                                                                                        ): t.__interface_expression_B {
                                                                                                                                                            return {//HIER
                                                                                                                                                                "type": ["initialize", {
                                                                                                                                                                    "type": ["reference", {
                                                                                                                                                                        "strategy": ["procedure call6", {
                                                                                                                                                                            "procedure call": {
                                                                                                                                                                                "type": ["local", {
                                                                                                                                                                                    "procedure": "wrap", //wrap
                                                                                                                                                                                }],
                                                                                                                                                                                "procedure call": {
                                                                                                                                                                                    "interface arguments": {
                                                                                                                                                                                        "handler": { //handler
                                                                                                                                                                                            "expression": {
                                                                                                                                                                                                "type": ["initialize", {
                                                                                                                                                                                                    "type": ["method", {
                                                                                                                                                                                                        "strategy": ["inline procedure", {
                                                                                                                                                                                                            "specification": {
                                                                                                                                                                                                                "return type": ["interface", {
                                                                                                                                                                                                                    "interface": {
                                                                                                                                                                                                                        "type": ["reference", {
                                                                                                                                                                                                                            "namespace selection": {
                                                                                                                                                                                                                                "which": ["other", {
                                                                                                                                                                                                                                    "namespace reference": {
                                                                                                                                                                                                                                        "namespace": "deserialize api",
                                                                                                                                                                                                                                        "type arguments": {
                                                                                                                                                                                                                                            "Annotation": {},
                                                                                                                                                                                                                                            "NonAnnotation": {},
                                                                                                                                                                                                                                        },
                                                                                                                                                                                                                                    },
                                                                                                                                                                                                                                }],
                                                                                                                                                                                                                            },
                                                                                                                                                                                                                            "interface": "ValueHandler",
                                                                                                                                                                                                                        }],
                                                                                                                                                                                                                    },
                                                                                                                                                                                                                }],
                                                                                                                                                                                                                "block": {
                                                                                                                                                                                                                    "nested procedures": {
                                                                                                                                                                                                                        "temp": { //temp
                                                                                                                                                                                                                            "specification": internalProcedure,
                                                                                                                                                                                                                        },
                                                                                                                                                                                                                    },
                                                                                                                                                                                                                    "return value": ["interface", {
                                                                                                                                                                                                                        "expression": {
                                                                                                                                                                                                                            "type": ["initialize", {
                                                                                                                                                                                                                                "type": ["reference", {
                                                                                                                                                                                                                                    "strategy": ["procedure call6", {
                                                                                                                                                                                                                                        "procedure call": {
                                                                                                                                                                                                                                            "type": ["local", {
                                                                                                                                                                                                                                                "procedure": "temp",
                                                                                                                                                                                                                                            }],
                                                                                                                                                                                                                                            "procedure call": {
                                                                                                                                                                                                                                                "interface arguments": {
                                                                                                                                                                                                                                                    "out": {
                                                                                                                                                                                                                                                        "expression": {
                                                                                                                                                                                                                                                            "type": ["initialize", {
                                                                                                                                                                                                                                                                "type": ["method", {
                                                                                                                                                                                                                                                                    "strategy": ["procedure implementation", {
                                                                                                                                                                                                                                                                        "block": {
                                                                                                                                                                                                                                                                            "effects": [
                                                                                                                                                                                                                                                                                effect,
                                                                                                                                                                                                                                                                            ],
                                                                                                                                                                                                                                                                        },
                                                                                                                                                                                                                                                                    }],
                                                                                                                                                                                                                                                                }],
                                                                                                                                                                                                                                                            }],
                                                                                                                                                                                                                                                        },
                                                                                                                                                                                                                                                    },
                                                                                                                                                                                                                                                },
                                                                                                                                                                                                                                            },
                                                                                                                                                                                                                                        },
                                                                                                                                                                                                                                    }],
                                                                                                                                                                                                                                }],
                                                                                                                                                                                                                            }],
                                                                                                                                                                                                                        },
                                                                                                                                                                                                                    }],
                                                                                                                                                                                                                },
                                                                                                                                                                                                            },
                                                                                                                                                                                                        }],
                                                                                                                                                                                                    }],
                                                                                                                                                                                                }],
                                                                                                                                                                                            },
                                                                                                                                                                                        },
                                                                                                                                                                                    },
                                                                                                                                                                                },
                                                                                                                                                                            },
                                                                                                                                                                        }],
                                                                                                                                                                    }],
                                                                                                                                                                }],
                                                                                                                                                            }
                                                                                                                                                        }
                                                                                                                                                        switch (p.type[0]) {
                                                                                                                                                            case "collection":
                                                                                                                                                                return pl.cc(p.type[1], ($): t.__type_initialize_TU_Builder => {
                                                                                                                                                                    switch ($.type[0]) {
                                                                                                                                                                        case "dictionary":
                                                                                                                                                                            return pl.cc($.type[1], ($$): t.__type_initialize_TU_Builder => {
                                                                                                                                                                                return ["reference", {
                                                                                                                                                                                    "strategy": ["procedure call6", {
                                                                                                                                                                                        "procedure call": {
                                                                                                                                                                                            "type": ["local", {
                                                                                                                                                                                                "procedure": "wrap",
                                                                                                                                                                                            }],
                                                                                                                                                                                            "procedure call": {
                                                                                                                                                                                                "interface arguments": {
                                                                                                                                                                                                    "handler": {
                                                                                                                                                                                                        "expression": {
                                                                                                                                                                                                            "type": ["initialize", {
                                                                                                                                                                                                                "type": ["reference", {
                                                                                                                                                                                                                    "strategy": ["procedure call6", {
                                                                                                                                                                                                                        "procedure call": {
                                                                                                                                                                                                                            "type": ["external", {
                                                                                                                                                                                                                                "builder": "context",
                                                                                                                                                                                                                                "method": "expectDictionary",
                                                                                                                                                                                                                            }],
                                                                                                                                                                                                                            "procedure call": {
                                                                                                                                                                                                                                "interface arguments": {
                                                                                                                                                                                                                                    "onProperty": {//onProperty
                                                                                                                                                                                                                                        "expression": {
                                                                                                                                                                                                                                            "type": ["initialize", {
                                                                                                                                                                                                                                                "type": ["method", {
                                                                                                                                                                                                                                                    "strategy": ["procedure implementation", {
                                                                                                                                                                                                                                                        "block": {
                                                                                                                                                                                                                                                            "markers": {
                                                                                                                                                                                                                                                                "y": {},
                                                                                                                                                                                                                                                            },
                                                                                                                                                                                                                                                            "return value": ["interface", {
                                                                                                                                                                                                                                                                "expression": x(
                                                                                                                                                                                                                                                                    generateNodeDeserializer(
                                                                                                                                                                                                                                                                        $.node,
                                                                                                                                                                                                                                                                        $$["key property"].reference.get(),
                                                                                                                                                                                                                                                                        concat<Step>(
                                                                                                                                                                                                                                                                            newPath,
                                                                                                                                                                                                                                                                            {
                                                                                                                                                                                                                                                                                "type": ["dictionary", null],
                                                                                                                                                                                                                                                                            },
                                                                                                                                                                                                                                                                        ),
                                                                                                                                                                                                                                                                    ),
                                                                                                                                                                                                                                                                    {
                                                                                                                                                                                                                                                                        "type": ["state change", {
                                                                                                                                                                                                                                                                            "state": k,
                                                                                                                                                                                                                                                                            "type": ["dictionary", {
                                                                                                                                                                                                                                                                                "strategy": ["add entry", {
                                                                                                                                                                                                                                                                                    "key": {
                                                                                                                                                                                                                                                                                        "strategy": ["select", {
                                                                                                                                                                                                                                                                                            "context": {
                                                                                                                                                                                                                                                                                                "start": {
                                                                                                                                                                                                                                                                                                    "start": ["marked value", {
                                                                                                                                                                                                                                                                                                        "marker": "y",
                                                                                                                                                                                                                                                                                                    }],
                                                                                                                                                                                                                                                                                                },
                                                                                                                                                                                                                                                                                                "steps": [
                                                                                                                                                                                                                                                                                                    { "property": "token" },
                                                                                                                                                                                                                                                                                                    { "property": "data" },
                                                                                                                                                                                                                                                                                                    { "property": "value" },
                                                                                                                                                                                                                                                                                                ],
                                                                                                                                                                                                                                                                                            },
                                                                                                                                                                                                                                                                                        }],
                                                                                                                                                                                                                                                                                    },
                                                                                                                                                                                                                                                                                    "expression": {
                                                                                                                                                                                                                                                                                        "strategy": ["copy", {
                                                                                                                                                                                                                                                                                        }],
                                                                                                                                                                                                                                                                                    },
                                                                                                                                                                                                                                                                                }],
                                                                                                                                                                                                                                                                            }],
                                                                                                                                                                                                                                                                        }],
                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                ),
                                                                                                                                                                                                                                                            }],
                                                                                                                                                                                                                                                        },
                                                                                                                                                                                                                                                    }],
                                                                                                                                                                                                                                                }],
                                                                                                                                                                                                                                            }],
                                                                                                                                                                                                                                        },
                                                                                                                                                                                                                                    },
                                                                                                                                                                                                                                },
                                                                                                                                                                                                                            },
                                                                                                                                                                                                                        },
                                                                                                                                                                                                                    }],
                                                                                                                                                                                                                }],
                                                                                                                                                                                                            }],
                                                                                                                                                                                                        },
                                                                                                                                                                                                    },
                                                                                                                                                                                                },
                                                                                                                                                                                            },
                                                                                                                                                                                        },
                                                                                                                                                                                    }],
                                                                                                                                                                                }]
                                                                                                                                                                            })
                                                                                                                                                                        case "list":
                                                                                                                                                                            return pl.cc($.type[1], ($$) => {
                                                                                                                                                                                return ["reference", {
                                                                                                                                                                                    "strategy": ["procedure call6", {
                                                                                                                                                                                        "procedure call": {
                                                                                                                                                                                            "type": ["local", {
                                                                                                                                                                                                "procedure": "wrap",
                                                                                                                                                                                            }],
                                                                                                                                                                                            "arguments": {
                                                                                                                                                                                                "handler": {
                                                                                                                                                                                                    "type": ["procedure call2", {
                                                                                                                                                                                                        "procedure call3": {
                                                                                                                                                                                                            "type": ["external", {
                                                                                                                                                                                                                "builder": "context",
                                                                                                                                                                                                                "method": "expectList",
                                                                                                                                                                                                            }],
                                                                                                                                                                                                            "arguments": {
                                                                                                                                                                                                                "onElement": {
                                                                                                                                                                                                                    "strategy": ["procedure implementation", {
                                                                                                                                                                                                                        "block": generateNodeDeserializer(
                                                                                                                                                                                                                            $.node,
                                                                                                                                                                                                                            null,
                                                                                                                                                                                                                            concat(
                                                                                                                                                                                                                                newPath,
                                                                                                                                                                                                                                {
                                                                                                                                                                                                                                    "type": ["list", null],
                                                                                                                                                                                                                                },
                                                                                                                                                                                                                            ),
                                                                                                                                                                                                                        ),
                                                                                                                                                                                                                    }],
                                                                                                                                                                                                                },
                                                                                                                                                                                                            },
                                                                                                                                                                                                        },
                                                                                                                                                                                                    }],
                                                                                                                                                                                                },
                                                                                                                                                                                            },
                                                                                                                                                                                        },
                                                                                                                                                                                    }],
                                                                                                                                                                                }]
                                                                                                                                                                            })
                                                                                                                                                                        default:
                                                                                                                                                                            return pl.au($.type[0])
                                                                                                                                                                    }
                                                                                                                                                                })
                                                                                                                                                            case "component":
                                                                                                                                                                return pl.cc(p.type[1], ($): t.__type_initialize_TU_Builder => {
                                                                                                                                                                    return ["reference", {
                                                                                                                                                                        "strategy": ["procedure call6", {
                                                                                                                                                                            "procedure call": {
                                                                                                                                                                                "type": ["external", {
                                                                                                                                                                                    "builder": "context",
                                                                                                                                                                                    "method": "expectFoo",
                                                                                                                                                                                }],
                                                                                                                                                                            },
                                                                                                                                                                        }],
                                                                                                                                                                    }]
                                                                                                                                                                })
                                                                                                                                                            case "state group":
                                                                                                                                                                return pl.cc(p.type[1], ($): t.__type_initialize_TU_Builder => {
                                                                                                                                                                    return ["reference", {
                                                                                                                                                                        "strategy": ["procedure call6", {
                                                                                                                                                                            "procedure call": {
                                                                                                                                                                                "type": ["external", {
                                                                                                                                                                                    "builder": "context",
                                                                                                                                                                                    "method": "expectTaggedUnion",
                                                                                                                                                                                }],
                                                                                                                                                                                "procedure call": {
                                                                                                                                                                                    "interface arguments": {
                                                                                                                                                                                        "options": {
                                                                                                                                                                                            "expression": {
                                                                                                                                                                                                "type": ["initialize", {
                                                                                                                                                                                                    "type": ["dictionary", {
                                                                                                                                                                                                        "entries": buildDictionary((add) => {
                                                                                                                                                                                                            const tuKey = k
                                                                                                                                                                                                            $.states.forEach(() => false, ($, k) => {
                                                                                                                                                                                                                add(k, {
                                                                                                                                                                                                                    "expression": {
                                                                                                                                                                                                                        "type": ["initialize", {
                                                                                                                                                                                                                            "type": ["method", {
                                                                                                                                                                                                                                "strategy": ["procedure implementation", {
                                                                                                                                                                                                                                    "block": {
                                                                                                                                                                                                                                        "return value": ["interface", {
                                                                                                                                                                                                                                            "expression": {
                                                                                                                                                                                                                                                "type": ["initialize", {
                                                                                                                                                                                                                                                    "type": ["reference", {
                                                                                                                                                                                                                                                        "strategy": ["procedure call6", {
                                                                                                                                                                                                                                                            "procedure call": {
                                                                                                                                                                                                                                                                "type": ["local", {
                                                                                                                                                                                                                                                                    "procedure": "wrap",
                                                                                                                                                                                                                                                                }],
                                                                                                                                                                                                                                                                "procedure call": {
                                                                                                                                                                                                                                                                    "interface arguments": {
                                                                                                                                                                                                                                                                        "handler": {
                                                                                                                                                                                                                                                                            "expression": {
                                                                                                                                                                                                                                                                                "type": ["initialize", {
                                                                                                                                                                                                                                                                                    "type": ["method", {
                                                                                                                                                                                                                                                                                        "strategy": ["procedure implementation", {
                                                                                                                                                                                                                                                                                            "block": {
                                                                                                                                                                                                                                                                                                "return value": ["interface", {
                                                                                                                                                                                                                                                                                                    "expression": x(
                                                                                                                                                                                                                                                                                                        generateNodeDeserializer(
                                                                                                                                                                                                                                                                                                            $.node,
                                                                                                                                                                                                                                                                                                            null,
                                                                                                                                                                                                                                                                                                            concat(
                                                                                                                                                                                                                                                                                                                newPath,
                                                                                                                                                                                                                                                                                                                {
                                                                                                                                                                                                                                                                                                                    "type": ["tagged union option", { "option": k }],
                                                                                                                                                                                                                                                                                                                },
                                                                                                                                                                                                                                                                                                            ),
                                                                                                                                                                                                                                                                                                        ),
                                                                                                                                                                                                                                                                                                        {
                                                                                                                                                                                                                                                                                                            "type": ["state change", {
                                                                                                                                                                                                                                                                                                                "state": tuKey,
                                                                                                                                                                                                                                                                                                                "type": ["type4", {
                                                                                                                                                                                                                                                                                                                    "expression": {
                                                                                                                                                                                                                                                                                                                        "strategy": ["literal", {
                                                                                                                                                                                                                                                                                                                            "type": ["tagged union", {
                                                                                                                                                                                                                                                                                                                                "option": k,
                                                                                                                                                                                                                                                                                                                                "data": {
                                                                                                                                                                                                                                                                                                                                    "strategy": ["copy", {
                                                                                                                                                                                                                                                                                                                                        "context": {
                                                                                                                                                                                                                                                                                                                                            "start": {
                                                                                                                                                                                                                                                                                                                                                "start": ["context", null],
                                                                                                                                                                                                                                                                                                                                            },
                                                                                                                                                                                                                                                                                                                                        },
                                                                                                                                                                                                                                                                                                                                    }],
                                                                                                                                                                                                                                                                                                                                },
                                                                                                                                                                                                                                                                                                                            }],
                                                                                                                                                                                                                                                                                                                        }],
                                                                                                                                                                                                                                                                                                                    },
                                                                                                                                                                                                                                                                                                                }],
                                                                                                                                                                                                                                                                                                            }],
                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                    ),
                                                                                                                                                                                                                                                                                                }],
                                                                                                                                                                                                                                                                                            },
                                                                                                                                                                                                                                                                                        }],
                                                                                                                                                                                                                                                                                    }],
                                                                                                                                                                                                                                                                                }],
                                                                                                                                                                                                                                                                            },
                                                                                                                                                                                                                                                                        },
                                                                                                                                                                                                                                                                    },
                                                                                                                                                                                                                                                                },
                                                                                                                                                                                                                                                            },
                                                                                                                                                                                                                                                        }],
                                                                                                                                                                                                                                                    }],
                                                                                                                                                                                                                                                }],
                                                                                                                                                                                                                                            },
                                                                                                                                                                                                                                        }],
                                                                                                                                                                                                                                    },
                                                                                                                                                                                                                                }],
                                                                                                                                                                                                                            }],
                                                                                                                                                                                                                        }],
                                                                                                                                                                                                                    },
                                                                                                                                                                                                                })
                                                                                                                                                                                                            })
                                                                                                                                                                                                        }),
                                                                                                                                                                                                    }],
                                                                                                                                                                                                }],
                                                                                                                                                                                            },
                                                                                                                                                                                        },
                                                                                                                                                                                    },
                                                                                                                                                                                },
                                                                                                                                                                            },
                                                                                                                                                                        }],
                                                                                                                                                                    }]
                                                                                                                                                                })
                                                                                                                                                            case "value":
                                                                                                                                                                return pl.cc(p.type[1], ($): t.__type_initialize_TU_Builder => {
                                                                                                                                                                    return ["reference", {
                                                                                                                                                                        "strategy": ["procedure call6", {
                                                                                                                                                                            "procedure call": {
                                                                                                                                                                                "type": ["external", {
                                                                                                                                                                                    "builder": "context",
                                                                                                                                                                                    "method": "expectQuotedString",
                                                                                                                                                                                }],
                                                                                                                                                                                "procedure call": {
                                                                                                                                                                                    "interface arguments": {
                                                                                                                                                                                        "callback": {
                                                                                                                                                                                            "expression": {
                                                                                                                                                                                                "type": ["initialize", {
                                                                                                                                                                                                    "type": ["method", {
                                                                                                                                                                                                        "strategy": ["procedure implementation", {
                                                                                                                                                                                                            "block": {
                                                                                                                                                                                                                "effects": [
                                                                                                                                                                                                                    {
                                                                                                                                                                                                                        "type": ["state change", {
                                                                                                                                                                                                                            "state": k,
                                                                                                                                                                                                                            "type": ["string", {
                                                                                                                                                                                                                                "initializer": {
                                                                                                                                                                                                                                    "strategy": ["select", {
                                                                                                                                                                                                                                        "context": {
                                                                                                                                                                                                                                            "start": {
                                                                                                                                                                                                                                                "start": ["context", {

                                                                                                                                                                                                                                                }],
                                                                                                                                                                                                                                            },
                                                                                                                                                                                                                                            "steps": [
                                                                                                                                                                                                                                                { "property": "token" },
                                                                                                                                                                                                                                                { "property": "data" },
                                                                                                                                                                                                                                                { "property": "value" },
                                                                                                                                                                                                                                            ],
                                                                                                                                                                                                                                        },
                                                                                                                                                                                                                                    }],
                                                                                                                                                                                                                                },
                                                                                                                                                                                                                            }],
                                                                                                                                                                                                                        }],
                                                                                                                                                                                                                    },
                                                                                                                                                                                                                ],
                                                                                                                                                                                                            },
                                                                                                                                                                                                        }],
                                                                                                                                                                                                    }],
                                                                                                                                                                                                }],
                                                                                                                                                                                            },
                                                                                                                                                                                        },
                                                                                                                                                                                    },
                                                                                                                                                                                },
                                                                                                                                                                            },
                                                                                                                                                                        }],
                                                                                                                                                                    }]
                                                                                                                                                                })
                                                                                                                                                            default:
                                                                                                                                                                return pl.au(p.type[0])
                                                                                                                                                        }
                                                                                                                                                    })(),
                                                                                                                                                }],
                                                                                                                                            },
                                                                                                                                        }],
                                                                                                                                    },
                                                                                                                                }],
                                                                                                                            }],
                                                                                                                        }],
                                                                                                                    },
                                                                                                                },
                                                                                                            },
                                                                                                        }],
                                                                                                    }],
                                                                                                }],
                                                                                            },
                                                                                        })
                                                                                    })
                                                                                }),
                                                                            }],
                                                                        }],
                                                                    },
                                                                },
                                                                "onEnd": {
                                                                    "expression": {
                                                                        "type": ["initialize", {
                                                                            "type": ["method", {
                                                                                "strategy": ["procedure implementation", {
                                                                                    "block": {
                                                                                        "effects": [
                                                                                            {
                                                                                                "type": ["internal interface call", {
                                                                                                    "interface": "out",
                                                                                                    "expression": {
                                                                                                        "strategy": ["literal", {
                                                                                                            "type": ["group", {
                                                                                                                "properties": buildDictionary((add) => {
                                                                                                                    $.properties.forEach(() => false, ($, k) => {
                                                                                                                        if ($ === keyProperty) {
                                                                                                                            return
                                                                                                                        }
                                                                                                                        add(k, {
                                                                                                                            "expression": {
                                                                                                                                "strategy": ((): t.__strategy_type_expression_TU_Builder => {
                                                                                                                                    switch ($.type[0]) {
                                                                                                                                        case "collection":
                                                                                                                                            return pl.cc($.type[1], ($): t.__strategy_type_expression_TU_Builder => {
                                                                                                                                                switch ($.type[0]) {
                                                                                                                                                    case "dictionary":
                                                                                                                                                        return pl.cc($.type[1], ($) => {
                                                                                                                                                            return ["dictionary from state", {
                                                                                                                                                                "state": k,
                                                                                                                                                            }]
                                                                                                                                                        })
                                                                                                                                                    case "list":
                                                                                                                                                        return pl.cc($.type[1], ($) => {
                                                                                                                                                            return ["copy", {
                                                                                                                                                                "context": {
                                                                                                                                                                    "start": {
                                                                                                                                                                        "start": ["state", {
                                                                                                                                                                            "state": k,
                                                                                                                                                                        }],
                                                                                                                                                                    },
                                                                                                                                                                },
                                                                                                                                                            }]
                                                                                                                                                        })
                                                                                                                                                    default:
                                                                                                                                                        return pl.au($.type[0])
                                                                                                                                                }
                                                                                                                                            })
                                                                                                                                        case "component":
                                                                                                                                            return pl.cc($.type[1], ($): t.__strategy_type_expression_TU_Builder => {
                                                                                                                                                return ["copy", {
                                                                                                                                                    "context": {
                                                                                                                                                        "start": {
                                                                                                                                                            "start": ["state", {
                                                                                                                                                                "state": k,
                                                                                                                                                            }],
                                                                                                                                                        },
                                                                                                                                                    },
                                                                                                                                                }]
                                                                                                                                            })
                                                                                                                                        case "state group":
                                                                                                                                            return pl.cc($.type[1], ($) => {
                                                                                                                                                return ["copy", {
                                                                                                                                                    "context": {
                                                                                                                                                        "start": {
                                                                                                                                                            "start": ["state", {
                                                                                                                                                                "state": k,
                                                                                                                                                            }],
                                                                                                                                                        },
                                                                                                                                                    },
                                                                                                                                                }]
                                                                                                                                            })
                                                                                                                                        case "value":
                                                                                                                                            return pl.cc($.type[1], ($): t.__strategy_type_expression_TU_Builder => {
                                                                                                                                                switch ($.type[0]) {
                                                                                                                                                    case "boolean":
                                                                                                                                                        return pl.cc($.type[1], ($): t.__strategy_type_expression_TU_Builder => {
                                                                                                                                                            return ["copy", {
                                                                                                                                                                "context": {
                                                                                                                                                                    "start": {
                                                                                                                                                                        "start": ["function", {
                                                                                                                                                                            "context": ["argument", {
                                                                                                                                                                                "function": "stringToBoolean",
                                                                                                                                                                            }],
                                                                                                                                                                            // ""
                                                                                                                                                                            // "context": ["from marked", {
                                                                                                                                                                            //     "marker": "x",
                                                                                                                                                                            // }],
                                                                                                                                                                            "argument": {
                                                                                                                                                                                "strategy": ["copy", {
                                                                                                                                                                                    "context": {
                                                                                                                                                                                        "start": {
                                                                                                                                                                                            "start": ["state", {
                                                                                                                                                                                                "state": k,
                                                                                                                                                                                            }],
                                                                                                                                                                                        },
                                                                                                                                                                                    },
                                                                                                                                                                                }],
                                                                                                                                                                            },
                                                                                                                                                                        }],
                                                                                                                                                                    },
                                                                                                                                                                },
                                                                                                                                                            }]
                                                                                                                                                        })
                                                                                                                                                    case "number":
                                                                                                                                                        return pl.cc($.type[1], ($) => {
                                                                                                                                                            return ["copy", {
                                                                                                                                                                "context": {
                                                                                                                                                                    "start": {
                                                                                                                                                                        "start": ["function", {
                                                                                                                                                                            "context": ["argument", {
                                                                                                                                                                                "function": "stringToNumber",
                                                                                                                                                                            }],
                                                                                                                                                                            // "context": ["from marked", {
                                                                                                                                                                            //     "marker": "x",
                                                                                                                                                                            // }],
                                                                                                                                                                            "argument": {
                                                                                                                                                                                "strategy": ["copy", {
                                                                                                                                                                                    "context": {
                                                                                                                                                                                        "start": {
                                                                                                                                                                                            "start": ["state", {
                                                                                                                                                                                                "state": k,
                                                                                                                                                                                            }],
                                                                                                                                                                                        },
                                                                                                                                                                                    },
                                                                                                                                                                                }],
                                                                                                                                                                            },
                                                                                                                                                                        }],
                                                                                                                                                                    },
                                                                                                                                                                },
                                                                                                                                                            }]
                                                                                                                                                        })
                                                                                                                                                    case "string":
                                                                                                                                                        return pl.cc($.type[1], ($): t.__strategy_type_expression_TU_Builder => {
                                                                                                                                                            return ["copy", {
                                                                                                                                                                "context": {
                                                                                                                                                                    "start": {
                                                                                                                                                                        "start": ["state", {
                                                                                                                                                                            "state": k,
                                                                                                                                                                        }],
                                                                                                                                                                    },
                                                                                                                                                                },
                                                                                                                                                            }]
                                                                                                                                                        })
                                                                                                                                                    default:
                                                                                                                                                        return pl.au($.type[0])
                                                                                                                                                }
                                                                                                                                            })
                                                                                                                                        default:
                                                                                                                                            return pl.au($.type[0])
                                                                                                                                    }
                                                                                                                                })(),
                                                                                                                            },
                                                                                                                        })
                                                                                                                    })
                                                                                                                }),
                                                                                                            }],
                                                                                                        }],
                                                                                                    },
                                                                                                }],
                                                                                            },
                                                                                        ],
                                                                                    },
                                                                                }],
                                                                            }],
                                                                        }],
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    },
                                                }],
                                            }],
                                        }],
                                    },
                                }],
                            },
                        }
                    }
                    add(`${k}`, {
                        "specification": {
                            "return type": ["interface", {
                                "interface": {
                                    "type": ["reference", {
                                        "namespace selection": {
                                            "which": ["other", {
                                                "namespace reference": {
                                                    "namespace": "deserialize api",
                                                    "type arguments": {
                                                        "Annotation": {},
                                                        "NonAnnotation": {},
                                                    },
                                                },
                                            }],
                                        },
                                        "interface": "ValueHandler",
                                    }],
                                },
                            }],
                            "parameters": {
                                "callback": {
                                    "type": ["method", {
                                        "type": {
                                            "namespace reference": {
                                                "namespace": "core",
                                            },
                                            "type": k,
                                        },
                                    }],
                                },
                            },
                            "block": {
                                "nested procedures": {
                                    "temp": {
                                        "specification": generateNodeDeserializer(
                                            e2.node,
                                            null,
                                            [],
                                        ),
                                    },
                                },
                                "return value": ["interface", {
                                    "expression": {
                                        "type": ["initialize", {
                                            "type": ["reference", {
                                                "strategy": ["procedure call6", {
                                                    "procedure call": {
                                                        "type": ["local", {
                                                            "procedure": "temp",
                                                        }],
                                                        "procedure call": {
                                                            "interface arguments": {
                                                                "out": {
                                                                    "expression": {
                                                                        "type": ["initialize", {
                                                                            "type": ["method", {
                                                                                "strategy": ["procedure implementation", {
                                                                                    "block": {
                                                                                        "effects": [
                                                                                            {
                                                                                                "type": ["internal interface call", {
                                                                                                    "interface": "callback",
                                                                                                    "expression": {
                                                                                                        "strategy": ["copy", {
                                                                                                        }],
                                                                                                    },
                                                                                                }],
                                                                                            },
                                                                                        ],
                                                                                    },
                                                                                }],
                                                                            }],
                                                                        }],
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    },
                                                }],
                                            }],
                                        }],
                                    },
                                }],
                            },
                        },
                    })
                })
            }),
            "return value": ["interface", {
                "expression": {
                    "type": ["initialize", {
                        "type": ["reference", {
                            "strategy": ["procedure call6", {
                                "procedure call": {
                                    "type": ["local", {
                                        "procedure": "wrap",
                                    }],
                                    "procedure call": {
                                        "interface arguments": {
                                            "handler": {
                                                "expression": {
                                                    "type": ["initialize", {
                                                        "type": ["reference", {
                                                            "strategy": ["procedure call6", {
                                                                "procedure call": {
                                                                    "type": ["local", {
                                                                        "procedure": `${schema["root type"].reference.name}`,
                                                                    }],
                                                                    "procedure call": {
                                                                        "interface arguments": {
                                                                            "callback": {
                                                                                "expression": {
                                                                                    "type": ["argument", {
                                                                                        "argument": "callback",
                                                                                    }],
                                                                                },
                                                                            },
                                                                        },
                                                                    },
                                                                },
                                                            }],
                                                        }],
                                                    }],
                                                },
                                            },
                                        },
                                    },
                                },
                            }],
                        }],
                    }],
                },
            }],
        },
    }
}