import { calculateOptimalPath, setFinalPath } from './path.js'
let optimalPath;

async function bruteForceTSP(coordinates) {
    let minDistance = 9999999;
    let length = coordinates.length
    let cities = []
    for (let i = 0; i < length; i++) {
        cities[i] = i;
    }


    try {
        const permutationsResponse = await fetch('http://127.0.0.1:6788', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nodes: cities })
        });

        const permutationsData = await permutationsResponse.json();
        console.log("%cBefore running brurte force", 'color: red')
        console.log("%cPermutations calculated\n", 'color: green', permutationsData, '\n', permutationsData.name);
        runBruteForce(permutationsData.name);
        console.log("%cAfter running brute force", 'color: blue')

        const optimalPathResponse = await fetch('http://127.0.0.1:6788/api/optimalpath', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nodes: coordinates })
        });

        const optimalPathData = await optimalPathResponse.json();
        console.log("Optimal path calculated:", optimalPathData);

        // console.log("All permutations:", permutationsData.name);
        console.log("Optimal path:", optimalPathData.name);
        optimalPath = optimalPathData.name;

        setFinalPath(optimalPathData.name);
    } catch (error) {
        console.log(error);
    }



    // fetch('http://127.0.0.1:6788', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ nodes: cities })
    // })
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log("Permutations calculated\n", data)
    //         runBruteForce(data.name)
    //         return data.name;
    //     })
    //     .then(allPermutations => {
    //         return fetch('http://127.0.0.1:6788/api/optimalpath', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ nodes: coordinates })
    //         })
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log("Optimal path calculated:", data);
    //         return { allPermutations, optimalPath: data.optimalPath };
    //     })
    //     .then(({ allPermutations, optimalPath }) => {
    //         console.log("All permutations:", allPermutations);
    //         console.log("Optimal path:", optimalPath);
    //         setFinalPath(optimalPath);
    //     })
    //     .catch(e => console.log(e))

    //this is the async operation. here the fetch is done. 
    // fetch('http://127.0.0.1:6788', {
    //     method: "POST",
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ nodes: cities })
    // })
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log("HIT THE SERVER \n", data)
    //         allPermutations = data.name
    //         runBruteForce(allPermutations)
    //         optimalPath = calculateOptimalPath(allPermutations, coordinates)
    //         setFinalPath(optimalPath)
    //         console.log("minimum distance is: ", minDistance)
    //         console.log("Optimal Path is: ", optimalPath)
    //     })
    //     .catch(e => console.log("Error is : \n", e))

    // fetch('http://127.0.0.1:6788/api/optimalpath', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ nodes: coordinates })

    // })
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log("Hit the server again\n", data)
    //         optimalPath = data.optimalPath
    //         setFinalPath(optimalPath);
    //     })
    //     .catch(e => console.log("2nd fetch \n", e))


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
}


function runBruteForce(allPermutations) {
    console.log('%cStarted brute force TSP', '#00ff00')
    let k = 0
    const output = setInterval(() => {
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
        }
        let lastnode = allPermutations[k].length - 1
        console.log(lastnode)
        selectedLines.push("0-" + allPermutations[k][allPermutations[k].length - 1])
        selectedLines.forEach(element => {
            document.getElementById(element).setAttribute('class', 'line active-line')
        });

        setTimeout(() => {
            selectedLines.forEach(element => {
                if (!nextSelectedLines.includes(element)) {
                    document.getElementById(element).setAttribute('class', 'line')
                }
            });
        }, 100);

        k++;
        if (k == allPermutations.length) {
            clearInterval(output)
            setFinalPath(optimalPath)
            console.log("%cTHE BRUTE FORCE IS OVER", 'color: red')
        }
    }, 200);
}


// module.exports = {
//     bruteForceTSP
// }

export { bruteForceTSP }