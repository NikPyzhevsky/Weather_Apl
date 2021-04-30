import React, { useEffect, useState } from "react";
import { Dimensions, Platform, RefreshControl, SafeAreaView, ScrollView, StyleSheet, View ,PanResponder, FlatList, ActivityIndicator } from 'react-native';
import CityBox from '../../components/CityBox';
import ListOfResults from '../../components/listOfResults';
import Input from '../../components/UI/Input';
import ModalActivityIndicator from '../../components/UI/ModalActivityIndicator';
import { useRef } from 'react';




const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default function CitiesContainer(props) {

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
  const{
      onChangeText,
      text,
      onInputCancel,
      load,
      refreshing,
      onRefresh,
      onButtonClicked,
      justHardcodeList,
      navigation,
      listOfCities,
      error
  } = props

  if(load)
    return(
      <SafeAreaView style={styles.droidSafeArea}>
      <View style={styles.ActivityIndicator}>
        <ActivityIndicator  size="large" color="black" />
      </View>
      </SafeAreaView>
    )
    
  return(
    <SafeAreaView style={styles.droidSafeArea}>
    <Input 
      onChangeText={onChangeText}
      value={text}
      cancel={onInputCancel}
      load={load}
      show={false}
    />
    <View style={styles.CitiesBox}>
      {
        (listOfCities.length==0&&error==null||text.trim()=="")?
        
        <FlatList
          data={justHardcodeList}
          keyExtractor={item => item.name + ''}
          numColumns={2}
          renderItem={itemData => { 
            return(<CityBox onButtonClicked={onButtonClicked} navigation={navigation} city={itemData.item} />)
          }}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      :
        <ListOfResults onButtonClicked={onButtonClicked} navigation={navigation} listOfCities={listOfCities} error={error} />  
      }
    </View>

    
    </SafeAreaView>
  )
  }


const styles = StyleSheet.create({
    container: {
      flex:1
    },
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 30 : 0,
        justifyContent:'center',
        backgroundColor:"white",
    },
    input:{
        fontSize:20
    },
    CitiesBox:{
        flex:1,
    },
    SearchRes:{
        fontSize:13
    },
    ActivityIndicator:{
      justifyContent:'center',
      alignItems:'center'
    }
  });