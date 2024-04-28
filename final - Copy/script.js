import { bruteForceTSP } from './bruteForce.js'
import { geneticAlorithmTSP } from './geneticAlgorithm.js'
import { antColonyOptimizationTSP } from './antcolony.js'
import { simulatedAnnealingTSP } from './simulated.js'
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
    return coordinates;
}
