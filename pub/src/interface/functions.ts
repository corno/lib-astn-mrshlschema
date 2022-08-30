import * as th from "astn-typedhandlers-api"
import { Schema } from "./types/types"
import * as pra from "pareto-resolve-lib"

export type ConvertToASTNSchema<Annotation> = (
    schema: Schema<Annotation>,
    x: pra.ResolveRegistry<Annotation>,
) => th.Schema