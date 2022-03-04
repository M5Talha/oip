import React, { Component } from 'react'
import { Text, View,StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import IconMenu from "react-native-vector-icons/Ionicons";
import { RFPercentage} from "react-native-responsive-fontsize";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
function Header({title,iconName,back,call}){
    const navigation = useNavigation();
    return (
        <>
            <View style={styles.Header}>
                <TouchableOpacity onPress={()=>{
                    back?navigation.goBack():navigation.openDrawer()
                    call?call():null
                }}>
                <View style={{marginLeft:15}}>
                    <IconMenu name={iconName} color="#001441" size={30}/>
                </View>
                </TouchableOpacity>
                <Text style={styles.title}> {title} </Text>
                <View style={{width:30}}/>
            </View>
        </>
    )
}

const styles=StyleSheet.create({
    Header:{
        height: hp(8),
        width: '100%',
        flexDirection:'row',
        backgroundColor:'white',
        justifyContent:'space-between',
        alignItems:'center'
    },
    title:{
        paddingTop:2,
        fontSize:RFPercentage(3),
        fontFamily:'Poppins-Bold',
        color:'#222222'
    }
})


export default Header;
