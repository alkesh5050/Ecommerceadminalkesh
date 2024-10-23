import { ADD_FIERCATEGORY, DELETE_FIERCATEGORY, GETDATAFIERCATEGORY, UPDATE_FIERCATEGORY } from "../ActionTypes"


const intialState = {
    isLoading: false,
    categories: [],
    error: null
}
export const FierCategoryReducer = (state = intialState, action) => {
    // console.log("actoin", action);
    switch (action.type) {
        case GETDATAFIERCATEGORY:
            return {
                isLoading: false,
                categories: action.payload,
                error: null
            }
        case ADD_FIERCATEGORY:
            return {
                isLoading: false,
                categories: state.categories.concat(action.payload),
                error: null
            }
        case DELETE_FIERCATEGORY:
            return {
                isLoading: false,
                categories: state.categories.filter((v) => v._id !== action.payload),
                error: null
            }
        case UPDATE_FIERCATEGORY:
            return {
                isLoading: false,
                categories: state.categories.map((v) => {
                    if (v._id === action.payload._id) {
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

