import React, { Component, useEffect, useState,useMemo } from 'react'
import { Text, View,FlatList ,StyleSheet,TouchableOpacity,Animated,Dimensions,Platform} from 'react-native';
import ProjectItem from "../../component/projectItem"
import Header from "../../component/header"
import * as actions from "../../store/actions";
import {connect} from "react-redux"
import { useNavigation } from '@react-navigation/native';
import Loader from "../../component/loader";
import useStateWithCallback from 'use-state-with-callback';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {api,accountM} from "../../config/config.json"
import axios from "axios"
import { TextInput } from 'react-native-gesture-handler';
import SearchIcon from "react-native-vector-icons/Feather"

const {height}=Dimensions.get('window')
function Myproject({getMyProjects,myProjects,refreshProjects,clearProjects}) {
    const navigation = useNavigation();
    const position=useState(new Animated.Value(height))[0];
    const [page,setPage]=useState(0)
    const [refresh,setRefresh]=useState(false)
    const [totalPages,setTotalPages]=useState(0)
    const [searchText,setSearchText]=useState('')
    const [loading, setLoading] = useStateWithCallback(false,()=>{
        Animated.timing(position,{
            delay:500,
            toValue:0,
            duration:500,
            useNativeDriver:true
        }).start()
    })

    useEffect(()=>{
        getTotalPages()
    },[])

    const getMyProjectsMemo=useMemo(()=>{
        getMyProjects(page,searchText).then(()=>{
            setLoading(true)
        })
    },[page])

    // const refreshMemo=useMemo(()=>{
    //     navigation.addListener('focus', () => {
    //         refreshProjects(searchText)
    //       });
        
    // },[navigation])


    async function getUser(){
        const USER=await AsyncStorage.getItem('USER')

    }
    async function getTotalPages(){
        const USER=await AsyncStorage.getItem('USER')
        const token=await AsyncStorage.getItem('token')
        axios.post(`${USER==="accountManager"?accountM+'/all_projects':api+'/client_projects'}/${page?page:1}`,{
            search_text:searchText
        },{headers:{
            Authorization:token
        }}).then(res=>{
            setTotalPages(res.data.data.total_pages)
        })
    }
    function showList(){
        setLoading(true)
    }
    function loadMore(){
        if(Number(totalPages*10)>page){
            setPage((ps)=>{
                return ps+10
            })
        }
    }

    function showSpinner(){
        if(Number((totalPages*10)-10)>page && Number(totalPages)!=page ){
            return <Loader color="blue" size={30}/>
        }else{
            return null
        }

    }
    function searchProjects(){
        setLoading(false)
        setPage(0)
        getTotalPages()
        clearProjects()
        getMyProjects(page,searchText).then(()=>{
            setLoading(true)
        })
    }
    function onRefresh(){
        setRefresh(true)
        setPage(0)
        refreshProjects(0).then(()=>{
            setRefresh(false)
        })
    }
    const renderList=({item})=>{
        return(
            <TouchableOpacity onPress={()=>navigation.push('projectdetail',item)}>
            <ProjectItem
            brand={item.brand_id}
            projectName={item.project_name} 
            payment={item.project_price} 
            date={item.client_projects_date}
            deliveryStatus={item.delivery_status}
            project_price={item.project_price}
            project_paid={item.project_paid}
            navigate={()=>navigation.navigate(Platform.OS==="android"?'androidPay':'paymethod',item)}
            balance={item.project_balance}
            />
            </TouchableOpacity>
        )
    }
    function renderProjects(){
        if(myProjects.length>0){
            return(
                <FlatList
                showsVerticalScrollIndicator={false}
                data={myProjects}
                keyExtractor={(item,i)=>i.toString()}
                renderItem={renderList}
                onEndReached={loadMore}
                onEndReachedThreshold={0.1}
                ListFooterComponent={showSpinner}
                refreshing={refresh}
                onRefresh={onRefresh}
                />
            )
        }else{
            return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:20,fontWeight:'700'}}>Not Found</Text>
                </View>
            )
        }
    }

    return (
        <View style={{flex:1}}>
            <Header title="My Projects" iconName="md-menu"/>
            <View style={{backgroundColor:'white',width:'98%',marginLeft:'auto',marginRight:'auto',marginTop:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderRadius:7}}>
                <TextInput
                placeholder="Search"
                onChangeText={v=>setSearchText(v)}
                style={{height:50,width:'80%',paddingLeft:20}}
                />
                <TouchableOpacity 
                onPress={searchProjects}
                style={{backgroundColor:'#001441',height:50,width:'20%',justifyContent:'center',alignItems:'center',borderTopRightRadius:7,borderBottomRightRadius:7}}>
                    <SearchIcon
                    name="search"
                    size={30}
                    color="#ffffff"
                    />
                </TouchableOpacity>
            </View>
            {loading?(
                <Animated.View style={{...styles.con,transform:[{translateY:position}]}}>
                {renderProjects()}
                </Animated.View>
            ):<View style={{flex:1}}><Loader color="blue" size={25}/></View>}
            
        </View>
    )
}
const styles=StyleSheet.create({
    con:{
        flex:1,
        paddingLeft:15,
        paddingRight:15,
        paddingBottom:10,
        marginLeft:5,
        marginRight:5,
        marginTop:10,
        borderTopLeftRadius:7,
        borderTopRightRadius:7,
        backgroundColor:'#F2F2F2',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    }
})
function mapStateToProps({myProjects}){
return {myProjects}
}

export default connect(mapStateToProps,actions)(Myproject)
