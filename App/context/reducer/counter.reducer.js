import { DECREMENT, INCREMENT } from "../actiontypes";


export const CounterReducer = (state , action) => {

    // console.log('action -=: ',action);

    switch (action.type) {
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