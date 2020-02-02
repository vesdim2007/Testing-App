import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from "redux-thunk"
import sportsReducer from "../reducers/sports"
import eventsReducer from "../reducers/events"
import marketsReducer from "../reducers/markets"

export default () => {
    const store = createStore(
        combineReducers({
            sports: sportsReducer,
            events: eventsReducer,
            markets: marketsReducer
        }),
        compose(applyMiddleware(thunk))
    )
    return store
}