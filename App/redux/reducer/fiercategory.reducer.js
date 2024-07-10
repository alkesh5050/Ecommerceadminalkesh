import { ADD_FIERCATEGORY, DELETE_FIERCATEGORY, GETDATAFIERCATEGORY } from "../ActionTypes"


const intialState = {
    isLoading: false,
    categories: [],
    error: null
}
export const FierCategoryReducer = (state = intialState, action) => {
    console.log("actoin", action);
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
                categories: state.categories.filter((v) => v.id !== action.payload),
                error: null
            }
        default:
            return state
    }
}

