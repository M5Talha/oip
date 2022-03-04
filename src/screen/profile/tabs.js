import * as React from 'react';
import { View, useWindowDimensions,Text,TouchableOpacity } from 'react-native';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import Conversation from './conversation/conversation';
import Header from "../../component/header"
import Icon from "react-native-vector-icons/Ionicons"
import Support from './support';
import { connect } from 'react-redux';
import * as actions from "../../store/actions"
import { ScrollView } from 'react-native-gesture-handler';

function ChatTabs({navigation,fetchChat}) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [screenType,setScreenType]=React.useState("chat")

  const [routes] = React.useState([
    { key: 'chat', title: 'Chat' },
    { key: 'people', title: 'People' },
  ]);

  const renderScene = SceneMap({
    chat: ()=><Conversation navigation={navigation}/>,
    people: ()=><Support navigation={navigation}/>,
  });

  function renderScreen(){
    if(screenType=="chat"){
      return <Conversation navigation={navigation}/>
    }else{
      return <Support navigation={navigation}/>
    }
  }

  return (
      <View style={{flex:1}}>
    <Header 
    title="Support" 
    iconName="md-menu"
    />
      <View style={{flex:1}}>
      {renderScreen()}
      </View>
    <View style={{width:'100%',flexDirection:'row',position:'relative',bottom:0}}>
      <TouchableOpacity 
      onPress={()=>setScreenType("chat")}
      style={{width:'50%',backgroundColor:'#0838a5',justifyContent:'center',alignItems:'center',paddingVertical:10}}>
              <Icon
              name='chatbubble-sharp'
              color='#ffffff'
              size={16}
            />
            <Text style={{color:'white'}}>Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={()=>setScreenType("people")}
      style={{width:'50%',backgroundColor:'#0838a5',justifyContent:'center',alignItems:'center',paddingVertical:10}}>
              <Icon
              name='people'
              color='#ffffff'
              size={16}
            />
            <Text style={{color:'white'}}>People</Text>
      </TouchableOpacity>
    </View>
    {/* <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => <TabBar {...props} />}
      tabBarPosition="bottom"
      renderTabBar={props =>(
        <TabBar 
        labelStyle={{fontSize:11}}
        tabStyle={{backgroundColor:'#0838a5'}}
        indicatorStyle={{backgroundColor:'white'}} 
        {...props} 
        renderIcon={({ route, focused, color }) => (
            <Icon
              name={route.key==="chat" ? 'chatbubble-sharp' : 'people'}
              color={color}
              size={16}
            />
          )}
        />
      )}
    /> */}
      </View>
  );
}

export default connect(null,actions)(ChatTabs)