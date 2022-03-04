import React, { Component } from 'react'
import { Text, View,Modal ,StyleSheet,Dimensions, TouchableOpacity} from 'react-native'
import IconSuccess from "react-native-vector-icons/AntDesign"
import { RFPercentage} from "react-native-responsive-fontsize";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { color } from 'react-native-reanimated';

const {width,height}=Dimensions.get('window')
function SuccessModel({visible,closeModle,title,go,backToTop}){
    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        style={{flex:1,justifyContent:'center',elevation:5}}
        >
            <View style={{flex:1,justifyContent:'center',alignItems:'center',height:height,backgroundColor:'rgba(0,0,0,0.7)'}}>
                <View style={styles.con}>
                    <View style={styles.iconCon}>
                    <IconSuccess name="checkcircle" color="green" size={35}/>
                    <Text style={{marginTop:10,color:'grey',fontFamily:'Poppins-Regular'}}>{title}</Text>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={()=>{
                        closeModle()
                        go?go():null
                        backToTop?backToTop():null
                    }}>
                        <Text style={styles.btnText}>Ok</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
const styles=StyleSheet.create({
    con:{
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        width:width/1.5,
        height:height/4,
        borderRadius:20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    iconCon:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
    btn:{
        marginTop:15,
        height:30,
        backgroundColor:'green',
        width:'70%',
        borderRadius:7
    },
    btnText:{
        color:'white',
        fontFamily:'Poppins-Regular',
        fontSize:RFPercentage(2.5),
        textAlign:'center',
        textAlignVertical:'center',
        marginTop:2
    },
    icon:{
        backgroundColor:'white',
        borderWidth:4,
        borderColor:'#001441',
        width:wp(18),
        height:wp(18),
        borderRadius:wp(18)/2,
        justifyContent:'center',
        alignItems:'center'
    }
})
export default SuccessModel;