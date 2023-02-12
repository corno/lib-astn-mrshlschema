// /* eslint
//     "max-len": "off",
// */
// import * as api from "../../interface"
// import * as pl from 'pareto-core-lib'

// function generateIdentifier(str: string) {
//     return str.replace(/ /g, "_").replace(/\-/g, "_")
// }

// function generateHandlerFunctionName(str: string) {
//     return `_generateHandler_${generateIdentifier(str)}`
// }

// function generateBuilderFunctionName(str: string) {
//     return `_generateBuilder_${generateIdentifier(str)}`
// }


// export type PropertyX = {
//     //
// }

// export type ObjectX = {
//     properties: { [key: string]: PropertyX } | ((
//         //
//     ) => void)
// }

// export interface ILine {
//     snippet: (str: string) => void
//     tempBlock: (
//         callback: ($w: ITempBlock) => void,
//     ) => void
//     // object: (
//     //     object: ObjectX,
//     // ) => void
//     nestedBlock: (
//         callback: ($w: IBlock) => void,
//     ) => void
// }

// export interface IBlock {
//     variable: (
//         // modification: "const" | "let",
//         // name: string,
//         callback: ($w: ILine) => void
//     ) => void
//     statement: (
//         callback: ($w: ILine) => void
//     ) => void
// }

// export interface ITempBlock {
//     line: (callback: ($w: ILine) => void) => void
//     fullLine: (str: string) => void
//     func: (
//         str: string,
//         body: ($w: ITempBlock) => void,
//     ) => void
//     parameters: (
//         callback: ($w: ITempBlock) => void,
//     ) => void
//     statementsBlock: (
//         callback: ($w: ITempBlock) => void,
//     ) => void
//     objectDef: (
//         callback: ($w: ITempBlock) => void,
//     ) => void
//     objectImp: (
//         callback: ($w: ITempBlock) => void,
//     ) => void
//     indent: (
//         callback: ($w: ITempBlock) => void,
//     ) => void
// }

// interface NodeIdentifierGenerator {
//     collection: (str: string) => NodeIdentifierGenerator
//     stateGroup: (str: string) => StateGroupIdentifierGenerator
//     generateNodeIdentifier: () => string
//     generateNodeBuilderIdentifier: () => string
// }

// interface StateGroupIdentifierGenerator {
//     state: (str: string) => NodeIdentifierGenerator
//     generateTaggedUnionIdentifier: () => string
// }

// function generateVariableIdentifier(str: string) {
//     return `_${generateIdentifier(str)}_v`
// }

// type Registry = {
//     known: { [key: string]: string }
//     usedIdentifiers: { [key: string]: string }
// }
// const stateGroupRegistry: Registry = {
//     known: {},
//     usedIdentifiers: {},
// }

// const nodeRegistry: Registry = {
//     known: {},
//     usedIdentifiers: {},
// }
// const nodeBuilderRegistry: Registry = {
//     known: {},
//     usedIdentifiers: {},
// }

// function getPathIdentifier(registry: Registry, path: string[]): string {
//     const asJSON = JSON.stringify(path, undefined, "\t")
//     if (registry.known[asJSON] === undefined) {
//         let varName = ""
//         for (let i = path.length - 1; i !== -1; i -= 1) {
//             varName += `_${path[i]}`
//             if (registry.usedIdentifiers[varName] === undefined) {
//                 registry.usedIdentifiers[varName] = asJSON
//                 break
//             }
//         }
//         registry.known[asJSON] = varName
//     }
//     return generateIdentifier(registry.known[asJSON])
// }

// function createIdentifierGenerator(componentTypeName: string): NodeIdentifierGenerator {

//     function createNode(path: string[]): NodeIdentifierGenerator {
//         return {
//             collection: (str) => {
//                 return createNode(path.concat([str]))
//             },
//             stateGroup: (sgStr) => {
//                 const path2 = concat(path, sgStr)
//                 return {
//                     state: (stateStr) => {
//                         return createNode(path2.concat([stateStr]))
//                     },
//                     generateTaggedUnionIdentifier: () => {
//                         if (path2.length === 0) {
//                             return "FIXME_NODE"
//                         } else {
//                             return `_${getPathIdentifier(stateGroupRegistry, path2)}_TU`
//                         }
//                     },
//                 }
//             },
//             generateNodeIdentifier: () => {
//                 return `_${getPathIdentifier(nodeRegistry, path)}_T`
//             },
//             generateNodeBuilderIdentifier: () => {
//                 if (path.length === 0) {
//                     return "FIXME_NODE"
//                 } else {
//                     //console.log()
//                     return `_${getPathIdentifier(nodeBuilderRegistry, path)}_B`
//                 }
//             },
//         }
//     }
//     return createNode([componentTypeName])
// }

// export function generateCode<PAnnotation>(
//     schema: api.Schema<PAnnotation>,
//     $w: ITempBlock,
// ): void {
//     $w.fullLine(`/*eslint`)
//     $w.indent(($w) => {
//         $w.fullLine(`"@typescript-eslint/no-unused-vars": 0,`)
//         $w.fullLine(`"camelcase": 0,`)
//         $w.fullLine(`"dot-notation": 0,`)
//         $w.fullLine(`"no-underscore-dangle": 0,`)
//         $w.fullLine(`"quote-props": 0,`)
//         $w.fullLine(`"max-len": 0`)
//     })
//     $w.fullLine(`*/`)

//     $w.fullLine(`import * as pr from "pareto-runtime"`)
//     $w.fullLine(`import * as astn from "astn"`)

//     $w.fullLine(`function assertUnreachable<RT>(_x: never): RT {`)
//     $w.statementsBlock(($w) => {
//         $w.fullLine(`throw new Error("unreachable")`)
//     })
//     $w.fullLine(`}`)
//     /*
//     interface ValueHandler<PAnnotation> {

//     }

//     interface RequiredValueHandler<PAnnotation> {
//         exists: ValueHandler<PAnnotation>
//         missing: () => void
//     }

//     interface IExpectContext<PAnnotation> {
//         expectList($: {
//             onElement: () => ValueHandler<PAnnotation>
//         }): ValueHandler<PAnnotation>
//         expectVerboseGroup($: {
//             properties: {
//                 [key: string]: {
//                     onNotExists: () => void
//                     onExists: () => RequiredValueHandler<PAnnotation>
//                 }
//             }
//             onEnd: () => void

//         }): ValueHandler<PAnnotation>
//         expectTaggedUnion($: {
//             options: {
//                 [key: string]: () => RequiredValueHandler<PAnnotation>
//             }
//         }): ValueHandler<PAnnotation>
//         expectDictionary($: {
//             onProperty: ($: {
//                 data: {
//                     keyString: {
//                         value: string
//                     }
//                 }
//             }) => RequiredValueHandler<PAnnotation>
//         }): ValueHandler<PAnnotation>
//         expectQuotedString($: {
//             warningOnly: boolean
//             callback: ($: {
//                 value: string
//             }) => astn.IValueHandler<PAnnotation>
//         }): astn.IValueHandler<PAnnotation>
//     }
//     */
//     $w.fullLine(``)

//     $w.fullLine(`interface IDictionary<T> {`)
//     $w.objectDef(($w) => {
//         $w.fullLine(`forEach(callback: (e: T, key: string) => void): void`)
//     })
//     $w.fullLine(`}`)
//     $w.fullLine(``)


//     $w.fullLine(`interface IArray<T> {`)
//     $w.objectDef(($w) => {
//         $w.fullLine(`forEach(callback: (e: T) => void): void`)
//     })
//     $w.fullLine(`}`)
//     $w.fullLine(``)

//     $w.fullLine(`function createDictionary<T>(raw: { [key: string]: T }): IDictionary<T> {`)
//     $w.statementsBlock(($w) => {
//         $w.fullLine(`return {`)
//         $w.objectImp(($w) => {
//             $w.fullLine(`forEach: (callback: (e: T, key: string) => void) => { pr.Objectkeys(raw).sort().forEach(() => false, (key) => { callback(raw[key], key) }) },`)
//         })
//         $w.fullLine(`}`)
//     })
//     $w.fullLine(`}`)
//     $w.fullLine(``)


//     schema["component types"].forEach(() => false, ($, key) => {
//         function generateNodeTypes(
//             node: api.Node<PAnnotation>,
//             keyProperty: api.Property<PAnnotation> | null,
//             ig: NodeIdentifierGenerator,
//         ) {
//             //first generate for all nested nodes
//             node.properties.forEach(() => false, ($, key) => {
//                 if ($ === keyProperty) {
//                     return
//                 }

//                 switch ($.type[0]) {
//                     case "collection":
//                         const newPath = ig.collection(key)

//                         pl.cc($.type[1], ($) => {
//                             const node = $.node
//                             switch ($.type[0]) {
//                                 case "dictionary":
//                                     pl.cc($.type[1], ($) => {
//                                         generateNodeTypes(node, $["key property"].reference.get(), newPath)
//                                     })
//                                     break
//                                 case "list":
//                                     pl.cc($.type[1], (_$) => {
//                                         generateNodeTypes(node, null, newPath)
//                                     })
//                                     break
//                                 default:
//                                     pl.au($.type[0])
//                             }

//                         })
//                         break
//                     case "component":
//                         break
//                     case "state group":
//                         pl.cc($.type[1], ($) => {
//                             const newPath = ig.stateGroup(key)

//                             $.states.forEach(() => false, ($, key) => {
//                                 generateNodeTypes($.node, null, newPath.state(key))
//                             })
//                             //generate the tagged union type
//                             $w.fullLine(`export type ${newPath.generateTaggedUnionIdentifier()} =`)
//                             $w.indent(($w) => {
//                                 const newPath = ig.stateGroup(key)
//                                 $.states.forEach(() => false, (_$, key) => {

//                                     $w.fullLine(`| ["${key}", ${newPath.state(key).generateNodeIdentifier()}]`)
//                                 })
//                             })
//                             $w.fullLine(``)
//                         })

//                         break
//                     case "value":
//                         break
//                     default:
//                         pl.au($.type[0])
//                 }
//             })
//             //generate the type
//             $w.fullLine(`export type ${ig.generateNodeIdentifier()} = {`)
//             $w.objectDef(($w) => {
//                 node.properties.forEach(() => false, ($, key) => {
//                     if ($ === keyProperty) {
//                         return
//                     }

//                     $w.line(($w) => {
//                         $w.snippet(`readonly "${key}": `)
//                         switch ($.type[0]) {
//                             case "collection":
//                                 pl.cc($.type[1], ($) => {
//                                     const propertyPath = ig.collection(key)
//                                     switch ($.type[0]) {
//                                         case "dictionary":
//                                             $w.snippet(`IDictionary<${propertyPath.generateNodeIdentifier()}>`)
//                                             break
//                                         case "list":
//                                             $w.snippet(`IArray<${propertyPath.generateNodeIdentifier()}>`)
//                                             break
//                                         default:
//                                             pl.au($.type[0])
//                                     }
//                                 })
//                                 break
//                             case "component":
//                                 pl.cc($.type[1], ($) => {
//                                     $w.snippet(`${createIdentifierGenerator($.type.reference.name).generateNodeIdentifier()}`)
//                                 })
//                                 break
//                             case "state group":
//                                 const propertyPath = ig.stateGroup(key)
//                                 $w.snippet(`${propertyPath.generateTaggedUnionIdentifier()}`)
//                                 break
//                             case "value":
//                                 $w.snippet(`string`)
//                                 break
//                             default:
//                                 pl.au($.type[0])
//                         }
//                     })
//                 })

//             })
//             $w.fullLine(`}`)
//             $w.fullLine(``)
//         }
//         generateNodeTypes($.node, null, createIdentifierGenerator(key))
//     })
//     schema["component types"].forEach(() => false, ($, key) => {
//         function generateNodeBuilderTypes(
//             node: api.Node<PAnnotation>,
//             keyProperty: api.Property<PAnnotation> | null,
//             ig: NodeIdentifierGenerator,
//         ) {
//             //first generate for all nested nodes
//             node.properties.forEach(() => false, ($, key) => {
//                 if ($ === keyProperty) {
//                     return
//                 }

//                 switch ($.type[0]) {
//                     case "collection":
//                         const newPath = ig.collection(key)

//                         pl.cc($.type[1], ($) => {
//                             const node = $.node
//                             switch ($.type[0]) {
//                                 case "dictionary":
//                                     pl.cc($.type[1], ($) => {
//                                         generateNodeBuilderTypes(node, $["key property"].reference.get(), newPath)
//                                     })
//                                     break
//                                 case "list":
//                                     pl.cc($.type[1], (_$) => {
//                                         generateNodeBuilderTypes(node, null, newPath)
//                                     })
//                                     break
//                                 default:
//                                     pl.au($.type[0])
//                             }

//                         })
//                         break
//                     case "component":
//                         break
//                     case "state group":
//                         pl.cc($.type[1], ($) => {
//                             const newPath = ig.stateGroup(key)

//                             $.states.forEach(() => false, ($, key) => {
//                                 generateNodeBuilderTypes($.node, null, newPath.state(key))
//                             })
//                             //generate the tagged union type
//                             $w.fullLine(`export type ${newPath.generateTaggedUnionIdentifier()}_Builder =`)
//                             $w.indent(($w) => {
//                                 const newPath = ig.stateGroup(key)
//                                 $.states.forEach(() => false, (_$, key) => {

//                                     $w.fullLine(`| ["${key}", ${newPath.state(key).generateNodeBuilderIdentifier()}]`)
//                                 })
//                             })
//                             $w.fullLine(``)
//                         })

//                         break
//                     case "value":
//                         break
//                     default:
//                         pl.au($.type[0])
//                 }
//             })
//             //generate the type
//             $w.fullLine(`export type ${ig.generateNodeBuilderIdentifier()} = {`)
//             $w.objectDef(($w) => {
//                 node.properties.forEach(() => false, ($, key) => {
//                     if ($ === keyProperty) {
//                         return
//                     }

//                     $w.line(($w) => {
//                         $w.snippet(`readonly "${key}" ?: `)
//                         switch ($.type[0]) {
//                             case "collection":
//                                 pl.cc($.type[1], ($) => {
//                                     const propertyPath = ig.collection(key)
//                                     switch ($.type[0]) {
//                                         case "dictionary":
//                                             $w.snippet(`{ [key:string]: ${propertyPath.generateNodeBuilderIdentifier()} } //| (add: (key: string, entry: ${propertyPath.generateNodeBuilderIdentifier()} ) => void )`)
//                                             break
//                                         case "list":
//                                             $w.snippet(`${propertyPath.generateNodeBuilderIdentifier()}[] //| { callback: (value: ${propertyPath.generateNodeBuilderIdentifier()} ) => void }`)
//                                             break
//                                         default:
//                                             pl.au($.type[0])
//                                     }
//                                 })
//                                 break
//                             case "component":
//                                 pl.cc($.type[1], ($) => {
//                                     $w.snippet(`${createIdentifierGenerator($.type.reference.name).generateNodeBuilderIdentifier()}`)
//                                 })
//                                 break
//                             case "state group":
//                                 const propertyPath = ig.stateGroup(key)
//                                 $w.snippet(`${propertyPath.generateTaggedUnionIdentifier()}_Builder`)
//                                 break
//                             case "value":
//                                 $w.snippet(`string`)
//                                 break
//                             default:
//                                 pl.au($.type[0])
//                         }
//                     })
//                 })

//             })
//             $w.fullLine(`}`)
//             $w.fullLine(``)
//         }
//         generateNodeBuilderTypes($.node, null, createIdentifierGenerator(key))
//     })

//     // schema["component types"].forEach(() => false, ($, key) => {
//     //     $w.fullLine(`function ${generateHandlerFunctionName(key)}(`)
//     //     $w.nestedBlockX($w => {
//     //         $w.fullLine(`callback: (out: ${createIdentifierGenerator(key).generateNodeIdentifier()}) => void,`)
//     //     })
//     //     $w.fullLine(`): Iastn.IValueHandler<PAnnotation> {`)
//     //     $w.nestedBlockX($w => {
//     //         $w.line($w => {
//     //             $w.snippet(`return `)
//     //             generateNodeCode($.node, null, $w, createIdentifierGenerator(key))
//     //             $w.snippet(`((node) => callback(node))`)
//     //         })
//     //     })
//     //     $w.fullLine(`}`)
//     //     $w.fullLine(``)
//     // })

//     $w.fullLine(`export function createDeserializer<PAnnotation>(`)
//     $w.parameters(($w) => {
//         $w.fullLine(`context: astn.IExpectContext<PAnnotation>,`)
//         $w.fullLine(`raiseValidationError: (message: string, annotation: Annotation) => void,`)
//         $w.fullLine(`callback: (result: ${createIdentifierGenerator(schema["root type"].reference.name).generateNodeIdentifier()}) => void,`)
//     })
//     $w.fullLine(`): astn.IRequiredValueHandler<PAnnotation> {`)
//     $w.statementsBlock(($w) => {
//         $w.fullLine(`function wrap(handler: astn.IValueHandler<PAnnotation>): astn.IRequiredValueHandler<PAnnotation> {`)
//         $w.statementsBlock(($w) => {
//             $w.fullLine(`return {`)
//             $w.objectImp(($w) => {
//                 $w.fullLine(`exists: handler,`)
//                 $w.fullLine(`missing: () => {`)
//                 $w.statementsBlock(($w) => {
//                     $w.fullLine(`//`)
//                 })
//                 $w.fullLine(`},`)
//             })
//             $w.fullLine(`}`)
//         })
//         $w.fullLine(`}`)

//         schema["component types"].forEach(() => false, ($, key) => {
//             $w.fullLine(`function ${generateHandlerFunctionName(key)}(`)
//             $w.parameters(($w) => {
//                 $w.fullLine(`callback: (out: ${createIdentifierGenerator(key).generateNodeIdentifier()}) => void,`)
//             })
//             $w.fullLine(`): astn.IValueHandler<PAnnotation> {`)
//             $w.statementsBlock(($w) => {
//                 $w.line(($w) => {
//                     function generateHandlerCodeForNode(
//                         node: api.Node<PAnnotation>,
//                         keyProperty: api.Property<PAnnotation> | null,
//                         $w: ILine,
//                         path: NodeIdentifierGenerator,
//                     ) {

//                         $w.snippet(`((callback: (out: ${path.generateNodeIdentifier()}) => void) => `)
//                         $w.nestedBlock(($w) => {
//                             node.properties.forEach(() => false, ($, key) => {
//                                 if ($ === keyProperty) {
//                                     return
//                                 }

//                                 switch ($.type[0]) {
//                                     case "collection":
//                                         pl.cc($.type[1], ($) => {
//                                             const newPath = path.collection(key)
//                                             switch ($.type[0]) {
//                                                 case "dictionary": {
//                                                     $w.variable(($w) => $w.snippet(`const ${generateVariableIdentifier(key)}: { [key: string]: ${newPath.generateNodeIdentifier()} } = {}`))
//                                                     break
//                                                 }
//                                                 case "list": {
//                                                     $w.variable(($w) => $w.snippet(`const ${generateVariableIdentifier(key)}: ${newPath.generateNodeIdentifier()}[] = []`))
//                                                     break
//                                                 }
//                                                 default:
//                                                     pl.au($.type[0])
//                                             }
//                                         })
//                                         break
//                                     case "component": {
//                                         //const $$ = $.type[1]
//                                         pl.cc($.type[1], ($) => {
//                                             $w.variable(($w) => $w.snippet(`let ${generateVariableIdentifier(key)}: ${createIdentifierGenerator($.type.reference.name).generateNodeIdentifier()} | null = null`))
//                                         })
//                                         break
//                                     }
//                                     case "state group": {
//                                         //const $$ = $.type[1]
//                                         pl.cc($.type[1], (_$) => {
//                                             const newPath = path.stateGroup(key)
//                                             $w.variable(($w) => $w.snippet(`let ${generateVariableIdentifier(key)}: ${newPath.generateTaggedUnionIdentifier()} | null = null`))
//                                         })
//                                         break
//                                     }
//                                     case "value": {
//                                         const $$ = $.type[1]
//                                         switch ($$.type[0]) {
//                                             case "boolean":
//                                                 pl.cc($$.type[1], (_$$) => {
//                                                     $w.variable(($w) => $w.snippet(`let ${generateVariableIdentifier(key)}: boolean | null = null`))
//                                                 })
//                                                 break
//                                             case "number":
//                                                 pl.cc($$.type[1], (_$$) => {
//                                                     $w.variable(($w) => $w.snippet(`let ${generateVariableIdentifier(key)}: number | null = null`))
//                                                 })
//                                                 break
//                                             case "string":
//                                                 pl.cc($$.type[1], (_$$) => {
//                                                     $w.variable(($w) => $w.snippet(`let ${generateVariableIdentifier(key)}: string | null = null`))
//                                                 })
//                                                 break
//                                             default:
//                                                 pl.au($$.type[0])
//                                         }
//                                         break
//                                     }
//                                     default:
//                                         pl.au($.type[0])
//                                 }
//                             })
//                             $w.statement(($w) => {
//                                 $w.snippet(`return context.expectVerboseGroup({`)
//                                 $w.tempBlock(($w) => {
//                                     $w.fullLine(`properties: {`)
//                                     $w.objectImp(($w) => {
//                                         node.properties.forEach(() => false, ($, key) => {
//                                             if ($ === keyProperty) {
//                                                 return
//                                             }

//                                             $w.fullLine(`"${key}": {`)
//                                             $w.objectImp(($w) => {

//                                                 switch ($.type[0]) {
//                                                     case "collection": {
//                                                         const $$ = $.type[1]
//                                                         const newPath = path.collection(key)
//                                                         const node = $$.node
//                                                         switch ($$.type[0]) {
//                                                             case "dictionary": {
//                                                                 // const $$$ = $$.type[1]
//                                                                 pl.cc($$.type[1], ($) => {
//                                                                     $w.fullLine(`onNotExists: () => { /**/ },`)
//                                                                     $w.line(($w) => {
//                                                                         $w.snippet(`onExists: () => wrap(context.expectDictionary({`)
//                                                                         $w.tempBlock(($w) => {
//                                                                             $w.fullLine(`onProperty: (propertyData) => {`)
//                                                                             $w.statementsBlock(($w) => {
//                                                                                 $w.line(($w) => {
//                                                                                     $w.snippet(`return wrap(`)
//                                                                                     generateHandlerCodeForNode(node, $["key property"].reference.get(), $w, newPath)
//                                                                                     $w.snippet(`((node) => ${generateVariableIdentifier(key)}[propertyData.token.data.value] = node)`)
//                                                                                     $w.snippet(`)`)
//                                                                                 })

//                                                                             })
//                                                                             $w.fullLine(`},`)
//                                                                         })
//                                                                         $w.snippet(`})),`)
//                                                                     })

//                                                                 })
//                                                                 break
//                                                             }
//                                                             case "list": {
//                                                                 $w.fullLine(`onNotExists: () => { /**/ },`)
//                                                                 $w.line(($w) => {
//                                                                     $w.snippet(`onExists: () => wrap(context.expectList({`)
//                                                                     $w.tempBlock(($w) => {
//                                                                         $w.fullLine(`onElement: () => {`)
//                                                                         $w.statementsBlock(($w) => {
//                                                                             $w.line(($w) => {
//                                                                                 $w.snippet(`return `)
//                                                                                 generateHandlerCodeForNode(node, null, $w, newPath)
//                                                                                 $w.snippet(`((node) => ${generateVariableIdentifier(key)}.push(node))`)
//                                                                             })

//                                                                         })
//                                                                         $w.fullLine(`},`)
//                                                                     })
//                                                                     $w.snippet(`})),`)
//                                                                 })
//                                                                 break
//                                                             }
//                                                             default:
//                                                                 pl.au($$.type[0])
//                                                         }
//                                                         break
//                                                     }
//                                                     case "component": {
//                                                         const $$ = $.type[1]
//                                                         $w.fullLine(`onNotExists: () => { /**/ },`)
//                                                         $w.line(($w) => {
//                                                             $w.snippet(`onExists: () => wrap(${generateHandlerFunctionName($$.type.reference.name)}(`)
//                                                             $w.tempBlock(($w) => {
//                                                                 $w.fullLine(`(node) => ${generateVariableIdentifier(key)} = node`)
//                                                             })
//                                                             $w.snippet(`)),`)
//                                                         })
//                                                         // $$.type
//                                                         break
//                                                     }
//                                                     case "state group": {
//                                                         const $$ = $.type[1]
//                                                         const propertyVariable = generateVariableIdentifier(key)
//                                                         const newPath = path.stateGroup(key)
//                                                         $w.fullLine(`onNotExists: () => { /**/ },`)
//                                                         $w.line(($w) => {
//                                                             $w.snippet(`onExists: () => wrap(context.expectTaggedUnion({`)
//                                                             $w.tempBlock(($w) => {
//                                                                 $w.fullLine(`options: {`)
//                                                                 $w.objectImp(($w) => {
//                                                                     $$.states.forEach(() => false, (state, key) => {
//                                                                         $w.fullLine(`"${key}": () => {`)
//                                                                         $w.statementsBlock(($w) => {
//                                                                             $w.line(($w) => {
//                                                                                 $w.snippet(`return wrap(`)
//                                                                                 generateHandlerCodeForNode(state.node, null, $w, newPath.state(key))
//                                                                                 $w.snippet(`((node) => ${propertyVariable} = ["${key}", node])`)
//                                                                                 $w.snippet(`)`)
//                                                                             })
//                                                                         })
//                                                                         $w.fullLine(`},`)
//                                                                     })
//                                                                 })
//                                                                 $w.fullLine(`},`)
//                                                             })
//                                                             $w.snippet(`})),`)
//                                                         })
//                                                         break
//                                                     }
//                                                     case "value": {
//                                                         const $$ = $.type[1]
//                                                         $w.fullLine(`onNotExists: () => { /**/ },`)
//                                                         $w.line(($w) => {
//                                                             switch ($$.type[0]) {
//                                                                 case "boolean": {
//                                                                     break
//                                                                 }
//                                                                 case "number": {
//                                                                     break
//                                                                 }
//                                                                 case "string": {
//                                                                     $w.snippet(`onExists: () => wrap(context.expectQuotedString({`)
//                                                                     $w.tempBlock(($w) => {
//                                                                         $w.fullLine(`warningOnly: true,`)
//                                                                         $w.fullLine(`callback: ($) => {`)
//                                                                         $w.statementsBlock(($w) => {
//                                                                             $w.fullLine(`${generateVariableIdentifier(key)} = $.token.data.value`)
//                                                                         })
//                                                                         $w.fullLine(`},`)
//                                                                     })
//                                                                     $w.snippet(`})),`)
//                                                                     break
//                                                                 }
//                                                                 default:
//                                                                     pl.au($$.type[0])
//                                                             }
//                                                         })
//                                                         break
//                                                     }
//                                                     default:
//                                                         pl.au($.type[0])
//                                                 }
//                                             })
//                                             $w.fullLine(`},`)
//                                         })
//                                     })
//                                     $w.fullLine(`},`)
//                                     $w.fullLine(`onEnd: () => {`)
//                                     $w.statementsBlock(($w) => {
//                                         function createDefaultInitializer($: api.Node<PAnnotation>, $w: ILine) {
//                                             $w.snippet(`{`)
//                                             $w.tempBlock(($w) => {
//                                                 $.properties.forEach(() => false, ($, key) => {
//                                                     $w.line(($w) => {
//                                                         $w.snippet(`"${key}": `)
//                                                         switch ($.type[0]) {
//                                                             case "collection":
//                                                                 pl.cc($.type[1], ($) => {
//                                                                     switch ($.type[0]) {
//                                                                         case "dictionary":
//                                                                             $w.snippet(`createDictionary({})`)
//                                                                             break
//                                                                         case "list":
//                                                                             $w.snippet(`[]`)
//                                                                             break
//                                                                         default:
//                                                                             pl.au($.type[0])
//                                                                     }
//                                                                 })
//                                                                 break
//                                                             case "component":
//                                                                 pl.cc($.type[1], ($) => {
//                                                                     createDefaultInitializer($.type.reference.get().node, $w)
//                                                                 })
//                                                                 break
//                                                             case "state group":
//                                                                 pl.cc($.type[1], ($) => {
//                                                                     $w.snippet(`[ "${$["default state"].reference.name}", `)
//                                                                     createDefaultInitializer($["default state"].reference.get().node, $w)
//                                                                     $w.snippet(` ]`)
//                                                                 })
//                                                                 break
//                                                             case "value":
//                                                                 pl.cc($.type[1], ($) => {
//                                                                     $w.snippet(`"${$["default value"]}"`)
//                                                                 })
//                                                                 break
//                                                             default:
//                                                                 pl.au($.type[0])
//                                                         }
//                                                         $w.snippet(`,`)
//                                                     })
//                                                 })

//                                             })
//                                             $w.snippet(`}`)
//                                         }
//                                         node.properties.forEach(() => false, ($, key) => {
//                                             if ($ === keyProperty) {
//                                                 return
//                                             }

//                                             switch ($.type[0]) {
//                                                 case "collection":
//                                                     break
//                                                 case "component":
//                                                     pl.cc($.type[1], ($) => {
//                                                         $w.fullLine(`if (${generateVariableIdentifier(key)} === null) {`)
//                                                         $w.statementsBlock(($w) => {
//                                                             $w.line(($w) => {
//                                                                 $w.snippet(`${generateVariableIdentifier(key)} = `)
//                                                                 createDefaultInitializer($.type.reference.get().node, $w)
//                                                             })
//                                                         })
//                                                         $w.fullLine(`}`)
//                                                     })
//                                                     break
//                                                 case "state group":
//                                                     pl.cc($.type[1], ($) => {
//                                                         $w.fullLine(`if (${generateVariableIdentifier(key)} === null) {`)
//                                                         $w.statementsBlock(($w) => {
//                                                             $w.line(($w) => {
//                                                                 $w.snippet(`${generateVariableIdentifier(key)} = ["${$["default state"].reference.name}", `)
//                                                                 createDefaultInitializer($["default state"].reference.get().node, $w)
//                                                                 $w.snippet(`]`)
//                                                             })
//                                                         })
//                                                         $w.fullLine(`}`)
//                                                     })
//                                                     break
//                                                 case "value":
//                                                     pl.cc($.type[1], ($) => {
//                                                         $w.fullLine(`if (${generateVariableIdentifier(key)} === null) {`)
//                                                         $w.statementsBlock(($w) => {
//                                                             $w.fullLine(`${generateVariableIdentifier(key)} = "${$["default value"]}"`)
//                                                         })
//                                                         $w.fullLine(`}`)
//                                                     })
//                                                     break
//                                                 default:
//                                                     pl.au($.type[0])
//                                             }
//                                         })
//                                         $w.fullLine(`callback({`)
//                                         $w.objectImp(($w) => {
//                                             node.properties.forEach(() => false, ($, key) => {
//                                                 if ($ === keyProperty) {
//                                                     return
//                                                 }

//                                                 switch ($.type[0]) {
//                                                     case "collection":
//                                                         pl.cc($.type[1], ($) => {
//                                                             switch ($.type[0]) {
//                                                                 case "dictionary":
//                                                                     $w.fullLine(`"${key}": createDictionary(${generateVariableIdentifier(key)}),`)
//                                                                     break
//                                                                 case "list":
//                                                                     $w.fullLine(`"${key}": ${generateVariableIdentifier(key)},`)
//                                                                     break
//                                                                 default:
//                                                                     pl.au($.type[0])
//                                                             }
//                                                         })
//                                                         break
//                                                     case "component":
//                                                         $w.fullLine(`"${key}": ${generateVariableIdentifier(key)},`)
//                                                         break
//                                                     case "state group":
//                                                         $w.fullLine(`"${key}": ${generateVariableIdentifier(key)},`)
//                                                         break
//                                                     case "value":
//                                                         $w.fullLine(`"${key}": ${generateVariableIdentifier(key)},`)
//                                                         break
//                                                     default:
//                                                         pl.au($.type[0])
//                                                 }
//                                             })
//                                         })
//                                         $w.fullLine(`})`)
//                                     })
//                                     $w.fullLine(`},`)
//                                 })
//                                 $w.snippet(`})`)
//                             })
//                         })
//                         $w.snippet(`)`)
//                     }
//                     $w.snippet(`return `)
//                     generateHandlerCodeForNode($.node, null, $w, createIdentifierGenerator(key))
//                     $w.snippet(`((node) => callback(node))`)
//                 })
//             })
//             $w.fullLine(`}`)
//             $w.fullLine(``)
//         })

//         $w.fullLine(`return wrap(${generateHandlerFunctionName(schema["root type"].reference.name)}(callback))`)
//     })
//     $w.fullLine(`}`)
//     $w.fullLine(``)
//     $w.fullLine(`export function createBuilder<PAnnotation>(`)
//     $w.parameters(($w) => {
//         $w.fullLine(`intermediate: ${createIdentifierGenerator(schema["root type"].reference.name).generateNodeBuilderIdentifier()},`)
//     })
//     $w.fullLine(`): ${createIdentifierGenerator(schema["root type"].reference.name).generateNodeIdentifier()} {`)
//     $w.statementsBlock(($w) => {
//         schema["component types"].forEach(() => false, ($, key) => {
//             function generateDefaultInitializationCodeForNode(
//                 node: api.Node<PAnnotation>,
//                 keyProperty: api.Property<PAnnotation> | null,
//                 $w: ILine,
//             ) {

//                 $w.snippet(`{`)
//                 $w.tempBlock(($w) => {

//                     node.properties.forEach(() => false, ($, key) => {
//                         if ($ === keyProperty) {
//                             return
//                         }
//                         $w.line(($w) => {
//                             $w.snippet(`"${key}": `)
//                             switch ($.type[0]) {
//                                 case "collection": {
//                                     const $$ = $.type[1]
//                                     // const newPath = path.collection(key)
//                                     // const node = $$.node
//                                     switch ($$.type[0]) {
//                                         case "dictionary": {
//                                             // const $$$ = $$.type[1]
//                                             $w.snippet(`createDictionary({})`)
//                                             break
//                                         }
//                                         case "list": {
//                                             $w.snippet(`[]`)
//                                             break
//                                         }
//                                         default:
//                                             pl.au($$.type[0])
//                                     }
//                                     break
//                                 }
//                                 case "component": {
//                                     const $$ = $.type[1]
//                                     $w.snippet(`_default${generateBuilderFunctionName($$.type.reference.name)}()`)
//                                     break
//                                 }
//                                 case "state group": {
//                                     const $$ = $.type[1]

//                                     $w.snippet(`[ "${$$["default state"].reference.name}", `)
//                                     generateDefaultInitializationCodeForNode(
//                                         $$["default state"].reference.get().node,
//                                         null,
//                                         $w,
//                                     )
//                                     $w.snippet(` ]`)
//                                     break
//                                 }
//                                 case "value": {
//                                     const $$ = $.type[1]
//                                     $w.snippet(`"${$$["default value"]}"`)
//                                     break
//                                 }
//                                 default:
//                                     pl.au($.type[0])
//                             }
//                             $w.snippet(`,`)

//                         })
//                     })
//                 })
//                 $w.snippet(`}`)
//             }
//             $w.fullLine(`function ${generateBuilderFunctionName(key)}(`)
//             $w.parameters(($w) => {
//                 $w.fullLine(`intermediate: ${createIdentifierGenerator(key).generateNodeBuilderIdentifier()},`)
//             })
//             $w.fullLine(`): ${createIdentifierGenerator(key).generateNodeIdentifier()} {`)
//             $w.statementsBlock(($w) => {
//                 $w.line(($w) => {
//                     function generateBuilderCodeForNode(
//                         node: api.Node<PAnnotation>,
//                         keyProperty: api.Property<PAnnotation> | null,
//                         $w: ILine,
//                         context: string,
//                         path: NodeIdentifierGenerator,
//                     ) {

//                         $w.snippet(`{`)
//                         $w.tempBlock(($w) => {

//                             node.properties.forEach(() => false, ($, key) => {
//                                 if ($ === keyProperty) {
//                                     return
//                                 }
//                                 $w.line(($w) => {
//                                     $w.snippet(`"${key}": `)
//                                     function notExistsHandler(
//                                         $w: ILine,
//                                         exists: ($w: ILine) => void,
//                                         notExists: ($w: ILine) => void,
//                                     ) {
//                                         $w.snippet(`${context}["${key}"] === undefined ? `)
//                                         notExists($w)
//                                         $w.snippet(` : `)
//                                         exists($w)
//                                     }
//                                     switch ($.type[0]) {
//                                         case "collection": {
//                                             const $$ = $.type[1]
//                                             // const newPath = path.collection(key)
//                                             // const node = $$.node
//                                             switch ($$.type[0]) {
//                                                 case "dictionary": {
//                                                     // const $$$ = $$.type[1]
//                                                     pl.cc($$.type[1], (_$) => {
//                                                         notExistsHandler(
//                                                             $w,
//                                                             ($w) => {
//                                                                 $w.snippet(`((): IDictionary<${path.collection(key).generateNodeIdentifier()}> => {`)
//                                                                 $w.nestedBlock(($w) => {
//                                                                     $w.variable(($w) => {
//                                                                         $w.snippet(`const source = ${context}["${key}"]`)
//                                                                     })
//                                                                     $w.variable(($w) => {
//                                                                         $w.snippet(`const target: { [key:string]: ${path.collection(key).generateNodeIdentifier()}} = {}`)
//                                                                     })
//                                                                     $w.statement(($w) => {
//                                                                         $w.snippet(`pr.Objectkeys(source).forEach(() => false, (key) => {`)
//                                                                         $w.tempBlock(($w) => {
//                                                                             $w.fullLine(`const entry = source[key]`)
//                                                                             $w.line(($w) => {
//                                                                                 $w.snippet(`target[key] = `)
//                                                                                 generateBuilderCodeForNode(
//                                                                                     $$.node,
//                                                                                     _$["key property"].reference.get(),
//                                                                                     $w,
//                                                                                     `entry`,
//                                                                                     path.collection(key),
//                                                                                 )
//                                                                             })
//                                                                         })
//                                                                         $w.snippet(`})`)
//                                                                     })
//                                                                     $w.statement((($w) => $w.snippet(`return createDictionary(target)`)))
//                                                                 })
//                                                                 $w.snippet(`})()`)
//                                                             },
//                                                             ($w) => {
//                                                                 $w.snippet(`createDictionary({})`)
//                                                             },
//                                                         )

//                                                     })
//                                                     break
//                                                 }
//                                                 case "list": {

//                                                     notExistsHandler(
//                                                         $w,
//                                                         ($w) => {
//                                                             $w.snippet(`((): ${path.collection(key).generateNodeIdentifier()}[] => {`)
//                                                             $w.nestedBlock(($w) => {
//                                                                 $w.variable(($w) => {
//                                                                     $w.snippet(`const source = ${context}["${key}"]`)
//                                                                 })
//                                                                 $w.variable(($w) => {
//                                                                     $w.snippet(`const target: ${path.collection(key).generateNodeIdentifier()}[] = []`)
//                                                                 })
//                                                                 $w.statement(($w) => {
//                                                                     $w.snippet(`source.forEach(() => false, (entry) => {`)
//                                                                     $w.tempBlock(($w) => {
//                                                                         $w.line(($w) => {
//                                                                             $w.snippet(`target.push(`)
//                                                                             generateBuilderCodeForNode(
//                                                                                 $$.node,
//                                                                                 null,
//                                                                                 $w,
//                                                                                 `entry`,
//                                                                                 path.collection(key),
//                                                                             )
//                                                                             $w.snippet(`)`)
//                                                                         })
//                                                                     })
//                                                                     $w.snippet(`})`)
//                                                                 })
//                                                                 $w.statement((($w) => $w.snippet(`return target`)))
//                                                             })
//                                                             $w.snippet(`})()`)
//                                                         },
//                                                         ($w) => {
//                                                             $w.snippet(`[]`)
//                                                         },
//                                                     )

//                                                     break
//                                                 }
//                                                 default:
//                                                     pl.au($$.type[0])
//                                             }
//                                             break
//                                         }
//                                         case "component": {
//                                             const $$ = $.type[1]
//                                             notExistsHandler(
//                                                 $w,
//                                                 ($w) => {
//                                                     $w.snippet(`${generateBuilderFunctionName($$.type.reference.name)}(`)
//                                                     $w.snippet(`${context}["${key}"]`)
//                                                     $w.snippet(`)`)
//                                                 },
//                                                 ($w) => {
//                                                     $w.snippet(`_default${generateBuilderFunctionName($$.type.reference.name)}()`)
//                                                 },
//                                             )
//                                             break
//                                         }
//                                         case "state group": {
//                                             const $$ = $.type[1]
//                                             const newPath = path.stateGroup(key)

//                                             notExistsHandler(
//                                                 $w,
//                                                 ($w) => {
//                                                     $w.snippet(`((): ${path.stateGroup(key).generateTaggedUnionIdentifier()} => {`)
//                                                     $w.tempBlock(($w) => {
//                                                         $w.fullLine(`switch (${context}["${key}"][0]) {`)
//                                                         $w.indent(($w) => {
//                                                             $$.states.forEach(() => false, (s, k) => {
//                                                                 $w.fullLine(`case "${k}": `)
//                                                                 $w.statementsBlock(($w) => {
//                                                                     $w.line(($w) => {
//                                                                         $w.snippet(`return [ "${k}", `)
//                                                                         generateBuilderCodeForNode(
//                                                                             s.node,
//                                                                             null,
//                                                                             $w,
//                                                                             `${context}["${key}"][1]`,
//                                                                             newPath.state(k),
//                                                                         )
//                                                                         $w.snippet(` ]`)
//                                                                     })
//                                                                 })
//                                                             })
//                                                             $w.fullLine(`default: return pl.au(${context}["${key}"][0])`)
//                                                         })
//                                                         $w.fullLine(`}`)
//                                                     })
//                                                     $w.snippet(`})()`)
//                                                 },
//                                                 ($w) => {
//                                                     $w.snippet(`[ "${$$["default state"].reference.name}", `)
//                                                     generateDefaultInitializationCodeForNode(
//                                                         $$["default state"].reference.get().node,
//                                                         null,
//                                                         $w,
//                                                     )
//                                                     $w.snippet(` ]`)
//                                                 },
//                                             )
//                                             break
//                                         }
//                                         case "value": {
//                                             const $$ = $.type[1]

//                                             notExistsHandler(
//                                                 $w,
//                                                 ($w) => {
//                                                     $w.snippet(`${context}["${key}"]`)
//                                                 },
//                                                 ($w) => {
//                                                     $w.snippet(`"${$$["default value"]}"`)
//                                                 },
//                                             )
//                                             break
//                                         }
//                                         default:
//                                             pl.au($.type[0])
//                                     }
//                                     $w.snippet(`,`)

//                                 })
//                             })
//                         })
//                         $w.snippet(`}`)
//                     }
//                     $w.snippet(`return `)
//                     generateBuilderCodeForNode($.node, null, $w, "intermediate", createIdentifierGenerator(key))
//                 })
//             })
//             $w.fullLine(`}`)
//             $w.fullLine(``)
//             $w.fullLine(`function _default${generateBuilderFunctionName(key)}(`)
//             // $w.parameters(($w) => {
//             // })
//             $w.fullLine(`): ${createIdentifierGenerator(key).generateNodeIdentifier()} {`)
//             $w.statementsBlock(($w) => {
//                 $w.line(($w) => {
//                     $w.snippet(`return `)
//                     generateDefaultInitializationCodeForNode($.node, null, $w)
//                 })
//             })
//             $w.fullLine(`}`)
//             $w.fullLine(``)
//         })

//         $w.fullLine(`return ${generateBuilderFunctionName(schema["root type"].reference.name)}(intermediate)`)
//     })
//     $w.fullLine(`}`)
// }