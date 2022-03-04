import {GET_PAID_LEADS} from "../actions/types"
const initialState=[];


export default function paidLeads(state=initialState,action){
    switch(action.type){
        case GET_PAID_LEADS:
        return action.payload.length>0?[...state,...action.payload]:state
        console.log(action.payload)
        default:
        return state
    }
}