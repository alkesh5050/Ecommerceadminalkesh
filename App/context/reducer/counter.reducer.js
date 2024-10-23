import { DECREMENT, INCREMENT } from "../ActionTypes";


export const CounterReducer = (state , action) => {

    console.log('action -=: ',action);

    switch (action.payload) {
        case INCREMENT :
            return{
                count : action.payload
            }
        case DECREMENT :
            return{
                count : action.payload
            }


        default : return state

}
}