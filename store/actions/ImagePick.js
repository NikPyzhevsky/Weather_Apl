import { Platform } from 'react-native'
import RNFS from 'react-native-fs'


export const ADD_IMAGE = 'ADD_IMAGE'
export const LOAD_CONFIG = 'LOAD_CONFIG'


const CITY_FILE_NAME = '/Data.json'


export const addImage = (uri) =>{
     return async (dispatch,getState) =>{
      await dispatch(PickImage(uri))
      dispatch(saveConf())
    }
    // console.log(uri)
    
  }

const PickImage = (uri) =>{
  return{type:ADD_IMAGE, Uri:uri }
}

const loadConfig = (Data) =>{
  return{type:LOAD_CONFIG, tiles:Data }
}

export const readConfiguration =  () => {
  return async (dispatch, getState) => {
    const path = Platform.OS.toLowerCase() === 'android' ? RNFS.ExternalDirectoryPath + CITY_FILE_NAME: RNFS.DocumentDirectoryPath + CITY_FILE_NAME;

    // const a = await RNFS.readFile(path);
    
    const a = await RNFS.readFile(path);
    console.log(a)

    const JSONFormatted= JSON.parse(a)
    console.log(JSONFormatted.saveConfig)
    // const cityWeatherStr = await FileSystem.readAsStringAsync(filePath);

            
    // const { city, date, hourly } = JSON.parse(cityWeatherStr);

    dispatch(loadConfig(JSONFormatted.saveConfig))
    // console.log(lol)

  }
}

  const saveConf = ()=>{
    return async (dispatch, getState)=>{
      const saveConfig = getState().ImagePicker.tiles
    console.log('d');


      var RNFS = require('react-native-fs');
 var path = Platform.OS.toLowerCase() === 'android' ? RNFS.ExternalDirectoryPath + CITY_FILE_NAME: RNFS.DocumentDirectoryPath + CITY_FILE_NAME;

  
  // let exists =  await RNFS.exists(path);
  // if(exists){
  //   console.log('d');
  //   let a = await RNFS.readFile(path);
  //   let JSONFormatted = JSON.parse(a);
  //   if(new Date(JSONFormatted.current.dt*1000).getDate() == new Date(Date.now() - 86400000).getDate()){
  //     console.log("JSON___________")
  //     // console.log(JSONFormatted.hourly)
  //     // const Hourly = JSONFormatted.hourly;
  //     console.log("Write"+new Date(JSONFormatted).getDate())


  //     dispatch(setHourlyYesFile([...Hourly]))

  //   }
  //   // else{
  //   //   if((await Network.getNetworkStateAsync()).type!=="NONE"){
  //   //     // dispatch({ type: NERROR, errorState: false });

  //   //     let date = Math.floor((Date.now() - 86400000)/1000);
  //   //     console.log(date);
  //   //     const response = await fetch(
  //   //       `http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${date}&units=metric&appid=${api.key}`
  //   //     );
    
  //   //     if (!response.ok) {
  //   //       throw new Error("Something went wrong!");
  //   //     }
        
  //   //     const resData = await response.json();
        
  //   //     const Hourly = resData.hourly;
  //   //     const loadedYesterday = [];
  //   //     console.log(...Hourly)
  //   //     try{
  //   //       await RNFS.writeFile(path, JSON.stringify(resData));
  //   //       console.log('succes');  
  //   //     }
  //   //     catch(err){
  //   //       console.log(err);
  //   //     }
  //   //     dispatch(setHourlyYes([...Hourly]))
     
  //   //   }
  //   //   else{
  //   //     // dispatch({ type: NERROR, errorState: true});
  //   //   }
  //   // }
  // }
  // else{
    // if((await Network.getNetworkStateAsync()).type!=="NONE"){
      // dispatch({ type: NERROR, errorState: false });
      // let date = Math.floor((Date.now() - 86400000)/1000);
      // console.log(date);
      // const response = await fetch(
      //   `http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${date}&units=metric&appid=${api.key}`
      // );
  
   
      
      // const resData = await saveConfig.json();
      console.log(saveConfig)
      // const Hourly = resData.hourly;
      // const loadedYesterday = [];
      // console.log(Hourly)
      // console.log("________________________________________________________________")
      // dispatch(setHourlyYes([...Hourly]))
      try{
        await RNFS.writeFile(path, JSON.stringify({saveConfig}));
        let a = await RNFS.readFile(path);
        // let a = await FileSystem.readAsStringAsync(FileSystem.documentDirectory+'data.json');
       
        
      }
      catch(err){
        console.log(err);
      }
      // finally{
  
      // }
      // const dt = Hourly[0].dt*1000;
      // console.log(moment(dt).hours)
      // dispatch(setHourlyYes([...Hourly]))
    // }
    // else{
    //   // dispatch({ type: NERROR, errorState: true});
    // }
  }

    }
  