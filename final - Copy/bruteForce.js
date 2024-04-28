import { setFinalPath } from './path.js';

let optimalPath;
let allPermutations = [];
let count = 0;

function bruteForceTSP(coordinates) {
    let length = coordinates.length;
    let cities = [];
    for (let i = 0; i < length; i++) {
        cities[i] = i;
    }

    allPermutations = findAllPermutations(cities, 1, length - 1, allPermutations);
    // calculateOptimalPath(allPermutations, coordinates)
    runBruteForce(allPermutations, coordinates);

}

function runBruteForce(allPermutations, coordinates) {
    console.log('%cStarted brute force TSP', '#00ff00');
    let k = 0;
    const output = setInterval(() => {
        let selectedLines = [];
        let nextSelectedLines = [];
        for (let j = 0; j < allPermutations[k].length - 1; j++) {
            let linePart1 = allPermutations[k][j];
            let linePart2 = allPermutations[k][j + 1];
            let nextLine1;
            let nextLine2;
            if (k < allPermutations.length - 1) {
                nextLine1 = allPermutations[k + 1][j];
                nextLine2 = allPermutations[k + 1][j + 1];
            }
            let lineID = '';
            let nextLineID = '';
            if (linePart1 < linePart2) {
                lineID = linePart1 + "-" + linePart2;
            } else {
                lineID = linePart2 + "-" + linePart1;
            }
            selectedLines.push(lineID);

            // THIS PART IS FOR THE NEXT LINE
            if (k < allPermutations.length - 1) {
                if (nextLine1 < nextLine2) {
                    nextLineID = nextLine1 + "-" + nextLine2;
                } else {
                    nextLineID = nextLine2 + "-" + nextLine1;
                }
                nextSelectedLines.push(nextLineID);
            }
        }
        let lastnode = allPermutations[k].length - 1;
        console.log(lastnode);
        selectedLines.push("0-" + allPermutations[k][allPermutations[k].length - 1]);
        selectedLines.forEach(element => {
            let lineElement = document.getElementById(element);
            if (lineElement !== null) {
                lineElement.setAttribute('class', 'line active-line');
            }
        });

        setTimeout(() => {
            selectedLines.forEach(element => {
                if (!nextSelectedLines.includes(element)) {
                    let lineElement = document.getElementById(element);
                    if (lineElement !== null) {
                        lineElement.setAttribute('class', 'line');
                    }
                }
            });
        }, 100);

        k++;
        if (k === allPermutations.length) {
            clearInterval(output);
            setOptimalPath(allPermutations, coordinates);
            // setFinalPath(allPermutations, coordinates);
            console.log("%cTHE BRUTE FORCE IS OVER", 'color: red');
        }
    }, 200);
}

const setOptimalPath = (allPermutations, coordinates) => {
    // console.log('%cINSIDE THE FINAL PATH\n', '#ff0000', optimalPath);
    optimalPath = calculateOptimalPath(allPermutations, coordinates);
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
    console.log(selectedLines)
    // console.log(lineID);
    // console.table('%cTHIS IS ALL THE SELECTED LINES!', 'color: #00ff00', selectedLines);

    selectedLines.forEach(element => {
        let someLine = document.getElementById(element);
        if (someLine !== null) {
            someLine.classList.remove('line');
            someLine.classList.add('final-line');
            someLine.removeAttribute('stroke');
        }
        console.log(someLine);
    });
};

function calculateOptimalPath(allPermutations, coordinates) {
    let optimalPath = [];
    let minDistance = 999999;
    for (let i = 0; i < allPermutations.length; i++) {
        let distance = calculateDistance(allPermutations[i], coordinates);
        if (distance < minDistance) {
            minDistance = distance;
            optimalPath = allPermutations[i];
            console.log('optimal path', optimalPath);
        }
    }
    return optimalPath;
}

const calculateDistance = (permutation, coordinates) => {
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
};

const startEndDistance = (city1, city2) => {
    return Math.sqrt(Math.pow((city1.X - city2.X), 2) + Math.pow((city1.Y - city2.Y), 2));
};

const distanceBetweenCities = (city1, city2, coordinates) => {
    let c1 = coordinates[city1];
    let c2 = coordinates[city2];
    return Math.sqrt(Math.pow((c1.X - c2.X), 2) + Math.pow((c1.Y - c2.Y), 2));
};

const findAllPermutations = (cities, start, end, allPermutations) => {
    if (start == end) {
        allPermutations[count++] = cities;
    }
    for (let i = start; i <= end; i++) {
        let temp = cities[start];
        cities[start] = cities[i];
        cities[i] = temp;

        findAllPermutations([...cities], start + 1, end, allPermutations);

        temp = cities[start];
        cities[start] = cities[i];
        cities[i] = temp;
    }

    return allPermutations;
};

export { bruteForceTSP };
