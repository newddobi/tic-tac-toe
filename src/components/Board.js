import React, { useContext } from "react";
import Square from "./Square.js";
import { GameContext } from "./GameStore.js";

const Board = () => {
    
    const { current, handleClick } = useContext(GameContext);

    const renderSquare = (i) => {
        return (
            <Square
                value={current.squares[i]}
                // 괄호를 추가하여 JavaScript가 return 뒤에 세미콜론을 삽입하지 않아도 코드가 깨지지 않는다.
                onClick={() => handleClick(i)}
            />
        );
    };

    return (
        <div>
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

export default Board;
