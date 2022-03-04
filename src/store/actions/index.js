import {
    IS_LOGIN,
    CURRENT_USER,
    DASHBOARD_DATA,
    GET_REG_FORM,
    GET_MY_PROJECTS,
    GET_PAYMENT,
    GET_CLIENT_INFO,
    PAYMENT_DETAIL,
    PROJECT_DETAIL,
    GET_RESOURCE,
    GET_KPI,
    GET_CLIENTS,
    CHAT_USERS,
    GET_NEW_LEADS,
    GET_PAID_LEADS,
    GET_SALE_RESOURCE,
    GET_PROJECT_REFRESH,
    CLEAR_KPI,
    CLEAR_PROJECTS,
    CLEAR_PAYMENT,
    DEPARTURE_ANSWERE,
    GET_DEPART,
    GET_PACKAGES,
    GET_SUB_CATEGORY,
    A_CHAT,
    SEARCH_CHAT,
    CONVERSATION_LIST,
    GET_MOBILE_TOKEN,
    GET_PAYMENT_REFRESH,
    REFRESH_KPI,
    GET_DAHSBOARD_DEPARTMENT,
    GET_QUESTIONS_DYNAMIC,
    FETCH_MESSAGES,
    FETCH_USER,
    CLEAR_CHAT
} from "./types"
import firestore, { firebase } from '@react-native-firebase/firestore';
import {api,accountM,baseUrlSocket} from "../../config/config.json";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';

export const getCurrentUser=({email,password},loadingTrue,loadingFalse,logIn)=>async(dispatch)=>{

    const USER=await AsyncStorage.getItem('USER')
    loadingTrue();
    await AsyncStorage.setItem('password',password)
    await AsyncStorage.setItem('email',email)

    axios.post(`${USER==="accountManager"?accountM:api}/login`,{
        email,
        password
    }).then((res)=>{
        AsyncStorage.setItem('token',res.data.data.token).then(()=>{
            loadingFalse()
            logIn(true)
            dispatch({
                type:CURRENT_USER,
                payload:res.data
            })
        })
    }).catch((error)=>{
        dispatch({
            type:CURRENT_USER,
            payload:error.response.data
        })
        loadingFalse()
    })
}


export const socialLogin=(socialId,name,email,logIn,sLoading)=>async(dispatch)=>{
    sLoading(true)

    const bodyForm=new FormData()
    bodyForm.append('client_name', name);
    bodyForm.append('client_email', email);
    bodyForm.append('social_id', socialId);

    const res= await axios.post(`${api}/social-login`,bodyForm)

    AsyncStorage.setItem('token',res.data.data.token).then(()=>{
        logIn(true)
        dispatch({
            type:CURRENT_USER,
            payload:res.data
        })
    })
    sLoading(false)
}

export const checkExpireToken=(ifUserExsit,updateLoading)=>async(dispatch)=>{

        const USER=await AsyncStorage.getItem('USER')
    
        const token=await AsyncStorage.getItem('token')
    
        if(token){
            try{
                const res=await axios.get(`${USER==="accountManager"?accountM:api}/dashboard`,{
                    headers:{
                        Authorization:token
                    }
                })
                ifUserExsit()
            }
            catch(error){
                
                await AsyncStorage.removeItem('token');
                    await AsyncStorage.removeItem('password');
                    await AsyncStorage.removeItem('email');
                    await AsyncStorage.removeItem('notificationToken')
                    dispatch({
                        type:'USER_LOGGED_OUT',
                        payload:{}
                    })
                    dispatch({
                        type:false,
                        payload:false
                    })
            }
        }else{
            updateLoading()
        }

}


export const login=(condition,func)=>async(dispatch)=>{

    if(!condition){
            console.log("not social currentuser")
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('password');
            await AsyncStorage.removeItem('email');
            await AsyncStorage.removeItem('notificationToken')
            func()
            dispatch({
                type:'USER_LOGGED_OUT',
                payload:{}
            })
        }   
    dispatch({
        type:IS_LOGIN,
        payload:condition
    })
}


export const dashboardData=()=>async(dispatch)=>{

    const USER=await AsyncStorage.getItem('USER')

    const token=await AsyncStorage.getItem('token')
    const res=await axios.get(`${USER==="accountManager"?accountM:api}/dashboard`,{
        headers:{
            Authorization:token
        }
    })

    dispatch({
        type:DASHBOARD_DATA,
        payload:res.data
    })
}
export const sendNotificationToken=(fcm)=>async(dispatch)=>{
    const USER=await AsyncStorage.getItem('USER')
    const token=await AsyncStorage.getItem('token')

    const res=await axios.post(`${USER==="accountManager"?accountM:api}/update_mobile_token`,{
        token:fcm
    },{
        headers:{
            Authorization:token
        }
    })
}

export const getRegFields=(fields)=>async(dispatch)=>{
    dispatch({
        type:GET_REG_FORM,
        payload:fields
    })
}

export const getRegData=(data,loadingTrue,loadingFalse,logIn)=>async(dispatch)=>{
    loadingTrue();
    await AsyncStorage.setItem('password',data.client_password)
    await AsyncStorage.setItem('email',data.client_email)
    axios.post(`${api}/register_client`,data).then((res)=>{
        AsyncStorage.setItem('token',res.data.data.token).then(()=>{
            loadingFalse()
            logIn(true)
            dispatch({
                type:CURRENT_USER,
                payload:res.data
            })
        })
        console.log("hell",res)
    }).catch((error)=>{
        dispatch({
            type:CURRENT_USER,
            payload:error.response.data
        })
        loadingFalse()
    })
}


export const getMyProjects=(page,search_text)=>async(dispatch)=>{
    console.log("call Project",page)
    const USER=await AsyncStorage.getItem('USER')
    const token=await AsyncStorage.getItem('token')
    const res=await axios.post(`${USER==="accountManager"?accountM+'/all_projects':api+'/client_projects'}/${page}`,{
        search_text
    },{
        headers:{
            Authorization:token
        }
    })

    dispatch({
        type:GET_MY_PROJECTS,
        payload:res.data.data.results
    })
}
export const refreshProjects=(search_text)=>async(dispatch)=>{
    console.log("call refresh project")
    const USER=await AsyncStorage.getItem('USER')
    const token=await AsyncStorage.getItem('token')
    const res=await axios.post(`${USER==="accountManager"?accountM+'/all_projects':api+'/client_projects'}/${0}`,{
        search_text
    },{
        headers:{
            Authorization:token
        }
    })
    dispatch({
        type:GET_PROJECT_REFRESH,
        payload:res.data.data.results
    })
}

export const createProjectByForm=(data,loadingfalse,showModel)=>async(dispatch)=>{
    const USER=await AsyncStorage.getItem('USER')
    const token=await AsyncStorage.getItem('token')

    console.log("ssss",data)
    console.log('hellow')
    const bodyForm=new FormData();

    for (const [key, value] of Object.entries(data)) {
        bodyForm.append(key, value);
      }

    // console.log(bodyForm)
    const res=await axios.post(`${USER==="accountManager"?accountM:api}/add_package_project`,bodyForm,{
        headers:{
            Authorization:token
        }
    })
    console.log('add project',res.data)
    if(res.data.success===true){
        showModel()
        loadingfalse()
    }
}

export const createProject=(data,loadingfalse,showModel)=>async(dispatch)=>{
    const USER=await AsyncStorage.getItem('USER')
    const token=await AsyncStorage.getItem('token')

    console.log(data)
    const bodyForm=new FormData();

    for (const [key, value] of Object.entries(data)) {
        bodyForm.append(key, value);
      }

    console.log(bodyForm)
    const res=await axios.post(`${USER==="accountManager"?accountM:api}/add-project`,bodyForm,{
        headers:{
            Authorization:token
        }
    })
    console.log('add project',res.data)
    if(res.data.success===true){
        showModel()
        loadingfalse()
    }
}

export const getPayment=(page,search_text)=>async(dispatch)=>{
    const USER=await AsyncStorage.getItem('USER')
    const token=await AsyncStorage.getItem('token')
    const res=await axios.post(`${USER==="accountManager"?accountM+'/client_payments':api+'/client_payments'}/${page}`,{
        search_text
    },{
        headers:{
            Authorization:token
        }
    })
    dispatch({
        type:GET_PAYMENT,
        payload:res.data.data.results
    })
}

export const refreshPayments=(page,search_text)=>async(dispatch)=>{
    const USER=await AsyncStorage.getItem('USER')
    const token=await AsyncStorage.getItem('token')
    const res=await axios.post(`${USER==="accountManager"?accountM+'/client_payments':api+'/client_payments'}/${0}`,{
        search_text
    },{
        headers:{
            Authorization:token
        }
    })
    dispatch({
        type:GET_PAYMENT_REFRESH,
        payload:res.data.data.results
    })
}


export const getMyProjectDetails=(id)=>async(disptach)=>{

    if(id){
        const USER=await AsyncStorage.getItem('USER')
        const token=await AsyncStorage.getItem('token')
        const res=await axios.get(`${USER==="accountManager"?accountM+'/project_details':api+'/project_details'}/${id}`,{
            headers:{
                Authorization:token
            }
        })
        disptach({
            type:PROJECT_DETAIL,
            payload:res.data.data
        })
    }
}

export const getClientInfo=()=>async(disptach)=>{



    const USER=await AsyncStorage.getItem('USER')
    // if(currentUser){
    //     const bodyForm=new FormData()
    //     bodyForm.append('client_name', currentUser.user.name);
    //     bodyForm.append('client_email', currentUser.user.email);
    //     bodyForm.append('social_id', currentUser.user.id);
    //     const res= await axios.post(`${api}/social-login`,bodyForm)
        
    //     disptach({
    //         type:GET_CLIENT_INFO,
    //         payload:res.data
    //     })
    // }
    // else if(fbToken){
    //     function initUser(token) {
    //         fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
    //         .then((response) => response.json())
    //         .then(async(user) => {  
    //          const bodyForm=new FormData()
    //          bodyForm.append('client_name', user.name);
    //          bodyForm.append('client_email',user.email);
    //          bodyForm.append('social_id', user.id);
    //          const res= await axios.post(`${api}/social-login`,bodyForm)
             
    //          disptach({
    //              type:GET_CLIENT_INFO,
    //              payload:res.data
    //          })
    //         })
    //         .catch(() => {
    //           alert("something went wrong")
    //         })
    //     }

    //     AccessToken.getCurrentAccessToken().then((data) => {
    //         const { accessToken } = data
    //         initUser(accessToken)
    //     })
            
    // }
    // else{
        const password=await AsyncStorage.getItem('password');
        const email=await AsyncStorage.getItem('email');
    
    
    
        const res=await axios.post(`${USER==="accountManager"?accountM:api}/login`,{
            email,
            password
        })
        disptach({
            type:GET_CLIENT_INFO,
            payload:res.data
        })
    // }


}

export const getEmail=(email,loadingFalse,showModel)=>async(disptach)=>{
    const res=await axios.post(`${api}/forget_password`,{email})
    if(res.data.success===true){
        showModel()
        loadingFalse()
    }
}

export const editProfile=(data,loadingFalse,showModel)=>async(disptach)=>{

    const USER=await AsyncStorage.getItem('USER')
    const bodyForm=new FormData()

    if(USER==="accountManager"){
        data.client_image.type?(
            bodyForm.append('user_image', {
                type:data.client_image.type,
                uri:data.client_image.uri,
                name:data.client_image.fileName
            })):null;
        
            bodyForm.append('user_name', data.user_name);
            bodyForm.append('user_phone', data.user_phone);
            bodyForm.append('user_address', data.user_address);
    }else{
        data.client_image.type?(
            bodyForm.append('client_image', {
                type:data.client_image.type,
                uri:data.client_image.uri,
                name:data.client_image.fileName
            })):null;
        
            bodyForm.append('client_name', data.client_name);
            bodyForm.append('client_address', data.client_address);
            bodyForm.append('client_phone_number', data.client_phone_number);
    }

    const token=await AsyncStorage.getItem('token')
    const res=await axios.post(`${USER==="accountManager"?accountM:api}/${USER==="accountManager"?'edit_user':'edit-client'}`,
    bodyForm,
    {
        headers:{
            "Content-Type": "multipart/form-data; charset=utf-8;",
            Authorization:token,
        }
    })

    if(res.data.success===true){
       showModel()
        loadingFalse()

    }else{
        alert("something goes wrong")
    }

}

export const projectDetail=(id)=>async(dispatch)=>{
    const USER=await AsyncStorage.getItem('USER')
    const token=await AsyncStorage.getItem('token')
    
    const res= await axios.get(`${USER==="accountManager"?accountM+"/user_payment_details":api+"/client_payment_details"}/${id}`,{
        headers:{
            Authorization:token
        }
    });

    dispatch({
        type:PAYMENT_DETAIL,
        payload:res.data.data.records_projects
    })
}

export const addComment=(id,text,file,image)=>async(disptach)=>{
    const bodyForm=new FormData()
    bodyForm.append('comments_text', text);
    bodyForm.append('project_id', id);
    console.log(file)
    console.log(image)
    if(file){
        for (var i = 0; i < file.length; i++) { 

            bodyForm.append(`comments_files_file[]`, file[i]);
    
          }
    }
    if(image){
        for (var i = 0; i < image.length; i++) { 
            bodyForm.append("comments_images_img[]", image[i]);
          }
    }

    const token=await AsyncStorage.getItem('token')
    const USER=await AsyncStorage.getItem('USER')
    // console.log(`${USER==="accountManager"?accountM+"/reply_comment":api+"/reply_comment"}`)
    // console.log(bodyForm)
    const res= await axios.post(`${USER==="accountManager"?accountM+"/reply_comment":api+"/reply_comment"}`,bodyForm,{
        headers:{
            Authorization:token
        }
    });
}


export const payNow=(data,project_id,renderLoading,renderModel)=>async(disptach)=>{

    data={...data,project_id:project_id}
    const token=await AsyncStorage.getItem('token')
    const res= await axios.post(`https://api.outsourceinpakistan.com/Api/paynow`,data,{
        headers:{
            Authorization:token
        }
    });
    console.log('aa',res.data)
    renderLoading(false)
    renderModel(true)

}   

export const getResource=()=>async(disptach)=>{

    const USER=await AsyncStorage.getItem('USER')
    const token=await AsyncStorage.getItem('token')
    const res= await axios.get(`${USER==="accountManager"?accountM:api}/assigned_resources`,{
        headers:{
            Authorization:token
        }
    });

    disptach({
        type:GET_RESOURCE,
        payload:res.data.data
    })
}
export const clearKpi=()=>async(disptach)=>{
    disptach({
        type:CLEAR_KPI,
        payload:[]
    })
}
export const clearPayments=()=>async(disptach)=>{
    disptach({
        type:CLEAR_PAYMENT,
        payload:[]
    })
}
export const getKpi=(id,page,from_date,to_date)=>async(disptach)=>{
    console.log("call kpi",page)
    const USER=await AsyncStorage.getItem('USER')
    const token=await AsyncStorage.getItem('token')
    const res= await axios.post(`${USER==="accountManager"?accountM:api}/kpi/${id}/${page}`,{
        from_date,
        to_date
    },{
        headers:{
            Authorization:token
        }
    });
    disptach({
        type:GET_KPI,
        payload:res.data.data.results
    })
}
export const refreshkpis=(id)=>async(dispatch)=>{
    const USER=await AsyncStorage.getItem('USER')
    const token=await AsyncStorage.getItem('token')
    const res=await axios.post(`${USER==="accountManager"?accountM:api}/kpi/${id}/${0}`,null,{
        headers:{
            Authorization:token
        }
    })
    dispatch({
        type:REFRESH_KPI,
        payload:res.data.data.results
    })
}
export const getClients=(id)=>async(disptach)=>{
    const token=await AsyncStorage.getItem('token')
    const res= await axios.get(`${accountM}/get_all_clients/${id}`,{
        headers:{
            Authorization:token
        }
    });
    disptach({
        type:GET_CLIENTS,
        payload:res.data.data
    })
}

export const fetchClients=(page)=>async(disptach)=>{

    console.log(page)
    const USER=await AsyncStorage.getItem('USER')
    const token=await AsyncStorage.getItem('token')

    const res= await axios.post(USER==="accountManager"?accountM+"/get_chat_users/"+page:api+"/get_chat_users",null,{
        headers:{
            Authorization:token
        }
    });

    if(USER==="accountManager"){
        disptach({
            type:A_CHAT,
            payload:res.data.data.results
        })
    }else{
        disptach({
            type:CHAT_USERS,
            payload:[...res.data.data.users,...res.data.data.resources]
        })
    }

}

export const searchChats=(text)=>async(disptach)=>{
    const USER=await AsyncStorage.getItem('USER')
    const token=await AsyncStorage.getItem('token')

    const res= await axios.post(accountM+"/get_chat_users",{
        search_text:text
    },{
        headers:{
            Authorization:token
        }
    });

        disptach({
            type:SEARCH_CHAT,
            payload:res.data.data.results
        })

}




export const clearProjects=()=>async(disptach)=>{


    disptach({
        type:CLEAR_PROJECTS,
        payload:[]
    })

}

export const getNewLeads=(page)=>async(dispatch)=>{
    const token=await AsyncStorage.getItem('token')
    const res=await axios.post(`${accountM}/assigned_leads/${page}`,null,{
        headers:{
            Authorization:token
        }
    })
    dispatch({
        type:GET_NEW_LEADS,
        payload:res.data.data.results
    })
}

export const getPaidLeads=(page)=>async(dispatch)=>{
    const token=await AsyncStorage.getItem('token')
    const res=await axios.post(`${accountM}/paid_leads/${page}`,null,{
        headers:{
            Authorization:token
        }
    })
    dispatch({
        type:GET_PAID_LEADS,
        payload:res.data.data.results
    })
}

export const getSaleResource=(page)=>async(dispatch)=>{
    const token=await AsyncStorage.getItem('token')
    const res=await axios.get(`${accountM}/get_sales_resource`,{
        headers:{
            Authorization:token
        }
    })
    dispatch({
        type:GET_SALE_RESOURCE,
        payload:res.data.data
    })
}

export const getProjectBrief=(dId,pId)=>async(disptach)=>{ 

    const token=await AsyncStorage.getItem('token')
    const res= await axios.post(`${api}/department_answer`,{
        department_id:dId,
        projects_id:pId
    },{
        headers:{
            Authorization:token
        }
    });

    disptach({
        type:DEPARTURE_ANSWERE,
        payload:res.data.data.department_answer
    })
}

export const getConversationList=(senderId ,senderType)=>async(dispatch)=>{
    console.log(senderId,"ddsss")
    console.log(senderType,"t")
    const res=await axios.post(baseUrlSocket+'/api/users/getConversationsList',{senderId,senderType})
    dispatch({
        type:CONVERSATION_LIST,
        payload:res.data.data
    })

}


export const getDepartments=()=>async(dispatch)=>{
    const token=await AsyncStorage.getItem('token')
    const res=await axios.get(`${api}/get_departments`,{
        headers:{
            Authorization:token
        }
    })
    dispatch({
        type:GET_DEPART,
        payload:res.data
    })
}

export const getDashboardDepartments=()=>async(dispatch)=>{
    const token=await AsyncStorage.getItem('token')
    const res=await axios.get(`${api}/get_dashboard_departments`,{
        headers:{
            Authorization:token
        }
    })
    dispatch({
        type:GET_DAHSBOARD_DEPARTMENT,
        payload:res.data
    })
}

export const getPackages=(id)=>async(dispatch)=>{
    const token=await AsyncStorage.getItem('token')
    const res=await axios.get(`${api}/get_packages/${id}`,{
        headers:{
            Authorization:token
        }
    })
    dispatch({
        type:GET_PACKAGES,
        payload:res.data.data.records
    })
}

export const getSubPackages=(id)=>async(dispatch)=>{
    console.log(id)
    const token=await AsyncStorage.getItem('token')
    const res=await axios.get(`${api}/get_sub_packages/${id}`,{
        headers:{
            Authorization:token
        }
    })
    dispatch({
        type:GET_SUB_CATEGORY,
        payload:res.data.data.records
    })
}


export const getMobileToken=(id,title,body)=>async(dispatch)=>{

    console.log(id,title,body)
    const token=await AsyncStorage.getItem('token')
    const USER=await AsyncStorage.getItem('USER')
    const res=await axios.post(api+(USER==="accountManager"?"/get_client_token":"/get_user_token"),{
        [USER==="accountManager"?"client_id":"user_id"]:id
    },{
        headers:{
            Authorization:token
        }
    })
    console.log("data",res.data.data[0].mobile_token)

    if(res.data.data[0].mobile_token && !res.data.data[0].mobile_token=="0"){
        const res2=await axios.post('https://fcm.googleapis.com/fcm/send',{
          "to":res.data.data[0].mobile_token,
          "collapse_key":title,
          "notification":{
            "body":body,
            "title":title
          }
      },{
        headers:{
          "Content-Type": "application/json",
          "Authorization":"key=AAAAcYJxkb8:APA91bGh4m9GAbrDvLoPn3akiSED2CEn-YRHCywllyfklUqxN0n1MBNSt8creo3C63xfLIqMMsMRe3gaLHFnyyYQjzYed3xgZ_8KcvlRjyueqVIX6jK-MfutLjo6Pqvd_W5UP1kfQbEJ"
        }
      }).then(r=>console.log(r.data))
      }
}


export const getQuestionDynamic=(projectType)=>async(dispatch)=>{
    const token=await AsyncStorage.getItem('token')
    const res=await axios.get(`${api}/get_question/${projectType}`,{
        headers:{
            Authorization:token
        }
    })
    dispatch({
        type:GET_QUESTIONS_DYNAMIC,
        payload:res.data.data.records
    })
}


//chat start


export const sendMessage=(message,userId,rec,userName,url)=>async dispatch=>{
    function mergeId(id1,id2){
        if(id1<id2){
            return id1+id2
        }else{
            return id2+id1
        }
    }
    firestore().collection("chat").doc("conversation").collection(mergeId(userId.toString(),rec.id.toString())).add({...message[0],timeStamp:firestore.FieldValue.serverTimestamp(),received:false,userId:message[0].user._id})
    firestore().collection("chat").doc("user").collection(rec.id).where('id','==',userId).get().then((res)=>{
        if(!res.size){
            // add
            // firestore().collection("userList").add({id:rec.id})
            firestore().collection("chat").doc("conversation").collection(mergeId(userId.toString(),rec.id.toString())).where('received','==',false).where('userId','==',userId).get().then((res2)=>{
                firestore().collection("chat").doc("conversation").collection(mergeId(userId.toString(),rec.id.toString())).orderBy('createdAt','asc').limit(1).get().then((res3)=>{
                    res3.forEach((snap)=>{
                        firestore().collection("chat").doc("user").collection(rec.id).add({name:userName,id:userId,url:url,count:res2.size,message:snap.data()})
                    })
                })
            })
            // firestore().collection("chat").doc("user").collection(message[0].user.name).add({...message[0],received:false,count:res2.size})
        }else{
            const batch=firestore().batch()
            firestore().collection("chat").doc("conversation").collection(mergeId(userId.toString(),rec.id.toString())).where('received','==',false).where('userId','==',userId).get().then((res2)=>{
                firestore().collection("chat").doc("conversation").collection(mergeId(userId,rec.id.toString())).orderBy('createdAt','desc').limit(1).get().then((res3)=>{
                    res3.forEach((snap)=>{
                        firestore().collection("chat").doc("user").collection(rec.id).where("id","==",userId).get().then((userFromList)=>{
                            userFromList.forEach((snapData)=>{
                                snapData.ref.set({name:userName,id:userId,url:url,count:res2.size,message:snap.data()})
                            })
                        })
                    })
                })
            })
        }
    })




    firestore().collection("chat").doc("user").collection(userId).where('id','==',rec.id).get().then((res)=>{
        if(!res.size){
            //add
            // firestore().collection("userList").add({id:userId})
            firestore().collection("chat").doc("conversation").collection(mergeId(userId.toString(),rec.id.toString())).where('received','==',false).where('userId','==',rec.id).get().then((res2)=>{
                firestore().collection("chat").doc("conversation").collection(mergeId(userId.toString(),rec.id.toString())).orderBy('createdAt','asc').limit(1).get().then((res3)=>{
                    res3.forEach((snap)=>{
                        firestore().collection("chat").doc("user").collection(userId).add({...rec,count:res2.size,message:snap.data()})
                    })
                })
            })
            // firestore().collection("chat").doc("user").collection(message[0].user.name).add({...message[0],received:false,count:res2.size})
        }else{
            firestore().collection("chat").doc("conversation").collection(mergeId(userId,rec.id.toString())).where('received','==',false).where('userId','==',rec.id).get().then((res2)=>{

                firestore().collection("chat").doc("conversation").collection(mergeId(userId,rec.id.toString())).orderBy('createdAt','desc').limit(1).get().then((res3)=>{
                    res3.forEach((snap)=>{
                        firestore().collection("chat").doc("user").collection(userId).where("id","==",rec.id).get().then((userFromList)=>{
                            userFromList.forEach((snapData)=>{
                                snapData.ref.set({...rec,count:res2.size,message:snap.data()})
                            })
                        })
                    })
                })
            })
        }
    })
    
}

export const getMessages=(userId,recId,date,readMessages)=>async dispatch=>{
    function mergeId(id1,id2){
        if(id1<id2){
            return id1+id2
        }else{
            return id2+id1
        }
    }
    const unSubscribe=firestore().collection('chat').doc("conversation").collection(mergeId(userId,recId.toString())).orderBy("timeStamp","desc").startAfter(date?date:"11").limit(15).onSnapshot((documentSnapshot)=>{
        readMessages()
        const data=[]
        if(documentSnapshot.size){
            documentSnapshot.forEach((snap)=>{
                data.push(snap.data())
            })
        }
        if(data.length>0){
            if(data[0].timeStamp){
                dispatch({
                    type:FETCH_MESSAGES,
                    payload:data
                })
            }
        }
    })
    return  unSubscribe
}

export const clearChat=()=>async dispatch=>{
    dispatch({
        type:CLEAR_CHAT,
        payload:[]
    })
}


export const getChatUsers=(userName,userId)=>async dispatch=>{
    console.log("Datauser0",userId)

    if(userId){
        firestore().collection('chat').doc("user").collection(userId.toString()).onSnapshot((documentSnapshot)=>{
            const data=[]
            if(documentSnapshot.size){
                documentSnapshot.forEach((snap)=>{
                    data.push(snap.data())
                })
            }
            dispatch({
                type:FETCH_USER,
                payload:data
            })
        })
    }
}

export const readMessages=(userId,recId,userName,recName)=>async dispatch=>{
    function mergeId(id1,id2){
        if(id1<id2){
            return id1+id2
        }else{
            return id2+id1
        }
    }
    firestore().collection("chat").doc("user").collection(userId).where("name","==",recName).get().then(data=>{
        if(data.size){
            data.forEach(snap=>{
                snap.ref.update({count:0})
            })
        }

    })
    firestore().collection("chat").doc("conversation").collection(mergeId(userId.toString(),recId.toString())).where("userId","==",recId).get().then(data=>{
        data.forEach(snap=>{
            snap.ref.update({received:true})
        })

    })
    

}

export const setOnlineStatus=(user)=>async dispatch=>{

        const reference = database().ref(`/onlineUsers/${user.id.toString()}`)
        .set(user).then(()=>{
            console.log("set data")
        }).catch(err=>console.log("eer",err))
        console.log(user)
        // firestore().collection("chat").doc("onlineUsers").collection(user.name+user.id).doc('status').set(user)
        database().ref(`/onlineUsers/${user.id.toString()}`).onDisconnect().remove().then(()=>{
            console.log("remove")
        })
}

export const removeOnlineStatus=(id)=>async dispatch=>{
    console.log('dd',id)
    await database().ref(`/onlineUsers/${id.toString()}`).remove()
}