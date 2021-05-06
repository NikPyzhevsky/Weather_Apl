import moment from 'moment';
import React, { useState } from 'react';
import {
  Animated, Dimensions, FlatList, SafeAreaView, StyleSheet,
  Text, View
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import CityList from '../../../components/CityList';
import IconErr from '../../../components/UI/IconErr';
// import LocationPicker from '../components/LocationPicker';
import ModalActivityIndicator from '../../../components/UI/ModalActivityIndicator';
import * as LocalWeather from '../../../store/actions/LocalWeather';

import WalletCard from "../../../components/UI/card";
import { MyTheme } from '../../../Theme/Theme';


const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);





export default function DailyContainer({navigation}) {

  const load = useSelector(state => state.LocalWeather.load)
  const dispatch = useDispatch()
  // 

  const [isFetching, setIsFetching] = useState(false);

  const Title = useSelector(state=> state.LocalWeather.Title)
  const Name = useSelector(state=> state.LocalWeather.CityName)
  const DailyList = useSelector(state=> state.LocalWeather.CityHourlyData)
  const Error = useSelector(state=> state.LocalWeather.Error)


  const [ButtonClicked,setActive] = useState(false)
  const [refreshing, setRefreshing] = React.useState(false);




const wait = (timeout) => {
  // console.log(listOfCities)
  return new Promise(resolve => setTimeout(resolve, timeout));
}
  
  const onRefresh =  React.useCallback( async() => {
    await dispatch(LocalWeather.getLocationHandler())
                  // dispatch(LocalWeather.updateLoad(true))
                  // wait(200).then(()=>dispatch(LocalWeather.updateLoad(false)))
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

      dispatch(LocalWeather.setTitle(moment(new Date()).format("MMMM Do")))
      // Do something manually
      // ...
    },[navigation]);

    return unsubscribe;
  }, [navigation]);

  




// const y = new Animated.Value(0);
//   const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
//     useNativeDriver: true,
//   });

  return(
    <SafeAreaView style={styles.droidSafeArea}>
            <ModalActivityIndicator show={isFetching||load} />
            {
              Error==false? 
                <View style={{flex:1, paddingHorizontal:20}}>
                  {/* <AnimatedFlatList
                    scrollEventThrottle={16}
                    bounces={false}
                    data={DailyList}
                  
                    renderItem={({ index, item: { type } }) => (
                      <WalletCard {...{ index, y, type }} />
                    )}
                    keyExtractor={(item) => item.type}
                    {...{ onScroll }}
                  /> */}
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
            // backgroundColor:"gray",
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

