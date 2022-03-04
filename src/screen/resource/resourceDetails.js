import React,{useEffect,useState} from 'react';
import {View,Text,StyleSheet,ScrollView,Animated,Dimensions,TextInput,Image} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { connect } from 'react-redux';
import Header from "../../component/header"
import * as actions from "../../store/actions"
import ImgIcon from "react-native-vector-icons/Entypo"
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';



const {height}=Dimensions.get('window')

function ResourceDetail({route,navigation}){
    const position=useState(new Animated.Value(height))[0];
    useEffect(()=>{
        getUser()
        Animated.timing(position,{
            toValue:0,
            duration:500,
            useNativeDriver:true
        }).start()
    },[])

    const [user,setUser]=useState("");
    async function getUser(){
        const USER=await AsyncStorage.getItem('USER')
        if(USER==="accountManager"){
            setUser(USER)
        }
    }
    function renderUsers(){
        if(route.params.assign_resource_user){
            return route.params.assign_resource_user.map((u,i)=>{
                return(
                    <View key={i} style={{margin:5,backgroundColor:'white',width:100,justifyContent:'center',alignItems:'center',padding:5,borderRadius:7}}>
                        {u.user_image?(
                            <Image
                            style={{width:40,height:40,borderRadius:50/2}}
                            source={{uri:`https://api.outsourceinpakistan.com/uploads/user/${u.user_image}`}}
                            />
                        ):(
                        <View>
                            <ImgIcon
                            name="image"
                            color="gray"
                            size={30}
                            />
                        </View>
                        )}
                        <Text>{u.user_name}</Text>
                    </View>
                )
            })
        }else{
            return null
        }
    }
    return(
        <View style={styles.mainDiv}>
        <Header 
        back="back"
        iconName="chevron-back" 
        title="Resource"
        />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingLeft:5,paddingRight:5,width:wp(100)}}>
        <Animated.View style={{...styles.container,transform:[{translateY:position}]}}>
            <View style={styles.fieldsCon}>
                    <Text style={styles.inputTxt}>Project Name</Text>
                    <Text style={{...styles.input,height:route.params.project_name.length>30?55:40}}>{route.params.project_name+"sdjflsja slfjlsadj"}</Text>
                    <Text style={styles.inputTxt}>Resource Name</Text>
                    <Text style={styles.input}>{route.params.user_name}</Text>
                    <Text style={styles.inputTxt}>Category</Text>
                    <Text style={styles.input}>{route.params.category}</Text>
                    <Text style={styles.inputTxt}>Start Date</Text>
                    <Text style={styles.input}>{route.params.assign_resource_start_date}</Text>
                    <Text style={styles.inputTxt}>End Date</Text>
                    <Text style={styles.input}>{route.params.assign_resource_end_date}</Text>
            </View>
            {user==="accountManager"?null:(
                <View style={styles.fieldsCon}>
                <Text style={{...styles.inputTxt,color:'#001441',fontWeight:'700',marginLeft:10}}>PROJECT TEAM MEMBERS</Text>
                    <View style={{flexDirection:'row',flexWrap:'wrap',marginLeft:'auto',marginRight:'auto',width:'90%'}}>
                        {renderUsers()}
                    </View>
                    <View>
                    </View>
                </View>
            )}
            <TouchableOpacity
            onPress={()=>navigation.navigate('kpi',route.params.assign_resource_id)}
                    style={{backgroundColor:'#001441',justifyContent:'center',alignItems:'center',height:40,width:'90%',marginLeft:'auto',marginRight:'auto',borderRadius:7,marginTop:10,marginBottom:10}}
                    >
                        <Text style={{color:'white'}}>KPI</Text>
                    </TouchableOpacity>
        </Animated.View>
        </ScrollView>
    </View>
    )
}

const styles=StyleSheet.create({
    mainDiv:{
        flex:1,
        alignItems:'center',
        width:'100%',
    },
    container:{
        flex:1,
        paddingBottom:10,
        marginTop:10,
        marginBottom:10,
        width:'100%',
        borderRadius:7,
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
    inputTxt:{
        marginTop:10,
        color:'#71809C',
        fontSize:12,
        width:'90%'
    },
    fieldsCon:{
        alignItems:'center',
    },
    input:{
        width:'90%',
        borderRadius:7,
        borderWidth:1,
        borderColor:'#DCE0E7',
        backgroundColor:'white',
        height:40,
        marginTop:10,
        paddingTop:8,
        paddingLeft:8
    },
})

function mapStateToProps(){
    return {user:5}
}



export default connect(mapStateToProps,actions)(ResourceDetail)