import {CLEAR_PROJECTS, GET_MY_PROJECTS, GET_PROJECT_REFRESH} from "../actions/types"
import _ from "lodash"
const initialState=[];


export default function myProjects(state=initialState,action){
    switch(action.type){
        case GET_MY_PROJECTS:
        return [...state,...action.payload]
        // return _.unionBy(action.payload.length>0?[...state,...action.payload]:state,function(item){
        //     return item.client_projects_id
        // })
        case GET_PROJECT_REFRESH:
            return action.payload
            // return _.unionBy(action.payload,function(item){
            //     return item.client_projects_id
            // })

        case CLEAR_PROJECTS:
            return action.payload
        default:
        return state
    }
}