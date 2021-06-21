import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Square extends React.Component {
    // a component constructor, this one allows for saving state of the component
    constructor(props) {
        super(props);
        this.state = {
            vals: null,
        };
    }

    render() {
        return (
            // here we used a normal function call
            // <button className="square" onClick={function () { alert("Click on the function ! "); }}>
            //     {this.props.vals}
            // </button>

            // for event handling , we use arrow functions

            <button className="square"
                onClick={() => { this.setState({ vals: 'X' }) }}>
                {this.state.vals}

            </button>

        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        };
    }

    renderSquare(i) {
        // here we passed the vals prop down to show numbers 0 -8 
        // return <Square vals={i} />;
        return <Square vals={this.state.squares[i]} />;

        // we are now instructing each individual aquare about its current value 'x','o', or null
    }

    render() {
        const status = 'Next player: X';

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
