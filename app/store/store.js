import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import trainingsReducer from "./reducers/trainingsReducer";

const store = createStore(
    trainingsReducer,
    applyMiddleware(
        thunkMiddleware
    ))

export default store;