import {GET_SALE_RESOURCE} from "../actions/types"
const initialState=[
];


export default function resource(state=initialState,action){
    switch(action.type){
        case GET_SALE_RESOURCE:
        return action.payload
        default:
        return state
    }
}