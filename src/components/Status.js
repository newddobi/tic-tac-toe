import React, { useContext } from 'react';
import { GameContext } from "./Game.js";

const Status = () => {
    const { winner, games } = useContext(GameContext);

    let status;
    if (winner) {
        status = "Winner : " + winner;
    } else {
        status = "Next player : " + (games.xIsNext ? "X" : "O");
    }

    return (
        <>
            <div>{status}</div>
        </>
    );
};

export default Status;