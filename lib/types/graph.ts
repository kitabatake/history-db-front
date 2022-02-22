export type Node = {
    data: { id: string; name: string; label: string; }
}
export type Edge = {
    data: { source: string; target: string; relationship: string }
}

export type Elements = {
    nodes: Node[]
    edges: Edge[]
}