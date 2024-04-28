const INITIAL_TEMPERATURE = 1000;
const COOLING_RATE = 0.99;
const MIN_TEMPERATURE = 1;
const MAX_ITERATIONS = 1000;

function simulatedAnnealingTSP(coordinates) {
    let currentSolution = generateRandomSolution(coordinates);
    let bestSolution = currentSolution.slice();
    let currentEnergy = calculateTourLength(currentSolution, coordinates);
    let bestEnergy = currentEnergy;
    let temperature = INITIAL_TEMPERATURE;

    for (let iteration = 0; iteration < MAX_ITERATIONS && temperature > MIN_TEMPERATURE; iteration++) {
        let newSolution = generateNeighborSolution(currentSolution);
        let newEnergy = calculateTourLength(newSolution, coordinates);
        let energyDelta = newEnergy - currentEnergy;

        if (energyDelta < 0 || Math.random() < Math.exp(-energyDelta / temperature)) {
            currentSolution = newSolution;
            currentEnergy = newEnergy;
            if (currentEnergy < bestEnergy) {
                bestSolution = currentSolution.slice();
                bestEnergy = currentEnergy;
            }
        }

        temperature *= COOLING_RATE;
    }

    console.log('Best solution:', bestSolution);
    console.log('Best energy:', bestEnergy);
}

function generateRandomSolution(coordinates) {
    let numCities = coordinates.length;
    let solution = [];
    for (let i = 0; i < numCities; i++) {
        solution.push(i);
    }
    shuffleArray(solution);
    return solution;
}

function generateNeighborSolution(solution) {
    let neighborSolution = solution.slice();
    let index1 = Math.floor(Math.random() * neighborSolution.length);
    let index2 = Math.floor(Math.random() * neighborSolution.length);
    while (index1 === index2) {
        index2 = Math.floor(Math.random() * neighborSolution.length);
    }
    swap(neighborSolution, index1, index2);
    return neighborSolution;
}

function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function calculateTourLength(tour, coordinates) {
    let tourLength = 0;
    for (let i = 0; i < tour.length - 1; i++) {
        tourLength += calculateDistance(tour[i], tour[i + 1], coordinates);
    }
    // Add distance from last city back to the first city
    tourLength += calculateDistance(tour[tour.length - 1], tour[0], coordinates);
    return tourLength;
}

function calculateDistance(city1, city2, coordinates) {
    let c1 = coordinates[city1];
    let c2 = coordinates[city2];
    return Math.sqrt(Math.pow((c1.X - c2.X), 2) + Math.pow((c1.Y - c2.Y), 2));
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Example usage
const coordinates = [
    { X: 0, Y: 0 },
    { X: 1, Y: 2 },
    { X: 2, Y: 1 },
    { X: 3, Y: 3 }
];

export { simulatedAnnealingTSP }
