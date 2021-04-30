import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    RefreshControl, SafeAreaView, Text, View, Button
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as Permissions from 'expo-permissions';

import CityList from '../../../components/CityList';
import IconErr from '../../../components/UI/IconErr';

import ModalActivityIndicator from '../../../components/UI/ModalActivityIndicator';

import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
// import * as IntentLauncher from 'expo-intent-launcher';
import { useDispatch } from 'react-redux';
import * as LocalWeather from '../../../store/actions/LocalWeather';


const api = {
  key: 'ce956013a9e00a85e038ee708b911989',
  base: 'https://api.openweathermap.org/data/2.5/weather?',
  weather: 'https://api.openweathermap.org/data/2.5/onecall?'
}


function HomeScreen({ navigation }) {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', e => {
      // Prevent default behavior
      // e.preventDefault();

      alert('Default behavior prevented');
      // Do something manually
      // ...
    },[navigation]);

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}


function SettingsScreen(props) {
  const {
    Title,
    refreshing,
    onRefresh,
    DailyList,
    onButtonClicked,
    navigation,
    getLocationHandler,
    Error,
    isFetching,
    load,
} = props
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}


const Tab = createMaterialTopTabNavigator();

export default function DailyView(props) {

  

const {
    Title,
    refreshing,
    onRefresh,
    DailyList,
    onButtonClicked,
    navigation,
    getLocationHandler,
    Error,
    isFetching,
    load,
    lon,
    lat
} = props

const [permission, askForPermission] = Permissions.usePermissions(Permissions.MEDIA_LIBRARY_WRITE_ONLY, { ask: true });
const [Load, setLoad] = useState(false)
const [isFetch, setFetch] = useState(false)
let date = Math.floor((Date.now() - 86400000)/1000);
const dispatch = useDispatch()



useEffect(()=>{
  // console.log("lol")
  dispatch(LocalWeather.getYesterday(lon,lat))
  // console.log("lol")
},[Load])

useEffect(()=>{
  askForPermission()
},[])


return(




<SafeAreaView style={styles.droidSafeArea}>
        <ModalActivityIndicator show={isFetching||load} />
        {
          Error==false? 
            <View style={{flex:1}}>
             <View style={styles.header}>
          <Text style={styles.headerTitle}>{Title}</Text>
          {isFetch? <Text>
            Load
          </Text>
          :
          null
          }
          <Button
          title={"Press me"}
          onPress={()=>setLoad(!Load)}
          />
        </View>
        <NavigationContainer independent={true}>
      <Tab.Navigator
         tabBarOptions={{
          activeTintColor: "white",
          labelStyle: {
              textTransform: "uppercase",
          },
          inactiveTintColor: "grey",
          indicatorStyle: {
              height: null,
              top: '10%',
              bottom: '10%',
              width: '45%',
              left: '2.5%',
              borderRadius: 100,
              backgroundColor: "black",
          },
          style: {
              alignSelf: "center",
              width: '50%',
              borderRadius: 100,
              borderColor: "blue",
              backgroundColor: "white",
              elevation: 5, // shadow on Android
              shadowOpacity: .10, // shadow on iOS,
              shadowRadius: 4, // shadow blur on iOS
          },
          tabStyle: {
              borderRadius: 100,
          },
      }}
      swipeEnabled={true}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
        <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        style={styles.CitiesBox}>

        {DailyList.length>0? DailyList.map((item, key)=>{
                        return(
                          <CityList 
                            onButtonClicked={onButtonClicked}
                            name={item.dt} 
                            key={key}
                            title={Title}
                            // loadWeather={props.LoadWeather}
                            temp={item.temp}
                            weather={item.weather[0].main}
                            navigation={navigation}
                          />
                         
                        )
                      })
                      :
                      <Text>None</Text>
           }
        </ScrollView>
           </View>
        :
        <View style={styles.ErrorBox}>
        <View style={styles.circle} >
         <IconErr 
           height={Dimensions.get('window').width*0.14}
           width={Dimensions.get('window').width*0.14}
           style ={styles.IconErr}
         />
        </View>
        <View style={styles.ErrorTitle}>
            <Text style={styles.ErrorTitle}>Data is no avaliable</Text>
        </View>
        <View style={styles.ErrorSubString}>
            <Text style={styles.ErrorSubString}>Cannot determine your current location</Text>
        </View>
        <TouchableOpacity style={styles.ErrorButton} onPress={getLocationHandler}>
        <Text style={styles.ButtonTitle} >Allow acces</Text>
        </TouchableOpacity>
        
       </View>
        } 
       
    </SafeAreaView>
)
}




const styles = StyleSheet.create({
    container: {
      height: Dimensions.get('window').height*0.79,
      // backgroundColor:'yellow',
    //  height:'100%'
      // flexDirection:'column',
      // flexDirection:'column',
      //   justifyContent:'flex-end',
    },
    droidSafeArea: {
      // backgroundColor:"#E5E5E5",
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 30 : 0,
        backgroundColor:"white",

        // justifyContent:'center',
        // flexDirection:'column',
        // justifyContent:'flex-end',
    },
    header:{
      height: Dimensions.get('window').height*0.083,
      // backgroundColor:'red',
      justifyContent:'center',
      paddingLeft: Dimensions.get('window').width*0.064,
    },
    headerTitle:{
        fontSize:28
    },
    CitiesBox:{
        flex:1,
        paddingHorizontal:Dimensions.get('window').width*0.064,
        // marginTop:18,
        // marginHorizontal: Dimensions.get('window').width*0.065,
        // backgroundColor:"red",
        // display:'flex',
        flexDirection:'column',
        // justifyContent:'space-between',
        // position:'relative'
        // flexDirection:'c',
        // // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    CitiesBoxSt:{
      flex:1,
      // marginHorizontal: Dimensions.get('window').width*0.065,
        // backgroundColor:"yellow",
        // display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
    },
    CitiesBoxStr:{
        justifyContent:'space-between',
        flexDirection:'row',
        // paddingBottom:Dimensions.get('window').width*0.019,
        marginBottom:Dimensions.get('window').width*0.019,
        // backgroundColor:'red'
    },
    SearchRes:{
        fontSize:13
    },
    ErrorBox:{
      flex:1,
      alignItems:'center',
      // justifyContent:'center',
      // marginTop: Dimensions.get('window').height*0.18,
      justifyContent:'center',
      // backgroundColor:'orange'
    },
    circle: {
      width:Dimensions.get('window').width*0.48,
      height:Dimensions.get('window').width*0.48,
      borderRadius: Dimensions.get('window').width*0.48 / 2,
      backgroundColor: "#ececec",
      // textAlign:'center',
      // textAlignVertical: "center",textAlign: "center",
      display:"flex",
      alignItems:"center",
      justifyContent:'center',
      marginBottom:68,
    },
    IconErr:{
      // textAlignVertical: "center",textAlign: "center"
  //     flexDirection: 'row',
  // alignItems: 'baseline',
  
    },
    ErrorTitle:{
      fontSize:24,
      display:"flex",
      alignItems:"center",
      justifyContent:'center',
    },
    ErrorSubString:{
      marginTop:18,
      fontSize:15,
      marginBottom:34,
      color:'#A4A4A4',
    },
    ErrorButton:{
      backgroundColor:"black",
      width:168,
      height:48,
      borderRadius:8,
      alignItems:'center',
      justifyContent:'center',
      color:'white',
    },
    ButtonTitle:{
      color:'white',
      fontSize:15
    }
  
   
  });