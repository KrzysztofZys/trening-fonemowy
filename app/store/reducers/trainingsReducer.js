import { SET_DATA } from "../constants/trainingsConstants";

const initialState = {
    trainings: []
}

const trainingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA:
            return {
                ...state,
                trainings: action.payload,
            }
        default:
            return state;
    }
}

export default trainingsReducer;