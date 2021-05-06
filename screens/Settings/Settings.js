import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { useDispatch, useSelector } from 'react-redux';
import { MyTheme } from '../../Theme/Theme';
import { FAB } from 'react-native-paper';
import { FloatingAction } from "react-native-floating-action";
import * as ImagePick from '../../store/actions/ImagePick';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Icon } from 'react-native-elements';

const actions = [
    {
      text: "Take a photo",
      icon: require("./Icons/camera.png"),
      name: "bt_cam",
      position: 2,
      color:MyTheme.colors.border,
      textColor: MyTheme.colors.text,
      textBackground: MyTheme.colors.border,
    //   overlayColor: 'rgba(255, 255, 255, 0.6)',  
    },
    {
      text: "Load from gallery",
      icon: require("./Icons/gallery.png"),
      color:MyTheme.colors.border,
      name: "bt_galley_load",
      position: 1,
      textColor: MyTheme.colors.text,
      textBackground: MyTheme.colors.border,
    },
    // {
    //   text: "Location",
    //   icon: require("./images/ic_room_white.png"),
    //   name: "bt_room",
    //   position: 3
    // },
    // {
    //   text: "Video",
    //   icon: require("./images/ic_videocam_white.png"),
    //   name: "bt_videocam",
    //   position: 4
    // }
  ];


const window = Dimensions.get("window");
const width =  Dimensions.get("window").width> Dimensions.get("window").height?  Dimensions.get("window").height: Dimensions.get("window").width
const Carousel = () => {

  const xScroll = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch()
  
    const images = useSelector(state=> state.ImagePicker.tiles)

    const readConf = () =>{
      dispatch(ImagePick.readConfiguration())
    }

    useEffect(() => {
    
      // dispatch(LocalWeather.getLocationHandler())
      // dispatch(ImagePick.addImage("https://art.pixilart.com/05b69d5a1d184f9.gif"));
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            // console.log(status)
            if (status !== 'granted') {
              Alert('Sorry, we need camera roll permissions to make this work!');
            }
            const statusCam = await ImagePicker.requestCameraPermissionsAsync();
            // console.log(statusCam)
            if (statusCam.status !== 'granted') {
                Alert('Sorry, we need camera roll permissions to make this work!');
              }
          }
        })();

        readConf()
      }, []);

    const ButtonHandler = (action) => {
        switch(action){
            case "bt_cam":
                (async () =>{
                    let image = await ImagePicker.launchCameraAsync().catch(error => console.log({ error }));
                    // console.log(image);
                    dispatch(ImagePick.addImage(image.uri));
                })()
                
            return
            case "bt_galley_load":
                pickImage()
            return

            default: return
        }
    }

    const pickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

    console.log(result);

    if (!result.cancelled) {
      dispatch(ImagePick.addImage(result.uri));
   
    }

      // dispatch(ImagePick.addImage('https://art.pixilart.com/thumb/526413cb2e0953d.png'));

  };

  return (
    <View style={style.container}>
      <Animated.FlatList
        style={style.flatList}
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate={'fast'}
        keyExtractor={(_, index) => index.toString()}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: xScroll}}}],
          {useNativeDriver: true},
        )}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const outputRange = ['-90deg', '0deg', '90deg'];

          const translateX = xScroll.interpolate({inputRange, outputRange});

          return (
            <View style={{...style.imageContainer},{
                    width:width, 
                    height:  width - 150,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // borderColor:"red",
                    // borderWidth:2,
                  }
              }>
              <Animated.Image
                style={[{...style.image},
                  {
                  
                  height: width - 150,
                  width: width - 150,
                  borderRadius: width/2,
                  },
                   {transform: [{rotateZ: translateX}]}]}
                source={{uri: item.uri}}
              />
            </View>
          );
        }}
      />
      <FloatingAction
    actions={actions}
    color={MyTheme.colors.border}
    onPressItem={name => {
        ButtonHandler(name);
    //   console.log(`selected button: ${name}`);
    }}
  />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {flexGrow: 0},
  imageContainer: {
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    
    resizeMode: 'cover',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor:MyTheme.colors.border,
  },
  fabPick: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 30,
    backgroundColor:MyTheme.colors.border,
  },
});

export default Carousel;