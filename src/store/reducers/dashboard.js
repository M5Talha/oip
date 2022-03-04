import {DASHBOARD_DATA} from "../actions/types"
const initialState={
    data:{
        chartdatastatuswise:[]
    }
};


export default function dashboard(state=initialState,action){
    switch(action.type){
        case DASHBOARD_DATA:
        return action.payload
        default:
        return state
    }
}