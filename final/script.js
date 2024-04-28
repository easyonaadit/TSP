import { bruteForceTSP } from './bruteForce.js'
import { geneticAlorithmTSP } from './geneticAlgorithm.js'
import { antColonyOptimizationTSP } from './antcolony.js'
import { simulatedAnnealingTSP } from './simulated.js'
// import { addCustomMap } from './utils/dom.js'
const run = document.getElementById('run')
const genetic = document.getElementById('genetic')
const ant = document.getElementById('ant')

// const simulated = document.getElementById('simulated')
let count = 0;




// let optimalPath = []

run.addEventListener('click', () => {
    console.log("Running brute force TSP")
    let coordinates = getCoordinates()
    bruteForceTSP(coordinates)
})

genetic.addEventListener('click', () => {
    console.log("Running genetic algorithm")
    let coordinates = getCoordinates()
    geneticAlorithmTSP(coordinates);
})

ant.addEventListener('click', () => {
    console.log("Running ant colony")
    let coordinates = getCoordinates()
    antColonyOptimizationTSP(coordinates);
})



// simulated.addEventListener('click', () => {
//     console.log("Running simulated annealing")
//     let coordinates = getCoordinates()
//     simulatedAnnealingTSP(coordinates);
// })

function getCoordinates() {
    let coordinates = [];
    const nodes = document.getElementsByClassName('node')
    for (let i = 0; i < nodes.length; i++) {
        let posX = nodes[i].getAttribute('cx')
        let posY = nodes[i].getAttribute('cy')
        coordinates[i] = {
            X: posX,
            Y: posY
        }
        nodes[i].setAttribute('class', 'node active-node')
    }
    let mstcost = findMST(coordinates);
    console.log("The Lower Bound is: ", mstcost)

    return coordinates;
}

function findMST(coordinates) {
    const numVertices = coordinates.length;
    const graph = new Array(numVertices).fill(null).map(() => []);

    // Populate the graph with distances between vertices
    for (let i = 0; i < numVertices; i++) {
        for (let j = i + 1; j < numVertices; j++) {
            const distance = calculateDistance(coordinates[i].X, coordinates[i].Y, coordinates[j].X, coordinates[j].Y);
            graph[i].push({ vertex: j, weight: distance });
            graph[j].push({ vertex: i, weight: distance });
        }
    }

    const visited = new Array(numVertices).fill(false);
    const key = new Array(numVertices).fill(Infinity);

    key[0] = 0; // Start from the first vertex

    for (let i = 0; i < numVertices - 1; i++) {
        const u = minKey(key, visited);
        visited[u] = true;

        for (const { vertex, weight } of graph[u]) {
            if (!visited[vertex] && weight < key[vertex]) {
                key[vertex] = weight;
            }
        }
    }

    // Calculate the total cost of the MST
    let totalCost = 0;
    for (let i = 1; i < numVertices; i++) {
        totalCost += key[i];
    }

    // Return the total cost of the MST
    return totalCost;
}

function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function minKey(key, visited) {
    let min = Infinity;
    let minIndex = -1;

    for (let v = 0; v < key.length; v++) {
        if (!visited[v] && key[v] < min) {
            min = key[v];
            minIndex = v;
        }
    }

    return minIndex;
}

