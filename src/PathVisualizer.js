
import React, { Component } from 'react';
import './PathVisualizer.css'
import Node from './Node'
import { dijkstra,getNodesInshortestOrder } from './algorithms/Dijkstra';

const START_ROW=10
const START_COL=15
const FINISH_ROW=10
const FINISH_COL=35
export default class PathVisualizer extends Component{
    constructor(){
        super()
        this.state={
            grid:[],
            mouseIsPressed: false,
        }
    }

    componentDidMount(){
      const grid=getInitialgrid()
      this.setState({grid})
    }
    handleMouseDown(row ,col){
        const newGrid=getNewGrideWithWallToggeld(this.state.grid ,row ,col)
        this.setState({grid:newGrid , mouseIsPressed:true})
    }
    handleMouseEnter(row ,col){
        if(!this.state.mouseIsPressed) return
        const newGrid=getNewGrideWithWallToggeld(this.state.grid ,row ,col)
        this.setState({grid: newGrid })
    }
    handleMouseUp(){
        this.setState({mouseIsPressed:false})
    }

    animateDijkstra(VisitedNodesInorder ,shortestPathOrder){
        for(let i=0 ;i<=VisitedNodesInorder.length ;i++){
            if(i===VisitedNodesInorder.length){
                setTimeout(()=>{
                    this.animateShortestPath(shortestPathOrder)
                },10*i)
                return
            }
            setTimeout(()=>{
                const node=VisitedNodesInorder[i]
                document.getElementById(`node-${node.row}-${node.col}`).className=`node node-visited`

            },10*i)
        }
    }
    animateShortestPath(shortestPathOrder){
        for(let i=0 ;i< shortestPathOrder.length ;i++){
            setTimeout(()=>{
                const node=shortestPathOrder[i]
                document.getElementById(`node-${node.row}-${node.col}`).className=`node node-shortest-path`
            },50*i)
            
        }
    }
    visualizeDijkstra(){
        const {grid}=this.state
        const startNode=grid[START_ROW][START_COL]
        const finishNode=grid[FINISH_ROW][FINISH_COL]
        const VisitedNodesInorder=dijkstra(grid ,startNode ,finishNode)
        const shortestPathOrder=getNodesInshortestOrder(finishNode)
        this.animateDijkstra(VisitedNodesInorder , shortestPathOrder)
    }
    Reset(){
       

    }

    render(){
        const {grid , mouseIsPressed}=this.state
       
        return(
           <>
           <button onClick={() =>this.visualizeDijkstra()}>
               ViualizeDijkstraAlgorithm

           </button>
           <button onClick={()=> this.Reset()}>
               Reset the Grid


           </button>
           <div className="grid">
               {grid.map((row ,rowId)=>{
                   return(
                       <div key={rowId}>
                           {row.map((node ,nodeIdx)=>{
                               const{row,col,isStart,isFinish,isWall}=node
                               return(
                                   <Node
                                    key={nodeIdx}
                                    col={col}
                                    isFinish={isFinish}
                                    isStart={isStart}
                                    isWall={isWall}
                                    mouseIsPressed={mouseIsPressed}
                                    onMouseDown={(row,col)=>this.handleMouseDown(row,col)}
                                    onMouseEnter={(row,col)=>this.handleMouseEnter(row,col)}
                                    onMouseUp={()=>this.handleMouseUp()}
                                    row={row}></Node>
                               )
                           })}
                       </div>
                   )
               })}
           </div>
           </>
          )
    }  
   

}

const getInitialgrid= () =>{
    const grid=[]
    for(let row=0 ;row <20 ;row++ ){
        const CurrentRow=[]
        for(let col=0 ;col< 50;col++){
            CurrentRow.push(createNode(col,row))
        }
        grid.push(CurrentRow)
    }
    return grid
}

const createNode=(col ,row) =>{
    return{
        col,
        row,
        isStart: row===START_ROW && col===START_COL,
        isFinish: row===FINISH_ROW && col===FINISH_COL,
        distance: Infinity,
        isVisited:false,
        isWall:false,
        previousNode:null,
    }
}

const getNewGrideWithWallToggeld=(grid,row,col) =>{
    const newGrid=grid.slice()
    const node=newGrid[row][col]
    const newNode={
        ...node,
        isWall: ! node.isWall
    }
    newGrid[row][col]=newNode
    return newGrid
}