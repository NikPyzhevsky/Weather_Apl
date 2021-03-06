import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
    Alert, View, Text
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DailyView from '../Daily/DailyView';
import * as LocalWeather from '../../store/actions/LocalWeather';
// import Swiper from 'react-native-swiper';


const styles = {
    wrapper: {},
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB'
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5'
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9'
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    }
  }


export default function DailyContainer({navigation}) {

  const load = useSelector(state => state.LocalWeather.load)
  const dispatch = useDispatch()
  // 

  const [isFetching, setIsFetching] = useState(false);
  // const [pickedLocation, setPickedLocation] = useState(null);
  const lat = useSelector(state=> state.LocalWeather.lat)
  const lng = useSelector(state=> state.LocalWeather.lng)
  const Title = useSelector(state=> state.LocalWeather.CityName)
  const DailyList = useSelector(state=> state.LocalWeather.CityData)
  // const DailyList = useSelector(state=> state.LocalWeather.CityHourlyDataYes)
  
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
  


  useEffect(()=>{
    dispatch(LocalWeather.getLocationHandler())
  },[])

  const getLocationHandler = async () => {
    dispatch(LocalWeather.getLocationHandler())
  };
  

  // useEffect(()=>{
  //   if(lat!=0&&lng!=0){
      
  //     dispatch(LocalWeather.FetchCityName(lat,lng))
  //   dispatch(LocalWeather.FetchCitySearch(lat,lng))
  //   }
  // },[isFetching, load])




  const onRefresh = React.useCallback(() => {
    dispatch(LocalWeather.getLocationHandler())
  }, []);


  const  renderPagination  =  index  => (
    <View style={{}}>
      <Text>{index}</Text>
    </View>
  );
  
  return (
  //   <Swiper
  //   style={styles.wrapper}
  //   showsButtons
  //   // disable button onPress behavior
  //   disablePrevButton
  //   disableNextButton
  //   loop={false}
  //   renderPagination={renderPagination}
  // >
     <DailyView
    Title={Title}
    refreshing={refreshing}
    onRefresh={onRefresh}
    DailyList={DailyList}
    onButtonClicked={onButtonClicked}
    navigation={navigation}
    getLocationHandler={getLocationHandler}
    Error={Error}
    isFetching={isFetching}
    load={load}
    />


    //  <DailyYesterday
    // Title={Title+"-yesterday"}
    // refreshing={refreshing}
    // onRefresh={onRefresh}
    // DailyList={DailyList}
    // onButtonClicked={onButtonClicked}
    // navigation={navigation}
    // getLocationHandler={getLocationHandler}
    // Error={Error}
    // isFetching={isFetching}
    // load={load}
    // lon={lng}
    // lat={lat}
    // />
  // </Swiper>
   
  );
}

