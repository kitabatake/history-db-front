import React, {useEffect, useState} from "react";
import {Edge, Elements, Node} from "../lib/types/graph";
import {GetPersonForGraphQuery, useGetPersonForGraphQuery} from "../src/generated/graphql";
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

    return cytoscape({
        container: document.getElementById(elementId),
        elements: elements,
        style: style,
        layout: layout,
    })
}

type Props = {
    targetNodeId: number
}

const relatedPersonToNode = (relatedPerson: any): Node => {
    return {
        data: {
            id: relatedPerson.person.id.toString(),
            name: relatedPerson.person.name,
            label: 'Person',
        }
    }
}

const relatedPersonToEdge = (personId: number, relatedPerson: any): Edge => {
    return {
        data: {
            relationship: relatedPerson.label,
            source: relatedPerson.direction == 'OUTWARD' ? personId.toString() : relatedPerson.person.id.toString(),
            target: relatedPerson.direction == 'OUTWARD' ? relatedPerson.person.id.toString() : personId.toString(),
        }
    }
}

const relatedActivityToNode = (relatedActivity: any): Node => {
    return {
        data: {
            id: relatedActivity.activity.id.toString(),
            name: relatedActivity.activity.name,
            label: 'Activity',
        }
    }
}

const relatedActivityToEdge = (personId: number, relatedActivity: any): Edge => {
    return {
        data: {
            relationship: relatedActivity.label,
            source: relatedActivity.direction == 'OUTWARD' ? personId.toString() : relatedActivity.activity.id.toString(),
            target: relatedActivity.direction == 'OUTWARD' ? relatedActivity.activity.id.toString() : personId.toString(),
        }
    }
}

const adjustElements = (data: GetPersonForGraphQuery): Elements => {
    const nodes = [
        {
            data: {
                id: data.person.id.toString(),
                name: data.person.name,
                label: 'Person'
            }
        }
    ];
    const edges: Edge[] = [];
    const addedEdges = new Map<number, boolean>();
    data.person.relatedPersons.forEach(relatedPerson => {
        if (addedEdges.has(relatedPerson.id)) return;
        addedEdges.set(relatedPerson.id, true);
        nodes.push(relatedPersonToNode(relatedPerson));
        edges.push(relatedPersonToEdge(data.person.id, relatedPerson))
        relatedPerson.person.relatedPersons.forEach(relatedPerson2 => {
            if (addedEdges.has(relatedPerson2.id)) return;
            addedEdges.set(relatedPerson2.id, true);
            nodes.push(relatedPersonToNode(relatedPerson2));
            edges.push(relatedPersonToEdge(relatedPerson.person.id, relatedPerson2))
        });
    })

    data.person.relatedActivities.forEach(relatedActivity => {
        if (addedEdges.has(relatedActivity.id)) return;
        addedEdges.set(relatedActivity.id, true);
        nodes.push(relatedActivityToNode(relatedActivity));
        edges.push(relatedActivityToEdge(data.person.id, relatedActivity))

        relatedActivity.activity.relatedPersons.forEach(relatedPerson => {
            if (addedEdges.has(relatedPerson.id)) return;
            addedEdges.set(relatedPerson.id, true);
            nodes.push(relatedPersonToNode(relatedPerson));
            edges.push(relatedPersonToEdge(relatedActivity.activity.id, relatedPerson))
        });
    })
    return {
        nodes: nodes,
        edges: edges
    }
}

export default function Graph({targetNodeId}: Props) {
    const ELEMENT_ID_FOR_GRAPH = 'graph'
    const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);
    const {data} = useGetPersonForGraphQuery({
        variables: {
            id: targetNodeId
        }
    })

    useEffect(() => {
        if (data != null) {
            const cy = renderGraph(ELEMENT_ID_FOR_GRAPH, adjustElements(data), targetNodeId)
            cy.on('tap', 'node', function (evt) {
                const node = evt.target;
                if (node.data('label') == 'Person') {
                    setSelectedNodeId(Number(node.id()));
                }
            });
        }
    }, [targetNodeId, data])

    return (
        <Box position="relative" w="100%" h="100%">
            <Box id={ELEMENT_ID_FOR_GRAPH} w="100%" h="100%"/>
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
                            <PersonModal personId={selectedNodeId}/>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    )
}