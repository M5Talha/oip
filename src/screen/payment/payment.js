import React, { useState,useEffect,useMemo} from 'react'
import { Text, View,FlatList,StyleSheet,Animated ,Dimensions,TouchableOpacity,TextInput} from 'react-native';
import Header from "../../component/header"
import PaymentItem from "../../component/paymentItem"
import {connect} from "react-redux"
import * as actions from "../../store/actions"
import { useNavigation } from '@react-navigation/native';
import Loader from "../../component/loader"
import useStateWithCallback from 'use-state-with-callback';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchIcon from "react-native-vector-icons/Feather"
import {api,accountM} from "../../config/config.json"
import axios from "axios"
const {height}=Dimensions.get('window')
function PaymentPage({getPayment,payment,refreshPayments,clearPayments}) {
    const navigation=useNavigation();
    const position=useState(new Animated.Value(height))[0];
    const [totalPages,setTotalPages]=useState(0)
    const [page,setPage]=useState(0)
    const [refresh,setRefresh]=useState(false)
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

    const getMyPaymentMemo=useMemo(()=>{
        getPayment(page,searchText).then(()=>{
            setLoading(true)
        })
    },[page])
    
    // const refreshMemo=useMemo(()=>{
    //     navigation.addListener('focus', () => {
    //         refreshPayments(searchText)
    //       });
        
    // },[navigation])

    function onRefresh(){
        setLoading(false)
        setRefresh(true)
        setPage(0)
        refreshPayments(0,searchText).then(()=>{
            setRefresh(false)
            setLoading(true)
        })
    }

    async function getTotalPages(){
        const USER=await AsyncStorage.getItem('USER')
        const token=await AsyncStorage.getItem('token')
        axios.post(`${USER==="accountManager"?accountM+'/client_payments':api+'/client_payments'}/${page?page:1}`,{
            search_text:searchText
        },{headers:{
            Authorization:token
        }}).then(res=>{
            setTotalPages(res.data.data.total_pages)
        })
    }


    async function getUser(){
        const USER=await AsyncStorage.getItem('USER')

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
    function searchPayments(){
        setLoading(false)
        setPage(0)
        getTotalPages()
        clearPayments()
        getPayment(page,searchText).then(()=>{
            setLoading(true)
        })
    }
    const renderList=({item})=>{
        return(
            <TouchableOpacity onPress={()=>navigation.push('deliver',item)}>
            <PaymentItem 
            projectName={item.project_name} 
            payment={`${item.client_payments_amount} $`} 
            paymentStatus={item.client_payments_pay_status}
            paymentNo={item.payment_no}
            date={item.client_payments_date}
            btnColor={item.client_payments_pay_status==="Paid"?'#007B0C':'#AE1818'}
            btnName={item.client_payments_pay_status==="Paid"?"PAID":"UPAID"}
            navigate={()=>navigation.navigate('deliver',item)}
            />
            </TouchableOpacity>
        )
    }

    function renderPayment(){
        if(payment.length>0){
            return(
                <FlatList
                showsVerticalScrollIndicator={false}
                data={payment}
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
            <Header title="Payment" iconName="md-menu"/>
            <View style={{backgroundColor:'white',width:'98%',marginLeft:'auto',marginRight:'auto',marginTop:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderRadius:7}}>
                <TextInput
                placeholder="Search"
                onChangeText={v=>setSearchText(v)}
                style={{height:50,width:'80%',paddingLeft:20}}
                />
                <TouchableOpacity 
                onPress={searchPayments}
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
                    {renderPayment()}
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

function mapStateToProps({payment}){
    return{payment}
}
export default connect(mapStateToProps,actions)(PaymentPage);
