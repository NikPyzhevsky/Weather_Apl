import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';


import MyTabs from '../navigation/MainBottomTabs';
import DetailsScreen, { screenOptions } from '../screens/DetailScreen';

import { MyTheme } from '../Theme/Theme';
import {MyTransition} from "../navigation/NavigationOptions"




const Stack = createStackNavigator();

export default function AppNavigation() {
    return(
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
    )

 }