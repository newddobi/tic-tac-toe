const gameReducer = (games, {type, payload}) => {
    switch (type) {

        // 과거의 squares 배열을 histor 배열에 저장
        // 이전 동작에 대한 리스트를 최상위인 Game에 저장
        case "ADD_HISTORY":
            return Object.assign({}, games, {
                history: payload
            });

        case "CHANGE_STEP_NUMBER":
            return Object.assign({}, games, {
                stepNumber: payload
            });

        case "CHANGE_X_IS_NEXT":
            return Object.assign({}, games, {
                xIsNext: payload
            });

        default:
            break;
    }
}

export default gameReducer;