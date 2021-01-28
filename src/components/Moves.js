import React, { useContext } from "react";
import { GameContext } from "./GameStore.js";

const Moves = () => {
    const { updatedHistory, dispatch } = useContext(GameContext);

    const jumpTo = (step) => {
        dispatch({ type: "CHANGE_STEP_NUMBER", payload: step });
        dispatch({ type: "CHANGE_X_IS_NEXT", payload: step % 2 === 0 });
    };

    const moves = updatedHistory.map((step, move) => {
        const desc = move ? "Go to move #" + move : "Go to game start";
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    return (
        <>
            <ol>{moves}</ol>
        </>
    );
};

export default Moves;
