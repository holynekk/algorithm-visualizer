
const PRIMARY_COLOR = '#2962ff';
const SECONDARY_COLOR = '#c51162';
const ANIMATION_SPEED = 1000;

let numberArray = []
let labelArray = []

function getFactorialAnimations() {
	let animations = [];
	for(let i = 2; i <= labelArray.length; i++) {
		animations.push([i-2, i-1, i]);
	}
	return animations;
}

function startMultiplying() {
	const animations = getFactorialAnimations();
	let m = 0;
	let labelDomArray = document.getElementsByClassName('borderless-square');
	let numberDomArray = document.getElementsByClassName('number-bar');
	for(let i = 0; i < animations.length; i++) {
		setTimeout(()=>{
            numberDomArray[animations[i][0]].style.background = PRIMARY_COLOR;
			numberDomArray[animations[i][1]].style.background = PRIMARY_COLOR;
			labelDomArray[animations[i][2]].style.color = PRIMARY_COLOR;
		}, m++ * ANIMATION_SPEED);
		setTimeout(()=>{
			labelDomArray[animations[i][2]].style.color = 'black';
            numberDomArray[animations[i][0]].style.background = "#555";
			numberDomArray[animations[i][1]].style.background = "#555";

			numberDomArray[animations[i][2]].style.background = SECONDARY_COLOR;
			numberDomArray[animations[i][2]].textContent = parseInt(numberDomArray[animations[i][0]].textContent) + parseInt(numberDomArray[animations[i][1]].textContent);
		}, m++ * ANIMATION_SPEED);
    }
}

function FibonacciSeries() {

	for (let i = 0; i < 14; i++) {
		if (labelArray.length < 14) labelArray.push(i);
		if (numberArray.length < 14) numberArray.push(0);
	}
	numberArray[0] = 1;
    numberArray[1] = 1;

    return (
		<div className='algo-wrapper'>
			<div className='info-section'>
				<div className='info-divs'>
					<div className='bumbum'>
						<div id="finish-node" className='info-node' />
						<p className='node-tag'>Numbers being added</p>
					</div>
				</div>
				<div className='info-text'>
					Fibonacci Series
				</div>
				<button
					className='button-81'
					onClick={startMultiplying}
				>
					Play
				</button>
			</div>
			<div className="horizontal-arrays">
				<div className="h-array">
					{
						labelArray.map((value, idx) => (
							<div
								className='borderless-square'
								key={idx}
							>
								{value}
							</div>
						))
					}
				</div>
				<div className="h-array">
					{
						numberArray.map((value, idx) => (
							<div
								className='number-bar'
								key={idx}
								style={{color: "white",}}
							>
								{value}
							</div>
						))
					}
				</div>
			</div>
		</div>
    );
}


export default FibonacciSeries;
