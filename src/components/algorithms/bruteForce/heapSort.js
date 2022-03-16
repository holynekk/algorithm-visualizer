
let ANIMATION_SPEED_MS = 100;
const PRIMARY_COLOR = '#2962ff';
const SECONDARY_COLOR = "#555";

let numberArray = [];
let animations = [];

function HeapSort() {

    for (let i = 0; i < 30; i++) {
        if (numberArray.length < 30) numberArray.push(Math.floor(Math.random() * 50 + 1));
    }

    function heapify(n, i) {
        let largest = i, leftChild = 2*i+1, rightChild = 2*i+2;

        if (leftChild < n && numberArray[leftChild] > numberArray[largest]) {
            largest = leftChild;
        }
        if (rightChild < n && numberArray[rightChild] > numberArray[largest]) {
            largest = rightChild;
        }
        if (largest !== i) {
            // Swap numbers
            let temp = numberArray[i];
            numberArray[i] = numberArray[largest];
            numberArray[largest] = temp;
            animations.push([i, largest]);
            heapify(n, largest);
        }
    }

    function getHeapSortAnimations() {

        for(let i = 30/2 - 1; i >= 0; i--) {
            heapify(30, i);
        }

        for(let i = 29; i > 0; i--) {
            let temp = numberArray[0];
            numberArray[0] = numberArray[i];
            numberArray[i] = temp;
            animations.push([0, i]);
            heapify(i, 0);
        }
    }

    function startInsertionSort() {
        getHeapSortAnimations();
        let k = 0;
        animations.forEach((animation)=>{
            const domArray = document.getElementsByClassName("array-bar");
            setTimeout(()=>{
                domArray[animation[0]].style.background = PRIMARY_COLOR;
                domArray[animation[1]].style.background = PRIMARY_COLOR;
            }, k++ * ANIMATION_SPEED_MS);
            setTimeout(()=>{
                let temp = domArray[animation[0]].style.height;
                domArray[animation[0]].style.height = domArray[animation[1]].style.height;
                domArray[animation[1]].style.height = temp;
            }, k++ * ANIMATION_SPEED_MS);
            setTimeout(()=>{
                domArray[animation[0]].style.background = "#555";
                domArray[animation[1]].style.background = "#555";
            }, k++ * ANIMATION_SPEED_MS);
        });
        console.log(numberArray);
    }
    
    return (
        <div className='algo-wrapper'>
            <div className='info-section'>
                <div className='info-divs'>
                    <div className='bumbum'>
                        <div id="start-node" className='info-node' />
                        <p className='node-tag'>Array numbers being compared</p>
                    </div>
                </div>
                <div className='info-text'>
                    Heap Sort Algorithm
                </div>
                <button
                    className='button-81'
                    onClick={startInsertionSort}
                >
                    Play
                </button>
            </div>
            <div className="array-container">
                {
                    numberArray.map((value, idx) => (
                        <div
                            className='array-bar'
                            key={idx}
                            style={{
                                height: `${10*value}px`
                            }}
                        />
                    ))
                }
            </div>
        </div>
    );
    
}

export default HeapSort;