import {GET_LOCATION,SET_IS_FETCHING, SET_DATA, SET_NAME, SET_ERROR,SET_DATA_HOURLY,SET_PERMISION,SET_LOAD,SET_YESTERDAY_WEATHER,SET_YESTERDAY_DATE,SET_TITLE} from "../actions/LocalWeather"

const initialState = {
    lat:0,
    lng:0,
    CityData:[],
    isFetching:false,
    CityName:"",
    Error:false,
    CityHourlyData:[],
    CityHourlyDataYes:[],
    Permission: false,
    load:false,
    YesterdayDate:"",
    Title:"",
  };


  export default (state = initialState, action) => {
    switch (action.type) {
        case GET_LOCATION:
            return{
                ...state, lng: action.lng, lat:action.lat
            }
        case SET_TITLE:
            console.log(action.Title+"+++")
            return{
                ...state, Title:action.Title
            }
        case SET_IS_FETCHING:
            return{
                ...state, isFetching : action.status
            }
        case SET_DATA:
            action.list.forEach(  (item)=>{
                // console.log(item)
              })
            return{
                ...state, CityData:[...action.list ]
            }
        case SET_NAME:
            return{
                ...state, CityName: action.name
            }
        case SET_ERROR:
            return{
                ...state, Error:action.Error
            }
        case SET_DATA_HOURLY:
            // console.log("HOURLY_____")
            // action.HourlyList.forEach(  (item)=>{
            //     console.log(item)
            //   })
            return{
                ...state, CityHourlyData:[...action.HourlyList]
            }
        case SET_LOAD:
            return{
                ...state, load:action.Load
            }
        case SET_YESTERDAY_WEATHER:
                        console.log("HOURLY_____YES___________")

            console.log(action.DailyListYes[0])
            return{
                ...state, CityHourlyDataYes:[...action.DailyListYes]
            }
        case SET_YESTERDAY_DATE:
            return{
                ...state, YesterdayDate:[...action.date]
            }
          default:
            return state;
    }
  
    
  };