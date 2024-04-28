const http = require('http')
const PORT = 6788;
let data;
let count = 0;
let allPermutations = []



const server = http.createServer((req, res) => {
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        res.writeHead(204)
        res.end()
    }
    else {
        if (req.method === "POST" && req.url === '/') {

            let body = ''
            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end', async () => {
                allPermutations = []
                count = 0;


                data = JSON.parse(body)

                // console.log(data)
                // console.log(data.nodes)


                // console.log(req.url)
                allPermutations = await findAllPermutations([...data.nodes], 1, data.nodes.length - 1, allPermutations)
                // let temp2 = []
                // for (let i = 1; i < data.nodes.length; i++) {
                //     temp2[i] = data.nodes[i]
                // }
                // allPermutations = await findAllPermutations([...temp2], data.nodes.length)
                // 

                console.log("%call Permutations are ", '#0000ff', allPermutations)

                res.statusCode = 200
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
                res.setHeader('Access-Control-Max-Age', 2592000); // 30 days
                res.setHeader('Content-Type', 'application/json')
                res.write(JSON.stringify({ name: allPermutations }))
                console.log("%cBefore the end: ", '#0000ff', allPermutations)
                res.end()
            })
        }
        if (req.method === 'POST' && req.url === '/api/optimalpath') {
            let body = ''
            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end', () => {

                count = 0;


                data = JSON.parse(body)

                // console.log(data)
                console.log("this is the 2nd fetch\n", data.nodes)
                console.log("this is the allpermutations of the 2nd fethc\n", allPermutations)


                let temp = 0;
                console.log("Before function call: ", allPermutations)
                while (allPermutations == []) temp++;
                let optimalPath = calculateOptimalPath(allPermutations, data.nodes)
                console.log("After function call: ", allPermutations)
                // allPermutations = findAllPermutations([...data.nodes], 1, data.nodes.length - 1, allPermutations)


                res.statusCode = 200
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
                res.setHeader('Access-Control-Max-Age', 2592000); // 30 days
                res.setHeader('Content-Type', 'application/json')
                res.write(JSON.stringify({ name: optimalPath }))
                res.end()
            })



        }
    }

})

function calculateOptimalPath(allPermutations, coordinates) {
    let optimalPath = [];
    let minDistance = 999999;
    for (let i = 0; i < allPermutations.length; i++) {
        let distance = calculateDistance(allPermutations[i], coordinates)
        if (distance < minDistance) {
            minDistance = distance;
            optimalPath = allPermutations[i]
            console.log('optimal path', optimalPath)
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

const findAllPermutations = async (cities, start, end, allPermutations) => {
    // console.log("inside the function: ", allPermutations)
    if (start == end) {
        allPermutations[count++] = cities
    }
    for (let i = start; i <= end; i++) {
        let temp = cities[start]
        cities[start] = cities[i]
        cities[i] = temp

        findAllPermutations([...cities], start + 1, end, allPermutations)

        temp = cities[start]
        cities[start] = cities[i]
        cities[i] = temp


    }

    return allPermutations
}


// const findAllPermutations = async (cities, n) => {
//     if (n === 1) {
//         return [cities.slice()];
//     }

//     const permutations = [];

//     for (let i = 0; i < n; i++) {
//         permutations.push(...(await findAllPermutations(cities, n - 1)));

//         if (n % 2 === 0) {
//             const temp = cities[i];
//             cities[i] = cities[n - 1];
//             cities[n - 1] = temp;
//         } else {
//             const temp = cities[0];
//             cities[0] = cities[n - 1];
//             cities[n - 1] = temp;
//         }
//     }

//     return permutations;
// };


server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})