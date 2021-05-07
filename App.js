import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
// import LocationPicker from './screens/components/LocationPicker';
import { Provider, useDispatch } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';

import Cities from './store/reducers/Cities';
import LocalWeather from './store/reducers/LocalWeather';
import ImagePick from "./store/reducers/ImagePick"


import MyTabs from './navigation/MainBottomTabs';
import DetailsScreen, { screenOptions } from './screens/DetailScreen';

import { MyTheme } from './Theme/Theme';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Notifications } from 'react-native-notifications';
import UserInactivity from 'react-native-user-inactivity';
import {MyTransition} from "./navigation/NavigationOptions"


const Stack = createStackNavigator();

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
          <NavigationContainer theme={MyTheme} transitionerStyle={{backgroundColor: 'black'}}>
     
              <Stack.Navigator
              
                detachInactiveScreens={true}
                screenOptions={{
                  headerTransparent: true,
                  cardOverlayEnabled: true,
                  gestureEnabled: true,
                  headerStyle:{backgroundColor:MyTheme.colors.background},
                  // gestureDirection: "inverted",
                  ...MyTransition,
                }}
                
                
              >
              <Stack.Screen name="Home" component={MyTabs} options={{headerShown:null}}/>
              <Stack.Screen name="Details" component={DetailsScreen} options={screenOptions} />
              {/* <Stack.Screen name="Cities" component={CitiesScreen}/> */}
            </Stack.Navigator>
          </NavigationContainer>
				</UserInactivity>
			) : (
				<View style={styles.InactivityContainer}>
					<Text>You have been innactive for minute</Text>
					<Text>Please restart the app</Text>
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