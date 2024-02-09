const svg = document.getElementById('svg')

body.addEventListener('click', (e) => {

    drawNodes(e)
    drawLines()
})

function drawNodes(e) {
    console.log('clicked the div')
    // console.log(e)
    // console.log(e.clientX + ' ' + e.clientY)  //i think this gives the absolute position of the mouse on the screen
    let div = document.createElement('div')
    // let node = document.createElement('circle')
    const node = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    let posX = ((e.pageX) / 1500) * 1500
    let posY = ((e.pageY) / 892) * 892
    posX = (e.pageX / window.innerWidth) * 1500
    posY = (e.pageY / window.innerHeight) * 892
    // div.className = 'node'
    // node.setAttribute('cx', e.pageX)
    // node.setAttribute('cy', e.pageY)
    node.setAttribute('cx', e.pageX)
    node.setAttribute('cy', e.pageY)
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
    svg.appendChild(node)
    // console.log(document.getElementById('node1'))
}

function drawLines() {
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

                line.setAttribute('stroke', 'black')
                line.setAttribute('stroke-width', '4')
                line.setAttribute('class', 'line')
                // line.setAttribute('class', 'line test-class')



                // console.log(line)
                svg.appendChild(line)
                hashtable.push(i + "-" + j)
            }
            // console.log(nodes[i].getAttribute('pageX'))
            // line.attr('x1', nodes[i].getAttribute('pageX'))
        }
    }
}


