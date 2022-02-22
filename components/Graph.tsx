import React, {useEffect} from "react";
import {Elements} from "../lib/types/graph";
import {renderGraph} from "../lib/renderGraph";
import {Elements as GraphqlElements, useGetGraphQuery} from "../src/generated/graphql";

type Props = {
    targetNodeId: number
}

const adjustElements = (elements: GraphqlElements): Elements => {
    return {
        nodes: elements.nodes.map((node) => {
            return {
                data: {
                    ...node,
                    id: node.id.toString()
                }
            }
        }),
        edges: elements.edges.map((edge) => {
            return {
                data: {
                    ...edge,
                    source: edge.source.toString(),
                    target: edge.target.toString()
                }
            }
        })
    }
}

export default function Graph({targetNodeId}: Props) {
    const ELEMENT_ID_FOR_GRAPH = 'graph'
    const {data} = useGetGraphQuery({
        variables: {
            targetNodeId: targetNodeId
        }
    })

    useEffect(() => {
        if (data != null) {
            renderGraph(ELEMENT_ID_FOR_GRAPH, adjustElements(data.graph))
        }
    }, [data])

    const cyStyle = {
        height: '100%',
        width: '100%',
    }

    return <div id={ELEMENT_ID_FOR_GRAPH} style={cyStyle}/>
}