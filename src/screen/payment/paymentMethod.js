import React, { Component, useEffect, useState } from 'react';
import { View, Text,StyleSheet,Image,TextInput } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import Header from "../../component/header";
import { RFPercentage} from "react-native-responsive-fontsize";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import OipDatePicker from '../../component/oipDatePicker';
import * as actions from "../../store/actions"
import stripe from 'tipsi-stripe';
import { connect } from 'react-redux';
import Loader from "../../component/loader"
import SuccessModel from "../../component/successModel"
stripe.setOptions({
    publishableKey: "pk_live_51IjNTMDTC6LK12UW7aqlq2KXrAWpcJNx7xjt3zV32xqylMdQmmQ4DLs1IvS0LJ1X5NHHPrKvq97cjCC73uZdHOt000aN6GTLZQ",
  });

function PaymentMethod({route,payNow,navigation}){
    const [fields,setFields]=useState({
        total_amount:"",
        card_num:"",
        exp_month:"",
        exp_year:"",
        cvc:"",
        stripeToken:""
    })
    const [model,setModel]=useState(false)
    const [submit,setSubmit]=useState(false)
    const [loading,setLoading]=useState(false)
    function renderLoading(con){
        if(con){
            setLoading(true)
        }else{
            setLoading(false)
        }
    }
    const requestPayment = () => {
        renderLoading(true)
        return stripe
          .createTokenWithCard({number: fields.card_num, expMonth:Number(fields.exp_month), expYear:Number(fields.exp_year), cvc: fields.cvc})
          .then((s) => {
              getValue('stripeToken',s.tokenId)
            payNow(fields,route.params.client_projects_id,renderLoading,renderModel)
          })
          .catch(error => {
              alert(error)
              renderLoading(false)
            // console.warn('Payment failed', { error });
          });
      };

    function getValue(key,value){
        setFields((pS)=>{
            return{
                ...pS,
                [key]:value
            }
        })
    }
    useEffect(()=>{
        getValue('total_amount',route.params.project_price)
    },[])

    function getDate(y,m){
        getValue("exp_month",m)
        getValue("exp_year",y)
    }
    function renderModel(con){
        if(con){
            setModel(true)
        }else{
            setModel(false)
        }
    }
    return (
        <View style={{flex:1}}>
            <Header
            title="Payment Method"
            back="back"
            iconName="chevron-back"
            />
          <ScrollView>
                <View style={styles.con}>
                    <SuccessModel
                    visible={model}
                    closeModle={()=>renderModel(false)}
                    title="Successfully Pay"
                    go={()=>navigation.navigate('myproject')}
                    />
                    <Text style={styles.title}>Card Details</Text>
                    <View style={styles.line}/>
                    {/* REMAINDER WILL CHANGE THROUGH DROP DOWN */}
                    <View>
                    <View>
                        <Image resizeMode="contain" style={{width:'100%',height:wp(70)}} source={require('../../../assets/images/card.png')}/>
                    </View>
                    <View>
                        <Text style={styles.inputTxt}>Card Number</Text>
                        <TextInput maxLength={16} keyboardType="number-pad" onChangeText={(v)=>getValue("card_num",v)} style={styles.input}/>
                        {submit && !fields.card_num?<Text style={{color:'red',fontSize:12}}>Please fill</Text>:null}
                        <Text style={styles.inputTxt}>Cvc</Text>
                        <TextInput keyboardType="number-pad" onChangeText={(v)=>getValue("cvc",v)} style={styles.input}/>
                        {submit && !fields.cvc?<Text style={{color:'red',fontSize:12}}>Please fill</Text>:null}
                        <Text style={styles.inputTxt}>Amount</Text>
                        <TextInput keyboardType="number-pad" defaultValue={route.params.project_price} onChangeText={(v)=>getValue("total_amount",v)} style={styles.input}/>
                        {submit && !fields.total_amount?<Text style={{color:'red',fontSize:12}}>Please fill</Text>:null}
                        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                        <View style={{width:'50%'}}>
                        <Text style={styles.inputTxt}>Expire Month</Text>
                        <TextInput keyboardType="number-pad" onChangeText={(v)=>getValue("exp_month",v)} style={styles.input}/>
                        {submit && !fields.exp_month?<Text style={{color:'red',fontSize:12}}>Please fill</Text>:null}
                        </View>
                        <View style={{width:'50%'}}>
                        <Text style={styles.inputTxt}>Expire Year</Text>
                        <TextInput keyboardType="number-pad" onChangeText={(v)=>getValue("exp_year",v)} style={styles.input}/>
                        {submit && !fields.exp_year?<Text style={{color:'red',fontSize:12}}>Please fill</Text>:null}
                        </View>
                        </View>
                        <View style={{justifyContent:'center',alignItems:'center',marginTop:hp(2)}}>
                        <TouchableOpacity onPress={()=>{
                            setSubmit(true)
                            if(fields.card_num && fields.exp_year && fields.total_amount && fields.exp_month && fields.cvc){
                                renderLoading(true)
                                requestPayment()
                            }
                        }} style={styles.payBtn} >
                                {loading?<Loader color="white" size={20}/>:<Text style={styles.payBtnText}>PAY</Text>}
                        </TouchableOpacity>
                        </View>
                    </View>
                    </View>
                </View>
          </ScrollView>
        </View>
      );
}

const styles=StyleSheet.create({
    con:{
        paddingLeft:15,
        paddingRight:15,
        paddingBottom:15,
        marginLeft:5,
        marginRight:5,
        marginTop:10,
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
    picker:{
        backgroundColor:'white',
        borderRadius:7,
        borderWidth:1,
        borderColor:'#D7E1EA'
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
    inputTxt:{
        fontSize:RFPercentage(1.7),
        fontFamily:'Poppins-Regular',
        marginTop:5,
        color:'#71809C',
        width:'90%'
    },
    payBtn:{
        backgroundColor:'#001441',
        width:wp(70),
        height:40,
        borderRadius:6,
        justifyContent:'center',
        alignItems:'center'
    },
    payBtnText:{
        fontFamily:'Poppins-Regular',
        color:'white'
    },
    lastCon:{
        width:'100%',
        flexDirection:'row',
    },
    title:{
        marginTop:hp(3),
        fontFamily:'Poppins-SemiBold',
        fontSize:RFPercentage(3)
    },
    line:{
        height:1,
        backgroundColor:'#888A8E',
        marginTop:hp(2),
        marginBottom:hp(2)
    },
    paymentText:{
        fontFamily:'Poppins-Regular',
        fontSize:RFPercentage(1.7),
        color:'#72809D'
    }
})
export default connect(null,actions)(PaymentMethod);