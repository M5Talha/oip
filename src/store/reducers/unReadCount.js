import {UN_READ_COUNT} from "../actions/types"
const initialState=[]


export default function unReadCounts(state=initialState,action){
    switch(action.type){
        case UN_READ_COUNT:
        return action.payload
        default:
        return state
    }
}