export function dijkstra(grid ,startNode,finishNode){
    const VisitedNodesInorder=[]
    startNode.distance=0
    const unVisitedNodes=getAllNodes(grid)
    while(!!unVisitedNodes.length){
        sortNodesByDistance(unVisitedNodes)
        const closestNode=unVisitedNodes.shift()
        if(closestNode.isWall) continue

        if (closestNode.distance===Infinity) return VisitedNodesInorder
        closestNode.isVisited=true
        VisitedNodesInorder.push(closestNode)

        if(closestNode ===finishNode) return VisitedNodesInorder
        updateVisitedNeighbours(closestNode ,grid)
    }


}


function getAllNodes(grid){
    const nodes=[]
    for(const row of grid){
        for(const node of row){
            nodes.push(node)
        }
    }
    return nodes
}

function sortNodesByDistance(unVisitedNodes){
    unVisitedNodes.sort((nodeA ,nodeB) =>nodeA.distance - nodeB.distance)
}

function updateVisitedNeighbours(node ,grid){
    const unVistedNeibours=getUnvisitedNeighbours(node ,grid)
    for(const neighbor of unVistedNeibours){
        neighbor.distance=node.distance+1
        neighbor.previousNode=node
    }
}

function getUnvisitedNeighbours(node ,grid){
    const neighbors=[]
    const{col ,row}=node
    if(row >0) neighbors.push(grid[row-1][col])
    if(row < grid.length-1) neighbors.push(grid[row+1][col])
    if(col > 0) neighbors.push(grid[row][col-1])
    if(col < grid[0].length -1) neighbors.push(grid[row][col+1])
    return neighbors.filter(neighbors => !neighbors.isVisited)
}

export function getNodesInshortestOrder(finishNode){
    const shortestPathOrder=[]
    let currentNode=finishNode
    while(currentNode!== null){
        shortestPathOrder.unshift(currentNode)
        currentNode=currentNode.previousNode
    }
    return shortestPathOrder
}