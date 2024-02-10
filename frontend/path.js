function calculateOptimalPath(allPermutations, coordinates) {
    let optimalPath = [];
    let minDistance = 999999;
    for (let i = 0; i < allPermutations.length; i++) {
        let distance = calculateDistance(allPermutations[i], coordinates)
        if (distance < minDistance) {
            minDistance = distance;
            optimalPath = allPermutations[i]
            console.log('%coptimal path', 'color: #00ff00', optimalPath)
        }
    }
    return optimalPath;
}


const calculateDistance = (permutation, coordinates) => {
    let totalDistance = 0
    for (let i = 0; i < permutation.length - 1; i++) {
        let dist = distanceBetweenCities(permutation[i], permutation[i + 1], coordinates)
        totalDistance = totalDistance + dist
    }
    let startCity = coordinates[0];
    let endNode = permutation[permutation.length - 1]
    let endCity = coordinates[endNode]
    let finalDist = startEndDistance(startCity, endCity)
    totalDistance = totalDistance + finalDist
    return totalDistance
}

const startEndDistance = (city1, city2) => {
    return Math.sqrt(Math.pow((city1.X - city2.X), 2) + Math.pow((city1.Y - city2.Y), 2))
}

const distanceBetweenCities = (city1, city2, coordinates) => {
    let c1 = coordinates[city1]
    let c2 = coordinates[city2]
    return Math.sqrt(Math.pow((c1.X - c2.X), 2) + Math.pow((c1.Y - c2.Y), 2))
}

const setFinalPath = (optimalPath) => {
    console.log("%cINSIDE THE FINAL PATH\n", "#ff0000", optimalPath)
    let selectedLines = []
    for (let j = 0; j < optimalPath.length - 1; j++) {
        let linePart1 = optimalPath[j]
        let linePart2 = optimalPath[j + 1]
        let lineID = ''
        //use ternary operator for this!!!
        if (linePart1 < linePart2) {
            lineID = linePart1 + "-" + linePart2
        }
        else {
            lineID = linePart2 + "-" + linePart1
        }
        selectedLines.push(lineID)
        console.log("%cTHE LINE ID IS: ", 'color: #0000ff', lineID)
    }
    console.table('%cTHIS IS THAT TABLE', 'color: #00ff00', selectedLines)

    const listOfAllLines = document.getElementsByClassName('line')
    // console.log("Before", listOfAllLines)
    console.log(listOfAllLines.length)
    for (let i = 0; i < listOfAllLines.length; i++) {
        listOfAllLines[i].classList.baseVal = 'line'
        // console.log("%call lines at ", 'color: #ff0000', i, listOfAllLines[i])
    }
    // console.log("After", listOfAllLines)
    selectedLines.push("0-" + optimalPath[optimalPath.length - 1])
    console.log('%cTHESE ARE THE SELECTED LINES', 'color: #660011')
    console.log(selectedLines)



    selectedLines.forEach(element => {
        let someLine = document.getElementById(element)
        // console.log("This is someline", someLine)
        // someLine.setAttribute('class', 'line active-line')
        someLine.classList.baseVal = 'active-line'
        // console.log("After adding the class", someLine)
        document.getElementById(element).setAttribute('class', 'line active-line')
    });
    selectedLines.forEach(line => {
        // console.log("After adding the active class", document.getElementById(line))

    })
    // console.log("After", listOfAllLines)
}

// module.exports = {
//     calculateOptimalPath,
//     setFinalPath
// }

export { calculateOptimalPath, setFinalPath };