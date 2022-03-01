import '../../../styles/algorithm-styles/bruteForce/insertionSort.css';

let ANIMATION_SPEED_MS = 10;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';
let numberArray = [];



function handleAnimationSpeed(e) {
	ANIMATION_SPEED_MS = e.target.value;
	console.log(ANIMATION_SPEED_MS);
}

function startSorting() {
    let arrayBars = document.getElementsByClassName('array-bar');
    console.log(arrayBars);
    for(let i = 1; i < numberArray.length; i++) {
        let key = numberArray[i];
        let keyDOM = arrayBars[i].style.height;
        let j = i-1;
        while (j >= 0 && numberArray[j] > key) {
            numberArray[j+1] = numberArray[j];
            arrayBars[j+1].style.height = arrayBars[j].style.height;
            setTimeout(function(){ arrayBars[j].style.background = 'red'; }, 500);
            j--;
        }
        numberArray[j+1] = key;
        arrayBars[j+1].style.height = keyDOM;
    }
}

function InsertionSort() {

    for (let i = 0; i < 20; i++) {
        numberArray.push(Math.floor(Math.random() * 50 + 1));
    }

    return (
        <div className='insetion-sort-wrapper'>
            <h2>Merge Sort</h2>
            <div className='settings-section'>
				<div className='animation-speed-slider'>
					<input
						id="anim-speed"
						type="range" 
						min="1" max="250" 
						value="10" 
						step="1"
						onChange={handleAnimationSpeed}
						/>
					<label htmlFor='anim-speed'>Animation Speed</label>
				</div>
				
				<button onClick={startSorting}>Play</button>
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
                            value={value}
                        >
                        </div>
                    ))
                }
            </div>
        </div>
    );
}


export default InsertionSort;
