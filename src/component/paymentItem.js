import React, { Component } from 'react'
import { Text, View,StyleSheet ,Image,TouchableOpacity,Dimensions} from 'react-native'

const {width,height}=Dimensions.get('window')
function PaymentItem({projectName,payment,date,btnName,btnColor,navigate,paymentStatus,paymentNo}) {
    return (
        <View style={styles.con}>
            <View style={{width:'25%',}}>
            <View style={styles.left}>
                <Text style={{color:'white',fontFamily:'Poppins-Bold',fontSize:22}}>{projectName?projectName.slice(0,1).toUpperCase():null}</Text>
            </View>
            </View>
            <View style={{width:'50%'}}>
            <Text style={styles.title}>{projectName?projectName.toUpperCase().slice(0,20)+" ...":null}</Text>
            <Text>{paymentNo}</Text>
            <Text style={styles.amount}>{payment}</Text>
            </View>
            <View style={styles.right}>
                <Text style={styles.date}>{date.slice(0,10)}</Text>
                {paymentStatus==="Paid"?(
                    <Text style={{fontFamily:'Poppins-SemiBold',color:'green',fontSize:15,marginRight:5}}>{paymentStatus}</Text>
                ):(
                    <Text style={{fontFamily:'Poppins-SemiBold',color:'red',fontSize:15,marginRight:5}}>{paymentStatus}</Text>
                )}
                
            </View>
        </View>

    )
}
const styles=StyleSheet.create({
    con:{ 
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        borderRadius:7,
        backgroundColor:'white',
        padding:10,
        marginTop:10,
        marginBottom:10

    },
    right:{
        justifyContent:'space-between',
        alignItems:'flex-end',
        height:70,
        width:'25%',
    },
    title:{
        fontSize:16,
        color:'#001441',
        fontWeight:'bold'
    },
    subTitle:{
        color:'#222222',
        fontSize:12
    },
    amount:{
        color:'#222222',
        fontSize:24
    },
    btn:{
        textAlign:'center',
        textAlignVertical:'center',
        width:77,
        height:27,
        fontSize:12,
        fontWeight:'bold',
        borderRadius:5,
        color:'white'
    },
    date:{
        fontSize:12,
        color:'#222222'
    },
    left:{
        backgroundColor:'orange',
        width:50,
        height:50,
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center'

    }
})
export default PaymentItem;