export const UDATE_CITY_BOXES = 'UDATE_CITY_BOXES';
export const UPDATE_SEARCH_RES = 'UPDATE_SEARCH_RES';
export const UPDATE_ERROR = 'UPDATE_ERROR';
export const UPDATE_LOAD = 'UPDATE_LOAD';
export const SET_TAB = 'SET_TAB';
export const UPDATE_BOX_NUM = 'UPDATE_BOX_NUM';


// export const UPDATE_CITY = 'REMOVE_FROM_CART';
import axios from 'axios'
import { Alert } from 'react-native';


const api = {
    key: 'ce956013a9e00a85e038ee708b911989',
    base: 'http://api.openweathermap.org/geo/1.0/direct?q=',
    weather: 'http://api.openweathermap.org/data/2.5/weather?'
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

 const updateCity = (Data) =>{
    return { type: UDATE_CITY_BOXES, CityData: Data };
 } 

export function UpdateCityBoxes() {
    return  (dispatch,getState) => {
      dispatch(updateLoad(true))
        let List = getState().Cities.justHardcodeList
        
            List.forEach(  (item)=>{
                FetchCity(item.name).then((data)=> {
                  item.temp = data.temp
                  item.weather = data.weather
                  // console.log(item)
                  dispatch(updateCity(item))
                })
              })
            
    }
    
}




export async function FetchCity(item){
            // console.log(item+"-----------------------time")
            let cityTemp = {};
                await axios.get(api.weather+"q="+item+"&appid="+api.key)
                .then(response => {
                    
                    cityTemp.name = response.data.name
                    cityTemp.weather = IconTrans(response.data.weather[0].main)
                    cityTemp.temp = (response.data.main.temp-273)^ 0
                
                    
                }).catch((error) => {
                  console.log("error", error+" "+cityTemp.name);
                
                  //  Alert.alert(
                  //   'Notification',
                  //   'Something went wrong with network!',
                  //   [{text: 'Okay' }]
                  // );
                })
                .finally(() =>{
                    // updateLoad(false)
                    // updateLoad(false)

                })

                // setTimeout(()=>setLoad(false),100)

                // console.log(cityTemp + "asyncF")
                return({...cityTemp})
}

export const FetchCitySearch =  (item) =>{

    return  async (dispatch)=>{
        dispatch(updateLoad(true))
        let cityTemp = {};
        await axios.get(api.weather+"q="+item+"&appid="+api.key)
        .then(response => {

            dispatch(setError(null))
            cityTemp.name = response.data.name
            cityTemp.weather = IconTrans(response.data.weather[0].main)
            cityTemp.temp = (response.data.main.temp-273)^ 0
            
        }).catch((error) => {
          console.log("error", error+" "+cityTemp.name);
          dispatch(setError(item))
          
        })
        .finally(() =>{
            setTimeout(()=>dispatch(updateLoad(false)),100)

        })

        dispatch(updateSearchRes([cityTemp]))
    }
    // console.log(item+"-----------------------time")
   
}

export const SetTab = (name) =>{
  console.log("we fuked them all"+name)

  return { type: SET_TAB, Name: name };
}

export const setError = (er)=>{
    return dispatch =>{
        dispatch(UpdateError(er))
    }
}

export const UpdateError = (er) =>{
    console.log("we fuked them all")
    return { type: UPDATE_ERROR, Error: er };
 } 

const clearTiming = (TimeoutID) =>{
    console.log(TimeoutID)
    if(TimeoutID!=null) clearTimeout(TimeoutID)     

  }

export const updateTiming = (TimeoutID) =>{
    return { type: UPDATE_TIMING, TimeoutID: TimeoutID };
 } 

 export const updateLoad = (load) =>{
   console.log("change Load to "+load)
    return { type: UPDATE_LOAD, Load: load };
 } 

 export const updateBoxNum = () =>{
  return { type: UPDATE_BOX_NUM};
} 

 
 export const updateSearchRes = (city) =>{
    return { type: UPDATE_SEARCH_RES, CityData: city };
 } 


