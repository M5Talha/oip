import React, { Component } from 'react'
import { Text, View,Modal ,StyleSheet,Dimensions, TouchableOpacity} from 'react-native'
import IconSuccess from "react-native-vector-icons/Entypo"
import { RFPercentage} from "react-native-responsive-fontsize";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { color } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';

const {width,height}=Dimensions.get('window')
function KpiModel({visible,closeModle,projectName,data, projectType}){

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
                        <View style={{width:'100%',}}>
                            <Text style={{fontSize:14,marginTop:20,fontWeight:'700'}}>Project Name: <Text> {projectName.slice(0,12)+" ..."}</Text></Text>
                            <Text style={{fontSize:14,marginTop:3,fontWeight:'700'}}>Project Type: <Text> {projectType}</Text></Text>
                        </View>
                        </View>
                    <ScrollView style={{flex:1,marginTop:10,width:'90%',marginLeft:'auto',marginRight:'auto'}}>
                        <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{backgroundColor:'#f5f5f5',width:'60%',padding:5,fontSize:12}}>Question</Text>
                            <Text style={{backgroundColor:'#f5f5f5',width:'35%',padding:5,fontSize:12}}>Answere</Text>
                        </View>
                        {data.map((d,i)=>{
                            return (
                                <View key={i} style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
                                 <Text style={{width:'60%',padding:5,fontSize:12}}>{d.department_question_text}</Text>
                                <Text style={{width:'35%',padding:5,fontSize:12}}>{d.department_answer_text}</Text>
                                </View>
                            )
                        })}
                    </ScrollView>
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
        elevation: 4
    },
    iconCon:{
        width:'90%',
        marginLeft:'auto',
        marginRight:'auto',
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