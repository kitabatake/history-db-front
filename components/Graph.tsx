import React, {useEffect, useState} from "react";
import {Elements} from "../lib/types/graph";
import {Elements as GraphqlElements, useGetGraphQuery} from "../src/generated/graphql";
import cytoscape, {Core} from "cytoscape";
import {Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/react";
import PersonModal from "./modal/PersonModal";

const renderGraph = (elementId: string, elements: Elements, targetNodeId: number): Core => {
    const style = [
        {
            selector: 'node[label = "Person"]',
            css: {
                'background-color': '#6FB1FC',
                content: 'data(name)',
                'font-size': '4rem',
                width: 3,
                height: 3,
                color: '#000000',
            },
        },
        {
            selector: 'node[label = "Activity"]',
            css: {
                'background-color': '#B56239',
                content: 'data(name)',
                'font-size': '4rem',
                width: 3,
                height: 3,
                color: '#000000',
            },
        },
        {
            selector: `node[id = "${targetNodeId}"]`,
            css: {
                'font-size': '6rem',
                width: 6,
                height: 6,
            },
        },
        {
            selector: 'edge',
            css: {
                content: 'data(relationship)',
                width: 0.2,
                'font-size': '3rem',
                'curve-style': 'bezier',
                'target-arrow-shape': 'triangle',
                'arrow-scale': 0.2,
                color: '#a5a5a5',
            },
        },
    ]

    const layout = {
        name: 'cose',
        componentSpacing: 1000,
    }

    const cy = cytoscape({
        container: document.getElementById(elementId),
        elements: elements,
        style: style,
        layout: layout,
    })

    return cy;
}

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
    const [selectedNodeId, setSelectedNodeId] = useState<number|null>(null);
    const {data} = useGetGraphQuery({
        variables: {
            targetNodeId: targetNodeId
        }
    })

    useEffect(() => {
        if (data != null) {
            const cy = renderGraph(ELEMENT_ID_FOR_GRAPH, adjustElements(data.graph), targetNodeId)
            cy.on('tap', 'node', function(evt){
                var node = evt.target;
                // console.log(node.data('label'));
                if (node.data('label') == 'Person') {
                    setSelectedNodeId(Number(node.id()));
                }
            });
        }
    }, [data])

    return (
        <Box position="relative" w="100%" h="100%">
            <Box id={ELEMENT_ID_FOR_GRAPH}  w="100%" h="100%" />
            <Modal
                size='sm'
                isOpen={selectedNodeId != null}
                onClose={() => setSelectedNodeId(null)}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>人物情報</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        {selectedNodeId && (
                            <PersonModal personId={selectedNodeId} />
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    )
}