
import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import { rootReducer } from "./reducer";

export const configureStore = () => {
    const store = createStore(rootReducer, applyMiddleware(thunk));  //8
 
    return store
}