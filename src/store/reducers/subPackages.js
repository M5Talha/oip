import {GET_SUB_CATEGORY} from "../actions/types"
const initialState=[]


export default function subPackages(state=initialState,action){
    switch(action.type){
        case GET_SUB_CATEGORY:
        return action.payload
        default:
        return state
    }
}