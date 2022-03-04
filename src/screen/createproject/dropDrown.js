import { Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { View ,StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from '../../component/loader';

function DropdownType({item,getValue}){
        return(
            <>
                <Text style={styles.inputTxt}>{item.department_question_text}</Text>
                <DropDownPicker
                    items={JSON.parse(item.department_question_options).map(item=>({label:item,value:item}))}
                    labelStyle={{color:'#001441'}}
                    placeholder="Please Select"
                    containerStyle={{height: 40,width:'90%',borderRadius:7,marginTop:10,margin:3}}
                    style={{backgroundColor: 'white'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={val =>{
                        getValue(val.value,[item.department_question_id])
                    }}
                />
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


export default DropdownType;
