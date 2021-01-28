import React, { useEffect, useReducer } from "react";
import { calculateWinner } from "../util/calculateWinner.js";

import gameReducer from "../reducers/gameReducer.js";

// hooks의 기능은 아님. 상위의 store 역할
// 다른 컴포넌트에서 받아야 하기 때문에 export 사용
export const GameContext = React.createContext();

const GameStore = (props) => {

    const initData = {
        history: [{ squares: Array(9).fill(null) }],
        stepNumber: 0,
        xIsNext: true,
    };

    const [games, dispatch] = useReducer(gameReducer, initData);

    const handleClick = (i) => {
        const newHistory = games.history.slice(0, games.stepNumber + 1);
        const current = newHistory[games.stepNumber];
        // 기존 배열을 수정하지 않고 squares 배열의 복사본을 생성하여 수정하는것에 주의
        const squares = current.squares.slice();

        // 누군가가 승리하거나 Square가 이미 채워졌다면 무시
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = games.xIsNext ? "X" : "O";

        dispatch({ type: "ADD_HISTORY", payload: newHistory.concat([{ squares: squares }]) });
        dispatch({ type: "CHANGE_STEP_NUMBER", payload: newHistory.length });
        dispatch({ type: "CHANGE_X_IS_NEXT", payload: !games.xIsNext });
    };

    // 가장 최근 기록을 사용하도록 업데이트하여 게임의 상태를 확인하고 표시
    const updatedHistory = games.history;
    const current = updatedHistory[updatedHistory.length - 1];
    const winner = calculateWinner(current.squares);

    // 렌더링 이후 작업
    useEffect(() => {
        console.log("새로운 내용이 렌더링 됐네요", games);
    }, [games]);

    return (
        <GameContext.Provider
            value={{ winner, games, updatedHistory, current, handleClick, dispatch }}
        >
            {props.children}
        </GameContext.Provider>
    );
};

export default GameStore;
