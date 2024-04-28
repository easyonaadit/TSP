const ALPHA = 1; // Controls the influence of the pheromone trail
const BETA = 2; // Controls the influence of the distance
const RHO = 0.5; // Evaporation rate of pheromone
const Q = 100; // Quantity of pheromone to deposit by each ant
const NUM_ANTS = 5; // Number of ants in the colony
const MAX_ITERATIONS = 5; // Maximum number of iterations
const TIMELIMIT = 50;
let finalTours = []
let iindex = 0;
const DISPLAYTIME = 1000;
let displayInterval = null;
let bestTour;


// function antColonyOptimizationTSP(coordinates) {
//     let pheromoneMatrix = initializePheromoneMatrix(coordinates.length);

//     let bestTour;
//     let bestTourLength = Infinity;

//     for (let iteration = 0; iteration < MAX_ITERATIONS; iteration++) {
//         let antTours = [];

//         for (let ant = 0; ant < NUM_ANTS; ant++) {
//             let tour = constructAntTour(pheromoneMatrix, coordinates);
//             antTours.push(tour);
//         }

//         // Update pheromone trails
//         updatePheromoneMatrix(pheromoneMatrix, antTours, coordinates);

//         // Find the best tour
//         for (let tour of antTours) {
//             let tourLength = calculateTourLength(tour, coordinates);
//             if (tourLength < bestTourLength) {
//                 bestTour = tour;
//                 bestTourLength = tourLength;
//             }
//         }

//         console.log(`Iteration ${iteration + 1}: Best tour length = ${bestTourLength}`);
//         displayAllTours(antTours, coordinates);
//     }

//     // Output the best tour
//     console.log('Best tour:', bestTour);
// }

function antColonyOptimizationTSP(coordinates) {

    let pheromoneMatrix = initializePheromoneMatrix(coordinates.length);

    let bestTourLength = Infinity;

    let iteration = 0;

    function iterate() {
        if (iteration >= MAX_ITERATIONS) {
            // Output the best tour when iterations are complete
            console.log('Best tour:', bestTour);


            displayFinalTours();


            return;
        }

        let antTours = [];

        for (let ant = 0; ant < NUM_ANTS; ant++) {
            let tour = constructAntTour(pheromoneMatrix, coordinates);
            antTours.push(tour);
        }

        // Update pheromone trails
        updatePheromoneMatrix(pheromoneMatrix, antTours, coordinates);

        // Display and clear paths for each tour with a delay
        antTours.forEach((tour, index) => {
            setTimeout(() => {
                setFinalPath(tour, coordinates);
            }, index * TIMELIMIT);
            setTimeout(() => {
                clearPath(tour, coordinates);
            }, (index + 1) * TIMELIMIT);
        });

        // Find the best tour
        for (let tour of antTours) {
            let tourLength = calculateTourLength(tour, coordinates);
            if (tourLength < bestTourLength) {
                console.log("updating")
                bestTour = tour;
                finalTours.push(bestTour)
                bestTourLength = tourLength;
            }
        }

        console.log(`Iteration ${iteration + 1}: Best tour length = ${bestTourLength}`);

        // Increment iteration and schedule the next iteration
        iteration++;
        setTimeout(iterate, antTours.length * TIMELIMIT * 2); // Adjust the delay as needed
    }

    // Start the iteration
    iterate();
}

function displayFinalTours() {
    console.log("The best tours over time: ", finalTours);
    displayInterval = setInterval(() => {
        if (iindex >= finalTours.length) {
            clearInterval(displayInterval); // Stop the interval when all tours are displayed
            setTimeout(() => {
                setOptimalPath(bestTour, coordinates);
            }, DISPLAYTIME / 4 * finalTours.length);
            return;
        }
        displayOptimalTour(finalTours[iindex], coordinates);
        iindex++;
    }, DISPLAYTIME);
}

function displayOptimalTour(tour, coordinates) {
    console.log("Inside displayOptimalTour");
    setOptimalPath(tour, coordinates);
    setTimeout(() => {
        if (!displayInterval) {
            setOptimalPath(tour, coordinates); // Set the optimal path without clearing it
            console.log("IF")
        } else {
            clearPath(tour, coordinates);
            console.log("ELSE")
        }
    }, DISPLAYTIME);
}


function displayAllTours(antTours, coordinates) {
    let delay = 1000;
    antTours.forEach((tour, index) => {
        setTimeout(() => {
            setFinalPath(tour, coordinates);
            setTimeout(() => {
                clearPath(tour);
            }, 300);
        }, delay);
        delay += 10; // Adjust the delay as needed
    });
}

function clearPath(optimalPath) {
    let selectedLines = [];
    for (let j = 0; j < optimalPath.length - 1; j++) {
        let linePart1 = optimalPath[j];
        let linePart2 = optimalPath[j + 1];
        let lineID = linePart1 < linePart2 ? linePart1 + "-" + linePart2 : linePart2 + "-" + linePart1;
        selectedLines.push(lineID);
        // console.log('%cTHE LINE ID IS: ', 'color: #0000ff', lineID);
    }
    let num1 = optimalPath[0];
    let num2 = optimalPath[optimalPath.length - 1]
    let lineID = (num1 < num2) ? num1 + "-" + num2 : num2 + "-" + num1;
    selectedLines.push(lineID);
    // console.table('%cTHIS IS ALL THE SELECTED LINES!', 'color: #00ff00', selectedLines);

    selectedLines.forEach(element => {
        let someLine = document.getElementById(element);
        if (someLine !== null) {
            someLine.classList.add('line');
            someLine.classList.remove('active-line');
            someLine.classList.remove('final-line');
            someLine.removeAttribute('stroke');
            // console.log(someLine);
        }
    });
}

const setOptimalPath = (optimalPath, coordinates) => {
    // console.log('%cINSIDE THE FINAL PATH\n', '#ff0000', optimalPath);
    let selectedLines = [];

    for (let j = 0; j < optimalPath.length - 1; j++) {
        let linePart1 = optimalPath[j];
        let linePart2 = optimalPath[j + 1];
        let lineID = linePart1 < linePart2 ? linePart1 + "-" + linePart2 : linePart2 + "-" + linePart1;
        selectedLines.push(lineID);
        // console.log('%cTHE LINE ID IS: ', 'color: #0000ff', lineID);
    }
    let num1 = optimalPath[0];
    let num2 = optimalPath[optimalPath.length - 1]
    let lineID = (num1 < num2) ? num1 + "-" + num2 : num2 + "-" + num1;
    // if(optimalPath[0] > optimalPath[optimalPath.length-1]){

    //     lineID = "0-" + optimalPath[optimalPath.length - 1];
    // }
    // console.log(lineID);
    // console.log(document.getElementById(lineID))
    selectedLines.push(lineID);
    // lineID = "0-" + optimalPath[0];
    // selectedLines.push(lineID);
    // console.log(lineID);
    console.table('%cTHIS IS ALL THE SELECTED LINES!', 'color: #00ff00', selectedLines);

    selectedLines.forEach(element => {
        let someLine = document.getElementById(element);
        if (someLine !== null) {
            someLine.classList.remove('line');
            someLine.classList.add('final-line');
            someLine.removeAttribute('stroke');
            // console.log(someLine);
        }
    });
};


const setFinalPath = (optimalPath, coordinates) => {
    // console.log('%cINSIDE THE FINAL PATH\n', '#ff0000', optimalPath);
    let selectedLines = [];
    for (let j = 0; j < optimalPath.length - 1; j++) {
        let linePart1 = optimalPath[j];
        let linePart2 = optimalPath[j + 1];
        let lineID = linePart1 < linePart2 ? linePart1 + "-" + linePart2 : linePart2 + "-" + linePart1;
        selectedLines.push(lineID);
        // console.log('%cTHE LINE ID IS: ', 'color: #0000ff', lineID);
    }
    let num1 = optimalPath[0];
    let num2 = optimalPath[optimalPath.length - 1]
    let lineID = (num1 < num2) ? num1 + "-" + num2 : num2 + "-" + num1;
    selectedLines.push(lineID);
    // selectedLines.push(lineID);
    // console.table('%cTHIS IS ALL THE SELECTED LINES!', 'color: #00ff00', selectedLines);

    selectedLines.forEach(element => {
        let someLine = document.getElementById(element);
        if (someLine !== null) {
            someLine.classList.remove('line');
            someLine.classList.add('active-line');
            someLine.removeAttribute('stroke');
            // console.log(someLine);
        }
    });
};


//why do we initialize it to 1?
function initializePheromoneMatrix(numCities) {
    let pheromoneMatrix = [];
    for (let i = 0; i < numCities; i++) {
        pheromoneMatrix[i] = [];
        for (let j = 0; j < numCities; j++) {
            pheromoneMatrix[i][j] = 1; // Initialize pheromone level to 1
        }
    }
    return pheromoneMatrix;
}

function constructAntTour(pheromoneMatrix, coordinates) {
    let numCities = coordinates.length;
    let tour = [];
    let visited = new Array(numCities).fill(false);

    // Choose random starting city
    let currentCity = Math.floor(Math.random() * numCities);
    tour.push(currentCity);
    visited[currentCity] = true;

    // Visit remaining cities
    for (let i = 1; i < numCities; i++) {
        let nextCity = chooseNextCity(pheromoneMatrix, coordinates, currentCity, visited);
        tour.push(nextCity);
        visited[nextCity] = true;
        currentCity = nextCity;
    }

    return tour;
}

function chooseNextCity(pheromoneMatrix, coordinates, currentCity, visited) {
    let numCities = coordinates.length;
    let probabilities = new Array(numCities).fill(0);
    let totalProbability = 0;

    // Calculate probabilities for each unvisited city
    for (let i = 0; i < numCities; i++) {
        if (!visited[i]) {
            let pheromone = pheromoneMatrix[currentCity][i];
            let distance = calculateDistance(currentCity, i, coordinates);
            let probability = Math.pow(pheromone, ALPHA) * Math.pow(1 / distance, BETA);
            probabilities[i] = probability;
            totalProbability += probability;
        }
    }

    // Choose the next city based on probabilities
    let randomValue = Math.random() * totalProbability;
    let cumulativeProbability = 0;
    for (let i = 0; i < numCities; i++) {
        if (!visited[i]) {
            cumulativeProbability += probabilities[i];
            if (randomValue <= cumulativeProbability) {
                return i;
            }
        }
    }

    // If no city was selected, choose a random unvisited city
    for (let i = 0; i < numCities; i++) {
        if (!visited[i]) {
            return i;
        }
    }
}

function updatePheromoneMatrix(pheromoneMatrix, antTours, coordinates) {
    let numCities = coordinates.length;

    // Evaporate pheromone
    for (let i = 0; i < numCities; i++) {
        for (let j = 0; j < numCities; j++) {
            pheromoneMatrix[i][j] *= (1 - RHO);
            // Ensure pheromone levels stay within a reasonable range
            pheromoneMatrix[i][j] = Math.max(pheromoneMatrix[i][j], 0.001); // Minimum pheromone level
            pheromoneMatrix[i][j] = Math.min(pheromoneMatrix[i][j], 1000); // Maximum pheromone level
        }
    }

    // Deposit pheromone
    for (let tour of antTours) {
        let tourLength = calculateTourLength(tour, coordinates);
        let pheromoneDelta = Q / tourLength;
        for (let i = 0; i < numCities - 1; i++) {
            let city1 = tour[i];
            let city2 = tour[i + 1];
            pheromoneMatrix[city1][city2] += pheromoneDelta;
            pheromoneMatrix[city2][city1] += pheromoneDelta; // Assume symmetric pheromone trails
        }
        // Handle last-to-first city
        let lastCity = tour[numCities - 1];
        let firstCity = tour[0];
        pheromoneMatrix[lastCity][firstCity] += pheromoneDelta;
        pheromoneMatrix[firstCity][lastCity] += pheromoneDelta; // Assume symmetric pheromone trails
    }
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

// Example usage
const coordinates = [
    { X: 0, Y: 0 },
    { X: 1, Y: 2 },
    { X: 2, Y: 1 },
    { X: 3, Y: 3 }
];

export { antColonyOptimizationTSP };
