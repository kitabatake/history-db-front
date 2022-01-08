export interface Source {
    id: number,
    name: string
}

export interface Person {
    id: number,
    name: string,
    description: string
}

export interface PersonRelation {
    id: number,
    description: string,
    persons: Person[]
}

export interface Activity {
    id: number,
    description: string,
    persons: Person[]
    source?: Source
}