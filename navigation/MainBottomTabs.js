import React, { useEffect, useState } from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import * as SplashScreen from 'expo-splash-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

import CitiesContainer from '../screens/Cities/CitiesContainer';
import DailyContainer from '../screens/Daily/DailyContainer';
import HourlyContainer from '../screens/Hourly/HourlyContainer'
// import DailyScreen from '../screens/DailyScreen';
import HourlyScreen from '../screens/HourlyScreen';

import * as Cities from '../store/actions/Cities';
import * as LocalWeather from '../store/actions/LocalWeather';
import { Notifications } from 'react-native-notifications';





  
const Tab = createMaterialBottomTabNavigator();

export default function MainBottomTabs() {

  Notifications.registerRemoteNotifications();

 Notifications.events().registerNotificationReceivedForeground(
  (notification, completion) => {
   completion({ alert: true, sound: true, badge: false });
   console.log('Notification received in foreground: ${notification.title} : ${notification.body}'
   );
  }
 );

 Notifications.events().registerNotificationOpened(
  (notification, completion) => {
   console.log(`Notification opened: ${notification.payload}`);
   completion( Platform.OS.toLowerCase() == "ios"
   ? null
   : dispatch(LocalWeather.openFile()));
  }
 ); 
  const ActualTab = useSelector(state => state.Cities.ActualScreen)

  // const [ActualTab, setTab] = useState("Cities");
  const [appIsReady, setAppIsReady] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        
        dispatch(Cities.UpdateCityBoxes())
        // Pre-load fonts, make any API calls you need to do here
        // await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true)
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  // 
  const wait = (timeout) => {
    // console.log(listOfCities)
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  

  if (!appIsReady) {
    return null;
  }
  
  return (
    <Tab.Navigator
      initialRouteName="MainBottom"
      shifting={true}
      activeColor="#fff"
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: '#fff', height:100 }}
    >
      <Tab.Screen
        name="Cities"
        component={CitiesContainer}
        options={{
          tabBarLabel: 'Cities',
          tabBarIcon: ({ color }) => (
            <TouchableOpacity onPress={()=>console.log("Pressed Cities")}>
              <AntDesign name="home" size={26} color={color} />
            </TouchableOpacity>
          ),
        }}
        listeners={
          ({ navigation, route }) => ({
            tabPress: e => {
              // Prevent default action
              // e.preventDefault();
        
              if(ActualTab =="Cities") {
                dispatch(Cities.UpdateCityBoxes())
                // dispatch(Cities.updateLoad(true))
                // wait(2000).then(()=>dispatch(Cities.updateLoad(false)))
                // setTimeout(()=>dispatch(Cities.updateLoad(false)),1000)
                console.log("shouldRefresh")
               } 
               else{
                dispatch(Cities.SetTab("Cities"))
                navigation.navigate("Cities")
                console.log("navigate to Cities")
               }
            },
          })
        }
      />
      <Tab.Screen
        name="Daily"
        component={DailyContainer}
        options={{
          tabBarLabel: 'Daily',
          tabBarIcon: ({ color }) => (
            <AntDesign name="calendar" size={26} color={color} />
          ),
        
        }}
        listeners={
          ({ navigation, route }) => ({
            tabPress: e => {
              // Prevent default action
              // e.preventDefault();
        
              if(ActualTab =="Daily") {
                dispatch(LocalWeather.getLocationHandler())
                dispatch(LocalWeather.updateLoad(true))
                wait(200).then(()=>dispatch(LocalWeather.updateLoad(false)))
                // setTimeout(()=>dispatch(Cities.updateLoad(false)),1000)
                console.log("shouldRefresh")
               } 
               else{
                dispatch(Cities.SetTab("Daily"))
                navigation.navigate("Daily")
                console.log("navigate to Daily")
               }
            },
          })
        }
      />
      <Tab.Screen
        name="Hourly"
        component={HourlyContainer}
        options={{
          tabBarLabel: 'Hourly',
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-time-outline" size={26} color={color} />
          ),
        }}
        listeners={
          ({ navigation, route }) => ({
            tabPress: e => {
              // Prevent default action
              // e.preventDefault();
        
              if(ActualTab =="Hourly") {
                dispatch(LocalWeather.getLocationHandler())
                dispatch(LocalWeather.updateLoad(true))
                wait(200).then(()=>dispatch(LocalWeather.updateLoad(false)))
                // setTimeout(()=>dispatch(Cities.updateLoad(false)),1000)
                console.log("shouldRefresh")
               } 
               else{
                dispatch(Cities.SetTab("Hourly"))
                navigation.navigate("Hourly")
                console.log("navigate to Hourly")
               }
            },
          })
        }
      />
    </Tab.Navigator>
  );
}
