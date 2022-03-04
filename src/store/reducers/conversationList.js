import {CONVERSATION_LIST,CONVERSATION_LIST_API} from "../actions/types"
const initialState=[];


export default function conversationList(state=initialState,action){
    switch(action.type){
        case CONVERSATION_LIST:
        return action.payload
        default:
        return state
    }
}