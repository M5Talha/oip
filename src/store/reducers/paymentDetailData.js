import {PAYMENT_DETAIL} from "../actions/types"
const initialState=[{
    project_name:"loading...",
    project_type:"loading...",
    delivery_status:'loading...'
}];


export default function paymentDetailData(state=initialState,action){
    switch(action.type){
        case PAYMENT_DETAIL:
        return action.payload
        default:
        return state
    }
}