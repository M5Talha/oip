import React, { useEffect, useMemo, useState } from "react";
import {View,Text,StyleSheet,Dimensions,FlatList,TouchableOpacity,Animated, VirtualizedList} from "react-native";
import Header from "../../component/header"
import * as Progress from 'react-native-progress';
import Pie from 'react-native-pie'
import { useNavigation } from '@react-navigation/native';
import { RFPercentage } from "react-native-responsive-fontsize";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import ProjectIcon from "react-native-vector-icons/Ionicons"
import { ScrollView } from "react-native-gesture-handler";
import * as actions from "../../store/actions"
import {connect} from "react-redux"
const {height,width}=Dimensions.get('window');
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../component/loader";


function DepartCategory({getPackages,route,packages,navigation}){ 

    const [loading,setLoading]=useState(false)


    useEffect(()=>{
        getPackages(route.params.department_id).then(()=>{
            setLoading(true)
        })
    },[])

    function onPressPackage(item){
        if(item.having_sub_package=="0"){
            navigation.navigate('subCategory',{...item,projectType:route.params.department_id})
        }else{
            navigation.navigate('createProjectByForm',{
                projectType:route.params.department_id,
                price:item.package_price,
                des:item.package_description,
                package_name:item.package_name
            })
        }
    }
    function getStart(item){
        navigation.push('createProjectByForm',{
            projectType:route.params.department_id,
            price:item.package_price,
            des:item.sub_package_description,
            package_name:item.package_name,
            custom:false
        })
    }

    function onPressCustomPackage(item){
        if(item.having_sub_package=="0"){
            navigation.navigate('subCategory',{...item,projectType:route.params.department_id})
        }else{
            navigation.push('createProjectByForm',{
                projectType:route.params.department_id,
                price:item.package_price,
                des:item.package_description,
                package_name:item.package_name,
                custom:true
            })
        }
    }

      function renderDepartments({item}){
          return(
            <View style={{width:'100%',marginVertical:5}}>
            <View style={styles.departCon}>
            <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
            <Text style={{width:'80%',fontWeight:'bold',textTransform:'uppercase',color:'#001441'}}>{item.package_name}</Text>
            {
                item.having_sub_package=="0"?null:<Text style={{color:'green',fontWeight:'bold'}}>{item.package_price}</Text>
            }
            
            </View>
            <View style={{width:'100%'}}>
            <Text style={{color:'gray',fontSize:12,textAlign:'left',marginTop:5}}>
            {item.package_description}
            </Text>
            </View>
            <View style={{width:'100%',marginTop:10}}>
                <Text style={{width:'100%',textAlign:'right',fontSize:12}}>{item.package_created_date}</Text>
            </View>
            {item.having_sub_package=="0"?(
                <TouchableOpacity 
                onPress={()=>onPressPackage(item)}
                style={styles.customizeBtn}>
                    <Text style={{color:'white',textTransform:'uppercase'}}>View Packages</Text>
                </TouchableOpacity>
            ):(
                <>
                <TouchableOpacity 
                onPress={()=>getStart(item)}
                style={{...styles.customizeBtn,backgroundColor:'#001441'}}>
                    <Text style={{color:'white',textTransform:'uppercase'}}>Get Start</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>onPressCustomPackage(item)}
                style={styles.customizeBtn}>
                    <Text style={{color:'white',textTransform:'uppercase'}}>Customize</Text>
                </TouchableOpacity>
                </>
            )}
            </View>
        </View>
          )
      }

      function RenderContent(){
          if(loading){
            if(packages.length>0){
            return (
                    <FlatList
                showsVerticalScrollIndicator={false}
                style={{width:'95%'}}
                data={packages}
                renderItem={renderDepartments}
                keyExtractor={(item,i)=>i.toString()}
                />
                )
            }else{
                return(
                    <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                        <Text style={{fontSize:22,fontWeight:'bold'}}>Not Found</Text>
                    </View>
                )
            }
          }else{
              return <Loader color="blue" size={30}/>
          }
      }

    return(
        <View style={styles.container}>
            <Header
            title="Dashboard"
            back="back"
            iconName="chevron-back"
            />
            {RenderContent()}
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        alignItems:'center',
        flex:1,
        backgroundColor:'#F2F2F2',
    },
    departCon:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        borderRadius:7,
        padding:15,
        },
    customizeBtn:{
        marginTop:5,
        backgroundColor:'#da8d06',
        width:'100%',
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:7,
    }
})

function mapStateToProps({packages}){
    return {packages}
}
export default connect(mapStateToProps,actions)(DepartCategory);