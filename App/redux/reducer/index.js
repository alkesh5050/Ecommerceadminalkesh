import { combineReducers } from "redux";
import { counterReducer } from "./Counter.reducer";
import { categoryReducer } from "./category.reducer";
import { FierCategoryReducer } from "./fiercategory.reducer";


export const rootReducer = combineReducers({
    count: counterReducer ,  //7
    category: categoryReducer,
    fiercategory:FierCategoryReducer
})