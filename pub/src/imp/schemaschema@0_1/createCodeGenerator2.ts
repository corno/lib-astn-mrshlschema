// //import * as astn from "astn"
// import * as pl from "pareto-core-lib"

// import { createSchemaStreamProcesser } from "./createSchemaStreamProcessor"
// import * as ll from "pareto-lang-lib"
// import { generateCode2 } from "./generateCode"
// import { generateTypeScript } from "pareto-lang-lib"
// import { CreateStreamConsumer } from "../../../../CreateStreamConsumer"

// export type IStreamConsumer<D, E> = {
//     onData: (d: D) => void
//     onEnd: (e: E) => void
// }

// export const createCodeGenerator2: CreateStreamConsumer = (
//     write: (str: string) => void,
//     error: (str: string) => void,
// ): IStreamConsumer<string, null> => {

//     return createSchemaStreamProcesser(
//         {
//             onSchema: (schema) => {
//                 pl.logDebugMessage("generating code...")
//                 generateCode2(
//                     schema,
//                     ($) => {
//                         generateTypeScript(
//                             ll.createBuilder($),
//                             createFile(
//                                 "    ",
//                                 `\r\n`,
//                                 write,
//                             ),
//                         )
//                     }
//                 )
//             },
//         },
//         error,
//     )
// }
