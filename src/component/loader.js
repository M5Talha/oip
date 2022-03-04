import React from 'react'
import { StyleSheet,ActivityIndicator,View ,Text} from 'react-native'

export default function Loader({color,size}) {
    return (
        <View style={styles.container}>
            <ActivityIndicator color={color} size={size}/>
        </View>
    )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})
