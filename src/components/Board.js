import React, { useState } from "react";
import Square from "./Square";
const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [nextPlayer, setNextPlayer] = useState("X");

  const handleClick = (i) => {
    const isClicked = squares[i] !== null;
    if (isClicked || calculateWinner(squares)) {
      return;
    }
    const squaresCopy = [...squares];
    squaresCopy[i] = nextPlayer;
    setSquares(squaresCopy);
    const secondPlayer = nextPlayer === "X" ? "O" : "X";
    setNextPlayer(secondPlayer);
  };

  const restart = () => {
    setSquares(Array(9).fill(null));
    setNextPlayer("X");
  };

  function renderSquare(i) {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  }

  function displayStatus() {
    let status;

    const winner = calculateWinner(squares);
    if (winner) {
      status = `Winner is ${winner}`;
    } else {
      status = `Next player: ${nextPlayer}`;
    }

    return status;
  }

  return (
    <div>
      <div className="status">{displayStatus()}</div>
      <button onClick={restart}>Restart Game</button>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

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
