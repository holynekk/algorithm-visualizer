import { useState } from 'react';
import '../styles/App.css';
import BinarySearch from './algorithms/binarySearch';
import MergeSort from './algorithms/mergeSort';

function renderSwitch(param) {
	switch(param) {
		case 'binarySearch':
			return <BinarySearch />;
		case 'mergeSort':
			return <MergeSort />;
		default:
			return '';
	}
}

let algo = '01';

function set_algo_bar(e) {
	let div_element = document.getElementById(algo);
	console.log(div_element);
	div_element.style.height = 0;
	algo = e.target.value;
	div_element = document.getElementById(algo);
	div_element.style.height = `${22*div_element.childNodes.length}px`;
	console.log(algo);
}

function App() {
	const [algoType, setAlgoType] = useState('');

	return (
		<div className="App">
			<div id="menuToggle">
				<input type="checkbox" />
				
				<span></span>
				<span></span>
				<span></span>
				
				<ul id="menu">
					<button value="01" onClick={set_algo_bar}>
						Backtracking
					</button>
					<div id="01" className='algo-buttons-container'>
						<button className='algo-buttons'>bum</button>
						<button className='algo-buttons'>bumbum</button>
					</div>


					<button value="02" onClick={set_algo_bar}>
						Branch and Bound
					</button>
					<div id="02" className='algo-buttons-container'>
						<button className='algo-buttons'>bum</button>
						<button className='algo-buttons'>bumbum</button>
					</div>


					<button value="03" onClick={set_algo_bar}>
						Brute Force
					</button>
					<div id="03" className='algo-buttons-container'>
						<button className='algo-buttons'>bum</button>
						<button className='algo-buttons'>bumbum</button>
					</div>


					<button value="04" onClick={set_algo_bar}>
						Divide and Conquer
					</button>
					<div id="04" className='algo-buttons-container'>
						<button 
							className='algo-choose-button' 
							onClick={()=>{
								setAlgoType('mergeSort');
							}}
						>
							Merge Sort
						</button>
					</div>


					<button value="05" onClick={set_algo_bar}>
						Dynamic Programming
					</button>
					<div id="05" className='algo-buttons-container'>
						<button className='algo-buttons'>bum</button>
						<button className='algo-buttons'>bumbum</button>
					</div>


					<button value="06" onClick={set_algo_bar}>
						Greedy
					</button>
					<div id="06" className='algo-buttons-container'>
						<button className='algo-buttons'>bum</button>
						<button className='algo-buttons'>bumbum</button>
					</div>


					<button value="07" onClick={set_algo_bar}>
						Recursive
					</button>
					<div id="07" className='algo-buttons-container'>
						<button className='algo-buttons'>bum</button>
						<button className='algo-buttons'>bumbum</button>
					</div>
				</ul>
			</div>

			{
				algoType === ''

				?
					<div>
						Go and choose the alog type from left..
					</div>
				:
				<>
					<div className="algorithm-display">
						{
							renderSwitch(algoType)
						}
					</div>
					<div className="algorithm-code">
						<div className='algo-presudo'>

						</div>
						<div className='algo-real'>

						</div>
					</div>
				</>
				
			}
			
		</div>
	);
}

export default App;
