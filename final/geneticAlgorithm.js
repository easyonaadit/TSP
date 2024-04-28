const POPULATION_SIZE = 5;
const MAX_GENERATIONS = 2;
const MUTATION_RATE = 0.01;
const TIMELIMIT = 10;
let optimalPath = [];


function geneticAlorithmTSP(coordinates) {
    let length = coordinates.length;
    let cities = [];
    for (let i = 0; i < length; i++) {
        cities[i] = i;
    }

    console.log("%cGenetic Algorithm\n%cPopulation Size: ", "color:blue", "color:violet", POPULATION_SIZE)
    console.log("%cNumber of Generations: ", "color:violet", MAX_GENERATIONS)
    console.log("%cMutation Rate: ", "color: violet", MUTATION_RATE)

    runGeneticAlgorithm(coordinates)



}

function calculateFinalDistance(bestSolution, coordinates) {
    for (let i = 0; i < bestSolution.length; i++) {

    }
}

function runGeneticAlgorithm(coordinates) {
    let population = initializePopulation(coordinates);
    let generation = 0;
    let bestSolution;
    const TIMELIMIT = 500; // Adjust the time limit as needed
    const output = setInterval(() => {
        if (generation === MAX_GENERATIONS || terminationConditionMet(population)) {
            clearInterval(output);
            // setFinalPath(bestSolution, coordinates);
            setOptimalPath(bestSolution, coordinates);
            // console.log(bestSolution)
            // let distance = calculateFinalDistance(bestSolution, coordinates)
            console.log("%cGenetic Algorithm finished", 'color: blue');
            console.log("%cTotal Distance of Optimal Path: ", "color: green", calculateDistance(bestSolution, coordinates))
            return;
        }
        let i = 0; // Counter for population index
        const displayNextPopulation = () => {
            // console.log("%cThis is population ", "color: blue", i, population);
            setFinalPath(population[i], coordinates);
            setTimeout(() => {
                clearPath(population[i]);
                i++;
                if (i < population.length) {
                    displayNextPopulation();
                } else {
                    population = evolvePopulation(population, coordinates);
                    bestSolution = getBestIndividual(population, coordinates);
                    generation++;
                }
            }, TIMELIMIT);
        };
        displayNextPopulation(); // Start displaying the population
    }, (population.length * TIMELIMIT) + 2 * TIMELIMIT);
}


// function runGeneticAlgorithm(coordinates) {

//     let population = initializePopulation(coordinates);
//     // console.log(population)
//     let generation = 0;
//     let bestSolution;

//     const output = setInterval(() => {
//         population = evolvePopulation(population, coordinates);
//         let bestIndividual = getBestIndividual(population, coordinates);
//         for (let i = 0; i < population.length; i++) {
//             setTimeout(() => {
//                 console.log("%cThis is population ", "color: blue", i, population)
//                 setFinalPath(population[i], coordinates);
//                 setTimeout(() => {

//                     clearPath(population[i]);
//                 }, TIMELIMIT);
//             }, 2 * TIMELIMIT);
//         }

//         if (!bestSolution || calculateDistance(bestIndividual, coordinates) < calculateDistance(bestSolution, coordinates)) {
//             bestSolution = bestIndividual;
//         }
//         // setFinalPath(bestIndividual, coordinates);
//         // setTimeout(() => {
//         //     clearPath(bestIndividual);
//         // }, TIMELIMIT * 2);


//         generation++;

//         if (generation === MAX_GENERATIONS || terminationConditionMet(population)) {
//             clearInterval(output);
//             setFinalPath(bestSolution, coordinates);
//             console.log("%cGenetic Algorithm finished", 'color: blue');
//         }
//     }, TIMELIMIT);
//     if (bestSolution != null) setFinalPath(bestSolution, coordinates);
// }

function initializePopulation(coordinates) {
    let population = [];

    for (let i = 0; i < POPULATION_SIZE; i++) {
        let cities = [];
        for (let j = 1; j < coordinates.length; j++) {
            cities.push(j);
        }
        shuffleArray(cities);
        population.push(cities);
    }

    return population;
}

function evolvePopulation(population, coordinates) {
    let newPopulation = [];
    //based on current population, we make a new population of the same size by breeding and also by adding some mutations in the population.

    for (let i = 0; i < population.length; i++) {
        let parent1 = tournamentSelection(population, coordinates); //conducts a tournament between 5 random populations and selects the best of them.
        let parent2 = tournamentSelection(population, coordinates);
        let offspring = crossover(parent1, parent2); //we counduct two tournaments and select two parents which are the best of them. then we breed these two parents.
        mutate(offspring);
        newPopulation.push(offspring);
    }

    return newPopulation;
}

function tournamentSelection(population, coordinates) {
    let tournamentSize = 5;
    let tournament = [];
    //we are conduction a tournament between 5(tournament size) populations from the givnen populations. 
    for (let i = 0; i < tournamentSize; i++) //selects 5 random populations to conduct the tournament between.
    {
        let randomIndex = Math.floor(Math.random() * population.length); //select any one random population
        tournament.push(population[randomIndex]);
    }

    return getBestIndividual(tournament, coordinates); //returns the best population out of all the ones which competed.
}

function crossover(parent1, parent2) {
    let offspring = [];
    let startPos = Math.floor(Math.random() * parent1.length);
    let endPos = Math.floor(Math.random() * parent1.length);
    //start and end positions make a random subsection of the pupolation array, and we populate elements from that portion of parent 1 into that part of the offspring

    for (let i = 0; i < parent1.length; i++) {
        if (startPos < endPos && i > startPos && i < endPos) {
            offspring.push(parent1[i]);
        } else if (startPos > endPos && (i > startPos || i < endPos)) {  //(i > startPos || i < endPos))
            offspring.push(parent1[i]);
        } else {
            offspring.push(null);
        }
    }

    //fill in the remaining elemnts with traits from parent 2.
    for (let i = 0; i < parent2.length; i++) {
        if (!offspring.includes(parent2[i])) {
            for (let j = 0; j < offspring.length; j++) {
                if (offspring[j] === null) {
                    offspring[j] = parent2[i];
                    break;
                }
            }
        }
    }

    return offspring;
}

function mutate(individual) {
    for (let i = 0; i < individual.length; i++) {
        if (Math.random() < MUTATION_RATE) {
            let indexA = Math.floor(Math.random() * individual.length);
            let indexB = (indexA + 1) % individual.length;
            swap(individual, indexA, indexB);
        }
    }
}

function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function getBestIndividual(population, coordinates) {
    let bestIndividual = population[0];
    let minDistance = calculateDistance(bestIndividual, coordinates);

    for (let i = 1; i < population.length; i++) {
        let distance = calculateDistance(population[i], coordinates);
        if (distance < minDistance) {
            minDistance = distance;
            bestIndividual = population[i];
        }
    }

    return bestIndividual;
}

function terminationConditionMet(population) {
    // Define termination condition for the genetic algorithm
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

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
    let lineID = "0-" + optimalPath[optimalPath.length - 1];
    // console.log(lineID);
    // console.log(document.getElementById(lineID))
    selectedLines.push(lineID);
    lineID = "0-" + optimalPath[0];
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
    let lineID = "0-" + optimalPath[optimalPath.length - 1];
    // console.log(lineID);
    // console.log(document.getElementById(lineID))
    selectedLines.push(lineID);
    lineID = "0-" + optimalPath[0];
    selectedLines.push(lineID);
    // console.log(lineID);
    // console.table('%cTHIS IS ALL THE SELECTED LINES!', 'color: #00ff00', selectedLines);

    // let totalDistanceFinal = 0;
    selectedLines.forEach(element => {
        let someLine = document.getElementById(element);
        if (someLine !== null) {
            // let x1 = someLine.getAttribute('x1')
            // let x2 = someLine.getAttribute('x2')
            // let y1 = someLine.getAttribute('y1')
            // let y2 = someLine.getAttribute('y2')

            someLine.classList.remove('line');
            someLine.classList.add('final-line');
            someLine.removeAttribute('stroke');
            // console.log(someLine);
        }
    });
};


function clearPath(optimalPath) {
    let selectedLines = [];
    for (let j = 0; j < optimalPath.length - 1; j++) {
        let linePart1 = optimalPath[j];
        let linePart2 = optimalPath[j + 1];
        let lineID = linePart1 < linePart2 ? linePart1 + "-" + linePart2 : linePart2 + "-" + linePart1;
        selectedLines.push(lineID);
        // console.log('%cTHE LINE ID IS: ', 'color: #0000ff', lineID);
    }
    let lineID = "0-" + optimalPath[optimalPath.length - 1];
    // console.log(lineID);
    // console.log(document.getElementById(lineID))
    selectedLines.push(lineID);
    lineID = "0-" + optimalPath[0];
    selectedLines.push(lineID);
    // console.table('%cTHIS IS ALL THE SELECTED LINES!', 'color: #00ff00', selectedLines);

    selectedLines.forEach(element => {
        let someLine = document.getElementById(element);
        if (someLine !== null) {
            someLine.classList.add('line');
            someLine.classList.remove('active-line');
            someLine.removeAttribute('stroke');
            // console.log(someLine);
        }
    });
}

function calculateOptimalPath(allPermutations, coordinates) {
    let minDistance = Infinity;
    let optimalPath = [];

    for (let i = 0; i < allPermutations.length; i++) {
        let distance = calculateDistance(allPermutations[i], coordinates);
        if (distance < minDistance) {
            minDistance = distance;
            optimalPath = allPermutations[i];
            console.log('%coptimal path', 'color: #00ff00', optimalPath);
        }
    }

    return optimalPath;
}

function calculateDistance(permutation, coordinates) {
    let totalDistance = 0;

    for (let i = 0; i < permutation.length - 1; i++) {
        let dist = distanceBetweenCities(permutation[i], permutation[i + 1], coordinates);
        totalDistance += dist;
    }

    let startCity = coordinates[0];
    let endNode = permutation[permutation.length - 1];
    let endCity = coordinates[endNode];
    let finalDist = startEndDistance(startCity, endCity);
    totalDistance += finalDist;

    return totalDistance;
}

function startEndDistance(city1, city2) {
    return Math.sqrt(Math.pow((city1.X - city2.X), 2) + Math.pow((city1.Y - city2.Y), 2));
}

function distanceBetweenCities(city1, city2, coordinates) {
    let c1 = coordinates[city1];
    let c2 = coordinates[city2];
    return Math.sqrt(Math.pow((c1.X - c2.X), 2) + Math.pow((c1.Y - c2.Y), 2));
}


// Constants


// Usage

export { geneticAlorithmTSP };