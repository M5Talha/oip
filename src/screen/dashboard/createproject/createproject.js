import React, { Component, useEffect, useState } from 'react'
import { Text, View ,StyleSheet,TextInput,TouchableOpacity,Dimensions,Animated} from 'react-native'
import {CheckBox, Row} from "native-base"
import { ScrollView } from 'react-native-gesture-handler';
import Header from "../../../component/header";
import IconDate from "react-native-vector-icons/Fontisto"
import IconPlus from "react-native-vector-icons/AntDesign"
import Icon from 'react-native-vector-icons/Fontisto';
import OipDatePicker from '../../../component/oipDatePicker';
import DropDownPicker from 'react-native-dropdown-picker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import DocumentPicker from 'react-native-document-picker';
import {connect} from "react-redux"
import * as actions from "../../../store/actions"
import DropdownType from "./dropDrown";
import RadioAndCheckType from "./radioAndCheck"
import TextType from "./text"
import SuccessModel from '../../../component/successModel';
import Loader from "../../../component/loader";

const {height}=Dimensions.get('window');

function CreateProject({navigation,createProjectByForm,getClients,clientInfo,route,getDashboardDepartments,dashboardDepartment,getQuestionDynamic,questionDynamic}){
    const position=useState(new Animated.Value(height))[0];
    const [fields,setFields]=useState({
        // project_name:"",
        project_type:"",
        project_summary:"",
        summary_file:"",
        package_name:"",
        client_id:"",
        project_price:""

    })

    const [file,setFile]=useState({})
    const [projectType,setProjectType]=useState("")
    const [isModel,setIsModel]=useState(false);
    const [loading,setLoading]=useState(false);
    const [pagLoading,setPageLoading]=useState(true);
    const [submit,setSubmit]=useState(true);
    useEffect(()=>{
        const unSubs=[
            navigation.addListener('focus',()=>{
                getDashboardDepartments()
                getQuestionDynamic(route.params.projectType).then(()=>{
                   setPageLoading(false)
                })
                console.log('focus')
                getValue(route.params.projectType,"project_type")
                getValue(route.params.des,"project_summary")
                getValue(route.params.package_name,"package_name")
                getValue(clientInfo.client_id,"client_id")
                getValue(route.params.price,"project_price")
                setProjectType(route.params.projectType)
            }),
            navigation.addListener('blur',()=>{
                setFields({
                        // project_name:"",
                        project_type:"",
                        project_summary:"",
                        summary_file:"",
                    }
                )
                setFile({})
                setSubmit(true)
                setPageLoading(true)
                navigation.popToTop()
            })]
        Animated.timing(position,{
            toValue:0,
            duration:500,
            useNativeDriver:true
        }).start()

        return function cleanup() {
            unSubs.forEach((unSub) => {
              unSub()
            })
          }

    },[navigation])
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

    function renderProjectType(projectId){
        return dashboardDepartment.filter((item)=>item.department_id==projectId)[0].department_name
    }

    // renderProjectType(3)
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

   if(pagLoading){
    return <Loader size={30} color="blue"/>
   }else{
    return (
        
        <View style={styles.mainDiv}>
            <SuccessModel 
            title="Added Successfully" 
            closeModle={hideModel} 
            visible={isModel}
            backToTop={()=>navigation.reset({
                index: 0,
                routes: [{ name: 'dashboard' }],
              })}
            />
            <Header 
            back="back"
            iconName="chevron-back"
            title="Create Project"
            />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingLeft:5,paddingRight:5,width:wp(100)}}>
            <Animated.View style={{...styles.container,transform:[{translateY:position}]}}>
                <View style={styles.titleCon}>
                    <Text style={styles.title}>Create New Project</Text>
                    <Text style={styles.subTitle}>Now you're a part of us.</Text>
                </View>
                <View style={styles.line}/>
                <View style={styles.fieldsCon}>
                        {/* <Text style={styles.inputTxt}>Project Name</Text>
                        <TextInput onChangeText={(v)=>getValue(v,"project_name")} style={styles.input}/>
                        {fields.project_name || submit?null:<Text style={{color:'red',width:'90%',textAlign:'right',fontSize:11}}>Please Fill</Text>} */}
                        {route.params.custom?null:(
                            <>
                            <Text style={styles.inputTxt}>Project Package</Text>
                        <TextInput 
                        value={route.params.package_name}
                        onChangeText={(v)=>getValue(v,"package_name")} 
                        style={{...styles.input,color:'#777784'}}
                        />
                        {fields.package_name || submit?null:<Text style={{color:'red',width:'90%',textAlign:'right',fontSize:11}}>Please Fill</Text>}
                        <Text style={styles.inputTxt}>Project Price</Text>
                        <TextInput 
                        editable={false}
                        value={fields.project_price}
                        onChangeText={(v)=>getValue(v,"project_price")} 
                        style={{...styles.input,color:'#777784'}}
                        />
                        {fields.project_price || submit?null:<Text style={{color:'red',width:'90%',textAlign:'right',fontSize:11}}>Please Fill</Text>}
                        </>
                        )}
                        <Text style={styles.inputTxt}>Project Type</Text>
                        <DropDownPicker
                                items={dashboardDepartment.map((item)=>{
                                    return {label:item.department_name,value:item.department_id}
                                 })}
                                labelStyle={{color:'#001441'}}
                                disabled={true}
                                placeholder={renderProjectType(route.params.projectType)}
                                placeholderStyle={{color:'gray'}}
                                defaultValue={projectType}
                                containerStyle={{height: 40,width:'90%',borderRadius:7,marginTop:10,margin:3}}
                                style={{backgroundColor: 'white'}}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{backgroundColor: '#fafafa'}}
                                onChangeItem={item =>{
                                    setProjectType(item.value)
                                    getValue(item.value,"project_type")
                                }}
                            />
                            {renderAllFields()}
                            {fields.project_type || submit?null:<Text style={{color:'red',width:'90%',textAlign:'right',fontSize:11}}>Please Select</Text>}

                        {/* <Text style={styles.inputTxt}>Start & Due Date</Text>
                        <View style={styles.doubleInput}>
                            <OipDatePicker/>
                            <OipDatePicker/>
                        </View> */}
                <Text style={styles.inputTxt}>Project Summary</Text>
                <TextInput 
                editable={route.params.custom?true:false}
                value={route.params.custom?null:route.params.des}
                onChangeText={(v)=>getValue(v,"project_summary")}
                style={{...styles.input,height:'auto'}}
                textAlignVertical="top"
                placeholder="Message"
                multiline={true}
                numberOfLines={8}
                />
                {/* {fields.project_summary || submit?null:<Text style={{color:'red',width:'90%',textAlign:'right',fontSize:11}}>Please Fill</Text>} */}
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
                        fields.project_type &&
                        fields.package_name
                         ){
                        loadingTrue()
                        createProjectByForm({...fields},loadingFalse,showModel)
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
}

const styles=StyleSheet.create({
    mainDiv:{
        flex:1,
        alignItems:'center',
        width:'100%'
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
        paddingLeft:20
    },
    fieldsCon:{
        alignItems:'center',
        flex:1
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
        width:'40%',
        height: 30,
        backgroundColor:"#001441",
        color:'white',
        borderRadius:8
    }
})

function mapStateToProps({clientInfo,dashboardDepartment,questionDynamic}){
    return {clientInfo,dashboardDepartment,questionDynamic}
}

export default connect(mapStateToProps,actions)(CreateProject);
