/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';



const onRecived=async remoteMessage => {
  console.log('data',remoteMessage)
}
messaging().setBackgroundMessageHandler(onRecived);
messaging().onMessage(onRecived)


AppRegistry.registerComponent(appName, () => App);
