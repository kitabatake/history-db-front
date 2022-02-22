// import { Elements } from "../@types/App";
import cytoscape, {Core} from "cytoscape";

import {Elements} from "../lib/types/graph"

export const renderGraph = (elementId: string, elements: Elements): Core => {
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
            selector: `node[id = "${2}"]`,
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