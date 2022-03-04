import React,{useEffect,useState} from 'react';
import {View,Text,StyleSheet,ScrollView,Animated,Dimensions,TextInput,FlatList, Touchable} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { connect } from 'react-redux';
import Header from "../../component/header"
import * as actions from "../../store/actions"
import {useNavigation} from  "@react-navigation/native"
import Loader from '../../component/loader';


const {height}=Dimensions.get('window')

function Resource({getResource,resource}){
    const navigation=useNavigation()
    const [loading,setLoading]=useState(false)
    const position=useState(new Animated.Value(height))[0];
    useEffect(()=>{
        getResource().then(()=>{
            setLoading(true)
        })
        Animated.timing(position,{
            toValue:0,
            duration:500,
            useNativeDriver:true
        }).start()
    },[])
    

    const RenderResource=({item})=>{
        return(
            <View style={styles.subCon}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:10}}>
                    <View>
                        <Text style={{fontSize:20,fontWeight:'700',color:'#001441'}}>{item.project_name.toUpperCase().slice(0,12)+" ..."}</Text>
                        <Text>{item.user_name}</Text>
                        <Text>{item.category}</Text>
                    </View>
                    <View style={{height:90,justifyContent:'space-around'}}>
                        <Text style={{fontSize:11,color:'black'}}>Start Date: <Text style={{color:'gray'}}> {item.assign_resource_start_date}</Text> </Text>
                        <Text style={{fontSize:11,color:'black'}}>End Date: <Text style={{color:'gray'}}> {item.assign_resource_end_date}</Text> </Text>
                    </View>
                </View>
                <TouchableOpacity
                onPress={()=>navigation.navigate('resourceDetail',item)}
                style={{backgroundColor:'#001441',justifyContent:'center',alignItems:'center',height:40,borderBottomLeftRadius:7,borderBottomRightRadius:7}}
                >
                        <Text style={{color:'white'}}>View Details</Text>
                </TouchableOpacity>
            </View>
        )
    }

if(loading){
    return(
        <View style={styles.mainDiv}>
        <Header iconName="md-menu" title="Resource"/>
        <Animated.View style={{...styles.container,transform:[{translateY:position}]}}>
            <FlatList
            data={resource}
            style={{paddingLeft:15,paddingRight:15}}
            renderItem={RenderResource}
            keyExtractor={(item,i)=>i.toString()}
            />
        </Animated.View>
    </View>
    )
}else{
    return <Loader color="blue" size={30}/>
}


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
    fieldsCon:{
        alignItems:'center',
    },
    subCon:{
        marginTop:10,
        marginBottom:10,
        width:'100%',
        borderRadius:7,
        backgroundColor:'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        justifyContent:'flex-start'
    }
})

function mapStateToProps({resource}){
    return {resource}
}



export default connect(mapStateToProps,actions)(Resource)