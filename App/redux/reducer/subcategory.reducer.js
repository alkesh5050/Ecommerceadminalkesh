import { ADDSUBCATEGORYDATA, DELETESUBCATEGORYDATA, GET_SUBCATEGORY, UPDATE_SUBCATEGORY } from "../ActionTypes";


const intialState = {
    isLoading: false,
    subcategories: [],
    error: null
}
export const subcategoriesriducer = (state = intialState, action) => {

    console.log("action", action);

    switch (action.type) {

        case ADDSUBCATEGORYDATA:
            return {
                isLoading: false,
                subcategories:  state.subcategories.concat(action.payload),
                error: null
            }
            case GET_SUBCATEGORY:
                return {
                    isLoading: false,
                    subcategories: action.payload,
                    error: null
                }
        case DELETESUBCATEGORYDATA:
            return {
                isLoading: false,
                subcategories: state.subcategories.filter((v) => v.id !== action.payload),
                error: null
            }
        case UPDATE_SUBCATEGORY:
            return {
                isLoading: false,
                subcategories: state.subcategories.map((v) => {
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