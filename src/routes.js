import React, { Component, useEffect, useMemo, useState,useRef } from "react";
import {Dimensions} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from "./screen/authentication/login"
import CreateAcount from "./screen/authentication/create"
import CreatePassword from "./screen/authentication/createPassword"
import ForgetPassword from "./screen/authentication/forgetPassword"
import Dashboard from "./screen/dashboard/dashboard"
import Payment from "./screen/payment/payment"
import CreateProject from "./screen/createproject/createproject";
import Profile from "./screen/profile/profile"
import IconDashboard from "react-native-vector-icons/MaterialIcons"
import IconProject from "react-native-vector-icons/SimpleLineIcons"
import IconCreateProject from "react-native-vector-icons/FontAwesome"
import IconProfile from "react-native-vector-icons/AntDesign"
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DrawerContent from "./component/drawerContent"
import MyProject from "./screen/myproject/myproject";
import Header from "./component/header"
import ProjectDetail from "./screen/myproject/projectdetail"
import Support from "./screen/profile/support"
import SupportTabs from "./screen/profile/tabs"
import ChatContainer from "./screen/profile/chatContainer"
import Comment from "./screen/myproject/comment"
import { connect } from "react-redux";
import PayNow from "./screen/payment/paynow";
import DeliverNow from "./screen/payment/deliverNow";
import PaymentMethod from "./screen/payment/paymentMethod";
import Email from "./screen/authentication/email"
import drawerContent from "./component/drawerContent";
import Resource from "./screen/resource/resource";
import * as actions from "./store/actions"
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from "./component/loader"
import ResourceDetails from "./screen/resource/resourceDetails";
import SubPackage from "./screen/dashboard/subPackages"
import DepartCategory from "./screen/dashboard/pakages";
import CreateProjectByForm from "./screen/dashboard/createproject/createproject";
import messaging from '@react-native-firebase/messaging';
import Kpi from "./screen/resource/kpi";
import AndroidPay from "./screen/payment/androidPay";

const {width}=Dimensions.get('window')
const Tab = createMaterialBottomTabNavigator();
const TopTab=createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ChatRoutes(){
  const Stack=createStackNavigator();
  return(
    <Stack.Navigator initialRouteName="resource">
      <Stack.Screen
      name="support" 
      options={{headerShown:false}} 
      component={SupportTabs} 
      />
      <Stack.Screen
      name="chatContainer" 
      options={{headerShown:false}} 
      component={ChatContainer} 
      />
    </Stack.Navigator>
  )
}

function OIPDrawer({initialRoute,clientInfo}) {

  return (
    <Drawer.Navigator
    drawerContent={({navigation})=>(<DrawerContent navigation={navigation}/>)}
    drawerStyle={{width:width-70}}
    openByDefault={false}
    initialRouteName={initialRoute}
    >
      <Drawer.Screen name="Tabs" >
      {()=><Tabs clientInfo={clientInfo}/>}
      </Drawer.Screen>
      <Drawer.Screen name="support" component={ChatRoutes} />
      <Drawer.Screen name="paynow" component={PayNow} />
      <Drawer.Screen name="paymethod" component={PaymentMethod} />
      <Drawer.Screen  name="androidPay" component={AndroidPay} 
      />
    </Drawer.Navigator>
  );
}


function Resources(){
  const Stack=createStackNavigator();
  return(
    <Stack.Navigator initialRouteName="resource">
      <Stack.Screen
      name="resource" 
      options={{headerShown:false}} 
      component={Resource} 
      />
      <Stack.Screen
      name="resourceDetail" 
      options={{headerShown:false}} 
      component={ResourceDetails} 
      />
      <Stack.Screen
      name="kpi" 
      options={{headerShown:false}} 
      component={Kpi} 
      />
    </Stack.Navigator>
  )
}

function DashboardRoutes(){
  return(
    <Stack.Navigator initialRouteName="dashboard">
      <Stack.Screen
      name="dashboard" 
      options={{headerShown:false}} 
      component={Dashboard} 
      />
      <Stack.Screen
      name="packages" 
      options={{headerShown:false}} 
      component={DepartCategory} 
      />
      <Stack.Screen
      name='subCategory'
      options={{headerShown:false}} 
      component={SubPackage} 
      />
      <Stack.Screen
      name='createProjectByForm'
      options={{headerShown:false}} 
      component={CreateProjectByForm} 
      />
    </Stack.Navigator>
  )
}

function PaymentRoutes(){
  const Stack=createStackNavigator();
  return(
    <Stack.Navigator initialRouteName="payment">
      <Stack.Screen
      name="payment" 
      options={{headerShown:false}} 
      component={Payment} 
      />
      <Stack.Screen
      name="deliver" 
      options={{headerShown:false}} 
      component={DeliverNow} 
      />
    </Stack.Navigator>
  )
}


function ProjectRoutes(){
  const Stack=createStackNavigator();
  return(
    <Stack.Navigator initialRouteName="myproject">
      <Stack.Screen
      name="myproject" 
      options={{headerShown:false}} 
      component={MyProject} 
      />
      <Stack.Screen
      name="projectdetail" 
      options={{headerShown:false}} 
      component={ProjectDetail} 
      />
            <Stack.Screen
      name="comment" 
      options={{headerShown:false}} 
      component={Comment} 
      />
    </Stack.Navigator>
  )
}


function Tabs({clientInfo}){

  const [user,setUser]=useState("")
  useEffect(()=>{
    getUser()
  },[user])

  async function getUser(){
    const USER=await AsyncStorage.getItem('USER')
    if(USER==="accountManager"){
        setUser(USER)
    }
}

  function renderOtherTabs(){
    if(clientInfo.role_id){
        if(clientInfo.role_id=="1" || clientInfo.role_id=="7" || clientInfo.role_id=="10" || clientInfo.role_id=="14"){
            return(
              <>
          <Tab.Screen
        name="myproject"
        component={ProjectRoutes}
        options={{
          tabBarIcon:({color})=><IconProject name="note" size={24} color={color}/>,
        }}
        />
        <Tab.Screen
        name="createproject"
        component={CreateProject}
        options={{
          tabBarIcon:({color})=><IconCreateProject name="plus-square-o" size={28} color={color}/>
        }}
        />
        <Tab.Screen
        name="payment"
        component={PaymentRoutes}
        options={{
          tabBarIcon:({color})=><IconDashboard name="payment" size={27} color={color}/>
        }}
        />
        <Tab.Screen
        name="resources"
        component={Resources}
        tabBarLabel="Resources"
        options={{
          tabBarIcon:({color})=><IconProfile name="setting" size={25} color={color}/>
        }}
        />
          </>
            )
        }
    }else{
        return(
          <>
          <Tab.Screen
        name="myproject"
        component={ProjectRoutes}
        options={{
          tabBarIcon:({color})=><IconProject name="note" size={24} color={color}/>,
        }}
        />
        <Tab.Screen
        name="createproject"
        component={CreateProject}
        options={{
          tabBarIcon:({color})=><IconCreateProject name="plus-square-o" size={28} color={color}/>
        }}
        />

        <Tab.Screen
        name="payment"
        component={PaymentRoutes}
        options={{
          tabBarIcon:({color})=><IconDashboard name="payment" size={27} color={color}/>
        }}
        />
        <Tab.Screen
        name="resources"
        component={Resources}
        tabBarLabel="Resources"
        options={{
          tabBarIcon:({color})=><IconProfile name="setting" size={25} color={color}/>
        }}
        />
          </>
        )
    }
}
    return(
      <Tab.Navigator
      activeColor="#001441"
      inactiveColor="#72809D"
      backBehavior="order"
      labeled={false}
      barStyle={{ backgroundColor: '#ffffff' }}
      initialRouteName="dashboard"
      >
        <Tab.Screen
        name="dashboard"
        component={DashboardRoutes}
        
        options={{
          tabBarIcon:({color})=><IconDashboard name="dashboard" size={28} color={color}/>,
        }}
        />
        {renderOtherTabs()}
        <Tab.Screen
        name="profile"
        component={Profile}
        tabBarLabel="Profile"
        options={{
          tabBarIcon:({color})=><IconProfile name="user" size={30} color={color}/>
        }}
        />
      </Tab.Navigator>
    )
}

function LoginScreens(){
  return(
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen 
          name="login" 
          options={{headerShown:false}} 
          component={Login} /> 
          
          <Stack.Screen 
          name="createPassword" 
          options={{headerShown:false}} 
          component={CreatePassword} />
          
          <Stack.Screen 
          name="createacount" 
          options={{headerShown:false}} 
          component={CreateAcount} />
          <Stack.Screen 
          name="email" 
          options={{headerShown:false}} 
          component={Email} />
    </Stack.Navigator>
  )
}

function Routes({login,isLogin,getClientInfo,checkExpireToken,clientInfo,setOnlineStatus}) {
  const [loading,setLoading]=useState(false)
  const navigation=useRef(null)
  const [initialRoute, setInitialRoute] = useState("Tabs");

  useEffect(()=>{
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      if(navigation.current){
        navigation.current.navigate("support")
      }
    });
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
            setInitialRoute('support') // e.g. "Settings"
        }
      });
  },[])


  const receivedNotifMemo=useMemo(async()=>{
                // Assume a message-notification contains a "type" property in the data payload of the screen to open
                checkExpireToken(ifUserExsit,updateLoading)
                console.log("call")
  },[isLogin])

  //remove clientInfo

  const onlineUseMemo=useMemo(async()=>{
    const USER=await AsyncStorage.getItem('USER')
              if(USER==="accountManager"?clientInfo.user_id:clientInfo.client_id){
                const userInfo={
                  id:(USER==="accountManager"?clientInfo.user_id:clientInfo.client_id),
                  name:(USER==="accountManager"?clientInfo.user_name:clientInfo.client_name),
                  status:"online"
              }
              setOnlineStatus(userInfo)
              }
  },[clientInfo])

  async function ifUserExsit(){
    const token=await AsyncStorage.getItem('token');
    if(token){
      login(true).then(()=>{
        getClientInfo().then(()=>{
          setLoading(true)
        })
        
      })
      
    }else{
      setLoading(true)
    }
  }

  function updateLoading(){
    setLoading(true)
  }

  if(loading){
    return (
      <NavigationContainer
      ref={navigation}
      >
        {isLogin?<OIPDrawer initialRoute={initialRoute} clientInfo={clientInfo}/>:<LoginScreens/>}
        {/* <Stack.Navigator>
          <Stack.Screen name="abc" options={{headerShown:false}} component={Login}/>
        </Stack.Navigator> */}
    </NavigationContainer>
  )
  }else{
    return<Loader color="blue" size={25}/>
  }
}

function mapStateToProps({isLogin,clientInfo}){
  return {isLogin,clientInfo}
}

export default connect(mapStateToProps,actions)(Routes)