import React, { useState,useEffect } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/Fontisto';
import { View, Text ,StyleSheet,TouchableOpacity} from 'react-native';

function OipDatePicker({getDate}){
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date,setDate]=useState(new Date().toString().slice(0,15));
  useEffect(()=>{
    getDate(new Date(date).getFullYear().toString(), new Date(date).getMonth().toString() )
  },[date])
  const showDatePicker = () => {
      setDatePickerVisibility(true);
  };
  
  const hideDatePicker = () => {
      setDatePickerVisibility(false);
  };
  
  const handleConfirm = (date) => {
      setDate(date.toString().slice(0,15))
      hideDatePicker();
  };
  return (
    <>
      <TouchableOpacity style={styles.chec} onPress={showDatePicker}>
          <Icon name="date" style={styles.dateIcon} color="#7F8FA4" size={20}/>
          <Text style={styles.dateText}>{date}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
      isVisible={isDatePickerVisible}
      mode="date"
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
      />
    </>
  );
}

const styles=StyleSheet.create({
    dateIcon:{
        marginLeft:8,
        marginRight:8
    },
    dateText:{
        color:'#001441',
        fontSize:11,
        fontWeight:'bold'
    },
    chec:{
      flexDirection:'row',
      width:'45%',
      alignItems:'center',
      borderRadius:7,
      borderWidth:1,
      borderColor:'#DCE0E7',
      backgroundColor:'white',
      height:40,
      marginTop:10

  }
})

export default OipDatePicker;

