import { bruteForceTSP } from './bruteForce.js'
const run = document.getElementById('run')
let count = 0;



// let optimalPath = []

run.addEventListener('click', () => {
    console.log("Running brute force TSP")
    let coordinates = getCoordinates()
    bruteForceTSP(coordinates)
})

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
