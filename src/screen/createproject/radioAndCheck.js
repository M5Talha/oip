import { Text } from 'native-base';
import React from 'react';
import { View ,StyleSheet} from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';

function RadioAndCheckType({item,getValue}){
    return(
        <>
        <Text style={styles.inputTxt}>{item.department_question_text}</Text>
        <View style={{width:'90%'}}>
            <RadioButtonRN
            // boxStyle={{height:50}}
            data={JSON.parse(item.department_question_options).map(item=>({label:item}))}
            selectedBtn={(e) =>{
                getValue(e.label,[item.department_question_id])
            }}
            />
        </View>
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
})


export default RadioAndCheckType;
