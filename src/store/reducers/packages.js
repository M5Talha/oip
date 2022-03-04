import {GET_PACKAGES} from "../actions/types"
const initialState=[]


export default function packages(state=initialState,action){
    switch(action.type){
        case GET_PACKAGES:
        return action.payload
        default:
        return state
    }
}