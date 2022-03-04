import React, { Component, useEffect,useMemo,useState } from 'react'
import { View ,StyleSheet,Image, TouchableOpacity, Touchable,ActivityIndicator} from 'react-native'
import { Button, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import IconCross from 'react-native-vector-icons/Entypo';
import IconDashboard from "react-native-vector-icons/MaterialIcons"
import IconProject from "react-native-vector-icons/SimpleLineIcons"
import IconCreateProject from "react-native-vector-icons/FontAwesome"
import IconProfile from "react-native-vector-icons/AntDesign"
import { RFPercentage} from "react-native-responsive-fontsize";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {connect} from "react-redux"
import { CommonActions } from '@react-navigation/native';
import * as actions from "../store/actions"
import AsyncStorage from '@react-native-async-storage/async-storage'
import RNRestart from 'react-native-restart';
import messaging from '@react-native-firebase/messaging';
import {
    DrawerContentScrollView,
  } from '@react-navigation/drawer';

function DrawerContent({navigation,login,clientInfo,removeOnlineStatus,conversationUser,getChatUsers}){
    const [fields,setFields]=useState({
        client_name:"",
        client_image:"",
        client_image_path:""
        
    })
    const [user,setUser]=useState('')
    const [loader,setLoader]=useState(false)
    useEffect(()=>{
            getUser()
            setFields(clientInfo)
            getChatUsers(user=="accountManager"?clientInfo.user_name:clientInfo.client_name,user=="accountManager"?clientInfo.user_id:clientInfo.client_id)
    },[clientInfo,user])

    async function getUser(){
        const USER=await AsyncStorage.getItem('USER')
        if(USER==="accountManager"){
            setUser(USER)
        }
    }
    function unreadMessages(){
        if(conversationUser.length){
            const sort=conversationUser.filter((item)=>item.count>0)
            return sort.length==0?null:sort.length
        }
        return null
    }
    function renderOtherTabs(){
        if(clientInfo.role_id){
            if(clientInfo.role_id=="1" || clientInfo.role_id=="7" || clientInfo.role_id=="10" || clientInfo.role_id=="14"){
                return(
                    <>
            <ListItem icon style={styles.listItem} onPress={()=>navigation.navigate('createproject')}>
            <Left style={{width:50,justifyContent:'center',alignItems:'center'}}>
                <IconProject name="note" size={27} color="#001441"/>
            </Left>
            <Body>
            <Text>NEW PROJECT</Text>
            </Body>
        </ListItem>
        <ListItem icon style={styles.listItem} onPress={()=>navigation.navigate('myproject')}>
            <Left style={{width:50,justifyContent:'center',alignItems:'center'}}>
                <IconCreateProject name="plus-square-o" size={30} color="#001441"/>
            </Left>
            <Body>
            <Text>MY PROJECT</Text>
            </Body>
        </ListItem >
                <ListItem icon style={styles.listItem} onPress={()=>navigation.navigate('payment')}>
                <Left style={{width:50,justifyContent:'center',alignItems:'center'}}>
                    <IconDashboard name="payment" size={30} color="#001441"/>
                </Left>
                <Body>
                <Text>PAYMENTS</Text>
                </Body>
            </ListItem>
            </>
                )
            }
        }else{
            return(
                <>
            <ListItem icon style={styles.listItem} onPress={()=>navigation.navigate('createproject')}>
            <Left style={{width:50,justifyContent:'center',alignItems:'center'}}>
                <IconProject name="note" size={27} color="#001441"/>
            </Left>
            <Body>
            <Text>NEW PROJECT</Text>
            </Body>
        </ListItem>
        <ListItem icon style={styles.listItem} onPress={()=>navigation.navigate('myproject')}>
            <Left style={{width:50,justifyContent:'center',alignItems:'center'}}>
                <IconCreateProject name="plus-square-o" size={30} color="#001441"/>
            </Left>
            <Body>
            <Text>MY PROJECT</Text>
            </Body>
        </ListItem >
                <ListItem icon style={styles.listItem} onPress={()=>navigation.navigate('payment')}>
                <Left style={{width:50,justifyContent:'center',alignItems:'center'}}>
                    <IconDashboard name="payment" size={30} color="#001441"/>
                </Left>
                <Body>
                <Text>PAYMENTS</Text>
                </Body>
            </ListItem>
        <ListItem icon style={styles.listItem} onPress={()=>navigation.navigate('resources')}>
                <Left style={{width:50,justifyContent:'center',alignItems:'center'}}>
                    <IconProfile name="setting" size={28} color="#001441"/>
                </Left>
                <Body>
                <Text>RESOURCE</Text>
                </Body>
        </ListItem>
            </>
            )
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.sec1}>
                <View style={{width:'100%'}}>
                <View style={styles.iconCon}>
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>navigation.closeDrawer()}>
                    <IconCross style={styles.icon} name="cross" color="#AAAAAA" size={30}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.pro}>
                <Image 
                style={{width:wp(25),height:wp(25),borderRadius:wp(25)/2,borderColor:'white',borderWidth:4}} 
                source={
                    (user==="accountManager"?fields.user_image:fields.client_image)
                    ?
                    {
                        uri:(fields.client_image_path?fields.client_image_path:'https://api.outsourceinpakistan.com/uploads/user/')+(user==="accountManager"?fields.user_image:fields.client_image)}: require('../../assets/images/thumb.png')
                        
                        }/>
                <Text style={{...styles.proName,textTransform:'capitalize'}}>{user==="accountManager"?fields.user_name:fields.client_name}</Text>
                {/* <Text style={styles.title}>Client</Text> */}
                <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('profile')}>
                    <Text style={styles.text1}>
                        Edit
                    </Text>
                </TouchableOpacity>
                </View>
                </View>
            </View>
            <View style={styles.sec2}>
            <LinearGradient colors={['#FFFFFF', '#DDE0E7']} style={styles.linearGradient}>
            <DrawerContentScrollView
            style={{paddingBottom:20}}
            >
            <View style={styles.list}>
            <ListItem icon style={styles.listItem} onPress={()=>navigation.navigate('dashboard')}>
                <Left style={{width:50,justifyContent:'center',alignItems:'center'}}>
                    <IconDashboard name="dashboard" size={28} color="#001441"/>
                </Left>
                <Body>
                <Text>DASHBOARD</Text>
                </Body>
            </ListItem>
                        {renderOtherTabs()}
            <ListItem icon style={styles.listItem} onPress={()=>navigation.jumpTo('support')}>
                <Left style={{width:50,justifyContent:'center',alignItems:'center'}}>
                    <IconDashboard name="support-agent" size={30} color="#001441"/>
                </Left>
                <Body>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text>CHAT</Text>
                    <Text style={{color:'red',fontSize:14,fontWeight:'700',display:unreadMessages()?null:'none'}}>( {unreadMessages()} )</Text>
                {/* {true?(
                    <IconCreateProject
                    name="circle"
                    color="#ff0000"
                    size={17}
                    />
                ):null} */}
                    </View>
                </Body>
            </ListItem>
            <ListItem icon style={styles.listItem} onPress={async()=>{
                setLoader(true)
                await messaging()
                .unsubscribeFromTopic(user==="accountManager"?"oipTeam":"client")
                await messaging().deleteToken()
                await removeOnlineStatus(user==="accountManager"?clientInfo.user_id:clientInfo.client_id)
                
                login(false,()=>RNRestart.Restart()).then(()=>{
                    setLoader(false)
                })
            }}>
                {loader?(
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <ActivityIndicator size="small" color="blue"/>
                    </View>
                ):(
                                <>
                                <Left style={{width:50,justifyContent:'center',alignItems:'center'}}>
                                    <IconProfile name="logout" size={25} color="#001441"/>
                                </Left>
                                <Body>
                                <Text>LOGOUT</Text>
                                </Body>
                                </>
                )}
            </ListItem>
            </View>
            </DrawerContentScrollView>
            </LinearGradient>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center'
    },
    sec1:{
        flex:2.25,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#EEEEEE',
    },
    sec2:{
        flex:3,
        paddingTop:20,
        width:'100%',
    },
    list:{
        paddingLeft:20,
        paddingRight:20
    },
    iconCon:{
        width:'100%',
        alignItems:'flex-end',
    },
    icon:{
        marginRight:wp(6),
    },
    pro:{
        alignItems:'center'
    },
    proName:{
        color:'#222222',
        fontSize:25
    },
    title:{
        color:'#222222',
        fontSize:18,
        marginTop:hp(1),
        marginBottom:hp(1.7)
    },
    btn:{
        height:35,
        width:80,
        backgroundColor:'#001441',
        borderRadius:7,
        justifyContent:'center',
        alignContent:'center'
    },
    text1:{
        textAlignVertical:'center',
        textAlign:'center',
        color:'white'
    },
    listItem:{
        paddingTop:10,
        paddingBottom:10
    },
    linearGradient: {
        flex: 1,
      },
})

function mapStateToProps({clientInfo,findMessage,conversationUser}){
    return{clientInfo,findMessage,conversationUser}
}
export default connect(mapStateToProps,actions)(DrawerContent);