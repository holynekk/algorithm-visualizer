import '../../../styles/algorithm-styles/bruteForce/insertionSort.css';

let ANIMATION_SPEED_MS = 10;
const PRIMARY_COLOR = '#2962ff';
const SECONDARY_COLOR = "#555";
let numberArray = [];

function InsertionSort() {

    for (let i = 0; i < 30; i++) {
        if (numberArray.length < 30) numberArray.push(Math.floor(Math.random() * 50 + 1));
    }

    function getInsertionSortAnimations() {
        const animations = [];
        const auxiliaryArray = numberArray.slice();

        for(let i = 1; i < auxiliaryArray.length; i++) {
            let key = auxiliaryArray[i];
            let j = i - 1;
            while (j >= 0 && auxiliaryArray[j] > key) {
                const temp = auxiliaryArray[j];
                auxiliaryArray[j] = auxiliaryArray[j+1];
                auxiliaryArray[j+1] = temp;
                animations.push([0, j, j+1]);
                j--;
            }
            animations.push([1, j+1, key]);
        }

        return animations;
    }

    function startInsertionSort() {
        const animations = getInsertionSortAnimations();
        console.log(animations);
        let k = 0;
        animations.forEach((animation)=>{
            const domArray = document.getElementsByClassName("array-bar");
            if (animation[0] === 0) {
                setTimeout(()=>{
                    domArray[animation[1]].style.background = PRIMARY_COLOR;
                    domArray[animation[2]].style.background = PRIMARY_COLOR;
                }, k++ * ANIMATION_SPEED_MS);
                setTimeout(()=>{
                    domArray[animation[1]].style.background = SECONDARY_COLOR;
                    domArray[animation[2]].style.background = SECONDARY_COLOR;
                }, k++ * ANIMATION_SPEED_MS);
                setTimeout(()=>{
                    let temp = domArray[animation[1]].style.height;
                    domArray[animation[1]].style.height = domArray[animation[2]].style.height;
                    domArray[animation[2]].style.height = temp;
                }, k++ * ANIMATION_SPEED_MS);
            } else {
                setTimeout(()=>{
                    domArray[animation[1]].style.height = toString(animation[2]*10)+"px";
                    console.log(domArray[animation[1]].style.height);
                }, k++ * ANIMATION_SPEED_MS);
            }
        });
    }
    
    return (
        <div className='array-algo-wrapper'>
            <div className='info-section'>
                <div className='info-divs'>
                    <div className='bumbum'>
                        <div id="start-node" className='info-node' />
                        <p className='node-tag'>Array numbers being compared</p>
                    </div>
                </div>
                <div className='info-text'>
                    Insertion Sort Algorithm
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

export default InsertionSort;