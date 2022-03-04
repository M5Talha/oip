import {DEPARTURE_ANSWERE} from "../actions/types"
const initialState=[];

export default function departmentAnswers(state=initialState,action){
    switch(action.type){
        case DEPARTURE_ANSWERE:
        return action.payload
        default:
        return state
    }
}