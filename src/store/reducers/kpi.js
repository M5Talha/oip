import {CLEAR_KPI, GET_KPI, REFRESH_KPI} from "../actions/types"
const initialState=[];


export default function kpi(state=initialState,action){
    switch(action.type){
        case GET_KPI:
        return [...state,...action.payload]
        case REFRESH_KPI:
            return action.payload
        case CLEAR_KPI:
            return action.payload
        default:
        return state
    }
}