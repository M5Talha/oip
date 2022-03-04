import {SEE_ONLY} from "../actions/types"
const initialState="";


export default function seeOnly(state=initialState,action){
    switch(action.type){
        case SEE_ONLY:
        return action.payload
        default:
        return state
    }
}