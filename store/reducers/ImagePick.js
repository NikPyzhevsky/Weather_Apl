import {ADD_IMAGE, LOAD_CONFIG} from "../actions/ImagePick"

const initialState = {
    tiles : [
      {
          id: 0,
          uri: 'https://art.pixilart.com/05b69d5a1d184f9.gif',
      },{
          id: 1,
          uri:   'https://art.pixilart.com/ee731822e4188fd.png',
      },{
          id: 2,
          uri:   'https://art.pixilart.com/c4b46b7996c02b7.png',
      },{
          id: 3,
          uri:   'https://art.pixilart.com/thumb/59d6e7d8adeb761.png',
      },{
          id: 4,
          uri: 'https://art.pixilart.com/thumb/526413cb2e0953d.png',
      },{
          id: 5,
          uri: 'https://art.pixilart.com/caec49633b0031a.gif',
      },
  ],

  };


  export default (state = initialState, action) => {
    switch (action.type) {
      case ADD_IMAGE:
        const temp = state.tiles.concat({id:state.tiles.length,uri:action.Uri});
        console.log(temp)
        // temp.push({id:NewTiles.length,uri:action.Uri})
        
        return{
            ...state, tiles:temp
        };
      case LOAD_CONFIG:
            // const temp = state.tiles.concat({id:state.tiles.length,uri:action.Uri});
            // console.log(temp)
            // temp.push({id:NewTiles.length,uri:action.Uri})
            console.log("REDUCER_TILES______________________________")
            console.log(action.tiles)
            return{
                ...state, tiles:action.tiles
            };
        default:
            return state;
    }
  
    
  };