import React from 'react';
import {
    Dimensions,
    StyleSheet,
    RefreshControl, SafeAreaView, Text, View
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import CityList from '../../components/CityList';
import IconErr from '../../components/UI/IconErr';
// import LocationPicker from '../components/LocationPicker';
import ModalActivityIndicator from '../../components/UI/ModalActivityIndicator';





export default function HourlyView(props) {
  

const {
    Title,
    refreshing,
    onRefresh,
    DailyList,
    onButtonClicked,
    navigation,
    getLocationHandler,
    Error,
    isFetching,
    load,
} = props
DailyList.map((item, key)=>{
    console.log(item.temp+"_______")
})
return(
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
                            temp={item.temp}
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
        backgroundColor:"white",

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