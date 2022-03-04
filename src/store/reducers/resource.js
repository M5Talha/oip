import {GET_RESOURCE} from "../actions/types"
const initialState=[];


export default function resource(state=initialState,action){
    switch(action.type){
        case GET_RESOURCE:
        return action.payload
        default:
        return state
    }
}