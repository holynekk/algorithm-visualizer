import { useState } from 'react';
import BinarySearch from './algorithms/branchAndBound/binarySearch';
import MergeSort from './algorithms/divideAndConquer/mergeSort';
import InsertionSort from './algorithms/bruteForce/insertionSort';
import BubbleSort from './algorithms/bruteForce/bubbleSort';
import HeapSort from './algorithms/bruteForce/heapSort';
import DijkstraShortest from './algorithms/greedy/dijkstraShortest';
import NthFactorial from './algorithms/recursive/nthFactorial';
import FibonacciSeries from './algorithms/dynamicProgramming/fibonacciSequence';
import '../styles/App.css';

function renderSwitch(param) {
	switch(param) {
		case 'heapSort':
			return <HeapSort />
		case 'fibonacciSeries':
			return <FibonacciSeries />
		case 'nth-factorial':
			return <NthFactorial />
		case 'bubbleSort':
			return <BubbleSort />
		case 'binarySearch':
			return <BinarySearch />;
		case 'mergeSort':
			return <MergeSort />;
		case 'insertionSort':
			return <InsertionSort />
		case 'dijkstraShortest':
			return <DijkstraShortest />;
		default:
			return '';
	}
}

function App() {
	const [algoType, setAlgoType] = useState('');

	return (
		<div className="App">
			<div id="menuToggle">
				
				<input type="checkbox" defaultChecked />
				
				<span></span>
				<span></span>
				<span></span>
				
				<div id="menu">
					<h2>Algorithm Visualizer</h2>
					<div className='algo-group'>
						<p className='algo-name'> Backtracking </p>
						<div className='horizontal-line'> a</div>
						<button className='custom-btn btn-15'>*</button>
						<button className='custom-btn btn-15'>*</button>
					</div>
					<div className='algo-group'>
						<p className='algo-name'> Branch and Bound </p>
						<div className='horizontal-line'> a</div>
						<button 
							className='custom-btn btn-15' 
							onClick={()=>{
								setAlgoType('binarySearch');
							}}
						>
							Binary Search
						</button>
					</div>
					<div className='algo-group'>
						<p className='algo-name'> Brute Force </p>
						<div className='horizontal-line'> a</div>
						<button 
							className='custom-btn btn-15' 
							onClick={()=>{
								setAlgoType('insertionSort');
							}}
						>
							Insertion Sort
						</button>
						<button 
							className='custom-btn btn-15' 
							onClick={()=>{
								setAlgoType('bubbleSort');
							}}
						>
							Bubble Sort
						</button>
						<button 
							className='custom-btn btn-15' 
							onClick={()=>{
								setAlgoType('heapSort');
							}}
						>
							Heap Sort
						</button>
					</div>
					<div className='algo-group'>
						<p className='algo-name'> Divide and Conquer </p>
						<div className='horizontal-line'> a</div>
						<button 
							className='custom-btn btn-15' 
							onClick={()=>{
								setAlgoType('mergeSort');
							}}
						>
							Merge Sort
						</button>
					</div>
					<div className='algo-group'>
						<p className='algo-name'> Dynamic Programming </p>
						<div className='horizontal-line'> a</div>
						<button 
							className='custom-btn btn-15' 
							onClick={()=>{
								setAlgoType('fibonacciSeries');
							}}
						>
							Fibonacci Series
						</button>
					</div>
					<div className='algo-group'>
						<p className='algo-name'> Greedy </p>
						<div className='horizontal-line'> a</div>
							<button 
								className='custom-btn btn-15' 
								onClick={()=>{
									setAlgoType('dijkstraShortest');
								}}
							>
								Dijsktra's Shorthest Path
							</button>
					</div>
					<div className='algo-group'>
						<p className='algo-name'> Recursive </p>
						<div className='horizontal-line'> a</div>
						<button 
								className='custom-btn btn-15' 
								onClick={()=>{
									setAlgoType('nth-factorial');
								}}
							>
								N-th Factorial
							</button>
					</div>
				</div>
			</div>

			{
				algoType === ''

				?
					<div className='home-screen' >
						<h1>Algorithm Visualizer</h1>
						<p>Let's choose an algorithm from left panel to start!</p>
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
			<footer className='main-footer'><a href='https://github.com/holynekk'>Github - HolyNekK</a></footer>
		</div>
	);
}

export default App;
