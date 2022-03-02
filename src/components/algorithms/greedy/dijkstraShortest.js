import { Component } from 'react';
import Node from '../../utils/Node';
import '../../../styles/algorithm-styles/greedy/dijkstraShortest.css'

let START_NODE_ROW = 15;
let START_NODE_COL = 10;
let FINISH_NODE_ROW = 7;
let FINISH_NODE_COL = 34;

export default class DijkstraShortest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            MBL_pressed: false
        };
    }
    // Visualizing squares
    componentDidMount() {
        const grid = [];
        for(let row = 0; row < 20; row++) {
            const currentRow = [];
            for (let col = 0; col < 50; col++) {
                currentRow.push(createNode(col, row));
            }
            grid.push(currentRow);
        }
        this.setState({grid});
    }

    handleMouseDown(row, col) {
        const updatedGrid = updateGrid(this.state.grid, row, col);
        this.setState({grid: updatedGrid, mouseIsPressed: true});
    }
    
    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;
        const updatedGrid = updateGrid(this.state.grid, row, col);
        this.setState({grid: updatedGrid});
    }
    
    handleMouseUp() {
        this.setState({mouseIsPressed: false});
    }

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
            }, 10 * i);
        }
    }

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
            }, 50 * i);
        }
    }

    startDijkstra() {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    render() {
        const { grid, MBL_pressed } = this.state;
        return (
            <>
                <div className='info-section'>
                    <div className='info-divs'>
                        <div className='bumbum'>
                            <div id="start-node" className='info-node' />
                            <p className='node-tag'>Start Node</p>
                        </div>
                        <div className='bumbum'>
                            <div id="finish-node" className='info-node' />
                            <p className='node-tag'>Finish Node</p>
                        </div>
                        <div className='bumbum'>
                            <div id="shortest-path" className='info-node' />
                            <p className='node-tag'>Shortest Path</p>
                        </div>
                    </div>
                    <div className='info-text'>
                        Used algorithm is Dijkstra's shorhest path algorithm. You can also put some walls (weights) on grid 
                        to block searching through that direction. Just click and drag on grid.
                    </div>
                    <button
                        className='button-81'
                        onClick={() => this.startDijkstra()}
                    >
                        Play
                    </button>
                </div>
                
                <div className='grid'>
                    {grid.map((row, rowIndex)=>{
                        return (
                            <div key={rowIndex}>
                                {row.map((node, nodeIndex) =>{
                                    const {row, col, isFinish, isStart, isWall} = node;
                                    return (
                                        <Node 
                                            key={nodeIndex}
                                            row={row}
                                            col={col}
                                            isFinish={isFinish}
                                            isStart={isStart}
                                            isWall={isWall}
                                            mouseIsPressed={MBL_pressed}
                                            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                            onMouseEnter={(row, col) =>
                                                this.handleMouseEnter(row, col)
                                            }
                                            onMouseUp={() => this.handleMouseUp()}
                                        />
                                    )
                                })}
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }
}

function updateGrid(grid, row, col) {
    const updatedGrid = grid.slice();
    const node = updatedGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    updatedGrid[row][col] = newNode;
    return updatedGrid;
}

function createNode(col, row) {
    return {
        col,
        row,
        isStart: (row === START_NODE_ROW && col === START_NODE_COL),
        isFinish: (row === FINISH_NODE_ROW && col === FINISH_NODE_COL),
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    };
};


// Main dijkstra algorithm

function dijkstra(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
        sortNodes(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        if (closestNode.isWall) {
            continue;
        }
        if (closestNode.distance === Infinity) {
            return visitedNodesInOrder;
        }
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) {
            return visitedNodesInOrder;
        }
        updateUnvisitedNeighbors(closestNode, grid);
    }
}
  
function sortNodes(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}
  
function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}
  
function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
        return neighbors.filter(neighbor => !neighbor.isVisited);
}
  
function getAllNodes(grid) {
    const nodes = [];
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[0].length; j++) {
            nodes.push(grid[i][j]);
        }
    } return nodes;
}
  
  // Backtracks from the finishNode to find the shortest path.
  // Only works when called *after* the dijkstra method above.
function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}
