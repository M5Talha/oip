import React, { useState,useEffect } from 'react'
import { Text, View ,StyleSheet,ScrollView,Dimensions,Image,Animated, TouchableOpacity, Linking,PermissionsAndroid} from 'react-native'
import Header from "../../component/header"
import IconDate from "react-native-vector-icons/Fontisto"
import IconPlus from "react-native-vector-icons/AntDesign"
import IconImage from "react-native-vector-icons/Entypo"
import { connect } from 'react-redux'
import * as actions from "../../store/actions"
import RNFetchBlob from 'rn-fetch-blob'
import getText from '../../utils/getText'
import FileIcon from "react-native-vector-icons/FontAwesome"
import AsyncStorage from "@react-native-async-storage/async-storage"
import DepartureAnsereModel from "../../component/departAnsweres"
import departmentAnswers from '../../store/reducers/departure_answers'

const {width,height}=Dimensions.get('window')

function ProjectDetail({navigation,route,getMyProjectDetails,projectDetails,clientInfo,getProjectBrief,departmentAnswers,getDepartments,departments}) {
    const position=useState(new Animated.Value(height))[0];
    const [image,setImage]=useState({
        client_image:"",
        client_image_path:"",
        client_id:""
    })

    const [user,setUser]=useState('')
    const [model,setModel]=useState(false)
    function renderModel(con){

        if(con){
            setModel(true)
        }
        else{
            setModel(false)
        }

    }

    useEffect(()=>{
        getUser()
        setImage(clientInfo)
        getMyProjectDetails(route.params.client_projects_id)
        Animated.timing(position,{
            toValue:0,
            duration:500,
            useNativeDriver:true
        }).start()
        getProjectBrief(route.params.project_type,route.params.client_projects_id)
        getDepartments(route.params.project_type)
        return navigation.addListener('focus',()=>{
            getMyProjectDetails(route.params.client_projects_id)
        })
    },[])

    // console.log("detailproject",projectDetails)
    // console.log("clientinfo",clientInfo)
    async function getUser(){
        const USER=await AsyncStorage.getItem('USER')
        setUser(USER)
    }
    const getExtention = (filename) => {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) :
        undefined;
    }

    const downloadFile=async()=>{
        if(projectDetails.records[0].summary_file){

                if (Platform.OS === 'android') {
                  const status=await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
                  if(status=="granted"){
                    const date=new Date()
                    const { config, fs } = RNFetchBlob
                    let PictureDir = fs.dirs.PictureDir // this is the pictures directory. You can check the available directories in the wiki.
                    let options = {
                      fileCache: true,
                      addAndroidDownloads : {
                        useDownloadManager : true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
                        notification : true,
                        path:  PictureDir + "/me_"+Math.floor(date.getTime() + date.getSeconds() / 2), // this is the path where your downloaded file will live in
                        description : 'Downloading image.'
                      }
                    }
                    config(options).fetch('GET', user==="accountManager"?"https://api.outsourceinpakistan.com/uploads/user/":"https://api.outsourceinpakistan.com/uploads/client_projects/"+projectDetails.records[0].summary_file).then((res) => {
                      // do some magic here
                    })
                  }
                }else{
                    Linking.openURL(user==="accountManager"?"https://api.outsourceinpakistan.com/uploads/user/":"https://api.outsourceinpakistan.com/uploads/client_projects/"+projectDetails.records[0].summary_file)
                }
        }else{
            alert('file does not exist')
        }

    }
    function renderProjectType(){
        if(departments.length>0){
            return departments.filter((item)=>item.department_id===route.params.project_type)[0].department_name
        }
    }
    // console.log("hel",projectDetails.comments)
    return (
        <View style={{flex:1}}>
            <Header title="My Projects" back="back" iconName="chevron-back"/>
            <DepartureAnsereModel
            visible={model}
            projectName={route.params.project_name}
            projectType={renderProjectType()}
            data={departmentAnswers}
            closeModle={()=>renderModel(false)}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Animated.View style={{transform:[{translateY:position}]}}>
                <View style={styles.con}>
                    <Text style={styles.title}> {route.params.project_name.toUpperCase()}</Text>
                    <View style={styles.sec1}>
                        <View style={styles.dateCon}>
                            <IconDate name="date" color="#71809C" size={20}/>
                            <Text style={styles.date}>{route.params.client_projects_date}</Text>
                        </View>
                        <View>
                            <Text style={{...styles.amount,color:'green'}}>{route.params.project_price}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{...styles.date,marginLeft:3,marginTop:3}}>Due Payment: <Text style={{color:route.params.payment_due==="No"?"green":"red"}}>{route.params.payment_due}</Text></Text>
                    </View>
                    <View style={styles.line}/>
                    <Text style={{...styles.desTitle,marginTop:5,marginBottom:5}}>Project Type</Text>
                    <View style={styles.fieldBox}>
                        <Text style={{...styles.desTitle,color:'#A0A5AF'}}>{renderProjectType()}</Text>
                    </View>
                    <Text style={{...styles.desTitle,marginTop:5,marginBottom:5}}>Project Status:</Text>
                    <View style={styles.fieldBox}>
                        <Text style={{...styles.desTitle,color:'#A0A5AF'}}>{route.params.delivery_status}</Text>
                    </View>
                    <Text style={{...styles.desTitle,marginTop:5,marginBottom:5}}>Total Paid:</Text>
                    <View style={styles.fieldBox}>
                        <Text style={{...styles.desTitle,color:'#A0A5AF'}}>{route.params.project_paid}</Text>
                    </View>
                    <Text style={{...styles.desTitle,marginTop:5,marginBottom:5}}>Total Balance:</Text>
                    <View style={styles.fieldBox}>
                        <Text style={{...styles.desTitle,color:'#A0A5AF'}}>{route.params.project_balance}</Text>
                    </View>
                    <Text style={{...styles.desTitle,marginTop:5,marginBottom:5}}>Description</Text>
                    <View style={{...styles.fieldDes,justifyContent:'flex-start',flexWrap:'nowrap'}}>
                        <Text style={{...styles.desTitle,marginTop:5,color:'#A0A5AF',}}>{projectDetails.records[0].project_summary}</Text>
                    </View>
                    <View style={{...styles.sec1,marginTop:5}}>
                        <Text style={styles.desTitle}>Document</Text>
                        <Text style={styles.date}>{route.params.client_projects_date}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>downloadFile()}>
                    <View style={styles.images}>
                        <View style={{...styles.img,backgroundColor:'#001441'}}>
                                <Text style={{...styles.desTitle,color:'white'}}>Download Brief Document</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
                    {user==="accountManager"?null:(
                        <TouchableOpacity onPress={()=>{
                        renderModel(true)
                    }}>
                    <View style={styles.images}>
                        <View style={styles.img}>
                                <Text style={{...styles.desTitle,color:'#A0A5AF'}}>View Project Brief</Text>
                        </View>
                    </View>
                    </TouchableOpacity>
                    )}
                </View>
                <View style={{marginTop:15,marginBottom:15,width:'95%',marginLeft:'auto',marginRight:'auto',flexWrap:'wrap'}}>
                    
                    {projectDetails.comments.map((c,i)=>{
                        if(c.sender_table=="client"){
                           
                            return(
                                    <View style={styles.comCon} key={i}>
                                    <Image 
                                style={{width:30,height:30,borderRadius:15}}
                                source={image.client_image?{uri:image.client_image_path+image.client_image}:null}
                                />
                                <View style={{width:'60%',marginLeft:5}}>
                                    {c.comments_images_img?(
                                        <TouchableOpacity
                                        onPress={()=>Linking.openURL("https://api.outsourceinpakistan.com/uploads/comments_images/"+c.comments_images_img)}
                                        >
                                            <Image
                                        style={{width:'100%',height:100}}
                                        source={{uri:"https://api.outsourceinpakistan.com/uploads/comments_images/"+c.comments_images_img}}
                                        />
                                        </TouchableOpacity>
                                    ):null}
                                    {c.comments_files_file?(
                                        <TouchableOpacity
                                        onPress={()=>Linking.openURL("https://api.outsourceinpakistan.com/uploads/comments_files/"+c.comments_files_file)}
                                        style={{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'center',padding:10,backgroundColor:'#eeeeee'}}
                                        >
                                        <FileIcon
                                        name="file-text-o"
                                        size={30}
                                        color="gray"
                                        />
                                         <Text style={{marginLeft:20}}>{c.comments_files_file?c.comments_files_file.slice(0,5)+"...":null}</Text>
                                        </TouchableOpacity>
                                    ):null}
                                <View>
                                <Text style={{backgroundColor:'lightgrey', fontSize:12,fontFamily:'Poppins-Regular',padding:5,borderRadius:4,maxWidth:'100%',minWidth:'100%'}}>
                                {c.comments_text}
                                </Text>
                                </View>
                                <View style={{marginTop:3}}>
                                <Text
                                style={{fontSize:10,fontFamily:'Poppins-Regular',color:'grey',textAlign:'right'}}
                                >
                                    {c.comments_date}
                                </Text>
                                </View>
                                </View>
                                    </View>
                            )
                        }
                        else{
                            return(
                                <View style={{...styles.comCon,justifyContent:'flex-end'}} key={i}>
                                <View style={{width:'60%',marginRight:5}}>
                                    {c.comments_images_img?(
                                        <TouchableOpacity
                                        onPress={()=>Linking.openURL("https://api.outsourceinpakistan.com/uploads/comments_images/"+c.comments_images_img)}
                                        >
                                            <Image
                                        style={{width:'100%',height:100}}
                                        source={{uri:"https://api.outsourceinpakistan.com/uploads/comments_images/"+c.comments_images_img}}
                                        />
                                        </TouchableOpacity>
                                    ):null}
                                    {c.comments_files_file?(
                                        <TouchableOpacity
                                        onPress={()=>Linking.openURL("https://api.outsourceinpakistan.com/uploads/comments_files/"+c.comments_files_file)}
                                        style={{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'center',padding:10,backgroundColor:'#eeeeee'}}
                                        >
                                        <FileIcon
                                        name="file-text-o"
                                        size={30}
                                        color="gray"
                                        />
                                         <Text style={{marginLeft:20}}>{c.comments_files_file?c.comments_files_file.slice(0,5)+"...":null}</Text>
                                        </TouchableOpacity>
                                    ):null}
                                <View>
                                <Text style={{backgroundColor:'lightgrey', fontSize:12,fontFamily:'Poppins-Regular',padding:5,borderRadius:4,maxWidth:'100%',minWidth:'100%'}}>
                                {c.comments_text}
                                </Text>
                                </View>
                                <View style={{marginTop:3}}>
                                <Text
                                style={{fontSize:10,fontFamily:'Poppins-Regular',color:'grey',textAlign:'right'}}
                                >
                                    {c.comments_date}
                                </Text>
                                </View>
                                </View>
                                <Image 
                                style={{width:30,height:30,borderRadius:15}}
                                source={{uri:"https://api.outsourceinpakistan.com/uploads/user/"+c.user_image}}
                                />
                                    </View>
                                // <View key={i} style={{...styles.comCon, justifyContent:'flex-end',marginRight:10}}>
                                //         <View>
                                //         {c.comments_images_img?(
                                //         <Image
                                //         style={{width:'60%',height:100}}
                                //         source={{uri:"https://api.outsourceinpakistan.com/uploads/comments_images/"+c.comments_images_img}}
                                //         />
                                //         ):null}
                                //     <Text style={{backgroundColor:'lightgrey', fontSize:12,fontFamily:'Poppins-Regular',marginLeft:4,padding:5,borderRadius:4,maxWidth:'70%',minWidth:'50%'}}>
                                //     {c.comments_text}
                                //     </Text>

                                //         </View>
                                //         <Image 
                                //         style={{width:30,height:30,borderRadius:15}}
                                //         source={{uri:"https://api.outsourceinpakistan.com/uploads/user/"+c.user_image}}
                                //         />
                                // </View>
                            )
                        }
                    })}
                </View>
                <View style={{justifyContent:'center',alignItems:'center',marginTop:15,marginBottom:15}}>
                    <TouchableOpacity  style={styles.btn} onPress={()=>navigation.push('comment',{id:route.params.client_projects_id})}>
                            <Text style={styles.btnTitle}>Add New Comment</Text>
                    </TouchableOpacity >
                </View>
                </Animated.View>
            </ScrollView>
        </View>
    )
}
const styles=StyleSheet.create({
    con:{
        paddingLeft:15,
        paddingRight:15,
        paddingTop:10,
        paddingBottom:10,
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
    title:{
        color:'#001441',
        fontSize:24,
        fontFamily:'Poppins-Bold'
    },
    date:{
        color:'#606C83',
        fontSize:13.5,
        fontFamily:'Poppins-Regular',
        marginLeft:10
    },
    dateCon:{
        flexDirection:'row',
        alignItems:'center'
    },
    amount:{
        color:'#222222',
        fontSize:21,
        fontFamily:'Poppins-Medium'
    },
    sec1:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:5,
        paddingRight:5
    },
    line:{
        width:'100%',
        height:1,
        backgroundColor:'#A0A2A7',
        marginTop:15,
        marginBottom:15
    },
    desTitle:{
        color:'#001441',
        fontSize:14,
        fontFamily:'Poppins-Regular',
    },
    desDetail:{
        color:'#72809D',
        fontSize:18.5
    },
    img:{
        width:'100%',
        backgroundColor: '#E1EAF1',
        borderRadius:7,
        height:40,
        margin:5,
        justifyContent:'center',
        alignItems:'center'
    },
    images:{
        width:'100%',
        justifyContent:'center',
        flexDirection:'row',
        flexWrap:'wrap',
    },
    proName:{
        color:'#35425B',
        fontSize:18.5,
        fontFamily:'Poppins-Regular',
    },
    proSubTitle:{
        color:'#72809E',
        fontSize:13,
        fontFamily:'Poppins-Regular',
    },
    proCon:{
        flexDirection:'row'
    },
    fieldBox:{
        backgroundColor:'white',
        paddingLeft:20,
        borderRadius:6,
        justifyContent:'center',
        height:40,
        marginBottom:15
    },
    fieldDes:{
        backgroundColor:'white',
        paddingLeft:20,
        borderRadius:6,
        justifyContent:'center',
        marginBottom:15
    },

    btn:{
        backgroundColor:'#001441',
        borderRadius:8,
        height:48,
        width:'90%',
        justifyContent:'center',
        alignItems:'center'
    },
    btnTitle:{
        color:'white',
        fontSize:18.5,
        fontFamily:'Poppins-Regular',

    },
    comCon:{
        marginTop:10,
        flexDirection:'row',
        alignItems:'flex-start',
        width:'100%'
    }
})

function mapStateToProps({projectDetails,clientInfo,departmentAnswers,departments}){
    return {projectDetails,clientInfo,departmentAnswers,departments}
}
export default connect(mapStateToProps, actions)(ProjectDetail);
