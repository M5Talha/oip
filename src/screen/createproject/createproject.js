import React, { Component, useEffect, useState } from 'react'
import { Text, View ,StyleSheet,TextInput,TouchableOpacity,Dimensions,Animated} from 'react-native'
import {CheckBox, Row} from "native-base"
import { ScrollView } from 'react-native-gesture-handler';
import Header from "../../component/header";
import IconDate from "react-native-vector-icons/Fontisto"
import IconPlus from "react-native-vector-icons/AntDesign"
import Icon from 'react-native-vector-icons/Fontisto';
import OipDatePicker from '../../component/oipDatePicker';
import DropDownPicker from 'react-native-dropdown-picker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import DocumentPicker from 'react-native-document-picker';
import {connect} from "react-redux"
import * as actions from "../../store/actions"
import DropdownType from "./dropDrown";
import RadioAndCheckType from "./radioAndCheck"
import TextType from "./text"
import SuccessModel from '../../component/successModel';
import Loader from "../../component/loader";
import AsyncStorage from '@react-native-async-storage/async-storage'

const {height}=Dimensions.get('window');

function CreateProject({navigation,createProject,getClients,clients,route,getDepartments,departments,getQuestionDynamic,questionDynamic}){
    var controller;
    const position=useState(new Animated.Value(height))[0];
    const [user,setUser]=useState("");
    const [fields,setFields]=useState({
        project_name:"",
        project_type:"",
        project_summary:"",
        summary_file:"",
    })

    const [file,setFile]=useState({})
    const [projectType,setProjectType]=useState("")
    const [isModel,setIsModel]=useState(false);
    const [loading,setLoading]=useState(false);
    const [submit,setSubmit]=useState(true)
    useEffect(()=>{
        const subs=[
            navigation.addListener('focus',()=>{
                console.log('call',route.params)
                getDepartments()
                if(route.params){
                    console.log("route",route.params.projectType)
                    getQuestionDynamic(route.params.projectType)
                    getValue(route.params.projectType,"project_type")
                    setProjectType(route.params.projectType)
                }
            }),
            navigation.addListener('blur',()=>{
                setFields((pS)=>{
                    return{
                        ...pS,
                        // project_name:"",
                        project_type:"",
                        project_summary:"",
                        summary_file:"",
                        project_balance:"",
                        project_paid:"",
                        project_price:""}
                    }
                )
                setFile({})
                setSubmit(true)
                controller?controller.reset():null
            })
        ]
        getUser()
        Animated.timing(position,{
            toValue:0,
            duration:500,
            useNativeDriver:true
        }).start()
        
        
        return function cleanup() {
            subs.forEach((unSub) => {
              unSub()
            })
          }

    },[navigation,route.params])
    function getValue(v,key){
        setFields((pS)=>{
            return{
                ...pS,
                [key]:v
            }
        })
    }

    const projectTypes=[
        {label: 'Logo Design', value: '1'},
        {label: 'Stationary Design', value: '2'},
        {label: 'Web Development', value: '3'},
        {label: 'App Developement', value: '4'},
        {label: 'Video Developement', value: '5'},
        {label: 'SEO', value: '6'},
        {label: 'Social Media Marketing', value: '7'},
        {label: 'Lead Generation', value: '8'},
        {label: 'Email Marketing', value: '9'},
        {label: 'Content Writting', value: '10'},
        {label: 'Resource Outsourcing', value: '11'},
        {label: 'Cyber Security', value: '12'},
        {label: 'Hosting Plan', value: '13'},
        {label: 'Lead Generation with SMM', value: '14'},
        {label: 'Branding & Design', value: '15'},
    ]
    const brand=[
        {label: 'Outsource In pakistan', value: '1'},
        {label: 'Hire In Pakistan', value: '2'}
    ]

    function renderFields(department_question_type,i,item){
        if(department_question_type==='Text'){
            return <TextType key={i} item={item} getValue={getValue}/>
        }
        if(department_question_type==='Dropdown'){
            return <DropdownType key={i} item={item} getValue={getValue}/>
        }
        if(department_question_type==='Radio'){
            return <RadioAndCheckType key={i} item={item} getValue={getValue}/>
        }
        
    }

    function renderAllFields(){
        return questionDynamic.map((item,i)=>{
            return renderFields(item.department_question_type,i,item)
        })
    }

    async function uploadFile(){
        try {
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.allFiles],
            });
            setFile(res)
            getValue(res,"summary_file")
          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
          }
    }
    function hideModel(){
        setIsModel(false)
        navigation.jumpTo('myproject')
    }
    function showModel(){
        setIsModel(true)
    }
    function loadingTrue(){
        setLoading(true)
    }
    function loadingFalse(){
        setLoading(false)
    }
    async function getUser(){
        const USER=await AsyncStorage.getItem('USER')
        if(USER==="accountManager"){
            setUser(USER)
        }
    }
    function renderClients(){
            return clients.map((c)=>{
                return {
                    label:c.client_name,
                    value:c.client_id
                }
            })

    }
    return (
        
        <View style={styles.mainDiv}>
            <SuccessModel title="Added Successfully" closeModle={hideModel} visible={isModel}/>
            <Header iconName="md-menu" title="Create Project"/>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingLeft:5,paddingRight:5,width:wp(100)}}>
            <Animated.View style={{...styles.container,transform:[{translateY:position}]}}>
                <View style={styles.titleCon}>
                    <Text style={styles.title}>Create New Project</Text>
                    <Text style={styles.subTitle}>Now you're a part of us.</Text>
                </View>
                <View style={styles.line}/>
                <View style={styles.fieldsCon}>
                    {
                        user?
                        (   
                            <>
                            <Text style={styles.inputTxt}>Brand</Text>
                            <DropDownPicker
                                    items={brand}
                                    labelStyle={{color:'#001441'}}
                                    placeholder="Please Select"
                                    containerStyle={{height: 40,width:'90%',borderRadius:7,marginTop:10,margin:3}}
                                    style={{backgroundColor: 'white'}}
                                    itemStyle={{
                                        justifyContent: 'flex-start'
                                    }}
                                    dropDownStyle={{backgroundColor: '#fafafa'}}
                                    onChangeItem={item =>{
                                        getValue(item.value,"brand_id")
                                        getClients(item.value)
                                    }}
                                />
                                {fields.brand_id || submit?null:<Text style={{color:'red',width:'90%',textAlign:'right',fontSize:11}}>Please Select</Text>}
                                <Text style={styles.inputTxt}>Client</Text>
                                <DropDownPicker
                                    items={renderClients()}
                                    labelStyle={{color:'#001441'}}
                                    placeholder="Please Select"
                                    containerStyle={{height: 40,width:'90%',borderRadius:7,marginTop:10,margin:3}}
                                    style={{backgroundColor: 'white'}}
                                    itemStyle={{
                                        justifyContent: 'flex-start'
                                    }}
                                    dropDownStyle={{backgroundColor: '#fafafa'}}
                                    onChangeItem={item =>{
                                        getValue(item.value,"client_id")
                                    }}
                                />
                                {fields.client_id || submit?null:<Text style={{color:'red',width:'90%',textAlign:'right',fontSize:11}}>Please Select</Text>}
                            </>

                        ):null
                    }
                        {/* <Text style={styles.inputTxt}>Project Name</Text>
                        <TextInput value={fields.project_name} onChangeText={(v)=>getValue(v,"project_name")} style={styles.input}/>
                        {fields.project_name || submit?null:<Text style={{color:'red',width:'90%',textAlign:'right',fontSize:11}}>Please Fill</Text>} */}
                        

                        {
                            user?
                            (
                                <>
                                    <Text style={styles.inputTxt}>Project Price</Text>
                                    <TextInput value={fields.project_price} keyboardType="number-pad" onChangeText={(v)=>getValue(v,"project_price")} style={styles.input}/>
                                    {fields.project_price || submit?null:<Text style={{color:'red',width:'90%',textAlign:'right',fontSize:11}}>Please Fill</Text>}
                                    <Text style={styles.inputTxt}>Project Paid</Text>
                                    <TextInput value={fields.project_paid} keyboardType="number-pad" onChangeText={(v)=>getValue(v,"project_paid")} style={styles.input}/>
                                    {fields.project_paid || submit?null:<Text style={{color:'red',width:'90%',textAlign:'right',fontSize:11}}>Please Fill</Text>}
                                    <Text style={styles.inputTxt}>Project Balance</Text>
                                    <TextInput value={fields.project_balance} keyboardType="number-pad" onChangeText={(v)=>getValue(v,"project_balance")} style={styles.input}/>
                                    {fields.project_balance || submit?null:<Text style={{color:'red',width:'90%',textAlign:'right',fontSize:11}}>Please Fill</Text>}
                                </>
                            ):null
                        }


                        <Text style={styles.inputTxt}>Project Type</Text>
                            <DropDownPicker
                            items={departments.map((item)=>{
                               return {label:item.department_name,value:item.department_id}
                            })}
                            labelStyle={{color:'#001441'}}
                            placeholder="Please Select"
                            defaultValue={projectType}
                            containerStyle={{height: 40,width:'90%',borderRadius:7,marginTop:10,margin:3}}
                            style={{backgroundColor: 'white'}}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            controller={instance => controller = instance}
                            onChangeItem={item =>{
                                setProjectType(item.value)
                                getValue(item.value,"project_type")
                                getQuestionDynamic(item.value)
                            }}
                        />
                            {renderAllFields()}
                            {projectType || submit?null:<Text style={{color:'red',width:'90%',textAlign:'right',fontSize:11}}>Please Select</Text>}

                        {/* <Text style={styles.inputTxt}>Start & Due Date</Text>
                        <View style={styles.doubleInput}>
                            <OipDatePicker/>
                            <OipDatePicker/>
                        </View> */}
                <Text style={styles.inputTxt}>Project Summary</Text>
                <TextInput 
                value={fields.project_summary}
                onChangeText={(v)=>getValue(v,"project_summary")}
                style={{...styles.input,height:80}}
                textAlignVertical="top"
                placeholder="Message"
                multiline={true}
                numberOfLines={8}
                />
                {fields.project_summary || submit?null:<Text style={{color:'red',width:'90%',textAlign:'right',fontSize:11}}>Please Fill</Text>}
                <Text style={styles.inputTxt}>Upload Files</Text>
                <View style={styles.uploadFile}>
                    <Text>{file.name?file.name.slice(0,5)+'...':"choose file"}</Text>
                    <TouchableOpacity onPress={()=>uploadFile()} activeOpacity={0.7}>
                        <IconPlus name="pluscircle" color="#29BCFF" size={30}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                onPress={()=>{
                    setSubmit(false)
                    console.log(fields)
                    if(
                        // fields.project_name && 
                        fields.project_summary && 
                        fields.project_type &&
                        (user?fields.project_balance:true) &&
                        (user?fields.project_paid:true) &&
                        (user?fields.project_price:true) &&
                        (user?fields.brand_id:true) &&
                        (user?fields.client_id:true)
                         ){
                        loadingTrue()
                        createProject({...fields,project_type:projectType},loadingFalse,showModel)
                    }
                }}
                activeOpacity={0.7} 
                style={styles.uploadBtnCon}
                >
                    {loading?<Loader color="white" size={25}/>:(
                        <Text style={{color:'white',textAlign:'center',textAlignVertical:'center'}}>
                            Submit
                        </Text>
                    )}
                </TouchableOpacity>
                </View>
            </Animated.View>
            </ScrollView>
        </View>
    )
}

const styles=StyleSheet.create({
    mainDiv:{
        flex:1,
        alignItems:'center',
        width:'100%',
    },
    container:{
        flex:1,
        paddingBottom:10,
        marginTop:10,
        marginBottom:10,
        width:'100%',
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
    title:{
        color:'#001441',
        fontSize:24,
        fontWeight:'bold',
        fontFamily:'Poppins-Black'
    },
    titleCon:{
        padding:10,
    },
    subTitle:{
        color:'#606C83',
        fontSize:14
    },
    line:{
        backgroundColor:'#D9D9D9',
        height:1,
        width:'100%'
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

    },
    doubleInput:{
        width:'90%',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    sub:{
        width:'90%',
        height:50,
        flexDirection:'row',
        alignItems:'center'
    },
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
    fieldsCon:{
        alignItems:'center',
    },
    gender:{
        color:'#001441',
        fontWeight:'bold'
    },
    dateIcon:{
        marginLeft:8,
        marginRight:8
    },
    uploadFile:{
        backgroundColor:'white',
        width:'90%',
        borderRadius:7,
        padding:10,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
    },
    uploadBtnCon:{
        marginTop:15,
        justifyContent:'center',
        alignItems:'center',
        width:150,
        height: 30,
        backgroundColor:"#001441",
        color:'white',
        borderRadius:8
    }
})

function mapStateToProps({clients,departments,questionDynamic}){
    return {clients,departments,questionDynamic}
}

export default connect(mapStateToProps,actions)(CreateProject);
