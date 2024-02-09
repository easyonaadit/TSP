


const run = document.getElementById('run')
let count = 0;
let index = 0;
let hashtable = []
let firstNode = 0
let optimalPath = []



run.addEventListener('click', () => {
    console.log("Running brute force TSP")
    let coordinates = getCoordinates()

    // console.table(document.getElementsByClassName('node'))
    // console.table(document.getElementsByClassName('active-node'))
    // console.table(coordinates)
    // console.log(nodes)

    bruteForceTSP(coordinates)



})





function getCoordinates() {
    let coordinates = [];
    const nodes = document.getElementsByClassName('node')
    // console.table(document.getElementsByClassName('node'))

    for (let i = 0; i < nodes.length; i++) {
        let posX = nodes[i].getAttribute('cx')
        let posY = nodes[i].getAttribute('cy')
        coordinates[i] = {
            X: posX,
            Y: posY
        }
        // console.log(nodes[i])
        nodes[i].setAttribute('class', 'node active-node')

    }
    return coordinates;
}


const bruteForceTSP = coordinates => {
    let minDistance = 9999999;

    let length = coordinates.length
    let cities = []
    for (let i = 0; i < length; i++) {
        cities[i] = i;

    }

    let allPermutations = []
    // console.log("Before the function", allPermutations)
    // let count = 0; 
    // console.log(allPermutations[0])
    // console.log(allPermutations.length)
    // console.log(allPermutations[0].length)


    //this is the async operation. here the fetch is done. 
    fetch('http://127.0.0.1:6788', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes: cities })
    })
        .then(res => res.json())
        .then(data => {
            console.log("HIT THE SERVER \n", data)
            allPermutations = data.name
            runBruteForce(allPermutations)
            minDistance = calculateOptimalPath(allPermutations, coordinates)
            setFinalPath()
            console.log("minimum distance is: ", minDistance)
            console.log("Optimal Path is: ", optimalPath)
        })
        // .then(data => allPermutations = data)
        .catch(e => console.log("Error is : \n", e))


    // fetch('flowers.jpg')
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not OK');
    //         }
    //         return response.blob();
    //     })
    //     .then(myBlob => {
    //         myImage.src = URL.createObjectURL(myBlob);
    //     })
    //     .catch(error => {
    //         console.error('There has been a problem with your fetch operation:', error);
    //     });


    // allPermutations = findAllPermutations([...cities], 1, length - 1, allPermutations)
    // console.log("After the functions", allPermutations)









}

function runBruteForce(allPermutations) {


    let k = 0
    const output = setInterval(() => {
        // colourLines(allPermutations[i++])
        // console.log(k++)
        // console.log('all permutations length: ', allPermutations.length)
        let selectedLines = []
        let nextSelectedLines = []
        for (let j = 0; j < allPermutations[k].length - 1; j++) {
            let linePart1 = allPermutations[k][j]
            let linePart2 = allPermutations[k][j + 1]
            let nextLine1
            let nextLine2
            if (k < allPermutations.length - 1) {

                nextLine1 = allPermutations[k + 1][j]
                nextLine2 = allPermutations[k + 1][j + 1]
            }
            let lineID = ''
            let nextLineID = ''
            if (linePart1 < linePart2) {
                lineID = linePart1 + "-" + linePart2
            }
            else {
                lineID = linePart2 + "-" + linePart1
            }
            selectedLines.push(lineID)

            //THIS PART IS FOR THE NEXT LINE
            if (k < allPermutations.length - 1) {

                if (nextLine1 < nextLine2) {
                    nextLineID = nextLine1 + "-" + nextLine2
                }
                else {
                    nextLineID = nextLine2 + "-" + nextLine1
                }
                nextSelectedLines.push(nextLineID)
            }
            // let changeLineAttribute = document.getElementById(lineID)
            // console.log(changeLineAttribute)


        }
        let lastnode = allPermutations[k].length - 1
        console.log(lastnode)
        selectedLines.push("0-" + allPermutations[k][allPermutations[k].length - 1])
        selectedLines.forEach(element => {

            // element.setAttribute('class', 'line active-line')
            // console.log(document.getElementById(element))
            document.getElementById(element).setAttribute('class', 'line active-line')
        });

        setTimeout(() => {
            selectedLines.forEach(element => {

                if (!nextSelectedLines.includes(element)) {

                    document.getElementById(element).setAttribute('class', 'line')
                }

                // element.setAttribute('class', 'line active-line')
                // console.log(document.getElementById(element))
            });
        }, 100);

        k++;
        if (k == allPermutations.length) {
            clearInterval(output)
            setFinalPath()


        }
    }, 200);
}

function calculateOptimalPath(allPermutations, coordinates) {
    let minDistance = 999999;
    for (let i = 0; i < allPermutations.length; i++) {
        let distance = calculateDistance(allPermutations[i], coordinates)
        // console.log(allPermutations[i])

        // console.log("%c distance of ", 'color: #ff00ff', allPermutations[i], " is: ", distance)
        if (distance < minDistance) {
            // console.log('%cinside if statement', 'color: #00ff00')
            minDistance = distance;
            optimalPath = allPermutations[i]

            console.log('%coptimal path', 'color: #00ff00', optimalPath)

        }



    }
    return minDistance
}

// const findAllPermutations = (cities, start, end, allPermutations) => {
//     // console.log("inside the function: ", allPermutations)
//     if (start == end) {
//         allPermutations[count++] = cities
//     }
//     for (let i = start; i <= end; i++) {
//         let temp = cities[start]
//         cities[start] = cities[i]
//         cities[i] = temp

//         findAllPermutations([...cities], start + 1, end, allPermutations)

//         temp = cities[start]
//         cities[start] = cities[i]
//         cities[i] = temp


//     }

//     return allPermutations
// }

const calculateDistance = (permutation, coordinates) => {
    let totalDistance = 0
    for (let i = 0; i < permutation.length - 1; i++) {
        let dist = distanceBetweenCities(permutation[i], permutation[i + 1], coordinates)
        // console.log("Calculate dist of (", permutation[i],", ", permutation[i+1],") is: ", dist)
        totalDistance = totalDistance + dist


    }
    // console.log("Total distance of ", permutation," is: ", totalDistance)
    let startCity = coordinates[0];
    let endNode = permutation[permutation.length - 1]
    let endCity = coordinates[endNode]
    // console.log("Start City: ", startCity, "(", startCity.X,", ", startCity.Y,")")
    // console.log("End City: ", endCity,"(", endCity.X,", ", endCity.Y, ")")
    // let finalDist = Math.sqrt(Math.pow((coordinates[0].X - coordinates[permutation[permutation.length-1]].X)) + Math.pow((coordinates[0].Y - coordinates[permutation[permutation.length-1]].Y)))
    let finalDist = startEndDistance(startCity, endCity)
    // console.log("Final Distance of ", permutation," is: ", finalDist)


    totalDistance = totalDistance + finalDist

    // console.log("%c TOTAL DISTANCE OF ", 'color: #ff0000', permutation, "is: ", totalDistance)

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


const setFinalPath = () => {
    console.log("%cINSIDE THE FINAL PATH\n", "#ff0000", optimalPath)
    // optimalPath.push(0)

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
    console.log("Before", listOfAllLines)
    console.log(listOfAllLines.length)
    // console.log(listOfAllLines[0])
    for (let i = 0; i < listOfAllLines.length; i++) {
        // console.log(i)
        // console.log("%call lines at ", 'color: #ff0000', i, listOfAllLines[i])
        // listOfAllLines[i].setAttribute('class', 'line')
        listOfAllLines[i].classList.baseVal = 'line'
        console.log("%call lines at ", 'color: #ff0000', i, listOfAllLines[i])
    }
    console.log("After", listOfAllLines)

    // let lastnode = allPermutations[k].length-1
    // console.log(lastnode)
    selectedLines.push("0-" + optimalPath[optimalPath.length - 1])

    console.log('%cTHESE ARE THE SELECTED LINES', 'color: #660011')
    console.log(selectedLines)



    selectedLines.forEach(element => {

        // element.setAttribute('class', 'line active-line')
        // console.log(document.getElementById(element))
        let someLine = document.getElementById(element)
        console.log("This is someline", someLine)
        // someLine.setAttribute('class', 'line active-line')
        someLine.classList.baseVal = 'active-line'
        console.log("After adding the class", someLine)
        document.getElementById(element).setAttribute('class', 'line active-line')
    });
    selectedLines.forEach(line => {
        console.log("After adding the active class", document.getElementById(line))

    })

    console.log("After", listOfAllLines)


}