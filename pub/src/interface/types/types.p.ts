import * as pt from "pareto-core-types"

export type AnnotatedReference<T, Annotation> = {
    reference: pt.Reference<T>
    annotation: Annotation
}

export type RawObject<T> = { [key: string]: T }

export type CollectionType<PAnnotation> =
    | ["dictionary", Dictionary<PAnnotation>]
    | ["list", List]

export type Collection<PAnnotation> = {
    readonly "node": Node<PAnnotation>
    readonly "type": CollectionType<PAnnotation>
}

export type Component<PAnnotation> = {
    readonly "type": AnnotatedReference<ComponentType<PAnnotation>, Annotation>
}

export type ComponentType<PAnnotation> = {
    readonly "node": Node<PAnnotation>
}

export type Dictionary<PAnnotation> = {
    readonly "key property": AnnotatedReference<Property<PAnnotation>, Annotation>
}

export type List = {
}

export type Node<PAnnotation> = {
    readonly "properties": pt.Dictionary<Property<PAnnotation>>
}

export type Property<PAnnotation> = {
    readonly "type": PropertyType<PAnnotation>
}

export type PropertyType<PAnnotation> =
    | ["value", Value]
    | ["component", Component<PAnnotation>]
    | ["collection", Collection<PAnnotation>]
    | ["state group", StateGroup<PAnnotation>]

export type Schema<PAnnotation> = {
    readonly "component types": pt.Dictionary<ComponentType<PAnnotation>>
    readonly "root type": AnnotatedReference<ComponentType<PAnnotation>, Annotation>
}

export type State<PAnnotation> = {
    readonly "node": Node<PAnnotation>
}

export type StateGroup<PAnnotation> = {
    readonly "states": pt.Dictionary<State<PAnnotation>>
    readonly "default state": AnnotatedReference<State<PAnnotation>, Annotation>
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
