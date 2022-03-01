import { useState, useEffect } from 'react';
import Node from '../../utils/Node';

function DijkstraShortest() {
    const [nodes, setNodes] = useState([]);
    // Visualizing squares
    for(let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            currentRow.push([]);
        }
        nodes.push(currentRow);
    }


    return (
        <div>
            {nodes.map((row, rowIndex)=>{
                return (
                    <div>
                        {row.map((node, nodeIndex) => <Node />)}
                    </div>
                );
            })}
        </div>
    );
    
}

export default DijkstraShortest;