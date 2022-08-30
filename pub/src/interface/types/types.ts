import * as pt from "pareto-core-types"

export type AnnotatedReference<T, Annotation> = {
    reference: pt.Reference<T>
    annotation: Annotation
}

export type RawObject<T> = { [key: string]: T }

export type CollectionType<Annotation> =
    | ["dictionary", Dictionary<Annotation>]
    | ["list", List]

export type Collection<Annotation> = {
    readonly "node": Node<Annotation>
    readonly "type": CollectionType<Annotation>
}

export type Component<Annotation> = {
    readonly "type": AnnotatedReference<ComponentType<Annotation>, Annotation>
}

export type ComponentType<Annotation> = {
    readonly "node": Node<Annotation>
}

export type Dictionary<Annotation> = {
    readonly "key property": AnnotatedReference<Property<Annotation>, Annotation>
}

export type List = {
}

export type Node<Annotation> = {
    readonly "properties": pt.Dictionary<Property<Annotation>>
}

export type Property<Annotation> = {
    readonly "type": PropertyType<Annotation>
}

export type PropertyType<Annotation> =
    | ["value", Value]
    | ["component", Component<Annotation>]
    | ["collection", Collection<Annotation>]
    | ["state group", StateGroup<Annotation>]

export type Schema<Annotation> = {
    readonly "component types": pt.Dictionary<ComponentType<Annotation>>
    readonly "root type": AnnotatedReference<ComponentType<Annotation>, Annotation>
}

export type State<Annotation> = {
    readonly "node": Node<Annotation>
}

export type StateGroup<Annotation> = {
    readonly "states": pt.Dictionary<State<Annotation>>
    readonly "default state": AnnotatedReference<State<Annotation>, Annotation>
}

export type ValueType =
    | ["string", {
        //
    }]
    | ["number", {
        //
    }]
    | ["boolean", {
        //
    }]

export type Value = {
    readonly "type": ValueType
    readonly "default value": string
}
