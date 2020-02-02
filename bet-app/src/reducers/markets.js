const initialState = {
markets: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_MARKETS':
        return {
            ...state,
            markets: action.payload,
        }
        default:
        return state
    }
}