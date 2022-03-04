import React, { useEffect,useState } from 'react'
import { Text, View,Image,StyleSheet,TextInput,Animated, Dimensions,TouchableOpacity,ScrollView } from 'react-native'
import { RFPercentage} from "react-native-responsive-fontsize";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Header from "../../component/header";
import {launchCamera,launchImageLibrary} from "react-native-image-picker";
import IconEdit from "react-native-vector-icons/MaterialIcons";
import ImageModel from "../../component/imageModel";
import {connect} from "react-redux"
import * as actions from "../../store/actions";
import Loader from "../../component/loader";
import SuccessModel from "../../component/successModel"
import AsyncStorage from '@react-native-async-storage/async-storage'

const {height}=Dimensions.get('window')
function Profile({clientInfo,editProfile}){
    const position=useState(new Animated.Value(height))[0];
    const [modalVisible, setModalVisible] = useState(false);
    const [sucModel,setSucModel]=useState(false);
    const [loading,setLoading]=useState(false);
    const [user,setUser]=useState("");
    const [imgUrl,setImgUrl]=useState('');
    const [fields,setFields]=useState({
        client_name:"",
        client_email:"",
        client_address:"",
        client_phone_number:"",
        client_image:"",
        client_image_path:"",
    })
    function getValues(key,v){
        setFields((pS)=>{
            return{
                ...pS,
                [key]:v
            }
        })
    }
    console.log(clientInfo)
    useEffect(()=>{
        setFields(clientInfo)
        getUser()
        Animated.timing(position,{
            toValue:0,
            duration:500,
            useNativeDriver:true
        }).start()
    },[])

    function openCamera(){
        launchCamera(
            {
                mediaType:'photo',

            },(res)=>{
                setImgUrl(res)
            }
        )
        setModalVisible(false)
    }

    function openLibrary(){
        launchImageLibrary({
            mediaType:'photo'
        },(res)=>{
            setImgUrl(res)
            setModalVisible(false)
        })
    }


    function closeModle(){
        setModalVisible(false)
    }
    function hideSucModel(){
        setSucModel(false)
    }
    function showSucModel(){
        setSucModel(true)
    }
    function loadingTrue(){
        setLoading(true)
    }
    function loadingFalse(){
        setLoading(false)
    }
    async function getUser(){
        const USER=await AsyncStorage.getItem('USER')
        if(USER==="accountManager"){
            setUser(USER)
        }
    }

    return (
        <View style={{flex:1}}>
            <ImageModel
            openCamera={openCamera}
            openLibrary={openLibrary}
            closeModle={closeModle}
            visible={modalVisible}
            />
            <SuccessModel title="Updated Successful" closeModle={hideSucModel} visible={sucModel}/>
            <Header title="Profile" iconName="md-menu"/>
            <Animated.View style={{...styles.container,transform:[{translateY:position}]}}>
                <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
                <View style={{...styles.sec,position:'absolute',width:'100%',zIndex:1}}>
                    <View style={styles.imgCon}>
                    <Image 
                    style={styles.proPic} 
                    source={
                        imgUrl.uri
                        ?
                        {uri:imgUrl.uri}
                        :
                        (
                            (user==="accountManager"?fields.user_image:fields.client_image)?{uri:(fields.client_image_path?fields.client_image_path:'https://api.outsourceinpakistan.com/uploads/user/')+(user==="accountManager"?fields.user_image:fields.client_image)}: require('../../../assets/images/thumb.png')

                            )}/>
                    <TouchableOpacity 
                    style={styles.icon}
                    onPress={()=>setModalVisible(true)}
                    >
                        <IconEdit name="edit" color="#001441" size={20}/>
                    </TouchableOpacity>
                    </View>
                </View>
                <View style={{...styles.sec,marginTop:hp('12%')}}>
                    <View style={{...styles.fieldsCon,height:'auto'}}>
                        <View style={{...styles.content,marginTop:hp('2%'),marginBottom:hp('2%')}}>
                        <Text style={styles.proHead}>Profile Details</Text>
                        </View>
                        <View style={styles.line}/>
                        <View style={styles.content}>
                        <Text style={styles.inputTxt}>Name</Text>
                        <TextInput 
                        value={user==="accountManager"?fields.user_name:fields.client_name} 
                        defaultValue={user==="accountManager"?fields.user_name:fields.client_name} 
                        onChangeText={(v)=>getValues(user==="accountManager"?'user_name':'client_name',v)} 
                        style={styles.input}/>
                        <Text style={styles.inputTxt}>Email</Text>
                        <TextInput 
                        value={user==="accountManager"?fields.user_email:fields.client_email} 
                        editable={false} onChangeText={(v)=>getValues(user==="accountManager"?'user_email':'client_email',v)} 
                        defaultValue={fields.client_email} 
                        style={{...styles.input,backgroundColor:'#F6F6F6'}}/>
                        <Text style={styles.inputTxt}>Phone Number</Text>
                        <TextInput 
                        value={user==="accountManager"?fields.user_phone:fields.client_phone_number} 
                        onChangeText={(v)=>getValues(user==="accountManager"?'user_phone':'client_phone_number',v)} 
                        keyboardType="number-pad" 
                        defaultValue={user==="accountManager"?fields.user_phone:fields.phone_number} style={styles.input}/>
                            <>
                            <Text style={styles.inputTxt}>Address</Text>
                            <TextInput 
                            numberOfLines={4}  
                            multiline={true}
                            value={user==="accountManager"?fields.user_address:fields.client_address}
                            defaultValue={user==="accountManager"?fields.user_address:fields.client_address}
                            onChangeText={(v)=>getValues(user==="accountManager"?'user_address':'client_address',v)}
                            style={{...styles.input,height:70,flexWrap:'wrap',textAlignVertical:'top'}}
                            />
                            </>
                        </View>
                        <View style={{width:'100%',justifyContent:'center',alignItems:'center',marginTop:10}}>
                        <TouchableOpacity style={{width:'90%',backgroundColor:'#001441',borderRadius:7,height:40,justifyContent:'center',alignItems:'center'}} onPress={()=>{
                            loadingTrue()
                            editProfile({...fields,client_image:imgUrl},loadingFalse,showSucModel)
                        }}>
                        {loading?<Loader color="white" size={25}/>:(
                            <Text
                            style={{color:'white',textAlign:'center',textAlignVertical:'center'}}
                            >Update
                            </Text>
                        )}
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
                </ScrollView>
            </Animated.View>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        marginLeft:wp('1.5%'),
        marginRight:wp('1.5%'),
        marginTop:hp('1%'),
        paddingBottom:hp('2%'),
        borderTopLeftRadius:7,
        borderTopRightRadius:7,
        backgroundColor:'#F2F2F2',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    proDes:{
        width:'95%',
        marginRight:wp('2%'),
        marginLeft:wp('2%'),
        paddingBottom:hp('2%'),
        justifyContent:'flex-end',
        backgroundColor:'white',
        shadowColor: "#000",
        borderRadius:10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        height:hp('20%'),
        elevation: 4,
    },
    proDesText:{
        fontFamily:'Inter-Regular',
        color:'#72809D',
        fontSize:RFPercentage(2),
        textAlign:'center'
    },
    proPic:{
        width:wp('22%'),
        height:wp('22%'),
        borderWidth:wp('1.5%'),
        borderColor:'white',
        borderRadius:wp('22%')/2
        
    },
    imgCon:{
        flexDirection:'row',
        width:'90%',
        alignItems:'center',
        justifyContent:'center'
    },
    icon:{
        position:'relative',
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        width:30,
        height:30,
        borderRadius:15,
        left:-20,
        bottom:-20
    },
    sec:{
        alignItems:'center',
        marginTop:hp('5%'),
    },
    fieldsCon:{
        width:'95%',
        marginRight:wp('2%'),
        marginLeft:wp('2%'),
        paddingBottom:hp('2%'),
        backgroundColor:'white',
        shadowColor: "#000",
        borderRadius:10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        height:hp('20%'),
    },
    proHead:{
        color:'#001441',
        fontFamily:'Poppins-Light',
        fontSize:RFPercentage(2)
    },
    line:{
        height:2,
        backgroundColor:'#EDEEF2',
        width:'100%'
    },input:{
        width:'100%',
        borderRadius:7,
        borderWidth:1,
        borderColor:'#DCE0E7',
        backgroundColor:'white',
        height:40,
        marginTop:10,
        color:'#606C83',
        paddingLeft:10
    },
    inputTxt:{
        marginTop:10,
        color:'#606C83',
        fontSize:RFPercentage(1.8),
        fontFamily:'Poppins-Light',
        width:'90%'
    },
    content:{
        paddingRight:wp('5%'),
        paddingLeft:wp('5%'),
    }
})

function mapStateToProps({clientInfo}){
    return {clientInfo}
}
export default connect(mapStateToProps,actions)(Profile);
