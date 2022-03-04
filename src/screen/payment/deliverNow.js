import React, { Component ,useState,useEffect} from 'react';
import { View, Text,StyleSheet,Image} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage} from "react-native-responsive-fontsize";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { connect } from 'react-redux';
import * as actions from "../../store/actions"
import Header from "../../component/header"
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../../component/loader';
import {useNavigation} from "@react-navigation/native"
function DeliverNow({route,clientInfo,projectDetail,paymentDetailData,getClientInfo}){
    const navigation=useNavigation();
    const [fields,setFields]=useState({
        client_name:"",
        client_address:"",
        client_email:"",
        client_phone_number:"",
    })
    const [user,setUser]=useState("");
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
        getUser()
        projectDetail(route.params.client_payments_id).then(()=>{
            setFields(clientInfo)
            setLoading(true)
        })
          
        // const unSub=[
        //     navigation.addListener('focus',()=>{
        //         console.log(route.params.client_payments_id)
        //         projectDetail(route.params.client_payments_id).then(()=>{
        //             setFields(clientInfo)
        //             setLoading(true)
        //         })
        //     }),
        //     navigation.addListener('blur',()=>{
        //         setLoading(false)
        //     })
        // ]

        // return ()=>{
        //     unSub.forEach((sub)=>{
        //         sub()
        //     })
        // }
        
    },[])

    async function getUser(){
        const USER=await AsyncStorage.getItem('USER')
        if(USER==="accountManager"){
            setUser(USER)
        }
    }

    function renderProjectType(type){
        switch(type){
            case "1":
                return "Logo Design"
            case "2":
                return "Stationery Design"
            case "3":
                return "Web Development"
            case "4":
                return "App Development"
            case "5":
                return "Video Development"
            case "6":
                return "SEO"
            case "7":
                return "Social Media Marketing"
            case "8":
                return "Lead Generation"
            case "9":
                return "Email Marketing"
            case "10":
                return "Content Writing"
            case "11":
                return "Resource Ourtsourcing"
            case "12":
                return "Cyber Security"
            case "13":
                return "Hosting Plan"
            case "14":
                return "Lead Generation with SMM"
            case "15":
                return "Branding & Design"
        }
    }
    if(loading){
        return (
            <View style={{flex:1}}>
                <Header
                title="Payment"
                back="back"
                iconName="chevron-back"
                />
              <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.con}>
                <View>
                    <View style={{width:'100%',flexDirection:'row',alignItems:'center',paddingTop:5,paddingBottom:5}}>
                        <View style={{width:'40%'}}>
                        <Text style={styles.mainHead}>Invoice</Text>
                        </View>
                        <View style={{width:'60%',justifyContent:'flex-end',alignItems:'flex-end'}}>
                        <Image resizeMode="contain" style={{width:120,height:50}} source={require('../../../assets/images/logowt.png')}/>
                        <Text style={{textAlign:'right',fontFamily:'Poppins-Regular',color:'#8E8E8E',fontSize:RFPercentage(1.5),width:'100%'}}>Outsource in Pakistan Suit # 203, 2nd Floor, Park Avenue, Shahrah-e-Faisal, Karachi, Pakistan</Text>
                        <Text style={{textAlign:'right',fontFamily:'Poppins-Regular',color:'#8E8E8E',fontSize:RFPercentage(1.5),width:'100%'}}>+92-332-2948059</Text>
                        <Text style={{textAlign:'right',fontFamily:'Poppins-Regular',color:'#8E8E8E',fontSize:RFPercentage(1.5),width:'100%'}}>admin@outsourceinpakistan.com</Text>
                        </View>
                    </View>
                    <View style={{...styles.line,marginBottom:10}}/>
                   <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                       <Text style={{fontFamily:'Poppins-Regular',color:'#8E8E8E',fontSize:RFPercentage(1.7)}}><Text style={{fontFamily:'Poppins-Regular',color:'#8E8E8E'}}>Payment No: </Text>{route.params.payment_no}</Text>
                       <Text style={{fontFamily:'Poppins-Regular',color:'#8E8E8E',fontSize:RFPercentage(1.7)}}>{route.params.client_payments_date}</Text>
                   </View>
                   <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={{fontFamily:'Poppins-Regular',color:'#8E8E8E',fontSize:RFPercentage(1.7)}}><Text style={{fontFamily:'Poppins-Regular',color:'#8E8E8E'}}>Total: </Text>{route.params.client_payments_amount}</Text>
                       <Text style={{fontFamily:'Poppins-Regular',color:'#8E8E8E',fontSize:RFPercentage(1.7)}}><Text style={{fontFamily:'Poppins-Regular',color:'#8E8E8E'}}>Payment Status: </Text>{route.params.client_payments_pay_status}</Text>
                   </View>
                </View>
                <View style={styles.card}>
                    {/* Reminder LOOP */}
                    <View style={styles.row}>
                        <View style={{width:wp(55)}}><Text style={{color:'#8E8E8E',fontFamily:'Poppins-Regular'}}>Item</Text></View>
                        <View style={{width:wp(18)}}><Text style={{color:'#8E8E8E',fontFamily:'Poppins-Regular'}}>Qty</Text></View>
                        <View style={{width:wp(18)}}><Text style={{color:'#8E8E8E',fontFamily:'Poppins-Regular'}}>Total</Text></View>
                    </View>
                    <View style={styles.row}>
                        <View style={{width:wp(50)}}>
                            <View style={styles.firstItem}>
                                <Text style={{textTransform:'uppercase',fontWeight:'700',marginLeft:3}}>{`${paymentDetailData[0].project_name}`}</Text>
                                <Text style={{fontSize:13}}>{`- Project Type: ${renderProjectType(paymentDetailData[0].project_type)}`}</Text>
                                <Text style={{fontSize:13}}>{`- Project Summary: ${paymentDetailData[0].project_summary}`}</Text>
                                <Text style={{fontSize:13}}>{`- Delivery Status: ${paymentDetailData[0].delivery_status}`}</Text>
                            </View>
                        </View>
                        <View style={{...styles.firstItem,width:wp(18)}}><Text style={{fontFamily:'Poppins-Regular'}}>x1</Text></View>
                        <View style={{...styles.firstItem,width:wp(18)}}><Text style={{fontFamily:'Poppins-Regular',textAlign:'right'}}>{`${paymentDetailData[0].project_price} $`}</Text></View>
                    </View>
                    <View style={styles.line}/>
                    <View style={styles.row}>
                        <View style={{width:wp(50+16)}}><Text style={{color:'#8E8E8E',fontFamily:'Poppins-Regular'}}>Amount Paid</Text></View>
                        <View style={{width:wp(18)}}><Text style={{fontFamily:'Poppins-Regular',textAlign:'right'}}>{`${paymentDetailData[0].project_paid} $`}</Text></View>
                    </View>
                    <View style={styles.line}/>
                    <View style={styles.row}>
                        <View style={{width:wp(50+16)}}><Text style={{color:'#8E8E8E',fontFamily:'Poppins-Regular'}}>Remaining</Text></View>
                        <View style={{width:wp(18)}}><Text style={{fontFamily:'Poppins-Regular',textAlign:'right'}}>{`${paymentDetailData[0].project_balance} $`}</Text></View>
                    </View>
                </View>
                <View>
                    <Text style={styles.billing}>DELIVERY</Text>
                    <View style={styles.halfLine}/>
                    <Text style={{fontFamily:'Poppins-Regular',color:'#8E8E8E',fontSize:RFPercentage(1.7)}}><Text style={{fontFamily:'Poppins-Regular',color:'#8E8E8E'}}>Payment id: </Text>{route.params.client_payments_id}</Text>
                    <Text style={{...styles.billingDes,fontFamily:'Poppins-semiBold'}}>{user==="accountManager"?route.params.client_name: fields.client_name}</Text>
                    {fields.client_address?<Text style={styles.billingDes}>{fields.client_address}</Text>:null}
                    {/* <Text style={{...styles.billingDes,fontSize:RFPercentage(1.8),textDecorationLine:'underline'}}>{user==="accountManager"?route.params.client_email:fields.client_email}</Text> */}
                    <Text style={{...styles.billingDes,fontSize:RFPercentage(1.8),textDecorationLine:'underline'}}>{user==="accountManager"?route.params.client_phone_number:fields.phone_number}</Text>
                </View>
                </View>
    
                {/* <TouchableOpacity style={styles.pdfBtn}>
                    <Text style={{color:'white',fontFamily:'Poppins-Regular'}}>PDF</Text>
                </TouchableOpacity> */}
    
              </ScrollView>
            </View>
          );
    }else{
        return <Loader color="blue" size={30}/>
    }
}
const styles=StyleSheet.create({
    con:{
        paddingLeft:15,
        paddingRight:15,
        paddingBottom:15,
        marginLeft:5,
        marginRight:5,
        marginTop:10,
        borderRadius:7,
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
    billing:{
        marginTop:hp('3'),
        fontSize:RFPercentage(3),
        fontFamily:'Poppins-Light'
    },
    row:{
        flexDirection:'row',
        marginTop:hp(1),
        marginBottom:hp(1)
    },
    card:{
        marginTop:hp(2),
        backgroundColor:'white',
        padding:hp(1)
    },
    mainHead:{
        color:'#222222',
        fontFamily:"Poppins-Bold",
        fontSize:RFPercentage(3.5),
        marginBottom:hp(1),
        width:'100%',
        textDecorationLine:'underline'
    },
    det:{
        width:wp(70),
        color:'#888888',
        fontSize:RFPercentage(1.8),
        marginBottom:hp(2)
    },
    btn:{
        width:wp(25),
        height:hp(3),
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#007B0C',
        borderRadius:3
    },
    firstItem:{
     
    },
    line:{
        height:1,
        backgroundColor:'#DDDDDD',
        width:'100%'
    },
    halfLine:{
        width:wp(35),
        backgroundColor:'#29BCFF',
        height:2
    },
    billingDes:{
        marginTop:hp(1),
        width:wp(75),
        fontSize:RFPercentage(2),
        fontFamily:'Poppins-Light'
    },
    btnPayNow:{
        marginTop:hp(2),
        backgroundColor:'#001441',
        width:wp(30),
        height:hp(4),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:4
    },
    pdfBtn:{
        marginTop:10,
        backgroundColor:'#001441',
        borderRadius:7,
        width:'98%',
        height:40,
        justifyContent:'center',
        alignItems:'center',
        marginRight:'auto',
        marginLeft:'auto',
        marginBottom:10
    },
})
function mapStateToProps({clientInfo,paymentDetailData}){
return{clientInfo,paymentDetailData}
}
export default connect(mapStateToProps,actions)(DeliverNow);