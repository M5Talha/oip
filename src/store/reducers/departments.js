import {GET_DEPART} from "../actions/types"
const initialState=[]


export default function departments(state=initialState,action){
    switch(action.type){
        case GET_DEPART:
        return action.payload.data.records
        default:
        return state
    }
}