import { combineReducers } from "redux";
import { counterReducer } from "./Counter.reducer";


export const rootReducer = combineReducers({
    count: counterReducer ,  //7
    
})