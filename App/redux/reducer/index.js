import { combineReducers } from "redux";
import { counterReducer } from "./Counter.reducer";
import { categoryReducer } from "./category.reducer";
import { FierCategoryReducer } from "./fiercategory.reducer";
import { subCategoryData } from "../action/subcategory.action";
import { subcategoriesriducer } from "./subcategory.reducer";


export const rootReducer = combineReducers({
    count: counterReducer ,  //7
    category: categoryReducer,
    fiercategory:FierCategoryReducer,
    subcategorys:subcategoriesriducer
})