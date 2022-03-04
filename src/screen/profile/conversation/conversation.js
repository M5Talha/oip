import React, { useEffect, useMemo,useState } from 'react';
import { View,Text, TextInput, TouchableOpacity ,StyleSheet, FlatList,Image} from 'react-native';
import * as actions from "../../../store/actions"
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useNavigation} from "@react-navigation/native"
import {connect} from "react-redux"
import database from '@react-native-firebase/database';
import Loader from '../../../component/loader';


//rec,rId,sId,sName,sImage
const Conversation = ({getChatUsers,conversationUser,clientInfo}) => {
    const navigation=useNavigation()
    const [user,setUser]=useState("");
    const [onlineUsers,setOnlineUsers]=useState([])
    useEffect(()=>{
        getUser()
            const sub=[
                navigation.addListener('focus',()=>{
                    if(user){
                        database().ref('/onlineUsers').on('value',snap=>{
                            if(snap.val()!=null){
                                const values=Object.values(snap.val())
                                setOnlineUsers(values)
                            }
                        })
                        getChatUsers(user=="accountManager"?clientInfo.user_name:clientInfo.client_name,user=="accountManager"?clientInfo.user_id:clientInfo.client_id)
                    }
                }),
                navigation.addListener('blur',()=>{
                    database().ref('/onlineUsers').off()
                })
            ]

            return function cleanup() {
                sub.forEach((unSub) => {
                  unSub()
                })
              }
    },[user,navigation])

    async function getUser(){
        const USER=await AsyncStorage.getItem('USER')
        if(USER){
            setUser(USER)
        }
    }

    function showOnlineTick(item){
        var status=false
        onlineUsers
        .filter((item)=>item.id!==(user=="accountManager"?clientInfo.user_name:clientInfo.client_name))
        .map(u=>{
            if(item.id==u.id && item.name==u.name){
                status=true
            }
        })
        return status
    }
    function renderUser({item}){
        const date=item.message.createdAt.toDate()
        const slashIndex=item.url.lastIndexOf('/')
        const onlyPicName=item.url.slice(slashIndex+1,item.url.length)
        return(
            <TouchableOpacity 
            onPress={()=>{
                navigation.push("chatContainer",{rec:{id:item.id,mobile_token:item.mobileToken,[user=="accountManager"?"client_name":"user_name"]:item.name,[user=="accountManager"?"client_image":"user_image"]:onlyPicName},rId:item.id,sId:user=="accountManager"?clientInfo.user_id:clientInfo.client_id,sName:user=="accountManager"?clientInfo.user_name:clientInfo.client_name,sImage:user=="accountManager"?clientInfo.user_image:clientInfo.client_image})
            }}
            style={styles.userBox}>
                <View style={styles.box}>
                <Image
                style={styles.img}
                source={{uri:item.url}}
                />
                {showOnlineTick(item)?<View style={{backgroundColor:'#3dd700',height:16,width:16,borderRadius:16/2,position:'absolute',left:15,top:30}}/>:null}
                <View>
                <Text style={{marginLeft:10}}>{item.name}</Text>
                <Text style={{marginLeft:10,fontSize:11,color:'grey'}}>{item.message.text?(item.message.text.length>30?item.message.text.slice(0,30)+"...":item.message.text):null}</Text>
                </View>
                </View>
                <View style={{flexDirection:'column',justifyContent:'space-around'}}>
                <Text style={{fontSize:11,paddingRight:15,color:'grey'}}>{item.count>0?"("+item.count+" unread messages )":null}</Text>
                <Text style={{marginLeft:10,fontSize:9,color:'green',textAlign:'right',marginTop:5,marginRight:20}}>{date.getHours()+":"+(date.getMinutes().toString().length==1?"0"+date.getMinutes():date.getMinutes())}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    if(conversationUser==null){
        return <Loader size={25} color="blue"/>
    }
    else if(conversationUser.length>0){
        return(
            <View>
            <FlatList
            data={conversationUser.sort((a,b)=>b.message.createdAt-a.message.createdAt)}
            renderItem={renderUser}
            keyExtractor={(item)=>item.id}
            />
            </View>
        )
    }
    else if(conversationUser.length==0){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:20,fontWeight:'700'}}>Not Found</Text>
            </View>
        )
    }
};

const styles=StyleSheet.create({
    userBox:{
        backgroundColor:'white',
        marginVertical:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:5
    },
    box:{
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:20,
        height:50,
    },
    img:{
        width:40,
        height:40,
        borderRadius:60/2
    }
})

function mapStateToProp({users,user,conversationUser,clientInfo}){
    return {users,user,conversationUser,clientInfo}
}
export default connect(mapStateToProp,actions)(Conversation);
