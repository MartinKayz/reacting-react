import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// class Square extends React.Component {
//     // a component constructor, this one allows for saving state of the component

//     // now deleting the contructor because the square no longer keeps track of games state
//     // constructor(props) {
//     //     super(props);
//     //     this.state = {
//     //         vals: null,
//     //     };   
//     // }

//     render() {
//         return (
//             // here we used a normal function call
//             // <button className="square" onClick={function () { alert("Click on the function ! "); }}>
//             //     {this.props.vals}
//             // </button>

//             // for event handling , we use arrow functions

//             <button className="square"
//                 // passing two props from Board to square
//                 onClick={() => { this.props.onClick() }}>
//                 {this.props.vals}

//             </button>

//         );
//     }
// }// constructor(props) {
//     super(props);
//     this.state = {
//         vals: null,
//     };
// }

//refactoring the square component to become a function component 
// this is because it does not have its own state
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.vals}
        </button>


    );

}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            //making X to be the first move by default
            xIsNext: true,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });

    }

    renderSquare(i) {
        // here we passed the vals prop down to show numbers 0 -8 
        // return <Square vals={i} />;
        return (
            <Square
                vals={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );

        // we are now instructing each individual aquare about its current value 'x','o', or null
    }

    render() {
        const winner = calculateWinner(this.state.squares)
        let status;

        if (winner) {
            status = 'Winner:  ' + winner;
        } else {
            status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
