import React from 'react' 
import {View, Text, StyleSheet, Button, Platform} from 'react-native'
import { Feather } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';

import {MyTheme} from '../Theme/Theme'



export default function CityList(props){
    let ButtonClicked = false
    let TouchableCmp = TouchableOpacity
    // console.log(props.weather)
    

    if(Platform.OS === 'android' && Platform.Version>=21)
    TouchableCmp = TouchableNativeFeedback;
    return(
        <TouchableCmp onPress={()=>props.onButtonClicked(props.title, props.temp, props.weather, props.name)} background={TouchableNativeFeedback.Ripple("black", false)}>
            <View style={styles.item}>
            <View style={styles.TextInfo}>
                <Text style={styles.title}>{props.name}</Text>
                <Text style={styles.temp}>{props.temp>0?"+"+props.temp:props.temp}C</Text>
            </View>
            <View style={styles.Icon}>
                <Feather style={styles.CityIcon} name={props.weather} size={38} color={MyTheme.colors.primary}/>
                {/* <Button
                    title="Go to Details"
                    onPress={() => }
                /> */}
            </View>
      
            </View>
        </TouchableCmp>
        
    )
}


const styles = StyleSheet.create({
    
    item: {
    //   backgroundColor: '#f9f9f7',
    //   opacity : 0.8,
    //   borderColor:"black",
    //   borderBottomWidth:1,
      height: 82,
      borderRadius:5,
      justifyContent: 'space-between',
      // marginVertical: 8,
      // marginHorizontal: 16,
      padding: 5,
      flexDirection:"row",
    //   flex:1,
    //   borderRadius:10
    },
    title: {
      fontSize: 20,
      marginBottom:10,
      color:MyTheme.colors.text
    },
    TextInfo:{
        flexDirection:'column',
        // justifyContent:'space-between',
        // backgroundColor:'red',
        color:MyTheme.colors.text
    },
    Icon:{
        // backgroundColor:"yellow",
        // flex:1,
        marginTop:10
    },
    temp:{
        color:MyTheme.colors.subText
    }
  });