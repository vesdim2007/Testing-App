const initialState = {
    sports: []
    }
    
    export default (state = initialState, action) => {
        switch (action.type) {
            case 'GET_SPORTS':
            return {
                ...state,
                sports: action.payload,
            }
            default:
            return state
        }
    }