import { combineReducers } from "redux";
import { counterReducer } from "./Counter.reducer";
import { categoryReducer } from "./category.reducer";
import { FierCategoryReducer } from "./fiercategory.reducer";
import { subCategoryData } from "../action/subcategory.action";
import { subcategoriesriducer } from "./subcategory.reducer";
import { Productreducer } from "./product.reducer";
import BrandSlice from "../Slice/Brand.slice";





export const rootReducer = combineReducers({
    count: counterReducer ,  //7
    category: categoryReducer,
    fiercategory:FierCategoryReducer,
    subcategorys:subcategoriesriducer,
    products:Productreducer,
    brands:BrandSlice,
    
})