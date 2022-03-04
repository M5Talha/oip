import React, { Component } from 'react'
import { Text, View,Modal ,StyleSheet,Dimensions, TouchableOpacity} from 'react-native'
import IconSuccess from "react-native-vector-icons/Entypo"
import { RFPercentage} from "react-native-responsive-fontsize";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { color } from 'react-native-reanimated';

const {width,height}=Dimensions.get('window')
function KpiModel({visible,closeModle,title,Des, hour}){
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
                        <TouchableOpacity 
                        onPress={()=>closeModle()}
                        style={{position:'absolute',zIndex:2,right:1,top:15}}>
                            <IconSuccess name="cross" color="lightgray" size={35}/>
                        </TouchableOpacity>
                        <View style={{height:height/1.6,width:'100%',}}>
                            <Text style={{fontSize:14,marginTop:20,fontWeight:'700'}}>Title: <Text> {title}</Text></Text>
                            <Text style={{fontSize:14,marginTop:3,fontWeight:'700'}}>Hours: <Text> {hour}</Text></Text>
                            <Text style={{fontSize:14,marginTop:20}}>Describtion</Text>
                            <Text style={{fontSize:14,marginTop:5,flex:1,backgroundColor:'#F2F2F2',padding:10}}>{Des}</Text>
                        </View>
                    </View>

                </View>
            </View>
        </Modal>
    )
}
const styles=StyleSheet.create({
    con:{
        backgroundColor:'white',
        width:width/1.25,
        height:height/1.5,
        borderRadius:7,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    iconCon:{
        width:'90%',
        marginLeft:'auto',
        marginRight:'auto',
        flex:1,
        justifyContent:'center'
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
        alignItems:'center',
        
    }
})
export default KpiModel;