import {GET_QUESTIONS_DYNAMIC} from "../actions/types"
const initialState=[];


export default function questionDynamic(state=initialState,action){
    switch(action.type){
        case GET_QUESTIONS_DYNAMIC:
        return action.payload
        default:
        return state
    }
}