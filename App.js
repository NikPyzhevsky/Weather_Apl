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
	const [timer, setTimer] = useState(10000);
  
  
  
  const MyTransition = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: MyTheme.colors.background,
        primary:  MyTheme.colors.primary,
        card: MyTheme.colors.card,
        text: MyTheme.colors.text,
        border: MyTheme.colors.border,
        notification: MyTheme.colors.notification,
      },

    gestureDirection: 'horizontal',
    gestureResponseDistance: {
      horizontal: Dimensions.get('window').width
    },
    transitionSpec: {
      open: TransitionSpecs.TransitionIOSSpec,
      close: TransitionSpecs.TransitionIOSSpec,
    },
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    cardStyleInterpolator: ({ current, next, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
            {
              rotate: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: ["45deg", "0deg"],
              }),
            },
            {
              scale: next
                ? next.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1],
                  })
                : 1,
            },
          ],
        },
        containerStyle : {
          opacity: current.progress.interpolate({
            inputRange: [0, 0.5],
            outputRange: [0, 1],
          }),
        },
      };
    },
  };




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

// export default function App() {
//   return (
//     <NavigationContainer>
//       <MyTabs />
//     </NavigationContainer>
//   );
// }