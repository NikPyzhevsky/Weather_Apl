import React, {
    useState, useEffect, useRef, useCallback
} from 'react';
import {Keyboard, Platform,Dimensions} from 'react-native'
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, ActivityIndicator,Text, View, icon } from 'react-native';
import CityBox from '../components/CityBox';
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment'


import Input from '../components/UI/Input'
import ListOfResults from '../components/listOfResults'
import ModalActivityIndicator from '../components/UI/ModalActivityIndicator'
import { useDispatch, useSelector } from 'react-redux';
import * as Cities from '../store/actions/Cities';

  export default function CitiesScreen({navigation}) {
    const [text, onChangeText] = React.useState("");
    const [refreshing, setRefreshing] = React.useState(false);
    const [TimeoutID, setTimeoutID] = React.useState(null)
    // const [error, setError] = React.useState(null);
    const [ButtonClicked,setActive] = useState(false)

    const ActualTab = useSelector(state => state.Cities.ActualScreen)
    const error = useSelector(state => state.Cities.Error)
    // console.log(error)
    const listOfCities = useSelector(state => state.Cities.SearchResult)
    const load = useSelector(state => state.Cities.Load)
    const justHardcodeList = useSelector(state => state.Cities.justHardcodeList);
    // console.log(justHardcodeList)
  const dispatch = useDispatch()


  const onButtonClicked = (name,temp,weather)=> {
    if(!ButtonClicked){
      setActive(true)
      let date = moment(new Date()).format('MMMM, Do h:mm a')
      setTimeout(()=>{setActive(false)}, 1000)
      // console.log(temp)
      navigation.navigate('Details', {options:{title:name},title:name,temp:temp,weather:weather,date:date})
  }
  }

    const wait = (timeout) => {
        // console.log(listOfCities)
        return new Promise(resolve => setTimeout(resolve, timeout));
      }

    const clearTiming = () =>{
      if(TimeoutID!=null) clearTimeout(TimeoutID)     

    }
      
    useEffect(() => {
      // let txt = text;
      if(text.trim()!==""){
        if(TimeoutID!=null) clearTimeout(TimeoutID) 
        let time = setTimeout( () => {dispatch(Cities.FetchCitySearch(text))}, 1000);
        setTimeoutID(time)
       }
       else {
         console.log(TimeoutID+text+"+++++++++++++++++++++++++++++++++++++++++++++++++++")
        if(TimeoutID!=null) clearTimeout(TimeoutID) 
       }
    },[text])

    


  const onRefresh = React.useCallback(() => {
    // setRefreshing(true);
    dispatch(Cities.updateLoad(true));
    console.log(true)
    // wait(2000).then(() => dispatch(Cities.updateLoad(false)));
    dispatch(Cities.UpdateCityBoxes())
    
  }, []);

  const  onInputCancel = ()=> {
    onChangeText("")
    // dispatch(Cities.setError(null))
    // dispatch(Cities.updateSearchRes([]))
    if(TimeoutID!=null) clearTimeout(TimeoutID)    
    
  }

  return (
    <SafeAreaView style={styles.droidSafeArea}>
        <Input 
          onChangeText={onChangeText}
          value={text}
          cancel={onInputCancel}
          load={load}
          show={false}
        />
        <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={styles.CitiesBox}>
            {
              load?
              // <ActivityIndicator style={styles.ActivityIndicator} size="large" color="black" />
              <ModalActivityIndicator show={load} />
              :
                (listOfCities.length==0&&error==null||text.trim()=="")?<View style={styles.CitiesBoxSt}>
                    <View style={styles.CitiesBoxStr}>
                        <CityBox onButtonClicked={onButtonClicked} navigation={navigation} cityName={justHardcodeList[0].name} temp={justHardcodeList[0].temp} weather={justHardcodeList[0].weather}/>
                        <CityBox onButtonClicked={onButtonClicked} navigation={navigation} cityName={justHardcodeList[1].name} temp={justHardcodeList[1].temp} weather={justHardcodeList[1].weather}/>
                     </View>
                     <View style={styles.CitiesBoxStr}>
                        <CityBox onButtonClicked={onButtonClicked}  navigation={navigation} cityName={justHardcodeList[2].name} temp={justHardcodeList[2].temp} weather={justHardcodeList[2].weather}/>
                        <CityBox onButtonClicked={onButtonClicked} navigation={navigation} cityName={justHardcodeList[3].name} temp={justHardcodeList[3].temp} weather={justHardcodeList[3].weather}/>
                     </View>
                     <View style={styles.CitiesBoxStr}>
                        <CityBox onButtonClicked={onButtonClicked} navigation={navigation} cityName={justHardcodeList[4].name} temp={justHardcodeList[4].temp} weather={justHardcodeList[4].weather}/>
                        <CityBox onButtonClicked={onButtonClicked} navigation={navigation} cityName={justHardcodeList[5].name} temp={justHardcodeList[5].temp} weather={justHardcodeList[5].weather}/>
                     </View>
                     <View style={styles.CitiesBoxStr}>
                        <CityBox onButtonClicked={onButtonClicked} navigation={navigation} cityName={justHardcodeList[6].name} temp={justHardcodeList[6].temp} weather={justHardcodeList[6].weather}/>
                        <CityBox onButtonClicked={onButtonClicked} navigation={navigation} cityName={justHardcodeList[7].name} temp={justHardcodeList[7].temp} weather={justHardcodeList[7].weather}/>
                     </View>
                </View>
            :
            load?
            // <ActivityIndicator style={styles.ActivityIndicator} size="large" color="black" />
            <ModalActivityIndicator show={load} />
            :
              <ListOfResults onButtonClicked={onButtonClicked} navigation={navigation} listOfCities={listOfCities} error={error} />  
            }
            
        </View>

        
        </ScrollView>
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
        justifyContent:'center',
        // flexDirection:'column',
        // justifyContent:'flex-end',
    },
    input:{
        fontSize:20
    },
    CitiesBox:{
        flex:1,
        // marginTop:18,
        marginHorizontal: Dimensions.get('window').width*0.065,
        // backgroundColor:"blue",
        // display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
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
    }
    
   
  });