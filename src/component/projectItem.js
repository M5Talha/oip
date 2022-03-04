import React, { Component,useEffect,useState } from 'react'
import { Text, View,StyleSheet ,Image,TouchableOpacity,Dimensions} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
const {width,height}=Dimensions.get('window')
function ProjectItem({projectName,payment,date,navigate,deliveryStatus,balance,project_price,brand,project_paid}) {
    const [user,setUser]=useState("");

    useEffect(()=>{
        getUser()
    },[])
    function renderButton(){
        if(balance==0 && project_price==0){
            return(

                        <Text style={{fontFamily:'Poppins-SemiBold',fontSize:11,marginRight:5,color:'gray'}}>IN PROCESS</Text>

            )
        }
        else if(balance>0){
           return(
            <TouchableOpacity
            onPress={()=>navigate()}
            style={{...styles.btn,backgroundColor:'red'}}
            >
                <Text style={{fontFamily:'Poppins-SemiBold',fontSize:15,marginRight:5,color:'white'}}>PAY</Text>
            </TouchableOpacity>
           )
        }
        else if(balance==0 && project_price>0){
            return(
                <TouchableOpacity
                    // onPress={navigate}
                    style={{...styles.btn,backgroundColor:'green'}}
                    >
                        <Text style={{fontFamily:'Poppins-SemiBold',fontSize:15,marginRight:5,color:'white'}}>PAID</Text>
                </TouchableOpacity>
            )
        }
    }
    async function getUser(){
        const USER=await AsyncStorage.getItem('USER')
        if(USER==="accountManager"){
            setUser(USER)
        }
    }
    function renderBrand(brand){
        if(brand=="0"){
            return 'Outsource In Pakistan'
        }
        else if(brand=="1"){
            return 'Hire In Pakistan'
        }
        else{
            return false
        }
    }

    return (
        <View style={styles.con}>
            <View style={{width:'25%',}}>
            <View style={styles.left}>
                <Text style={{color:'white',fontFamily:'Poppins-Bold',fontSize:22}}>{projectName.slice(0,1).toUpperCase()}</Text>
            </View>
            </View>
            <View style={{width:'50%'}}>
            <Text style={styles.title}>{projectName?projectName.toUpperCase().slice(0,20)+" ...":null}</Text>
            <Text>{deliveryStatus}</Text>
            <Text style={styles.amount}>{payment}</Text>
            </View>
            <View style={styles.right}>
                <Text style={styles.date}>{date?date.slice(0,10):null}</Text>
                {user?(
                    <>
                    <Text style={{fontSize:12,color:'gray',textAlign:'right'}}>{renderBrand(brand)}</Text>
                    </>
                ):renderButton()}
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
        color:'white',
        justifyContent:'center',
        alignItems:'center'
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
export default ProjectItem;