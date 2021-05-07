import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
    Alert, Dimensions, SafeAreaView, StyleSheet
} from 'react-native';
import {
  Text, View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import * as LocalWeather from '../../store/actions/LocalWeather';

import Main from './Components/Main'
import Yesterday from './Components/Yesterday'
import ModalActivityIndicator from '../../components/UI/ModalActivityIndicator';
import moment, { deprecationHandler } from 'moment'
import DetailScreen from "../DetailScreen"
import { createStackNavigator } from '@react-navigation/stack';
import { MyTheme } from '../../Theme/Theme';
import { HourlyTabsTheme } from '../../navigation/NavigationOptions';





const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const window = Dimensions.get("window");


export default function DailyContainer({navigation}) {

  const load = useSelector(state => state.LocalWeather.load)
  const dispatch = useDispatch()
  // 

  const [isFetching, setIsFetching] = useState(false);


  const Title = useSelector(state=> state.LocalWeather.Title)
 

  const [ButtonClicked,setActive] = useState(false)


  const [dimensions, setDimensions] = useState({ window });

  const onChange = ({ window}) => {
    setDimensions({ window });
  };

  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    }
  });


  useEffect( async ()=>{

      await dispatch(LocalWeather.getLocationHandler())    


  },[])


  return (

  <SafeAreaView style={{
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? 0 : 0,
    backgroundColor:MyTheme.colors.backgroundColor,
    }}>
        <ModalActivityIndicator show={isFetching||load} />

    <View style={{flex:1}}>
      <View style={{
        height: Dimensions.get('window').height*0.07,
        paddingLeft: Dimensions.get('window').width*0.064,
        justifyContent:'center',
        // backgroundColor:'blue'
    }}>
        <Text style={styles.headerTitle}>{Title}</Text>
      </View>
   


    <Tab.Navigator
      tabBarOptions={HourlyTabsTheme}
    swipeEnabled={true}
    >
      <Tab.Screen name="Today" component={Main} />
      <Tab.Screen name="Yesterday" component={Yesterday} />
    
    </Tab.Navigator>

           </View>
    </SafeAreaView>
  
  );
}


const styles = StyleSheet.create({
  headerTitle:{
      fontSize:28,
      color:MyTheme.colors.primary
  },
 
});
