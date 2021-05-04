import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { MARGIN } from "./Config";
import Tile from "./Tile";
import SortableList from "./SortableList";
import { MyTheme } from "../../Theme/Theme";
import { Image } from "react-native";

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
      {/* <Image source={tiles[0].uri} /> */}
    </SafeAreaView>
  );
};

export default Chrome;
