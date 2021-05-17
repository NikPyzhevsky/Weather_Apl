import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
// import LocationPicker from './screens/components/LocationPicker';
import { Provider, useDispatch } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import AppNavigation from "./navigation/AppNavigations"

import Cities from './store/reducers/Cities';
import LocalWeather from './store/reducers/LocalWeather';
import ImagePick from "./store/reducers/ImagePick"




import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Notifications } from 'react-native-notifications';
import UserInactivity from 'react-native-user-inactivity';
import { StatusBar } from 'react-native';



const rootReducer = combineReducers({
  Cities: Cities,
  LocalWeather: LocalWeather,
  ImagePicker: ImagePick,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(ReduxThunk)
    // ИМЕННО ПОЭТОМУ ОНО И НЕ РАБОТАЛО
  )
);



export default function App() {
  
// const dispatch = useDispatch()
const [active, setActive] = useState(true);
	const [timer, setTimer] = useState(60000);
  
  

  return (

        <Provider store={store}>
                <StatusBar hidden/>

          {active ? (
				<UserInactivity
					isActive={active}
					timeForInactivity={timer}
					onAction={(isActive) => {
						setActive(isActive);
						console.log("s");
					}}
					skipKeyboard={false}
					style={{ flex: 1 }}
				>
          <AppNavigation/>
				</UserInactivity>
			) : (
				<View style={styles.InactivityContainer}>
					<Text style={{color:"yellow", fontSize:20}}>You have been innactive for minute</Text>
					<Text style={{color:"yellow", fontSize:20}}>Please restart the app</Text>
				</View>
			)}
          
      
    
    </Provider>
      
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Logo:{
    width:215,
    height:140,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth:2,
    borderRadius: 5,
    
  },
  LogoText:{
    fontSize: 20
  },
  AppName:{
    alignItems:'center',
    fontSize:28
  },
  InactivityContainer:{
    flex: 1,
		backgroundColor: "red",
		alignItems: "center",
		justifyContent: "center",
  }
});