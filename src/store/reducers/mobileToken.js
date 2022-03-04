import {GET_MOBILE_TOKEN} from "../actions/types"
const initialState=0;


export default function mobileToken(state=initialState,action){
    switch(action.type){
        case GET_MOBILE_TOKEN:
        return action.payload
        default:
        return state
    }
}