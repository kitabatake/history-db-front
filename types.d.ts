export interface Source {
    id: number,
    name: string
}

export interface Person {
    id: number,
    name: string
}

export interface PersonRelation {
    id: number,
    description: string,
    persons: Person[]
}