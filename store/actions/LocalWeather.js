export const GET_LOCATION = 'GET_LOCATION';
export const SET_DATA = 'SET_DATA';
export const SET_IS_FETCHING = 'SET_IS_FETCHING'
export const SET_NAME = 'SET_NAME'
export const SET_ERROR = 'SET_ERROR'
export const SET_LOAD = 'SET_LOAD'
export const SET_DATA_HOURLY = 'SET_DATA_HOURLY'
export const SET_YESTERDAY_DATE = 'SET_YESTERDAY_DATE'
export const SET_DATE = 'SET_DATE'
export const SET_YESTERDAY_WEATHER = 'GET_YESTERDAY'
export const SET_TITLE = 'SET_TITLE'



const CITY_FILE_NAME = '/Date.json'



import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as Network from 'expo-network'
import * as FileSystem from 'expo-file-system';
import {
    Alert,
  } from 'react-native';
import moment from 'moment'
// export const UPDATE_CITY = 'REMOVE_FROM_CART';
import axios from 'axios'
import FileViewer from 'react-native-file-viewer';
import { Notifications } from "react-native-notifications";



const api = {
    key: 'ce956013a9e00a85e038ee708b911989',
    base: 'https://api.openweathermap.org/data/2.5/weather?',
    weather: 'https://api.openweathermap.org/data/2.5/onecall?',
    Yesterday:'http://api.openweathermap.org/data/2.5/onecall/timemachine?'
  }
  
  const IconTrans = (IconName) => {
    switch(IconName){
      case "Clear":
        return("sun");
      case "Clouds":
        return("cloud");
      case "Drizzle":
        return("cloud-drizzle");
      case "Rain":
        return("cloud-rain");
      case "Thunderstorm":
        return("cloud-lightning");
      case "Snow":
        return("cloud-snow");
      case "Mist":
        return("wind");
      case "Smoke":
        return("wind");
      case "Haze":
        return("wind");
      case "Dust":
        return("wind");
      case "Fog":
        return("wind");
      case "Sand":
        return("wind");
      case "Haze":
        return("wind");
      case "Ash":
        return("wind");
      case "Squall":
        return("wind");
      case "Tornado":
        return("wind");
        
    }
  }

  export const setPickedLocation = (lat,lng) => {
      return{
        type:"GET_LOCATION", lat:lat, lng:lng
      }
  }


  export const convertDateFromUTC = utcDate => {
    return new Date(utcDate * 1000);
}

export const toTempFormatter = kelvinTemp => {
    let temp = (kelvinTemp - 272.1).toFixed(0);
    if (temp > 0) {
        temp = '+ ' + temp;
    } else if (temp < 0) {
        temp = '- ' + temp;
    }
    return temp;
}


export const toTimeFormat = (hours, minutes) => {
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
}

export const eqDate = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() && 
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
}

export const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

export const dayFormatter = day => {
    const ends = day % 10;
    switch (ends) {
        case 1:
            return day + 'st';
        case 2:
            return day + 'nd';
        case 3:
            return day + 'rd';
        default:
            return day + 'th';
    }
}
  // export const verifyPermissions =  () => {
  //    return async ()=>{
  //       const result = await Permissions.askAsync(Permissions.LOCATION);
  //       if (result.status !== 'granted') {
  //         Alert.alert(
  //           'Insufficient permissions!',
  //           'You need to grant location permissions to use this app.',
  //           [{ text: 'Okay' }]
  //         );
  //         return false;
  //       }
  //       return true;
  //     }
  // };

  // export const getLocationHandler = () =>{
  //     return async (dispatch) => {
  //       const hasPermission = await dispatch(verifyPermissions());
  //       if (!hasPermission) {
  //         return;
  //       }
    
  //       try {
  //         dispatch(setIsFetching(true)) ;
  //         const location = await Location.getCurrentPositionAsync({
  //           timeout: 5000
  //         });
  //           dispatch(LocalWeather.setPickedLocation(location.coords.latitude,location.coords.longitude))
  //         // setPickedLocation({
  //         //   lat: location.coords.latitude,
  //         //   lng: location.coords.longitude
  //         // });
  //       } catch (err) {
  //         Alert.alert(
  //           'Could not fetch location!',
  //           'Please try again later or pick a location on the map.',
  //           [{ text: 'Okay' }]
  //         );
  //       }
  //       dispatch(setIsFetching(false));
  //     };
  // } 

  export const setIsFetching = (st) => {
      return{
          type:SET_IS_FETCHING,status:st
      }
  }

  export const FetchCitySearch =  (lat,lon) =>{

    return  async (dispatch, getState)=>{
        dispatch(setIsFetching(true))
        await axios.get(api.weather+"lat="+lat+"&lon="+lon+"&exclude=current,minutely,alerts"+"&appid="+api.key)
        .then(response => {
            // cityTemp.name = response.data.name
            // cityTemp.weather = IconTrans(response.data.weather[0].main)
            // cityTemp.temp = (response.data.main.temp-273)^ 0
            // console.log(response.data.daily)
            dispatch(setList(response.data.daily))
            dispatch(setHourly(response.data.hourly))
        }).catch((error) => {
          console.log("error", error);
        //   dispatch(setError(item))
          
        })
        .finally(() =>{
        })
        dispatch(setIsFetching(false))
    }
   
}

export const FetchCityName =  (lat,lon) =>{

    return  async (dispatch, getState)=>{
        // const lat = getState().lat
        // const lon = getState().lon
        console.log(lat+" "+lon)
        dispatch(setIsFetching(true))
        await axios.get(api.base+"lat="+lat+"&lon="+lon+"&appid="+api.key)
        // await axios.get("http://api.openweathermap.org/data/2.5/weather?lat=52.4373254&lon=31.0036631&appid=ce956013a9e00a85e038ee708b911989")
        .then(response => {
            // console.log(response.data)
            dispatch(setName(response.data.name))
            dispatch(setTitle(moment(new Date()).format("MMMM Do")))
        }).catch((error) => {
          console.log("error", error);
        //   dispatch(setError(item))
          
        })
        .finally(() =>{
        })
        dispatch(setIsFetching(false))
    }
   
}

const  setList= (List) =>{
    List.forEach(  (item)=>{
        item.weather[0].main = IconTrans(item.weather[0].main)
        item.temp.eve = (item.temp.eve-273)^0
        item.dt =  moment(new Date(item.dt*1000)).format("MMMM Do");
      })
    return{type:SET_DATA, list:List }
}



const  setHourly= (List) =>{
  List.forEach(  (item)=>{
      item.weather[0].main = IconTrans(item.weather[0].main)
      item.temp= (item.temp-273)^0
      item.dt =  moment(new Date(item.dt*1000)).format("LT");
    })
  return{type:SET_DATA_HOURLY, list:List }
}

const  setHourlyYes= (List) =>{
  List.forEach(  (item)=>{
      item.weather[0].main = IconTrans(item.weather[0].main)
      item.temp= item.temp
      item.dt =  moment(new Date(item.dt*1000)).format("LT");
    })
  return{type:SET_YESTERDAY_WEATHER, list:List }
}

const  setHourlyYesyerday= (List) =>{
  List.forEach(  (item)=>{
      item.weather[0].main = IconTrans(item.weather[0].main)
      item.temp= item.temp
      item.dt =  moment(new Date(item.dt*1000)).format("LT");
    })
  return{type:SET_YESTERDAY_WEATHER, list:List }
}

const  setHourlyYesFile= (List) =>{
  List.forEach(  (item)=>{
    item.weather[0].main = IconTrans(item.weather[0].main)
    item.temp= item.temp
    item.dt =  moment(new Date(item.dt*1000)).format("LT");
  })
  
  return{type:SET_YESTERDAY_WEATHER, list:List }
}


const getCurrentTimeFromStamp = (timestamp) => {
    var d = new Date(timestamp*1000);
    timeStampCon = d.getDate() + '/' + (d.getMonth()) + '/' + d.getFullYear() + " " + d.getHours() + ':' + d.getMinutes();

    return timeStampCon;
};

const  setName= (name) =>{
  return{type:SET_NAME, name:name }
}
// export const  setTitle= (name) =>{
//   let nameTit = getState().LocalWeather.name
//   return{type:SET_TITLE, Title:nameTit+name }
// }

export const  setTitle= (name) =>{
 
  return  (dispatch,getState) => {
    let nameTit = getState().LocalWeather.CityName
    console.log(nameTit+" - "+name)
    dispatch(setTitl(nameTit+" - "+name))
    // return{type:SET_TITLE, Title:nameTit+" - "+name }
}
}

export const  setTitl= (name) =>{
    return{type:SET_TITLE, Title:name }
  }

const  setYesderdayDate= (state) =>{
  return{type:SET_YESTERDAY_DATE, date:state }
}

export const setErr = (Er) => {
return{type:SET_ERROR, Error:Er}
}

export const updateLoad = (load) => {
  return{type:SET_LOAD, Load:load}
  }



//   export const getYesterdayWeather = () => {
//     return async (dispatch, getState) => {
//         const lon = getState().LocalWeather.lng
//         const lat = getState().LocalWeather.lat
  
//         const CityName = getState().LocalWeather.CityName;
//         const currentDate = new Date();
//         console.log(lon+""+lat+":"+CityName+"date"+currentDate)

//         const filePath = FileSystem.documentDirectory + CITY_FILE_NAME;
//         const dirInfo = await FileSystem.getInfoAsync(filePath);

//         if (dirInfo.exists) {
//             const cityWeatherStr = await FileSystem.readAsStringAsync(filePath);

            
//             const { city, date, hourly } = JSON.parse(cityWeatherStr);
            
//             const prevDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1);
//             console.log("read"+JSON.parse(cityWeatherStr))
//             console.log(date)
//             console.log(prevDate.toISOString())
//             console.log(eqDate(new Date(date), prevDate))
//             if (CityName === city && eqDate(new Date(date), prevDate)) {
//               setHourlyYes(hourly)
              
//                 return;
//             }
//         }
//         const yesterdayDt = Math.floor((Date.now() - 86400000)/1000);
//         const response = await fetch(`${api.Yesterday}lat=${lat}&lon=${lon}&dt=${yesterdayDt}&appid=${api.key}`);
//         if (!response.ok) {
//             throw new Error("Can't fetch weather data on loaction");
//         }
//         console.log('fetch');

//         const { hourly } = await response.json();
//         console.log(hourly)
//         const prevDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1);
//         FileSystem.writeAsStringAsync(filePath, JSON.stringify({
//             date: prevDate.toISOString(),
//             city: CityName,
//             hourly
//         }));
//         console.log('write');
//         setHourlyYes(hourly)
//         // dispatch({
//         //     type: SET_YESTERDAY_WEATHER,
//         //     payload: hourly
//         // })
//     }
// }



export const openFile = () => {
  return async (dispatch, getState) => {
    console.log("start")
    var RNFS = require('react-native-fs');
    var path = Platform.OS.toLowerCase() === 'android' ? RNFS.ExternalDirectoryPath + CITY_FILE_NAME : RNFS.DocumentDirectoryPath + CITY_FILE_NAME;
    
    let exists =  await RNFS.exists(path);
    
    if (exists) {
		FileViewer.open(path, {
			showOpenWithDialog: true,
			showAppsSuggestions: true,
		}).then(() => {
			console.log("succesfully opened");
			console.log(path);
		});
	}
      else{
        alert('Error')
      }
  }
}

export const downloadFile = () => {
  return async (dispatch, getState) => {
	// var RNFS = require("react-native-fs");

	// var path = RNFS.DocumentDirectoryPath + CITY_FILE_NAME;
	// let toFile = RNFS.DownloadDirectoryPath + CITY_FILE_NAME;
	// console.log(path);
	// RNFS.copyFile(path, toFile).then(
  //   console.log("cop[y")
    	Notifications.postLocalNotification({
			body: "File with yesterday forecast succesfully donwloaded",
			title: "File Downloaded",
			sound: "chime.aiff",
			category: "SOME_CATEGORY",
			link: "localNotificationLink",
			fireDate: new Date(),
		})
	// );
}
};


export const getYesterday = (lat, lon) => {
return async (dispatch, getState) => {


 var RNFS = require('react-native-fs');
 var path = Platform.OS.toLowerCase() === 'android' ? RNFS.ExternalDirectoryPath + CITY_FILE_NAME: RNFS.DocumentDirectoryPath + CITY_FILE_NAME;

  
  let exists =  await RNFS.exists(path);
  if(exists){
    console.log('d');
    let a = await RNFS.readFile(path);
    let JSONFormatted = JSON.parse(a);
    if(new Date(JSONFormatted.current.dt*1000).getDate() == new Date(Date.now() - 86400000).getDate()){
      
      const Hourly = JSONFormatted.hourly;
      console.log("Write"+new Date(JSONFormatted.current.dt*1000).getDate())

      console.log(Hourly[0])
      dispatch(setHourlyYesFile([...Hourly]))

    }
    else{
      if((await Network.getNetworkStateAsync()).type!=="NONE"){
        // dispatch({ type: NERROR, errorState: false });

        let date = Math.floor((Date.now() - 86400000)/1000);
        console.log(date);
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${date}&units=metric&appid=${api.key}`
        );
    
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        
        const resData = await response.json();
        
        const Hourly = resData.hourly;
        const loadedYesterday = [];

        try{
          await RNFS.writeFile(path, JSON.stringify(resData));
          console.log('succes');  
        }
        catch(err){
          console.log(err);
        }
        dispatch(setHourlyYes([...Hourly]))
     
      }
      else{
        // dispatch({ type: NERROR, errorState: true});
      }
    }
  }
  else{
    if((await Network.getNetworkStateAsync()).type!=="NONE"){
      // dispatch({ type: NERROR, errorState: false });
      let date = Math.floor((Date.now() - 86400000)/1000);
      console.log(date);
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${date}&units=metric&appid=${api.key}`
      );
  
   
      
      const resData = await response.json();
      
      const Hourly = resData.hourly;
      const loadedYesterday = [];
      console.log(Hourly)
      console.log("________________________________________________________________")
      // dispatch(setHourlyYes([...Hourly]))
      try{
        await RNFS.writeFile(path, JSON.stringify(resData));
        let a = await RNFS.readFile(path);
        // let a = await FileSystem.readAsStringAsync(FileSystem.documentDirectory+'data.json');
       
        
      }
      catch(err){
        console.log(err);
      }
      finally{
  
      }
      const dt = Hourly[0].dt*1000;
      console.log(moment(dt).hours)
      dispatch(setHourlyYes([...Hourly]))
    }
    else{
      // dispatch({ type: NERROR, errorState: true});
    }
  }

};
}







const verifyPermissions = async () => {
  const result = await Location.requestForegroundPermissionsAsync();
  if (result.status !== 'granted') {
    Alert.alert(
      'Insufficient permissions!',
      'You need to grant location permissions to use this app.',
      [{ text: 'Okay' }]
    );
    return false;
  }
  return true;
};

export const getLocationHandler =() => {
  return  async (dispatch, getState)=>{
    const hasPermission = await verifyPermissions();
    console.log(hasPermission+"_______")
  if (!hasPermission) {
    dispatch(setErr(true))
    dispatch(setIsFetching(false));
    // setIsFetching(false);
    return;
  }
  try {
    dispatch(setIsFetching(true));
    const location = await Location.getCurrentPositionAsync({
      timeout: 5000
    });
      dispatch(setPickedLocation(location.coords.latitude,location.coords.longitude))
    // setPickedLocation({
    //   lat: location.coords.latitude,
    //   lng: location.coords.longitude
    // });
    dispatch(setErr(false))
  } catch (err) {
    Alert.alert(
      'Could not fetch location!',
      'Please try again later or pick a location on the map.',
      [{ text: 'Okay' }]
    );
    dispatch(setErr(true))
  }
  finally{
  //   dispatch(FetchCityName(getState().lat,getState().lng))
  //  dispatch(FetchCitySearch(getState().lat,getState().lng))
  }
  dispatch(setIsFetching(false));
  // 
  }
  
};


