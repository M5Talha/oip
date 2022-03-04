import {GET_DAHSBOARD_DEPARTMENT} from "../actions/types"
const initialState=[]


export default function dashboardDepartment(state=initialState,action){
    switch(action.type){
        case GET_DAHSBOARD_DEPARTMENT:
        return action.payload.data.records
        default:
        return state
    }
}