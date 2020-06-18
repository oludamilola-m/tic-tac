import React, { Component } from "react";
import Square from "./Square";
class Board extends Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      nextPlayer: "X",
    };
  }

  handleClick = (i) => {
    const isClicked = this.state.squares[i] !== null;
    if (isClicked || calculateWinner(this.state.squares)) {
      return;
    }
    const squares = [...this.state.squares];
    squares[i] = this.state.nextPlayer;
    this.setState({ squares: squares });
    this.setState(({ nextPlayer }) => {
      const next = nextPlayer === "X" ? "O" : "X";
      return { nextPlayer: next };
    });
  };

  restart = () => {
    this.setState({ squares: Array(9).fill(null), nextPlayer: "X" });
  };

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    let status;

    const winner = calculateWinner(this.state.squares);
    if (winner) {
      status = `Winner is ${winner}`;
    } else {
      status = `Next player: ${this.state.nextPlayer}`;
    }
    return (
      <div>
        <div className="status">{status}</div>
        <button onClick={this.restart}>Restart Game</button>
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

export default Board;
