// import '../../styles/algorithm-styles/divideAndConquer/mergeSort.css';

let ANIMATION_SPEED_MS = 10;
const SECONDARY_COLOR = '#2962ff';
const PRIMARY_COLOR = '#555';
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
		animations.push([i, j]);
		animations.push([i, j]);
		if (auxiliaryArray[i] <= auxiliaryArray[j]) {
			animations.push([k, auxiliaryArray[i]]);
			mainArray[k++] = auxiliaryArray[i++];
		} else {
			animations.push([k, auxiliaryArray[j]]);
			mainArray[k++] = auxiliaryArray[j++];
		}
	}
	while (i <= middleIdx) {
		animations.push([i, i]);
		animations.push([i, i]);
		animations.push([k, auxiliaryArray[i]]);
		mainArray[k++] = auxiliaryArray[i++];
	}
	while (j <= endIdx) {
		animations.push([j, j]);
		animations.push([j, j]);
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

	for (let i = 0; i < 30; i++) {
		if (numberArray.length < 30) numberArray.push(Math.floor(Math.random() * 50 + 1));
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
					Merge Sort Algorithm
				</div>
				<button
					className='button-81'
					onClick={startSorting}
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


export default MergeSort;
