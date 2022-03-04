import React, { Component } from 'react';
import { View, Text,StyleSheet,Image} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage} from "react-native-responsive-fontsize";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Header from "../../component/header";


function PayNow({navigation}){

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
                <Text style={styles.mainHead}>Logo Design</Text>
                <Text style={styles.det}>Payment via PayPal, 24-01-2021 at 00:16 Customer IP: 24.132.250.148</Text>
                <TouchableOpacity style={styles.btn}>
                    <Text style={{color:'white'}}>PENDING</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.card}>
                {/* Reminder LOOP */}
                <View style={styles.row}>
                    <View style={{width:wp(55)}}><Text style={{color:'#8E8E8E',fontFamily:'Poppins-Regular'}}>Item</Text></View>
                    <View style={{width:wp(18)}}><Text style={{color:'#8E8E8E',fontFamily:'Poppins-Regular'}}>Qty</Text></View>
                    <View style={{width:wp(18)}}><Text style={{color:'#8E8E8E',fontFamily:'Poppins-Regular'}}>Total</Text></View>
                </View>
                <View style={styles.row}>
                    <View style={{width:wp(55)}}>
                        <View style={styles.firstItem}>
                            <Image style={{width:wp(12),height:wp(12)}} source={require("../../../assets/images/round.png")}/>
                            <View style={{marginLeft:hp(1)}}>
                                <Text style={{fontFamily:'Poppins-Regular'}}>Logo Design</Text>
                                <Text style={{fontFamily:'Poppins-Regular'}}>24-01-2021</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{...styles.firstItem,width:wp(18)}}><Text style={{fontFamily:'Poppins-Regular'}}>x1</Text></View>
                    <View style={{...styles.firstItem,width:wp(18)}}><Text style={{fontFamily:'Poppins-Regular'}}>$195</Text></View>
                </View>
                <View style={styles.line}/>
                <View style={styles.row}>
                    <View style={{width:wp(55+18)}}><Text style={{color:'#8E8E8E',fontFamily:'Poppins-Regular'}}>Total</Text></View>
                    <View style={{width:wp(18)}}><Text style={{fontFamily:'Poppins-Regular'}}>$195</Text></View>
                </View>
            </View>
            <View>
                <Text style={styles.billing}>BILLING</Text>
                <View style={styles.halfLine}/>
                <Text style={styles.billingDes}>Craig Hafer Walsky 8 Kane Road Morgantown, PA 19543</Text>
                <Text style={{...styles.billingDes,fontSize:RFPercentage(1.8),textDecorationLine:'underline'}}>cdhafer@me.com</Text>
                <Text style={{...styles.billingDes,fontSize:RFPercentage(1.8),textDecorationLine:'underline'}}>610-750-4463</Text>
                <TouchableOpacity style={styles.btnPayNow} onPress={()=>navigation.navigate('paymethod')}>
                    <Text style={{color:'white'}}>PAY NOW</Text>
                </TouchableOpacity>
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
        fontSize:RFPercentage(2.7),
        marginTop:hp(2),
        marginBottom:hp(1)
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
        backgroundColor:'#AE1818',
        borderRadius:3
    },
    firstItem:{
        flexDirection:'row',
        alignItems:'center',
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
        marginTop:hp(2),
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
    }
})
export default PayNow;