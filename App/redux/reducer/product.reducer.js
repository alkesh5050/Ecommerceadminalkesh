import { ADD_PRODUCTE, DELETE_PRODUCTEDATA, GET_PRODUCTEDATA, UPDATE_PRODUCT } from "../ActionTypes";

const intialState = {
    isLoading: false,
    produc: [],
    error: null
}
export const Productreducer = (state = intialState, action) => {
    console.log("action", action);
    switch (action.type) {
        case ADD_PRODUCTE:
            return {
                isLoading: false,
                produc: state.produc.concat(action.payload),
                error: null
            }
        case GET_PRODUCTEDATA:
            return {
                isLoading: false,
                produc: action.payload,
                error: null
            }
        case DELETE_PRODUCTEDATA:
            return {
                isLoading: false,
                produc: state.produc.filter((v) => v.id !== action.payload),
                error: null
            }
        case UPDATE_PRODUCT:
            return {
                isLoading: false,
                produc: state.produc.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload
                    } else {
                        return v;
                    }
                }),
                error: null
            }
        default:
            return state
    }
}