
import {LOGIN,IS_LOGIN} from "../actions/types"

const initialState=false;

export default function isLogin(state=initialState,action){
    switch(action.type){
        case IS_LOGIN:
            return action.payload
    default :
    return state
    }

}