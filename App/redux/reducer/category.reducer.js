import { ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORY } from "../ActionTypes";

const intialState = {
    isLoading: false,
    categories: [],
    error: null
}

export const categoryReducer = (state=intialState, action) => {
    console.log("categoryReducer",action);

    switch (action.type) {
        case GET_CATEGORY:
            return {
                isLoading: false,
                categories: action.payload,
                error: null
            }
        case ADD_CATEGORY:
            return {
                isLoading: false,
                categories: state.categories.concat(action.payload),
                error: null
            }
        case DELETE_CATEGORY:
            return {
                isLoading: false,
                categories: state.categories.filter((v) => v.id !== action.payload),
                error: null
            }
        default:
            return state
    }
}