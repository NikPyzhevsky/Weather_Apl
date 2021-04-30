import React, { useState } from 'react';
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {MyTheme} from '../../Theme/Theme'
import { useDispatch, useSelector } from 'react-redux';

import * as LocalWeather from '../../store/actions/LocalWeather';
const LocationPicker = props => {
  const [isFetching, setIsFetching] = useState(false);
  // const [pickedLocation, setPickedLocation] = useState(null);
  const dispatch = useDispatch()
  const lat = useSelector(state=> state.LocalWeather.lat)
  const lng = useSelector(state=> state.LocalWeather.lng)
  // const isFetching = useSelector(state=> state.LocalWeather.isFetching)

  // dispatch(LocalWeather.verifyPermissions())
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
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

  const getLocationHandler = async () => {
    const hasPermission = await dispatch(LocalWeather.verifyPermissions());
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000
      });
        dispatch(LocalWeather.setPickedLocation(location.coords.latitude,location.coords.longitude))
      // setPickedLocation({
      //   lat: location.coords.latitude,
      //   lng: location.coords.longitude
      // });
    } catch (err) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map.',
        [{ text: 'Okay' }]
      );
    }
    setIsFetching(false);
  };

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        {isFetching ? (
          <ActivityIndicator size="large" color={MyTheme.primary} />
        ) : (
          <Text>{lat==0||lng==0? "Not Load":lat+" "+lng}</Text>
        )}
      </View>
      <Button
        title="Get User Location"
        color={MyTheme.primary}
        onPress={()=>getLocationHandler()}
      />
      <Button
        title="Get User Location"
        color={MyTheme.primary}
        onPress={()=>dispatch(LocalWeather.verifyPermissions())}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default LocationPicker;
