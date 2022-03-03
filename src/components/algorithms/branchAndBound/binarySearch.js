import { Component } from 'react';
import '../../../styles/algorithm-styles/branchAndBound/binarySearch.css'

export default class BinarySearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numbers: [],
            amountOfNumbers: 30,
            animArray: [],
            worstCase: false,
            target: null
        };
        this.startBinarySearch = this.startBinarySearch.bind(this);
    }

    componentDidMount() {
        for(let i = 0; i < this.state.amountOfNumbers; i++) {
            this.state.numbers.push(Math.floor(Math.random() * 50)+1);
        }
        this.state.numbers.sort(this.numberSort);
        if (this.state.worstCase) {
            while(this.state.numbers.includes(this.state.target)) {
                this.setState({target: Math.floor(Math.random() * 50)});
            }
        } else {
            this.setState({target: this.state.numbers[Math.floor(Math.random() * this.state.amountOfNumbers)]});
        }
    }

    numberSort(a, b) {
        return a - b;
    }


    animate() {
        let arrayBars = document.getElementsByClassName('array-bar');
        let k = -1;
        for(let i = 0; i < this.state.animArray.length; k++, i++) {
            setTimeout(()=>{
                for(let j = 0; j < this.state.amountOfNumbers; j++) {
                    arrayBars[j].style.backgroundColor = '#555';
                }
                for(let j = this.state.animArray[i][0]; j <= this.state.animArray[i][1]; j++) {
                    arrayBars[j].style.backgroundColor = '#2962ff';
                }
            }, i * 1000);
        }
        setTimeout(()=>{
            let bumbum = this.state.animArray[this.state.animArray.length-1][0];
            arrayBars[bumbum].style.backgroundColor = '#c51162';
        }, (k+1) * 1000);
    }

    startBinarySearch() {
        let left = 0, right = this.state.amountOfNumbers - 1, mid;
        let anims = []

        while(left <= right) {
            anims.push([left, right]);
            mid = parseInt((left + right) / 2);
            if (this.state.numbers[mid] === this.state.target) {
                break;
            } else if (this.state.numbers[mid] < this.state.target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        anims.push([mid, mid]);
        this.setState({animArray: anims}, this.animate);
    }

    render() {
        return (
            <div className="array-algo-wrapper">
                <div className='info-section'>
                    <div className='info-divs'>
                        <div className='bumbum'>
                            <div id="start-node" className='info-node' />
                            <p className='node-tag'>Search Range</p>
                        </div>
                        <div className='bumbum'>
                            <div id="finish-node" className='info-node' />
                            <p className='node-tag'>Found Target</p>
                        </div>
                    </div>
                    <div className='info-text'>
                        Used binary search algorithm. Everytime the searching space is divided by to and search is done at the remaining half.
                        This way required time noticeably decreased.
                        <p className='target-number'>Target: {this.state.target}</p>
                    </div>
                    <button
                        className='button-81'
                        onClick={this.startBinarySearch}
                    >
                        Play
                    </button>
                </div>
                <div className="array-container">
                    {
                        this.state.numbers.map((value, idx) => (
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
	
}


