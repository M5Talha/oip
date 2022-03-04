import {CLEAR_PAYMENT, GET_PAYMENT,GET_PAYMENT_REFRESH} from "../actions/types"
import _ from "lodash"
const initialState=[];


export default function payment(state=initialState,action){
    switch(action.type){
        case GET_PAYMENT:
        return [...state,...action.payload]
        // return _.unionBy([...state,...action.payload],(pay)=>{
        //     return pay.client_payments_id
        // })
        case GET_PAYMENT_REFRESH:
            return action.payload
        case CLEAR_PAYMENT:
            return action.payload
        default:
        return state
    }
}