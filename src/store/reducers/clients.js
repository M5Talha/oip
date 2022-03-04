import {GET_CLIENTS} from "../actions/types"
const initialState=[];


export default function clients(state=initialState,action){
    switch(action.type){
        case GET_CLIENTS:
        return action.payload
        default:
        return state
    }
}