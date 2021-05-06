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

    const exists =  await RNFS.exists(path);
    if(exists){

      const a = await RNFS.readFile(path);
      const JSONFormatted= JSON.parse(a)
  
     
  
      dispatch(loadConfig(JSONFormatted.saveConfig))
    }    

   


  }
}

  const saveConf = ()=>{
    return async (dispatch, getState)=>{
      const saveConfig = getState().ImagePicker.tiles
      console.log('d');


      var RNFS = require('react-native-fs');
      var path = Platform.OS.toLowerCase() === 'android' ? RNFS.ExternalDirectoryPath + CITY_FILE_NAME: RNFS.DocumentDirectoryPath + CITY_FILE_NAME;
      
      try{
        await RNFS.writeFile(path, JSON.stringify({saveConfig}));
        let a = await RNFS.readFile(path);

      }
      catch(err){
        console.log(err);
      }

  }

    }
  