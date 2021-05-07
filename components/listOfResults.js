import { useLinkProps } from '@react-navigation/native';
import React from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import {  ScrollView } from 'react-native-gesture-handler';
import { MyTheme } from '../Theme/Theme';
import CityList from './CityList';
import IconErr from './UI/IconErr'

// import IconError from './UI/IconError'


export default function ListOfResults(props) {
    // 
      

      const ErrorBox = () =>(
        <View style={styles.ErrorBox}>
         <View style={{
           ...styles.circle,
           width:Dimensions.get('window').height*0.25 ,
           height:Dimensions.get('window').height*0.25,
           borderRadius: Dimensions.get('window').height*0.25 / 2,
           marginBottom: Dimensions.get('window').height*0.05
         }} >
          <IconErr 
            height={Dimensions.get('window').height*0.15}
            width={Dimensions.get('window').height*0.15}
            style ={styles.IconErr}
          />
         </View>
         <View style={styles.ErrorTitle}>
             <Text style={styles.ErrorTitle}>No data for <Text>{props.error}</Text></Text>
         </View>
        </View>
      )

    // console.log(props.listOfCities+"render")
    // console.log("error="+props.error);
        return(
          <View style={styles.container}>
            {props.error==null?

              <ScrollView style={{flex:1, paddingHorizontal:20, }}>
                <View style={styles.title}>
                  <Text /*style={styles.SearchRes}*/>Search results</Text>
                </View>
                {props.listOfCities.map((item, key)=>{
                  return(
                    <CityList 
                    onButtonClicked={props.onButtonClicked}
                      name={item.name} 
                      title={item.name}
                      key={key}
                      loadWeather={props.LoadWeather}
                      temp={item.temp}
                      weather={item.weather}
                      navigation={props.navigation}
                    />
                    
                  )
                })}
              </ScrollView>
            :
              <ErrorBox
              er={props.error}
              />
            }
          </View>
        )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display:'flex',
      height:'100%',
      // alignItems:'center',
      justifyContent:'center',
      // backgroundColor:'yellow'
    },
    item: {
      backgroundColor: '#f9c2ff',
      height: 100,
      justifyContent: 'center',
      // marginVertical: 8,
      // marginHorizontal: 16,
      // padding: 20,
    },
    title: {
      fontSize: 32,
    },
    ErrorBox:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      // marginTop: Dimensions.get('window').height*0.18,
      backgroundColor:'orange'
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
      
      backgroundColor: MyTheme.colors.border,
      // textAlign:'center',
      // textAlignVertical: "center",textAlign: "center",
      display:"flex",
      alignItems:"center",
      justifyContent:'center',
      // marginBottom:68,
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
      color:MyTheme.colors.primary
    },
    ErrorSubString:{
      // marginTop:18,
      fontSize:15,
      // marginBottom:34,
      color:MyTheme.colors.subText,
    },
    ErrorButton:{
      backgroundColor:MyTheme.colors.border,
      width:168,
      height:48,
      borderRadius:8,
      alignItems:'center',
      justifyContent:'center',
      color:MyTheme.colors.background,
    },
    ButtonTitle:{
      color:MyTheme.colors.text,
      fontSize:15
    }
  });