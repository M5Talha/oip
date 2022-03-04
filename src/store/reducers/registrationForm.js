import {GET_REG_FORM} from "../actions/types"
const initialState={};


export default function registrationForm(state=initialState,action){
    switch(action.type){
        case GET_REG_FORM:
        return {...state,...action.payload}
        default:
        return state
    }
}