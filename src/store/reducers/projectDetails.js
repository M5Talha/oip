import {PROJECT_DETAIL,ADD_COMMENT} from "../actions/types"
const initialState={
    comments:[],
    department_answer:[],
    records:[{}]

};


export default function payment(state=initialState,action){
    switch(action.type){
        case PROJECT_DETAIL:
        return action.payload
        case ADD_COMMENT:
        return {...state,comments:[...action.payload,...state.comments]}
        default:
        return state
    }
}