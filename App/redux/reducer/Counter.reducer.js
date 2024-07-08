
import { decrementcounter, incrementcounter } from "../ActionTypes";

const initialState = {
    count: 0
}

//5
export const counterReducer = (state = initialState, action) => {
    // console.log(action);

    switch (action.type) {
        case incrementcounter:
            return {
                count: action.payload
            }   //6
        case decrementcounter:
            return {
                count: state.count - 1
            }
        default:
            return state
    }
}