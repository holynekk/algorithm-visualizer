import { useState } from 'react';
import '../../styles/algorithm-styles/binarySearch.css'

let numbers = [];
let animArray = [];
let target;

function BinarySearch() {
    const [amountOfNumbers, setAmountOfNumbers] = useState(40);
    const [worstCase, setWorstCase] = useState(false);
    
    for(let i = 0; i < amountOfNumbers/2; i++) {
        numbers.push(Math.floor(Math.random() * 50)+1);
    }
    const numberSort = function (a,b) {
        return a - b;
    };
    numbers.sort(numberSort);
    if (worstCase) {
        while(numbers.includes(target)) {
            target = Math.floor(Math.random() * 50);
        }
    } else {
        target = numbers[Math.floor(Math.random() * amountOfNumbers)];
    }
	return (
        
		<div className="binary-search-wrapper">
            <h2>Binary Search</h2>
            <button onClick={startBinarySearchAnimation}>Play</button>
            <div className="array-container">
                {
                    numbers.map((value, idx) => (
                        <div
                            className='array-bar'
                            key={idx}
                            style={{
                                height: `${10*value}px`
                            }}
                        >
                            {value}
                        </div>
                    ))
                }
            </div>
        </div>
	);
}

function animate() {
    let domArray = document.getElementsByClassName('array-bar');
    for(let k = 0; k < domArray.length; k++) {
        domArray[k].style.background = "blue";
    }
    for(let i = 0; i < animArray.length; i+= 3) {
        for(let k = 0; k < animArray[i]; k++) {
            setTimeout(() => {
                domArray[k].style.background = "yellow";
            }, i*500);
        }
        for(let k = animArray[i]; k < domArray.length; k++) {
            setTimeout(() => {
                domArray[k].style.background = "yellow";
            }, i*500);
        }
    }
    
}

function startBinarySearchAnimation() {
    let left = 0, right = numbers.length-1, mid;
    while(left <= right) {
        mid = parseInt((left+right)/2);
        animArray.push(left);
        animArray.push(right);
        animArray.push(mid);
        if (numbers[mid] === target) {
            animArray.push(mid);
            break;
        } else if (numbers[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    } animate()
}

export default BinarySearch;
