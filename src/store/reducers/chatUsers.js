import {CHAT_USERS,A_CHAT,SEARCH_CHAT} from "../actions/types"
import _ from  "lodash"
const initialState=[]


export default function chatUsers(state=initialState,action){
    switch(action.type){
        case CHAT_USERS:
        return action.payload
        case A_CHAT:
            return  _.unionBy([...state,...action.payload],function(item){
                return item.client_id
            })
        case SEARCH_CHAT:
            return action.payload
        default:
        return state
    }
}