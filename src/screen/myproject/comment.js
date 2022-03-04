import React, { Component, useEffect, useState } from 'react';
import { View, Text ,StyleSheet,TextInput,TouchableOpacity} from 'react-native';
import Header from "../../component/header";
import { RFPercentage} from "react-native-responsive-fontsize";
import IconPlus from "react-native-vector-icons/AntDesign"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import * as actions from "../../store/actions"
import { useNavigation } from '@react-navigation/native'
import DocumentPicker from 'react-native-document-picker';
import ImgIcon from "react-native-vector-icons/EvilIcons";
import Loader from "../../component/loader"
import ImagePicker from 'react-native-image-crop-picker';

function Comment({route,addComment}){
    const navigation = useNavigation();
    const [fields,setFields]=useState({
        comments_text:"",
        comments_file:"",
        comments_image:"",
    })
    const [file,setFile]=useState({})
    const [submit,setSubmit]=useState(false);
    function submitTrue(){
        setSubmit(true)
    }
    const [loading,setLoading]=useState(false)

    useEffect(()=>{
        navigation.addListener('focus', () => {
            getValue("",'comments_text')
            getValue("",'comments_file')
            getValue("",'comments_image')
            setSubmit(false)
          });
    },[navigation])

    function getValue(v,key){
        setFields((pS)=>{
            return{
                ...pS,
                [key]:v
            }
        })
    }
    async function uploadFile(){
        try {
            const res = await DocumentPicker.pickMultiple({
              type: [DocumentPicker.types.docx,DocumentPicker.types.pdf,DocumentPicker.types.ppt,DocumentPicker.types.xlsx,DocumentPicker.types.xls,DocumentPicker.types.zip],
            });
            setFile(res)
            getValue(res,"comments_file")
            getValue("","comments_image")
          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
          }
    }
    function renderImageNames(){
        return fields.comments_file.map((c,i)=>{
            return <Text key={i}>{` ${i+1}) ${c.name}`}</Text>
        })
    }
    function renderImages(){
        return fields.comments_image.map((c,i)=>{
            return <Text key={i}>{` ${i+1}) ${c.name}`}</Text>
        })
    }

    function uploadImg(){
        ImagePicker.openPicker({
            multiple: true
          }).then(images => {
              const format=images.map((image)=>{
                return {
                    name:image.path.slice(image.path.lastIndexOf('/')+1,image.path.length),
                    uri:image.path,
                    type:image.mime
                }
              })
              getValue(format,'comments_image')
              getValue("","comments_file")
          })
    }
    function renderLoader(con){
        if(con){
            setLoading(true)
        }
        else{
            setLoading(false)
        }
    }
    return (
        <View>
        <Header title="Comment" back="back" iconName="chevron-back"/>
        <ScrollView>
          <View style={styles.con}>
                        <View style={{...styles.content,marginTop:hp('2%'),marginBottom:hp('2%')}}>
                        <Text style={styles.proHead}>Add New Comment</Text>
                        <Text style={{fontFamily:'Poppins-Regular',color:'#606C83'}}>Add New Comment</Text>
                        </View>
                        <View style={styles.line}/>
                        <View style={styles.content}>
                        {/* <Text style={styles.inputTxt}>Project Name</Text>
                        <TextInput defaultValue="Website Design" style={styles.input}/> */}
                        <Text style={styles.inputTxt}>Description</Text>
                        <TextInput 
                        numberOfLines={3}  
                        multiline={true}
                        value={fields.comments_text}
                        placeholder="Message" 
                        onChangeText={(v)=>setFields((pS)=>{
                            return{
                                ...pS,
                                comments_text:v
                            }
                        })}
                        style={{...styles.input,height:70,flexWrap:'wrap',textAlignVertical:'top',paddingLeft:10}}
                        />
                        {submit && !fields.comments_text?<Text style={{textAlign:'right',color:'red',fontSize:11}}>Please Fill</Text>:null }
                        <Text style={styles.inputTxt}>Upload Files</Text>
                        <View style={styles.imgCon}>
                            <View style={{width:'40%',justifyContent:'center',alignItems:'center'}}>
                            {fields.comments_file?<View>{renderImageNames()}</View>:(
                                <TouchableOpacity onPress={uploadFile}>
                                <IconPlus name="pluscircle" color="#29BCFF" size={30}/>
                                </TouchableOpacity>
                            )}
                            </View>
                            <View style={{width:'40%',justifyContent:'center',alignItems:'center'}}>
                            {fields.comments_image?<View>{renderImages()}</View>:(
                                <TouchableOpacity onPress={uploadImg}>
                                <ImgIcon name="image" color="#29BCFF" size={30}/>
                                </TouchableOpacity>
                            )}
                            </View>
                        </View>
                        <View style={{justifyContent:'center',alignItems:'center',marginTop:15,marginBottom:15}}>
                            <TouchableOpacity style={styles.btn} onPress={()=>{
                                if(submitTrue && fields.comments_text){
                                    renderLoader(true)
                                    addComment(route.params.id,fields.comments_text,fields.comments_file,fields.comments_image).then(()=>{
                                        renderLoader(false)
                                        navigation.navigate('projectdetail')
                                    })
                                }else{
                                    submitTrue()
                                }
                            }}>
                                    {
                                        loading?(
                                            <Loader
                                            color="white"
                                            size={20}

                                            />
                                        ):(
                                            <Text style={styles.btnTitle}>Submit</Text>
                                        )
                                    }
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
      );
}

const styles=StyleSheet.create({
    con:{
        paddingLeft:15,
        paddingRight:15,
        paddingBottom:15,
        marginLeft:5,
        marginRight:5,
        marginTop:10,
        borderRadius:7,
        backgroundColor:'#F2F2F2',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    proDes:{
        width:'95%',
        marginRight:wp('2%'),
        marginLeft:wp('2%'),
        paddingBottom:hp('2%'),
        justifyContent:'flex-end',
        backgroundColor:'white',
        shadowColor: "#000",
        borderRadius:10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        height:hp('20%'),
        elevation: 4,
    },
    proDesText:{
        fontFamily:'Inter-Regular',
        color:'#72809D',
        fontSize:RFPercentage(2),
        textAlign:'center'
    },
    proPic:{
        width:wp('22%'),
        height:wp('22%'),
        borderWidth:wp('1.5%'),
        borderColor:'white',
        borderRadius:wp('22%')/2
        
    },
    imgCon:{
        width:'100%',
        backgroundColor:'white',
        height:hp('18%'),
        borderRadius:7,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    sec:{
        alignItems:'center',
        marginTop:hp('7%'),
    },
    fieldsCon:{
        width:'95%',
        marginRight:wp('2%'),
        marginLeft:wp('2%'),
        paddingBottom:hp('2%'),
        backgroundColor:'white',
        shadowColor: "#000",
        borderRadius:10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        height:hp('20%'),
        elevation: 4,
    },
    proHead:{
        color:'#001441',
        fontFamily:'Poppins-Light',
        fontSize:RFPercentage(3)
    },
    line:{
        height:2,
        backgroundColor:'#EDEEF2',
        width:'100%'
    },input:{
        width:'100%',
        borderRadius:7,
        borderWidth:1,
        borderColor:'#DCE0E7',
        backgroundColor:'white',
        height:40,
        marginTop:10,
        color:'#606C83'
    },
    inputTxt:{
        marginTop:10,
        color:'#606C83',
        fontSize:RFPercentage(1.8),
        fontFamily:'Poppins-Light',
        width:'90%'
    },
    btn:{
        backgroundColor:'#001441',
        borderRadius:8,
        height:40,
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    btnTitle:{
        color:'white',
        fontSize:RFPercentage(2),
        fontFamily:'Poppins-Regular',

    }
})

export default connect(null,actions)(Comment);