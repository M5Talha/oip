import React, { useEffect, useMemo, useState } from "react";
import {View,Text,StyleSheet,Dimensions,FlatList,TouchableOpacity,Animated, VirtualizedList} from "react-native";
import Header from "../../component/header"
import * as Progress from 'react-native-progress';
import Pie from 'react-native-pie'
import { RFPercentage } from "react-native-responsive-fontsize";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import EntypoIcon from "react-native-vector-icons/Entypo"
import { ScrollView } from "react-native-gesture-handler";
import * as actions from "../../store/actions"
import {connect} from "react-redux"
const {height,width}=Dimensions.get('window');
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../component/loader";


function Dashboard({dashboardData,dashboard,sendNotificationToken,getDashboardDepartments,dashboardDepartment,navigation}){
    const [user,setUser]=useState("");
      const position=useState(new Animated.Value(height/2))[0];
      const [loading,setLoading]=useState(false)
      useEffect(()=>{
        getUser()
        requestUserPermission();
          Animated.timing(position,{
              toValue:0,
              duration:500,
              useNativeDriver:true
          }).start()
      },[])

      const checkAndCallFunctionMemo=useMemo(()=>{
        if(user){
            dashboardData().then(()=>{
                setLoading(true)
            })
        }else{
            getDashboardDepartments().then(()=>{
                setLoading(true)
            })
        }
      },[user])
     const requestUserPermission = async () => {

        // Get the token
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
            const USER=await AsyncStorage.getItem('USER')
            const token = await messaging().getToken();
            await AsyncStorage.setItem('notificationToken',token)
            console.log(token)
            messaging()
            .subscribeToTopic(USER==="accountManager"?"oipTeam":"client")
            .then(() => console.log('Subscribed to topic!'));
            sendNotificationToken(token)
        }
      }

    //  const  getFcmToken = async () => {
    //     const fcmToken = await messaging().getToken();
    //     if (fcmToken) {
        //     await AsyncStorage.setItem('notificationToken',fcmToken)
        //  console.log(fcmToken)
        //  sendNotificationToken()
    //     } else {
    //      console.log("Failed", "No token received");
    //     }
    //   }

      


      function getColor(dS){
          switch(dS){
            case "Brief":
                return '#3366cc';
            case "Final Delivery":
                return '#dc3912';
            case "In-Progress":
                return '#ff9900';
            case "Initial Delivery":
                return '#109618';
            case "Payment Pending":
                return '#990099';
            case "Proposal":
                return '#0099c6';
            case "Revision":
                return '#dd4477';
            case "Brief":
                return '#3366cc';
            case "Setup Stage":
                return '#66aa00';
            case "Testing":
                return '#4600bb';
            default:
                return '#4600bb'
                
          }
      }


      function getPer(){
          if(dashboard.data.chartdatastatuswise.length>0){
            var total=0;
            for(let i=0; i<dashboard.data.chartdatastatuswise.length; i++){
                total=total+Number(dashboard.data.chartdatastatuswise[i].count);
            }
          }
          const chartArray=dashboard.data.chartdatastatuswise.map((d)=>{
                return {
                    percentage:(d.count*100)/total,
                    color:getColor(d.delivery_status)
                }
          })
          return chartArray
      }

      function renderIcon(data){

        if(data.mobile_icon_type=="MaterialIcons"){
            return(
                <MaterialIcon
                name={data.mobile_icon_name}
                color="#548fe0"
                size={60}
                />
            )
        }else{
            return(
                <EntypoIcon
                name={data.mobile_icon_name}
                color="#548fe0"
                size={60}
                />
            )
        }
      }

      function renderDepartments({item}){
          return(
            <TouchableOpacity
            onPress={()=>navigation.navigate('packages',item)}
            style={{width:'100%',marginVertical:5}}>
            <View style={styles.departCon}>
                {renderIcon(item)}
                <View style={{marginLeft:20,justifyContent:'center'}}>
                    <Text style={{fontSize:20,color:'#001441',textAlign:'left',textTransform:'uppercase'}}>{item.department_name}</Text>
                </View>
            </View>
        </TouchableOpacity>
          )
      }

    async function getUser(){
        const USER=await AsyncStorage.getItem('USER')
        if(USER==="accountManager"){
            setUser(USER)
        }
    }
    if(loading){
        return(
            <View style={styles.container}>
                <Header
                title="Dashboard"
                iconName="md-menu"
                />
                {user==="accountManager"?(
                    <>
                    <View style={styles.sec1}>
                    <Text style={styles.title}>PROJECT STAGES</Text>
                    <View style={styles.chartSec}>
                    <View style={styles.chart}>
                    <Pie
                    radius={hp(17)}
                    innerRadius={hp(2)}
                    sections={getPer()}
                    strokeCap={'butt'}
                    />
                    </View>
                    </View>
                    <ScrollView style={{width:'100%',marginLeft:20,marginTop:20}}>
                    <View>
                        {dashboard.data.chartdatastatuswise
                        .filter((item)=>item.delivery_status!==null)
                        .map((d,i)=>{
                            return(
                        <View style={styles.chartInfoItem} key={d.delivery_status}>
                            <View style={{...styles.chartInfoItemText,backgroundColor:getColor(d.delivery_status)}}/>
                            <Text style={styles.chartInfoItemContent}>{d.delivery_status}</Text>
                            <Text style={{marginLeft:10}}>{Math.round(getPer()[i].percentage)}%</Text>
                        </View>
                            )
                        })} 
                    </View>
                    </ScrollView>
                </View>
                <View>
                </View>
                </>
                ):(
                    <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{width:'95%'}}
                    data={dashboardDepartment}
                    renderItem={renderDepartments}
                    keyExtractor={(item,i)=>i.toString()}
                    />
                )}
                
            </View>
        )
    }else{
        return <Loader color="blue" size={30}/>
    }
}

const styles=StyleSheet.create({
    container:{
        alignItems:'center',
        flex:1,
        backgroundColor:'#F2F2F2',
    },
    sec1:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#F2F2F2',
        width:'100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        borderRadius:7,
        justifyContent:'flex-start',
        paddingBottom:8
    },
    chartSec:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginBottom:10,
    },
    gauge: {
        position: 'absolute',
        width: wp(70),
        height: hp(35),
        alignItems: 'center',
        justifyContent: 'center',
      },
      gaugeText: {
        backgroundColor: 'transparent',
        color: '#001441',
        fontSize: RFPercentage(4),
        fontFamily:'Poppins-Bold'
      },
    sec2:{
        backgroundColor:'#F2F2F2',
        width:'100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        marginTop:5
    },
    title:{
        fontSize:RFPercentage(3),
        color:'#001441',
        fontFamily:'Poppins-Bold',
        height: hp(7),
        textAlignVertical:'center',
        marginVertical:10
    },
    ball:{
        height:28,
        width:28,
        borderRadius:28/2,
        backgroundColor:'#229500',
        marginRight:10
    },
    complete:{
        flexDirection:'row',
        alignItems:'center'
    },
    line:{
        width:2,
        height:40,
        backgroundColor:'#DDDDDD',
        marginRight:40,
        marginLeft:40
    },
    pCon:{
        flexDirection:'row',
        justifyContent:'center'
    },
    prog:{
        width:(width/2)*1.5,
        height:2,
        backgroundColor:'#DDDDDD',
        marginTop:20,
        marginBottom:20
    },
    payItem:{
        width:'100%',
        backgroundColor:'white',
        borderRadius:7,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-end',
        padding:15
    },
    proName:{
        fontSize:24,
        fontFamily:'Poppins-Bold',
        color:'#001441'
    },
    date:{
        color:'#595959'
    },
    payBtn:{
        backgroundColor:'#AE1818',
        width:110,
        height:30,
        borderRadius:7,
        justifyContent:'center',
        alignItems:'center'
    },
    itemLine:{
        height:2,
        width:width-80,
        backgroundColor:'#DDDDDD',
        marginTop:10,
        marginBottom:10
    },
    duePay:{
        color:'#001441',
        fontSize:20,
        fontFamily:'Poppins-Regular',
        padding:15
    },
    chartInfoItem:{
        flexDirection:'row',
        marginTop:hp(0.7),
        marginBottom:hp(0.7),
        marginHorizontal:8
    },
    chartInfoItemText:{
        width:wp(5),
        height:wp(5),
        borderRadius:20/2,
        marginRight:5
    },
    chartInfoItemContent:{
        color:'#222222',
        fontFamily:'Poppins-Regular'
    },
    departCon:{
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'white',
        borderRadius:7,
        padding:10,
        flexDirection:'row',
        }
})

function mapStateToProps({dashboard,dashboardDepartment}){
    return {dashboard,dashboardDepartment}
}
export default connect(mapStateToProps,actions)(Dashboard);