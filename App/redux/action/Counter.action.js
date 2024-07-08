import { decrementcounter, incrementcounter } from "../ActionTypes"

//3
 export const increment =()=>(dispatch)=>{
    dispatch({type:incrementcounter})
}

 export const dicrement =()=>(dispatch)=>{
    dispatch({type:decrementcounter})
    
}
