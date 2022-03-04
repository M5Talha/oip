import {GET_CLIENT_INFO} from "../actions/types"
const initialState={
    client_name:"",
        client_image:"",
        client_image_path:"",
        client_address:"",
        client_email:"",
        client_phone_number:"",
};


export default function clientInfo(state=initialState,action){
    switch(action.type){
        case GET_CLIENT_INFO:
        return action.payload.data
        default:
        return state
    }
}