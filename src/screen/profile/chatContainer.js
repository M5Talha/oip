import React, { Component, useEffect,useState } from 'react'
import { Text, View,FlatList,Image } from 'react-native'
import { connect } from 'react-redux'
import Header from "../../component/header"
import Chat from './chat'
import * as actions from "../../store/actions"
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../../component/loader'


const imagePath="https://api.outsourceinpakistan.com/uploads/client/"
function ChatContainer({route}) {
    const [user,setUser]=useState("");
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        getUser()
    },[])
    async function getUser(){
        console.log(route.params)
        const USER=await AsyncStorage.getItem('USER')
        if(USER){
            setUser(USER)
            setLoading(false)
        }
    }
    if(!loading){
        return (
            <View style={{flex:1}}>
                <Header 
                title={user==="accountManager"?route.params.rec.client_name:route.params.rec.user_name} 
                back="back"
                iconName="chevron-back"
                />
                <View style={{flex :1,backgroundColor:'white'}}>
                <Chat
                data={route.params}
                type={user==="accountManager"?"manager":"client"}
                />
                </View>
            </View>
        )
    }else{
        return <Loader size={25} color="blue"/>
    }
}

function mapStateToProps({chatUsers}){
return {chatUsers}
}

export default connect(mapStateToProps,actions)(ChatContainer);