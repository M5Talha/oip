import React, { Component } from 'react';
import {connect, Provider} from "react-redux"
import store from "./store/index";
import Routes from "./routes";
import SplashScreen from 'react-native-splash-screen'
import Icon from "react-native-vector-icons/AntDesign";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View } from 'native-base';
import { SafeAreaView } from 'react-native';


class App extends Component{
  async componentDidMount() {
      SplashScreen.hide();
      const USER=await AsyncStorage.getItem('USER')
      if(!USER){
        await AsyncStorage.setItem('USER','client')
      }
  }
  render(){
    return (
      <SafeAreaView style={{flex:1}}>
        <Provider store={store}>
          <Routes/>
        </Provider>
      </SafeAreaView>
    );
  }
}


export default App;
