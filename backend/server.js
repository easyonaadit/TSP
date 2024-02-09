const http = require('http')
const PORT = 6788;
let data;
let count = 0;



const server = http.createServer((req, res) => {
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        res.writeHead(204)
        res.end()
    }
    else {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })

        req.on('end', () => {
            let allPermutations = []
            count = 0;


            data = JSON.parse(body)

            console.log(data)
            console.log(data.nodes)


            // console.log(req.url)
            allPermutations = findAllPermutations([...data.nodes], 1, data.nodes.length - 1, allPermutations)


            res.statusCode = 200
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
            res.setHeader('Access-Control-Max-Age', 2592000); // 30 days
            res.setHeader('Content-Type', 'application/json')
            res.write(JSON.stringify({ name: allPermutations }))
            res.end()
        })
    }

})

const findAllPermutations = (cities, start, end, allPermutations) => {
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


server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})