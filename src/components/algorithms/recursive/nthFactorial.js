
const PRIMARY_COLOR = '#2962ff';
const SECONDARY_COLOR = '#c51162';
const ANIMATION_SPEED = 1000;

let numberArray = []
let labelArray = []

function getFactorialAnimations() {
	let animations = [];
	for(let i = 1; i <= labelArray.length; i++) {
		animations.push([i-1, i]);
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
			labelDomArray[animations[i][1]].style.color = PRIMARY_COLOR;
			numberDomArray[animations[i][0]].style.background = PRIMARY_COLOR;
		}, m++ * ANIMATION_SPEED);
		setTimeout(()=>{
			labelDomArray[animations[i][1]].style.color = 'black';
			numberDomArray[animations[i][0]].style.background = "#555";
			numberDomArray[animations[i+1][0]].style.background = SECONDARY_COLOR;
			// console.log(numberDomArray[animations[i+1][0]].textContent);
			numberDomArray[animations[i+1][0]].textContent = parseInt(numberDomArray[animations[i][0]].textContent) * parseInt(labelDomArray[animations[i][1]].textContent);
		}, m++ * ANIMATION_SPEED);
	}	
}

function NthFactorial() {

	for (let i = 0; i < 11; i++) {
		if (labelArray.length < 11) labelArray.push(i);
		if (numberArray.length < 11) numberArray.push(0);
	}
	numberArray[0] = 1;

    return (
		<div className='algo-wrapper'>
			<div className='info-section'>
				<div className='info-divs'>
					<div className='bumbum'>
						<div id="finish-node" className='info-node' />
						<p className='node-tag'>Numbers being multiplied</p>
					</div>
				</div>
				<div className='info-text'>
					N-th Factorial Algorithm
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


export default NthFactorial;
