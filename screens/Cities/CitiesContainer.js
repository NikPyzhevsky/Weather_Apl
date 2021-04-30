import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import * as Cities from '../../store/actions/Cities';

import CitiesScreenView from './CitiesScreenView';





  export default function CitiesContainer({navigation}) {
    const [text, onChangeText] = React.useState("");
    const [refreshing, setRefreshing] = React.useState(false);
    const [TimeoutID, setTimeoutID] = React.useState(null)
    // const [error, setError] = React.useState(null);
    const [ButtonClicked,setActive] = useState(false)

    const ActualTab = useSelector(state => state.Cities.ActualScreen)
    const error = useSelector(state => state.Cities.Error)
    // console.log(error)
    const listOfCities = useSelector(state => state.Cities.SearchResult)
    const load = useSelector(state => state.Cities.Load)
    const justHardcodeList = useSelector(state => state.Cities.justHardcodeList);
    // console.log(justHardcodeList)
  const dispatch = useDispatch()


  const onButtonClicked = (name,temp,weather)=> {
    if(!ButtonClicked){
      setActive(true)
      let date = moment(new Date()).format('MMMM, Do h:mm a')
      setTimeout(()=>{setActive(false)}, 1000)
      // console.log(temp)
      navigation.navigate('Details', {options:{title:name},title:name,temp:temp,weather:weather,date:date})
  }
  }
  
      
    useEffect(() => {
      // let txt = text;
      if(text.trim()!==""){
        if(TimeoutID!=null) clearTimeout(TimeoutID) 
        let time = setTimeout( () => {dispatch(Cities.FetchCitySearch(text))}, 1000);
        setTimeoutID(time)
       }
       else {
         console.log(TimeoutID+text+"+++++++++++++++++++++++++++++++++++++++++++++++++++")
        if(TimeoutID!=null) clearTimeout(TimeoutID) 
       }
    },[text])

    


  const onRefresh = React.useCallback(() => {
    // setRefreshing(true);
    dispatch(Cities.updateLoad(true));
    console.log(true)
    // wait(2000).then(() => dispatch(Cities.updateLoad(false)));
    dispatch(Cities.UpdateCityBoxes())
    
  }, []);

  const  onInputCancel = ()=> {
    onChangeText("")
    // dispatch(Cities.setError(null))
    // dispatch(Cities.updateSearchRes([]))
    if(TimeoutID!=null) clearTimeout(TimeoutID)    
    
  }

  return (
    <CitiesScreenView
        onChangeText={onChangeText}
        text={text}
        onInputCancel={onInputCancel}
        load={load}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onButtonClicked={onButtonClicked}
        justHardcodeList={justHardcodeList}
        navigation={navigation}
        listOfCities={listOfCities}
        error={error}
    />
  );
}
