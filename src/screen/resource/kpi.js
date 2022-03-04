import React, { Component, useEffect, useState,useMemo } from 'react'
import { Text, View,FlatList ,StyleSheet,TouchableOpacity,Animated,Dimensions} from 'react-native';
import ProjectItem from "../../component/projectItem"
import Header from "../../component/header"
import * as actions from "../../store/actions";
import {connect} from "react-redux"
import { useNavigation } from '@react-navigation/native';
import Loader from "../../component/loader";
import useStateWithCallback from 'use-state-with-callback';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios"
import KpiModel from "../../component/kpiModel"
import {api,accountM} from "../../config/config.json"
import DateIcon from "react-native-vector-icons/Fontisto"
import DateTimePicker from '@react-native-community/datetimepicker';
import dateFormat from "../../utils/dateFormat"

const {height}=Dimensions.get('window')
function Myproject({getKpi,kpi,route,refreshkpis,clearKpi}) {
    const navigation = useNavigation();
    const position=useState(new Animated.Value(height))[0];
    const [page,setPage]=useState(0)
    const [model,setModel]=useState(false)
    function renderModel(con){

        if(con){
            setModel(true)
        }
        else{
            setModel(false)
        }

    }
    const [totalPages,setTotalPages]=useState(0)
    const [refresh,setRefresh]=useState(false)
    const [loading, setLoading] = useStateWithCallback(false,()=>{
        Animated.timing(position,{
            delay:500,
            toValue:0,
            duration:500,
            useNativeDriver:true
        }).start()
    })

    useEffect(()=>{
        getUser()
        getTotalPages()
    },[])

    const getMyProjectsMemo=useMemo(()=>{
        getKpi(route.params,page,dateFormat(date),dateFormat(date2)).then(()=>{
            setLoading(true)
        })
    },[page])

    const search=()=>{
        setLoading(false)
        clearKpi()
        setPage(0)
        getKpi(route.params,page,dateFormat(date),dateFormat(date2)).then(()=>{
            setLoading(true)
        })
    }

    async function getTotalPages(){
        const USER=await AsyncStorage.getItem('USER')
        const token=await AsyncStorage.getItem('token')
        axios.post(`${USER==="accountManager"?accountM:api}/kpi/${route.params}/${0}`,{
            to_date:date,
            from_date:date2
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
        if(Number(totalPages*10)>page){
            return <Loader color="blue" size={30}/>
        }else{
            return null
        }

    }
    function onRefresh(){
        setRefresh(true)
        refreshkpis(route.params).then(()=>{
            setRefresh(false)
        })
    }

    const [kpiObject,setKpiObject]=useState({})

    const [user,setUser]=useState("");
    async function getUser(){
        const USER=await AsyncStorage.getItem('USER')
        if(USER==="accountManager"){
            setUser(USER)
        }
    }
    const renderList=({item})=>{
        return(
            <TouchableOpacity style={styles.subCon} onPress={()=>{
                setKpiObject(item)
                renderModel(true)
            }}>
                <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',marginVertical:5}}>
                    <Text style={{fontWeight:'700',color:'#001441'}}>{item.kpi_description_title}</Text>
                    {/* <Text style={{fontSize:12}}>Project Name: <Text style={{color:'gray'}}>{item.project_name}</Text></Text> */}
                </View>
                <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',marginVertical:5}}>
                    <Text style={{fontSize:12}}>Kpi ID: <Text style={{color:'gray'}}>{item.kpi_id}</Text></Text>
                    <Text style={{fontSize:12}}>Date: <Text style={{color:'gray'}}>{item.kpi_date}</Text></Text>
                </View>
            </TouchableOpacity>
        )
    }

    function renderProjects(){
        if(kpi.length>0){
            return(
                <FlatList
                showsVerticalScrollIndicator={false}
                data={kpi}
                keyExtractor={(item,i)=>i.toString()}
                renderItem={renderList}
                onEndReached={loadMore}
                onEndReachedThreshold={0.1}
                ListFooterComponent={showSpinner}
                onRefresh={onRefresh}
                refreshing={refresh}
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

    const [date, setDate] = useState("");
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
      setShow2(false)
    };

    const [date2, setDate2] = useState("");
    const [mode2, setMode2] = useState('date');
    const [show2, setShow2] = useState(false);
  
    const onChange2 = (event, selectedDate) => {
      const currentDate = selectedDate || date2;
      setShow2(Platform.OS === 'ios');
      setDate2(currentDate);
    };
  
    const showMode2 = (currentMode) => {
      setShow2(true);
      setMode2(currentMode);
    };
  
    const showDatepicker2 = () => {
      showMode2('date');
      setShow(false)
    };

    return (
        <View style={{flex:1}}>
            <KpiModel
            visible={model}
            title={kpiObject.kpi_description_title}
            Des={kpiObject.kpi_description_desc}
            hour={kpiObject.kpi_description_hour}
            closeModle={()=>renderModel(false)}
            />
            <Header title="KPI" back="back" iconName="chevron-back"/>
            <View style={{width:'100%',marginLeft:'auto',marginRight:'auto',flexDirection:'row',justifyContent:'space-between',backgroundColor:'white',padding:10,marginTop:5,borderRadius:7}}>
                <TouchableOpacity 
                onPress={showDatepicker}
                style={{flexDirection:'row',width:'35%',justifyContent:'center',alignItems:'center',paddingVertical:5,borderWidth:1,borderColor:'#bfbfbf',borderRadius:7}}>
                    {date?(
                        <Text style={{fontSize:11}}>{date?date.toString().slice(0,15):null}</Text>
                    ):(
                        <>
                        <DateIcon
                    name="date"
                    size={17}
                    color="#bfbfbf"
                    />
                    <Text style={{marginLeft:5,fontSize:12,color:"#bfbfbf"}}>Start Date</Text>
                        </>
                    )}
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={showDatepicker2}
                style={{flexDirection:'row',width:'35%',justifyContent:'center',alignItems:'center',paddingVertical:5,borderWidth:1,borderColor:'#bfbfbf',borderRadius:7}}>
                {date2?(
                        <Text style={{fontSize:11}}>{date2?date2.toString().slice(0,15):null}</Text>
                    ):(
                        <>
                        <DateIcon
                    name="date"
                    size={17}
                    color="#bfbfbf"
                    />
                    <Text style={{marginLeft:5,fontSize:12,color:"#bfbfbf"}}>End Date</Text>
                        </>
                    )}
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>{
                    setShow(false)
                    setShow2(false)
                    if(date && date2){
                        search()
                    }else{
                        alert("please select date first")
                    }
                }}
                style={{flexDirection:'row',width:'25%',justifyContent:'center',alignItems:'center',paddingVertical:10,backgroundColor:'#001441',borderRadius:7}}>
                    <DateIcon
                    name="search"
                    size={20}
                    color="#ffffff"
                    />
                </TouchableOpacity>
            </View>
            {loading?(
                <Animated.View style={{...styles.con,transform:[{translateY:position}]}}>
                {renderProjects()}
                </Animated.View>
            ):<View style={{flex:1}}><Loader color="blue" size={25}/></View>}
                        {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
            )}
             {show2 && (
                <DateTimePicker
                testID="dateTimePicker2"
                value={new Date()}
                mode={mode2}
                is24Hour={true}
                display="default"
                onChange={onChange2}
                />
            )}
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
    },
    subCon:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        backgroundColor:'white',
        marginVertical:5,
        padding:10,
        borderRadius:7
    }
})
function mapStateToProps({kpi}){
return {kpi}
}

export default connect(mapStateToProps,actions)(Myproject)
