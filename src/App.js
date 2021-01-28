import React from "react";
import Board from "./components/Board.js";
import Status from "./components/Status.js";
import Moves from "./components/Moves.js";
import GameStore from "./components/GameStore.js";

const App = () => {
    return (
        <GameStore>
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
                <div className="game-info">
                    <Status />
                    <Moves />
                </div>
            </div>
        </GameStore>
    );
};

export default App;
