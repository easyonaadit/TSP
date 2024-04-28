const svg = document.getElementById('svg')
const customButton = document.getElementById('custom')
let firstNode = 0
let index = 0;
let hashtable = []
let custom = [
    [82, 187],
    [97, 379],
    [169, 441],
    [208, 374],
    [229, 411],
    [217, 260],
    [212, 200],
    [187, 164],
    [230, 113],
    [308, 115],
    [285, 336],
    [329, 476],
    [360, 524],
    [453, 559],
    [489, 609],
    [530, 627],
    [573, 538],
    [514, 515],
    [445, 471],
    [414, 360],
    [476, 304],
    [404, 268],
    [439, 200],
    [448, 151],
    [562, 278],
    [596, 242],
    [610, 180],
    [647, 212],
    [602, 325],
    [600, 410],
    [553, 421],
    [622, 489],
    [687, 484],
    [701, 541],
    [757, 529],
    [810, 562],
    [780, 499],
    [778, 456],
    [743, 432],
    [666, 408],
    [683, 347],
    [710, 234],
    [764, 189],
    [724, 305],
    [772, 324],
    [832, 508],
    [878, 488],
    [928, 431],
    [861, 376],
    [925, 384],
    [910, 322],
    [961, 264],
    [942, 191],
    [996, 204],
    [1033, 123]
]


body.addEventListener('click', (e) => {

    drawNodes(e)
    drawLines(0)
})

customButton.addEventListener('click', () => {
    console.log("Adding map")
    addCustomMap()

    // let coordinates = getCoordinates()

    // antColonyOptimizationTSP(coordinates);
})

function drawNodes(e) {
    // console.log('clicked the div')
    // console.log(e)
    // console.log(e.clientX + ' ' + e.clientY)  //i think this gives the absolute position of the mouse on the screen
    let div = document.createElement('div')
    // let node = document.createElement('circle')
    const node = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    // let posX = ((e.pageX) / 1500) * 1500
    // let posY = ((e.pageY) / 892) * 892
    // posX = (e.pageX / window.innerWidth) * 1500
    // posY = (e.pageY / window.innerHeight) * 892
    // div.className = 'node'
    // node.setAttribute('cx', e.pageX)
    // node.setAttribute('cy', e.pageY)
    node.setAttribute('cx', e.pageX)
    node.setAttribute('cy', e.pageY)
    // console.log('[' + e.pageX + ", " + e.pageY + ']')
    node.setAttribute('r', '13')
    if (firstNode == 0) {
        node.setAttribute('class', 'node active-node')
        firstNode++
    }
    else {
        node.setAttribute('class', 'node')

    }
    // console.log(e.pageX)
    // console.log(e.pageY)
    // console.log(e.pageX+', '+e.pageY)
    // console.log(e.pageY)


    node.setAttribute('id', 'node' + index)
    index++

    // div.style.position = 'relative'
    div.style.left = e.pageX + "px"
    div.style.top = e.pageY + "px"
    // console.log(div)
    // document.body.appendChild(div)
    // document.body.appendChild(node)
    // console.log(node)
    svg.appendChild(node)

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', e.pageX);
    text.setAttribute('y', e.pageY);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('alignment-baseline', 'middle');
    text.setAttribute('fill', 'white');
    text.setAttribute('font-family', 'Arial'); // Change font family
    text.setAttribute('font-weight', 'bold');
    text.textContent = index - 1; // Display the node number
    svg.appendChild(text);
}

function drawNodesCustom(city) {
    // console.log('clicked the div')
    // console.log(e)
    // console.log(e.clientX + ' ' + e.clientY)  //i think this gives the absolute position of the mouse on the screen
    // let div = document.createElement('div')
    // let node = document.createElement('circle')
    const node = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    // let posX = ((e.pageX) / 1500) * 1500
    // let posY = ((e.pageY) / 892) * 892
    // posX = (e.pageX / window.innerWidth) * 1500
    // posY = (e.pageY / window.innerHeight) * 892
    // div.className = 'node'
    // node.setAttribute('cx', e.pageX)
    // node.setAttribute('cy', e.pageY)
    node.setAttribute('cx', city[0])
    node.setAttribute('cy', city[1])
    // console.log('[' + e.pageX + ", " + e.pageY + ']')
    node.setAttribute('r', '13')
    if (firstNode == 0) {
        node.setAttribute('class', 'node active-node')
        firstNode++
    }
    else {
        node.setAttribute('class', 'node')

    }
    // console.log(e.pageX)
    // console.log(e.pageY)
    // console.log(e.pageX+', '+e.pageY)
    // console.log(e.pageY)


    node.setAttribute('id', 'node' + index)

    // div.style.position = 'relative'
    // div.style.left = e.pageX + "px"
    // div.style.top = e.pageY + "px"
    // console.log(div)
    // document.body.appendChild(div)
    // document.body.appendChild(node)
    // console.log(node)
    svg.appendChild(node)

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', city[0]);
    text.setAttribute('y', city[1]);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('alignment-baseline', 'middle');
    text.setAttribute('fill', 'white');
    text.setAttribute('font-family', 'Arial'); // Change font family
    text.setAttribute('font-weight', 'bold');
    text.textContent = index++; // Display the node number
    svg.appendChild(text);
}

function drawLines(flag) {
    const nodes = document.getElementsByClassName('node')
    // console.table(nodes)
    // Array.of(nodes).forEach((node, index) => {
    //     console.log(node)
    //     console.log(index)
    // })
    // console.log(nodes[0])
    // [...nodes].forEach(node => {
    //     console.log(node, index)

    // });
    // console.log(nodes[0].getAttribute('cx'))

    for (let i = 0; i < nodes.length; i++) {
        let node1 = nodes[i]
        // let position1 = node1.getBoundingClientRect()
        for (let j = i + 1; j < nodes.length; j++) {
            let node2 = nodes[j]
            // let position2 = node2.getBoundingClientRect()
            // console.log(node1)
            // console.log(position1.left)
            // console.log(node2)
            // let line = document.createElement('svg')
            // let check = i+"-"+j;
            if (!hashtable.includes(i + "-" + j)) {

                let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

                line.id = i + "-" + j
                line.setAttribute('x1', node1.getAttribute('cx'))
                line.setAttribute('x2', node2.getAttribute('cx'))
                line.setAttribute('y1', node1.getAttribute('cy'))
                line.setAttribute('y2', node2.getAttribute('cy'))

                // line.setAttribute('stroke', 'black')
                // line.setAttribute('stroke-width', '4')
                if (flag == 0) {

                    line.setAttribute('class', 'line')
                }
                else {
                    line.setAttribute('class', 'custom-line')
                }
                // line.setAttribute('class', 'line test-class')



                // console.log(line)
                svg.appendChild(line)
                hashtable.push(i + "-" + j)

                let midX = (parseFloat(node1.getAttribute('cx')) + parseFloat(node2.getAttribute('cx'))) / 2;
                let midY = (parseFloat(node1.getAttribute('cy')) + parseFloat(node2.getAttribute('cy'))) / 2;

                // Create a new text element for the line ID
                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('x', midX);
                text.setAttribute('y', midY - 5); // Adjust the y-coordinate to position the text above the line
                text.setAttribute('text-anchor', 'middle');
                text.setAttribute('alignment-baseline', 'middle');
                text.setAttribute('fill', 'rgba(128, 128, 128, 0.5)');
                text.setAttribute('font-size', '10px');
                let distance = parseInt(Math.sqrt(Math.pow(parseFloat(node2.getAttribute('cx')) - parseFloat(node1.getAttribute('cx')), 2) + Math.pow(parseFloat(node2.getAttribute('cy')) - parseFloat(node1.getAttribute('cy')), 2)));
                text.textContent = distance; // Set the line ID

                // Append the text element to the SVG container
                svg.appendChild(text);
            }
            // console.log(nodes[i].getAttribute('pageX'))
            // line.attr('x1', nodes[i].getAttribute('pageX'))
        }
    }
}


// function drawLines() {
//     const nodes = document.getElementsByClassName('node');

//     for (let i = 0; i < nodes.length; i++) {
//         let node1 = nodes[i];
//         for (let j = i + 1; j < nodes.length; j++) {
//             let node2 = nodes[j];

//             // Calculate the midpoint of the line
//             let midX = (parseFloat(node1.getAttribute('cx')) + parseFloat(node2.getAttribute('cx'))) / 2;
//             let midY = (parseFloat(node1.getAttribute('cy')) + parseFloat(node2.getAttribute('cy'))) / 2;

//             // Create a new text element for the line ID
//             const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
//             text.setAttribute('x', midX);
//             text.setAttribute('y', midY - 5); // Adjust the y-coordinate to position the text above the line
//             text.setAttribute('text-anchor', 'middle');
//             text.setAttribute('alignment-baseline', 'middle');
//             text.setAttribute('fill', 'black');
//             text.textContent = i + "-" + j; // Set the line ID

//             // Append the text element to the SVG container
//             svg.appendChild(text);
//         }
//     }
// }


function addCustomMap() {
    for (const city of custom) {
        drawNodesCustom(city)
        drawLines(1)

    }


}

// export { addCustomMap }

