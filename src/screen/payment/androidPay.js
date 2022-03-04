import React,{useState,useEffect} from 'react';
import { View ,Text, TouchableOpacity,StyleSheet,TextInput,ScrollView,Image} from 'react-native';
import Header from "../../component/header";
import { StripeProvider } from '@stripe/stripe-react-native';
import {connect} from "react-redux"
import * as actions from "../../store/actions"
import Loader from "../../component/loader"
import SuccessModel from "../../component/successModel"
import { RFPercentage} from "react-native-responsive-fontsize";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { CardField, useStripe } from '@stripe/stripe-react-native';

function AndroidPay({route,payNow,navigation}){
    const {createToken } = useStripe();
    const [fields,setFields]=useState({
        total_amount:"",
        card_num:"",
        exp_month:"",
        exp_year:"",
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

    const requestPayment = () => {
        renderLoading(true)
        payNow(fields,route.params.client_projects_id,renderLoading,renderModel)
      };
      function renderModel(con){
        if(con){
            setModel(true)
        }else{
            setModel(false)
        }
    }
    return(
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
                    <StripeProvider publishableKey="pk_live_51IjNTMDTC6LK12UW7aqlq2KXrAWpcJNx7xjt3zV32xqylMdQmmQ4DLs1IvS0LJ1X5NHHPrKvq97cjCC73uZdHOt000aN6GTLZQ">
                    <CardField
                    postalCodeEnabled={false}
                        placeholder={{
                            number: '4242 4242 4242 4242',
                        }}
                        
                        cardStyle={{
                            backgroundColor: '#FFFFFF',
                            textColor: '#000000',
                        }}
                        style={{
                            width: '100%',
                            height: 50,
                            marginVertical: 30,
                        }}
                        onCardChange={(cardDetails) => {
                            if(cardDetails.complete){
                                createToken(cardDetails).then(res=>{
                                    getValue("card_num",res.token.card.last4)
                                    getValue("exp_month",res.token.card.expMonth)
                                    getValue("exp_year",res.token.card.expYear)
                                    getValue("stripeToken",res.token.id)
                                    
                                })
                            }
                            
                        }}

                        />
                    </StripeProvider>
                        <Text style={styles.inputTxt}>Amount</Text>
                        <TextInput keyboardType="number-pad" defaultValue={route.params.project_price} onChangeText={(v)=>getValue("total_amount",v)} style={styles.input}/>
                        {submit && !fields.total_amount?<Text style={{color:'red',fontSize:12}}>Please fill</Text>:null}
                        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                        </View>
                        <View style={{justifyContent:'center',alignItems:'center',marginTop:hp(2)}}>
                        <TouchableOpacity onPress={()=>{
                            setSubmit(true)
                            console.log(fields)
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
    )
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

export default connect(null,actions)(AndroidPay);
