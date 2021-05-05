import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { MARGIN } from "./Config";
import Tile from "./Tile";
import SortableList from "./SortableList";
import { MyTheme } from "../../Theme/Theme";
import { Image , StyleSheet} from "react-native";
import { FAB } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from "react-redux";

import * as ImagePick from '../../store/actions/ImagePick';


const tiles = [
  // {
  //   id: "google",
  //   uri: "./thumbnails/www.google.com.png",
  // },

  {
    id: "expo",
    uri: require("./thumbnails/expo.png"),
  },
  // {
  //   id: "facebook",
  //   uri: "./thumbnails/start-react-native.dev.png",
  // },
 
  {
    id: "rnnavigation",
    uri: require("./thumbnails/react-native.png"),
  },
 
];

const Chrome = () => {

  const dispatch = useDispatch()
  // const tiles =  useSelector(state=> state.ImagePicker.tiles)
  const [tile,setTile] = useState(tiles)
  
  const pickImage = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });

    // console.log(result);

    // if (!result.cancelled) {
    //   dispatch(ImagePick.addImage(result.uri));
    // }
    // tiles.push(tiles[0])
    const temp = tile
    temp.push(tile[0])
    setTile([...temp])
    console.log([...temp])
  };


  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: MyTheme.colors.background, paddingHorizontal: MARGIN }}
    >
      <SortableList
        editing={true}
        onDragEnd={(positions) =>
          console.log(JSON.stringify(positions, null, 2))
        }
      >
        {[...tiles].map((tile, index) => {
          console.log()
          return(<Tile
            onLongPress={() => true}
            key={tile.id + "-" + index}
            id={tile.id + "-" + index}
            uri={tile.uri}
          />)
          })}
      </SortableList>
      <FAB
        style={styles.fab}
        big
        icon="plus"
        onPress={() => pickImage()}
      />    
    </SafeAreaView>
  );
};

export default Chrome;




const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor:MyTheme.colors.border,
  },
  

 
});