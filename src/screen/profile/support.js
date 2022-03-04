import React, { Component, useEffect,useMemo,useState } from 'react'
import { Text, View,FlatList,Image,TouchableOpacity,Dimensions } from 'react-native'
import { connect } from 'react-redux'
import Header from "../../component/header"
import chatUsers from '../../store/reducers/chatUsers'
import Chat from './chat'
import * as actions from "../../store/actions"
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../../component/loader'
import { call } from 'react-native-reanimated'
import {accountM,api} from "../../config/config.json"
import { useFocusEffect } from '@react-navigation/native';
import SearchIcon from "react-native-vector-icons/Fontisto"
import axios from "axios"
import { Input } from 'native-base'
import { TextInput } from 'react-native-gesture-handler'



const imagePath="https://api.outsourceinpakistan.com/uploads/client/"
const imageUserPath="https://api.outsourceinpakistan.com/uploads/user/"
function Support({fetchClients,chatUsers,navigation,clientInfo,updateReadedStatus,searchChats,getClientInfo}) {
    const [loading,setLoading]=useState(false)
    const [user,setUser]=useState("");
    const [page,setPage]=useState(0)
    const [totalPages,setTotalPages]=useState(0)
    const [call,setCall]=useState(true)
    const [text,setText]=useState("")

    async function getTotalPages(){
        const USER=await AsyncStorage.getItem('USER')
        const token=await AsyncStorage.getItem('token')
        axios.post(USER==="accountManager"?accountM+"/get_chat_users/"+page:api+"/get_chat_users",null,{headers:{
            Authorization:token
        }}).then(res=>{
            setTotalPages(res.data.data.total_pages)
        })
    }

    useEffect(()=>{

        getUser().then(()=>{
            getClientInfo()
            getTotalPages()
            console.log("call")
            fetchClients(page).then(()=>{
                setLoading(true)
            })
        })
    },[])

    function loadMore(){

        if(Number(totalPages)>page){
            setPage((ps)=>{
                return ps+10
            })
            fetchClients(page+10)
            
        }
    }

    function showSpinner(){
        if(Number(totalPages)>page && Number(totalPages)!=page ){
            return <Loader color="blue" size={30}/>
        }else{
            return null
        }

    }

    function messageUsers(){
        return chatUsers.map((u)=>{
            if(u.user_id){
                return user==="accountManager"?u.client_id:u.user_id
            }else{
                return user==="accountManager"?u.client_id:(u.role_id=="7"?u.lead_account_id:u.lead_sales_id)
            }
        })
    }

    function searchUsers(){
        if(text){
            setLoading(false)
        searchChats(text).then(()=>{
            setLoading(true)
            setText(false)
        })
        }
    }

    function renderUser({item}){
        if(!item.user_id){
            return(
                <TouchableOpacity 
                onPress={()=>{
                    navigation.push('chatContainer',{rec:{...item},rId:(user==="accountManager"?item.client_id:(item.role_id=="7"?item.lead_account_id:item.lead_sales_id)),sId:(user==="accountManager"?clientInfo.user_id:clientInfo.client_id),sName:(user==="accountManager"?clientInfo.user_name:clientInfo.client_name),sImage:(user==="accountManager"?clientInfo.user_image:clientInfo.client_image)})
                }}
                style={{flexDirection:'row',alignItems:'center',padding:10,borderBottomWidth:1,borderBottomColor:'lightgray',backgroundColor:'white'}}>
                    <Image
                    style={{width:40,height:40,borderRadius:40/2}}
                    source={user==="accountManager"?{uri:imagePath+item.client_image}:{uri:imageUserPath+item.user_image}}
                    />
                    <Text style={{marginLeft:20,color:'black',fontSize:15,textTransform:'capitalize',width:'40%'}}>{user==="accountManager"?item.client_name:item.user_name}</Text>
                </TouchableOpacity>
            )
        }
    }

    function renderResource({item}){
        if(item.user_id){
            return(
                <TouchableOpacity
                onPress={()=>{
                    navigation.push('chatContainer',{rec:{...item},rId:(user==="accountManager"?item.client_id:item.user_id),sId:(user==="accountManager"?clientInfo.user_id:clientInfo.client_id),sName:(user==="accountManager"?clientInfo.user_name:clientInfo.client_name),sImage:(user==="accountManager"?clientInfo.user_image:clientInfo.client_image)})
                }}
                style={{flexDirection:'row',alignItems:'center',padding:10,borderBottomWidth:1,borderBottomColor:'lightgray',backgroundColor:'white'}}>
                    <Image
                    style={{width:40,height:40,borderRadius:40/2}}
                    source={user==="accountManager"?{uri:imagePath+item.client_image}:{uri:imageUserPath+item.user_image}}
                    />
                    <Text style={{marginLeft:20,color:'black',fontSize:15,textTransform:'capitalize',width:'40%'}}>{user==="accountManager"?item.client_name:item.user_name}</Text>
                </TouchableOpacity>
            )
        }
    }
    async function getUser(){
        const USER=await AsyncStorage.getItem('USER')
        setCall(false)
        if(USER){
            setUser(USER)
        }
    }
    if(loading){
        return (
                <View style={{flex:1}}>
                    {user==="accountManager"?(
                    <View style={{width:'100%',marginLeft:'auto',marginRight:'auto',flexDirection:'row',justifyContent:'space-between',padding:10,marginTop:5,borderRadius:7}}>
                    <View
                    style={{flexDirection:'row',backgroundColor:'white',width:'80%',justifyContent:'flex-start',alignItems:'center',borderWidth:1,borderColor:'#bfbfbf',borderTopLeftRadius:7,borderBottomLeftRadius:7}}
                    >
                        <TextInput
                        style={{
                            marginLeft:5,
                            fontSize:16,
                            width:'100%'
                        }}
                        onChangeText={v=>setText(v)}
                        placeholder="search"
                        />
                    </View>
                    <TouchableOpacity 
                    onPress={searchUsers}
                    style={{backgroundColor:'#001441',height:50,width:'20%',justifyContent:'center',alignItems:'center',borderTopRightRadius:7,borderBottomRightRadius:7}}>
                        <SearchIcon
                        name="search"
                        size={20}
                        color="#ffffff"
                        />
                    </TouchableOpacity>
                </View>
                ):null}
                <View style={{flex:1}}>
                    {user==="accountManager"?null:(
                    <Text style={{fontSize:18,margin:10,color:'#001441',marginBottom:20}}>Support</Text>
                    )}
                    {chatUsers.length>0?(
                        <>
                        <FlatList
                        data={chatUsers}
                        renderItem={renderUser}
                        keyExtractor={(item,i)=>i.toString()}
                        onEndReached={user==="accountManager"?loadMore:null}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={user==="accountManager"?showSpinner:null}
                        />
                        {user==="accountManager"?null:(
                        <>
                        <Text style={{fontSize:18,margin:10,color:'#001441',marginBottom:20}}>Resources</Text>
                        {chatUsers[0].user_id?(
                        <FlatList
                        data={chatUsers}
                        renderItem={renderResource}
                        keyExtractor={(item,i)=>i.toString()}
                        />
                        ):(
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{fontSize:16,fontWeight:'700'}}>No resource asign</Text>
                            </View>
                        )}
                        </>
                        )}
                        </>
                    ):(
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:18,fontWeight:'bold'}}>Not Found</Text>
                        </View>
                    )}
                </View>
            </View>
        )
    }else{
        return <Loader size={25} color="blue"/>
    }
}

function mapStateToProps({chatUsers,clientInfo,limit,updateReadedStatus,unReadCount}){
return {chatUsers,clientInfo,limit,updateReadedStatus,unReadCount}
}

export default connect(mapStateToProps,actions)(Support);