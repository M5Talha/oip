import React, { Component } from 'react'
import { Text, View,Modal ,StyleSheet,Dimensions, TouchableOpacity} from 'react-native'
import IconCamera from "react-native-vector-icons/Entypo"
import { RFPercentage} from "react-native-responsive-fontsize";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

const {width,height}=Dimensions.get('window')
function ImageModel({visible,closeModle,openCamera,openLibrary}){
    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        style={{flex:1,justifyContent:'center'}}
        >
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <View style={styles.con}>
                    <View style={styles.iconCon}>
                    <TouchableOpacity style={styles.icon} onPress={()=>openCamera()}>
                        <IconCamera name="camera" color="#001441" size={40}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon} onPress={()=>openLibrary()}>
                        <IconCamera name="image" color="#001441" size={40}/>
                    </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={()=>closeModle()}>
                        <Text style={styles.btnText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
const styles=StyleSheet.create({
    con:{
        backgroundColor:'white',
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
        flex:5,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
    },
    btn:{
        flex:1,
        backgroundColor:'#F2F2F2',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20
    },
    btnText:{
        color:'#72809D',
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
export default ImageModel;