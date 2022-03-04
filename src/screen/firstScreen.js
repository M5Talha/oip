import { View,Text, StyleSheet,Image} from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage'




function FirstScreen({navigation}){

    async function selectUser(user){
        if(user==="client"){
            await AsyncStorage.setItem('USER','client')
            navigation.navigate('login')
        }
        if(user==="accountManager"){
            await AsyncStorage.setItem('USER','accountManager')
            navigation.navigate('login')
        }

    }

    return(
        <View style={styles.con}>
            <Image 
            resizeMode="contain"
            style={{width:200,height:100}}
            source={require('../../assets/images/logowt.png')}
            />
            <View style={{width:'80%',marginTop:25,marginBottom:25}}>
                <TouchableOpacity style={styles.btn} onPress={()=>selectUser('client')}>
                    <Text style={{color:'white'}}>CLIENT</Text>
                </TouchableOpacity>
            </View>
            <View style={{width:'80%',marginTop:25,marginBottom:25}}>
                <TouchableOpacity style={styles.btn} onPress={()=>selectUser('accountManager')}>
                    <Text style={{color:'white'}}>ACCOUNT MANAGER</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    con:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        width:'100%'
    },
    btn:{
        backgroundColor:'#001441',
        borderRadius:7,
        width:'100%',
        height:40,
        justifyContent:'center',
        alignItems:'center'
    },
})

export default FirstScreen;