import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View,Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {} from "moment"


const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default function DetailsScreen({route, navigation}) {

  const [dimensions, setDimensions] = useState({ window, screen });

  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
  };

  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });
  // let data = new Date()
    let {title,temp,weather,date} = route.params
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,        backgroundColor:"white",    }}>
        <Text style={{
          fontSize:Dimensions.get('window').height*0.03,
          textAlign:'center',
          width:Dimensions.get('window').width*0.33,
          }} >
            {date}
          </Text> 
          <Feather style={styles.CityIcon} name={weather} size={Dimensions.get('window').height*0.138} color="black" />
          <Text style={{
            fontSize:Dimensions.get('window').height*0.03,
            marginTop:Dimensions.get('window').height*0.0058,
            // borderWidth:2,
            textAlign:'center'
          }}>
            {temp>0?"+"+temp:temp}C
          </Text>
      </View>
    );
  }

  export const screenOptions = navData => {
    return {
      headerTitle: navData.route.params.title,
      title: 'Centered',
      headerTitleAlign: 'center'
      // screenOptions{horizontalAnimation}
    };
  };

  
const styles = StyleSheet.create({
    container: {
      // backgroundColor:"#E5E5E5",
      backgroundColor:"white",

        flex: 1,
        alignContent:'center',
        justifyContent:'center',
    },
  CitiBoxName:{
    fontSize:Dimensions.get('window').height*0.03,
    textAlign:'center',
    width:Dimensions.get('window').width*0.33,
    // backgroundColor:"red"
  },
  CityIcon:{
     
      marginTop:Dimensions.get('window').height*0.0107,
      // borderWidth:2,
      textAlign:'center'
  },
  temperature:{
      fontSize:Dimensions.get('window').height*0.03,
      marginTop:Dimensions.get('window').height*0.0058,
      // borderWidth:2,
      textAlign:'center'
  },
    
   
  });