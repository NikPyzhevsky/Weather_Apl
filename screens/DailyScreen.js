import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  RefreshControl
} from 'react-native';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {MyTheme} from '../Theme/Theme'
import { useDispatch, useSelector } from 'react-redux';

import * as LocalWeather from '../store/actions/LocalWeather';

// import LocationPicker from '../components/LocationPicker';
import ModalActivityIndicator from '../components/UI/ModalActivityIndicator';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import CityList from '../components/CityList';
import IconErr from '../components/UI/IconErr'

// const [width, height] = Dimensions.get('window')

export default function DailyScreen({navigation}) {

  // const ActualTab = useSelector(state => state.Cities.ActualScreen)
  const load = useSelector(state => state.LocalWeather.Load)
  const dispatch = useDispatch()
  // 

  const [isFetching, setIsFetching] = useState(false);
  // const [pickedLocation, setPickedLocation] = useState(null);
  const lat = useSelector(state=> state.LocalWeather.lat)
  const lng = useSelector(state=> state.LocalWeather.lng)
  const Title = useSelector(state=> state.LocalWeather.CityName)
  const DailyList = useSelector(state=> state.LocalWeather.CityData)
  const Error = useSelector(state=> state.LocalWeather.Error)
  // const isFetching = useSelector(state=> state.LocalWeather.isFetching)

  const [ButtonClicked,setActive] = useState(false)
  const [refreshing, setRefreshing] = React.useState(false);


const onButtonClicked = (name,temp,weather, data)=> {
  if(!ButtonClicked){
    setActive(true)
    setTimeout(()=>{setActive(false)}, 1000)
    // console.log(data+"______________________________________")
    navigation.navigate('Details', {options:{title:name},title:name,temp:temp,weather:weather,date:data})


}
}
  // dispatch(LocalWeather.verifyPermissions())
  const verifyPermissions = async () => {
    const result = await Location.requestForegroundPermissionsAsync();
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    console.log("Permision"+hasPermission)
    if (!hasPermission) {
      dispatch(LocalWeather.setErr(true))
      setIsFetching(false);
      return;
    }
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000
      });
        dispatch(LocalWeather.setPickedLocation(location.coords.latitude,location.coords.longitude))
      // setPickedLocation({
      //   lat: location.coords.latitude,
      //   lng: location.coords.longitude
      // });
      dispatch(LocalWeather.setErr(false))
    } catch (err) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map.',
        [{ text: 'Okay' }]
      );
      dispatch(LocalWeather.setErr(true))
    }
    setIsFetching(false);
  };
  
  useEffect(()=>{
    getLocationHandler()
    // dispatch(LocalWeather.getLocationHandler())
    // dispatch(LocalWeather.FetchCitySearch("daily"))
  },[])

  useEffect(()=>{
    if(lat!=0&&lng!=0){
      
      dispatch(LocalWeather.FetchCityName(lat,lng))
    dispatch(LocalWeather.FetchCitySearch(lat,lng))
    }
    
    // console.log(DailyList+"________________________________________")
    // dispatch(LocalWeather.FetchCitySearch(lat,lng))

    // console.log(Title)
    
  },[isFetching, load])

  



  // getLocationHandler()
  // useEffect(()=>{
  //   // dispatch(LocalWeather.FetchCityName(lat,lng))
  //   dispatch(LocalWeather.FetchCitySearch(lat,lng))

  //   // console.log(Title)
    
  // },[Title])



  const onRefresh = React.useCallback(() => {
    // setRefreshing(true);
    getLocationHandler()
    
  }, []);

  // console.log(DailyList+"________________________")
  return (
    <SafeAreaView style={styles.droidSafeArea}>
        <ModalActivityIndicator show={isFetching||load} />
        {
          Error==false? 
            <View style={{flex:1}}>
             <View style={styles.header}>
          <Text style={styles.headerTitle}>{Title}</Text>
        </View>
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
                            temp={item.temp.eve}
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