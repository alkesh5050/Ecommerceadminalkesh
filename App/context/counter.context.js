import { createContext } from "react"
import { DECREMENT, INCREMENT } from "./ActionTypes";
import { CounterReducer } from "./reducer/counter.reducer";

const intialState = {
    count: 0
}

export const countercontext = createContext();

export const counterprovider = () => {

    const [state, dispatch] = useReducer(CounterReducer, intialState);

    const increment = (data) => {

        dispatch({ type: INCREMENT, payload: data + 1 })
    }
    const decrement = (data) => {

        dispatch({ type: DECREMENT, payload: data - 1 })
    }
}