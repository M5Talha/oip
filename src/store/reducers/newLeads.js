import {GET_NEW_LEADS} from "../actions/types"
const initialState=[];


export default function newLeads(state=initialState,action){
    switch(action.type){
        case GET_NEW_LEADS:
        return action.payload.length>0?[...state,...action.payload]:state
        default:
        return state
    }
}