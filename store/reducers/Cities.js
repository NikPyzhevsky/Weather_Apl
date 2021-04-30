import {UDATE_CITY_BOXES, UPDATE_ERROR,UPDATE_LOAD, UPDATE_SEARCH_RES, SET_TAB,UPDATE_BOX_NUM} from "../actions/Cities"

const initialState = {
    justHardcodeList:
        [
          {name:'Minsk', temp:0, weather:"sun", load:false},
          {name:'Gomel', temp:0, weather:"sun", load:false},
          {name:'Brest', temp:0, weather:"sun", load:false},
          {name:'Moscow', temp:0, weather:"sun", load:false},
          {name:'Mogilev', temp:0, weather:"sun", load:false},
          {name:'Grodno', temp:0, weather:"sun", load:false},
          {name:'Kiev', temp:0, weather:"sun", load:false},
          {name:'Chernihiv', temp:0, weather:"sun", load:false},
        ],
    UpdHardList:0 ,
    SearchResult:[],
    Error: null,
    Load:false,
    ActualScreen: "Cities",
  };


  export default (state = initialState, action) => {
    switch (action.type) {
      case UDATE_CITY_BOXES:
        //   console.log("worked______________________")
        let updateList = [...state.justHardcodeList]
        let Upd = state.UpdHardList
        updateList.forEach(item => {
            if(item.name===action.CityData.name) {
              console.log("_change"+item.name+" "+item.temp+"to"+action.CityData.name+" "+action.CityData.temp)
              item=action.CityData
              item.load = true
              Upd++
            }
        });
        let checkFetch = 0;
        let load = true;
      //   updateList.forEach(item => {
      //     if(item.load===action.CityData.load) {
      //       checkFetch++
      //     }
      // });
        console.log(Upd+"++++++")
        if(Upd==updateList.length) {load = false
        Upd=0;
        }
        return {
        ...state, justHardcodeList: [...updateList], Load:load, UpdHardList:Upd
        };
      case UPDATE_ERROR:
        return{
            ...state, Error:action.Error
        };
      case UPDATE_BOX_NUM:
        let UpdHard= state.UpdHardList + 1
        return{
            ...state, UpdHardList:UpdHard
        };
      case UPDATE_LOAD:
        // console.log("upd___"+action.Load)

        return{
            ...state, Load:action.Load
        };
      case UPDATE_SEARCH_RES:
          console.log(...action.CityData)
          return{
              ...state,SearchResult: [...action.CityData]
          }
      case SET_TAB:
        // console.log(action.Name)
        return{
          ...state, ActualScreen:action.Name
        }
          default:
            return state;
    }
  
    
  };