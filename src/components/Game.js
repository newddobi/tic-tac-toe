import React from "react";
import Board from "./Board";
import {calculateWinner} from "../util/calculateWinner.js";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 과거의 squares 배열을 histor 배열에 저장
            // 이전 동작에 대한 리스트를 최상위인 Game에 저장
            history: [
                {
                    squares: Array(9).fill(null),
                },
            ],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        // 기존 배열을 수정하지 않고 squares 배열의 복사본을 생성하여 수정하는것에 주의
        const squares = current.squares.slice();

        // 누군가가 승리하거나 Square가 이미 채워졌다면 무시
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? "X" : "O";

        this.setState({
            history: history.concat(
                [
                    {
                        squares: squares,
                    }   
                ]
            ),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    // 가장 최근 기록을 사용하도록 업데이트하여 게임의 상태를 확인하고 표시
    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                "Go to move #" + move :
                "Go to game start";
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{ desc }</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = "Winner : " + winner;
        } else {
            status = "Next player : " + (this.state.xIsNext ? "X" : "O");
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares = {current.squares}
                        onClick = {(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;