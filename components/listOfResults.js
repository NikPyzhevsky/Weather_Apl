import { useLinkProps } from '@react-navigation/native';
import React from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import {  ScrollView } from 'react-native-gesture-handler';
import CityList from './CityList';
import IconErr from './UI/IconErr'

// import IconError from './UI/IconError'


export default function ListOfResults(props) {
    // 
      

      const ErrorBox = () =>(
        <View style={styles.ErrorBox}>
         <View style={styles.circle} >
          <IconErr 
            height={100}
            width={100}
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
      padding: 20,
    },
    title: {
      fontSize: 32,
    },
    ErrorBox:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      // marginTop: Dimensions.get('window').height*0.18,
      // backgroundColor:'orange'
    },
    circle: {
      width:200,
      height:200,
      borderRadius: 200 / 2,
      backgroundColor: "#ececec",
      // textAlign:'center',
      // textAlignVertical: "center",textAlign: "center",
      display:"flex",
      alignItems:"center",
      justifyContent:'center',
      marginBottom:40,
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
    }
  });