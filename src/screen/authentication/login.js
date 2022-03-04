import React, { useEffect, useState } from "react";
import {View,Text,StyleSheet,Image, TextInput,TouchableOpacity, ScrollView} from "react-native";
import { RFPercentage} from "react-native-responsive-fontsize";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Button, CheckBox} from "native-base";
import * as actions from "../../store/actions"
import { connect } from "react-redux";
import Loader from "../../component/loader";
import AsyncStorage from '@react-native-async-storage/async-storage'



function Login({navigation,getCurrentUser,currentUser,login,socialLogin}){
    const [fields,setFields]=useState({email:"",password:""})
    const [fError,setFError]=useState(false)
    const [check,setCheck]=useState(true)
    const [loading,setLoading]=useState(false);
    const [socialLoading,setSocialLoading]=useState(false);
    const [message,setMessage]=useState("")
    useEffect(()=>{
        getUser()
        currentUser.message?setMessage(currentUser.message):null
    },[currentUser])
    const [user,setUser]=useState("");
    async function getUser(){
        const USER=await AsyncStorage.getItem('USER')
        if(USER==="accountManager"){
            setUser(USER)
        }
    }
    function getValue(v,key){
        setFields((pS)=>{
            return {
                ...pS,
                [key]:v
            }
        })
    }
    function setCheckBox(){
        setCheck((pS)=>!pS)
    }

    function onLogin(){
        if(fields.email && fields.password){
            getCurrentUser(fields,loadingTrue,loadingFalse,login)
        }else{
            setFError(true)
        }
    }
    function loadingFalse(){
        setLoading(false)
    }
    function loadingTrue(){
        setLoading(true)
    }

      async function selectUser(user){
        if(user==="client"){
            const USER=await AsyncStorage.setItem('USER','client')
            setFields({email:"",password:""})
            setMessage("")
            setFError(false)
            setUser('client')
        }
        if(user==="accountManager"){
            const USER=await AsyncStorage.setItem('USER','accountManager')
            setFields({email:"",password:""})
            setMessage("")
            setFError(false)
            setUser('accountManager')
        }
    }

      const sLoading=(con)=>{
          setSocialLoading(con)
      }
      if(socialLoading){
        return <Loader color="blue" size={25}/>
      }else{
    return(
        <View style={{...styles.container,paddingBottom:50}}>
            <View style={styles.img}>
                <Image resizeMode="contain" style={{width:wp('60%')}} source={require('../../../assets/images/logowt.png')}/>
            </View>
            <View style={styles.title}>
                <Text style={styles.smarter}>{user==="accountManager"?"Admin":"Client"}</Text>
                <Text style={{...styles.simply}}>PORTAL</Text>
            </View>
            <View style={styles.card}>
                <View style={styles.sec1}>
                    <View style={styles.p1}>
                        <Text style={styles.login}>Login</Text>
                        <Text style={styles.welcom}>Welcome back!</Text>
                    </View>
                    <View style={styles.p2}>
                        {user==="accountManager"?null:(
                            <TouchableOpacity onPress={()=>navigation.navigate('createacount')}>
                            <Text style={{fontFamily:'Poppins-Regular',color:'#001441'}}>Register</Text>
                        </TouchableOpacity>
                        )}
                    </View>
                </View>
                <View style={styles.line}/>
                <View style={styles.sec2}>
                    <View style={styles.inputCon}>
                        <TextInput onChangeText={(v)=>getValue(v,"email")} value={fields.email} style={styles.input} placeholder="Email"/>
                        {fError && !fields.email?<Text style={styles.error}>Please Fill</Text>:null}
                        <TextInput onChangeText={(v)=>getValue(v,"password")} value={fields.password} style={styles.input} secureTextEntry placeholder="Password"/>
                        {message?<Text style={styles.error}>{message}</Text>:(fError && !fields.password?<Text style={styles.error}>Please Fill</Text>:null)}
                    </View>
                    {user==="accountManager"?null:(
                    <TouchableOpacity style={{width:'100%'}} onPress={()=>navigation.navigate('email')}>
                        <Text style={{fontFamily:'Poppins-Regular',color:'#001441',textAlign:'right',marginTop:5,fontSize:12}}>Forget Password</Text>
                    </TouchableOpacity>
                )}
                    <View style={styles.sec5}>
                        <TouchableOpacity style={styles.loginBtn} onPress={onLogin}>
                            {loading?<Loader color="white" size={25}/>: <Text style={{fontSize:RFPercentage(2),color:'white',fontFamily:'Poppins-Regular'}}>Log In</Text>}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {user==="accountManager"?(
                <TouchableOpacity onPress={()=>selectUser('client')}>
                <Text style={styles.portalLink}>Click here for Client Portal</Text>
            </TouchableOpacity>
            ):(
                            
                            <TouchableOpacity onPress={()=>selectUser('accountManager')}>
                            <Text style={styles.portalLink}>Click here for Admin Portal</Text>
                        </TouchableOpacity>
                        )}
        </View>
    )}
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FAFAFD',
        alignItems:'center',
        justifyContent:'space-around',
        paddingBottom:20,
    },
    img:{
        justifyContent:'center',
        alignItems:'center',
    },
    title:{
        justifyContent:'center',
        alignItems:'center'
    },
    card:{
        marginBottom:RFPercentage(6),
        paddingBottom:RFPercentage(3),
        alignItems:'center',
        backgroundColor:'white',
        width:'90%',
        borderRadius:7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        
        elevation: 6,
            },
    sec1:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:'90%',
        height:90
    },
    p1:{
        width:'75%',
    },
    p2:{
        width:'25%',
        alignItems:'flex-end',
    },
    line:{
        backgroundColor:'#E2E9F0',
        width:'100%',
        height:1
    },
    simply:{
        fontSize:RFPercentage(4.5),
        color:'#001441',
        fontFamily:'Poppins-Bold'
    },
    smarter:{
        fontSize:RFPercentage(4.5),
        color:'#001441',
        fontFamily:'Poppins-Light'
    },
    login:{
        fontSize:RFPercentage(2.7),
        color:'#001441',
        fontFamily:'Poppins-Regular'
    },
    welcom:{
        fontSize:RFPercentage(2),
        fontFamily:'Poppins-Regular',
        color:'black'
    },
    sec2:{
        width:'90%',
    },
    input:{
        width:'100%',
        borderRadius:7,
        borderWidth:1,
        borderColor:'#DCE0E7',
        backgroundColor:'white',
        height:40,
        marginTop:10,
        paddingLeft:10
    },
    sec3:{
        flexDirection:'row',
        justifyContent:'center',
        width:'100%',
    },
    sec4:{
        height:35,
        flexDirection:'row',
        width:'100%',
        alignItems:'center'
    },
    chec:{
        flexDirection:'row',
        width:'60%',
        alignItems:'center'

    },
    rem:{
        fontSize:RFPercentage(1.8),
        fontFamily:'Poppins-Regular',
        marginLeft:20,
        color:'#778699'
    },
    fPass:{
        color:'#778699',
        fontSize:RFPercentage(1.8),
        fontFamily:'Poppins-Regular',
        justifyContent:'flex-end',
        alignItems:'center'
    },
    pasCon:{
        width:'40%',
    },
    loginBtn:{
        backgroundColor:'#001441',
        borderRadius:7,
        width:'100%',
        height:40,
        justifyContent:'center',
        alignItems:'center'
    },
    sec5:{
        marginTop:5,
        width:'100%',
        justifyContent:"center",
        alignItems:'center'
    },
    error:{
        color:'red',
        fontFamily:'Poppins-Light',
        fontSize:RFPercentage(1.8)
    },
    portalLink:{
        color:'blue',
        textDecorationLine:'underline'
    }
})

function mapStateToProps({currentUser}){
    return {currentUser}
}
export default connect(mapStateToProps,actions)(Login);