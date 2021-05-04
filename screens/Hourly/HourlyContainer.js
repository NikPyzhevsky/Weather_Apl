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





const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const window = Dimensions.get("window");


export default function DailyContainer({navigation}) {

  const load = useSelector(state => state.LocalWeather.load)
  const dispatch = useDispatch()
  // 

  const [isFetching, setIsFetching] = useState(false);
  // const [pickedLocation, setPickedLocation] = useState(null);
  const lat = useSelector(state=> state.LocalWeather.lat)
  const lng = useSelector(state=> state.LocalWeather.lng)
  const Title = useSelector(state=> state.LocalWeather.Title)
  const name = useSelector(state=> state.LocalWeather.CityName)
  const DailyList = useSelector(state=> state.LocalWeather.CityHourlyData)
  const Error = useSelector(state=> state.LocalWeather.Error)
  // const isFetching = useSelector(state=> state.LocalWeather.isFetching)

  const [ButtonClicked,setActive] = useState(false)
  const [refreshing, setRefreshing] = React.useState(false);


  const [dimensions, setDimensions] = useState({ window });

  const onChange = ({ window}) => {
    setDimensions({ window });
  };

  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });



const onButtonClicked = (name,temp,weather, data)=> {
  if(!ButtonClicked){
    setActive(true)
    setTimeout(()=>{setActive(false)}, 1000)
    // console.log(data+"______________________________________")
    navigation.navigate('Details', {options:{title:name},title:name,temp:temp,weather:weather,date:data})
}
}

// const getLocationHandler = React.useCallback(() => {
//   dispatch(LocalWeather.getLocationHandler())
// },[]);
  
  useEffect( async ()=>{

      dispatch(LocalWeather.getLocationHandler())    
          //  await dispatch(LocalWeather.getYesterday(lat,lng))

  },[])


  const onRefresh = React.useCallback(() => {
    // setRefreshing(true);
    dispatch(LocalWeather.getLocationHandler())    
  }, []);

  // useEffect(()=>{
  //   if(lat!=0&&lng!=0){
      
  //     dispatch(LocalWeather.FetchCityName(lat,lng))
  //   dispatch(LocalWeather.FetchCitySearch(lat,lng))
  //   dispatch(LocalWeather.getYesterday(lat,lng))
  //   setTimeout(()=>{dispatch(LocalWeather.setTitle(moment(new Date()).format("MMMM Do")))},100) 
  //   }
  // },[isFetching, load])




  // const onRefresh = React.useCallback(() => {
  //   getLocationHandler()
  // }, []);

  
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
      tabBarOptions={{
        // activeTintColor: MyTheme.colors.primary,
        labelStyle: {
            textTransform: "uppercase",
            // color:MyTheme.colors.backgroundColor,
            
        },
        inactiveTintColor: MyTheme.colors.border,
        // activeTintColor: MyTheme.colors.primary,
        indicatorStyle: {
            height: null,
            top: '10%',
            bottom: '10%',
            width: '45%',
            left: '2.5%',
            borderRadius: 100,
            backgroundColor: MyTheme.colors.border,
        },
        style: {
            alignSelf: "center",
            width: '55%',
            borderRadius: 100,
            borderColor: "blue",
            backgroundColor: MyTheme.colors.primary,
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
      <Tab.Screen name="Today" component={Main} />
      <Tab.Screen name="Yesterday" component={Yesterday} />
    
    </Tab.Navigator>

           </View>
    </SafeAreaView>
  
  );
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
      backgroundColor:MyTheme.colors.background,

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
      fontSize:28,
      color:MyTheme.colors.primary
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
