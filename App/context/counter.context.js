import { createContext, useReducer } from "react"
import { CounterReducer } from "./reducer/counter.reducer";
import { DECREMENT, INCREMENT } from "./actiontypes";

const intialState = {
    count: 0 
}

export const CounterContext = createContext();

export const CounterProvider = ({ children }) => {

    const [state, dispatch] = useReducer(CounterReducer, intialState);

    const increment = (data) => {
        // console.log("dataaaa", data);
        
        dispatch({ type: INCREMENT, payload: data + 1 })
    }
    const decrement = (data) => {

        dispatch({ type: DECREMENT, payload: data - 1 })
    }

    return (
        <CounterContext.Provider
        value={{
            ...state,
            increment,
            decrement
        }}
        >
            { children }
        </CounterContext.Provider>
    )

} 