import React, { useState } from "react";
import { View,Text ,StyleSheet,Image,TextInput,TouchableOpacity, Linking} from "react-native";
import { Button, CheckBox } from "native-base";
import {connect} from "react-redux"
import * as actions from "../../store/actions"
import { RFPercentage} from "react-native-responsive-fontsize";
import DropDownPicker from 'react-native-dropdown-picker';
import IconMenu from "react-native-vector-icons/Ionicons";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { ScrollView } from "react-native-gesture-handler";

function CreateAcount({navigation,getRegFields}){
    const [fields,setFields]=useState({
        client_name:"",
        client_email:"",
        client_phone:"",
        client_company:"",
        client_message:"",
        client_address:""
    });
    const [error,setError]=useState(false)
    function getValue(v,key){
        setFields((pS)=>{
            return{
                ...pS,
                [key]:v
            }
        })
    }

    function openTermsAndCondition(){
        Linking.openURL('https://outsourceinpakistan.com/terms')
    }

    
    return(
        
        <View style={{flex:1, width:'100%'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
            <View style={styles.sec1}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <IconMenu name="chevron-back" color="#001441" size={30}/>
                </TouchableOpacity>
                <Image resizeMode="contain" style={{width:147,height:57,marginLeft:wp('20')}} source={require('../../../assets/images/logowt.png')}/>
            </View>
            <View style={styles.sec2}>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.res}>Register</Text>
                <View style={styles.line}/>
            </View>
            <View style={styles.sec3}>
                <View style={styles.card}>
                    <View>
                        <View style={styles.top}>
                        <Text style={styles.resH}>Register</Text>
                        <Text style={{fontFamily:'Poppins-Regular'}}>Fill the form, make sure it correct</Text>
                        </View>
                        <View style={styles.fLine}/>
                    </View>
                    <View style={styles.p2}>
                        <Text style={styles.inputTxt}>UserName</Text>
                        <TextInput onChangeText={(v)=>getValue(v,"client_name")} style={styles.input}/>
                        {error && !fields.client_name?<Text style={styles.error}>Please fill</Text>:null}
                        <Text style={styles.inputTxt}>Email</Text>
                        <TextInput onChangeText={(v)=>getValue(v,"client_email")} style={styles.input}/>
                        {error && !fields.client_email.includes('@')?<Text style={styles.error}>Please insert valid email</Text>:null}
                        <Text style={styles.inputTxt}>Phone Number</Text>
                        <TextInput onChangeText={(v)=>getValue(v,"client_phone")} style={styles.input}/>
                        {error && !fields.client_phone?<Text style={styles.error}>Please fill</Text>:null}
                        <Text style={styles.inputTxt}>Company</Text>
                        <TextInput placeholder="optional" onChangeText={(v)=>getValue(v,"client_company")} style={styles.input}/>
                        <Text style={styles.inputTxt}>Address</Text>
                        <TextInput placeholder="optional" onChangeText={(v)=>getValue(v,"client_address")} style={styles.input}/>
                        <Text style={styles.inputTxt}>Message</Text>
                        <TextInput placeholder="optional" multiline={true} numberOfLines={8} textAlignVertical="top" onChangeText={(v)=>getValue(v,"client_message")} style={{...styles.input,height:80}}/>
                        <View style={styles.loginV}>
                            <TouchableOpacity 
                            style={styles.loginBtn} 
                            onPress={()=>{
                                if(fields.client_name && fields.client_phone && fields.client_email.includes('@')){
                                    getRegFields(fields)
                                navigation.navigate('createPassword')
                                }else{
                                    setError(true)
                                }
                            }}>
                                <Text style={{fontSize:RFPercentage(2),fontFamily:'Poppins-Regular',color:'white'}}>Registration</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.footer}>
                            <Text style={{textAlign:'center',fontFamily:'Poppins-Regular',fontSize:RFPercentage(1.5)}}>
                            By creating this account, you agree with our 
                            </Text>
                            <TouchableOpacity onPress={openTermsAndCondition}><Text style={styles.term}>Terms & Conditions</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            </View>
            </ScrollView>
        </View>
        
    )
}


const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'flex-start',
        paddingBottom:20
    },
    sec1:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        width:'90%',
        marginTop:hp(3),
        marginBottom:hp(3),
        marginLeft:21
    },
    sec2:{
        width:'90%',
        flex:1,
        justifyContent:'flex-start',
        marginLeft:21
    },
    sec3:{
        width:'100%',
        flex:5,
        alignItems:'center'
    },
    title:{
        color:'#253F50',
        fontFamily:'Poppins-Regular',
        fontSize:RFPercentage(3.5)
    },
    line:{
        width:wp('25%'),
        marginTop:hp('1'),
        marginBottom:hp('2'),
        height:2,
        backgroundColor:'#29BCFF',
    },
    res:{
        color:'#001441',
        fontFamily:'Poppins-Regular',
        fontSize:RFPercentage('2')
    },
    card:{
        width:'90%',
        flex:1,
        backgroundColor:'white',
        width:'90%',
        borderRadius:7,
        paddingBottom:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        
        elevation: 6,
            },
    resH:{
        color:'#001441',
        fontSize:RFPercentage(3),
        fontFamily:'Poppins-Regular'
    },
    fLine:{
        marginTop:10,
        backgroundColor:'#E2E9F0',
        width:'100%',
        height:1
    }
    ,
    input:{
        width:'90%',
        borderRadius:7,
        borderWidth:1,
        borderColor:'#DCE0E7',
        backgroundColor:'white',
        height:40,
        marginTop:10,
        paddingLeft:10
    },
    top:{
        paddingLeft:20,
        paddingTop:14,
        paddingBottom:8
    },
    p2:{
        alignItems:'center'
    },
    inputTxt:{
        fontSize:RFPercentage(1.7),
        fontFamily:'Poppins-Regular',
        marginTop:10,
        color:'#71809C',
        width:'90%'
    },
    sub:{
        width:'90%',
        height:50,
        flexDirection:'row',
        alignItems:'center'
    },
    loginBtn:{
        backgroundColor:'#001441',
        borderRadius:7,
        width:'100%',
        height:40,
        justifyContent:'center',
        alignItems:'center'
    },
    loginV:{
        marginTop:hp(2),
        width:'90%'
    },
    footer:{
        marginTop:hp(1.4),
        width:'90%',
        justifyContent:'center',
        alignItems:'center'
    },
    term:{
        color:'#001441',
    },
    error:{
        width:'90%',
        color:'red',
        fontSize:RFPercentage(1.5)
    }
})

export default connect(null,actions)(CreateAcount);