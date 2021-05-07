import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
    Alert, FlatList
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as LocalWeather from '../../../store/actions/LocalWeather';
import {
    Dimensions,
    StyleSheet,
    RefreshControl, SafeAreaView, Text, View
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import CityList from '../../../components/CityList';
import IconErr from '../../../components/UI/IconErr';
// import LocationPicker from '../components/LocationPicker';
import ModalActivityIndicator from '../../../components/UI/ModalActivityIndicator';
import moment from 'moment'
import { FAB } from 'react-native-paper';
import {Notifications } from 'react-native-notifications';
import { MyTheme } from '../../../Theme/Theme';
import { FloatingAction } from 'react-native-floating-action';
// import { mdiUpload } from '@mdi/js';



const actions = [
  {
    text: "Download and open file",
    icon: require("../Icons/open-file.png"),
    color:MyTheme.colors.border,
    name: "bt_load_file",
    position: 1,
    textColor: MyTheme.colors.text,
    textBackground: MyTheme.colors.border,
  },
];


export default function DailyContainer({navigation}) {

  const load = useSelector(state => state.LocalWeather.load)
  const dispatch = useDispatch()
  // 

  const [isFetching, setIsFetching] = useState(false);
  // const [pickedLocation, setPickedLocation] = useState(null);
  const Title = useSelector(state=> state.LocalWeather.Title)
  const Name = useSelector(state=> state.LocalWeather.CityName)
  const DailyList = useSelector(state=> state.LocalWeather.CityHourlyDataYes)
  const Error = useSelector(state=> state.LocalWeather.Error)


  const [ButtonClicked,setActive] = useState(false)
  const [refreshing, setRefreshing] = React.useState(false);




const LoadFile =  () =>{
  console.log( )
  Notifications.registerRemoteNotifications();

  dispatch(LocalWeather.downloadFile())
}


const onRefresh = React.useCallback(async () => {
  await dispatch(LocalWeather.getLocationHandler())
}, []);


const getLocationHandler = async () => {
  dispatch(LocalWeather.getLocationHandler())
};

const onButtonClicked = (name,temp,weather, data)=> {
  if(!ButtonClicked){
    setActive(true)
    setTimeout(()=>{setActive(false)}, 1000)
    // console.log(data+"______________________________________")
    navigation.navigate('Details', {options:{title:name},title:name,temp:temp,weather:weather,date:data})
}
}



React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', e => {
      // Prevent default behavior
      // e.preventDefault();
        console.log(Name+"))")
      dispatch(LocalWeather.setTitle(moment(Math.floor((Date.now() - 86400000))).format("MMMM Do")))

      // Do something manually
      // ...
    },[navigation]);

    return unsubscribe;
  }, [navigation]);

  const ButtonHandler = (action) => {
    switch(action){
        case "bt_load_file":
          LoadFile()
            
        return

        default: return
    }
}

  
  return(
    <SafeAreaView style={styles.droidSafeArea}>
      <ModalActivityIndicator show={isFetching||load} />
      {
        Error==false? 
          <View style={{flex:1, paddingHorizontal:20,}}>
        
      {DailyList.length>0? 
        <FlatList
          data={DailyList}
          keyExtractor={itemData => itemData.index}
          renderItem={itemData => { 
            // console.log("itemData FROM CONSOLE______________________________________")
            // console.log(itemData)
            return(
              <CityList 
                onButtonClicked={onButtonClicked}
                name={itemData.item.dt} 
                title={Title}
                key={itemData.index+itemData.item.dt}
                temp={itemData.item.temp}
                weather={itemData.item.weather[0].main}
                navigation={navigation}
              />
              )
          }}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      :
        <Text>None</Text>
      }
      <FloatingAction
        actions={actions}
        color={MyTheme.colors.border}
        onPressItem={name => {
            ButtonHandler(name);
        //   console.log(`selected button: ${name}`);
        }}
      />
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
        fab: {
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
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
          backgroundColor: MyTheme.colors.border,
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
          color:MyTheme.colors.text
        },
        ErrorSubString:{
          marginTop:18,
          fontSize:15,
          marginBottom:34,
          color:MyTheme.colors.subText,
        },
        ErrorButton:{
          backgroundColor:MyTheme.colors.border,
          width:168,
          height:48,
          borderRadius:8,
          alignItems:'center',
          justifyContent:'center',
        },
        ButtonTitle:{
          color:MyTheme.colors.primary,
          fontSize:15
        }
      
      
       
      });

      // DailyList.map((item, key)=>{
              
      //   return(
          
      //       <CityList 
      //     onButtonClicked={onButtonClicked}
      //       name={item.dt} 
      //       key={key+item.dt}
      //       title={Title}
      //       // loadWeather={props.LoadWeather}
      //       temp={item.temp}
      //       weather={item.weather[0].main}
      //       navigation={navigation}
      //     />
          
      
          
         
      //   )
      // })

