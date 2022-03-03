// import '../../styles/algorithm-styles/divideAndConquer/mergeSort.css';

let ANIMATION_SPEED_MS = 10;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';
let numberArray = [];

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
		const middleIdx = Math.floor((startIdx + endIdx) / 2);
		mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
		mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
		doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function getMergeSortAnimations() {
    const animations = [];
    if (numberArray.length <= 1) return numberArray;
    const auxiliaryArray = numberArray.slice();
    mergeSortHelper(numberArray, 0, numberArray.length - 1, auxiliaryArray, animations);
    return animations;
}

function handleAnimationSpeed(e) {
	ANIMATION_SPEED_MS = e.target.value;
}

function startSorting() {
    const animations = getMergeSortAnimations();

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${10*newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

function MergeSort() {

    for (let i = 0; i < 20; i++) {
        numberArray.push(Math.floor(Math.random() * 50 + 1));
    }

    return (
        <div className='merge-sort-wrapper'>
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
					<label for="anim-speed">Animation Speed</label>
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


export default MergeSort;
