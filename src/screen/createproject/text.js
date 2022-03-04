import React from 'react';
import { View ,StyleSheet,Text,TextInput} from 'react-native';

function TextType({item,getValue}){
    return(
        <>
            <Text style={styles.inputTxt}>{item.department_question_text}</Text>
            <TextInput onChangeText={(v)=>getValue(v,[item.department_question_id])} style={styles.input}/>
        </>
    )

}


const styles=StyleSheet.create({
    inputTxt:{
        marginTop:10,
        color:'#71809C',
        fontSize:12,
        width:'90%'
    },
    input:{
        width:'90%',
        borderRadius:7,
        borderWidth:1,
        borderColor:'#DCE0E7',
        backgroundColor:'white',
        height:40,
        marginTop:10,
        paddingLeft:10
    },
})


export default TextType;
